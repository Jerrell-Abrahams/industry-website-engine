import type { SiteConfigInput } from "@/lib/schema";

/**
 * Rivonia Dental Studio — Sandton, Johannesburg.
 * Variants: split + tabs. Clinical teal on white with Poppins over Inter and
 * generous radius — deliberately calm, because the single biggest barrier for
 * this industry is anxiety rather than price.
 */
export const dentistConfig: SiteConfigInput = {
  id: "dentist",

  business: {
    name: "Rivonia Dental Studio",
    tagline: "Dentistry without the dread",
    phone: "011 803 5562",
    email: "reception@rivoniadental.co.za",
    whatsapp: "27828035562",
    address: {
      street: "Suite 12, Rivonia Medical Centre, 303 Rivonia Boulevard",
      suburb: "Rivonia",
      city: "Sandton",
      province: "Gauteng",
      postalCode: "2191",
    },
    geo: { lat: -26.0546, lng: 28.0603 },
    googleMapsUrl: "https://maps.google.com/?q=Rivonia+Boulevard+Sandton",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Rivonia+Boulevard+Sandton&output=embed",
    socialLinks: [
      { platform: "Facebook", href: "https://facebook.com/rivoniadental", icon: "Facebook" },
    ],
    businessHours: [
      { day: "Monday – Thursday", opens: "07:30", closes: "17:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday"] },
      { day: "Friday", opens: "07:30", closes: "14:00", schemaDays: ["Friday"] },
      { day: "Saturday (emergencies)", opens: "08:00", closes: "12:00", schemaDays: ["Saturday"] },
      { day: "Sunday", closed: true, schemaDays: ["Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#16697A",
    secondaryColor: "#0E4C59",
    accentColor: "#B0632C",
    neutral: {
      bg: "#FFFFFF",
      surface: "#F0F6F7",
      border: "#D5E3E5",
      text: "#16242A",
      textMuted: "#4A5C63",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "poppins",
    fontBody: "inter",
    borderRadius: "lg",
    buttonStyle: "pill",
    cardStyle: "flat",
    shadowStyle: "soft",
    spacingScale: "normal",
    animationStyle: "subtle",
  },

  features: {
    booking: true,
    gallery: false,
    testimonials: true,
    pricing: false,
    whatsapp: true,
    newsletter: false,
    map: true,
    faq: true,
    openNowBadge: true,
  },

  seo: {
    title: "Rivonia Dental Studio | Dentist in Rivonia, Sandton",
    description:
      "General, cosmetic and emergency dentistry in Rivonia. Three dentists, sedation available for anxious patients, all medical aids accepted.",
    keywords: ["dentist Rivonia", "dentist Sandton", "emergency dentist Johannesburg", "anxious patient dentist Sandton"],
    ogImage: "/dentist/og.svg",
    schemaType: "Dentist",
    locale: "en_ZA",
    url: "https://rivoniadental.co.za",
  },

  layout: ["hero", "highlights", "services", "team", "stats", "testimonials", "faq", "booking", "contact"],

  navbar: {
    variant: "solid",
    links: [
      { label: "Treatments", href: "#services" },
      { label: "Our dentists", href: "#team" },
      { label: "Questions", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Book an appointment", href: "#booking" },
    showPhone: true,
  },

  footer: {
    variant: "columns",
    blurb:
      "A three-dentist practice in the Rivonia Medical Centre. HPCSA registered, all medical aids accepted, emergency slots kept open every day.",
    columns: [
      {
        heading: "Practice",
        links: [
          { label: "Treatments", href: "#services" },
          { label: "Our dentists", href: "#team" },
          { label: "Questions", href: "#faq" },
        ],
      },
      {
        heading: "Patients",
        links: [
          { label: "Book an appointment", href: "#booking" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    legal: "© {year} {business}. HPCSA registered. Rivonia, Sandton.",
  },

  hero: {
    variant: "split",
    eyebrow: "Rivonia, Sandton",
    headline: "You can tell us you're nervous",
    subheadline:
      "About a third of our patients say they have avoided a dentist for years. We keep longer first appointments precisely for that, and nothing happens in a session you have not agreed to.",
    image: { src: "/dentist/hero.jpg", alt: "A dental chair in the surgery" },
    primaryCta: { label: "Book an appointment", href: "#booking" },
    secondaryCta: { label: "See treatments", href: "#services" },
    highlights: ["Emergency slots daily", "Sedation available", "All medical aids"],
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "If you have been putting it off",
    heading: "How we handle anxious patients",
    intro: "This is not a marketing line. It is a set of things we actually do differently.",
    items: [
      {
        title: "Longer first appointments",
        description:
          "Forty-five minutes rather than twenty. Most of it is talking, and you are welcome to have the first visit be a conversation with nothing in your mouth at all.",
        icon: "MessageSquare",
      },
      {
        title: "Nothing without your say-so",
        description:
          "We explain what we found, what it will cost and what happens if you leave it, then you decide. No treatment is started in the same visit unless you ask for it.",
        icon: "HandHeart",
      },
      {
        title: "A stop signal that works",
        description:
          "Raise your left hand and everything stops, immediately, every time. Patients tell us knowing this is the single thing that helps most.",
        icon: "Hand",
      },
      {
        title: "Sedation if you need it",
        description:
          "Oral sedation for longer treatments and conscious IV sedation with a visiting anaesthetist for patients who genuinely cannot manage otherwise.",
        icon: "Pill",
      },
    ],
  },

  services: {
    variant: "tabs",
    eyebrow: "Treatments",
    heading: "What we do",
    intro: "Pick what brought you here.",
    items: [
      {
        title: "Check-ups and hygiene",
        description:
          "A six-monthly examination, scale and polish, and digital x-rays where they are needed rather than by default. This is the appointment that keeps everything else cheap.",
        icon: "Stethoscope",
        image: { src: "/dentist/service-1.jpg", alt: "A routine dental examination" },
        points: [
          "45-minute first visit",
          "Scale and polish with the oral hygienist",
          "Low-dose digital x-rays",
          "Written treatment plan with costs",
        ],
      },
      {
        title: "Fillings and restorations",
        description:
          "Tooth-coloured composite fillings, inlays and crowns. We keep as much of the original tooth as we can, and we will tell you when a filling can safely be watched rather than replaced.",
        icon: "CircleDot",
        image: { src: "/dentist/service-2.jpg", alt: "Composite filling materials" },
        points: ["Tooth-coloured composite", "Crowns and inlays", "Same-day temporary crowns", "Amalgam replacement"],
      },
      {
        title: "Root canal treatment",
        description:
          "Usually over two visits, under local anaesthetic, with rotary instrumentation. The reputation is worse than the reality — most patients describe it as a long filling.",
        icon: "Activity",
        image: { src: "/dentist/service-3.jpg", alt: "Root canal instruments laid out" },
        points: ["Two visits in most cases", "Referral to a specialist when needed", "Sedation available"],
      },
      {
        title: "Cosmetic dentistry",
        description:
          "Whitening, veneers and bonding. We will show you a mock-up before committing to anything irreversible, and we will say so if we think you do not need it.",
        icon: "Sparkles",
        image: { src: "/dentist/service-4.jpg", alt: "A close-up of a smile after whitening" },
        points: ["Home and in-chair whitening", "Porcelain and composite veneers", "Mock-up before treatment"],
      },
      {
        title: "Emergencies",
        description:
          "Pain, a knocked-out tooth, a lost crown or a broken denture. We hold slots open every working day and see registered patients the same day.",
        icon: "Siren",
        image: { src: "/dentist/service-5.jpg", alt: "A dentist wearing a mask and gloves" },
        points: ["Same-day for registered patients", "Saturday mornings 08:00 – 12:00", "Phone reception directly"],
      },
    ],
  },

  team: {
    variant: "grid",
    eyebrow: "Our dentists",
    heading: "Who will treat you",
    intro: "You see the same dentist each visit unless you ask otherwise.",
    members: [
      {
        name: "Dr Nadia Haffejee",
        role: "Principal dentist",
        bio: "BDS (Wits), practising since 2009. Special interest in treating anxious and phobic patients.",
        image: { src: "/dentist/team-1.jpg", alt: "Dr Nadia Haffejee" },
        socials: [],
      },
      {
        name: "Dr Thabo Mahlaba",
        role: "Dentist",
        bio: "BDS (UWC), practising since 2014. Restorative and cosmetic work, and the practice's implant referrals.",
        image: { src: "/dentist/team-2.jpg", alt: "Dr Thabo Mahlaba" },
        socials: [],
      },
      {
        name: "Dr Ilse Fourie",
        role: "Dentist",
        bio: "BChD (Pretoria), practising since 2018. Sees most of our paediatric patients and runs the Saturday emergency clinic.",
        image: { src: "/dentist/team-3.jpg", alt: "Dr Ilse Fourie" },
        socials: [],
      },
      {
        name: "Bongi Radebe",
        role: "Oral hygienist",
        bio: "Registered oral hygienist since 2012. Handles scaling, polishing and gum-health programmes.",
        image: { src: "/dentist/team-4.jpg", alt: "Bongi Radebe, oral hygienist" },
        socials: [],
      },
    ],
  },

  stats: {
    variant: "cards",
    heading: "The practice",
    items: [
      { value: "2009", label: "Established", icon: "Calendar" },
      { value: "3", label: "Dentists plus a hygienist", icon: "Users" },
      { value: "Daily", label: "Emergency slots held", icon: "Siren" },
      { value: "All", label: "Medical aids accepted", icon: "CreditCard" },
    ],
  },

  testimonials: {
    variant: "grid",
    eyebrow: "Patients",
    heading: "What patients say",
    items: [
      {
        quote:
          "I had not seen a dentist in eleven years. Dr Haffejee spent the first appointment just talking and did not touch my teeth once. I went back two weeks later and got the work done.",
        name: "Marlize Coetzee",
        role: "Bryanston",
        rating: 5,
      },
      {
        quote:
          "Broke a front tooth on a Friday afternoon. They fitted me in at four and I did not walk into the weekend looking like that.",
        name: "Ryan Pillay",
        role: "Rivonia",
        rating: 5,
      },
      {
        quote: "They quoted the whole treatment plan in writing including what my medical aid would not cover. Nobody had ever done that.",
        name: "Grace Sibanda",
        role: "Morningside",
        rating: 5,
      },
      {
        quote: "My six-year-old asks when she is going back. I have no explanation for this.",
        name: "Dewald Kotze",
        role: "Sunninghill",
        rating: 5,
      },
    ],
  },

  faq: {
    variant: "two-column",
    eyebrow: "Questions",
    heading: "What patients ask",
    items: [
      {
        question: "Do you take my medical aid?",
        answer:
          "We accept all South African medical aids. We can submit the claim for you, but the account remains yours — we will tell you before treatment what your plan is unlikely to cover.",
      },
      {
        question: "What does a check-up cost?",
        answer:
          "A first consultation with examination is R780, and a scale and polish with the hygienist is R690. X-rays are R180 each and only taken when clinically needed.",
      },
      {
        question: "I am genuinely terrified. What are my options?",
        answer:
          "Tell reception when you book so we allocate a longer slot. Start with a talk-only appointment if you would rather. Oral sedation and conscious IV sedation are both available.",
      },
      {
        question: "Can I be seen the same day for pain?",
        answer:
          "Registered patients, yes — we hold emergency slots every working day and open Saturday mornings. New patients we fit in as soon as we can, usually within a day.",
      },
      {
        question: "From what age should children come?",
        answer:
          "From about three, and the first visit is deliberately a ride in the chair and a count of the teeth rather than a treatment.",
      },
      {
        question: "Is there parking?",
        answer:
          "Free undercover parking at the Rivonia Medical Centre, with lift access to the first floor. We are Suite 12.",
      },
    ],
  },

  booking: {
    variant: "centered",
    eyebrow: "Appointments",
    heading: "Book an appointment",
    intro:
      "Tell us what you need and when suits. If you are anxious, say so here — we will book you a longer slot without you having to explain again on the phone.",
    submitLabel: "Request appointment",
    successMessage:
      "Thank you — reception will phone you to confirm, usually within the working day.",
    serviceOptions: [
      "Check-up and hygiene",
      "Filling or restoration",
      "Root canal treatment",
      "Cosmetic consultation",
      "Emergency — in pain",
      "Child's first visit",
    ],
    askPreferredTime: true,
  },

  contact: {
    variant: "split-map",
    eyebrow: "Find us",
    heading: "Suite 12, Rivonia Medical Centre",
    intro: "303 Rivonia Boulevard. Free undercover parking, lift to the first floor.",
    formHeading: "Send us a message",
    submitLabel: "Send message",
    successMessage: "Thank you — reception will come back to you within a working day.",
    subjectOptions: ["General question", "Medical aid query", "Treatment plan quote", "Feedback"],
  },
};
