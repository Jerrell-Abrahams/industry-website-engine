import { execFileSync, spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Deploys every client site to production.
 *
 * The Vercel projects carry no git connection — pushing to main deploys
 * nothing — so a change to anything shared has to be pushed to each project in
 * turn. That is what this does.
 *
 * Run: npm run deploy:all
 *      npm run deploy:all -- --only barber
 *      npm run deploy:all -- --skip-validate
 *
 * Two side effects worth knowing, both from `vercel link`: .env.local is
 * overwritten with the last-linked project's variables and .vercel/ points at
 * it, so re-link whichever site you were developing when this finishes.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const args = process.argv.slice(2);
const skipValidate = args.includes("--skip-validate");

// `--only` with no value must not silently degrade into "deploy everything".
let only = null;
if (args.includes("--only")) {
  only = args[args.indexOf("--only") + 1];
  if (!only || only.startsWith("--")) {
    console.error("✗ --only needs a site id, e.g. --only barber");
    process.exit(1);
  }
}

const { sites } = await import(pathToFileURL(join(root, "sites", "index.ts")).href);

// The fixture renders every section in one page; it is not a client and has no
// Vercel project.
const all = Object.keys(sites).filter((id) => id !== "engine-test");

if (only && !all.includes(only)) {
  console.error(`✗ Unknown site "${only}". Known: ${all.join(", ")}`);
  process.exit(1);
}

const targets = only ? [only] : all;

/* ---- validate first ----------------------------------------------- */

if (!skipValidate) {
  try {
    execFileSync(
      "node",
      ["--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/validate-sites.mjs"],
      { cwd: root, stdio: "inherit" },
    );
  } catch {
    console.error("\n✗ Validation failed. Nothing deployed.");
    process.exit(1);
  }
}

/* ---- deploy -------------------------------------------------------- */

// Output is captured rather than discarded: when a deploy fails you need the
// reason, and the retry would otherwise bury the first error entirely.
let lastOutput = "";

const run = (cmd, cmdArgs) => {
  const result = spawnSync(cmd, cmdArgs, {
    cwd: root,
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  lastOutput = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
  return result.status === 0;
};

console.log(`\nDeploying ${targets.length} site(s) to production.\n`);

const failed = [];

for (const id of targets) {
  process.stdout.write(`  ${id.padEnd(14)}`);

  // One retry: a link or upload occasionally fails transiently, and a second
  // attempt has always been enough rather than a reason to stop the run.
  let ok = false;
  for (let attempt = 1; attempt <= 2 && !ok; attempt += 1) {
    ok = run("vercel", ["link", "--yes", "--project", id]) && run("vercel", ["--prod", "--yes"]);
  }

  if (ok) {
    console.log("ok");
  } else {
    console.log("FAILED");
    failed.push(id);
    // Last few lines only — a full vercel build log would drown the summary.
    for (const line of lastOutput.split(/\r?\n/).slice(-8)) {
      if (line.trim()) console.log(`      ${line}`);
    }
  }
}

/* ---- summary -------------------------------------------------------- */

if (failed.length > 0) {
  console.error(`\n✗ ${failed.length} of ${targets.length} failed: ${failed.join(", ")}`);
  process.exit(1);
}

console.log(`\n✓ All ${targets.length} site(s) deployed.`);
console.log("  .env.local and .vercel/ now point at the last site deployed — re-link if needed.");
