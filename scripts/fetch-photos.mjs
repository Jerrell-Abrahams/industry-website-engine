import { readFile, writeFile } from "node:fs/promises";
import { mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Replaces a site's generated placeholder SVGs with real Unsplash photography.
 *
 * Usage:
 *   UNSPLASH_ACCESS_KEY=xxx npm run photos -- gym
 *   UNSPLASH_ACCESS_KEY=xxx npm run photos -- gym barber spa
 *
 * Photos are DOWNLOADED into /public/<id>/ rather than hotlinked. Hotlinking
 * would put a third-party CDN on the critical path of a paying client's site and
 * make builds depend on the network — the same reason gen-placeholders.mjs
 * generates locally. Local files also mean next/image can optimise them properly.
 *
 * The search query for each image is its own `alt` text from the config, with the
 * business name stripped out. The alt text already describes the photo we want,
 * so no second set of keyword strings has to be written or kept in sync.
 *
 * RATE LIMITS: an unreviewed Unsplash app gets 50 requests/hour against
 * api.unsplash.com. Only searches and download-tracking calls count — pulling the
 * actual JPEG from images.unsplash.com is a CDN hit and is not metered. Budget
 * roughly two API calls per image.
 *
 * To check remaining quota, read x-ratelimit-remaining off a SEARCH request.
 * GET /photos/<id> is served from CloudFront and hands back a cached header —
 * it will cheerfully report 34 remaining while every search returns 403.
 *
 * One search PER IMAGE, not per slot. Sharing one search across a whole slot
 * halves the request count but hands image 2 a photo described by image 1's alt
 * text, and alt text is a promise about what the picture shows. Identical queries
 * are cached, so the saving is kept where it is free.
 *
 * The run is resumable: converted images become .jpg in the config and are
 * skipped next time, and the config is written even if a search fails mid-site.
 * So on a 403, wait an hour and run the same command again.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const KEY = process.env.UNSPLASH_ACCESS_KEY;

/** Slot → orientation and pixel size. Matches gen-placeholders.mjs so ratios stay put. */
const SLOTS = {
  hero: { w: 1920, h: 1080, orientation: "landscape" },
  about: { w: 1200, h: 900, orientation: "landscape" },
  service: { w: 1000, h: 750, orientation: "landscape" },
  gallery: { w: 800, h: 1000, orientation: "portrait" },
  team: { w: 600, h: 600, orientation: "squarish" },
  avatar: { w: 160, h: 160, orientation: "squarish" },
  cta: { w: 1000, h: 750, orientation: "landscape" },
  booking: { w: 1000, h: 1250, orientation: "portrait" },
  og: { w: 1200, h: 630, orientation: "landscape" },
};

/** Same walk as gen-placeholders.mjs, so the two stay in agreement about slots. */
function collect(config) {
  const found = [];
  const add = (image, slot) => image?.src && found.push({ ...image, slot });

  add(config.hero?.image, "hero");
  add(config.about?.image, "about");
  config.about?.images.forEach((image) => add(image, "about"));
  add(config.booking?.image, "booking");
  add(config.cta?.image, "cta");
  config.services?.items.forEach((i) => add(i.image, "service"));
  config.pricing?.plans.forEach((p) => add(p.image, "service"));
  config.gallery?.images.forEach((i) => add(i, "gallery"));
  config.team?.members.forEach((m) => add(m.image, "team"));
  config.testimonials?.items.forEach((i) => add(i.image, "avatar"));

  return found.filter((i) => i.src.endsWith(".svg"));
}

/** Business names and "at X" clauses are noise in an image search. */
function toQuery(alt, businessName) {
  return alt
    .replace(new RegExp(businessName, "gi"), "")
    .replace(/\bat\s*$/i, "")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function api(url) {
  const response = await fetch(url, { headers: { Authorization: `Client-ID ${KEY}` } });
  if (response.status === 403) {
    throw new Error(
      "Unsplash returned 403 — you have hit the hourly rate limit (50/hour for an unreviewed app). Wait an hour, or run fewer sites at a time.",
    );
  }
  if (!response.ok) throw new Error(`Unsplash ${response.status}: ${await response.text()}`);
  return response.json();
}

const STOP_WORDS = new Set(
  "a an the of in on at to with its his her their and or for from being been by".split(" "),
);

/**
 * Alt text is written for a screen reader, not a search engine, so a sentence
 * like "The offset smoker with its firebox door open" returns nothing. Falling
 * back to its three longest content words ("offset smoker firebox") usually hits.
 *
 * Mid-sentence capitals are dropped too: they are street, suburb and person
 * names, which are exactly the words a stock library has no photos of.
 * "The workshop entrance on Kimberley Road" → "workshop entrance".
 */
function broaden(query) {
  const words = query.split(/\s+/);
  const properNouns = new Set(
    words
      .slice(1)
      .filter((w) => /^[A-Z]/.test(w))
      .map((w) => w.toLowerCase()),
  );

  return words
    .map((w) => w.toLowerCase())
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w) && !properNouns.has(w))
    .sort((a, b) => b.length - a.length)
    .slice(0, 3)
    .join(" ");
}

/**
 * Last resort, by slot. Team and testimonial alts are a person's name and role
 * ("Ayanda Nelson, Managing Partner") — there is no photo of that person in a
 * stock library, and stripping the proper nouns leaves nothing to search on.
 * A generic portrait is the honest answer for a demo.
 *
 * Only portraits get a default. For the rest, a branded placeholder is better
 * than an unrelated photograph.
 */
/** Slots whose alt text is a person's name rather than a description. */
const PORTRAIT_SLOTS = new Set(["team", "avatar"]);

/**
 * One fallback string gave every team member on every site the same handful of
 * photos — three configs ended up sharing one stock businessman, and one site
 * used him twice in a row. Rotating the phrasing puts each portrait in a
 * different result pool; the global ledger then guarantees no repeat.
 *
 * These describe framing, never the person. A name cannot tell you what someone
 * looks like, so no query here tries to match one — team photos are placeholders
 * for the client's own staff photography, which the README says out loud.
 */
const PORTRAIT_POOL = [
  "business headshot",
  "businesswoman portrait office",
  "businessman portrait office",
  "corporate portrait professional",
  "professional headshot studio",
  "office worker portrait smiling",
];
// Keep every entry anchored on "business", "corporate" or "office". Looser
// phrasing drifts out of the professional-adult pool fast: "professional
// portrait natural light" returned a photograph of a child, and "candid
// workplace portrait" returned a 3D render of a cartoon office.

async function search(query, orientation, slot, spin = 0) {
  const run = async (q, framed = true) => {
    const url = new URL("https://api.unsplash.com/search/photos");
    url.searchParams.set("query", q);
    if (framed) url.searchParams.set("orientation", orientation);
    // 30 rather than 8: the ledger skips photos already used elsewhere, and a
    // short result list runs out of unused candidates on the popular queries.
    url.searchParams.set("per_page", "30");
    url.searchParams.set("content_filter", "high");
    const { results } = await api(url);
    return results ?? [];
  };

  // Portrait slots never search the alt text at all. It is a person's name, and
  // a name is not a description of a photograph — searching it returns either
  // nothing or, worse, something confidently wrong. Both of these shipped:
  // "Kobus van Wyk" → "van" → a white delivery van; "Pieter Grobler" → "pieter"
  // → the Pinterest logo. Skipping the attempt also halves the API cost.
  if (PORTRAIT_SLOTS.has(slot)) {
    return run(PORTRAIT_POOL[spin % PORTRAIT_POOL.length]);
  }

  const results = await run(query);
  if (results.length > 0) return results;

  const fallback = broaden(query);
  if (fallback && fallback !== query.toLowerCase()) {
    console.log(`    … no match, retrying as "${fallback}"`);
    const broadened = await run(fallback);
    if (broadened.length > 0) return broadened;
  }

  // The orientation filter is the usual reason a good query finds nothing:
  // "penthouse apartment balcony" has one portrait photo on Unsplash and plenty
  // of landscape ones. Drop the filter before dropping the meaning — download()
  // crops to the slot size on entropy anyway, so a landscape source still fills
  // a portrait frame, just with less of the original in shot.
  const loose = await run(fallback || query, false);
  if (loose.length > 0) {
    console.log(`    … no ${orientation} photo, taking any orientation and cropping`);
    return loose;
  }

  // Nothing generic for the descriptive slots. A branded gradient is honest;
  // an unrelated photograph under alt text promising something else is not.
  return [];
}

async function download(photo, { w, h }, target) {
  const url = new URL(photo.urls.raw);
  url.searchParams.set("w", String(w));
  url.searchParams.set("h", String(h));
  url.searchParams.set("fit", "crop");
  url.searchParams.set("crop", "entropy");
  url.searchParams.set("q", "80");
  url.searchParams.set("fm", "jpg");

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Image download failed: ${response.status}`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(await response.arrayBuffer()));

  // Required by the Unsplash API terms whenever a photo is used.
  await api(photo.links.download_location).catch(() => {});
}

/**
 * Every photo ever pulled, so none is used twice anywhere in the portfolio.
 *
 * A per-run `taken` set is not enough: runs are resumable and per-site, so the
 * same stock businessman ended up on three client sites and twice on one of
 * them. Two demo sites sharing a face is the kind of thing a prospect notices.
 *
 * Delete the file to allow reuse — it is a ledger, not a lock.
 */
const LEDGER = join(root, "scripts/.photo-ledger.json");

async function readLedger() {
  return new Set(JSON.parse(await readFile(LEDGER, "utf8").catch(() => "[]")));
}

async function writeLedger(used) {
  await writeFile(LEDGER, `${JSON.stringify([...used].sort(), null, 0)}\n`, "utf8");
}

/**
 * Credits accumulate across runs. A resumed or single-image run only knows about
 * the photos it fetched itself, so writing its list verbatim would drop the
 * attribution for every photo already on disk — which is what a rerun of one
 * failed image looks like from here.
 */
async function mergeCredits(id, fresh) {
  const path = join(root, "public", id, "PHOTO-CREDITS.md");
  const byPath = new Map();

  const existing = await readFile(path, "utf8").catch(() => "");
  for (const line of existing.split("\n").filter((l) => l.startsWith("- /"))) {
    byPath.set(line.slice(2).split(" — ")[0], line);
  }
  for (const line of fresh) byPath.set(line.slice(2).split(" — ")[0], line);

  return [...byPath.keys()].sort().map((k) => byPath.get(k));
}

async function main() {
  const ids = process.argv.slice(2);

  if (!KEY) {
    console.error(
      "UNSPLASH_ACCESS_KEY is not set.\n\n" +
        "  1. Sign in at https://unsplash.com/oauth/applications\n" +
        "  2. New Application, accept the terms\n" +
        "  3. Copy the Access Key\n\n" +
        "Then: UNSPLASH_ACCESS_KEY=xxx npm run photos -- gym",
    );
    process.exit(1);
  }

  const { sites } = await import(pathToFileURL(join(root, "sites/index.ts")).href);

  if (ids.length === 0) {
    console.error(`Name at least one site. Available: ${Object.keys(sites).join(", ")}`);
    process.exit(1);
  }

  for (const id of ids) {
    const config = sites[id];
    if (!config) {
      console.error(`✗ ${id} — not in sites/index.ts`);
      process.exitCode = 1;
      continue;
    }

    const images = collect(config);
    if (images.length === 0) {
      console.log(`• ${id} — no placeholder SVGs left to replace`);
      continue;
    }

    const credits = [];
    let configSource = await readFile(join(root, `sites/${id}.config.ts`), "utf8");
    /** Identical alt text is the only case where reusing a search is free of mismatch. */
    const cache = new Map();
    /** Every photo used anywhere, this run included. */
    const taken = await readLedger();
    let spin = 0;

    try {
      for (const image of images) {
        const spec = SLOTS[image.slot] ?? SLOTS.about;
        const query = toQuery(image.alt, config.business.name);

        // A portrait query can run dry once the ledger holds enough faces — all
        // 30 results already used elsewhere. That is a reason to ask the next
        // query in the pool, not to give up, so portraits get one attempt per
        // pool entry. Descriptive slots get a single attempt: their query is the
        // alt text, and there is no second phrasing of it that stays honest.
        const portrait = PORTRAIT_SLOTS.has(image.slot);
        const attempts = portrait ? PORTRAIT_POOL.length : 1;
        let photo;
        let results = [];

        for (let i = 0; i < attempts && !photo; i += 1) {
          const cacheKey = `${image.slot}:${query}:${portrait ? spin : 0}`;
          if (!cache.has(cacheKey)) {
            cache.set(cacheKey, await search(query, spec.orientation, image.slot, spin));
          }
          results = cache.get(cacheKey);
          photo = results.find((p) => !taken.has(p.id));
          if (portrait) spin += 1;
        }

        if (!photo) {
          const why = results.length > 0 ? "every result is already used elsewhere" : "no results";
          console.warn(`  ! ${image.src} — ${why} for "${query}", leaving the placeholder`);
          continue;
        }
        taken.add(photo.id);

        const jpgSrc = image.src.replace(/\.svg$/, ".jpg");
        await download(photo, spec, join(root, "public", jpgSrc.replace(/^\//, "")));
        await rm(join(root, "public", image.src.replace(/^\//, "")), { force: true });

        configSource = configSource.replace(image.src, jpgSrc);
        credits.push(`- ${jpgSrc} — ${photo.user.name} (@${photo.user.username}) — ${photo.links.html}`);
        console.log(`  ✓ ${jpgSrc}  ←  "${query}"`);
      }
    } finally {
      // Written even when a search throws mid-site, so the files on disk and the
      // paths in the config never disagree and the run can be resumed.
      await writeLedger(taken);
      if (credits.length > 0) {
        await writeFile(join(root, `sites/${id}.config.ts`), configSource, "utf8");
        await writeFile(
          join(root, "public", id, "PHOTO-CREDITS.md"),
          `# Photo credits — ${config.business.name}\n\n` +
            `Sourced from Unsplash under the Unsplash License.\n` +
            `Delete this file once the client's own photography replaces these.\n\n` +
            `${(await mergeCredits(id, credits)).join("\n")}\n`,
          "utf8",
        );
        console.log(`✓ ${id} — ${credits.length} photos, config paths rewritten\n`);
      }
    }
  }

  console.log("Run `npm run validate` and rebuild.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
