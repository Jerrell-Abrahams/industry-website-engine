import type { SiteConfig } from "./schema";
import { absoluteUrl } from "./utils";

/**
 * Schema.org LocalBusiness markup.
 *
 * `seo.schemaType` picks the subtype (Restaurant, HairSalon, LegalService,
 * AutoRepair, Church…). Getting this right is what makes a client show up in
 * Google's local pack with hours and a rating, so it is worth the field.
 *
 * Optional properties are omitted rather than emitted empty — Google treats an
 * empty value as an error, whereas an absent one is simply unknown.
 */
export function JsonLd({ config }: { config: SiteConfig }) {
  const { business, seo } = config;

  const openingHours = business.businessHours
    .filter((h) => !h.closed && h.opens && h.closes && h.schemaDays.length > 0)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.schemaDays,
      opens: h.opens,
      closes: h.closes,
    }));

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": seo.schemaType,
    "@id": seo.url,
    name: business.name,
    description: seo.description,
    url: seo.url,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.suburb ?? business.address.city,
      addressRegion: business.address.province,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
  };

  if (business.logo) data.logo = absoluteUrl(config, business.logo.src);
  if (seo.ogImage) data.image = absoluteUrl(config, seo.ogImage);
  if (business.geo) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    };
  }
  if (openingHours.length > 0) data.openingHoursSpecification = openingHours;
  if (business.socialLinks.length > 0) data.sameAs = business.socialLinks.map((s) => s.href);
  if (business.googleMapsUrl) data.hasMap = business.googleMapsUrl;
  if (config.pricing?.plans.length) {
    data.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: config.pricing.heading,
      itemListElement: config.pricing.plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: plan.price,
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapes the payload; `<` is replaced so the string can
      // never break out of the script element.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Separate FAQPage entity — Google reads FAQ rich results from its own block. */
export function FaqJsonLd({ config }: { config: SiteConfig }) {
  if (!config.features.faq || !config.faq) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
