import type { SiteConfigInput } from "@/lib/schema";

/**
 * Thembeka Funeral Directors — Diepkloof, Soweto.
 *
 * DESIGN BRIEF
 * Direction: someone arrives here at 03:00 having just lost a parent. Every
 * decision serves that person — the phone number is the hero, the first section
 * after it is what happens when you call, and nothing on the page asks them to
 * browse. No upselling language anywhere.
 * Anti-default: the industry ships black and charcoal with gold serif capitals,
 * which reads as cold and expensive at the exact moment neither helps. This uses
 * a soft stone ground with deep evergreen — the colour of a memorial garden
 * rather than a coffin — and generous spacing so nothing feels rushed.
 * Type: Lora over Inter. A warm humanist serif for headings carries care without
 * the funereal formality of a display face; Inter keeps the practical detail
 * (documents, costs, timelines) plainly readable.
 * Signature: `services: tabs` so a family sees only the one thing they came for
 * — burial, cremation or repatriation — instead of scrolling past the other two.
 * The vertical timeline answers "what happens now", which is the real question.
 *
 * Structural pair: fullscreen-image + tabs.
 *
 * Deliberately NOT set: features.booking. A bereaved family phones; they do not
 * book a slot. features.gallery is off for the same reason — there is no
 * tasteful version of a photo gallery here.
 *
 * Images expected in /public/funeral/ — hero 1920×1080, service 1000×750, cta 1000×750.
 */
export const funeralConfig: SiteConfigInput = {
  id: "funeral",

  business: {
    name: "Thembeka Funeral Directors",
    tagline: "We will take it from here",
    phone: "011 938 4470",
    email: "care@thembekafunerals.co.za",
    whatsapp: "27829384470",
    address: {
      street: "112 Immink Drive",
      suburb: "Diepkloof",
      city: "Soweto, Johannesburg",
      province: "Gauteng",
      postalCode: "1862",
    },
    geo: { lat: -26.2485, lng: 27.9469 },
    googleMapsUrl: "https://maps.google.com/?q=Immink+Drive+Diepkloof+Soweto",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Immink+Drive+Diepkloof+Soweto&output=embed",
    socialLinks: [
      // ponytail: lucide-react v1 dropped every brand glyph — Globe is what exists.
      { platform: "Facebook", href: "https://facebook.com/thembekafunerals", icon: "Globe" },
    ],
    businessHours: [
      { day: "First-call line", opens: "00:00", closes: "23:59", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
      { day: "Office (Mon – Fri)", opens: "08:00", closes: "17:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
      { day: "Office (Saturday)", opens: "08:00", closes: "13:00", schemaDays: ["Saturday"] },
    ],
  },

  branding: {
    primaryColor: "#2F5D50",
    secondaryColor: "#3E4F47",
    accentColor: "#A8763E",
    neutral: {
      bg: "#F4F2EE",
      surface: "#FFFFFF",
      border: "#DCD7CF",
      text: "#1F2421",
      textMuted: "#56605A",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "lora",
    fontBody: "inter",
    borderRadius: "md",
    buttonStyle: "solid",
    cardStyle: "flat",
    shadowStyle: "soft",
    spacingScale: "spacious",
    animationStyle: "subtle",
    headingTransform: "none",
  },

  features: {
    booking: false,
    gallery: false,
    testimonials: true,
    blog: false,
    pricing: true,
    whatsapp: true,
    newsletter: false,
    map: true,
    faq: true,
  },

  seo: {
    title: "Thembeka Funeral Directors | Soweto, Johannesburg — 24 hours",
    description:
      "Funeral directors in Diepkloof, Soweto. Burial, cremation and repatriation countrywide. We answer at any hour, handle Home Affairs, and quote in writing first.",
    keywords: [
      "funeral directors Soweto",
      "funeral home Johannesburg",
      "repatriation Eastern Cape",
      "cremation Johannesburg",
      "funeral costs South Africa",
    ],
    ogImage: "/funeral/og.svg",
    schemaType: "FuneralHome",
    locale: "en_ZA",
    url: "https://thembekafunerals.co.za",
  },

  layout: [
    "hero",
    "highlights",
    "services",
    "timeline",
    "pricing",
    "testimonials",
    "faq",
    "contact",
    "cta",
  ],

  navbar: {
    variant: "solid",
    links: [
      { label: "What we do", href: "#services" },
      { label: "What happens now", href: "#timeline" },
      { label: "Costs", href: "#pricing" },
      { label: "Questions", href: "#faq" },
      { label: "Find us", href: "#contact" },
    ],
    cta: { label: "Call 011 938 4470", href: "tel:0119384470" },
    showPhone: true,
  },

  footer: {
    variant: "columns",
    blurb:
      "A family firm in Diepkloof since 1994. Burial, cremation and repatriation anywhere in South Africa, Lesotho, Zimbabwe and Mozambique. Somebody answers this phone at any hour.",
    columns: [
      {
        heading: "Our care",
        links: [
          { label: "What we do", href: "#services" },
          { label: "What happens now", href: "#timeline" },
          { label: "Costs", href: "#pricing" },
        ],
      },
      {
        heading: "Help",
        links: [
          { label: "Common questions", href: "#faq" },
          { label: "Find us", href: "#contact" },
        ],
      },
    ],
    legal: "© {year} {business}. Diepkloof, Soweto. Registered funeral undertaker, City of Johannesburg.",
  },

  hero: {
    variant: "fullscreen-image",
    eyebrow: "Diepkloof, Soweto — answered at any hour",
    headline: "We will take it from here",
    subheadline:
      "Phone us whatever the time. We will come for your loved one, explain what happens next in plain language, and give you a written quote before anything is arranged. Nothing is decided faster than your family is ready to decide it.",
    image: {
      src: "/funeral/hero.jpg",
      alt: "Morning light through trees in a quiet memorial garden",
    },
    primaryCta: { label: "Call 011 938 4470", href: "tel:0119384470" },
    secondaryCta: { label: "WhatsApp us", href: "https://wa.me/27829384470" },
    highlights: ["24-hour first call", "Repatriation countrywide", "Written quote first"],
    overlayOpacity: 62,
    align: "left",
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "When you call",
    heading: "What you can expect from us",
    items: [
      {
        title: "Somebody answers",
        description:
          "Not a call centre and not an answering machine. One of our own people picks up, at any hour of any day, and stays on the line with you for as long as you need.",
        icon: "Phone",
      },
      {
        title: "A written quote first",
        description:
          "Before we arrange anything you get the full cost in writing, itemised. Nothing is added later without you agreeing to it in advance.",
        icon: "FileText",
      },
      {
        title: "Your customs, your pace",
        description:
          "Church, mosque, traditional rites or none at all — we work to your family's way of doing things. If the family needs a week to gather, the funeral waits a week.",
        icon: "Heart",
      },
      {
        title: "We deal with Home Affairs",
        description:
          "The BI-1663, the death register, the certificate and the insurance paperwork are ours to chase, not yours. We will tell you the moment anything needs your signature.",
        icon: "Stamp",
      },
    ],
  },

  services: {
    variant: "tabs",
    eyebrow: "What we do",
    heading: "Choose only what you came for",
    intro:
      "Most families need one of the first three. You do not have to read the rest.",
    items: [
      {
        title: "Burial",
        description:
          "The full arrangement: collection and care, coffin, the grave, hearse and family cars, the tent, chairs and sound at the house, programmes, and the catering if you want us to handle it.",
        icon: "Flower2",
        image: {
          src: "/funeral/service-1.jpg",
          alt: "A hearse parked outside",
        },
        price: "From R14 500",
        points: [
          "Coffins shown with prices, no pressure",
          "Grave booked with the municipality",
          "Tent, chairs and sound at the home",
          "Programmes printed and delivered",
        ],
      },
      {
        title: "Cremation",
        description:
          "Usually the less costly choice, and often the practical one when family is spread across the country. We arrange the crematorium, the service if you want one, and return the ashes to you in person.",
        icon: "Flame",
        image: {
          src: "/funeral/service-2.jpg",
          alt: "A quiet chapel interior arranged for a memorial service",
        },
        price: "From R9 800",
        points: [
          "Crematorium and paperwork arranged",
          "Service beforehand if the family wants one",
          "Ashes returned to you by hand",
          "Urn or scattering, your choice",
        ],
      },
      {
        title: "Repatriation",
        description:
          "Taking your loved one home — to the Eastern Cape, KwaZulu-Natal, Limpopo, or across the border to Lesotho, Zimbabwe and Mozambique. We drive, we carry the permits, and we hand over to the family at the other end.",
        icon: "Route",
        image: {
          src: "/funeral/service-3.jpg",
          alt: "A long road heading into hills at first light",
        },
        price: "From R6 500",
        points: [
          "Anywhere in South Africa and neighbouring countries",
          "Permits and border documents handled",
          "Family kept informed on the road",
          "Handover to the local undertaker if you prefer",
        ],
      },
      {
        title: "Documents and claims",
        description:
          "Registering the death, the BI-1663, the death certificate from Home Affairs, and lodging the funeral policy claim. This is included in every arrangement — we do not charge families to fill in forms.",
        icon: "ClipboardCheck",
        image: {
          src: "/funeral/service-4.jpg",
          alt: "Documents and a pen on a desk in the arrangement room",
        },
        price: "Included",
        points: [
          "Death registered on your behalf",
          "Certificate collected from Home Affairs",
          "Policy claim lodged and followed up",
          "Certified copies for the estate",
        ],
      },
      {
        title: "Memorial and unveiling",
        description:
          "A memorial service weeks or months later, and the tombstone unveiling when the family is ready. We keep your file so you do not have to explain everything again to somebody new.",
        icon: "Landmark",
        image: {
          src: "/funeral/service-5.jpg",
          alt: "A headstone in morning light before an unveiling",
        },
        price: "From R4 200",
        points: [
          "Memorial service at any later date",
          "Tombstone ordered and installed",
          "Unveiling arranged with the family",
          "Your file kept, no repeating yourself",
        ],
      },
      {
        title: "Planning ahead",
        description:
          "Some people would rather decide this themselves than leave it to their children. Come in, tell us what you want, and we will write it down and hold it on file at today's price.",
        icon: "CalendarCheck",
        image: {
          src: "/funeral/service-6.jpg",
          alt: "Two chairs at a table in the arrangement room",
        },
        price: "No charge to plan",
        points: [
          "Your wishes recorded in writing",
          "Price fixed at today's figure",
          "Nothing payable now",
          "Your family simply phones us",
        ],
      },
    ],
  },

  timeline: {
    variant: "vertical",
    eyebrow: "What happens now",
    heading: "From your first call to the day itself",
    intro:
      "If you have just phoned us, this is what the next week looks like. You do not need to remember any of it — we will walk you through each step as it comes.",
    items: [
      {
        marker: "Any hour",
        title: "You phone. We come.",
        description:
          "Tell us where your loved one is. If it is a home, a hospital or a state mortuary, we know what is needed in each case and we will explain it to you on the phone.",
        icon: "Phone",
      },
      {
        marker: "Within 2 hours",
        title: "Into our care",
        description:
          "Our own vehicle and our own staff, never a subcontractor. Within Soweto and Johannesburg we are usually with you inside two hours, day or night.",
        icon: "Car",
      },
      {
        marker: "Day 1",
        title: "We sit down together",
        description:
          "At our place or yours, whichever is easier. We go through the choices once, slowly, and you leave with a written quote. Nothing is signed on the spot unless you want it to be.",
        icon: "Users",
      },
      {
        marker: "Days 2 – 5",
        title: "The arrangements",
        description:
          "Grave or crematorium booked, documents lodged with Home Affairs, programmes printed, notices placed, and the policy claim submitted. You will hear from us daily, whether or not there is news.",
        icon: "ClipboardCheck",
      },
      {
        marker: "The day",
        title: "We carry it",
        description:
          "Hearse and family cars, the tent and chairs set up early, sound tested before anyone arrives, and one of our people with your family from the first car to the last handful of soil.",
        icon: "Flower2",
      },
      {
        marker: "Afterwards",
        title: "What still needs doing",
        description:
          "We bring the death certificate to you, follow the policy claim until it pays, and are here months later for the unveiling. Phone us any time — there is no closing date on this.",
        icon: "Heart",
      },
    ],
  },

  pricing: {
    variant: "cards",
    eyebrow: "Costs",
    heading: "What a funeral costs here",
    intro:
      "Written plainly, because families are often quoted a figure only after they have committed. These are complete prices for the services listed — not deposits, and not 'from' figures that grow.",
    note:
      "All prices include VAT, our professional fee, collection, care and the documentation. Grave fees are set by the municipality and differ by cemetery; we will tell you the exact figure for yours before you decide. If there is a funeral policy, we claim against it and you pay only any difference.",
    plans: [
      {
        name: "Cremation",
        price: "R9 800",
        description: "For families choosing cremation, with or without a service beforehand.",
        features: [
          "Collection and care",
          "Cremation coffin",
          "Crematorium fees",
          "All documents and Home Affairs",
          "Ashes returned by hand",
          "Policy claim lodged for you",
        ],
        cta: { label: "Talk to us", href: "#contact" },
      },
      {
        name: "Burial",
        price: "R14 500",
        description: "The arrangement most families take, excluding the municipal grave fee.",
        features: [
          "Collection and care",
          "Coffin from our standard range",
          "Hearse and one family car",
          "Tent, chairs and sound at the home",
          "100 printed programmes",
          "All documents and Home Affairs",
          "Policy claim lodged for you",
        ],
        cta: { label: "Talk to us", href: "#contact" },
      },
      {
        name: "Burial and repatriation",
        price: "R21 000",
        description: "Where your loved one is going home to another province.",
        features: [
          "Collection and care",
          "Coffin from our standard range",
          "Road transport countrywide",
          "Permits and border documents",
          "Hearse and family car at the destination",
          "100 printed programmes",
          "All documents and Home Affairs",
          "Policy claim lodged for you",
        ],
        cta: { label: "Talk to us", href: "#contact" },
      },
    ],
  },

  testimonials: {
    variant: "grid",
    eyebrow: "Families we have served",
    heading: "In their own words",
    items: [
      {
        quote:
          "I phoned at twenty past two in the morning and a person answered, not a machine. They were at the house before four. I have never forgotten that.",
        name: "Nomvula M.",
        role: "Diepkloof",
        rating: 5,
      },
      {
        quote:
          "They took my father home to Mthatha and phoned me from the road twice so I would know where he was. The family was waiting when he arrived.",
        name: "Sipho D.",
        role: "Orlando East",
        rating: 5,
      },
      {
        quote:
          "The quote they gave us on the first day is exactly what we paid at the end. After what another undertaker did to my sister, that mattered more than they know.",
        name: "Grace T.",
        role: "Meadowlands",
        rating: 5,
      },
      {
        quote:
          "We are Muslim and needed the burial the same day. They understood without me having to explain or argue, and everything was ready in time.",
        name: "Yusuf A.",
        role: "Lenasia",
        rating: 5,
      },
      {
        quote:
          "They handled the AVBOB claim from start to finish. I would not have known where to begin with those forms.",
        name: "Thandi K.",
        role: "Pimville",
        rating: 5,
      },
      {
        quote:
          "Nine months later they phoned to ask if we wanted help with the unveiling. They remembered my mother's name.",
        name: "Lerato S.",
        role: "Dobsonville",
        rating: 5,
      },
    ],
  },

  faq: {
    variant: "single-column",
    eyebrow: "Questions",
    heading: "What families ask us first",
    items: [
      {
        question: "Someone has died at home. What do I do right now?",
        answer:
          "Phone us on 011 938 4470 before anything else, at whatever hour it is. If the death was expected and there is a doctor involved, we will guide you through getting the medical certificate. If it was sudden or unattended, the police must attend first and the body goes to a state mortuary — we will explain exactly how that works and we will handle the mortuary ourselves. Do not feel you have to move or arrange anything before you call.",
      },
      {
        question: "What does it actually cost?",
        answer:
          "A cremation is R9 800 and a burial R14 500, both complete, with the municipal grave fee on top for a burial because that is set by the cemetery rather than by us. Repatriation to another province starts at R6 500. You get every figure in writing before you commit to anything, and the price on that quote is the price you pay.",
      },
      {
        question: "We have a funeral policy. How does that work?",
        answer:
          "Bring the policy document or just the policy number and we will lodge the claim for you and follow it up until it pays. We work with AVBOB, Old Mutual, Sanlam, Metropolitan and the burial societies. Most policies pay us directly, so your family covers only the difference if there is one — and if the policy covers everything, you pay nothing at all.",
      },
      {
        question: "Can you take our relative home to the Eastern Cape?",
        answer:
          "Yes, and we do it most weeks. We drive anywhere in South Africa, and into Lesotho, Zimbabwe and Mozambique. We carry the permits and the documents the border needs, we keep the family updated on the road, and we can either conduct the funeral at the other end ourselves or hand over to an undertaker your family already knows.",
      },
      {
        question: "How soon does the funeral have to happen?",
        answer:
          "There is no legal deadline. Most families here hold the funeral seven to ten days after the death so that relatives can travel and save. Some faiths need it the same day or the next, which we are set up for. Your loved one is cared for properly for as long as it takes, and we do not charge extra for the wait.",
      },
      {
        question: "Can we plan a funeral before anyone has died?",
        answer:
          "You can, and it is a kindness to the people you leave behind. Come and see us, tell us what you want, and we will write it down and hold it on file at today's price. Nothing is payable now — when the time comes your family phones us and it is already decided.",
      },
    ],
  },

  contact: {
    variant: "split-map",
    eyebrow: "Find us",
    heading: "112 Immink Drive, Diepkloof",
    intro:
      "Come in any weekday, or phone first and we will come to you. If this is a first call, please phone rather than use the form — the number below is answered day and night.",
    formHeading: "Send us a message",
    submitLabel: "Send message",
    successMessage:
      "Thank you — we have your message and will come back to you shortly. If this is urgent, please phone 011 938 4470 at any hour.",
    subjectOptions: [
      "A death has occurred",
      "Burial",
      "Cremation",
      "Repatriation",
      "A funeral policy claim",
      "Planning ahead",
      "Something else",
    ],
  },

  cta: {
    variant: "banner",
    heading: "Whatever the hour, phone us",
    body:
      "You do not need to have decided anything, and you do not need to have any documents ready. Phone, and we will tell you what happens next.",
    primaryCta: { label: "Call 011 938 4470", href: "tel:0119384470" },
    secondaryCta: { label: "WhatsApp us", href: "https://wa.me/27829384470" },
    image: {
      src: "/funeral/cta.jpg",
      alt: "The entrance to the Thembeka Funeral Directors office on Immink Drive",
    },
  },
};
