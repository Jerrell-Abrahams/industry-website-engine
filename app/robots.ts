import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const { seo, demo } = getSiteConfig();

  // Demos are reached by a link you send a prospect, never by search. See the
  // `demo` flag in lib/schema.ts for why they are kept out of the index.
  if (demo) return { rules: { userAgent: "*", disallow: "/" } };

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", seo.url).toString(),
    host: seo.url,
  };
}
