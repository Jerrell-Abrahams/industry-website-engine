import type { SiteConfigInput } from "@/lib/schema";

/**
 * Cape Flow Plumbing — Goodwood, Cape Town.
 * Variants: minimal-centered + list. A trade site that leads with the callout
 * number rather than a photograph, and prices the common jobs as a plain list —
 * the two things someone with a burst geyser actually needs.
 */
export const plumberConfig: SiteConfigInput = {
  id: "plumber",

  business: {
    name: "Cape Flow Plumbing",
    tagline: "Licensed plumbers, honest callouts",
    phone: "021 591 3374",
    email: "jobs@capeflowplumbing.co.za",
    whatsapp: "27825913374",
    address: {
      street: "18 Voortrekker Road",
      suburb: "Goodwood",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "7460",
    },
    geo: { lat: -33.9089, lng: 18.5527 },
    googleMapsUrl: "https://maps.google.com/?q=Voortrekker+Road+Goodwood",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Voortrekker+Road+Goodwood&output=embed",
    socialLinks: [
      { platform: "Facebook", href: "https://facebook.com/capeflowplumbing", icon: "Facebook" },
    ],
    businessHours: [
      { day: "Monday – Friday", opens: "07:00", closes: "17:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
      { day: "Saturday", opens: "08:00", closes: "13:00", schemaDays: ["Saturday"] },
      { day: "Sunday (emergencies only)", opens: "00:00", closes: "23:59", schemaDays: ["Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#12557F",
    secondaryColor: "#0D3F5F",
    accentColor: "#B85F1E",
    neutral: {
      bg: "#FFFFFF",
      surface: "#F1F5F9",
      border: "#D6DEE6",
      text: "#16202A",
      textMuted: "#4B5866",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "montserrat",
    fontBody: "inter",
    borderRadius: "sm",
    buttonStyle: "solid",
    cardStyle: "bordered",
    shadowStyle: "soft",
    spacingScale: "compact",
    animationStyle: "subtle",
  },

  features: {
    booking: false,
    gallery: false,
    testimonials: true,
    pricing: false,
    whatsapp: true,
    newsletter: false,
    map: true,
    faq: true,
  },

  seo: {
    title: "Cape Flow Plumbing | Licensed plumbers in Goodwood, Cape Town",
    description:
      "Burst geysers, blocked drains, leak detection and CoC certificates across the northern suburbs. PIRB registered, 24-hour emergency callout.",
    keywords: ["plumber Goodwood", "emergency plumber Cape Town", "geyser replacement northern suburbs", "plumbing CoC Cape Town"],
    ogImage: "/plumber/og.svg",
    schemaType: "Plumber",
    locale: "en_ZA",
    url: "https://capeflowplumbing.co.za",
  },

  layout: ["hero", "highlights", "services", "stats", "testimonials", "faq", "contact", "cta"],

  navbar: {
    variant: "solid",
    links: [
      { label: "What we do", href: "#services" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Questions", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Get a quote", href: "#contact" },
    showPhone: true,
  },

  footer: {
    variant: "columns",
    blurb:
      "PIRB-registered plumbers working across Goodwood, Parow, Bellville, Monte Vista, Edgemead and Milnerton since 2008.",
    columns: [
      {
        heading: "Services",
        links: [
          { label: "What we do", href: "#services" },
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
    legal: "© {year} {business}. PIRB registered. Goodwood, Cape Town.",
  },

  hero: {
    variant: "minimal-centered",
    eyebrow: "Northern suburbs, Cape Town",
    headline: "Burst geyser? Phone 021 591 3374",
    subheadline:
      "Licensed, PIRB-registered plumbers covering Goodwood, Parow, Bellville, Monte Vista, Edgemead and Milnerton. Emergency callouts around the clock, quoted before we start.",
    primaryCta: { label: "Phone now", href: "tel:0215913374" },
    secondaryCta: { label: "WhatsApp a photo", href: "https://wa.me/27825913374" },
    highlights: ["24-hour emergencies", "PIRB registered", "Quote before work"],
    align: "center",
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "How we charge",
    heading: "No surprises on the invoice",
    intro: "The three things people have been caught by before and ask us about first.",
    items: [
      {
        title: "The callout is quoted",
        description:
          "R450 within our normal area, waived if you go ahead with the work. Emergency and after-hours callouts are R750 and are told to you on the phone before we get in the van.",
        icon: "Phone",
      },
      {
        title: "Nothing starts unquoted",
        description:
          "We diagnose, quote in writing on the spot, and wait for your yes. If we open something up and find more, we stop and phone you.",
        icon: "FileCheck",
      },
      {
        title: "Insurance-ready paperwork",
        description:
          "For geyser bursts we photograph everything and write the report your insurer will ask for. We deal with the major insurers weekly.",
        icon: "ShieldCheck",
      },
    ],
  },

  services: {
    variant: "list",
    eyebrow: "What we do",
    heading: "The work and what it costs",
    intro:
      "Indicative pricing for a standard job in our normal service area. Your quote is confirmed on site before anything starts.",
    items: [
      {
        title: "Emergency callout",
        description:
          "Burst pipes, burst geysers, no water, sewage backing up. We isolate the problem first so the damage stops, then quote the repair.",
        price: "R750 callout",
        points: ["24 hours, 7 days"],
      },
      {
        title: "Geyser replacement",
        description:
          "Supply and fit a new 150L geyser to SANS 10254, including drip tray, vacuum breakers, safety valve and the electrical CoC.",
        price: "From R9 800",
        points: ["Kwikot and Heat Tech", "5-year cylinder warranty", "Same day in most cases"],
      },
      {
        title: "Blocked drains",
        description:
          "Rodded or jetted depending on what is down there, with a camera survey if it blocks again. We tell you if the problem is a collapsed pipe rather than just clearing it monthly.",
        price: "From R850",
        points: ["Camera survey R1 200"],
      },
      {
        title: "Leak detection",
        description:
          "Acoustic and thermal detection for leaks under slabs and in walls, so we open up one square metre rather than the whole floor.",
        price: "From R1 450",
        points: ["Written report included"],
      },
      {
        title: "Plumbing CoC certificate",
        description:
          "The Certificate of Compliance the City of Cape Town requires when a property is sold. Inspection, any remedial work quoted separately, and the certificate lodged.",
        price: "R1 350",
        points: ["Required for transfer"],
      },
      {
        title: "Bathroom and kitchen installations",
        description:
          "Taps, mixers, toilets, basins and full bathroom refits, working alongside your tiler and electrician.",
        price: "Quoted per job",
        points: [],
      },
      {
        title: "Water-saving and pressure",
        description:
          "Pressure-reducing valves, tap and cistern repairs, and finding the reason for a municipal bill that has jumped.",
        price: "From R650",
        points: [],
      },
    ],
  },

  stats: {
    variant: "cards",
    heading: "The business in numbers",
    items: [
      { value: "2008", label: "Trading since", icon: "Calendar" },
      { value: "6", label: "Vans on the road", icon: "Truck" },
      { value: "90min", label: "Average emergency response", icon: "Timer" },
      { value: "12mo", label: "Warranty on workmanship", icon: "ShieldCheck" },
    ],
  },

  testimonials: {
    variant: "grid",
    eyebrow: "Reviews",
    heading: "What customers say",
    items: [
      {
        quote:
          "Geyser burst into the ceiling at eleven on a Sunday night. Someone answered, was there inside the hour, and had the water off before the ceiling came down.",
        name: "Marlene Abrahams",
        role: "Monte Vista",
        rating: 5,
      },
      {
        quote:
          "Three plumbers told me the drain needed replacing. Cape Flow put a camera down, found roots at one joint, and fixed that section only.",
        name: "Ebrahim Salie",
        role: "Parow",
        rating: 5,
      },
      {
        quote: "Quoted R9 800 for the geyser, invoiced R9 800. The paperwork for the insurance claim was ready the next morning.",
        name: "Johan Bekker",
        role: "Edgemead",
        rating: 5,
      },
      {
        quote:
          "Needed a CoC in a hurry for a transfer. Inspected on the Tuesday, certificate lodged Wednesday.",
        name: "Thandiwe Nkosi",
        role: "Goodwood",
        rating: 5,
      },
      {
        quote: "Not the cheapest quote I got, but the only one that explained what was actually wrong.",
        name: "Riedwaan Isaacs",
        role: "Bellville",
        rating: 4,
      },
      {
        quote: "Turned up when they said, cleaned up after themselves, took the old geyser away.",
        name: "Sandra Louw",
        role: "Milnerton",
        rating: 5,
      },
    ],
  },

  faq: {
    variant: "two-column",
    eyebrow: "Questions",
    heading: "What people ask",
    items: [
      {
        question: "What does a callout cost?",
        answer:
          "R450 in normal hours within our service area, waived if you proceed with the work. After hours and emergencies are R750, and we tell you on the phone before we leave.",
      },
      {
        question: "Which areas do you cover?",
        answer:
          "Goodwood, Parow, Bellville, Monte Vista, Edgemead, Milnerton and the surrounding northern suburbs. Further afield we will still come, with travel added to the callout.",
      },
      {
        question: "Will my insurance cover a burst geyser?",
        answer:
          "Usually, under the household contents or buildings section. We photograph everything and write the report insurers ask for, but the claim itself stays between you and them.",
      },
      {
        question: "Do I need a plumbing CoC to sell my house?",
        answer:
          "In the City of Cape Town, yes. It certifies the water installation complies and that there is no cross-connection to borehole or wellpoint water. Budget for remedial work in an older property.",
      },
      {
        question: "How quickly can you get to an emergency?",
        answer:
          "Ninety minutes on average within our service area, day or night. If we are further out we say so honestly rather than leaving you waiting.",
      },
      {
        question: "Are you actually registered?",
        answer:
          "Yes, with the Plumbing Industry Registration Board. Our registration number is on every quote and invoice, and you are welcome to verify it.",
      },
    ],
  },

  contact: {
    variant: "split-map",
    eyebrow: "Get in touch",
    heading: "Tell us what it's doing",
    intro:
      "For emergencies, phone. For anything else, send us a photograph on WhatsApp or fill in the form and we will quote.",
    formHeading: "Request a quote",
    submitLabel: "Request quote",
    successMessage:
      "Thanks — we have your details and will come back within one working day. If this is an emergency, please phone 021 591 3374.",
    subjectOptions: [
      "Emergency",
      "Geyser",
      "Blocked drain",
      "Leak detection",
      "CoC certificate",
      "Installation or refit",
    ],
  },

  cta: {
    variant: "banner",
    heading: "Water where it should not be?",
    body: "Turn off the mains at the meter, then phone us. We answer at any hour.",
    primaryCta: { label: "021 591 3374", href: "tel:0215913374" },
    secondaryCta: { label: "WhatsApp a photo", href: "https://wa.me/27825913374" },
  },
};
