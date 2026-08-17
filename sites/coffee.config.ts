import type { SiteConfigInput } from "@/lib/schema";

/**
 * Bean & Bicycle — Parkhurst, Johannesburg. Coffee shop and roastery.
 * Variants: fullscreen-image + grid. Warm roast brown with a fynbos-teal accent,
 * Fraunces over Jost, pill buttons — soft where the smokehouse is hard, despite
 * both being food businesses on a warm palette.
 */
export const coffeeConfig: SiteConfigInput = {
  id: "coffee",

  business: {
    name: "Bean & Bicycle",
    tagline: "Roasted on 4th Avenue since 2015",
    phone: "011 447 2290",
    email: "hello@beanandbicycle.co.za",
    whatsapp: "27834472290",
    address: {
      street: "23 4th Avenue",
      suburb: "Parkhurst",
      city: "Johannesburg",
      province: "Gauteng",
      postalCode: "2193",
    },
    geo: { lat: -26.1381, lng: 28.0134 },
    googleMapsUrl: "https://maps.google.com/?q=4th+Avenue+Parkhurst",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=4th+Avenue+Parkhurst&output=embed",
    socialLinks: [
      { platform: "Instagram", href: "https://instagram.com/beanandbicycle", icon: "Instagram" },
    ],
    businessHours: [
      { day: "Monday – Friday", opens: "06:30", closes: "16:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
      { day: "Saturday – Sunday", opens: "07:00", closes: "14:00", schemaDays: ["Saturday", "Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#6B4A2F",
    secondaryColor: "#4A331F",
    accentColor: "#2F6B5C",
    neutral: {
      bg: "#F7F6F2",
      surface: "#FFFFFF",
      border: "#E2E0D7",
      text: "#22201B",
      textMuted: "#57534A",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "fraunces",
    fontBody: "jost",
    borderRadius: "md",
    buttonStyle: "pill",
    cardStyle: "flat",
    shadowStyle: "soft",
    spacingScale: "normal",
    animationStyle: "subtle",
  },

  features: {
    booking: false,
    gallery: true,
    testimonials: true,
    pricing: false,
    whatsapp: true,
    newsletter: true,
    map: true,
    faq: true,
    openNowBadge: true,
  },

  seo: {
    title: "Bean & Bicycle | Coffee roastery and café, Parkhurst",
    description:
      "Single-origin coffee roasted on site in Parkhurst, Johannesburg. Breakfast until eleven, beans by the bag, cyclists welcome.",
    keywords: ["coffee Parkhurst", "roastery Johannesburg", "breakfast 4th Avenue", "specialty coffee Joburg"],
    ogImage: "/coffee/og.svg",
    schemaType: "CafeOrCoffeeShop",
    locale: "en_ZA",
    url: "https://beanandbicycle.co.za",
  },

  layout: ["hero", "services", "about", "gallery", "testimonials", "faq", "contact", "cta"],

  navbar: {
    variant: "solid",
    links: [
      { label: "Menu", href: "#services" },
      { label: "Our roast", href: "#about" },
      { label: "Gallery", href: "#gallery" },
      { label: "Find us", href: "#contact" },
    ],
    cta: { label: "Find us", href: "#contact" },
  },

  footer: {
    variant: "columns",
    blurb:
      "A small roastery and café on 4th Avenue. We roast on a Tuesday, so Wednesday is the day to come in for beans.",
    columns: [
      {
        heading: "The café",
        links: [
          { label: "Menu", href: "#services" },
          { label: "Our roast", href: "#about" },
          { label: "Gallery", href: "#gallery" },
        ],
      },
      {
        heading: "Visit",
        links: [
          { label: "Find us", href: "#contact" },
          { label: "Questions", href: "#faq" },
        ],
      },
    ],
    newsletterHeading: "New beans, first",
    newsletterBody: "An email when a new single origin lands. About once a month.",
    legal: "© {year} {business}. Parkhurst, Johannesburg.",
  },

  hero: {
    variant: "fullscreen-image",
    eyebrow: "Parkhurst, Johannesburg",
    headline: "Coffee worth getting up for",
    subheadline:
      "We roast in the back on Tuesdays and serve it out front the rest of the week. Bikes go on the rack, dogs get water, and nobody is rushed off a table.",
    image: { src: "/coffee/hero.jpg", alt: "The espresso machine on the counter" },
    primaryCta: { label: "See the menu", href: "#services" },
    secondaryCta: { label: "Find us", href: "#contact" },
    highlights: ["Open from 06:30", "Roasted on site", "Bike rack out front"],
    overlayOpacity: 58,
  },

  services: {
    variant: "grid",
    eyebrow: "The menu",
    heading: "What we serve",
    intro: "Kitchen runs until two. Coffee runs until we close.",
    items: [
      {
        title: "Espresso and filter",
        description:
          "Two single origins on the bar at any time, plus our Rambler house blend. Filter is brewed to order on a V60, so give it four minutes.",
        icon: "Coffee",
        price: "R32 – R48",
        points: ["Oat, almond and soy at no extra charge"],
      },
      {
        title: "Breakfast",
        description:
          "Served until eleven on weekdays and midday at weekends. Eggs from a farm outside Magaliesburg, bread from the bakery two doors down.",
        icon: "EggFried",
        price: "R75 – R135",
        points: [],
      },
      {
        title: "Lunch",
        description:
          "Four sandwiches and two salads, written on the board each morning depending on what came in from the market.",
        icon: "Sandwich",
        price: "R95 – R150",
        points: [],
      },
      {
        title: "Beans to take home",
        description:
          "250g and 1kg bags, roasted the Tuesday of that week. We grind to your brew method at the counter, free.",
        icon: "Package",
        price: "From R145",
        points: ["Roast date on every bag"],
      },
      {
        title: "Wholesale",
        description:
          "We supply eleven restaurants and offices around Parkhurst and Greenside, including machine setup and barista training.",
        icon: "Truck",
        points: ["Enquire through the contact form"],
      },
      {
        title: "Brew classes",
        description:
          "Two hours on a Saturday afternoon, six people maximum, covering grind, ratio and technique. You take a bag home.",
        icon: "GraduationCap",
        price: "R450",
        points: ["Saturdays, booked through the form"],
      },
    ],
  },

  about: {
    variant: "stacked",
    eyebrow: "Our roast",
    heading: "One roaster, one morning a week",
    body: [
      "Nadia Sithole bought a 5kg Probat in 2015 and put it in the back of what was then a bicycle repair shop. The bikes went, the name stayed, and the roaster has not moved since.",
      "We buy green from two importers who can tell us the farm, and we roast light enough that you can taste where it came from. Everything on the shelf was roasted within the last seven days, and the date is on the bag.",
    ],
    image: { src: "/coffee/about.jpg", alt: "Beans, grounds and a finished flat white" },
    stats: [
      { value: "2015", label: "Roasting since" },
      { value: "7 days", label: "Maximum bag age" },
      { value: "11", label: "Wholesale accounts" },
      { value: "5kg", label: "Batch size" },
    ],
  },

  gallery: {
    variant: "grid",
    eyebrow: "The shop",
    heading: "4th Avenue, most mornings",
    images: [
      { src: "/coffee/gallery-1.jpg", alt: "A flat white coffee with latte art" },
      { src: "/coffee/gallery-2.jpg", alt: "Green beans going into the roaster" },
      { src: "/coffee/gallery-3.jpg", alt: "The pavement tables on a Saturday" },
      { src: "/coffee/gallery-4.jpg", alt: "Bags of beans on the retail shelf" },
      { src: "/coffee/gallery-5.jpg", alt: "Breakfast plated at the counter" },
      { src: "/coffee/gallery-6.jpg", alt: "A bicycle parked outside" },
    ],
  },

  testimonials: {
    variant: "grid",
    eyebrow: "Regulars",
    heading: "What people say",
    items: [
      {
        quote:
          "The only place in Joburg where I can ask what farm the coffee came from and get an actual answer.",
        name: "Warren Adams",
        role: "Greenside",
        rating: 5,
      },
      {
        quote:
          "I work from a corner table two days a week and nobody has ever made me feel I should order again or leave.",
        name: "Palesa Mokoena",
        role: "Parkhurst",
        rating: 5,
      },
      {
        quote:
          "Did the Saturday brew class as a gift for my husband. We have both been making better coffee at home since.",
        name: "Ruth Cohen",
        role: "Rosebank",
        rating: 5,
      },
    ],
  },

  faq: {
    variant: "two-column",
    eyebrow: "Questions",
    heading: "The usual ones",
    items: [
      {
        question: "Do you take bookings?",
        answer:
          "Not for tables — it is first come, first served. Brew classes and wholesale meetings are booked through the form on this page.",
      },
      {
        question: "Is there parking?",
        answer:
          "Street parking on 4th Avenue with a marshal on duty until four. It gets tight between eight and ten on a Saturday.",
      },
      {
        question: "Can I bring my dog?",
        answer: "Yes, on the pavement tables. There is a water bowl by the door.",
      },
      {
        question: "Do you have plugs and wifi?",
        answer:
          "Both. We ask people to move off the four-seater tables between twelve and two on weekdays so the lunch crowd can sit.",
      },
      {
        question: "When do you roast?",
        answer:
          "Tuesday mornings. Beans hit the shelf Tuesday afternoon, so Wednesday is the freshest day to buy.",
      },
      {
        question: "Do you ship beans?",
        answer:
          "Yes, anywhere in South Africa, courier for R95 or free over R600. Order through the contact form for now.",
      },
    ],
  },

  contact: {
    variant: "split-map",
    eyebrow: "Find us",
    heading: "23 4th Avenue, Parkhurst",
    intro: "Between the bookshop and the florist. Look for the bike rack.",
    formHeading: "Send us a message",
    submitLabel: "Send message",
    successMessage: "Thanks — we will reply within a day.",
    subjectOptions: ["General question", "Wholesale enquiry", "Brew class booking", "Bean order"],
  },

  cta: {
    variant: "banner",
    heading: "The roaster goes on at six on a Tuesday",
    body: "Come in on Wednesday for beans that were green the day before.",
    primaryCta: { label: "Find us", href: "#contact" },
    secondaryCta: { label: "011 447 2290", href: "tel:0114472290" },
  },
};
