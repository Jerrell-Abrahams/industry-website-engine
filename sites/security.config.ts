import type { SiteConfigInput } from "@/lib/schema";

/**
 * Sentinel Response — Centurion, Gauteng. Armed response and guarding.
 * Variants: angled + grid. Dark, but steel-blue rather than the red-on-black
 * this industry defaults to — the accent is reserved for genuine urgency, which
 * is the only way a warning colour keeps meaning anything.
 */
export const securityConfig: SiteConfigInput = {
  id: "security",

  business: {
    name: "Sentinel Response",
    tagline: "On the ground in under seven minutes",
    phone: "012 663 7100",
    email: "control@sentinelresponse.co.za",
    whatsapp: "27826637100",
    address: {
      street: "8 Ridgeway Crescent, Highveld Techno Park",
      suburb: "Centurion",
      city: "Pretoria",
      province: "Gauteng",
      postalCode: "0157",
    },
    geo: { lat: -25.8721, lng: 28.1791 },
    googleMapsUrl: "https://maps.google.com/?q=Highveld+Techno+Park+Centurion",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Highveld+Techno+Park+Centurion&output=embed",
    socialLinks: [
      { platform: "Facebook", href: "https://facebook.com/sentinelresponse", icon: "Facebook" },
      { platform: "LinkedIn", href: "https://linkedin.com/company/sentinel-response", icon: "Linkedin" },
    ],
    businessHours: [
      { day: "Control room", opens: "00:00", closes: "23:59", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
      { day: "Office (Mon – Fri)", opens: "08:00", closes: "16:30", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
    ],
  },

  branding: {
    primaryColor: "#4A90C2",
    secondaryColor: "#2C6389",
    accentColor: "#E0A93F",
    neutral: {
      bg: "#14171C",
      surface: "#1E2229",
      border: "#333A44",
      text: "#EEF0F3",
      textMuted: "#A6ADB9",
      onPrimary: "#0B1017",
    },
    fontHeading: "archivo",
    fontBody: "jost",
    borderRadius: "none",
    buttonStyle: "solid",
    cardStyle: "bordered",
    shadowStyle: "none",
    spacingScale: "compact",
    animationStyle: "subtle",
    headingTransform: "uppercase",
  },

  features: {
    booking: false,
    gallery: false,
    testimonials: true,
    pricing: true,
    whatsapp: true,
    newsletter: false,
    map: true,
    faq: true,
  },

  seo: {
    title: "Sentinel Response | Armed response and guarding, Centurion",
    description:
      "24-hour armed response, alarm monitoring and guarding across Centurion and Highveld. PSIRA registered, average response under seven minutes.",
    keywords: ["armed response Centurion", "security company Pretoria", "alarm monitoring Highveld", "guarding services Gauteng"],
    ogImage: "/security/og.svg",
    schemaType: "SecurityService",
    locale: "en_ZA",
    url: "https://sentinelresponse.co.za",
  },

  layout: ["hero", "stats", "services", "highlights", "pricing", "testimonials", "faq", "contact", "cta"],

  navbar: {
    variant: "solid",
    links: [
      { label: "Services", href: "#services" },
      { label: "Packages", href: "#pricing" },
      { label: "Questions", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Request a survey", href: "#contact" },
    showPhone: true,
  },

  footer: {
    variant: "columns",
    blurb:
      "PSIRA-registered armed response and guarding operating across Centurion, Highveld, Irene and Eldoraigne since 2012. Control room staffed around the clock.",
    columns: [
      {
        heading: "Services",
        links: [
          { label: "Armed response", href: "#services" },
          { label: "Packages", href: "#pricing" },
          { label: "Questions", href: "#faq" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "Request a survey", href: "#contact" },
          { label: "Reviews", href: "#testimonials" },
        ],
      },
    ],
    legal: "© {year} {business}. PSIRA registration 2118443. Centurion, Gauteng.",
  },

  hero: {
    variant: "angled",
    eyebrow: "Centurion · Highveld · Irene · Eldoraigne",
    headline: "Seven minutes, verified",
    subheadline:
      "Our published response time is the median across every activation last quarter, not a marketing figure. We send it to clients monthly, including the months it goes up.",
    image: { src: "/security/hero.jpg", alt: "A Sentinel Response vehicle on patrol at night" },
    primaryCta: { label: "Request a site survey", href: "#contact" },
    secondaryCta: { label: "Control room: 012 663 7100", href: "tel:0126637100" },
    highlights: ["PSIRA registered", "24-hour control room", "Response times published monthly"],
  },

  stats: {
    variant: "bar",
    items: [
      { value: "6:48", label: "Median response, last quarter" },
      { value: "2012", label: "Operating since" },
      { value: "14", label: "Response vehicles" },
      { value: "24/7", label: "Control room staffing" },
    ],
  },

  services: {
    variant: "grid",
    eyebrow: "Services",
    heading: "What we cover",
    intro: "Residential and commercial across Centurion and the surrounding suburbs.",
    items: [
      {
        title: "Armed response",
        description:
          "Vehicles on patrol in your suburb around the clock, dispatched by our own control room. Every activation is logged with a timestamp you can request.",
        icon: "ShieldAlert",
        price: "From R485 per month",
        points: ["Median 6:48 response", "Own control room", "Timestamped activation logs"],
      },
      {
        title: "Alarm monitoring",
        description:
          "Radio and GSM monitoring with a monthly test signal. If your panel stops reporting we phone you rather than waiting for a break-in to find out.",
        icon: "RadioTower",
        price: "From R295 per month",
        points: ["Dual-path radio and GSM", "Monthly signal test"],
      },
      {
        title: "Guarding",
        description:
          "PSIRA-graded guards for residential estates, business parks and construction sites, supervised by a roving patrol officer rather than left unchecked.",
        icon: "UserCheck",
        price: "Quoted per site",
        points: ["Grade C and B guards", "Supervised shifts"],
      },
      {
        title: "CCTV and off-site monitoring",
        description:
          "Installation and off-site monitoring with analytics on perimeter cameras, so an operator is alerted to movement rather than reviewing footage afterwards.",
        icon: "Cctv",
        price: "From R750 per month",
        points: ["Perimeter analytics", "30-day cloud retention"],
      },
      {
        title: "Access control",
        description:
          "Boom and gate automation, biometric and tag readers, and visitor management for estates and complexes.",
        icon: "KeyRound",
        price: "Quoted per site",
        points: ["Estate and complex systems"],
      },
      {
        title: "Escort and panic",
        description:
          "Home escort on request when you are arriving late, and a mobile panic linked to the same control room as your alarm.",
        icon: "Siren",
        price: "Included in armed response",
        points: ["Home escort on request", "Mobile app panic"],
      },
    ],
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "How we operate",
    heading: "The things worth checking before you sign anywhere",
    intro: "Ask any security company these four questions. We have put our answers up front.",
    items: [
      {
        title: "Our own control room",
        description:
          "We do not outsource monitoring. The operator who takes your activation works for us, in Centurion, and is accountable to the same manager as the responder.",
        icon: "Headset",
      },
      {
        title: "Published response times",
        description:
          "Median response is measured every quarter and sent to every client, including the quarters where it worsens. Ask any competitor for theirs in writing.",
        icon: "Timer",
      },
      {
        title: "PSIRA registered, all staff",
        description:
          "Company registration 2118443, and every officer individually registered and graded. Certificates are available on request for any officer on your site.",
        icon: "BadgeCheck",
      },
      {
        title: "Month-to-month available",
        description:
          "We offer 24-month contracts at a discount, but month-to-month is genuinely available at the standard rate. You are not locked in to leave.",
        icon: "FileCheck",
      },
    ],
  },

  pricing: {
    variant: "table",
    eyebrow: "Packages",
    heading: "Residential packages",
    intro: "Monthly, including VAT. Commercial and estate sites are quoted after a site survey.",
    note: "24-month contracts are 15% less. Month-to-month is available at the rates shown with one month's notice.",
    plans: [
      {
        name: "Monitoring",
        price: "R295",
        unit: "per month",
        features: ["Dual-path alarm monitoring", "Monthly signal test", "Control room 24/7", "Mobile app panic"],
        cta: { label: "Request a survey", href: "#contact" },
      },
      {
        name: "Armed response",
        price: "R485",
        unit: "per month",
        featured: true,
        features: [
          "Dual-path alarm monitoring",
          "Monthly signal test",
          "Control room 24/7",
          "Mobile app panic",
          "Armed response to activations",
          "Home escort on request",
          "Quarterly response report",
        ],
        cta: { label: "Request a survey", href: "#contact" },
      },
      {
        name: "Response + CCTV",
        price: "R1 150",
        unit: "per month",
        features: [
          "Dual-path alarm monitoring",
          "Monthly signal test",
          "Control room 24/7",
          "Mobile app panic",
          "Armed response to activations",
          "Home escort on request",
          "Quarterly response report",
          "Off-site CCTV monitoring",
          "Perimeter analytics",
          "30-day cloud retention",
        ],
        cta: { label: "Request a survey", href: "#contact" },
      },
    ],
  },

  testimonials: {
    variant: "grid",
    eyebrow: "Clients",
    heading: "What clients say",
    items: [
      {
        quote:
          "Panic went off at two in the morning by mistake. A vehicle was at the gate in five minutes and the officer waited until my wife confirmed she was fine. That is the whole test.",
        name: "Willem Grobler",
        role: "Highveld",
        rating: 5,
      },
      {
        quote:
          "They send an actual response report every quarter with times in it. Our previous company would not put a number in writing.",
        name: "Ntombi Mahlangu",
        role: "Trustee, Irene complex",
        rating: 5,
      },
      {
        quote: "Guards on our construction site are supervised. You can tell, because they are awake.",
        name: "Andre Wessels",
        role: "Site manager, Centurion",
        rating: 5,
      },
      {
        quote:
          "Our panel stopped reporting and they phoned us the next morning. I did not know monitoring companies checked that.",
        name: "Shireen Patel",
        role: "Eldoraigne",
        rating: 5,
      },
      {
        quote: "Response is genuinely quick. The monthly fee is not the cheapest in Centurion and I have stopped caring.",
        name: "Kobus Nel",
        role: "Highveld Techno Park",
        rating: 4,
      },
      {
        quote: "Cancelled a second property when we sold it. One email, no retention call, no penalty.",
        name: "Lerato Sithole",
        role: "Centurion",
        rating: 5,
      },
    ],
  },

  faq: {
    variant: "single-column",
    eyebrow: "Questions",
    heading: "Before you switch",
    items: [
      {
        question: "How is your response time measured?",
        answer:
          "From the moment the control room receives the activation to the moment a vehicle reports on scene, logged automatically by vehicle tracking. We publish the median rather than the average, because averages hide bad nights.",
      },
      {
        question: "Do I have to sign a long contract?",
        answer:
          "No. A 24-month contract is 15% cheaper and most clients take it, but month-to-month is available at the standard rate with one month's notice.",
      },
      {
        question: "Can I use my existing alarm system?",
        answer:
          "Almost always. We take over most panels, and a site survey will tell you within ten minutes whether yours can be linked or needs replacing.",
      },
      {
        question: "What happens on a false alarm?",
        answer:
          "We respond exactly as we would to a real one. There is no false-alarm penalty for the first six in a year; beyond that we will come out and find the cause with you.",
      },
      {
        question: "Are your officers armed and registered?",
        answer:
          "Response officers are armed and firearm-competent under the Firearms Control Act, and every officer is individually PSIRA registered and graded. Certificates are available on request.",
      },
      {
        question: "Which areas do you cover?",
        answer:
          "Centurion, Highveld, Highveld Techno Park, Irene, Eldoraigne, Wierdapark and Doringkloof. We will say no rather than take a client we cannot reach in time.",
      },
    ],
  },

  contact: {
    variant: "split-map",
    eyebrow: "Get in touch",
    heading: "Request a site survey",
    intro:
      "A free survey takes about twenty minutes. You get a written recommendation and a fixed monthly price, whether or not you sign.",
    formHeading: "Request a survey",
    submitLabel: "Request survey",
    successMessage:
      "Thank you — a consultant will phone you within one working day. For emergencies, the control room is on 012 663 7100.",
    subjectOptions: [
      "Residential armed response",
      "Alarm monitoring only",
      "Guarding quote",
      "CCTV and monitoring",
      "Estate or complex enquiry",
    ],
  },

  cta: {
    variant: "banner",
    heading: "Control room: 012 663 7100",
    body: "Staffed every hour of every day, by people we employ ourselves.",
    primaryCta: { label: "Phone the control room", href: "tel:0126637100" },
    secondaryCta: { label: "Request a site survey", href: "#contact" },
  },
};
