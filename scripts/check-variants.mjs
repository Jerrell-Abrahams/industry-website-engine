import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Asserts every variant declared in VARIANTS is actually rendered somewhere.
 *
 * The failure this catches: adding a name to VARIANTS and forgetting the `case`
 * in its component. The switch falls through to the default, so the config is
 * valid, typecheck passes, validate passes, the build passes — and the client's
 * site quietly renders the wrong layout. Nothing else in the repo sees it.
 *
 * The first entry of each array is the default (`variantOf()` in lib/schema.ts),
 * so it is exempt by construction — only entries 1..n need a renderer. A variant
 * counts as rendered if its name appears quoted (`variant === "name"`) or if the
 * file declares the sibling function the else-branch delegates to (`grid` ->
 * `function Grid`), which is how the fall-through variants are written today.
 *
 * Run: npm run check-variants
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { VARIANTS } = await import(pathToFileURL(join(root, "lib/schema.ts")).href);

/** Section key -> the component files that may hold its branches. */
const SEARCH_DIRS = ["components/sections", "components"];

function filesFor(key) {
  const prefix = key[0].toUpperCase() + key.slice(1);
  return SEARCH_DIRS.flatMap((dir) =>
    readdirSync(join(root, dir), { withFileTypes: true })
      .filter((e) => e.isFile() && e.name.startsWith(prefix) && e.name.endsWith(".tsx"))
      .map((e) => join(root, dir, e.name)),
  );
}

/** "single-featured" -> "SingleFeatured", the sibling-function naming convention. */
const pascal = (v) => v.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");

let failed = 0;

for (const [key, variants] of Object.entries(VARIANTS)) {
  const files = filesFor(key);

  if (files.length === 0) {
    failed += 1;
    console.error(`\n✗ ${key}\n    no component file found (looked for ${key[0].toUpperCase() + key.slice(1)}*.tsx)`);
    continue;
  }

  const source = files.map((f) => readFileSync(f, "utf8")).join("\n");
  const missing = variants
    .slice(1)
    .filter((v) => !source.includes(`"${v}"`) && !new RegExp(`function\\s+${pascal(v)}\\b`).test(source));

  if (missing.length > 0) {
    failed += 1;
    console.error(
      `\n✗ ${key}\n    declared but never rendered: ${missing.join(", ")}\n` +
        `    searched: ${files.map((f) => f.slice(root.length + 1)).join(", ")}`,
    );
  } else {
    console.log(`✓ ${key} — ${variants.length} variants`);
  }
}

const total = Object.values(VARIANTS).reduce((n, v) => n + v.length, 0);

if (failed > 0) {
  console.error(`\n${failed} section(s) declare a variant with no renderer.`);
  process.exit(1);
}

console.log(`\nAll ${total} variants across ${Object.keys(VARIANTS).length} sections have a renderer.`);
