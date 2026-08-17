import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Scaffolds a new client site from the template.
 *
 * Replaces steps 1–3 and 5 of the checklist in sites/_template.config.ts: copy
 * the template, rename its export, set the id, register it in sites/index.ts,
 * and generate placeholder artwork. What is left for a human is the part only a
 * human can do — filling in the client's actual words.
 *
 * Run: npm run new -- <id>
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const id = process.argv[2];

if (!id) {
  console.error("Usage: npm run new -- <id>\n  e.g. npm run new -- bakery");
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(id)) {
  console.error(`✗ "${id}" is not a valid id. Lowercase letters, digits and hyphens only.`);
  process.exit(1);
}

const configPath = join(root, "sites", `${id}.config.ts`);
if (existsSync(configPath)) {
  console.error(`✗ sites/${id}.config.ts already exists. Pick another id or delete it first.`);
  process.exit(1);
}

/** `bush-cottages` → `bushCottages`, so the export reads like the rest of them. */
const camel = id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const exportName = `${camel}Config`;

/* ---- 1. the config itself ---------------------------------------- */

const template = await readFile(join(root, "sites", "_template.config.ts"), "utf8");

const config = template
  .replace("export const templateConfig:", `export const ${exportName}:`)
  .replaceAll("newclient", id);

await writeFile(configPath, config);

/* ---- 2. register it ---------------------------------------------- */

const indexPath = join(root, "sites", "index.ts");
let index = await readFile(indexPath, "utf8");

if (index.includes(`./${id}.config.ts`)) {
  console.error(`✗ sites/index.ts already imports ${id}. Nothing written.`);
  process.exit(1);
}

// Imports are alphabetical; slot the new one in rather than appending, so the
// file does not drift out of the order the linter expects.
const importLine = `import { ${exportName} } from "./${id}.config.ts";`;
const imports = [...index.matchAll(/^import \{ \w+ \} from "\.\/[\w.-]+\.ts";$/gm)];
const before = imports.find((m) => m[0] > importLine);

index = before
  ? index.replace(before[0], `${importLine}\n${before[0]}`)
  : index.replace(imports.at(-1)[0], `${imports.at(-1)[0]}\n${importLine}`);

// Registry entry goes just above the engine-test fixture comment, which is
// always last in the map. A hyphenated id is not a valid bare object key, so
// it has to be quoted — "engine-test" in the same file is quoted for this
// exact reason.
const key = id.includes("-") ? `"${id}"` : id;
const fixtureComment = "  /** Engine fixture, not a client.";
index = index.replace(fixtureComment, `  ${key}: ${exportName},\n\n${fixtureComment}`);

await writeFile(indexPath, index);

/* ---- 3. artwork --------------------------------------------------- */

console.log(`✓ sites/${id}.config.ts`);
console.log(`✓ registered in sites/index.ts`);

try {
  execFileSync("node", ["--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/gen-placeholders.mjs"], {
    cwd: root,
    stdio: "inherit",
  });
} catch {
  console.error("! placeholder generation failed — run `npm run placeholders` yourself");
}

console.log(`
Next:
  1. Fill in sites/${id}.config.ts — every visible string comes from there.
  2. Pick hero + services variants nothing else uses (npm run validate enforces it).
  3. NEXT_PUBLIC_SITE=${id} npm run dev
  4. Drop real photos over the generated SVGs in public/${id}/.
  5. Create the Vercel project, then: vercel link --yes --project ${id} && vercel --prod --yes
  6. When the client pays, set \`demo: false\` in the config.
`);
