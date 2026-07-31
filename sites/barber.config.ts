import type { SiteConfigInput } from "@/lib/schema";

/**
 * Legacy Barbers — Braamfontein, Johannesburg.
 *
 * DESIGN BRIEF
 * Direction (pinned): bold, masculine, gold on black, booking enabled, masonry gallery.
 * Anti-default: black-plus-one-accent is one of the looks AI design falls into, so
 * the separation from it has to come from type and structure rather than hue —
 * gold is a metal, not an acid accent, and it is used as a full text colour here
 * rather than as a lone highlight.
 * Type: Oswald set in uppercase with wide tracking, over Inter. Condensed
 * uppercase is the barber-pole vernacular — signwriting, not branding.
 * Zero border radius throughout; nothing on this site is soft.
 * Signature: the price list. `pricing: simple-list` renders services against
 * prices with a dotted leader, the way it is actually painted on a barbershop
 * mirror, and the booking form sits directly under it.
 *
 * Images expected in /public/barber/ — hero 1920×1080, gallery 800×1000,
 * team 600×600, booking 1000×1250.
 */
export const barberConfig: SiteConfigInput = {
  id: "barber",

  business: {
    name: "Legacy Barbers",
    tagline: "Sharp since 2009",
    phone: "011 403 6612",
    email: "bookings@legacybarbers.co.za",
    whatsapp: "27716045512",
    address: {
      street: "12 Juta Street",
      suburb: "Braamfontein",
      city: "Johannesburg",
      province: "Gauteng",
      postalCode: "2001",
    },
    geo: { lat: -26.1929, lng: 28.0305 },
    googleMapsUrl: "https://maps.google.com/?q=12+Juta+Street+Braamfontein",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=12+Juta+Street+Braamfontein&output=embed",
    socialLinks: [
      { platform: "Instagram", href: "https://instagram.com/legacybarbersjhb", icon: "Instagram" },
      { platform: "Facebook", href: "https://facebook.com/legacybarbersjhb", icon: "Facebook" },
      { platform: "TikTok", href: "https://tiktok.com/@legacybarbersjhb", icon: "Music2" },
    ],
    businessHours: [
      { day: "Monday – Friday", opens: "08:00", closes: "19:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
      { day: "Saturday", opens: "07:00", closes: "17:00", schemaDays: ["Saturday"] },
      { day: "Sunday", opens: "09:00", closes: "14:00", schemaDays: ["Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#C9A227",
    secondaryColor: "#8A6D14",
    accentColor: "#E3C35A",
    neutral: {
      bg: "#121110",
      surface: "#1C1A17",
      border: "#37322A",
      text: "#F2EDE4",
      textMuted: "#AFA391",
      onPrimary: "#14120F",
    },
    fontHeading: "oswald",
    fontBody: "inter",
    borderRadius: "none",
    buttonStyle: "solid",
    cardStyle: "bordered",
    shadowStyle: "none",
    spacingScale: "normal",
    animationStyle: "subtle",
    headingTransform: "uppercase",
  },

  features: {
    booking: true,
    gallery: true,
    testimonials: true,
    blog: false,
    pricing: true,
    whatsapp: true,
    newsletter: false,
    map: true,
    faq: false,
  },

  seo: {
    title: "Legacy Barbers | Braamfontein barbershop, Johannesburg",
    description:
      "Skin fades, hot-towel shaves and beard work in Braamfontein. Walk in or book your chair online. Open seven days.",
    keywords: [
      "barber Braamfontein",
      "barbershop Johannesburg",
      "skin fade Joburg",
      "hot towel shave Braamfontein",
    ],
    ogImage: "/barber/og.svg",
    schemaType: "HairSalon",
    locale: "en_ZA",
    url: "https://legacybarbers.co.za",
  },

  layout: [
    "hero",
    "highlights",
    "services",
    "pricing",
    "gallery",
    "team",
    "testimonials",
    "booking",
    "contact",
  ],

  navbar: {
    variant: "solid",
    links: [
      { label: "Services", href: "#services" },
      { label: "Prices", href: "#pricing" },
      { label: "The barbers", href: "#team" },
      { label: "Gallery", href: "#gallery" },
    ],
    cta: { label: "Book a chair", href: "#booking" },
    showPhone: true,
  },

  footer: {
    variant: "cta-heavy",
    blurb: "Four chairs on Juta Street. No appointment needed, but it helps on a Saturday.",
    ctaHeading: "Your chair is open",
    cta: { label: "Book online", href: "#booking" },
    columns: [
      {
        heading: "Shop",
        links: [
          { label: "Services", href: "#services" },
          { label: "Prices", href: "#pricing" },
          { label: "The barbers", href: "#team" },
        ],
      },
      {
        heading: "Visit",
        links: [
          { label: "Book a chair", href: "#booking" },
          { label: "Find us", href: "#contact" },
          { label: "Gallery", href: "#gallery" },
        ],
      },
    ],
    legal: "© {year} {business}. Braamfontein, Johannesburg.",
  },

  hero: {
    variant: "split",
    eyebrow: "Braamfontein, Johannesburg",
    headline: "Get it cut properly",
    subheadline:
      "Four chairs, seven days a week, and barbers who have been cutting long enough to tell you when the style you brought in is not going to work.",
    image: { src: "/barber/hero.jpg", alt: "A barber finishing a skin fade at Legacy Barbers" },
    primaryCta: { label: "Book a chair", href: "#booking" },
    secondaryCta: { label: "See prices", href: "#pricing" },
    highlights: ["Open 7 days", "Walk-ins welcome", "Since 2009"],
    align: "left",
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "Why Legacy",
    heading: "What you get in the chair",
    items: [
      {
        title: "Barbers, not stylists",
        description:
          "Every one of our four barbers trained on clippers first. Fades, tapers and line-ups are the core of the job here, not a sideline.",
        icon: "Scissors",
      },
      {
        title: "Straight answers",
        description:
          "If your hair will not hold the shape you want, we will say so before we start and show you what will work instead.",
        icon: "MessageSquare",
      },
      {
        title: "No wasted trip",
        description:
          "Book online and your chair is held for fifteen minutes. Walk in and we will tell you the honest wait before you sit down.",
        icon: "Clock",
      },
    ],
  },

  services: {
    variant: "grid",
    eyebrow: "Services",
    heading: "What we do",
    intro: "Every cut finishes with a hot towel and a neck shave. That is not an extra.",
    items: [
      {
        title: "Skin fade",
        description:
          "Taken down to the skin and blended clean through the sides and back. The cut we do most, and the one we are judged on.",
        icon: "Scissors",
        price: "R220",
        points: ["45 minutes", "Hot towel finish"],
      },
      {
        title: "Scissor cut",
        description:
          "For longer hair that needs shape rather than length taken off. Washed, cut wet, dried and finished.",
        icon: "Wind",
        price: "R260",
        points: ["50 minutes", "Wash included"],
      },
      {
        title: "Beard sculpt",
        description:
          "Lined up with a straight razor, shaped to your jaw, and finished with beard oil. Comes free with any cut.",
        icon: "Sparkles",
        price: "R140",
        points: ["30 minutes", "Free with a cut"],
      },
      {
        title: "Hot-towel shave",
        description:
          "The full traditional shave: two towels, pre-shave oil, straight razor, cold finish. Book forty minutes.",
        icon: "Droplets",
        price: "R240",
        points: ["40 minutes"],
      },
      {
        title: "Father and son",
        description:
          "Two chairs side by side, both cuts done together. Under-twelves pay half price on this one.",
        icon: "Users",
        price: "R330",
        points: ["Two chairs", "Saturday mornings book out"],
      },
      {
        title: "Head shave",
        description: "Clippers down to bare, straight razor finish, scalp balm to close.",
        icon: "CircleUser",
        price: "R190",
        points: ["30 minutes"],
      },
    ],
  },

  pricing: {
    variant: "simple-list",
    eyebrow: "Price list",
    heading: "What it costs",
    intro: "Cash, card and SnapScan. Prices have not moved since March.",
    note: "Under-twelves and over-sixty-fives pay 20% less on every cut, any day.",
    plans: [
      { name: "Skin fade", price: "R220", description: "45 minutes, hot towel and neck shave included." },
      { name: "Scissor cut", price: "R260", description: "50 minutes, wash and dry included." },
      { name: "Hot-towel shave", price: "R240", description: "40 minutes, straight razor, cold finish." },
      { name: "Head shave", price: "R190", description: "30 minutes, scalp balm to close." },
      { name: "Beard sculpt", price: "R140", description: "30 minutes. Free when booked with any cut." },
      { name: "Father and son", price: "R330", description: "Two chairs together, both cuts." },
      { name: "Line-up only", price: "R90", description: "Fifteen minutes, edges and neck." },
    ],
  },

  gallery: {
    variant: "masonry",
    eyebrow: "The work",
    heading: "Out of the chair",
    intro: "Cuts from the last few weeks, posted with permission.",
    images: [
      { src: "/barber/gallery-1.jpg", alt: "A high skin fade with a sharp line-up" },
      { src: "/barber/gallery-2.jpg", alt: "A textured crop cut finished with matte clay" },
      { src: "/barber/gallery-3.jpg", alt: "A full beard shaped and lined with a straight razor" },
      { src: "/barber/gallery-4.jpg", alt: "The shop floor with all four chairs busy" },
      { src: "/barber/gallery-5.jpg", alt: "A hot towel being applied before a shave" },
      { src: "/barber/gallery-6.jpg", alt: "A low taper on short curly hair" },
    ],
  },

  team: {
    variant: "rows",
    eyebrow: "The barbers",
    heading: "Who is on the floor",
    intro: "Ask for anyone by name when you book. If they are off, we will tell you before you come in.",
    members: [
      {
        name: "Tebogo Mahlangu",
        role: "Owner, chair one",
        bio: "Opened Legacy on Juta Street in 2009 after eight years in a shop in Yeoville. Fades and beard work. Off on Wednesdays.",
        image: { src: "/barber/team-1.jpg", alt: "Tebogo Mahlangu at his chair" },
        socials: [{ platform: "Instagram", href: "https://instagram.com/legacybarbersjhb", icon: "Instagram" }],
      },
      {
        name: "Ashwin Petersen",
        role: "Senior barber, chair two",
        bio: "Cape Town trained, twelve years on the clippers. The one to book for scissor work and longer styles.",
        image: { src: "/barber/team-2.jpg", alt: "Ashwin Petersen cutting a client's hair" },
        socials: [],
      },
      {
        name: "Sizwe Ndaba",
        role: "Barber, chair three",
        bio: "Came through our apprenticeship in 2019 and stayed. Does the sharpest line-up in the shop and knows it.",
        image: { src: "/barber/team-3.jpg", alt: "Sizwe Ndaba lining up a client's hairline" },
        socials: [],
      },
      {
        name: "Marco Fisher",
        role: "Barber, chair four",
        bio: "Straight-razor specialist. If you have never had a proper hot-towel shave, book him for a Tuesday morning when it is quiet.",
        image: { src: "/barber/team-4.jpg", alt: "Marco Fisher stropping a straight razor" },
        socials: [],
      },
    ],
  },

  testimonials: {
    variant: "carousel",
    eyebrow: "Reviews",
    heading: "What the chair says",
    items: [
      {
        quote:
          "Been going to Tebogo for six years. He is the only barber who has ever told me a style would not suit me instead of just doing it and taking the money.",
        name: "Lebo Skhosana",
        role: "Melville",
        rating: 5,
      },
      {
        quote:
          "Walked in on a Saturday morning expecting an hour's wait. They told me forty minutes, and it was forty minutes.",
        name: "Craig Naidoo",
        role: "Parktown",
        rating: 5,
      },
      {
        quote:
          "Took my son for his first proper cut. Sizwe talked him through the clippers before switching them on. He did not flinch once.",
        name: "Hendrik Malan",
        role: "Auckland Park",
        rating: 5,
      },
      {
        quote:
          "The hot-towel shave with Marco is worth the money. I book it before every wedding I have to go to.",
        name: "Thabo Rathebe",
        role: "Braamfontein",
        rating: 5,
      },
      {
        quote:
          "Parking on Juta can be a mission in the week. The cut is good enough that I still come.",
        name: "Dylan Pretorius",
        role: "Rosebank",
        rating: 4,
      },
    ],
  },

  booking: {
    variant: "split",
    eyebrow: "Booking",
    heading: "Take a chair",
    intro:
      "Pick a service and a time and we will confirm by WhatsApp. Your chair is held for fifteen minutes past the booked time.",
    submitLabel: "Request my chair",
    successMessage:
      "Got it — we will confirm on WhatsApp shortly. If you do not hear from us within the hour, phone the shop.",
    serviceOptions: [
      "Skin fade",
      "Scissor cut",
      "Beard sculpt",
      "Hot-towel shave",
      "Head shave",
      "Father and son",
      "Line-up only",
    ],
    askPreferredTime: true,
    image: { src: "/barber/booking.jpg", alt: "An empty barber chair ready for the next client" },
  },

  contact: {
    variant: "centered",
    eyebrow: "Find us",
    heading: "12 Juta Street, Braamfontein",
    intro: "Ground floor, next to the coffee shop. Street parking on Juta, secure lot on De Beer.",
    submitLabel: "Send message",
    successMessage: "Thanks — we will come back to you today.",
    subjectOptions: ["General question", "Booking change", "Private group booking", "Feedback"],
  },
};
