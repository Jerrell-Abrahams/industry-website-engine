import { sites } from "@/sites";
import { SiteConfigSchema, type SiteConfig } from "./schema";

/**
 * Resolves the active client site.
 *
 * One deployment renders one site. Each paying client gets their own Vercel
 * project pointing at this repo with a different NEXT_PUBLIC_SITE value, so the
 * variable is read at build time and the result is memoised for the process.
 */

let cached: SiteConfig | null = null;

export function getSiteConfig(): SiteConfig {
  if (cached) return cached;

  const id = process.env.NEXT_PUBLIC_SITE;
  const available = Object.keys(sites).sort().join(", ");

  if (!id) {
    throw new Error(
      `NEXT_PUBLIC_SITE is not set. Set it to one of: ${available}.\n` +
        `Locally, add it to .env.local (see .env.example). On Vercel, set it in the project's environment variables.`,
    );
  }

  const raw = sites[id];
  if (!raw) {
    throw new Error(
      `No site config found for NEXT_PUBLIC_SITE="${id}". Available: ${available}.\n` +
        `If you just added sites/${id}.config.ts, register it in sites/index.ts.`,
    );
  }

  const parsed = SiteConfigSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(`sites/${id}.config.ts is invalid:\n${issues}`);
  }

  if (parsed.data.id !== id) {
    throw new Error(
      `sites/${id}.config.ts declares id "${parsed.data.id}". The id must match its key in sites/index.ts, ` +
        `because /public/${parsed.data.id}/ is where its images are looked up.`,
    );
  }

  cached = parsed.data;
  return cached;
}
