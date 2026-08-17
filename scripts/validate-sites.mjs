import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Validates every client config against the schema.
 *
 * A production build only renders the one site NEXT_PUBLIC_SITE names, so a
 * broken config for any other client would sit undetected until their next
 * deploy. This checks all of them at once and is the thing to run in CI.
 *
 * `npx tsc --noEmit` already covers structure, because configs are typed as
 * SiteConfigInput. What it cannot see is what this catches: hex format, and the
 * cross-field rules in SiteConfigSchema's superRefine — a section listed in
 * `layout` with no content, a flag switched on with nothing behind it, a nav
 * link pointing at a section this site does not render.
 *
 * Run: npm run validate
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
/** Windows absolute paths aren't valid ESM specifiers — they must be file:// URLs. */
const load = (relative) => import(pathToFileURL(join(root, relative)).href);

const { sites } = await load("sites/index.ts");
const { SiteConfigSchema, FONT_KEYS } = await load("lib/schema.ts");

/* ------------------------------------------------------------------ *
 * WCAG contrast
 *
 * Every site is a different palette written by hand, so this is the check that
 * stops a paying client shipping unreadable body copy. AA is 4.5:1 for body
 * text and 3:1 for large text and UI borders.
 * ------------------------------------------------------------------ */

function luminance(hex) {
  const full =
    hex.length === 4
      ? hex.slice(1).split("").map((c) => c + c).join("")
      : hex.slice(1);
  const channels = [0, 2, 4].map((i) => {
    const v = parseInt(full.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

/** Pairs that actually appear together in the rendered components. */
function contrastProblems(branding) {
  const n = branding.neutral;
  const pairs = [
    ["neutral.text on neutral.bg", n.text, n.bg, 4.5],
    ["neutral.text on neutral.surface", n.text, n.surface, 4.5],
    ["neutral.textMuted on neutral.bg", n.textMuted, n.bg, 4.5],
    ["neutral.textMuted on neutral.surface", n.textMuted, n.surface, 4.5],
    ["neutral.onPrimary on primaryColor", n.onPrimary, branding.primaryColor, 4.5],
    // Links, eyebrows and icons are drawn in primary directly on the page.
    ["primaryColor on neutral.bg", branding.primaryColor, n.bg, 4.5],
    ["primaryColor on neutral.surface", branding.primaryColor, n.surface, 4.5],
    // Focus rings are drawn in accent and only need to be perceivable.
    ["accentColor on neutral.bg (focus ring)", branding.accentColor, n.bg, 3],
  ];

  return pairs
    .filter(([, fg, bg, min]) => contrast(fg, bg) < min)
    .map(
      ([label, fg, bg, min]) =>
        `contrast ${label} is ${contrast(fg, bg).toFixed(2)}:1, needs ${min}:1 (${fg} on ${bg})`,
    );
}

let failed = 0;

for (const [id, raw] of Object.entries(sites)) {
  const result = SiteConfigSchema.safeParse(raw);

  if (!result.success) {
    failed += 1;
    console.error(`\n✗ ${id}`);
    for (const issue of result.error.issues) {
      console.error(`    ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
    continue;
  }

  const config = result.data;
  const problems = [];

  // The registry key and the config's own id must agree, because /public/<id>/
  // is derived from the id and a mismatch silently 404s every image.
  if (config.id !== id) {
    problems.push(`id is "${config.id}" but it is registered as "${id}" in sites/index.ts`);
  }

  // z.enum already covers this, but the message a config author gets is much
  // better when it lists what they could have written instead.
  for (const key of ["fontHeading", "fontBody"]) {
    if (!FONT_KEYS.includes(config.branding[key])) {
      problems.push(`branding.${key} "${config.branding[key]}" is not in the font registry (${FONT_KEYS.join(", ")})`);
    }
  }

  problems.push(...contrastProblems(config.branding));

  // Images must live under the site's own folder, or two clients end up sharing
  // assets and one of them changes the other's site.
  for (const src of collectImageSources(config)) {
    if (!src.startsWith(`/${config.id}/`)) {
      problems.push(`image "${src}" should live under /${config.id}/`);
    }
  }

  if (problems.length > 0) {
    failed += 1;
    console.error(`\n✗ ${id}`);
    for (const problem of problems) console.error(`    ${problem}`);
  } else {
    // `demo` defaults to true, so a LIVE tag means someone turned it off
    // deliberately at sale time. Printing it makes an accidental flip — which
    // would put a fictional business into Google — visible on every run.
    const status = config.demo ? "demo" : "LIVE";
    console.log(
      `✓ ${id} [${status}] — ${config.layout.length} sections, ${config.business.name}`,
    );
  }
}

/* ------------------------------------------------------------------ *
 * Distinctiveness
 *
 * The product promise is that no two client sites read as the same template
 * recoloured. Palette alone does not achieve that — structure does. Two sites
 * sharing both a hero and a services layout will feel like siblings no matter
 * how different their colours are, so that combination is treated as taken.
 * ------------------------------------------------------------------ */

const combos = new Map();

for (const [id, raw] of Object.entries(sites)) {
  if (id === "engine-test") continue; // fixture, not a client site
  const parsed = SiteConfigSchema.safeParse(raw);
  if (!parsed.success) continue;

  const { hero, services } = parsed.data;
  if (!hero || !services) continue;

  const key = `${hero.variant} + ${services.variant}`;
  if (combos.has(key)) {
    failed += 1;
    console.error(
      `\n✗ ${id}\n    hero/services combination "${key}" is already used by "${combos.get(key)}". ` +
        `Change one of them so the two sites do not share a structural feel.`,
    );
  } else {
    combos.set(key, id);
  }
}

const total = Object.keys(sites).length;

if (failed > 0) {
  console.error(`\n${failed} of ${total} site config(s) invalid.`);
  process.exit(1);
}

console.log(`\nAll ${total} site config(s) valid.`);

function collectImageSources(config) {
  const sources = [];
  const add = (image) => image?.src && sources.push(image.src);

  add(config.business.logo);
  add(config.hero?.image);
  add(config.about?.image);
  add(config.booking?.image);
  add(config.cta?.image);
  config.services?.items.forEach((item) => add(item.image));
  config.gallery?.images.forEach(add);
  config.team?.members.forEach((member) => add(member.image));
  config.testimonials?.items.forEach((item) => add(item.image));
  config.partners?.logos.forEach(add);
  if (config.seo.ogImage) sources.push(config.seo.ogImage);

  return sources;
}
