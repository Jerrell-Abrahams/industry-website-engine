import type { SiteConfigInput } from "@/lib/schema";

/**
 * Sparkle & Shine Cleaning — Randburg, Johannesburg.
 * Variants: minimal-centered + grid. Bright, plain and price-forward — this is a
 * commodity service where the buying decision is "what does it cost and are the
 * staff vetted", so the site answers both before anything else.
 */
export const cleaningConfig: SiteConfigInput = {
  id: "cleaning",

  business: {
    name: "Sparkle & Shine Cleaning",
    tagline: "Vetted cleaners, fixed prices",
    phone: "011 792 6635",
    email: "bookings@sparkleandshine.co.za",
    whatsapp: "27827926635",
    address: {
      street: "Unit 7, Kildrummy Office Park, 12 Witkoppen Road",
      suburb: "Ferndale",
      city: "Randburg",
      province: "Gauteng",
      postalCode: "2194",
    },
    geo: { lat: -26.0879, lng: 28.0016 },
    googleMapsUrl: "https://maps.google.com/?q=Witkoppen+Road+Randburg",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Witkoppen+Road+Randburg&output=embed",
    socialLinks: [
      { platform: "Facebook", href: "https://facebook.com/sparkleandshinesa", icon: "Facebook" },
    ],
    businessHours: [
      { day: "Monday – Friday", opens: "07:00", closes: "17:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
      { day: "Saturday", opens: "08:00", closes: "14:00", schemaDays: ["Saturday"] },
      { day: "Sunday", closed: true, schemaDays: ["Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#1E7A5F",
    secondaryColor: "#145C46",
    accentColor: "#B06713",
    neutral: {
      bg: "#FFFFFF",
      surface: "#EFF7F4",
      border: "#D2E6DF",
      text: "#16231F",
      textMuted: "#47594F",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "poppins",
    fontBody: "nunito",
    borderRadius: "xl",
    buttonStyle: "pill",
    cardStyle: "flat",
    shadowStyle: "soft",
    spacingScale: "normal",
    animationStyle: "lively",
  },

  features: {
    booking: true,
    gallery: false,
    testimonials: true,
    blog: false,
    pricing: true,
    whatsapp: true,
    newsletter: false,
    map: false,
    faq: true,
  },

  seo: {
    title: "Sparkle & Shine Cleaning | Domestic and office cleaning, Randburg",
    description:
      "Police-vetted, insured cleaners across Randburg, Fourways and Northcliff. Fixed prices, same cleaner every visit, no contracts.",
    keywords: ["cleaning services Randburg", "domestic cleaner Fourways", "office cleaning Johannesburg", "deep clean Northcliff"],
    ogImage: "/cleaning/og.svg",
    // Schema.org has no cleaning-specific LocalBusiness subtype.
    schemaType: "ProfessionalService",
    locale: "en_ZA",
    url: "https://sparkleandshine.co.za",
  },

  layout: ["hero", "highlights", "services", "pricing", "stats", "testimonials", "faq", "booking", "contact"],

  navbar: {
    variant: "solid",
    links: [
      { label: "Services", href: "#services" },
      { label: "Prices", href: "#pricing" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Questions", href: "#faq" },
    ],
    cta: { label: "Book a clean", href: "#booking" },
    showPhone: true,
  },

  footer: {
    variant: "minimal",
    blurb:
      "Covering Randburg, Ferndale, Fourways, Northcliff, Blairgowrie and Cresta. All staff police-cleared and covered by our public liability insurance.",
    columns: [
      {
        heading: "Navigate",
        links: [
          { label: "Services", href: "#services" },
          { label: "Prices", href: "#pricing" },
          { label: "Book a clean", href: "#booking" },
          { label: "Questions", href: "#faq" },
        ],
      },
    ],
    legal: "© {year} {business}. Randburg, Johannesburg.",
  },

  hero: {
    variant: "minimal-centered",
    eyebrow: "Randburg · Fourways · Northcliff",
    headline: "The same cleaner, every single week",
    subheadline:
      "Police-cleared, insured, and paid properly — which is why they stay. Fixed prices published below, no contract, and you can cancel any week without a penalty.",
    primaryCta: { label: "Book a clean", href: "#booking" },
    secondaryCta: { label: "See prices", href: "#pricing" },
    highlights: ["Police-cleared staff", "R5m public liability", "No contracts"],
    align: "center",
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "Why us",
    heading: "The three things people actually worry about",
    items: [
      {
        title: "Who is in my house?",
        description:
          "Every cleaner is police-cleared, ID-verified and reference-checked before their first job. You get the same person each week and you meet them at the first clean.",
        icon: "BadgeCheck",
      },
      {
        title: "What if something breaks?",
        description:
          "We carry R5 million public liability cover and all staff are covered by COIDA. If something is damaged we replace it, without an argument about who saw what.",
        icon: "ShieldCheck",
      },
      {
        title: "What will it cost?",
        description:
          "Prices are published on this page and quoted per job before we start. No hourly creep, no travel surcharge inside our service area, no VAT surprise on the invoice.",
        icon: "Receipt",
      },
    ],
  },

  services: {
    variant: "grid",
    eyebrow: "Services",
    heading: "What we clean",
    intro: "We bring our own equipment and eco-friendly products unless you prefer we use yours.",
    items: [
      {
        title: "Weekly or fortnightly domestic",
        description:
          "A regular clean of the whole house by the same cleaner each visit. Most three-bedroom homes take four to five hours.",
        icon: "House",
        price: "From R420 per visit",
        points: ["Same cleaner every time", "Equipment and products included"],
      },
      {
        title: "Deep clean",
        description:
          "Inside cupboards and the oven, behind appliances, skirtings, light fittings and windows. Usually a full day with two cleaners.",
        icon: "Sparkles",
        price: "From R1 450",
        points: ["Two cleaners", "Full day"],
      },
      {
        title: "Move-in and move-out",
        description:
          "The clean a landlord or agent will actually sign off on, including inside all cupboards, the oven and the garage. Photographed on completion for your deposit dispute.",
        icon: "PackageCheck",
        price: "From R1 850",
        points: ["Photographed on completion", "Agent-standard checklist"],
      },
      {
        title: "Office cleaning",
        description:
          "Before or after hours, daily or three times a week, for offices up to about forty desks. Consumables restocked and invoiced at cost.",
        icon: "Building2",
        price: "Quoted monthly",
        points: ["Before or after hours", "Consumables at cost"],
      },
      {
        title: "Post-construction",
        description:
          "Builders' dust, paint spots, silicone and stickers. This is a specific skill and we price it separately from a deep clean.",
        icon: "HardHat",
        price: "From R2 400",
        points: ["Rubble removal quoted separately"],
      },
      {
        title: "Windows",
        description:
          "Inside and out up to double storey. Booked on its own or added to any other clean at a reduced rate.",
        icon: "Wind",
        price: "From R650",
        points: ["Up to double storey"],
      },
    ],
  },

  pricing: {
    variant: "simple-list",
    eyebrow: "Prices",
    heading: "What it costs",
    intro: "Fixed prices for our service area. Anything unusual is quoted before we start, never after.",
    note: "Service area: Randburg, Ferndale, Fourways, Northcliff, Blairgowrie and Cresta. Further out adds R120 travel.",
    plans: [
      { name: "Regular clean — 1 to 2 bedrooms", price: "R420", unit: "per visit" },
      { name: "Regular clean — 3 bedrooms", price: "R520", unit: "per visit" },
      { name: "Regular clean — 4+ bedrooms", price: "R680", unit: "per visit" },
      { name: "Deep clean — 3 bedrooms", price: "R1 450", description: "Two cleaners, full day." },
      { name: "Move-in / move-out", price: "R1 850", description: "Photographed on completion." },
      { name: "Post-construction clean", price: "R2 400", unit: "from" },
      { name: "Windows, inside and out", price: "R650", unit: "from" },
      { name: "Office cleaning", price: "Quoted", unit: "monthly", description: "Depends on size and frequency." },
    ],
  },

  stats: {
    variant: "cards",
    heading: "The company",
    items: [
      { value: "2016", label: "Trading since", icon: "Calendar" },
      { value: "34", label: "Cleaners on the books", icon: "Users" },
      { value: "R5m", label: "Public liability cover", icon: "ShieldCheck" },
      { value: "100%", label: "Staff police-cleared", icon: "BadgeCheck" },
    ],
  },

  testimonials: {
    variant: "grid",
    eyebrow: "Reviews",
    heading: "What clients say",
    items: [
      {
        quote:
          "Beauty has cleaned our house every Tuesday for three years. She has keys and the alarm code, which tells you what we think of the vetting.",
        name: "Michelle van Niekerk",
        role: "Northcliff",
        rating: 5,
      },
      {
        quote:
          "Move-out clean for a flat the agent was being difficult about. They photographed everything and I got the full deposit back.",
        name: "Tebogo Maluleke",
        role: "Ferndale",
        rating: 5,
      },
      {
        quote: "Quoted R1 450 for the deep clean, invoiced R1 450, and the oven has not looked like that since we bought the house.",
        name: "Adele Ferreira",
        role: "Blairgowrie",
        rating: 5,
      },
      {
        quote:
          "One of the team broke a vase. It was replaced within the week without me having to ask twice.",
        name: "Rashid Omar",
        role: "Fourways",
        rating: 5,
      },
      {
        quote: "They clean our office after six and I have never once arrived to find it undone.",
        name: "Lindiwe Baloyi",
        role: "Randburg",
        rating: 5,
      },
      {
        quote: "Booking by WhatsApp is easy. Rescheduling takes one message and no negotiation.",
        name: "Cameron Pretorius",
        role: "Cresta",
        rating: 4,
      },
    ],
  },

  faq: {
    variant: "single-column",
    eyebrow: "Questions",
    heading: "What clients ask",
    items: [
      {
        question: "Do I get the same cleaner each time?",
        answer:
          "Yes, that is the whole model. You meet them at the first clean, and if they are ill or on leave we tell you in advance and send someone you have already met where we can.",
      },
      {
        question: "Are your staff checked?",
        answer:
          "Every cleaner is police-cleared, ID-verified and reference-checked before their first job. We are happy to show you the clearance certificate for the person assigned to you.",
      },
      {
        question: "Do I need to be home?",
        answer:
          "No. Many clients leave a key or give access through the estate. Whatever the arrangement, it is recorded and only your assigned cleaner has it.",
      },
      {
        question: "Do you bring your own products?",
        answer:
          "Yes, equipment and eco-friendly products are included in the price. If you would rather we use yours, that is fine and the price does not change.",
      },
      {
        question: "Is there a contract?",
        answer:
          "No contract for domestic cleaning. Cancel or skip a week by WhatsApp with 24 hours' notice and there is no charge. Office contracts run monthly.",
      },
      {
        question: "What if I am not happy with the clean?",
        answer:
          "Tell us within 24 hours and we come back and redo it at no charge. It happens rarely, and we would rather fix it than lose a weekly client over a bad Tuesday.",
      },
    ],
  },

  booking: {
    variant: "centered",
    eyebrow: "Book",
    heading: "Book a clean",
    intro: "Tell us the size of the place and what you need. We confirm the price by WhatsApp before anything is booked.",
    submitLabel: "Request a booking",
    successMessage: "Thanks — we will WhatsApp you a fixed quote and a time, usually within the hour.",
    serviceOptions: [
      "Weekly domestic clean",
      "Fortnightly domestic clean",
      "Deep clean",
      "Move-in / move-out",
      "Post-construction",
      "Office cleaning",
      "Windows only",
    ],
    askPreferredTime: true,
  },

  contact: {
    variant: "centered",
    eyebrow: "Contact",
    heading: "Talk to us",
    intro: "WhatsApp is quickest. The office is open weekdays from seven.",
    submitLabel: "Send message",
    successMessage: "Thanks — we will come back to you within the working day.",
    subjectOptions: ["Booking enquiry", "Office cleaning quote", "Complaint or feedback", "Careers"],
  },
};
