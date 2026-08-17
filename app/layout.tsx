import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";

import { DemoPill } from "@/components/DemoPill";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FaqJsonLd, JsonLd } from "@/lib/jsonld";
import { getSiteConfig } from "@/lib/site";
import { fontClasses, themeAttributes, themeStyle } from "@/lib/theme";
import { absoluteUrl } from "@/lib/utils";

import "./globals.css";

/**
 * Root layout for whichever client site NEXT_PUBLIC_SITE names.
 *
 * The palette, fonts and shape tokens are written straight onto <html> as CSS
 * custom properties during server rendering — no ThemeProvider, no client
 * JavaScript, and no flash of an unthemed page.
 */

export function generateMetadata(): Metadata {
  const config = getSiteConfig();
  const { seo, business } = config;

  return {
    metadataBase: new URL(seo.url),
    title: { default: seo.title, template: `%s | ${business.name}` },
    description: seo.description,
    keywords: seo.keywords,
    applicationName: business.name,
    alternates: { canonical: "/" },
    icons: business.favicon ? { icon: business.favicon } : undefined,
    openGraph: {
      type: "website",
      siteName: business.name,
      title: seo.title,
      description: seo.description,
      url: seo.url,
      locale: seo.locale,
      images: seo.ogImage
        ? [{ url: absoluteUrl(config, seo.ogImage), width: 1200, height: 630, alt: business.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [absoluteUrl(config, seo.ogImage)] : undefined,
    },
    // Demos carry invented business names, addresses and geo coordinates, and
    // emit them as LocalBusiness JSON-LD. Keeping them out of the index stops
    // 19 fictional businesses competing with real ones in local search.
    robots: config.demo ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function generateViewport(): Viewport {
  const { branding } = getSiteConfig();
  return {
    themeColor: branding.primaryColor,
    width: "device-width",
    // Never cap zoom — pinch-to-zoom is an accessibility requirement.
    initialScale: 1,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = getSiteConfig();
  const { branding, business, features, seo } = config;

  return (
    <html
      lang={seo.locale.split("_")[0]}
      className={fontClasses(branding)}
      style={themeStyle(branding)}
      {...themeAttributes(branding)}
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-brand focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
        >
          Skip to content
        </a>

        <Navbar navbar={config.navbar} business={business} />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer config={config} />

        {features.whatsapp && business.whatsapp ? (
          <WhatsAppButton number={business.whatsapp} businessName={business.name} />
        ) : null}

        {config.demo ? <DemoPill siteId={config.id} /> : null}

        {/* Cookieless, so it needs no consent banner — see the POPIA notice at /privacy. */}
        {features.analytics ? <Analytics /> : null}

        <JsonLd config={config} />
        <FaqJsonLd config={config} />
      </body>
    </html>
  );
}
