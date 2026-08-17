import type { SiteConfigInput } from "@/lib/schema";

/**
 * Engine test fixture — not a client site.
 *
 * Lists every section and turns on every flag, so `NEXT_PUBLIC_SITE=_test npm run build`
 * renders the whole component library in one page. Keep it in sync when a new
 * section is added; it is the cheapest way to catch a section that throws on
 * data a real config happens not to exercise.
 */
export const testConfig: SiteConfigInput = {
  id: "engine-test",

  business: {
    name: "Engine Test Site",
    tagline: "Every section, every flag, one page",
    phone: "+27 21 000 0000",
    email: "test@example.com",
    whatsapp: "27210000000",
    address: {
      street: "1 Test Street",
      suburb: "Testville",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "8001",
    },
    geo: { lat: -33.9249, lng: 18.4241 },
    googleMapsUrl: "https://maps.google.com/?q=Cape+Town",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Cape+Town&output=embed",
    socialLinks: [
      { platform: "Facebook", href: "https://facebook.com/example", icon: "Facebook" },
      { platform: "Instagram", href: "https://instagram.com/example", icon: "Instagram" },
    ],
    businessHours: [
      { day: "Monday – Friday", opens: "08:00", closes: "17:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
      { day: "Saturday", opens: "09:00", closes: "13:00", schemaDays: ["Saturday"] },
      { day: "Sunday", closed: true, schemaDays: ["Sunday"] },
    ],
  },

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
      onPrimary: "#FFFFFF",
    },
    fontHeading: "playfair",
    fontBody: "inter",
    borderRadius: "md",
    buttonStyle: "solid",
    cardStyle: "bordered",
    shadowStyle: "soft",
    spacingScale: "normal",
    animationStyle: "subtle",
  },

  features: {
    booking: true,
    gallery: true,
    testimonials: true,
    pricing: true,
    whatsapp: true,
    newsletter: true,
    map: true,
    faq: true,
  },

  seo: {
    title: "Engine Test Site",
    description: "Fixture config that renders every section the engine supports.",
    keywords: ["test"],
    schemaType: "LocalBusiness",
    locale: "en_ZA",
    url: "https://example.com",
    ogImage: "/engine-test/og.svg",
  },

  layout: [
    "hero",
    "highlights",
    "about",
    "services",
    "stats",
    "gallery",
    "timeline",
    "pricing",
    "testimonials",
    "team",
    "partners",
    "faq",
    "booking",
    "contact",
    "cta",
  ],

  navbar: {
    variant: "solid",
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Book now", href: "#booking" },
  },

  footer: {
    variant: "columns",
    blurb: "A fixture used to verify the engine renders every section correctly.",
    columns: [
      {
        heading: "Explore",
        links: [
          { label: "About", href: "#about" },
          { label: "Services", href: "#services" },
        ],
      },
      {
        heading: "Support",
        links: [
          { label: "FAQ", href: "#faq" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    newsletterHeading: "Stay in touch",
    newsletterBody: "Occasional updates, no spam.",
  },

  hero: {
    variant: "fullscreen-image",
    eyebrow: "Test fixture",
    headline: "Every section on one page",
    subheadline: "If this page renders cleanly, the engine is healthy.",
    image: { src: "/engine-test/hero.svg", alt: "Placeholder hero image" },
    primaryCta: { label: "Primary action", href: "#contact" },
    secondaryCta: { label: "Secondary", href: "#about" },
    highlights: ["Flag one", "Flag two", "Flag three"],
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "Highlights",
    heading: "Why this fixture exists",
    items: [
      { title: "Catches regressions", description: "Renders every component in one build.", icon: "ShieldCheck" },
      { title: "Exercises flags", description: "Every feature flag is on.", icon: "ToggleRight" },
      { title: "Checks variants", description: "Swap a variant here before shipping it.", icon: "LayoutGrid" },
    ],
  },

  about: {
    variant: "side-by-side",
    eyebrow: "About",
    heading: "A section with an image and stats",
    body: [
      "First paragraph of body copy, long enough to show how the measure and leading behave at this width.",
      "Second paragraph, because the schema allows an array and real configs use more than one.",
    ],
    image: { src: "/engine-test/about.svg", alt: "Placeholder about image" },
    stats: [
      { value: "15", label: "Sections" },
      { value: "30+", label: "Variants" },
      { value: "14", label: "Fonts" },
      { value: "1", label: "Config file" },
    ],
    cta: { label: "Learn more", href: "#services" },
  },

  services: {
    variant: "grid",
    eyebrow: "Services",
    heading: "Service grid",
    intro: "Four items, enough to show the grid wrap at every breakpoint.",
    items: [
      { title: "First service", description: "A short description of the first service.", icon: "Wrench", price: "R450", points: ["Point one", "Point two"] },
      { title: "Second service", description: "A short description of the second service.", icon: "Hammer", price: "R780", points: [] },
      { title: "Third service", description: "A short description of the third service.", icon: "Paintbrush", points: [] },
      { title: "Fourth service", description: "A short description of the fourth service.", icon: "Ruler", points: [] },
    ],
    cta: { label: "See all services", href: "#pricing" },
  },

  stats: {
    variant: "bar",
    items: [
      { value: "20+", label: "Years trading" },
      { value: "4 800", label: "Jobs completed" },
      { value: "4.9", label: "Average rating" },
      { value: "24h", label: "Response time" },
    ],
  },

  gallery: {
    variant: "masonry",
    eyebrow: "Gallery",
    heading: "Masonry gallery",
    images: [
      { src: "/engine-test/gallery-1.svg", alt: "Placeholder gallery image one" },
      { src: "/engine-test/gallery-2.svg", alt: "Placeholder gallery image two" },
      { src: "/engine-test/gallery-3.svg", alt: "Placeholder gallery image three" },
      { src: "/engine-test/gallery-4.svg", alt: "Placeholder gallery image four" },
      { src: "/engine-test/gallery-5.svg", alt: "Placeholder gallery image five" },
      { src: "/engine-test/gallery-6.svg", alt: "Placeholder gallery image six" },
    ],
  },

  timeline: {
    variant: "vertical",
    eyebrow: "Timeline",
    heading: "Vertical timeline",
    items: [
      { marker: "Step 1", title: "First step", description: "What happens first.", icon: "PhoneCall" },
      { marker: "Step 2", title: "Second step", description: "What happens next.", icon: "ClipboardCheck" },
      { marker: "Step 3", title: "Third step", description: "How it finishes.", icon: "CheckCheck" },
    ],
  },

  pricing: {
    variant: "cards",
    eyebrow: "Pricing",
    heading: "Three pricing cards",
    note: "All prices include VAT.",
    plans: [
      { name: "Basic", price: "R450", unit: "per visit", description: "Entry tier.", features: ["Feature one", "Feature two"], cta: { label: "Choose Basic", href: "#contact" } },
      { name: "Standard", price: "R900", unit: "per visit", description: "Most chosen.", features: ["Feature one", "Feature two", "Feature three"], featured: true, cta: { label: "Choose Standard", href: "#contact" } },
      { name: "Premium", price: "R1 500", unit: "per visit", description: "Everything included.", features: ["Feature one", "Feature two", "Feature three", "Feature four"], cta: { label: "Choose Premium", href: "#contact" } },
    ],
  },

  testimonials: {
    variant: "carousel",
    eyebrow: "Reviews",
    heading: "What people say",
    items: [
      { quote: "A clear, specific sentence about the work that was done.", name: "First Reviewer", role: "Cape Town", rating: 5 },
      { quote: "A second review, different in length so the cards do not all match.", name: "Second Reviewer", role: "Claremont", rating: 5 },
      { quote: "A third review to make the carousel actually need to scroll.", name: "Third Reviewer", role: "Sea Point", rating: 4 },
    ],
  },

  team: {
    variant: "grid",
    eyebrow: "Team",
    heading: "The team",
    members: [
      { name: "Team Member One", role: "Founder", bio: "A short biography line.", image: { src: "/engine-test/team-1.svg", alt: "Placeholder portrait one" }, socials: [] },
      { name: "Team Member Two", role: "Manager", bio: "A short biography line.", image: { src: "/engine-test/team-2.svg", alt: "Placeholder portrait two" }, socials: [] },
      { name: "Team Member Three", role: "Technician", bio: "A short biography line.", image: { src: "/engine-test/team-3.svg", alt: "Placeholder portrait three" }, socials: [] },
      { name: "Team Member Four", role: "Apprentice", bio: "A short biography line.", image: { src: "/engine-test/team-4.svg", alt: "Placeholder portrait four" }, socials: [] },
    ],
  },

  partners: {
    variant: "marquee",
    heading: "Trusted by",
    logos: [
      { src: "/engine-test/logo-1.svg", alt: "Placeholder partner logo one" },
      { src: "/engine-test/logo-2.svg", alt: "Placeholder partner logo two" },
      { src: "/engine-test/logo-3.svg", alt: "Placeholder partner logo three" },
      { src: "/engine-test/logo-4.svg", alt: "Placeholder partner logo four" },
      { src: "/engine-test/logo-5.svg", alt: "Placeholder partner logo five" },
    ],
  },

  faq: {
    variant: "single-column",
    eyebrow: "FAQ",
    heading: "Common questions",
    items: [
      { question: "Does the accordion work without JavaScript?", answer: "Yes — it is a native <details> element, so it opens, closes and is keyboard operable with no script at all." },
      { question: "Is the second answer long enough to wrap?", answer: "It is, which is the point: short answers hide layout problems that only appear once the text runs to several lines on a narrow screen." },
      { question: "Are these indexed by Google?", answer: "Yes, the FAQ section also emits FAQPage structured data." },
    ],
  },

  booking: {
    variant: "split",
    eyebrow: "Booking",
    heading: "Request a booking",
    intro: "The booking form is the enquiry form with a service picker and a preferred time.",
    serviceOptions: ["First service", "Second service", "Third service"],
    image: { src: "/engine-test/booking.svg", alt: "Placeholder booking image" },
  },

  contact: {
    variant: "split-map",
    eyebrow: "Contact",
    heading: "Get in touch",
    intro: "Details, a working form and an embedded map.",
    formHeading: "Send us a message",
    subjectOptions: ["General enquiry", "Quote request", "Complaint"],
  },

  cta: {
    variant: "banner",
    heading: "A closing call to action",
    body: "The last thing on the page before the footer.",
    primaryCta: { label: "Call us", href: "tel:+27210000000" },
    secondaryCta: { label: "Email us", href: "mailto:test@example.com" },
  },
};
