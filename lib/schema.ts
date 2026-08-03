import { z } from "zod";

/**
 * The single source of truth for a client website.
 *
 * Every visible string, colour and image on a rendered site comes from here.
 * Components receive plain data derived from this shape and nothing else, which
 * is what makes the later swap to a CMS/Supabase a data-layer change rather
 * than a component rewrite.
 *
 * Types are inferred (`z.infer`), never hand-written.
 */

/* ------------------------------------------------------------------ *
 * Primitives
 * ------------------------------------------------------------------ */

const hex = z
  .string()
  .regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Must be a hex colour, e.g. #1B4332");

/**
 * Images carry only src + alt. Pixel dimensions live in the generator's slot
 * table (scripts/gen-placeholders.mjs) so configs stay readable and every site
 * gets consistent aspect ratios.
 */
const image = z.object({
  src: z.string().startsWith("/", "Image paths are absolute from /public"),
  alt: z.string().min(1, "Alt text is required — it is read by screen readers"),
});

const link = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

/** Lucide icon name, e.g. "Scissors". Validated against the real export map at render time. */
const iconName = z.string().min(1);

/* ------------------------------------------------------------------ *
 * Fonts
 *
 * Kept here as plain strings so this module has no next/font dependency —
 * that lets the validation script run every config under plain node.
 * lib/fonts.ts builds the actual registry and is type-checked against this list.
 * ------------------------------------------------------------------ */

export const FONT_KEYS = [
  "playfair",
  "dmSerif",
  "sourceSerif",
  "lora",
  "merriweather",
  "fraunces",
  "inter",
  "poppins",
  "montserrat",
  "spaceGrotesk",
  "oswald",
  "nunito",
  "archivo",
  "jost",
] as const;

export type FontKey = (typeof FONT_KEYS)[number];
const fontKey = z.enum(FONT_KEYS);

/* ------------------------------------------------------------------ *
 * Section variants
 *
 * Variants are the reason two sites built from this engine do not look like
 * the same template recoloured. Each is a genuinely different layout, not a
 * style tweak.
 * ------------------------------------------------------------------ */

export const VARIANTS = {
  hero: [
    "fullscreen-image",
    "split",
    "minimal-centered",
    "video",
    "angled",
    "split-offset",
    "typographic",
    "card-overlay",
  ],
  about: ["side-by-side", "stacked", "stats-overlay"],
  services: ["grid", "alternating", "tabs", "list"],
  highlights: ["icon-grid", "numbered"],
  gallery: ["masonry", "grid", "filmstrip", "justified"],
  stats: ["bar", "cards", "divided"],
  pricing: ["cards", "table", "simple-list", "comparison-strip"],
  testimonials: ["carousel", "grid", "single-featured", "wall"],
  team: ["grid", "rows"],
  faq: ["single-column", "two-column", "sidebar"],
  timeline: ["vertical", "horizontal"],
  partners: ["marquee", "grid"],
  contact: ["split-map", "centered", "full-form"],
  cta: ["banner", "split", "overlap"],
  booking: ["centered", "split", "steps"],
  navbar: ["solid", "transparent-overlay", "centered-logo"],
  footer: ["columns", "minimal", "cta-heavy"],
} as const;

/** Builds `variant` as a defaulted enum so configs may omit it. */
const variantOf = <K extends keyof typeof VARIANTS>(key: K) =>
  z.enum(VARIANTS[key] as unknown as [string, ...string[]]).default(VARIANTS[key][0]);

/* ------------------------------------------------------------------ *
 * Business
 * ------------------------------------------------------------------ */

const businessHours = z.object({
  /** "Monday", or a range label like "Monday – Friday". */
  day: z.string().min(1),
  /** 24h "09:00". Omit both when `closed`. */
  opens: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  closes: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  closed: z.boolean().default(false),
  /** Schema.org day tokens this row covers, e.g. ["Monday","Tuesday"]. */
  schemaDays: z.array(z.string()).default([]),
});

const businessSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  phone: z.string().min(1),
  email: z.email(),
  /** International format without +, e.g. "27821234567". */
  whatsapp: z.string().regex(/^\d{8,15}$/).optional(),
  address: z.object({
    street: z.string().min(1),
    suburb: z.string().optional(),
    city: z.string().min(1),
    province: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().default("South Africa"),
  }),
  geo: z.object({ lat: z.number(), lng: z.number() }).optional(),
  googleMapsUrl: z.url().optional(),
  /** Google Maps *embed* URL. Without it the map section falls back to a link. */
  googleMapsEmbedUrl: z.url().optional(),
  logo: image.optional(),
  favicon: z.string().startsWith("/").optional(),
  socialLinks: z
    .array(z.object({ platform: z.string().min(1), href: z.url(), icon: iconName }))
    .default([]),
  businessHours: z.array(businessHours).default([]),
});

/* ------------------------------------------------------------------ *
 * Branding
 * ------------------------------------------------------------------ */

const brandingSchema = z.object({
  primaryColor: hex,
  secondaryColor: hex,
  accentColor: hex,
  neutral: z.object({
    /** Page background. */
    bg: hex,
    /** Cards and raised surfaces. */
    surface: hex,
    border: hex,
    text: hex,
    textMuted: hex,
    /** Text placed on primaryColor — set explicitly to keep WCAG AA contrast. */
    onPrimary: hex,
  }),
  fontHeading: fontKey,
  fontBody: fontKey,
  borderRadius: z.enum(["none", "sm", "md", "lg", "xl", "full"]).default("md"),
  /**
   * Shape of the primary button.
   *
   * `gradient` ramps primaryColor → secondaryColor and stops there on purpose:
   * validate-sites.mjs checks `onPrimary` against `primaryColor` only, so a ramp
   * ending on an arbitrary third colour would break contrast where nothing looks.
   */
  buttonStyle: z
    .enum(["solid", "outline", "pill", "underline", "ghost", "soft", "gradient", "raised"])
    .default("solid"),
  /** How a button reacts to hover, independent of its shape. */
  buttonHover: z.enum(["fade", "lift", "press", "glow"]).default("fade"),
  cardStyle: z.enum(["flat", "bordered", "elevated", "glass"]).default("bordered"),
  shadowStyle: z.enum(["none", "soft", "hard"]).default("soft"),
  /**
   * Border thickness on cards, outline buttons and form inputs. `hairline` is
   * the 1px every site shipped with, so it is the default — which is why the
   * middle value is named `medium` rather than `standard`.
   */
  borderWeight: z.enum(["hairline", "medium", "bold"]).default("hairline"),
  /**
   * Shape drawn between consecutive sections. `angled` and `curve` are only
   * visible where neighbouring sections differ in colour, so they are meant to
   * be paired with `sectionTint: "alternating"`.
   */
  sectionDivider: z.enum(["none", "rule", "angled", "curve"]).default("none"),
  /** `alternating` tints every second section with neutral.surface. */
  sectionTint: z.enum(["flat", "alternating"]).default("flat"),
  spacingScale: z.enum(["compact", "normal", "spacious"]).default("normal"),
  /** Reveal distance and duration. `none` disables the scroll reveal entirely. */
  animationStyle: z.enum(["none", "subtle", "lively"]).default("subtle"),
  /** Which motion the scroll reveal uses. animationStyle still sets its size. */
  revealMotion: z.enum(["slide-up", "fade", "slide-in", "scale", "blur"]).default("slide-up"),
  /** Grid items rise in sequence as their grid scrolls in. CSS-only, opt-in. */
  staggerChildren: z.boolean().default(false),
  /** Faint pattern behind the page. Kept low-contrast so body copy is unaffected. */
  surfaceTexture: z.enum(["none", "noise", "grid", "dots", "wash"]).default("none"),
  /** Uppercase + tracked headings. Cheap, high-impact personality lever. */
  headingTransform: z.enum(["none", "uppercase"]).default("none"),
});

/* ------------------------------------------------------------------ *
 * Feature flags
 *
 * The renderer skips a section whose flag is off even when it is listed in
 * `layout`, so a barber can enable booking + gallery while an attorney turns
 * both off with zero code changes.
 * ------------------------------------------------------------------ */

const featuresSchema = z.object({
  booking: z.boolean().default(false),
  gallery: z.boolean().default(false),
  testimonials: z.boolean().default(false),
  /** Reserved. No blog components ship yet — the flag is inert. */
  blog: z.boolean().default(false),
  pricing: z.boolean().default(false),
  whatsapp: z.boolean().default(false),
  newsletter: z.boolean().default(false),
  map: z.boolean().default(false),
  faq: z.boolean().default(false),
});

/* ------------------------------------------------------------------ *
 * Sections
 * ------------------------------------------------------------------ */

const cta = z.object({ label: z.string().min(1), href: z.string().min(1) });

const heroSchema = z.object({
  variant: variantOf("hero"),
  /** Small label above the headline. */
  eyebrow: z.string().optional(),
  headline: z.string().min(1),
  subheadline: z.string().optional(),
  image: image.optional(),
  /** Used by the "video" variant; falls back to `image` when absent. */
  videoUrl: z.string().optional(),
  primaryCta: cta.optional(),
  secondaryCta: cta.optional(),
  /** Trust strip under the CTAs, e.g. ["Est. 1998", "Open 7 days"]. */
  highlights: z.array(z.string()).default([]),
  /** Darkens image heroes so overlaid text keeps AA contrast. 0–100. */
  overlayOpacity: z.number().min(0).max(100).default(50),
  align: z.enum(["left", "center"]).default("left"),
});

const aboutSchema = z.object({
  variant: variantOf("about"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  body: z.array(z.string().min(1)).min(1, "At least one paragraph"),
  image: image.optional(),
  stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
  cta: cta.optional(),
});

const servicesSchema = z.object({
  variant: variantOf("services"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        icon: iconName.optional(),
        image: image.optional(),
        /** Rendered as-is, e.g. "R320" or "from R1 200". */
        price: z.string().optional(),
        /** Bullet points, used by the alternating and tabs variants. */
        points: z.array(z.string()).default([]),
      }),
    )
    .min(1),
  cta: cta.optional(),
});

const highlightsSchema = z.object({
  variant: variantOf("highlights"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        icon: iconName.optional(),
      }),
    )
    .min(1),
});

const gallerySchema = z.object({
  variant: variantOf("gallery"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  images: z.array(image).min(1),
});

const statsSchema = z.object({
  variant: variantOf("stats"),
  heading: z.string().optional(),
  items: z
    .array(z.object({ value: z.string().min(1), label: z.string().min(1), icon: iconName.optional() }))
    .min(1),
});

const pricingSchema = z.object({
  variant: variantOf("pricing"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  note: z.string().optional(),
  plans: z
    .array(
      z.object({
        name: z.string().min(1),
        price: z.string().min(1),
        /** e.g. "per month", "per session". */
        unit: z.string().optional(),
        description: z.string().optional(),
        features: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
        cta: cta.optional(),
      }),
    )
    .min(1),
});

const testimonialsSchema = z.object({
  variant: variantOf("testimonials"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  items: z
    .array(
      z.object({
        quote: z.string().min(1),
        name: z.string().min(1),
        role: z.string().optional(),
        rating: z.number().int().min(1).max(5).optional(),
        image: image.optional(),
      }),
    )
    .min(1),
});

const teamSchema = z.object({
  variant: variantOf("team"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  members: z
    .array(
      z.object({
        name: z.string().min(1),
        role: z.string().min(1),
        bio: z.string().optional(),
        image: image.optional(),
        socials: z.array(z.object({ platform: z.string(), href: z.url(), icon: iconName })).default([]),
      }),
    )
    .min(1),
});

const faqSchema = z.object({
  variant: variantOf("faq"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  items: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).min(1),
});

const timelineSchema = z.object({
  variant: variantOf("timeline"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  items: z
    .array(
      z.object({
        /** Left rail: a year, a time, a step number — whatever the content actually is. */
        marker: z.string().min(1),
        title: z.string().min(1),
        description: z.string().optional(),
        icon: iconName.optional(),
      }),
    )
    .min(1),
});

const partnersSchema = z.object({
  variant: variantOf("partners"),
  heading: z.string().optional(),
  logos: z.array(image).min(1),
});

const contactSchema = z.object({
  variant: variantOf("contact"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  /** Overrides the generic form heading. */
  formHeading: z.string().optional(),
  submitLabel: z.string().default("Send message"),
  successMessage: z.string().default("Thanks — we'll be in touch shortly."),
  /** Extra dropdown on the form, e.g. which service the enquiry is about. */
  subjectOptions: z.array(z.string()).default([]),
});

const bookingSchema = z.object({
  variant: variantOf("booking"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  submitLabel: z.string().default("Request booking"),
  successMessage: z.string().default("Booking request received — we'll confirm shortly."),
  /** Services bookable through the form. */
  serviceOptions: z.array(z.string()).default([]),
  /** Shows date + time inputs. */
  askPreferredTime: z.boolean().default(true),
  /** Interval between generated time slots, computed from business.businessHours. */
  slotLengthMinutes: z.number().int().min(15).max(240).default(60),
  image: image.optional(),
});

const ctaSchema = z.object({
  variant: variantOf("cta"),
  heading: z.string().min(1),
  body: z.string().optional(),
  primaryCta: cta.optional(),
  secondaryCta: cta.optional(),
  image: image.optional(),
});

const navbarSchema = z.object({
  variant: variantOf("navbar"),
  links: z.array(link).default([]),
  cta: cta.optional(),
  /** Phone number shown in the bar on desktop. */
  showPhone: z.boolean().default(true),
});

const footerSchema = z.object({
  variant: variantOf("footer"),
  /** Short paragraph under the logo. */
  blurb: z.string().optional(),
  columns: z.array(z.object({ heading: z.string().min(1), links: z.array(link).min(1) })).default([]),
  /** Shown when `features.newsletter` is on. */
  newsletterHeading: z.string().optional(),
  newsletterBody: z.string().optional(),
  /** `{year}` is replaced at render time. */
  legal: z.string().default("© {year} {business}. All rights reserved."),
  /** Heading for the `cta-heavy` variant's banner. Falls back to the tagline. */
  ctaHeading: z.string().optional(),
  cta: cta.optional(),
});

/* ------------------------------------------------------------------ *
 * SEO
 * ------------------------------------------------------------------ */

const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(200, "Keep meta descriptions under 200 characters"),
  keywords: z.array(z.string()).default([]),
  ogImage: z.string().startsWith("/").optional(),
  /** Schema.org type — must be a LocalBusiness subtype for the JSON-LD to validate. */
  schemaType: z.string().default("LocalBusiness"),
  locale: z.string().default("en_ZA"),
  /** Absolute site URL. Required for sitemap.xml and canonical/OG tags. */
  url: z.url(),
});

/* ------------------------------------------------------------------ *
 * Layout
 * ------------------------------------------------------------------ */

export const SECTION_IDS = [
  "hero",
  "about",
  "services",
  "highlights",
  "gallery",
  "stats",
  "pricing",
  "testimonials",
  "team",
  "faq",
  "timeline",
  "partners",
  "booking",
  "contact",
  "cta",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Sections gated behind a feature flag. A section listed in `layout` whose flag
 * is off is skipped by the renderer — that is the whole point of the flags.
 */
export const SECTION_FLAG: Partial<Record<SectionId, keyof z.infer<typeof featuresSchema>>> = {
  gallery: "gallery",
  testimonials: "testimonials",
  pricing: "pricing",
  faq: "faq",
  booking: "booking",
};

/* ------------------------------------------------------------------ *
 * The config
 * ------------------------------------------------------------------ */

export const SiteConfigSchema = z
  .object({
    /** Must match the /public/<id>/ folder and the NEXT_PUBLIC_SITE value. */
    id: z.string().regex(/^[a-z0-9-]+$/, "Lowercase letters, digits and hyphens only"),
    business: businessSchema,
    branding: brandingSchema,
    features: featuresSchema,
    seo: seoSchema,
    layout: z.array(z.enum(SECTION_IDS)).min(1),
    navbar: navbarSchema,
    footer: footerSchema,

    hero: heroSchema.optional(),
    about: aboutSchema.optional(),
    services: servicesSchema.optional(),
    highlights: highlightsSchema.optional(),
    gallery: gallerySchema.optional(),
    stats: statsSchema.optional(),
    pricing: pricingSchema.optional(),
    testimonials: testimonialsSchema.optional(),
    team: teamSchema.optional(),
    faq: faqSchema.optional(),
    timeline: timelineSchema.optional(),
    partners: partnersSchema.optional(),
    booking: bookingSchema.optional(),
    contact: contactSchema.optional(),
    cta: ctaSchema.optional(),
  })
  .superRefine((config, ctx) => {
    // The failure this catches: a section listed in `layout` with no content
    // object renders as a blank gap on a live client site. Types can't catch it
    // because every section is individually optional.
    for (const id of config.layout) {
      const flag = SECTION_FLAG[id];
      if (flag && !config.features[flag]) continue; // legitimately skipped
      if (!config[id]) {
        ctx.addIssue({
          code: "custom",
          path: [id],
          message: `"${id}" is in layout but has no content. Add a \`${id}\` block, remove it from layout, or turn its feature flag off.`,
        });
      }
    }

    // A flag on with no content is the mirror failure: WhatsApp button with no
    // number, newsletter form with no heading, map with no embed URL.
    if (config.features.whatsapp && !config.business.whatsapp) {
      ctx.addIssue({
        code: "custom",
        path: ["business", "whatsapp"],
        message: "features.whatsapp is on but business.whatsapp is missing.",
      });
    }
    if (config.features.map && !config.business.googleMapsEmbedUrl) {
      ctx.addIssue({
        code: "custom",
        path: ["business", "googleMapsEmbedUrl"],
        message: "features.map is on but business.googleMapsEmbedUrl is missing.",
      });
    }
    if (config.features.newsletter && !config.footer.newsletterHeading) {
      ctx.addIssue({
        code: "custom",
        path: ["footer", "newsletterHeading"],
        message: "features.newsletter is on but footer.newsletterHeading is missing.",
      });
    }

    // Nav links point at on-page anchors; a link to a section that isn't
    // rendered scrolls nowhere.
    for (const [i, l] of config.navbar.links.entries()) {
      if (!l.href.startsWith("#")) continue;
      const target = l.href.slice(1) as SectionId;
      if (!SECTION_IDS.includes(target)) continue;
      const flag = SECTION_FLAG[target];
      const rendered = config.layout.includes(target) && (!flag || config.features[flag]);
      if (!rendered) {
        ctx.addIssue({
          code: "custom",
          path: ["navbar", "links", i, "href"],
          message: `Nav link points at "#${target}" which is not rendered on this site.`,
        });
      }
    }
  });

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
/** What configs are authored as — before defaults are applied. */
export type SiteConfigInput = z.input<typeof SiteConfigSchema>;

export type HeroContent = NonNullable<SiteConfig["hero"]>;
export type AboutContent = NonNullable<SiteConfig["about"]>;
export type ServicesContent = NonNullable<SiteConfig["services"]>;
export type HighlightsContent = NonNullable<SiteConfig["highlights"]>;
export type GalleryContent = NonNullable<SiteConfig["gallery"]>;
export type StatsContent = NonNullable<SiteConfig["stats"]>;
export type PricingContent = NonNullable<SiteConfig["pricing"]>;
export type TestimonialsContent = NonNullable<SiteConfig["testimonials"]>;
export type TeamContent = NonNullable<SiteConfig["team"]>;
export type FaqContent = NonNullable<SiteConfig["faq"]>;
export type TimelineContent = NonNullable<SiteConfig["timeline"]>;
export type PartnersContent = NonNullable<SiteConfig["partners"]>;
export type BookingContent = NonNullable<SiteConfig["booking"]>;
export type ContactContent = NonNullable<SiteConfig["contact"]>;
export type CtaContent = NonNullable<SiteConfig["cta"]>;
export type NavbarContent = SiteConfig["navbar"];
export type FooterContent = SiteConfig["footer"];
export type Branding = SiteConfig["branding"];
export type Business = SiteConfig["business"];
export type SiteImage = z.infer<typeof image>;
