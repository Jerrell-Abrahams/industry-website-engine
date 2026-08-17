import type { SiteConfigInput } from "@/lib/schema";

/**
 * Lotus & Stone — Umhlanga, Durban. Day spa.
 * Variants: split + alternating. Muted plum on warm off-white, Playfair over
 * Nunito, extra-large radius and spacious rhythm — the softest configuration
 * the engine allows, which is the whole point for this industry.
 */
export const spaConfig: SiteConfigInput = {
  id: "spa",

  business: {
    name: "Lotus & Stone",
    tagline: "An hour that actually belongs to you",
    phone: "031 561 4408",
    email: "bookings@lotusandstone.co.za",
    whatsapp: "27825614408",
    address: {
      street: "Shop 6, Chartwell Centre, 15 Chartwell Drive",
      suburb: "Umhlanga Rocks",
      city: "Durban",
      province: "KwaZulu-Natal",
      postalCode: "4319",
    },
    geo: { lat: -29.7266, lng: 31.0839 },
    googleMapsUrl: "https://maps.google.com/?q=Chartwell+Drive+Umhlanga",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Chartwell+Drive+Umhlanga&output=embed",
    socialLinks: [
      { platform: "Instagram", href: "https://instagram.com/lotusandstonespa", icon: "Instagram" },
      { platform: "Facebook", href: "https://facebook.com/lotusandstonespa", icon: "Facebook" },
    ],
    businessHours: [
      { day: "Tuesday – Friday", opens: "09:00", closes: "18:00", schemaDays: ["Tuesday", "Wednesday", "Thursday", "Friday"] },
      { day: "Saturday", opens: "08:00", closes: "16:00", schemaDays: ["Saturday"] },
      { day: "Sunday – Monday", closed: true, schemaDays: ["Sunday", "Monday"] },
    ],
  },

  branding: {
    primaryColor: "#7A5C6E",
    secondaryColor: "#5A4152",
    accentColor: "#8C6B48",
    neutral: {
      bg: "#FBF9F8",
      surface: "#F3EDEB",
      border: "#E3D8D4",
      text: "#2A2320",
      textMuted: "#615450",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "playfair",
    fontBody: "nunito",
    borderRadius: "xl",
    buttonStyle: "pill",
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
    openNowBadge: true,
  },

  seo: {
    title: "Lotus & Stone | Day spa in Umhlanga, Durban",
    description:
      "Massage, facials and body treatments in Umhlanga Rocks. Six therapists, two couples' rooms, open Tuesday to Saturday.",
    keywords: ["spa Umhlanga", "massage Durban", "facial Umhlanga Rocks", "day spa KwaZulu-Natal"],
    ogImage: "/spa/og.svg",
    schemaType: "DaySpa",
    locale: "en_ZA",
    url: "https://lotusandstone.co.za",
  },

  layout: ["hero", "services", "highlights", "pricing", "gallery", "testimonials", "faq", "booking", "contact"],

  navbar: {
    variant: "solid",
    links: [
      { label: "Treatments", href: "#services" },
      { label: "Prices", href: "#pricing" },
      { label: "The spa", href: "#gallery" },
      { label: "Visit", href: "#contact" },
    ],
    cta: { label: "Book a treatment", href: "#booking" },
    showPhone: true,
  },

  footer: {
    variant: "minimal",
    blurb: "A six-room spa in the Chartwell Centre. Tuesday to Saturday, by appointment.",
    columns: [
      {
        heading: "Navigate",
        links: [
          { label: "Treatments", href: "#services" },
          { label: "Prices", href: "#pricing" },
          { label: "Book", href: "#booking" },
          { label: "Questions", href: "#faq" },
          { label: "Visit", href: "#contact" },
        ],
      },
    ],
    legal: "© {year} {business}. Umhlanga Rocks, Durban.",
  },

  hero: {
    variant: "split",
    eyebrow: "Umhlanga Rocks",
    headline: "Put your phone in the drawer",
    subheadline:
      "Six treatment rooms above Chartwell Drive. No music you have to tolerate, no upselling at the end, and a therapist who asks about pressure before they start rather than after.",
    image: { src: "/spa/hero.jpg", alt: "Inside the spa at Lotus & Stone" },
    primaryCta: { label: "Book a treatment", href: "#booking" },
    secondaryCta: { label: "See treatments", href: "#services" },
    highlights: ["Six therapists", "Two couples' rooms", "Tuesday to Saturday"],
  },

  services: {
    variant: "alternating",
    eyebrow: "Treatments",
    heading: "What we do",
    intro: "Everything is booked by the hour, and the hour is yours from the moment you sit down.",
    items: [
      {
        title: "Massage",
        description:
          "Swedish, deep tissue, hot stone and pregnancy massage. Your therapist will ask about pressure, injuries and problem areas before starting, and check in once during the treatment rather than every five minutes.",
        icon: "Hand",
        image: { src: "/spa/service-1.jpg", alt: "A massage in progress" },
        price: "R560 – R980",
        points: ["60 or 90 minutes", "Pregnancy massage from 14 weeks", "Hot stone available in all rooms"],
      },
      {
        title: "Facials",
        description:
          "A consultation first, then a treatment chosen for your skin rather than off a menu. We use a South African-made professional range and will tell you honestly if a course is not going to help.",
        icon: "Sparkles",
        image: { src: "/spa/service-2.jpg", alt: "A facial treatment being prepared" },
        price: "R620 – R1 150",
        points: ["Skin consultation included", "Suitable for sensitive and reactive skin", "No product upselling"],
      },
      {
        title: "Body treatments",
        description:
          "Scrubs, wraps and a two-hour ritual that combines both with a massage. Popular before a wedding or after a long stretch of travelling.",
        icon: "Waves",
        image: { src: "/spa/service-3.jpg", alt: "Body treatment products laid out" },
        price: "R740 – R1 480",
        points: ["90 minutes to 2 hours", "Shower in every room"],
      },
      {
        title: "Couples and groups",
        description:
          "Two couples' rooms, and we close the whole spa for private groups of eight or more on a Sunday or Monday when we are otherwise shut.",
        icon: "Users",
        image: { src: "/spa/service-4.jpg", alt: "A back massage in one of the couples' rooms" },
        price: "From R1 320 per pair",
        points: ["Two couples' rooms", "Private hire Sundays and Mondays", "Catering can be arranged"],
      },
    ],
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "How we work",
    heading: "The things that make an hour restful",
    items: [
      {
        title: "Nobody sells to you",
        description:
          "Our therapists are not on product commission. If you ask what to use at home you will get an honest answer, including 'what you have is fine'.",
        icon: "HandCoins",
      },
      {
        title: "Your hour is a full hour",
        description:
          "The clock starts when the treatment starts, not when you arrive. Consultation and changing time are ours, not yours.",
        icon: "Clock",
      },
      {
        title: "Quiet actually means quiet",
        description:
          "Phones stay in the drawer at reception, staff included. The treatment rooms are soundproofed from the corridor.",
        icon: "VolumeX",
      },
    ],
  },

  pricing: {
    variant: "simple-list",
    eyebrow: "Prices",
    heading: "Treatment prices",
    intro: "All prices include VAT. Gift vouchers available for any amount.",
    note: "A 50% deposit holds bookings of two or more people. Cancel more than 24 hours ahead for a full refund.",
    plans: [
      { name: "Swedish massage — 60 min", price: "R560" },
      { name: "Swedish massage — 90 min", price: "R780" },
      { name: "Deep tissue — 60 min", price: "R640" },
      { name: "Hot stone — 90 min", price: "R980" },
      { name: "Pregnancy massage — 60 min", price: "R620", description: "From 14 weeks, with a side-lying setup." },
      { name: "Prescription facial — 60 min", price: "R620" },
      { name: "Advanced facial — 90 min", price: "R1 150" },
      { name: "Body scrub and wrap — 90 min", price: "R740" },
      { name: "The two-hour ritual", price: "R1 480", description: "Scrub, wrap and a full-body massage." },
      { name: "Couples' massage — 60 min", price: "R1 320", description: "Per pair, in a couples' room." },
    ],
  },

  gallery: {
    variant: "masonry",
    eyebrow: "The spa",
    heading: "Inside Chartwell Centre",
    images: [
      { src: "/spa/gallery-1.jpg", alt: "The reception and waiting area" },
      { src: "/spa/gallery-2.jpg", alt: "A single treatment room set up for a massage" },
      { src: "/spa/gallery-3.jpg", alt: "A massage table in a warm treatment room" },
      { src: "/spa/gallery-4.jpg", alt: "Towels and oils on the treatment trolley" },
      { src: "/spa/gallery-5.jpg", alt: "The relaxation area after treatment" },
      { src: "/spa/gallery-6.jpg", alt: "Skincare products on a shelf" },
    ],
  },

  testimonials: {
    variant: "carousel",
    eyebrow: "Guests",
    heading: "What people say afterwards",
    items: [
      {
        quote:
          "First spa I have been to where nobody tried to sell me a course of six at the end. I have been back four times because of that.",
        name: "Nadine Pillay",
        role: "Durban North",
        rating: 5,
      },
      {
        quote:
          "Booked a pregnancy massage at 34 weeks and was genuinely comfortable the whole hour. The side-lying setup made all the difference.",
        name: "Kate Wilson",
        role: "Umhlanga",
        rating: 5,
      },
      {
        quote:
          "We hired the whole place for my mother's birthday on a Monday. Eight of us, completely private, and they let us bring cake.",
        name: "Zanele Mkhize",
        role: "Ballito",
        rating: 5,
      },
      {
        quote: "Deep tissue that was genuinely deep. I asked for firm and got firm, which is rarer than it should be.",
        name: "Dieter Kruger",
        role: "Mount Edgecombe",
        rating: 5,
      },
    ],
  },

  faq: {
    variant: "single-column",
    eyebrow: "Questions",
    heading: "Before your appointment",
    items: [
      {
        question: "How early should I arrive?",
        answer:
          "Ten minutes. Your treatment time starts when the treatment starts, so arriving early gives you a settled start rather than a shorter session.",
      },
      {
        question: "What do I wear?",
        answer:
          "Undress to whatever you are comfortable with. You are covered by towels throughout and your therapist leaves the room while you get onto the bed.",
      },
      {
        question: "Can I book a massage while pregnant?",
        answer:
          "Yes, from fourteen weeks. We use a side-lying setup rather than a table with a cut-out, which is more comfortable and safer.",
      },
      {
        question: "Do you take medical aid?",
        answer:
          "No. Some plans reimburse therapeutic massage from a savings account — we can provide an invoice, but we cannot claim on your behalf.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Cancel more than 24 hours ahead and any deposit is refunded in full. Inside 24 hours we keep the deposit, because the slot rarely fills.",
      },
      {
        question: "Is there parking?",
        answer: "Free undercover parking in the Chartwell Centre basement. We are Shop 6 on the first floor, with lift access.",
      },
    ],
  },

  booking: {
    variant: "split",
    eyebrow: "Booking",
    heading: "Book your treatment",
    intro: "Tell us what you would like and when suits, and we will confirm by WhatsApp within the day.",
    submitLabel: "Request booking",
    successMessage: "Thank you — we will confirm your appointment by WhatsApp shortly.",
    serviceOptions: [
      "Swedish massage",
      "Deep tissue massage",
      "Hot stone massage",
      "Pregnancy massage",
      "Prescription facial",
      "Advanced facial",
      "Body scrub and wrap",
      "The two-hour ritual",
      "Couples' treatment",
      "Private group hire",
    ],
    askPreferredTime: true,
    image: { src: "/spa/booking.jpg", alt: "A treatment bed prepared with fresh towels" },
  },

  contact: {
    variant: "centered",
    eyebrow: "Visit",
    heading: "Chartwell Centre, Umhlanga Rocks",
    intro: "Shop 6, first floor. Lift from the basement parking.",
    submitLabel: "Send message",
    successMessage: "Thank you — we will be in touch within a day.",
    subjectOptions: ["General question", "Gift vouchers", "Private group hire", "Feedback"],
  },
};
