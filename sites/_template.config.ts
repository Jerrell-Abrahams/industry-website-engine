import type { SiteConfigInput } from "@/lib/schema";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * NEW CLIENT TEMPLATE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 1.  npm run new -- newclient            copies this file, renames the export,
 *                                        registers it in sites/index.ts and
 *                                        generates artwork in /public/newclient/
 * 2.  Fill the new file in. Every visible string on the site comes from here.
 * 3.  npm run validate                    schema, contrast and distinctiveness
 *                                        (it will fail until you pick variants
 *                                        no other site already uses)
 * 4.  NEXT_PUBLIC_SITE=newclient npm run dev
 * 5.  Drop the client's real photos over the generated SVGs in /public/newclient/
 * 6.  Create a Vercel project with NEXT_PUBLIC_SITE=newclient, then:
 *       vercel link --yes --project newclient && vercel --prod --yes
 * 7.  When they pay, set `demo: false` — drops the pill, allows indexing, and
 *     publishes the POPIA notice at /privacy.
 *
 * This file is NOT registered in sites/index.ts and never ships. It exists to
 * be copied.
 *
 * ── PICKING VARIANTS ────────────────────────────────────────────────────────
 * Variants are what stop two clients looking like the same template recoloured.
 * `npm run validate` fails if two client sites share a hero+services pair, so
 * check what is already taken before choosing.
 *
 *   hero          fullscreen-image · split · minimal-centered · video · angled
 *   about         side-by-side · stacked · stats-overlay
 *   services      grid · alternating · tabs · list
 *   highlights    icon-grid · numbered
 *   gallery       masonry · grid · filmstrip
 *   stats         bar · cards
 *   pricing       cards · table · simple-list
 *   testimonials  carousel · grid · single-featured
 *   team          grid · rows
 *   faq           single-column · two-column
 *   timeline      vertical · horizontal
 *   partners      marquee · grid
 *   booking       centered · split
 *   contact       split-map · centered · full-form
 *   cta           banner · split
 *   navbar        solid · transparent-overlay · centered-logo
 *   footer        columns · minimal · cta-heavy
 *
 * ── FONTS ───────────────────────────────────────────────────────────────────
 * Reference by registry key (see lib/fonts.ts to add more):
 *   serif    playfair · dmSerif · sourceSerif · lora · merriweather
 *   display  fraunces · oswald
 *   sans     inter · poppins · montserrat · spaceGrotesk · nunito · archivo · jost
 *
 * ── IMAGES ──────────────────────────────────────────────────────────────────
 * All paths are absolute from /public and must start with /<id>/.
 * `npm run placeholders` generates a correctly-proportioned SVG for each, so a
 * real photo of the same ratio drops straight in with no layout shift:
 *   hero 1920×1080 · about 1200×900 · service 1000×750 · gallery 800×1000
 *   team 600×600 · avatar 160×160 · logo 320×128 · booking 1000×1250
 *   cta 1000×750 · og 1200×630 · brand logo 320×80
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const templateConfig: SiteConfigInput = {
  /** Lowercase, hyphens only. Must match the key in sites/index.ts and /public/<id>/. */
  id: "newclient",

  // Omitted on purpose: `demo` defaults to true, which is what a new config
  // always is. When the client pays, set `demo: false` here — that drops the
  // "Demo site" pill and lets the site into search results. The "Powered by
  // Complex AI" footer credit stays either way.

  business: {
    name: "New Client Trading",
    tagline: "A short line that would fit on a shopfront",
    phone: "021 000 0000",
    email: "hello@newclient.co.za",
    /** International format, no +. Omit if features.whatsapp is false. */
    whatsapp: "27820000000",
    address: {
      street: "1 Example Road",
      suburb: "Suburb",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "0000",
      // country defaults to "South Africa"
    },
    /** Optional. Improves local SEO — get it from Google Maps. */
    geo: { lat: -33.9249, lng: 18.4241 },
    googleMapsUrl: "https://maps.google.com/?q=1+Example+Road",
    /** Required when features.map is on. Maps → Share → Embed a map. */
    googleMapsEmbedUrl: "https://www.google.com/maps?q=1+Example+Road&output=embed",
    /** Optional. Without it the business name is rendered as a wordmark. */
    // logo: { src: "/newclient/logo.svg", alt: "New Client Trading" },
    // favicon: "/newclient/favicon.ico",
    socialLinks: [
      // `icon` is any Lucide icon name — https://lucide.dev/icons
      { platform: "Facebook", href: "https://facebook.com/newclient", icon: "Facebook" },
      { platform: "Instagram", href: "https://instagram.com/newclient", icon: "Instagram" },
    ],
    /** `schemaDays` feeds Google's opening-hours rich result. */
    businessHours: [
      {
        day: "Monday – Friday",
        opens: "08:00",
        closes: "17:00",
        schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
      { day: "Saturday", opens: "09:00", closes: "13:00", schemaDays: ["Saturday"] },
      { day: "Sunday", closed: true, schemaDays: ["Sunday"] },
    ],
  },

  /**
   * `npm run validate` checks every colour pair below for WCAG AA contrast and
   * fails the build if body text would be unreadable. Adjust until it passes —
   * do not weaken the check.
   */
  branding: {
    primaryColor: "#1F5F4B",
    secondaryColor: "#123A2E",
    accentColor: "#A9761E",
    neutral: {
      bg: "#FFFFFF",
      surface: "#F4F6F5",
      border: "#DDE3E0",
      text: "#14201C",
      textMuted: "#5A6A64",
      /** Text drawn on primaryColor. On a light primary this must be dark. */
      onPrimary: "#FFFFFF",
    },
    fontHeading: "playfair",
    fontBody: "inter",
    borderRadius: "md", // none · sm · md · lg · xl · full
    buttonStyle: "solid", // solid · outline · pill · underline
    cardStyle: "bordered", // flat · bordered · elevated · glass
    shadowStyle: "soft", // none · soft · hard
    spacingScale: "normal", // compact · normal · spacious
    animationStyle: "subtle", // none · subtle · lively
    headingTransform: "none", // none · uppercase
  },

  /**
   * A section listed in `layout` whose flag is off is skipped entirely — you do
   * not need to remove it from the layout array to turn a feature off.
   *
   * Healthcare and legal clients: `testimonials` must stay false. HPCSA rules
   * (Physician, Dentist, MedicalClinic ...) and Legal Practice Council rules
   * (LegalService, Attorney, Notary) both restrict testimonial advertising, and
   * npm run validate fails a live site that turns it on. Superlative claims and
   * guarantees of outcome are restricted too — those the schema cannot see, so
   * have someone who knows the rules read the copy.
   */
  features: {
    booking: false,
    gallery: false,
    testimonials: false,
    pricing: false,
    whatsapp: true,
    newsletter: false,
    map: true,
    faq: true,
  },

  /**
   * Statutory disclosure, rendered as one line in the footer.
   *
   * ECTA s43 wants the legal name and registration number on any site offering
   * services electronically; npm run validate warns when a live site omits
   * them. `registrations` is for whatever the client's regulator requires:
   *   security       { label: "PSIRA", value: "1234567" }
   *   estate agent   { label: "PPRA FFC", value: "..." }
   *   healthcare     { label: "HPCSA", value: "MP0123456" }
   *   attorney       { label: "LPC", value: "..." }
   *   funeral/policy { label: "FSP", value: "..." }
   */
  compliance: {
    registeredName: "New Client Trading (Pty) Ltd",
    registrationNumber: "2019/123456/07",
    registrations: [],
  },

  /**
   * POPIA notice at /privacy, published on live sites only. Both officer fields
   * fall back to the business name and email. Set `lastUpdated` by hand when
   * the terms change — it is not a build date.
   */
  // privacy: { lastUpdated: "1 March 2026" },

  seo: {
    title: "New Client Trading | What they do, where they are",
    description:
      "One or two sentences someone would actually click in a search result. Under 200 characters.",
    keywords: ["service suburb", "service city"],
    ogImage: "/newclient/og.svg",
    /** A LocalBusiness subtype: Restaurant · HairSalon · LegalService · AutoRepair · Dentist · Plumber · Church … */
    schemaType: "LocalBusiness",
    locale: "en_ZA",
    /** Absolute, no trailing slash. Required for sitemap.xml and OG tags. */
    url: "https://newclient.co.za",
  },

  /** Render order. Only sections listed here appear. */
  layout: ["hero", "about", "services", "highlights", "faq", "contact", "cta"],

  navbar: {
    variant: "solid",
    /** `#anchor` links must point at a section this site actually renders. */
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Get in touch", href: "#contact" },
    showPhone: true,
  },

  footer: {
    variant: "columns",
    blurb: "Two sentences on who this business is and where it operates.",
    columns: [
      {
        heading: "Company",
        links: [
          { label: "About", href: "#about" },
          { label: "Services", href: "#services" },
        ],
      },
      {
        heading: "Support",
        links: [
          { label: "Questions", href: "#faq" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    // Required when features.newsletter is on:
    // newsletterHeading: "Stay in touch",
    // newsletterBody: "One email a month.",
    // Used by the cta-heavy footer variant:
    // ctaHeading: "Ready to start?",
    // cta: { label: "Get a quote", href: "#contact" },
    legal: "© {year} {business}. All rights reserved.",
  },

  hero: {
    variant: "fullscreen-image",
    eyebrow: "Suburb, City",
    headline: "The one thing this business wants to be known for",
    subheadline:
      "Two lines that say what they do and who for, in the words a customer would use rather than the words the industry uses.",
    image: { src: "/newclient/hero.svg", alt: "Describe the photo for a screen reader" },
    // videoUrl: "/newclient/hero.mp4",   // only used by the "video" variant
    primaryCta: { label: "Get in touch", href: "#contact" },
    secondaryCta: { label: "See what we do", href: "#services" },
    highlights: ["Since 2010", "Open Saturdays", "Free quotes"],
    /** 0–100. Raise it if hero text is hard to read against the photo. */
    overlayOpacity: 55,
    align: "left", // left · center
  },

  about: {
    variant: "side-by-side",
    eyebrow: "About us",
    heading: "A heading with something specific in it",
    body: [
      "First paragraph. Say something only this business could say — a year, a place, a decision they made.",
      "Second paragraph. What that means for the customer.",
    ],
    image: { src: "/newclient/about.svg", alt: "Describe the photo" },
    stats: [
      { value: "15", label: "Years trading" },
      { value: "2 400", label: "Jobs completed" },
    ],
    cta: { label: "Learn more", href: "#services" },
  },

  services: {
    variant: "grid",
    eyebrow: "What we do",
    heading: "Services",
    intro: "One sentence framing the list.",
    items: [
      {
        title: "First service",
        description: "What it is, in plain language, and who it is for.",
        icon: "Wrench", // https://lucide.dev/icons
        price: "From R450", // optional, rendered as-is
        points: ["A detail", "Another detail"], // used by alternating, tabs and list
        // image: { src: "/newclient/service-1.svg", alt: "…" },  // alternating & tabs
      },
      {
        title: "Second service",
        description: "What it is, in plain language, and who it is for.",
        icon: "Hammer",
        points: [],
      },
      {
        title: "Third service",
        description: "What it is, in plain language, and who it is for.",
        icon: "Ruler",
        points: [],
      },
    ],
    cta: { label: "Get a quote", href: "#contact" },
  },

  highlights: {
    /** Use `numbered` only when the items are genuinely a sequence. */
    variant: "icon-grid",
    eyebrow: "Why us",
    heading: "What makes this business different",
    items: [
      { title: "First reason", description: "Concrete, not a slogan.", icon: "ShieldCheck" },
      { title: "Second reason", description: "Concrete, not a slogan.", icon: "Clock" },
      { title: "Third reason", description: "Concrete, not a slogan.", icon: "Award" },
    ],
  },

  faq: {
    variant: "single-column",
    eyebrow: "Questions",
    heading: "What people ask",
    items: [
      {
        question: "Use the question a customer actually phones to ask.",
        answer: "Answer it properly. This section also generates FAQ rich results for Google.",
      },
      {
        question: "A second real question.",
        answer: "A second real answer.",
      },
    ],
  },

  contact: {
    variant: "split-map",
    eyebrow: "Get in touch",
    heading: "Contact us",
    intro: "One line telling them what happens after they send the form.",
    formHeading: "Send us a message",
    submitLabel: "Send message",
    successMessage: "Thanks — we'll be in touch within one working day.",
    subjectOptions: ["General enquiry", "Quote request", "Something else"],
  },

  cta: {
    variant: "banner",
    heading: "A closing line that asks for the business",
    body: "One supporting sentence.",
    primaryCta: { label: "Get in touch", href: "#contact" },
    secondaryCta: { label: "021 000 0000", href: "tel:0210000000" },
  },

  /* ── Sections not used above. Uncomment, and add the id to `layout`. ──────
   *
   * gallery:      needs features.gallery
   * pricing:      needs features.pricing
   * testimonials: needs features.testimonials
   * booking:      needs features.booking
   * stats, team, timeline, partners: no flag, just add to `layout`
   *
   * See sites/_test.config.ts for a filled-in example of every one of them.
   */
};
