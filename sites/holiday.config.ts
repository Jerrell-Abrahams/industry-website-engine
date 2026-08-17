import type { SiteConfigInput } from "@/lib/schema";

/**
 * Marula Bend Bush Cottages — Vaalwater, Waterberg, Limpopo.
 *
 * Self-catering, deliberately not a guest house: whole cottages rather than
 * rooms, no breakfast and no host at the door. That difference drives the copy —
 * what is in the kitchen, how the gate code works, how far the shops are.
 *
 * Variants: split-offset + grid, the only pairing in the registry using the
 * split-offset hero. Bushveld umber on warm sand, Source Serif over Montserrat,
 * square corners and medium borders — a heavier, more rooted feel than Aloe
 * Ridge's airy coastal serif.
 */
export const holidayConfig: SiteConfigInput = {
  id: "holiday",

  business: {
    name: "Marula Bend Bush Cottages",
    tagline: "Three cottages on a working game farm, self-catering, no fences",
    phone: "014 755 3162",
    email: "stay@marulabend.co.za",
    whatsapp: "27827553162",
    address: {
      street: "Portion 14, Melkrivier Road",
      suburb: "Melkrivier",
      city: "Vaalwater",
      province: "Limpopo",
      postalCode: "0530",
    },
    geo: { lat: -24.0361, lng: 28.0294 },
    googleMapsUrl: "https://maps.google.com/?q=Melkrivier+Vaalwater+Limpopo",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Melkrivier+Vaalwater+Limpopo&output=embed",
    socialLinks: [
      { platform: "Instagram", href: "https://instagram.com/marulabend", icon: "Instagram" },
      { platform: "Facebook", href: "https://facebook.com/marulabend", icon: "Facebook" },
    ],
    businessHours: [
      { day: "Arrival", opens: "14:00", closes: "17:30", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
      { day: "Departure", opens: "07:00", closes: "10:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#7A4E24",
    secondaryColor: "#4A2E15",
    accentColor: "#B5793A",
    neutral: {
      bg: "#FBF7F0",
      surface: "#F1E8D9",
      border: "#DFD0B8",
      text: "#241C12",
      textMuted: "#5C4B36",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "sourceSerif",
    fontBody: "montserrat",
    borderRadius: "sm",
    buttonStyle: "solid",
    buttonHover: "lift",
    cardStyle: "bordered",
    borderWeight: "medium",
    shadowStyle: "soft",
    spacingScale: "normal",
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
    title: "Marula Bend Bush Cottages | Self-catering, Waterberg Limpopo",
    description:
      "Three self-catering cottages on a 900-hectare game farm outside Vaalwater. Fully equipped kitchens, braai at every cottage, solar power, and no fences between you and the bush.",
    keywords: [
      "self catering Waterberg",
      "Vaalwater accommodation",
      "bush cottages Limpopo",
      "Waterberg game farm self catering",
    ],
    ogImage: "/holiday/og.svg",
    schemaType: "LodgingBusiness",
    locale: "en_ZA",
    url: "https://marulabend.co.za",
  },

  layout: ["hero", "about", "services", "highlights", "gallery", "pricing", "testimonials", "faq", "booking", "contact"],

  navbar: {
    variant: "solid",
    links: [
      { label: "The farm", href: "#about" },
      { label: "Cottages", href: "#services" },
      { label: "Rates", href: "#pricing" },
      { label: "Questions", href: "#faq" },
    ],
    cta: { label: "Check dates", href: "#booking" },
    showPhone: true,
  },

  footer: {
    variant: "cta-heavy",
    ctaHeading: "The dry months book out by March",
    cta: { label: "Check your dates", href: "#booking" },
    blurb:
      "Three self-catering cottages on the Melkrivier road outside Vaalwater. Bring your own food, we will leave the gate code on WhatsApp the morning you travel.",
    columns: [
      {
        heading: "Stay",
        links: [
          { label: "The cottages", href: "#services" },
          { label: "Rates", href: "#pricing" },
          { label: "What is provided", href: "#highlights" },
        ],
      },
      {
        heading: "Before you come",
        links: [
          { label: "The farm", href: "#about" },
          { label: "Questions", href: "#faq" },
          { label: "Finding us", href: "#contact" },
        ],
      },
    ],
    legal: "© {year} {business}. Melkrivier, Vaalwater.",
  },

  hero: {
    variant: "split-offset",
    eyebrow: "Waterberg, Limpopo",
    headline: "Your own cottage, and nobody else's noise",
    subheadline:
      "Three self-catering cottages spread far enough apart on 900 hectares that you will not see another guest unless you drive to them. Bring your food, we will handle the firewood.",
    image: { src: "/holiday/hero.jpg", alt: "Acacia trees silhouetted against a savanna sunset" },
    primaryCta: { label: "Check your dates", href: "#booking" },
    secondaryCta: { label: "See the cottages", href: "#services" },
    highlights: ["Sleeps 2 to 16", "Solar, no load-shedding", "Two-night minimum"],
    overlayOpacity: 40,
  },

  about: {
    variant: "side-by-side",
    eyebrow: "The farm",
    heading: "A working farm that takes three bookings at a time",
    body: [
      "Marula Bend is 900 hectares of mixed bushveld on the Melkrivier road, farmed by the Steenkamp family since 1978 and opened to guests in 2014. There is game on the property — kudu, impala, warthog, the occasional leopard on the camera traps — and there are no fences between it and the cottages.",
      "We are not a lodge. Nobody will turn down your bed or cook for you. What you get is a whole cottage to yourself, a kitchen that works, a braai that has been used properly, and enough distance from the next building that you can hear what the bush sounds like at three in the morning.",
    ],
    image: { src: "/holiday/about.jpg", alt: "Open bushveld and a dirt track on the game farm" },
  },

  services: {
    variant: "grid",
    eyebrow: "The cottages",
    heading: "Three cottages, taken whole",
    intro:
      "Each is booked as an entire unit, not per room. Rates below are for the cottage, not per person, and the kitchen is yours.",
    items: [
      {
        title: "Tamboti Cottage",
        description:
          "One bedroom on a rise above the dry riverbed, the furthest from the farmhouse and the quietest thing we have. The outdoor shower is the reason people rebook it.",
        icon: "Bed",
        image: { src: "/holiday/service-1.jpg", alt: "A one-bedroom bush cottage with a verandah" },
        price: "From R1 450 per night",
        points: ["Sleeps 2", "Outdoor shower", "Furthest from the farmhouse", "Best for couples"],
      },
      {
        title: "Marula Cottage",
        description:
          "Two bedrooms under an old marula, with a wide covered stoep facing west and a boma pit in the sand below it. The one most families end up in.",
        icon: "Home",
        image: { src: "/holiday/service-2.jpg", alt: "A bedroom with twin beds under a wooden beamed ceiling" },
        price: "From R2 300 per night",
        points: ["Sleeps 4", "Two bedrooms, one bathroom", "Covered stoep", "Boma and fire pit"],
      },
      {
        title: "Leadwood House",
        description:
          "Four bedrooms, two bathrooms and a kitchen built for a group that actually cooks. Long table on the stoep seats twelve, which is the point of it.",
        icon: "Trees",
        image: { src: "/holiday/service-3.jpg", alt: "A farmhouse with a wide covered porch" },
        price: "From R3 900 per night",
        points: ["Sleeps 8", "Four bedrooms", "Table for twelve", "Own plunge pool"],
      },
      {
        title: "The whole farm",
        description:
          "All three cottages together for family gatherings and milestone birthdays. Sixteen beds, the boma, and nobody else on the property for the length of your stay.",
        icon: "Tent",
        image: { src: "/holiday/service-4.jpg", alt: "Golden savanna grassland stretching to the horizon" },
        price: "From R7 200 per night",
        points: ["Sleeps 16", "Exclusive use", "Minimum three nights", "Popular for Easter and December"],
      },
    ],
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "What is provided",
    heading: "Self-catering, done properly",
    intro:
      "Self-catering usually means a kettle and two forks. Here is exactly what you will find, so you know what to pack.",
    items: [
      {
        title: "A kitchen that works",
        description:
          "Gas hob, oven, full-size fridge-freezer, sharp knives, a decent pot set and enough crockery for the beds in the cottage. Coffee plunger in every kitchen.",
        icon: "UtensilsCrossed",
      },
      {
        title: "Firewood and braai",
        description:
          "Every cottage has its own braai and a bag of leadwood on arrival. More is R80 a bag, left at the door on request.",
        icon: "Flame",
      },
      {
        title: "Solar and inverter",
        description:
          "Lights, plugs and the fridge run through solar and battery. Load-shedding does not reach us, and neither does a municipal outage.",
        icon: "BatteryCharging",
      },
      {
        title: "Water from the borehole",
        description:
          "Drinkable, tested twice a year, and heated by gas geyser. It runs slightly hard, so bring your own soap if your skin is fussy.",
        icon: "Droplets",
      },
      {
        title: "Patchy signal, no wifi",
        description:
          "MTN and Vodacom reach most of the property standing up. There is no wifi at the cottages and we are not planning to add it.",
        icon: "Signal",
      },
      {
        title: "Linen and towels",
        description:
          "Beds made up before you arrive, bath and swimming towels provided. Bring your own for the plunge pool if you are precious about them.",
        icon: "Sparkles",
      },
    ],
  },

  gallery: {
    variant: "justified",
    eyebrow: "The property",
    heading: "What it actually looks like",
    images: [
      { src: "/holiday/gallery-1.jpg", alt: "Wicker chairs on a shaded verandah in warm afternoon light" },
      { src: "/holiday/gallery-2.jpg", alt: "A bedroom with mosquito netting and bush views" },
      { src: "/holiday/gallery-3.jpg", alt: "The Milky Way over a dark landscape at night" },
      { src: "/holiday/gallery-4.jpg", alt: "Kudu standing in open bushveld on the farm" },
      { src: "/holiday/gallery-5.jpg", alt: "A small swimming pool surrounded by trees and stone paving" },
      { src: "/holiday/gallery-6.jpg", alt: "Dry golden grassland at sunrise with an animal moving through it" },
    ],
  },

  pricing: {
    variant: "cards",
    eyebrow: "Rates",
    heading: "Per cottage, per night",
    intro:
      "Not per person. The rate is for the whole cottage whether two of you come or the full eight. Low season is November to March, when it is green, hot and thunderstorms most afternoons.",
    note: "Two-night minimum year round, three nights over long weekends, Easter and December. Rates include VAT. A 50% deposit holds the dates.",
    plans: [
      {
        name: "Tamboti",
        price: "R1 450",
        unit: "per night, low season",
        features: [
          "Sleeps 2",
          "One bedroom",
          "Outdoor shower",
          "Own braai and firewood",
          "Solar power",
          "Linen and towels",
        ],
        cta: { label: "Check dates", href: "#booking" },
      },
      {
        name: "Marula",
        price: "R2 300",
        unit: "per night, low season",
        featured: true,
        features: [
          "Sleeps 4",
          "Two bedrooms",
          "Covered stoep",
          "Boma and fire pit",
          "Own braai and firewood",
          "Solar power",
          "Linen and towels",
        ],
        cta: { label: "Check dates", href: "#booking" },
      },
      {
        name: "Leadwood",
        price: "R3 900",
        unit: "per night, low season",
        features: [
          "Sleeps 8",
          "Four bedrooms, two bathrooms",
          "Own plunge pool",
          "Table for twelve",
          "Own braai and firewood",
          "Solar power",
          "Linen and towels",
        ],
        cta: { label: "Check dates", href: "#booking" },
      },
    ],
  },

  testimonials: {
    variant: "grid",
    eyebrow: "Guests",
    heading: "What people say when they get home",
    items: [
      {
        quote:
          "We booked Tamboti for two nights and stayed four. The outdoor shower at six in the morning with francolins going off in the bush is worth the drive on its own.",
        name: "Retief and Karin Botha",
        role: "Stayed July 2025",
        rating: 5,
      },
      {
        quote:
          "Eight of us in Leadwood, all cooking, nobody fighting over a stove. The kitchen is better equipped than mine at home and I am not exaggerating.",
        name: "Zanele Khumalo",
        role: "Stayed September 2025",
        rating: 5,
      },
      {
        quote:
          "Load-shedding was at stage six the week we went and we did not notice once. Solar, gas geyser, fridge never blinked.",
        name: "Dawie Fourie",
        role: "Stayed May 2025",
        rating: 5,
      },
      {
        quote:
          "Sedan made it fine in June. I would not try the last two kilometres after heavy rain, and they told us that upfront rather than after we got stuck.",
        name: "Michelle Adams",
        role: "Stayed June 2025",
        rating: 5,
      },
    ],
  },

  faq: {
    variant: "two-column",
    eyebrow: "Questions",
    heading: "Before you drive up",
    items: [
      {
        question: "Do we need a 4x4?",
        answer:
          "No, in the dry season. A normal car handles the Melkrivier road and the farm track fine from April to October. After heavy summer rain the last two kilometres can wash out, and we will phone you the day before if that is the case.",
      },
      {
        question: "Where do we buy food?",
        answer:
          "Vaalwater is the last town, about forty minutes back, and it has a Spar and a butchery worth stopping at. There is nothing closer, so arrive with what you need for the whole stay.",
      },
      {
        question: "Is it fenced? Is it safe for children?",
        answer:
          "The cottages are not fenced off from the bush. Plains game walks through regularly and predators are on the property but keep away from the buildings. Children are welcome; we ask that they are not out of sight of an adult after dark.",
      },
      {
        question: "How does check-in work?",
        answer:
          "There is nobody at a desk. We send the gate code and directions on WhatsApp the morning you travel, the cottage is open and the key is inside. Arrive before half past five, because the farm gate is locked at dusk.",
      },
      {
        question: "Can we bring dogs?",
        answer:
          "No. There is free-roaming game and a working farm around you, and it goes badly for everyone. There is a kennel in Vaalwater that several of our guests use.",
      },
      {
        question: "What is the cancellation policy?",
        answer:
          "Free cancellation up to twenty-one days before arrival. Inside twenty-one days we keep the fifty percent deposit; inside seven days the full amount is due. Dates can be moved once at no cost if you tell us early.",
      },
      {
        question: "Is there a shop, restaurant or bar?",
        answer:
          "None of the three. This is entirely self-catering. We sell firewood, ice and gas refills at the farmhouse and that is the whole list.",
      },
      {
        question: "When is the best time to come?",
        answer:
          "May to August for game viewing and cold clear nights, when the bush thins out and everything comes to the water. November to March is green and dramatic, with afternoon thunderstorms and far fewer people.",
      },
    ],
  },

  booking: {
    variant: "split",
    eyebrow: "Availability",
    heading: "Check your dates",
    intro:
      "Tell us which cottage and when. We run one diary between the three, so a same-day answer is normal unless we are out on the farm.",
    submitLabel: "Check availability",
    successMessage:
      "Thank you — we will confirm the cottage and dates, usually the same day. Deposit details come with the confirmation.",
    serviceOptions: [
      "Tamboti (sleeps 2)",
      "Marula (sleeps 4)",
      "Leadwood House (sleeps 8)",
      "The whole farm (sleeps 16)",
      "Not sure yet",
    ],
    askPreferredTime: true,
    image: { src: "/holiday/booking.jpg", alt: "Two wooden chairs on a timber deck looking out over trees" },
  },

  contact: {
    variant: "split-map",
    eyebrow: "Finding us",
    heading: "Melkrivier Road, outside Vaalwater",
    intro:
      "Forty minutes north of Vaalwater on the Melkrivier road, then eleven kilometres of farm track. The turnoff is unmarked on purpose — the directions we send you have the landmark.",
    formHeading: "Send us a message",
    successMessage: "Thank you — we will come back to you, usually the same day.",
    submitLabel: "Send message",
    subjectOptions: [
      "Availability",
      "Whole-farm booking",
      "Directions and road conditions",
      "Something else",
    ],
  },
};
