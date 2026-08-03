import { readdir, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

/**
 * Tiles a site's photos into one grid and prints each cell's alt text.
 *
 * Usage:
 *   npm run sheets -- gym barber
 *   npm run sheets            (every site with photos)
 *
 * This exists because fetch-photos.mjs cannot tell whether the photo it chose
 * actually shows what the alt text promises — Unsplash relevance is loose enough
 * that "brisket resting on the pass" returned a mountain pass, and a labour law
 * service card got a photograph of construction workers. The only check that
 * catches that is a person looking at the images, and looking at 146 files one
 * by one is why nobody does it. One grid per site makes it a minute's work.
 *
 * Sheets are written to .sheets/, which is gitignored — they are a review
 * artefact, not part of any client's site.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, ".sheets");
const CELL_W = 300;
const CELL_H = 225;
const COLS = 4;

/** Same walk as fetch-photos.mjs, minus the .svg filter — we want what shipped. */
function altByFile(config) {
  const map = new Map();
  const add = (image) =>
    image?.src?.endsWith(".jpg") &&
    map.set(image.src.split("/").pop().replace(".jpg", ""), image.alt);

  add(config.hero?.image);
  add(config.about?.image);
  add(config.booking?.image);
  add(config.cta?.image);
  config.services?.items.forEach((i) => add(i.image));
  config.gallery?.images.forEach(add);
  config.team?.members.forEach((m) => add(m.image));
  config.testimonials?.items.forEach((i) => add(i.image));

  return map;
}

const { sites } = await import(pathToFileURL(join(root, "sites/index.ts")).href);
const ids = process.argv.slice(2).length > 0 ? process.argv.slice(2) : Object.keys(sites);

await mkdir(out, { recursive: true });

for (const id of ids) {
  const config = sites[id];
  if (!config) {
    console.error(`✗ ${id} — not in sites/index.ts`);
    process.exitCode = 1;
    continue;
  }

  const dir = join(root, "public", id);
  const files = (await readdir(dir).catch(() => [])).filter((f) => f.endsWith(".jpg")).sort();
  if (files.length === 0) continue;

  const alts = altByFile(config);
  const rows = Math.ceil(files.length / COLS);
  const cells = await Promise.all(
    files.map((f) => sharp(join(dir, f)).resize(CELL_W, CELL_H, { fit: "cover" }).toBuffer()),
  );

  await sharp({
    create: {
      width: CELL_W * COLS,
      height: CELL_H * rows,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite(
      cells.map((input, i) => ({
        input,
        left: (i % COLS) * CELL_W,
        top: Math.floor(i / COLS) * CELL_H,
      })),
    )
    .jpeg({ quality: 72 })
    .toFile(join(out, `${id}.jpg`));

  console.log(`\n${id} — .sheets/${id}.jpg (${COLS} per row, left to right)`);
  files.forEach((f, i) => {
    const name = f.replace(".jpg", "");
    console.log(`  ${String(i).padStart(2)}  ${name.padEnd(12)} ${alts.get(name) ?? "(no alt)"}`);
  });
}
