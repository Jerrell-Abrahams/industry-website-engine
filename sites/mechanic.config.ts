import type { SiteConfigInput } from "@/lib/schema";

/**
 * Precision Auto Works — Pinetown, Durban.
 *
 * DESIGN BRIEF
 * Direction (pinned): industrial, high contrast, services tabs, stats, WhatsApp prominent.
 * Anti-default: safety orange on near-black is the obvious industrial cliché and
 * lands squarely on the dark-plus-one-bright-accent default. This inverts it —
 * a light workshop grey ground with gunmetal as the primary, and the orange kept
 * back for genuine emphasis so it still reads as a warning colour.
 * Type: Space Grotesk uppercase over Inter. Space Grotesk carries the technical,
 * slightly mechanical feel without tipping into a novelty face.
 * Zero radius and a hard shadow: this site is stamped, not rounded. Compact
 * spacing because a workshop site should feel efficient, not luxurious.
 * Signature: the tabbed service bays. `services: tabs` lets a customer land on
 * the one job they came for — clutch, diagnostics, service — without scrolling
 * past four they do not need.
 *
 * Images expected in /public/mechanic/ — hero 1920×1080, service 1000×750.
 */
export const mechanicConfig: SiteConfigInput = {
  id: "mechanic",

  business: {
    name: "Precision Auto Works",
    tagline: "Diagnose properly, fix once",
    phone: "031 701 2245",
    email: "workshop@precisionauto.co.za",
    whatsapp: "27834112245",
    address: {
      street: "22 Kimberley Road",
      suburb: "New Germany",
      city: "Pinetown",
      province: "KwaZulu-Natal",
      postalCode: "3610",
    },
    geo: { lat: -29.8087, lng: 30.8721 },
    googleMapsUrl: "https://maps.google.com/?q=Kimberley+Road+New+Germany+Pinetown",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=Kimberley+Road+New+Germany+Pinetown&output=embed",
    socialLinks: [
      { platform: "Facebook", href: "https://facebook.com/precisionautoworks", icon: "Facebook" },
    ],
    businessHours: [
      { day: "Monday – Friday", opens: "07:30", closes: "17:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
      { day: "Saturday", opens: "08:00", closes: "13:00", schemaDays: ["Saturday"] },
      { day: "Sunday", closed: true, schemaDays: ["Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#1D2530",
    secondaryColor: "#333D4B",
    accentColor: "#C4530C",
    neutral: {
      bg: "#F3F4F6",
      surface: "#FFFFFF",
      border: "#CFD4DB",
      text: "#14181E",
      textMuted: "#4E5764",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "spaceGrotesk",
    fontBody: "inter",
    borderRadius: "none",
    buttonStyle: "solid",
    cardStyle: "elevated",
    shadowStyle: "hard",
    spacingScale: "compact",
    animationStyle: "subtle",
    headingTransform: "uppercase",
  },

  features: {
    booking: false,
    gallery: false,
    testimonials: true,
    pricing: true,
    whatsapp: true,
    newsletter: false,
    map: true,
    faq: true,
    openNowBadge: true,
  },

  seo: {
    title: "Precision Auto Works | Car service and repairs, Pinetown",
    description:
      "Independent workshop in New Germany, Pinetown. Servicing, diagnostics, clutches and brakes for most makes. RMI accredited, service-plan safe.",
    keywords: [
      "car service Pinetown",
      "mechanic New Germany",
      "car diagnostics Durban",
      "clutch replacement Pinetown",
    ],
    ogImage: "/mechanic/og.svg",
    schemaType: "AutoRepair",
    locale: "en_ZA",
    url: "https://precisionauto.co.za",
  },

  layout: ["hero", "stats", "services", "highlights", "pricing", "testimonials", "faq", "contact", "cta"],

  navbar: {
    variant: "solid",
    links: [
      { label: "Services", href: "#services" },
      { label: "Pricing", href: "#pricing" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Find us", href: "#contact" },
    ],
    cta: { label: "Get a quote", href: "#contact" },
    showPhone: true,
  },

  footer: {
    variant: "columns",
    blurb:
      "An independent workshop in New Germany since 2006. RMI accredited, and servicing here will not void your manufacturer's warranty.",
    columns: [
      {
        heading: "Workshop",
        links: [
          { label: "Services", href: "#services" },
          { label: "Pricing", href: "#pricing" },
          { label: "Common questions", href: "#faq" },
        ],
      },
      {
        heading: "Contact",
        links: [
          { label: "Get a quote", href: "#contact" },
          { label: "Reviews", href: "#testimonials" },
        ],
      },
    ],
    legal: "© {year} {business}. RMI accredited workshop. Pinetown, KwaZulu-Natal.",
  },

  hero: {
    variant: "angled",
    eyebrow: "New Germany, Pinetown",
    headline: "We find the actual fault",
    subheadline:
      "Independent servicing and repairs for most makes. Every job starts with a diagnostic and a written quote, and nothing gets replaced until you have approved it.",
    image: { src: "/mechanic/hero.jpg", alt: "A vehicle on the lift in the Precision Auto Works workshop" },
    primaryCta: { label: "Get a quote", href: "#contact" },
    secondaryCta: { label: "WhatsApp us", href: "https://wa.me/27834112245" },
    highlights: ["RMI accredited", "Service-plan safe", "Courtesy car available"],
    align: "left",
  },

  stats: {
    variant: "bar",
    items: [
      { value: "2006", label: "Trading since" },
      { value: "6", label: "Bays, four qualified techs" },
      { value: "12mo", label: "Warranty on parts and labour" },
      { value: "24hr", label: "Turnaround on most services" },
    ],
  },

  services: {
    variant: "tabs",
    eyebrow: "What we do",
    heading: "Pick the job you came for",
    intro:
      "Most makes, petrol and diesel. We do not work on heavy commercial vehicles or motorcycles.",
    items: [
      {
        title: "Major and minor service",
        description:
          "A full service to the manufacturer's schedule using OEM-equivalent parts and the correct oil specification. We log the work so your service history stays intact.",
        icon: "Wrench",
        image: { src: "/mechanic/service-1.jpg", alt: "An oil filter being replaced during a service" },
        price: "From R1 450",
        points: [
          "Oil, filters and plugs to spec",
          "42-point inspection with a written report",
          "Service book stamped and digitally logged",
          "Does not affect your manufacturer's warranty",
        ],
      },
      {
        title: "Diagnostics",
        description:
          "Engine light on, intermittent fault, or a rattle nobody else could place. We run the scan, then confirm it on the vehicle before quoting — a fault code is a starting point, not a diagnosis.",
        icon: "Activity",
        image: { src: "/mechanic/service-2.jpg", alt: "A diagnostic scanner connected to a vehicle" },
        price: "R650 diagnostic fee",
        points: [
          "Multi-brand scan tool coverage",
          "Live data and road test where needed",
          "Diagnostic fee credited against the repair",
          "Written findings before any work starts",
        ],
      },
      {
        title: "Clutch and gearbox",
        description:
          "Clutch replacement, slave and master cylinders, and gearbox removal and refit. Manual transmissions in-house; automatic rebuilds go to a specialist we have used for fifteen years.",
        icon: "Cog",
        image: { src: "/mechanic/service-3.jpg", alt: "A clutch plate and pressure plate on the bench" },
        price: "From R6 800",
        points: [
          "Manual clutch kits, most makes",
          "Flywheel skim or replacement assessed properly",
          "Two to three days depending on parts",
          "12-month warranty on parts and labour",
        ],
      },
      {
        title: "Brakes and suspension",
        description:
          "Pads, discs, shocks and bushes. We measure disc thickness and tell you what is actually worn rather than replacing a full set by default.",
        icon: "CircleDot",
        image: { src: "/mechanic/service-4.jpg", alt: "A brake disc being measured with a micrometer" },
        price: "From R1 900",
        points: [
          "Discs measured, not guessed",
          "Shocks tested on the vehicle",
          "Wheel alignment after suspension work",
          "Same-day on most brake jobs",
        ],
      },
      {
        title: "Pre-purchase inspection",
        description:
          "Before you buy a used car, bring it here. Two hours on the lift, a full scan and a written report on what it will cost you in the next year.",
        icon: "ClipboardCheck",
        image: { src: "/mechanic/service-5.jpg", alt: "A technician inspecting the underside of a used car" },
        price: "R900",
        points: [
          "Full inspection on the lift",
          "Scan for cleared fault codes",
          "Written report the same day",
          "Cheapest money you will spend on that car",
        ],
      },
    ],
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "How we work",
    heading: "No surprises on the invoice",
    items: [
      {
        title: "Quote before work",
        description:
          "You get a written quote by WhatsApp or email before a spanner is picked up. If we find something else once we are in, we stop and phone you.",
        icon: "FileCheck",
      },
      {
        title: "Old parts back",
        description:
          "Every part we replace is kept and shown to you on collection. If you would rather not take them, we recycle them.",
        icon: "PackageOpen",
      },
      {
        title: "Warranty that means it",
        description:
          "Twelve months on parts and labour across every job. Bring it back and we sort it out without an argument.",
        icon: "ShieldCheck",
      },
      {
        title: "Your warranty is safe",
        description:
          "Servicing at an independent workshop cannot void your manufacturer's warranty. We use the correct specification parts and log everything.",
        icon: "BadgeCheck",
      },
    ],
  },

  pricing: {
    variant: "table",
    eyebrow: "Pricing",
    heading: "Service pricing, up front",
    intro:
      "Indicative pricing for a mid-size petrol hatchback. Your exact quote depends on the vehicle and the oil specification it needs.",
    note:
      "Prices include VAT and exclude parts beyond those listed. Diesel and larger engines cost more — send us your registration number for an exact figure.",
    plans: [
      {
        name: "Minor service",
        price: "R1 450",
        unit: "from",
        features: [
          "Engine oil and filter",
          "Air filter",
          "42-point inspection",
          "Service book stamped",
          "Brake and tyre report",
        ],
        cta: { label: "Book a minor service", href: "#contact" },
      },
      {
        name: "Major service",
        price: "R2 700",
        unit: "from",
        featured: true,
        features: [
          "Engine oil and filter",
          "Air filter",
          "42-point inspection",
          "Service book stamped",
          "Brake and tyre report",
          "Fuel and cabin filters",
          "Spark plugs",
          "Brake fluid test and top-up",
        ],
        cta: { label: "Book a major service", href: "#contact" },
      },
      {
        name: "Diagnostic",
        price: "R650",
        unit: "fee",
        features: [
          "42-point inspection",
          "Written findings before work",
          "Fee credited against the repair",
        ],
        cta: { label: "Book a diagnostic", href: "#contact" },
      },
    ],
  },

  testimonials: {
    variant: "grid",
    eyebrow: "Reviews",
    heading: "What customers say",
    items: [
      {
        quote:
          "Two other places replaced parts guessing at my engine light. These guys ran the diagnostic, found a cracked vacuum hose, and charged me for the hose and an hour.",
        name: "Rajesh Naicker",
        role: "Westville",
        rating: 5,
      },
      {
        quote:
          "They kept the old clutch plate to show me the wear. First workshop that has ever bothered.",
        name: "Michelle du Toit",
        role: "Kloof",
        rating: 5,
      },
      {
        quote:
          "Had them inspect a used Polo before I bought it. Report showed a gearbox issue the dealer had not mentioned. That R900 saved me about thirty thousand.",
        name: "Sifiso Mthembu",
        role: "Hillcrest",
        rating: 5,
      },
      {
        quote:
          "Quote came through on WhatsApp within the hour, and the final invoice matched it to the rand.",
        name: "Anton Meyer",
        role: "Pinetown",
        rating: 5,
      },
      {
        quote:
          "Busy place, so book ahead. Once the car is in, the work is honest and it comes back when they said it would.",
        name: "Precious Khumalo",
        role: "New Germany",
        rating: 4,
      },
      {
        quote:
          "Still servicing my Hilux here after eleven years. Never once been sold something I did not need.",
        name: "Gerhard Steyn",
        role: "Gillitts",
        rating: 5,
      },
    ],
  },

  faq: {
    variant: "single-column",
    eyebrow: "Questions",
    heading: "What customers ask us",
    items: [
      {
        question: "Will servicing here void my manufacturer's warranty?",
        answer:
          "No. South African competition regulations allow you to service at any accredited workshop without affecting your warranty, provided the correct specification parts and fluids are used and the work is logged. We do both, and we give you the documentation.",
      },
      {
        question: "Can you still service a car that is on a service plan?",
        answer:
          "We can, but the plan will not reimburse us — the manufacturer only pays their own dealer network. If your car is on a plan that still has value in it, use the dealer and come to us afterwards.",
      },
      {
        question: "How long does a service take?",
        answer:
          "A minor service is usually done the same day if it is in before nine. A major service is a full day. Anything involving parts we do not stock depends on the supplier, and we will tell you up front.",
      },
      {
        question: "Do you have a courtesy car?",
        answer:
          "We have two, available free for jobs over R3 000 and at R250 a day otherwise. They book up, so ask when you make the appointment rather than on the morning.",
      },
      {
        question: "What makes do you not work on?",
        answer:
          "No heavy commercial vehicles or motorcycles. We take on most passenger cars and light commercials, though for some European marques we will refer you to a specialist rather than guess.",
      },
      {
        question: "Do you take card?",
        answer:
          "Card, EFT and SnapScan. Payment is on collection — we do not require a deposit unless the job needs parts ordered in specially.",
      },
    ],
  },

  contact: {
    variant: "split-map",
    eyebrow: "Find us",
    heading: "22 Kimberley Road, New Germany",
    intro:
      "Send us your registration number and what the car is doing, and we will come back with a quote. WhatsApp is fastest.",
    formHeading: "Request a quote",
    submitLabel: "Request quote",
    successMessage:
      "Thanks — we have your details. Expect a quote by WhatsApp or email within one working day.",
    subjectOptions: [
      "Service",
      "Diagnostics",
      "Clutch or gearbox",
      "Brakes or suspension",
      "Pre-purchase inspection",
      "Something else",
    ],
  },

  cta: {
    variant: "split",
    heading: "Send us the registration number",
    body:
      "Tell us the make, the registration and what it is doing. Most quotes go out the same working day, and the diagnostic fee comes off the repair.",
    primaryCta: { label: "WhatsApp the workshop", href: "https://wa.me/27834112245" },
    secondaryCta: { label: "031 701 2245", href: "tel:0317012245" },
    image: { src: "/mechanic/cta.jpg", alt: "The workshop entrance on Kimberley Road" },
  },
};
