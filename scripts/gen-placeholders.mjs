import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Generates branded placeholder artwork for every image a config references.
 *
 * Why generate rather than depend on picsum/unsplash: a build that reaches out
 * to a third-party image host fails offline, fails when that host rate-limits
 * Vercel's build IPs, and quietly changes what a client's site looks like.
 * These are tinted from each site's own palette, so a config looks like itself
 * before a single real photograph exists.
 *
 * Dimensions live here rather than in the configs. The aspect ratios are what
 * matter — they are the ones the components actually lay out for, so dropping a
 * real photo of the same ratio into /public/<siteId>/ shifts nothing.
 *
 * Run: npm run placeholders
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** [width, height] per image slot. */
const DIMENSIONS = {
  hero: [1920, 1080],
  about: [1200, 900],
  service: [1000, 750],
  gallery: [800, 1000],
  team: [600, 600],
  avatar: [160, 160],
  logo: [320, 128],
  booking: [1000, 1250],
  cta: [1000, 750],
  og: [1200, 630],
  brand: [320, 80],
};

/** Walks a config and reports every image it references, with the slot it came from. */
function collect(config) {
  const found = [];
  const add = (image, slot) => {
    if (image?.src) found.push({ src: image.src, slot, alt: image.alt });
  };

  add(config.business.logo, "brand");
  add(config.hero?.image, "hero");
  add(config.about?.image, "about");
  config.about?.images.forEach((image) => add(image, "about"));
  add(config.booking?.image, "booking");
  add(config.cta?.image, "cta");

  config.services?.items.forEach((item) => add(item.image, "service"));
  config.pricing?.plans.forEach((plan) => add(plan.image, "service"));
  config.gallery?.images.forEach((image) => add(image, "gallery"));
  config.team?.members.forEach((member) => add(member.image, "team"));
  config.testimonials?.items.forEach((item) => add(item.image, "avatar"));
  config.partners?.logos.forEach((logo) => add(logo, "logo"));

  if (config.seo?.ogImage) found.push({ src: config.seo.ogImage, slot: "og" });

  return found;
}

/**
 * Deterministic 0–1 value from a string, so the same path always produces the
 * same artwork and re-running the script never churns the diff.
 */
function seed(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) % 100000;
  return hash / 100000;
}

function svg({ width, height, palette, label, key }) {
  const n = seed(key);
  const angle = Math.round(n * 90);
  const [a, b, accent] = palette;

  // A couple of large, soft shapes reading as depth rather than as a "no image" box.
  const cx = Math.round(width * (0.25 + n * 0.5));
  const cy = Math.round(height * (0.2 + n * 0.4));
  const r = Math.round(Math.min(width, height) * (0.28 + n * 0.22));
  const fontSize = Math.max(11, Math.round(Math.min(width, height) * 0.045));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(${angle})">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="100%" stop-color="${b}"/>
    </linearGradient>
    <clipPath id="c"><rect width="${width}" height="${height}"/></clipPath>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <g clip-path="url(#c)" opacity="0.32">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${accent}"/>
    <circle cx="${width - cx}" cy="${height - cy}" r="${Math.round(r * 0.6)}" fill="${a}"/>
  </g>
  <text x="${Math.round(width / 2)}" y="${Math.round(height / 2)}" fill="#ffffff" fill-opacity="0.72"
        font-family="system-ui, sans-serif" font-size="${fontSize}" font-weight="600"
        text-anchor="middle" dominant-baseline="middle" letter-spacing="1">${label}</text>
</svg>
`;
}

const escapeXml = (text) =>
  text.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]);

async function main() {
  // Windows absolute paths aren't valid ESM specifiers — they must be file:// URLs.
  const { sites } = await import(pathToFileURL(join(root, "sites/index.ts")).href);
  let written = 0;
  let skipped = 0;

  for (const config of Object.values(sites)) {
    const palette = [
      config.branding.primaryColor,
      config.branding.secondaryColor,
      config.branding.accentColor,
    ];

    for (const image of collect(config)) {
      // Only ever generate SVG. A real .jpg/.png a client has supplied is left alone.
      if (!image.src.endsWith(".svg")) {
        skipped += 1;
        continue;
      }

      const [width, height] = DIMENSIONS[image.slot] ?? DIMENSIONS.about;
      const target = join(root, "public", image.src.replace(/^\//, ""));
      await mkdir(dirname(target), { recursive: true });
      await writeFile(
        target,
        svg({
          width,
          height,
          palette,
          key: image.src,
          label: escapeXml(`${config.business.name} — ${image.slot} ${width}×${height}`),
        }),
        "utf8",
      );
      written += 1;
    }
  }

  console.log(`Generated ${written} placeholder SVGs.`);
  if (skipped > 0) {
    console.log(`Left ${skipped} non-SVG image path(s) alone — those are real client assets.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
