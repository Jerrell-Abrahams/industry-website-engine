import type { SiteConfigInput } from "@/lib/schema";

/**
 * The Smoke House — Woodstock, Cape Town.
 *
 * DESIGN BRIEF
 * Direction (pinned): dark, warm, serif headings, fullscreen hero, menu-style services.
 * Anti-default: the generic AI answer for "dark restaurant" is near-black plus one
 * bright vermilion accent. This grounds on smoked oxblood-brown (#241714 — visibly
 * brown, not neutral black) and runs a three-tone warm range instead of a single
 * accent: ash (surface), ember (primary), tallow (accent).
 * Type: Fraunces — a soft, slightly wonky display serif, deliberately not the
 * high-contrast Didone that every "premium restaurant" template reaches for —
 * over Archivo, a plain working grotesque.
 * Signature: the menu itself. `services: list` sets dish against price with a
 * dotted leader rule, so the section that would be a card grid on any other site
 * reads as a printed menu. Nothing else on the page competes with it.
 *
 * Images expected in /public/restaurant/ — hero 1920×1080, about 1200×900,
 * gallery 800×1000, booking 1000×1250.
 */
export const restaurantConfig: SiteConfigInput = {
  id: "restaurant",

  business: {
    name: "The Smoke House",
    tagline: "Low and slow since 2011",
    phone: "021 447 8820",
    email: "eat@thesmokehouse.co.za",
    whatsapp: "27824471182",
    address: {
      street: "84 Albert Road",
      suburb: "Woodstock",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "7925",
    },
    geo: { lat: -33.9270, lng: 18.4485 },
    googleMapsUrl: "https://maps.google.com/?q=84+Albert+Road+Woodstock+Cape+Town",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=84+Albert+Road+Woodstock+Cape+Town&output=embed",
    socialLinks: [
      { platform: "Instagram", href: "https://instagram.com/thesmokehousect", icon: "Instagram" },
      { platform: "Facebook", href: "https://facebook.com/thesmokehousect", icon: "Facebook" },
    ],
    businessHours: [
      { day: "Tuesday – Thursday", opens: "17:00", closes: "22:00", schemaDays: ["Tuesday", "Wednesday", "Thursday"] },
      { day: "Friday – Saturday", opens: "12:00", closes: "23:00", schemaDays: ["Friday", "Saturday"] },
      { day: "Sunday", opens: "12:00", closes: "16:00", schemaDays: ["Sunday"] },
      { day: "Monday", closed: true, schemaDays: ["Monday"] },
    ],
  },

  branding: {
    primaryColor: "#E67F52",
    secondaryColor: "#8C3524",
    accentColor: "#DCA94B",
    neutral: {
      bg: "#241714",
      surface: "#2C1B17",
      border: "#4E332C",
      text: "#F7ECE4",
      textMuted: "#C6AB9E",
      onPrimary: "#2A1410",
    },
    fontHeading: "fraunces",
    fontBody: "archivo",
    borderRadius: "sm",
    buttonStyle: "solid",
    cardStyle: "bordered",
    shadowStyle: "none",
    spacingScale: "spacious",
    animationStyle: "subtle",
    headingTransform: "none",
  },

  features: {
    booking: true,
    gallery: true,
    testimonials: true,
    blog: false,
    pricing: false,
    whatsapp: true,
    newsletter: false,
    map: true,
    faq: true,
  },

  seo: {
    title: "The Smoke House | Wood-fired barbecue in Woodstock, Cape Town",
    description:
      "Brisket, ribs and boerewors smoked over Cape rooikrans for up to sixteen hours. Book a table in Woodstock, Cape Town.",
    keywords: [
      "barbecue Cape Town",
      "brisket Woodstock",
      "smokehouse restaurant Cape Town",
      "ribs Albert Road",
    ],
    ogImage: "/restaurant/og.svg",
    schemaType: "Restaurant",
    locale: "en_ZA",
    url: "https://thesmokehouse.co.za",
  },

  layout: ["hero", "about", "services", "gallery", "testimonials", "faq", "booking", "contact", "cta"],

  navbar: {
    variant: "transparent-overlay",
    links: [
      { label: "Our story", href: "#about" },
      { label: "Menu", href: "#services" },
      { label: "Gallery", href: "#gallery" },
      { label: "Find us", href: "#contact" },
    ],
    cta: { label: "Book a table", href: "#booking" },
    showPhone: true,
  },

  footer: {
    variant: "columns",
    blurb:
      "A working smokehouse on Albert Road. Two pits, one fire that has not gone out since 2011, and a menu that changes when the butcher says so.",
    columns: [
      {
        heading: "The restaurant",
        links: [
          { label: "Our story", href: "#about" },
          { label: "The menu", href: "#services" },
          { label: "Gallery", href: "#gallery" },
        ],
      },
      {
        heading: "Visit",
        links: [
          { label: "Book a table", href: "#booking" },
          { label: "Find us", href: "#contact" },
          { label: "Questions", href: "#faq" },
        ],
      },
    ],
    legal: "© {year} {business}. Woodstock, Cape Town.",
  },

  hero: {
    variant: "fullscreen-image",
    eyebrow: "Woodstock, Cape Town",
    headline: "Sixteen hours over rooikrans coals",
    subheadline:
      "We light the pit at four in the morning so the brisket is ready by supper. No shortcuts, no gas, no apologies for selling out early.",
    image: {
      src: "/restaurant/hero.jpg",
      alt: "Brisket resting on the pass at The Smoke House",
    },
    primaryCta: { label: "Book a table", href: "#booking" },
    secondaryCta: { label: "See the menu", href: "#services" },
    highlights: ["Open Tuesday to Sunday", "Walk-ins welcome at the bar", "Est. 2011"],
    overlayOpacity: 62,
    align: "left",
  },

  about: {
    variant: "stats-overlay",
    eyebrow: "Our story",
    heading: "One fire, kept alive since 2011",
    body: [
      "Sipho Mtshali and Anna Kruger started with a single offset smoker in a Salt River backyard and a standing order at the butcher on Victoria Road. The queue outside got long enough that the neighbours complained, so in 2014 they took the lease on the old panel-beating shop at 84 Albert Road and never left.",
      "Everything still goes on the pit whole and comes off when it is ready, not when service starts. That is why the brisket runs out on a good Saturday, and why we would rather tell you that honestly than hold a tray back.",
    ],
    image: {
      src: "/restaurant/about.jpg",
      alt: "Sipho tending the offset smoker in the yard behind the restaurant",
    },
    stats: [
      { value: "16hr", label: "Longest smoke" },
      { value: "2", label: "Pits running daily" },
      { value: "2011", label: "Year we lit the fire" },
      { value: "4am", label: "When the pit goes on" },
    ],
    cta: { label: "See what's on today", href: "#services" },
  },

  services: {
    variant: "list",
    eyebrow: "The menu",
    heading: "What comes off the pit",
    intro:
      "Sold by weight, carved to order, served on butcher paper. When a cut is finished for the day it comes off the board.",
    items: [
      {
        title: "Beef brisket",
        description:
          "Free-range Karoo beef, salt-and-pepper rub, sixteen hours over rooikrans. Ask for the fatty end.",
        price: "R285 / 300g",
        points: ["Sells out most Saturdays"],
      },
      {
        title: "Pork belly ribs",
        description:
          "Full rack, apple-wood finish, glazed with our own molasses and Worcester sauce in the last hour.",
        price: "R310 full rack",
        points: [],
      },
      {
        title: "Smoked boerewors",
        description:
          "Coarse-ground, coriander-heavy, made for us by Meat on Main and cold-smoked before it hits the grill.",
        price: "R145",
        points: [],
      },
      {
        title: "Burnt ends",
        description:
          "The point end of the brisket, cubed, sauced and put back on the pit for another three hours.",
        price: "R190",
        points: ["Friday and Saturday only"],
      },
      {
        title: "Pit-smoked cauliflower",
        description:
          "A whole head, brined overnight, smoked and finished with tahini and burnt lemon. Not an afterthought.",
        price: "R165",
        points: ["Vegetarian"],
      },
      {
        title: "Sides",
        description:
          "Braaibroodjie, pit beans, slaw with green apple, or hand-cut chips fried in beef dripping.",
        price: "R55 each",
        points: [],
      },
    ],
  },

  gallery: {
    variant: "masonry",
    eyebrow: "The pit",
    heading: "Woodstock, most evenings",
    images: [
      { src: "/restaurant/gallery-1.jpg", alt: "Brisket being sliced against the grain on the pass" },
      { src: "/restaurant/gallery-2.jpg", alt: "The offset smoker with its firebox door open" },
      { src: "/restaurant/gallery-3.jpg", alt: "A full rack of ribs coming off the grate" },
      { src: "/restaurant/gallery-4.jpg", alt: "The dining room on a busy Friday evening" },
      { src: "/restaurant/gallery-5.jpg", alt: "Rooikrans logs stacked against the yard wall" },
      { src: "/restaurant/gallery-6.jpg", alt: "Burnt ends being tossed in sauce" },
    ],
  },

  testimonials: {
    variant: "single-featured",
    eyebrow: "Word of mouth",
    heading: "What people tell us",
    items: [
      {
        quote:
          "I grew up on Texas barbecue and I had written off ever finding it here. The bark on that brisket is the real thing. I have driven from Somerset West three Saturdays running.",
        name: "Dean Fortuin",
        role: "Somerset West",
        rating: 5,
      },
      {
        quote:
          "Booked the long table for my father's seventieth. They let us bring our own cake and the staff sang louder than we did.",
        name: "Nomsa Dlamini",
        role: "Observatory",
        rating: 5,
      },
      {
        quote:
          "Went in as the vegetarian who tags along. Came out talking about the cauliflower for a week.",
        name: "Riaan Botha",
        role: "Sea Point",
        rating: 5,
      },
      {
        quote:
          "Get there before seven on a Saturday or make peace with ribs instead. Both are excellent, but the brisket is the reason to come.",
        name: "Kirsten Adams",
        role: "Woodstock",
        rating: 4,
      },
    ],
  },

  faq: {
    variant: "single-column",
    eyebrow: "Before you come",
    heading: "The things people phone to ask",
    items: [
      {
        question: "Do you take bookings, or is it walk-in only?",
        answer:
          "Both. Tables can be booked up to three weeks ahead through the form on this page, and we keep the twelve bar seats unreserved for walk-ins every service.",
      },
      {
        question: "What happens if the brisket runs out before we arrive?",
        answer:
          "We post on Instagram the moment a cut is finished for the day, usually around half past seven on a Saturday. Ribs, wors and the cauliflower run until close.",
      },
      {
        question: "Is there anything for vegetarians?",
        answer:
          "The pit-smoked cauliflower is cooked on its own grate, and every side except the pit beans is vegetarian. We are not able to guarantee a vegan kitchen.",
      },
      {
        question: "Can you cater a function off-site?",
        answer:
          "Yes, for forty people or more, anywhere inside the Cape Town metro. Send us the date through the contact form and we will send a quote within two working days.",
      },
      {
        question: "Is there parking on Albert Road?",
        answer:
          "There is open street parking outside and a secure lot two doors down at number 88, free for our guests after six in the evening.",
      },
    ],
  },

  booking: {
    variant: "centered",
    eyebrow: "Reservations",
    heading: "Book a table",
    intro:
      "Tables of up to eight can be booked here. For anything larger, or for the long table in the yard, send us a note and we will phone you back.",
    submitLabel: "Request a table",
    successMessage:
      "Thanks — your request is with us. We confirm every booking by phone, usually within the hour during service.",
    serviceOptions: [
      "Table for two",
      "Table for three or four",
      "Table for five to eight",
      "The long table (nine or more)",
      "Off-site catering",
    ],
    askPreferredTime: true,
    image: { src: "/restaurant/booking.jpg", alt: "A laid table in the dining room before service" },
  },

  contact: {
    variant: "split-map",
    eyebrow: "Find us",
    heading: "84 Albert Road, Woodstock",
    intro:
      "Between the tyre-fitment place and the framing shop. Look for the smoke and the queue.",
    formHeading: "Send us a message",
    submitLabel: "Send message",
    successMessage: "Thanks — we read every message and reply within a day.",
    subjectOptions: ["General question", "Off-site catering", "Large group", "Feedback"],
  },

  cta: {
    variant: "banner",
    heading: "The pit goes on at four in the morning",
    body: "Come hungry, come early, and take the fatty end when it is offered.",
    primaryCta: { label: "Book a table", href: "#booking" },
    secondaryCta: { label: "021 447 8820", href: "tel:0214478820" },
  },
};
