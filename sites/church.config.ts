import type { SiteConfigInput } from "@/lib/schema";

/**
 * Hope Community Church — Kenilworth, Cape Town.
 *
 * DESIGN BRIEF
 * Direction (pinned): light, welcoming, timeline for service times, team, newsletter.
 * Anti-default: this brief is the single most likely to land on the warm-cream
 * plus high-contrast-serif plus terracotta look, and the stock database answer for
 * "church" is community purple with a joining green — equally generic. Neither is
 * used. The ground is a cool near-white and the palette is sage green with honey,
 * which reads welcoming without reading like every charity landing page.
 * Type: Merriweather over Nunito. Nunito's rounded terminals do the warmth that
 * a cream background would otherwise have to carry, which frees the background
 * to stay clean and bright.
 * Pill buttons, large radius, lively motion — the only one of the five flagships
 * that is allowed to feel soft.
 * Signature: the horizontal service-times rail. `timeline: horizontal` turns
 * "when can I come" into a thing you scan in one movement, which is the single
 * question a first-time visitor actually has.
 *
 * Images expected in /public/church/ — hero 1920×1080, gallery 800×1000, team 600×600.
 * Dropping a /church/welcome.mp4 in and setting hero.videoUrl activates the video hero;
 * without it the hero falls back to the poster image, which is the safe default.
 */
export const churchConfig: SiteConfigInput = {
  id: "church",

  business: {
    name: "Hope Community Church",
    tagline: "A church for people who are not sure about church",
    phone: "021 671 3390",
    email: "hello@hopecommunity.co.za",
    whatsapp: "27726713390",
    address: {
      street: "47 Rosmead Avenue",
      suburb: "Kenilworth",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "7708",
    },
    geo: { lat: -33.9976, lng: 18.4694 },
    googleMapsUrl: "https://maps.google.com/?q=Rosmead+Avenue+Kenilworth+Cape+Town",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=Rosmead+Avenue+Kenilworth+Cape+Town&output=embed",
    socialLinks: [
      { platform: "Facebook", href: "https://facebook.com/hopecommunityct", icon: "Facebook" },
      { platform: "Instagram", href: "https://instagram.com/hopecommunityct", icon: "Instagram" },
      { platform: "YouTube", href: "https://youtube.com/@hopecommunityct", icon: "Youtube" },
    ],
    businessHours: [
      { day: "Sunday", opens: "08:00", closes: "12:30", schemaDays: ["Sunday"] },
      { day: "Tuesday – Thursday (office)", opens: "09:00", closes: "15:00", schemaDays: ["Tuesday", "Wednesday", "Thursday"] },
      { day: "Wednesday (evening groups)", opens: "18:30", closes: "20:30", schemaDays: ["Wednesday"] },
    ],
  },

  branding: {
    primaryColor: "#2F6F62",
    secondaryColor: "#24544A",
    accentColor: "#B8752A",
    neutral: {
      bg: "#FDFDFB",
      surface: "#EFF4F1",
      border: "#D5E0DA",
      text: "#1C2A26",
      textMuted: "#4C5D55",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "merriweather",
    fontBody: "nunito",
    borderRadius: "lg",
    buttonStyle: "pill",
    cardStyle: "flat",
    shadowStyle: "soft",
    spacingScale: "normal",
    animationStyle: "lively",
    headingTransform: "none",
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
  },

  seo: {
    title: "Hope Community Church | Kenilworth, Cape Town",
    description:
      "A community church in Kenilworth, Cape Town. Sunday services at 08:30 and 10:30, kids' programme both services, everyone welcome.",
    keywords: [
      "church Kenilworth",
      "church Cape Town southern suburbs",
      "Sunday service Kenilworth",
      "community church Cape Town",
    ],
    ogImage: "/church/og.svg",
    schemaType: "Church",
    locale: "en_ZA",
    url: "https://hopecommunity.co.za",
  },

  layout: [
    "hero",
    "timeline",
    "highlights",
    "about",
    "services",
    "team",
    "gallery",
    "testimonials",
    "faq",
    "contact",
    "cta",
  ],

  navbar: {
    variant: "solid",
    links: [
      { label: "Service times", href: "#timeline" },
      { label: "About us", href: "#about" },
      { label: "What's on", href: "#services" },
      { label: "Our team", href: "#team" },
    ],
    cta: { label: "Plan your visit", href: "#contact" },
    showPhone: false,
  },

  footer: {
    variant: "columns",
    blurb:
      "We meet at 47 Rosmead Avenue in Kenilworth, twice every Sunday morning. There is no dress code and nobody will ask you to stand up.",
    columns: [
      {
        heading: "Sundays",
        links: [
          { label: "Service times", href: "#timeline" },
          { label: "Plan your visit", href: "#contact" },
          { label: "Kids and youth", href: "#services" },
        ],
      },
      {
        heading: "Get involved",
        links: [
          { label: "What's on", href: "#services" },
          { label: "Our team", href: "#team" },
          { label: "Common questions", href: "#faq" },
        ],
      },
    ],
    newsletterHeading: "The week ahead",
    newsletterBody: "One email each Thursday with what is on that Sunday. Nothing else.",
    legal: "© {year} {business}. NPO 041-926. Kenilworth, Cape Town.",
  },

  hero: {
    variant: "video",
    eyebrow: "Kenilworth, Cape Town",
    headline: "Come as you are, actually",
    subheadline:
      "We are a church in the southern suburbs for people at every stage of working out what they believe — including those still deciding whether they believe anything at all.",
    image: { src: "/church/hero.jpg", alt: "The congregation gathered at a Sunday morning service" },
    primaryCta: { label: "Plan your visit", href: "#contact" },
    secondaryCta: { label: "Service times", href: "#timeline" },
    highlights: ["Sundays 08:30 and 10:30", "Kids' programme both services", "Parking on site"],
    overlayOpacity: 55,
    align: "left",
  },

  timeline: {
    variant: "horizontal",
    eyebrow: "Sundays",
    heading: "What a Sunday morning looks like",
    intro:
      "Two identical services. The earlier one is quieter, the later one busier and louder — both run about seventy-five minutes.",
    items: [
      {
        marker: "08:15",
        title: "Coffee from the courtyard",
        description: "Doors open, coffee is free, and someone on the welcome team will find you.",
        icon: "Coffee",
      },
      {
        marker: "08:30",
        title: "First service",
        description: "Music, a talk of about twenty-five minutes, and time to pray if you want it.",
        icon: "Music",
      },
      {
        marker: "10:00",
        title: "Between services",
        description: "The courtyard is busiest here. Stay for a second coffee and meet people properly.",
        icon: "Users",
      },
      {
        marker: "10:30",
        title: "Second service",
        description: "The same content as the first, with a fuller band and a larger crowd.",
        icon: "Music",
      },
      {
        marker: "11:45",
        title: "Kids collected",
        description: "Hope Kids finishes with the service. Collect from the hall with your matching tag.",
        icon: "Baby",
      },
      {
        marker: "12:30",
        title: "Doors close",
        description: "The team is around until half past if you would like to talk to someone.",
        icon: "DoorClosed",
      },
    ],
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "If it is your first time",
    heading: "The things people worry about",
    intro: "Nobody asks these out loud, so here they are answered anyway.",
    items: [
      {
        title: "You will not be singled out",
        description:
          "We never ask visitors to stand, introduce themselves or put a hand up. Come in, sit down, leave when you like.",
        icon: "EyeOff",
      },
      {
        title: "There is no dress code",
        description:
          "You will see suits and you will see shorts and slops. Both are entirely normal here.",
        icon: "Shirt",
      },
      {
        title: "Nothing is expected of you",
        description:
          "The offering bag is not passed around. Giving happens by EFT, from people who have chosen to, and visitors are not part of it.",
        icon: "HandCoins",
      },
      {
        title: "Your kids are catered for",
        description:
          "Hope Kids runs for ages three to eleven at both services, with police-cleared volunteers and a matching tag system.",
        icon: "Baby",
      },
    ],
  },

  about: {
    variant: "stacked",
    eyebrow: "About us",
    heading: "A church that started in a school hall",
    body: [
      "Hope Community began in 2004 with about forty people meeting in the hall at Kenilworth Primary. We moved into the building on Rosmead Avenue in 2011, and on a normal Sunday there are now around six hundred of us across the two services.",
      "We are a mixed congregation in every sense — languages, backgrounds, ages and incomes — and that is deliberate. The southern suburbs are not homogeneous and neither is this church.",
      "Everything we do is built on the idea that people should be able to ask hard questions out loud without being managed or hurried. If that is what you are looking for, you will fit here.",
    ],
    image: { src: "/church/about.jpg", alt: "The Rosmead Avenue building and courtyard" },
    stats: [
      { value: "2004", label: "Year we started" },
      { value: "600", label: "On a normal Sunday" },
      { value: "18", label: "Small groups midweek" },
      { value: "3", label: "Community partnerships" },
    ],
    cta: { label: "See what's on", href: "#services" },
  },

  services: {
    variant: "grid",
    eyebrow: "What's on",
    heading: "Beyond Sunday morning",
    intro:
      "Most of the life of this church happens during the week, in someone's lounge rather than in the building.",
    items: [
      {
        title: "Small groups",
        description:
          "Eighteen groups meeting across the southern suburbs on weeknights. Between eight and twelve people, food, and a genuine conversation. The main way people find community here.",
        icon: "Users",
        points: ["Wednesdays and Thursdays", "Across the southern suburbs"],
      },
      {
        title: "Hope Kids",
        description:
          "Ages three to eleven, running through both Sunday services. Police-cleared volunteers, a matching tag collection system, and a programme that is genuinely fun rather than merely supervised.",
        icon: "Baby",
        points: ["Both Sunday services", "Ages 3 to 11"],
      },
      {
        title: "Youth",
        description:
          "Grades eight to twelve, Friday evenings in the hall. Games, a short talk, and space to talk about the things that are actually going on at school.",
        icon: "Sparkles",
        points: ["Fridays 18:30", "Grades 8 to 12"],
      },
      {
        title: "The Thursday table",
        description:
          "A free cooked lunch every Thursday at midday, open to anyone in the neighbourhood. No service attached, no questions asked, about ninety people most weeks.",
        icon: "UtensilsCrossed",
        points: ["Thursdays 12:00", "Everyone welcome"],
      },
      {
        title: "Marriage and parenting courses",
        description:
          "Two eight-week courses run twice a year. Practical, occasionally uncomfortable, and open to people who have no connection to the church at all.",
        icon: "Heart",
        points: ["Twice yearly", "Open to everyone"],
      },
      {
        title: "Counselling and support",
        description:
          "Free, confidential sessions with trained lay counsellors, and referrals to registered professionals where a situation calls for it. Contact the office to arrange.",
        icon: "MessageCircleHeart",
        points: ["By appointment", "Confidential"],
      },
    ],
  },

  team: {
    variant: "grid",
    eyebrow: "Our team",
    heading: "The people you will meet",
    intro: "Say hello to any of them in the courtyard after a service.",
    members: [
      {
        name: "Daniel Okafor",
        role: "Lead pastor",
        bio: "Here since 2013. Preaches most Sundays and would rather answer a hard question than avoid it.",
        image: { src: "/church/team-1.jpg", alt: "Daniel Okafor, lead pastor" },
        socials: [],
      },
      {
        name: "Bianca Adonis",
        role: "Community pastor",
        bio: "Runs the Thursday table and the small groups. Knows more names in Kenilworth than anyone should.",
        image: { src: "/church/team-2.jpg", alt: "Bianca Adonis, community pastor" },
        socials: [],
      },
      {
        name: "Sam Reddy",
        role: "Youth and families",
        bio: "Oversees Hope Kids and Friday youth. Former Grade 7 teacher, which shows in the best way.",
        image: { src: "/church/team-3.jpg", alt: "Sam Reddy, youth and families lead" },
        socials: [],
      },
      {
        name: "Lindiwe Zulu",
        role: "Worship lead",
        bio: "Leads the band at both services and runs the Tuesday evening rehearsal that anyone can join.",
        image: { src: "/church/team-4.jpg", alt: "Lindiwe Zulu, worship lead" },
        socials: [],
      },
    ],
  },

  gallery: {
    variant: "filmstrip",
    eyebrow: "Our community",
    heading: "Around here lately",
    images: [
      { src: "/church/gallery-1.jpg", alt: "The courtyard between Sunday services" },
      { src: "/church/gallery-2.jpg", alt: "Volunteers serving at the Thursday table" },
      { src: "/church/gallery-3.jpg", alt: "Children playing indoors at a kids' club" },
      { src: "/church/gallery-4.jpg", alt: "A worship band playing on stage" },
      { src: "/church/gallery-5.jpg", alt: "A small group meeting in someone's lounge" },
      { src: "/church/gallery-6.jpg", alt: "Young people gathered for a church youth night" },
    ],
  },

  testimonials: {
    variant: "grid",
    eyebrow: "Our people",
    heading: "Why people stayed",
    items: [
      {
        quote:
          "I came in halfway through a service and sat at the back ready to leave. Nobody looked at me. That was exactly what I needed that morning, and I have been coming for four years.",
        name: "Charlene Fisher",
        role: "Member since 2021",
      },
      {
        quote:
          "We moved down from Joburg knowing nobody. Joined a small group in the second week and those people are now the reason we have not moved back.",
        name: "Themba and Zani Mokoena",
        role: "Members since 2022",
      },
      {
        quote:
          "I am not religious and I still come to the Thursday table most weeks. They have never once tried to convert me over lunch.",
        name: "Errol Jantjies",
        role: "Kenilworth neighbour",
      },
    ],
  },

  faq: {
    variant: "single-column",
    eyebrow: "Questions",
    heading: "Things first-time visitors ask",
    items: [
      {
        question: "What time should I arrive, and where do I park?",
        answer:
          "Ten minutes before the service is plenty. There is parking on site off Rosmead Avenue and marshalled street parking on the road for the busier 10:30 service.",
      },
      {
        question: "How long is the service?",
        answer:
          "About seventy-five minutes. Roughly twenty-five minutes of music, a twenty-five minute talk, and the rest is notices, prayer and coffee running over.",
      },
      {
        question: "What do I do with my children?",
        answer:
          "Sign them into Hope Kids at the desk in the foyer when you arrive. You get one half of a numbered tag and they get the other, and only the matching tag collects them.",
      },
      {
        question: "I am not a Christian. Am I welcome?",
        answer:
          "Yes, genuinely. A meaningful number of people here would say the same thing, some of them after several years. You will not be approached, followed up or put on a list.",
      },
      {
        question: "Do you collect money during the service?",
        answer:
          "No. There is no offering bag and no card machine at the door. Giving is by EFT from people who have decided to support the church, and visitors are not part of that.",
      },
      {
        question: "Is the building accessible?",
        answer:
          "There is step-free access from the Rosmead Avenue parking, an accessible toilet off the foyer, and a hearing loop in the main auditorium. Let us know beforehand and we will keep a space free.",
      },
    ],
  },

  contact: {
    variant: "centered",
    eyebrow: "Plan your visit",
    heading: "Tell us you're coming",
    intro:
      "You do not have to — you are welcome to simply arrive. But if you let us know, someone will be looking out for you and will save you a seat.",
    formHeading: "Say hello first",
    submitLabel: "Let us know",
    successMessage:
      "Wonderful — we will look out for you. Someone from the welcome team will be in touch before Sunday.",
    subjectOptions: [
      "Planning a first visit",
      "Kids and youth",
      "Joining a small group",
      "The Thursday table",
      "Counselling and support",
      "Something else",
    ],
  },

  cta: {
    variant: "banner",
    heading: "This Sunday, 08:30 or 10:30",
    body: "47 Rosmead Avenue, Kenilworth. Free parking, free coffee, and nobody will ask you to stand up.",
    primaryCta: { label: "Plan your visit", href: "#contact" },
    secondaryCta: { label: "See service times", href: "#timeline" },
  },
};
