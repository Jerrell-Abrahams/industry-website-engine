import type { SiteConfigInput } from "@/lib/schema";

/**
 * Meridian Property Group — Umhlanga, Durban. Estate agency.
 * Variants: video + alternating. Charcoal-navy with a brass accent, Jost over
 * Lora, zero radius and outline buttons — restrained rather than the gold-and-
 * gradient look this industry defaults to.
 */
export const estateConfig: SiteConfigInput = {
  id: "estate",

  business: {
    name: "Meridian Property Group",
    tagline: "The North Coast, properly represented",
    phone: "031 830 2140",
    email: "info@meridianproperty.co.za",
    whatsapp: "27828302140",
    address: {
      street: "Suite 2, The Pearls Office Park, 6 Lagoon Drive",
      suburb: "Umhlanga Rocks",
      city: "Durban",
      province: "KwaZulu-Natal",
      postalCode: "4319",
    },
    geo: { lat: -29.7284, lng: 31.0854 },
    googleMapsUrl: "https://maps.google.com/?q=Lagoon+Drive+Umhlanga",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Lagoon+Drive+Umhlanga&output=embed",
    socialLinks: [
      { platform: "LinkedIn", href: "https://linkedin.com/company/meridian-property", icon: "Linkedin" },
      { platform: "Instagram", href: "https://instagram.com/meridianpropertysa", icon: "Instagram" },
    ],
    businessHours: [
      { day: "Monday – Friday", opens: "08:30", closes: "17:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
      { day: "Saturday", opens: "09:00", closes: "13:00", schemaDays: ["Saturday"] },
      { day: "Sunday (show days)", opens: "14:00", closes: "17:00", schemaDays: ["Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#23303D",
    secondaryColor: "#38495B",
    accentColor: "#8A6C3C",
    neutral: {
      bg: "#FAFAF8",
      surface: "#FFFFFF",
      border: "#E0E0DA",
      text: "#1B1D22",
      textMuted: "#54585F",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "jost",
    fontBody: "lora",
    borderRadius: "none",
    buttonStyle: "outline",
    cardStyle: "bordered",
    shadowStyle: "soft",
    spacingScale: "spacious",
    animationStyle: "subtle",
    headingTransform: "uppercase",
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
    title: "Meridian Property Group | Estate agents, Umhlanga and the North Coast",
    description:
      "Residential sales and rentals in Umhlanga, Ballito, Sibaya and Zimbali. Eleven agents, area specialists, honest valuations.",
    keywords: ["estate agent Umhlanga", "property Ballito", "houses for sale North Coast", "rentals Umhlanga Rocks"],
    ogImage: "/estate/og.svg",
    schemaType: "RealEstateAgent",
    locale: "en_ZA",
    url: "https://meridianproperty.co.za",
  },

  layout: ["hero", "services", "highlights", "stats", "gallery", "team", "testimonials", "faq", "contact"],

  navbar: {
    variant: "centered-logo",
    links: [
      { label: "Services", href: "#services" },
      { label: "Recent", href: "#gallery" },
      { label: "Our agents", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Request a valuation", href: "#contact" },
    showPhone: false,
  },

  footer: {
    variant: "columns",
    blurb:
      "Eleven agents covering Umhlanga, Ballito, Sibaya and Zimbali. Registered with the Property Practitioners Regulatory Authority.",
    columns: [
      {
        heading: "Services",
        links: [
          { label: "Selling", href: "#services" },
          { label: "Rentals", href: "#services" },
          { label: "Our agents", href: "#team" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "Recent listings", href: "#gallery" },
          { label: "Questions", href: "#faq" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    newsletterHeading: "New listings first",
    newsletterBody: "A fortnightly email of what has just come to market in your area.",
    legal: "© {year} {business}. PPRA registered. Umhlanga Rocks, KwaZulu-Natal.",
  },

  hero: {
    variant: "video",
    eyebrow: "Umhlanga · Ballito · Sibaya · Zimbali",
    headline: "Priced right, sold once",
    subheadline:
      "We will give you the valuation the market supports rather than the one that wins the mandate. Overpriced listings sit, go stale and sell for less — every time.",
    image: { src: "/estate/hero.jpg", alt: "The Umhlanga coastline from the air" },
    primaryCta: { label: "Request a valuation", href: "#contact" },
    secondaryCta: { label: "How we work", href: "#services" },
    highlights: ["Eleven agents", "Four coastal areas", "PPRA registered"],
    overlayOpacity: 58,
  },

  services: {
    variant: "alternating",
    eyebrow: "What we do",
    heading: "Sales, rentals and everything between",
    items: [
      {
        title: "Residential sales",
        description:
          "Full-service marketing including professional photography, floor plans, a drone set for coastal properties, and portal listings across Property24 and Private Property. Sole mandates only — a property advertised by four agencies at four prices tells a buyer that nobody knows what it is worth.",
        icon: "Home",
        image: { src: "/estate/service-1.jpg", alt: "An agent at the window display of listings" },
        points: [
          "Professional photography and floor plans",
          "Sole mandate, 90 days",
          "Weekly written feedback",
          "Commission from 5% plus VAT",
        ],
      },
      {
        title: "Rentals and letting",
        description:
          "Tenant vetting through TPN, lease drafting, deposit handling in a trust account, and monthly management if you would rather not take the calls yourself.",
        icon: "KeyRound",
        image: { src: "/estate/service-2.jpg", alt: "Keys handed over at a rental property" },
        points: [
          "TPN credit and criminal vetting",
          "Deposits held in trust",
          "Full management at 8% of rental",
          "Quarterly inspections with photographs",
        ],
      },
      {
        title: "Valuations",
        description:
          "A written comparative market analysis based on what has actually transferred nearby in the last six months, not on asking prices. Free, no obligation, and yours to keep whether you list with us or not.",
        icon: "TrendingUp",
        image: { src: "/estate/service-3.jpg", alt: "A comparative market analysis document" },
        points: [
          "Based on registered transfers",
          "Written and yours to keep",
          "No obligation to list",
          "Within three working days",
        ],
      },
      {
        title: "Developments and off-plan",
        description:
          "We take on two to three coastal developments a year, from Sibaya apartments to Zimbali freehold, and handle the sales process from launch through to transfer.",
        icon: "Building2",
        image: { src: "/estate/service-4.jpg", alt: "An apartment development under construction" },
        points: ["Sibaya, Ballito and Zimbali", "Launch through to transfer", "Investor and end-user buyers"],
      },
    ],
  },

  highlights: {
    variant: "numbered",
    eyebrow: "Selling with us",
    heading: "What the first six weeks look like",
    items: [
      {
        title: "Valuation and strategy",
        description: "A written CMA and an honest asking price, plus what we think it will actually transfer at.",
        icon: "ClipboardList",
      },
      {
        title: "Prepare and photograph",
        description: "We tell you the three things worth fixing and the ten that are not, then shoot it properly.",
        icon: "Camera",
      },
      {
        title: "To market",
        description: "Listed across the portals, mailed to our buyer list, and shown on the first weekend.",
        icon: "Megaphone",
      },
      {
        title: "Weekly feedback in writing",
        description: "Viewings, what buyers said, and what the market is telling us about the price. Every Monday.",
        icon: "Mail",
      },
    ],
  },

  stats: {
    variant: "bar",
    items: [
      { value: "2011", label: "Established" },
      { value: "11", label: "Agents across four areas" },
      { value: "R2.1bn", label: "Transferred since opening" },
      { value: "38", label: "Average days to offer" },
    ],
  },

  gallery: {
    variant: "grid",
    eyebrow: "Recently sold",
    heading: "A sample of the last quarter",
    intro: "Properties transferred in Umhlanga, Ballito, Sibaya and Zimbali.",
    images: [
      { src: "/estate/gallery-1.jpg", alt: "A luxury home exterior, sold in Umhlanga Rocks" },
      { src: "/estate/gallery-2.jpg", alt: "An apartment sold in Sibaya" },
      { src: "/estate/gallery-3.jpg", alt: "A SOLD board after a Zimbali sale" },
      { src: "/estate/gallery-4.jpg", alt: "A townhouse sold in Ballito" },
      { src: "/estate/gallery-5.jpg", alt: "A modern home sold on the Umhlanga ridge" },
      { src: "/estate/gallery-6.jpg", alt: "Modern homes on the Umhlanga ridge" },
      { src: "/estate/gallery-7.jpg", alt: "A modern apartment block, sold in Ballito" },
      { src: "/estate/gallery-8.jpg", alt: "The Sibaya coastline from above, where we sell" },
    ],
  },

  team: {
    variant: "grid",
    eyebrow: "Our agents",
    heading: "Area specialists",
    intro: "Each of our agents works one area. None of them will pretend to know another one.",
    members: [
      {
        name: "Priya Reddy",
        role: "Principal · Umhlanga Rocks",
        bio: "PPRA registered since 2008. Founded Meridian in 2011 and still lists personally on the ridge.",
        image: { src: "/estate/team-1.jpg", alt: "Priya Reddy, principal" },
        socials: [{ platform: "LinkedIn", href: "https://linkedin.com/company/meridian-property", icon: "Linkedin" }],
      },
      {
        name: "Craig Sutherland",
        role: "Sales · Ballito and Salt Rock",
        bio: "Fourteen years on the North Coast. Handles most of our freehold family-home listings.",
        image: { src: "/estate/team-2.jpg", alt: "Craig Sutherland, sales agent" },
        socials: [],
      },
      {
        name: "Nokuthula Zwane",
        role: "Sales · Sibaya and Umhlanga Ridge",
        bio: "Specialises in new developments and off-plan, from launch through to transfer.",
        image: { src: "/estate/team-3.jpg", alt: "Nokuthula Zwane, sales agent" },
        socials: [],
      },
      {
        name: "Anton Meintjies",
        role: "Rentals manager",
        bio: "Runs the letting book, tenant vetting and the managed-property portfolio.",
        image: { src: "/estate/team-4.jpg", alt: "Anton Meintjies, rentals manager" },
        socials: [],
      },
    ],
  },

  testimonials: {
    variant: "carousel",
    eyebrow: "Clients",
    heading: "What sellers and landlords say",
    items: [
      {
        quote:
          "Two agencies valued our house at 4.9 and 5.2 million. Priya said 4.4 and explained exactly why. It went to offer in six weeks at 4.45. The others would have had us sitting there until December.",
        name: "Grant and Yolanda Fourie",
        role: "Sold in Umhlanga Ridge",
        rating: 5,
      },
      {
        quote:
          "Written feedback every single Monday for the whole mandate, including the weeks when there was nothing good to report.",
        name: "Sharon Naidoo",
        role: "Sold in Ballito",
        rating: 5,
      },
      {
        quote:
          "Anton has managed two of my units for five years. I have never once had to chase a payment or an inspection report.",
        name: "Deon Bezuidenhout",
        role: "Landlord, Sibaya",
        rating: 5,
      },
      {
        quote: "They talked me out of a cosmetic renovation that would not have added what it cost. That is the whole review.",
        name: "Marion Chetty",
        role: "Sold in Umhlanga Rocks",
        rating: 5,
      },
    ],
  },

  faq: {
    variant: "two-column",
    eyebrow: "Questions",
    heading: "What sellers ask",
    items: [
      {
        question: "What commission do you charge?",
        answer:
          "From 5% plus VAT on a sole mandate, negotiable on higher-value properties. It is agreed in writing before the mandate is signed and there are no marketing fees on top.",
      },
      {
        question: "Why do you only take sole mandates?",
        answer:
          "A property listed by four agencies at four different prices tells buyers nobody knows what it is worth, and it makes it impossible to hold a price. Our mandates run 90 days.",
      },
      {
        question: "Is the valuation really free?",
        answer:
          "Yes, written, within three working days, and yours to keep whether you list with us or not. It is based on registered transfers rather than what neighbours are asking.",
      },
      {
        question: "Should I renovate before selling?",
        answer:
          "Usually not. Paint, garden and decluttering return more than they cost; kitchens and bathrooms almost never do. We will tell you honestly which is which for your property.",
      },
      {
        question: "How long is a property on the market?",
        answer:
          "Our average is 38 days to an accepted offer, then eight to twelve weeks to transfer. Correctly priced properties sit at the low end of that; ambitious ones do not.",
      },
      {
        question: "Do you handle rentals as well?",
        answer:
          "Yes. Tenant vetting and lease only, or full management at 8% of the monthly rental including inspections and maintenance coordination.",
      },
    ],
  },

  contact: {
    variant: "split-map",
    eyebrow: "Get in touch",
    heading: "Request a valuation",
    intro:
      "Tell us where the property is and we will send a written comparative market analysis within three working days. No obligation.",
    formHeading: "Request a valuation",
    submitLabel: "Request valuation",
    successMessage:
      "Thank you — the agent for your area will be in touch within one working day.",
    subjectOptions: ["Selling — request a valuation", "Letting my property", "Looking to buy", "Looking to rent", "Development enquiry"],
  },
};
