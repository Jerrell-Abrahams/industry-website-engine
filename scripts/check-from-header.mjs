import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
const { fromHeader } = await import(pathToFileURL(join(process.cwd(), "lib/utils.ts")).href);

const addr = "enquiries@complexai.co.za";

// Ordinary name.
assert.equal(fromHeader("The Smoke House", addr), `"The Smoke House" <${addr}>`);

// A comma would split the header into two addresses if unquoted.
assert.equal(fromHeader("Smith, Jones & Co", addr), `"Smith, Jones & Co" <${addr}>`);

// A stray quote would terminate the quoted string early.
assert.equal(fromHeader('The "Best" Bakery', addr), `"The Best Bakery" <${addr}>`);

// Backslash likewise.
assert.equal(fromHeader("A\B Trading", addr), `"AB Trading" <${addr}>`);

// An address that already has a display name is passed through untouched.
assert.equal(fromHeader("Ignored", "Site <x@y.co.za>"), "Site <x@y.co.za>");

// Every result must contain exactly one '<' and one '@'.
for (const name of ["The Smoke House", "Smith, Jones & Co", 'The "Best" Bakery']) {
  const h = fromHeader(name, addr);
  assert.equal((h.match(/</g) || []).length, 1, `two addresses in: ${h}`);
  assert.equal((h.match(/@/g) || []).length, 1, `two addresses in: ${h}`);
}

// Real configs must all survive it.
const { sites } = await import(pathToFileURL(join(process.cwd(), "sites/index.ts")).href);
for (const [id, cfg] of Object.entries(sites)) {
  const h = fromHeader(cfg.business.name, addr);
  assert.equal((h.match(/@/g) || []).length, 1, `${id} produced: ${h}`);
}

console.log("✓ fromHeader: all cases pass, including all 20 configs");
