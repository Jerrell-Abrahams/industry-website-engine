import type { SiteConfigInput } from "@/lib/schema";

/**
 * Ironworks Strength — Bellville, Cape Town. Strength gym.
 * Variants: angled + alternating. Dark and dense with a warm signal-orange, set
 * in Archivo uppercase — shares "dark and loud" with the barber but lands
 * somewhere else entirely through hue, density and an alternating services rail.
 */
export const gymConfig: SiteConfigInput = {
  id: "gym",

  business: {
    name: "Ironworks Strength",
    tagline: "Barbells, not gimmicks",
    phone: "021 948 7730",
    email: "train@ironworksstrength.co.za",
    whatsapp: "27829487730",
    address: {
      street: "Unit 4, 61 Voortrekker Road",
      suburb: "Bellville",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "7530",
    },
    geo: { lat: -33.9018, lng: 18.6292 },
    googleMapsUrl: "https://maps.google.com/?q=Voortrekker+Road+Bellville",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Voortrekker+Road+Bellville&output=embed",
    socialLinks: [
      { platform: "Instagram", href: "https://instagram.com/ironworksstrength", icon: "Instagram" },
      { platform: "Facebook", href: "https://facebook.com/ironworksstrength", icon: "Facebook" },
    ],
    businessHours: [
      { day: "Monday – Friday", opens: "05:00", closes: "20:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
      { day: "Saturday", opens: "07:00", closes: "13:00", schemaDays: ["Saturday"] },
      { day: "Sunday", opens: "08:00", closes: "12:00", schemaDays: ["Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#F2603F",
    secondaryColor: "#A83420",
    accentColor: "#E0C05A",
    neutral: {
      bg: "#131418",
      surface: "#1D1F25",
      border: "#343842",
      text: "#F0F1F3",
      textMuted: "#A8ACB6",
      onPrimary: "#14100E",
    },
    fontHeading: "archivo",
    fontBody: "inter",
    borderRadius: "none",
    buttonStyle: "solid",
    cardStyle: "flat",
    shadowStyle: "none",
    spacingScale: "compact",
    animationStyle: "lively",
    headingTransform: "uppercase",
  },

  features: {
    booking: true,
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
    title: "Ironworks Strength | Barbell gym in Bellville, Cape Town",
    description:
      "A strength gym in Bellville. Coached barbell training, powerlifting and beginner programmes. No contracts, month to month.",
    keywords: ["gym Bellville", "powerlifting Cape Town", "strength coach Bellville", "barbell gym Cape Town"],
    ogImage: "/gym/og.svg",
    schemaType: "ExerciseGym",
    locale: "en_ZA",
    url: "https://ironworksstrength.co.za",
  },

  layout: ["hero", "stats", "services", "highlights", "pricing", "testimonials", "faq", "contact", "cta"],

  navbar: {
    variant: "solid",
    links: [
      { label: "Training", href: "#services" },
      { label: "Membership", href: "#pricing" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Find us", href: "#contact" },
    ],
    cta: { label: "Book a trial", href: "#contact" },
  },

  footer: {
    variant: "cta-heavy",
    ctaHeading: "First session is free",
    blurb: "Come in, get shown the lifts, decide afterwards. No hard sell and no contract to sign.",
    cta: { label: "Book a trial session", href: "#contact" },
    columns: [
      {
        heading: "Train",
        links: [
          { label: "Programmes", href: "#services" },
          { label: "Membership", href: "#pricing" },
          { label: "Questions", href: "#faq" },
        ],
      },
      {
        heading: "Gym",
        links: [
          { label: "Reviews", href: "#testimonials" },
          { label: "Find us", href: "#contact" },
        ],
      },
    ],
    legal: "© {year} {business}. Bellville, Cape Town.",
  },

  hero: {
    variant: "angled",
    eyebrow: "Bellville, Cape Town",
    headline: "Get strong on purpose",
    subheadline:
      "A coached barbell gym, not a circuit of machines. Everyone gets a written programme and someone watching their technique from the first session.",
    image: { src: "/gym/hero.jpg", alt: "A lifter pulling a loaded deadlift" },
    primaryCta: { label: "Book a free trial", href: "#contact" },
    secondaryCta: { label: "See membership", href: "#pricing" },
    highlights: ["Open from 05:00", "No contracts", "Coached, not supervised"],
  },

  stats: {
    variant: "bar",
    items: [
      { value: "2017", label: "Open since" },
      { value: "12", label: "Competition platforms" },
      { value: "4", label: "Full-time coaches" },
      { value: "0", label: "Contracts, ever" },
    ],
  },

  services: {
    variant: "alternating",
    eyebrow: "Training",
    heading: "How people train here",
    intro: "Four ways in. Everyone starts with the same technique assessment.",
    items: [
      {
        title: "Beginner barbell",
        description:
          "Six weeks, twice a week, in groups of four. You learn to squat, press, deadlift and bench properly before you load anything heavy. This is where about eighty percent of our members start.",
        icon: "Dumbbell",
        image: { src: "/gym/service-1.jpg", alt: "A coach teaching barbell technique" },
        price: "R2 400 for the block",
        points: [
          "Groups of four, never more",
          "Written programme from week one",
          "Video review of your lifts",
          "Rolls into full membership at the end",
        ],
      },
      {
        title: "Open gym membership",
        description:
          "Full access to the floor with a programme written for you and reviewed every eight weeks. A coach is on the floor every hour we are open, and you can grab them.",
        icon: "Activity",
        image: { src: "/gym/service-2.jpg", alt: "The weights floor with squat racks" },
        price: "R750 per month",
        points: [
          "Programme reviewed every 8 weeks",
          "Coach on the floor all opening hours",
          "12 racks, 4 platforms",
          "Month to month, cancel any time",
        ],
      },
      {
        title: "Powerlifting squad",
        description:
          "For members competing in SAPF meets. Squad training on Tuesday and Thursday evenings, meet-day handling, and peaking blocks written around your competition calendar.",
        icon: "Trophy",
        image: { src: "/gym/service-3.jpg", alt: "A lifter attempting a competition deadlift" },
        price: "R1 100 per month",
        points: [
          "Tuesday and Thursday squad sessions",
          "Meet-day handling included",
          "Attempt selection and peaking",
          "Membership included",
        ],
      },
      {
        title: "One-on-one coaching",
        description:
          "Private sessions for people coming back from injury, training around a specific limitation, or who simply want a coach on every session.",
        icon: "UserCheck",
        image: { src: "/gym/service-4.jpg", alt: "A personal training session in the gym" },
        price: "R420 per session",
        points: [
          "45 minutes, booked directly with the coach",
          "Suitable post-rehab",
          "Blocks of ten at a discount",
        ],
      },
    ],
  },

  highlights: {
    variant: "numbered",
    eyebrow: "Getting started",
    heading: "Your first two weeks",
    intro: "Nobody is thrown onto the floor and left there.",
    items: [
      {
        title: "Free trial session",
        description: "An hour with a coach. You lift, they watch, and you see whether the place suits you.",
        icon: "CalendarCheck",
      },
      {
        title: "Movement assessment",
        description: "We find out what your hips, shoulders and ankles will actually let you do before writing anything.",
        icon: "Scan",
      },
      {
        title: "Your programme",
        description: "Written for your schedule and your starting point, not pulled off a template.",
        icon: "FileText",
      },
      {
        title: "First eight weeks",
        description: "You train it, a coach adjusts it, and at week eight we reassess and write the next block.",
        icon: "TrendingUp",
      },
    ],
  },

  pricing: {
    variant: "cards",
    eyebrow: "Membership",
    heading: "What it costs",
    intro: "Month to month. Cancel with a month's notice, no penalty and no phone call to retentions.",
    note: "Students and over-sixties pay R600 on open gym. Debit order or EFT.",
    plans: [
      {
        name: "Beginner block",
        price: "R2 400",
        unit: "six weeks",
        description: "The way most people start.",
        features: ["Twice a week for six weeks", "Groups of four", "Written programme", "Video technique review"],
        cta: { label: "Start here", href: "#contact" },
      },
      {
        name: "Open gym",
        price: "R750",
        unit: "per month",
        description: "Full access with coaching on the floor.",
        featured: true,
        features: [
          "Written programme",
          "Reviewed every 8 weeks",
          "Coach on the floor all hours",
          "12 racks, 4 platforms",
          "No contract",
        ],
        cta: { label: "Join", href: "#contact" },
      },
      {
        name: "Powerlifting squad",
        price: "R1 100",
        unit: "per month",
        description: "For members competing.",
        features: [
          "Everything in Open gym",
          "Tuesday and Thursday squad",
          "Meet-day handling",
          "Peaking and attempt selection",
        ],
        cta: { label: "Enquire", href: "#contact" },
      },
    ],
  },

  testimonials: {
    variant: "single-featured",
    eyebrow: "Members",
    heading: "Why people stay",
    items: [
      {
        quote:
          "I joined at forty-six having never touched a barbell, convinced I would be the oldest and weakest person there. Six weeks in the beginner group fixed that. Two years later I pulled 140kg at a meet in Paarl.",
        name: "Charmaine Booysen",
        role: "Member since 2023",
        rating: 5,
      },
      {
        quote: "Four coaches, and every one of them knows what my programme says without asking.",
        name: "Sipho Ndlela",
        role: "Member since 2019",
        rating: 5,
      },
      {
        quote: "No mirrors, no music videos, no queue for a rack at six in the morning.",
        name: "Jaco Steenkamp",
        role: "Member since 2021",
        rating: 5,
      },
      {
        quote: "They wrote me a programme around a shoulder I cannot press overhead with. Nobody else bothered to ask.",
        name: "Fatima Davids",
        role: "Member since 2022",
        rating: 5,
      },
    ],
  },

  faq: {
    variant: "single-column",
    eyebrow: "Questions",
    heading: "Before you come in",
    items: [
      {
        question: "I have never lifted before. Is this the wrong place?",
        answer:
          "It is the right place. The six-week beginner block exists precisely for people who have never touched a barbell, and most of our members came through it.",
      },
      {
        question: "Do I have to sign a contract?",
        answer:
          "No. Membership is month to month with a month's notice to cancel. We have never used a contract and do not intend to.",
      },
      {
        question: "Is there a joining fee?",
        answer: "No joining fee, no admin fee, no card fee. The monthly price is the whole price.",
      },
      {
        question: "What if I only want to use the gym without coaching?",
        answer:
          "That is what open gym membership is. The programme and the floor coach come with it whether you use them or not — we do not sell a cheaper version without them.",
      },
      {
        question: "Do you have showers and parking?",
        answer: "Four showers, lockers, and off-street parking in the yard behind the unit.",
      },
      {
        question: "Can I freeze my membership?",
        answer:
          "Yes, up to two months a year for travel, injury or anything else. Send us a message and it is done, no doctor's note required.",
      },
    ],
  },

  contact: {
    variant: "split-map",
    eyebrow: "Find us",
    heading: "Unit 4, 61 Voortrekker Road",
    intro: "Book a free trial session and we will confirm a time by WhatsApp.",
    formHeading: "Book a trial",
    submitLabel: "Book my trial",
    successMessage: "Got it — we will WhatsApp you a time within the day.",
    subjectOptions: ["Free trial session", "Beginner block", "Open gym membership", "Powerlifting squad", "One-on-one coaching"],
  },

  cta: {
    variant: "split",
    heading: "The first session costs nothing",
    body: "An hour with a coach, no sales pitch at the end. Come and see whether the place suits you.",
    primaryCta: { label: "Book a free trial", href: "#contact" },
    secondaryCta: { label: "021 948 7730", href: "tel:0219487730" },
    image: { src: "/gym/cta.jpg", alt: "A loaded barbell on the lifting platform" },
  },
};
