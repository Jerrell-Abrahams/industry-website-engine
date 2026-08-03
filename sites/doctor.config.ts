import type { SiteConfigInput } from "@/lib/schema";

/**
 * Helderberg Family Practice — Somerset West, Western Cape.
 *
 * Variants: card-overlay + grid. A general practice reads as institutional the
 * moment it looks clinical, so this one leans domestic: Nunito over Inter,
 * generous radius, alternating tinted sections with curved tops and a warm
 * wash behind the page.
 *
 * Deliberately no testimonials, and `features.testimonials` is off. The HPCSA's
 * ethical rules on advertising do not permit a registered practitioner to
 * publish patient testimonials, so the section every other config in this
 * registry uses is the one this industry cannot have. Trust is carried by the
 * team bios, the published fees and the practice stats instead.
 */
export const doctorConfig: SiteConfigInput = {
  id: "doctor",

  business: {
    name: "Helderberg Family Practice",
    tagline: "Your family's doctors, in Somerset West",
    phone: "021 851 4470",
    email: "reception@helderbergfamily.co.za",
    whatsapp: "27828514470",
    address: {
      street: "8 Rothschild Boulevard",
      suburb: "Somerset West",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "7130",
    },
    geo: { lat: -34.0847, lng: 18.8489 },
    googleMapsUrl: "https://maps.google.com/?q=Rothschild+Boulevard+Somerset+West",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=Rothschild+Boulevard+Somerset+West&output=embed",
    socialLinks: [
      // ponytail: lucide-react v1 dropped every brand glyph, so there is no
      // Facebook icon to use. Globe until a brand icon set is added.
      { platform: "Facebook", href: "https://facebook.com/helderbergfamily", icon: "Globe" },
    ],
    businessHours: [
      {
        day: "Monday – Thursday",
        opens: "08:00",
        closes: "17:30",
        schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      },
      { day: "Friday", opens: "08:00", closes: "16:00", schemaDays: ["Friday"] },
      { day: "Saturday", opens: "08:30", closes: "12:00", schemaDays: ["Saturday"] },
      { day: "Sunday", closed: true, schemaDays: ["Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#3B4E8C",
    secondaryColor: "#2A386A",
    accentColor: "#C2683C",
    neutral: {
      bg: "#FBFAF8",
      surface: "#FFFFFF",
      border: "#E4E0D8",
      text: "#1E2230",
      textMuted: "#565C6E",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "nunito",
    fontBody: "inter",
    borderRadius: "xl",
    buttonStyle: "soft",
    buttonHover: "lift",
    cardStyle: "elevated",
    shadowStyle: "soft",
    borderWeight: "hairline",
    sectionDivider: "curve",
    sectionTint: "alternating",
    spacingScale: "spacious",
    animationStyle: "subtle",
    revealMotion: "fade",
    staggerChildren: false,
    surfaceTexture: "wash",
    headingTransform: "none",
  },

  features: {
    booking: true,
    gallery: false,
    // See the file header — HPCSA advertising rules, not an oversight.
    testimonials: false,
    blog: false,
    pricing: true,
    whatsapp: true,
    newsletter: false,
    map: true,
    faq: true,
  },

  seo: {
    title: "Helderberg Family Practice | GP in Somerset West, Cape Town",
    description:
      "A four-doctor family practice in Somerset West. Same-day appointments, chronic care, childhood immunisations and travel medicine. All medical aids.",
    keywords: [
      "GP Somerset West",
      "doctor Somerset West",
      "family practice Helderberg",
      "same day doctor Cape Town",
      "travel clinic Somerset West",
    ],
    ogImage: "/doctor/og.svg",
    schemaType: "Physician",
    locale: "en_ZA",
    url: "https://helderbergfamily.co.za",
  },

  layout: [
    "hero",
    "highlights",
    "services",
    "team",
    "stats",
    "pricing",
    "faq",
    "booking",
    "contact",
    "cta",
  ],

  navbar: {
    variant: "solid",
    links: [
      { label: "What we treat", href: "#services" },
      { label: "Our doctors", href: "#team" },
      { label: "Fees", href: "#pricing" },
      { label: "Questions", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Book an appointment", href: "#booking" },
    showPhone: true,
  },

  footer: {
    variant: "columns",
    blurb:
      "A four-doctor family practice on Rothschild Boulevard, seeing patients in Somerset West, Strand and Gordon's Bay since 2004. HPCSA registered. All medical aids accepted.",
    columns: [
      {
        heading: "The practice",
        links: [
          { label: "What we treat", href: "#services" },
          { label: "Our doctors", href: "#team" },
          { label: "Fees", href: "#pricing" },
        ],
      },
      {
        heading: "Patients",
        links: [
          { label: "Book an appointment", href: "#booking" },
          { label: "Questions", href: "#faq" },
          { label: "Find us", href: "#contact" },
        ],
      },
    ],
    legal: "© {year} {business}. HPCSA registered. Practice no. 0421887.",
  },

  hero: {
    variant: "card-overlay",
    eyebrow: "Somerset West",
    headline: "A doctor who knows your history",
    subheadline:
      "Four GPs, one practice, and the same doctor each visit unless you ask otherwise. We keep slots open every morning for people who woke up unwell, and we will tell you honestly when something is worth worrying about and when it is not.",
    image: {
      src: "/doctor/hero.jpg",
      alt: "A doctor with a patient at Helderberg Family Practice",
    },
    primaryCta: { label: "Book an appointment", href: "#booking" },
    secondaryCta: { label: "021 851 4470", href: "tel:0218514470" },
    highlights: ["Same-day slots held daily", "Open Saturday mornings", "All medical aids"],
    overlayOpacity: 30,
  },

  highlights: {
    variant: "numbered",
    eyebrow: "How the practice runs",
    heading: "What to expect",
    intro:
      "Most of what frustrates people about a GP is logistics rather than medicine. These are the things we have deliberately arranged differently.",
    items: [
      {
        title: "You keep the same doctor",
        description:
          "You are booked with your own GP by default. Continuity is most of what makes general practice work — a doctor who saw you eighteen months ago spots the pattern a locum cannot.",
        icon: "UserRound",
      },
      {
        title: "Same-day slots, held back",
        description:
          "We hold appointments open every morning rather than filling the diary weeks ahead. Phone before 09:00 and you will usually be seen that day.",
        icon: "CalendarClock",
      },
      {
        title: "Twenty minutes, not ten",
        description:
          "A standard consultation here is twenty minutes. It costs us diary space and it is the reason we do not run an hour behind by mid-afternoon.",
        icon: "Clock",
      },
      {
        title: "We say what it will cost",
        description:
          "Fees are published below and reception will confirm what your plan covers before you are seen, not after. No account arrives as a surprise.",
        icon: "CreditCard",
      },
    ],
  },

  services: {
    variant: "grid",
    eyebrow: "What we treat",
    heading: "General practice, properly resourced",
    intro:
      "Everything below happens in the rooms. Where you need a specialist we refer you and stay involved rather than handing you over.",
    items: [
      {
        title: "Acute illness and injury",
        description:
          "The reason most people phone: infections, chest and ear complaints, gastro, wounds, sprains and the things that came on overnight.",
        icon: "Stethoscope",
        points: [
          "Same-day slots held every morning",
          "Minor wound care and suturing",
          "On-site rapid tests",
        ],
      },
      {
        title: "Chronic conditions",
        description:
          "Blood pressure, diabetes, cholesterol, asthma and thyroid disease, on a recall system so a repeat script is never the only contact you have with us.",
        icon: "HeartPulse",
        points: [
          "Six-monthly structured reviews",
          "Chronic medicine authorisations handled",
          "Shared care with your specialist",
        ],
      },
      {
        title: "Children and babies",
        description:
          "Well-baby checks, the full state and private immunisation schedules, growth monitoring and the ordinary childhood illnesses.",
        icon: "Baby",
        points: ["Road-to-Health book kept up", "Private and EPI schedules", "Longer paediatric slots"],
      },
      {
        title: "Women's health",
        description:
          "Cervical screening, contraception including implants and IUDs, menopause care and fertility discussions before a referral is needed.",
        icon: "FileHeart",
        points: ["Pap smears and HPV testing", "IUD and implant insertion", "Menopause consultations"],
      },
      {
        title: "Health checks and screening",
        description:
          "Executive medicals, pre-employment and insurance examinations, driver's licence eyesight tests and annual well-person checks.",
        icon: "ClipboardList",
        points: ["Full bloods with same-week results", "Insurance and employment forms", "ECG on site"],
      },
      {
        title: "Travel medicine",
        description:
          "Destination-specific vaccination and malaria advice, yellow fever certificates and everything else the trip needs, ideally six weeks ahead.",
        icon: "Plane",
        points: ["Yellow fever accredited", "Malaria prophylaxis", "Travel kit prescriptions"],
      },
    ],
    cta: { label: "Book an appointment", href: "#booking" },
  },

  team: {
    variant: "rows",
    eyebrow: "Our doctors",
    heading: "Who you will see",
    intro:
      "All four are HPCSA registered and all four consult from these rooms. Say who you would like when you book.",
    members: [
      {
        name: "Dr Anneke van Zyl",
        role: "General practitioner — practice principal",
        bio: "MBChB (Stellenbosch), in practice since 2001 and here since the rooms opened in 2004. Special interest in diabetes and chronic disease management, and the practice's chronic recall system is hers.",
        image: { src: "/doctor/team-1.jpg", alt: "Dr Anneke van Zyl" },
        socials: [],
      },
      {
        name: "Dr Sipho Mthembu",
        role: "General practitioner",
        bio: "MBChB (UCT), Dip PEC (SA). Joined in 2013 after six years in emergency medicine at Vergelegen, which is why he takes most of the acute and minor-injury work.",
        image: { src: "/doctor/team-2.jpg", alt: "Dr Sipho Mthembu" },
        socials: [],
      },
      {
        name: "Dr Farah Ismail",
        role: "General practitioner",
        bio: "MBChB (Wits), Dip Obst. Women's health and paediatrics, runs the well-baby and immunisation clinic on Tuesday and Thursday mornings.",
        image: { src: "/doctor/team-3.jpg", alt: "Dr Farah Ismail" },
        socials: [],
      },
      {
        name: "Sr Marlene Botha",
        role: "Practice sister",
        bio: "Registered nurse since 1998. Immunisations, dressings, ECGs, blood draws and the travel clinic. Most visits start or end with her.",
        image: { src: "/doctor/team-4.jpg", alt: "Sr Marlene Botha, practice sister" },
        socials: [],
      },
    ],
  },

  stats: {
    variant: "divided",
    heading: "The practice",
    items: [
      { value: "2004", label: "Rooms opened", icon: "Clock" },
      { value: "4", label: "Doctors and a practice sister", icon: "Users" },
      { value: "20 min", label: "Standard consultation", icon: "CalendarClock" },
      { value: "All", label: "Medical aids accepted", icon: "CreditCard" },
    ],
  },

  pricing: {
    variant: "comparison-strip",
    eyebrow: "Fees",
    heading: "What a visit costs",
    intro:
      "Private rates, published so you can check them against your plan before you come in. We charge medical aid rates where your scheme pays us directly.",
    note: "Rates effective March 2026. Reception will confirm what your plan covers when you book. Accounts are settled on the day unless your scheme pays the practice directly.",
    plans: [
      {
        name: "Standard consultation",
        price: "R650",
        unit: "20 minutes",
        description: "The usual appointment, with any script or referral it needs.",
        features: ["Same-day slots held daily", "Script and sick note included"],
      },
      {
        name: "Extended consultation",
        price: "R980",
        unit: "40 minutes",
        description: "New chronic diagnoses, complex problems, or several things at once.",
        features: ["Booked in advance", "Full history and examination"],
      },
      {
        name: "Well-person check",
        price: "R1 450",
        unit: "including bloods",
        description: "Annual check with examination, ECG and a full blood panel.",
        features: ["ECG on site", "Results within the week"],
      },
      {
        name: "Nurse-only visit",
        price: "R220",
        unit: "per visit",
        description: "Dressings, injections, blood pressure checks and blood draws.",
        features: ["No doctor's appointment needed", "Walk-in most mornings"],
      },
      {
        name: "Travel consultation",
        price: "R780",
        unit: "plus vaccines",
        description: "Destination advice, prescriptions and certificates. Vaccines charged at cost.",
        features: ["Yellow fever accredited", "Book six weeks ahead"],
      },
    ],
  },

  faq: {
    variant: "sidebar",
    eyebrow: "Questions",
    heading: "Before you come in",
    intro:
      "The things reception is asked most. If yours is not here, phone — someone answers the practice line during opening hours.",
    items: [
      {
        question: "Can I be seen today?",
        answer:
          "Usually. We hold same-day slots back every morning rather than booking the diary out in advance. Phone before 09:00 for the best chance, and tell reception what is wrong so they can judge the urgency.",
      },
      {
        question: "Do you take my medical aid?",
        answer:
          "We accept all South African schemes. Where your plan pays providers directly we bill the scheme; otherwise the account is settled on the day and you claim it back. Reception will tell you which applies to your plan when you book.",
      },
      {
        question: "Do I have to see the same doctor?",
        answer:
          "No, but we book you with your own GP by default because it is better medicine. Ask for someone else at any time — nobody minds, and the notes are shared across the practice.",
      },
      {
        question: "Can I get a repeat script without an appointment?",
        answer:
          "For a stable chronic condition, yes — phone or WhatsApp reception and allow one working day. We will ask you to come in every six months so the prescription is reviewed rather than simply reissued.",
      },
      {
        question: "What do I bring to a first visit?",
        answer:
          "Your ID, your medical aid card, any medication you are currently taking in its box, and the name of your previous practice if you would like us to request your records.",
      },
      {
        question: "Do you see children?",
        answer:
          "Yes, from birth. Dr Ismail runs the well-baby and immunisation clinic on Tuesday and Thursday mornings, and paediatric appointments are given a longer slot as standard.",
      },
      {
        question: "What about after hours and emergencies?",
        answer:
          "For anything life-threatening go straight to Vergelegen Mediclinic or call 10177. Outside our hours the practice line carries a recorded message with the doctor on call for our registered patients.",
      },
      {
        question: "Is there parking?",
        answer:
          "Free parking in the bays in front of the rooms, and the entrance is at street level with no steps. There is a dedicated bay beside the ramp.",
      },
    ],
  },

  booking: {
    variant: "split",
    eyebrow: "Appointments",
    heading: "Book an appointment",
    intro:
      "Tell us what you need and roughly when. Reception confirms by phone, usually within the hour during opening times. If you need to be seen today, phone rather than using this form.",
    submitLabel: "Request appointment",
    successMessage:
      "Thank you — reception will phone you to confirm. If this is urgent, please call 021 851 4470 rather than waiting.",
    serviceOptions: [
      "Standard consultation",
      "Extended consultation",
      "Child or baby",
      "Chronic condition review",
      "Well-person check",
      "Nurse only — dressing, injection or bloods",
      "Travel consultation",
    ],
    askPreferredTime: true,
    slotLengthMinutes: 20,
  },

  contact: {
    variant: "split-map",
    eyebrow: "Find us",
    heading: "8 Rothschild Boulevard, Somerset West",
    intro:
      "Street-level entrance with a ramp and free parking in front. Two minutes from the N2 Somerset West off-ramp.",
    formHeading: "Send us a message",
    submitLabel: "Send message",
    successMessage: "Thank you — reception will come back to you within a working day.",
    subjectOptions: [
      "General question",
      "Medical aid or account query",
      "Repeat prescription",
      "Records request",
      "Feedback",
    ],
  },

  cta: {
    variant: "overlap",
    heading: "Registering takes one visit",
    body:
      "Bring your ID and medical aid card to a first appointment and we will request your records from your previous practice. There is no registration fee and no waiting list.",
    primaryCta: { label: "Book an appointment", href: "#booking" },
    secondaryCta: { label: "WhatsApp reception", href: "https://wa.me/27828514470" },
    image: {
      src: "/doctor/cta.jpg",
      alt: "The reception desk at Helderberg Family Practice",
    },
  },
};
