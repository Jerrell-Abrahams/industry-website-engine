import type { SiteConfigInput } from "@/lib/schema";

/**
 * Aloe Ridge Guest House — Hermanus, Western Cape.
 * Variants: fullscreen-image + alternating. Fynbos green on warm paper, DM Serif
 * over Lora, outline buttons — shares a serif-on-warm direction with the
 * attorney but arrives somewhere completely different through hue and rhythm.
 */
export const guesthouseConfig: SiteConfigInput = {
  id: "guesthouse",

  business: {
    name: "Aloe Ridge Guest House",
    tagline: "Above the whale coast, ten minutes from town",
    phone: "028 312 4471",
    email: "stay@aloeridge.co.za",
    whatsapp: "27823124471",
    address: {
      street: "9 Rotary Way",
      suburb: "Eastcliff",
      city: "Hermanus",
      province: "Western Cape",
      postalCode: "7200",
    },
    geo: { lat: -34.4106, lng: 19.2637 },
    googleMapsUrl: "https://maps.google.com/?q=Rotary+Way+Hermanus",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Rotary+Way+Hermanus&output=embed",
    socialLinks: [
      { platform: "Instagram", href: "https://instagram.com/aloeridgehermanus", icon: "Instagram" },
      { platform: "Facebook", href: "https://facebook.com/aloeridgehermanus", icon: "Facebook" },
    ],
    businessHours: [
      { day: "Check-in", opens: "14:00", closes: "19:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
      { day: "Check-out", opens: "07:00", closes: "10:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#35594B",
    secondaryColor: "#24402F",
    accentColor: "#966A33",
    neutral: {
      bg: "#FCFAF6",
      surface: "#F3EEE4",
      border: "#E0D7C6",
      text: "#241F18",
      textMuted: "#5A5142",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "dmSerif",
    fontBody: "lora",
    borderRadius: "lg",
    buttonStyle: "outline",
    cardStyle: "flat",
    shadowStyle: "soft",
    spacingScale: "spacious",
    animationStyle: "subtle",
  },

  features: {
    booking: true,
    gallery: true,
    testimonials: true,
    pricing: true,
    whatsapp: true,
    newsletter: false,
    map: true,
    faq: true,
  },

  seo: {
    title: "Aloe Ridge Guest House | Hermanus accommodation, Eastcliff",
    description:
      "Five en-suite rooms on Rotary Way above Hermanus, with sea views over Walker Bay. Breakfast included, whale season June to November.",
    keywords: ["Hermanus accommodation", "guest house Hermanus", "Eastcliff bed and breakfast", "whale watching Hermanus stay"],
    ogImage: "/guesthouse/og.svg",
    schemaType: "BedAndBreakfast",
    locale: "en_ZA",
    url: "https://aloeridge.co.za",
  },

  layout: ["hero", "about", "services", "gallery", "pricing", "testimonials", "faq", "booking", "contact"],

  navbar: {
    variant: "transparent-overlay",
    links: [
      { label: "The house", href: "#about" },
      { label: "Rooms", href: "#services" },
      { label: "Gallery", href: "#gallery" },
      { label: "Rates", href: "#pricing" },
    ],
    cta: { label: "Check availability", href: "#booking" },
    showPhone: true,
  },

  footer: {
    variant: "columns",
    blurb:
      "Five rooms on the Eastcliff ridge, run by the people who live in the house next door. Whale season runs June to November.",
    columns: [
      {
        heading: "Stay",
        links: [
          { label: "Rooms", href: "#services" },
          { label: "Rates", href: "#pricing" },
          { label: "Check availability", href: "#booking" },
        ],
      },
      {
        heading: "About",
        links: [
          { label: "The house", href: "#about" },
          { label: "Gallery", href: "#gallery" },
          { label: "Questions", href: "#faq" },
        ],
      },
    ],
    legal: "© {year} {business}. Eastcliff, Hermanus.",
  },

  hero: {
    variant: "fullscreen-image",
    eyebrow: "Eastcliff, Hermanus",
    headline: "Whales from the breakfast table",
    subheadline:
      "Five en-suite rooms on Rotary Way, high enough to see the whole of Walker Bay and close enough to walk down to the cliff path before breakfast.",
    image: { src: "/guesthouse/hero.jpg", alt: "The view over Walker Bay from the terrace at Aloe Ridge" },
    primaryCta: { label: "Check availability", href: "#booking" },
    secondaryCta: { label: "See the rooms", href: "#services" },
    highlights: ["Five rooms only", "Breakfast included", "Whales June to November"],
    overlayOpacity: 48,
  },

  about: {
    variant: "stats-overlay",
    eyebrow: "The house",
    heading: "Small on purpose",
    body: [
      "Marius and Elna Roux built Aloe Ridge in 2009 on the plot above their own house, with five rooms and no intention of adding a sixth. They still cook breakfast themselves and still know which room you asked for last time.",
      "Everything faces the bay. The cliff path is a seven-minute walk downhill, the Old Harbour is fifteen, and in season you will hear the whales before you see them.",
    ],
    image: { src: "/guesthouse/about.jpg", alt: "The guest house and terrace seen from the garden" },
    stats: [
      { value: "5", label: "Rooms" },
      { value: "2009", label: "Built" },
      { value: "7min", label: "Walk to the cliff path" },
      { value: "9.6", label: "Average guest rating" },
    ],
  },

  services: {
    variant: "alternating",
    eyebrow: "The rooms",
    heading: "Where you will sleep",
    intro: "All five are en-suite, all five face the sea, and every rate includes a cooked breakfast.",
    items: [
      {
        title: "Bay Suite",
        description:
          "The largest room, on the top floor with a private balcony running the width of the house. King bed, freestanding bath and the best view on the property.",
        icon: "BedDouble",
        image: { src: "/guesthouse/service-1.jpg", alt: "Guest rooms with private balconies" },
        price: "From R2 950 per night",
        points: ["King bed", "Private balcony", "Freestanding bath", "Sleeps 2"],
      },
      {
        title: "Ridge Rooms (two)",
        description:
          "Queen rooms on the first floor sharing the upper terrace. Quieter than the suite and the ones most couples end up rebooking.",
        icon: "Bed",
        image: { src: "/guesthouse/service-2.jpg", alt: "A double bedroom with garden views" },
        price: "From R2 150 per night",
        points: ["Queen bed", "Shared upper terrace", "Shower en-suite", "Sleeps 2"],
      },
      {
        title: "Garden Rooms (two)",
        description:
          "Ground floor, opening onto the garden and the pool. Twin beds that can be made up as a king, which makes them the practical choice for friends travelling together.",
        icon: "Trees",
        image: { src: "/guesthouse/service-3.jpg", alt: "A Garden Room opening onto the lawn" },
        price: "From R1 850 per night",
        points: ["Twin or king", "Direct garden access", "Nearest the pool", "Sleeps 2"],
      },
      {
        title: "Whole-house bookings",
        description:
          "All five rooms for families and small groups, with the dining room and terrace yours for the stay. Popular for milestone birthdays out of season.",
        icon: "Home",
        image: { src: "/guesthouse/service-4.jpg", alt: "The dining room set for a group" },
        price: "From R9 500 per night",
        points: ["Sleeps 10", "Dining room and terrace exclusive", "Minimum two nights"],
      },
    ],
  },

  gallery: {
    variant: "filmstrip",
    eyebrow: "The property",
    heading: "Around the house",
    images: [
      { src: "/guesthouse/gallery-1.jpg", alt: "The terrace looking out over Walker Bay" },
      { src: "/guesthouse/gallery-2.jpg", alt: "A guest bedroom with a sea view" },
      { src: "/guesthouse/gallery-3.jpg", alt: "Breakfast laid out in the dining room" },
      { src: "/guesthouse/gallery-4.jpg", alt: "The pool and garden" },
      { src: "/guesthouse/gallery-5.jpg", alt: "The cliff path below the house" },
      { src: "/guesthouse/gallery-6.jpg", alt: "A guest bed made up with fresh linen" },
    ],
  },

  pricing: {
    variant: "table",
    eyebrow: "Rates",
    heading: "What a night costs",
    intro:
      "Per room per night for two people, breakfast included. Whale season is June to November and books out earliest.",
    note: "Minimum two nights over weekends and public holidays, three over Christmas and New Year. Rates include VAT and tourism levy.",
    plans: [
      {
        name: "Garden Room",
        price: "R1 850",
        unit: "low season",
        features: ["En-suite shower", "Sea view", "Cooked breakfast", "Garden access", "Free wifi", "Secure parking"],
        cta: { label: "Check availability", href: "#booking" },
      },
      {
        name: "Ridge Room",
        price: "R2 150",
        unit: "low season",
        featured: true,
        features: [
          "En-suite shower",
          "Sea view",
          "Cooked breakfast",
          "Free wifi",
          "Secure parking",
          "Shared upper terrace",
        ],
        cta: { label: "Check availability", href: "#booking" },
      },
      {
        name: "Bay Suite",
        price: "R2 950",
        unit: "low season",
        features: [
          "En-suite shower",
          "Sea view",
          "Cooked breakfast",
          "Free wifi",
          "Secure parking",
          "Private balcony",
          "Freestanding bath",
        ],
        cta: { label: "Check availability", href: "#booking" },
      },
    ],
  },

  testimonials: {
    variant: "single-featured",
    eyebrow: "Guests",
    heading: "What people write afterwards",
    items: [
      {
        quote:
          "We watched a southern right and her calf for forty minutes from the breakfast table without anyone having to get in a car. Elna refilled the coffee and said this happens most mornings in September, entirely matter-of-fact about it.",
        name: "Helen and Rob Whitfield",
        role: "Stayed September 2025",
        rating: 5,
      },
      {
        quote: "Five rooms means five rooms. No tour groups, no queue at breakfast, no lift.",
        name: "Andries Malan",
        role: "Stayed March 2025",
        rating: 5,
      },
      {
        quote: "Marius drew us a map of the cliff path on the back of a receipt and it was better than any guidebook.",
        name: "Lisa Chen",
        role: "Stayed July 2025",
        rating: 5,
      },
      {
        quote: "The Garden Rooms are the value pick. Same breakfast, same view, and you step straight out to the pool.",
        name: "Pieter Venter",
        role: "Stayed January 2026",
        rating: 5,
      },
    ],
  },

  faq: {
    variant: "single-column",
    eyebrow: "Questions",
    heading: "Before you book",
    items: [
      {
        question: "When is whale season?",
        answer:
          "Southern right whales are in Walker Bay from roughly June to November, with September and October the peak. They are visible from the terrace and from every room.",
      },
      {
        question: "Do you take children?",
        answer:
          "Children over twelve are welcome in any room. For younger children we ask that you book the whole house, which works well for families and keeps the other guests' stay quiet.",
      },
      {
        question: "Is breakfast really included?",
        answer:
          "Yes, cooked to order between half past seven and half past nine, and served on the terrace when the weather allows. Dietary requirements are no trouble with a day's notice.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Free cancellation up to fourteen days before arrival. Inside fourteen days we keep the fifty percent deposit; inside forty-eight hours the full amount is due.",
      },
      {
        question: "Is there parking?",
        answer: "Secure off-street parking behind the gate for five vehicles, one per room.",
      },
      {
        question: "How far is town?",
        answer:
          "Ten minutes by car, or twenty-five minutes on foot downhill to the Old Harbour. The walk back up is a real walk — most guests drive in the evening.",
      },
    ],
  },

  booking: {
    variant: "centered",
    eyebrow: "Availability",
    heading: "Check your dates",
    intro:
      "Tell us when you would like to come and which room suits. We answer every enquiry personally, usually the same day.",
    submitLabel: "Check availability",
    successMessage:
      "Thank you — Marius or Elna will come back to you personally, usually within the day.",
    serviceOptions: ["Bay Suite", "Ridge Room", "Garden Room", "Whole house", "Not sure yet"],
    askPreferredTime: true,
    image: { src: "/guesthouse/booking.jpg", alt: "The terrace at sunset" },
  },

  contact: {
    variant: "split-map",
    eyebrow: "Find us",
    heading: "9 Rotary Way, Eastcliff",
    intro: "Up Rotary Way from the Old Harbour, last house before the fynbos reserve.",
    formHeading: "Send us a message",
    submitLabel: "Send message",
    successMessage: "Thank you — we will reply personally within a day.",
    subjectOptions: ["Availability", "Whole-house booking", "Dietary requirements", "Something else"],
  },
};
