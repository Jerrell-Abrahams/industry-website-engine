import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const { seo, demo } = getSiteConfig();

  // Demos are reached by a link you send a prospect, never by search.
  //
  // Counter-intuitively this ALLOWS crawling. `Disallow` only stops a crawler
  // fetching the page — it does not stop the URL being indexed from an inbound
  // link, and a crawler that never fetches the page never sees the `noindex`
  // in its metadata. Allowing the fetch is what lets the noindex actually take
  // effect. The sitemap is withheld so nothing is volunteered for crawling.
  if (demo) return { rules: { userAgent: "*", allow: "/" } };

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", seo.url).toString(),
    host: seo.url,
  };
}
