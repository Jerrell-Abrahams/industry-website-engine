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
  add(config.booking?.image, "booking");
  add(config.cta?.image, "cta");
  config.services?.items.forEach((i) => add(i.image, "service"));
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
const SLOT_FALLBACK = {
  team: "professional business portrait",
  avatar: "person portrait headshot",
};

async function search(query, orientation, count, slot) {
  const run = async (q) => {
    const url = new URL("https://api.unsplash.com/search/photos");
    url.searchParams.set("query", q);
    url.searchParams.set("orientation", orientation);
    url.searchParams.set("per_page", String(Math.max(count, 5)));
    url.searchParams.set("content_filter", "high");
    const { results } = await api(url);
    return results ?? [];
  };

  const results = await run(query);
  if (results.length > 0) return results;

  const fallback = broaden(query);
  if (fallback && fallback !== query.toLowerCase()) {
    console.log(`    … no match, retrying as "${fallback}"`);
    const broadened = await run(fallback);
    if (broadened.length > 0) return broadened;
  }

  const generic = SLOT_FALLBACK[slot];
  if (!generic) return [];
  console.log(`    … still nothing, falling back to "${generic}"`);
  return run(generic);
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
    /** Avoids handing the same photo to two images in one site. */
    const taken = new Set();

    try {
      for (const image of images) {
        const spec = SLOTS[image.slot] ?? SLOTS.about;
        const query = toQuery(image.alt, config.business.name);

        const cacheKey = `${image.slot}:${query}`;
        if (!cache.has(cacheKey)) {
          cache.set(cacheKey, await search(query, spec.orientation, 8, image.slot));
        }
        const results = cache.get(cacheKey);

        const photo = results.find((p) => !taken.has(p.id)) ?? results[0];
        if (!photo) {
          console.warn(`  ! ${image.src} — no results for "${query}", leaving the placeholder`);
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
      if (credits.length > 0) {
        await writeFile(join(root, `sites/${id}.config.ts`), configSource, "utf8");
        await writeFile(
          join(root, "public", id, "PHOTO-CREDITS.md"),
          `# Photo credits — ${config.business.name}\n\n` +
            `Sourced from Unsplash under the Unsplash License.\n` +
            `Delete this file once the client's own photography replaces these.\n\n` +
            `${credits.join("\n")}\n`,
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
