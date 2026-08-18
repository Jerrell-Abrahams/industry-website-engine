import type { SiteConfigInput } from "@/lib/schema";

/**
 * Nelson & Partners Attorneys — Durban.
 *
 * DESIGN BRIEF
 * Direction (pinned): navy and ivory, conservative typography, practice areas,
 * consultation form, no gallery.
 * Anti-default: the templated answer for a serious professional site is the
 * broadsheet — hairline rules, zero radius, dense newspaper columns. This is
 * deliberately the opposite: generous spacing, a small radius rather than none,
 * and an ivory that is warm without being the near-universal #F4F1EA cream.
 * Type: DM Serif Display over Source Serif 4. Serif on serif is the conservative
 * choice a firm this age would actually have made, and it sidesteps the
 * serif-headline-over-Inter pairing that every professional template uses.
 * Signature: the numbered consultation process. Numbered markers are only honest
 * when the content is genuinely a sequence — here it is one, and it is the thing
 * an anxious first-time client most needs to see.
 *
 * This config is also the engine's proof that feature flags do real work:
 * gallery, testimonials, pricing, booking, WhatsApp and newsletter are all off.
 *
 * Images expected in /public/attorney/ — about 1200×900, team 600×600.
 */
export const attorneyConfig: SiteConfigInput = {
  id: "attorney",

  business: {
    name: "Nelson & Partners Attorneys",
    tagline: "Considered counsel since 1987",
    phone: "031 566 4180",
    email: "enquiries@nelsonpartners.co.za",
    address: {
      street: "3rd Floor, Aurora House, 15 Chris Hani Road",
      suburb: "Umgeni Park",
      city: "Durban",
      province: "KwaZulu-Natal",
      postalCode: "4051",
    },
    geo: { lat: -29.7907, lng: 31.0292 },
    googleMapsUrl: "https://maps.google.com/?q=Chris+Hani+Road+Durban",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Chris+Hani+Road+Durban&output=embed",
    socialLinks: [
      { platform: "LinkedIn", href: "https://linkedin.com/company/nelson-partners", icon: "Linkedin" },
    ],
    businessHours: [
      { day: "Monday – Thursday", opens: "08:00", closes: "17:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday"] },
      { day: "Friday", opens: "08:00", closes: "15:30", schemaDays: ["Friday"] },
      { day: "Saturday – Sunday", closed: true, schemaDays: ["Saturday", "Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#1B2A4A",
    secondaryColor: "#2E4270",
    accentColor: "#8C6A3F",
    neutral: {
      bg: "#FBFAF6",
      surface: "#FFFFFF",
      border: "#DEDACE",
      text: "#1A2233",
      textMuted: "#565F70",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "dmSerif",
    fontBody: "sourceSerif",
    borderRadius: "sm",
    buttonStyle: "outline",
    cardStyle: "bordered",
    shadowStyle: "soft",
    spacingScale: "spacious",
    animationStyle: "subtle",
    headingTransform: "none",
  },

  features: {
    booking: false,
    gallery: false,
    testimonials: false,
    pricing: false,
    whatsapp: false,
    newsletter: false,
    map: true,
    faq: true,
  },

  seo: {
    title: "Nelson & Partners Attorneys | Durban law firm since 1987",
    description:
      "A Durban firm practising in commercial, labour, family and estate law. Book a first consultation with a partner.",
    keywords: [
      "attorneys Durban",
      "commercial law KwaZulu-Natal",
      "labour lawyer Durban",
      "deceased estates Durban",
    ],
    ogImage: "/attorney/og.svg",
    schemaType: "LegalService",
    locale: "en_ZA",
    url: "https://nelsonpartners.co.za",
  },

  layout: ["hero", "about", "services", "highlights", "stats", "team", "faq", "contact", "cta"],

  navbar: {
    variant: "centered-logo",
    links: [
      { label: "The firm", href: "#about" },
      { label: "Practice areas", href: "#services" },
      { label: "Our people", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Request a consultation", href: "#contact" },
    showPhone: false,
  },

  footer: {
    variant: "minimal",
    blurb:
      "Nelson & Partners Incorporated. Registered with the Legal Practice Council of South Africa.",
    columns: [
      {
        heading: "Navigate",
        links: [
          { label: "The firm", href: "#about" },
          { label: "Practice areas", href: "#services" },
          { label: "Our people", href: "#team" },
          { label: "Common questions", href: "#faq" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    legal:
      "© {year} {business}. All rights reserved. Nothing on this website constitutes legal advice.",
  },

  hero: {
    variant: "minimal-centered",
    eyebrow: "Durban · Established 1987",
    headline: "Counsel that holds up under pressure",
    subheadline:
      "Four partners and eleven attorneys practising in commercial, labour, family and estate law. We take on matters we can genuinely see through.",
    primaryCta: { label: "Request a consultation", href: "#contact" },
    secondaryCta: { label: "Our practice areas", href: "#services" },
    highlights: ["Established 1987", "Four partners", "Durban and Pietermaritzburg"],
    align: "center",
  },

  about: {
    variant: "side-by-side",
    eyebrow: "The firm",
    heading: "Thirty-eight years on the same principle",
    body: [
      "Gerald Nelson opened a two-room practice on Smith Street in 1987 doing conveyancing and small commercial work. The firm has grown to fifteen attorneys across Durban and Pietermaritzburg, and the principle he set has not changed: we tell a client what their matter is realistically worth pursuing before they spend anything on it.",
      "That means we turn work away. It also means that when we do take a matter on, the client hears the difficult assessment from us first rather than from the other side's counsel eighteen months later.",
      "Our attorneys appear in the High Court, the Labour Court and the CCMA, and we brief advocates in Durban and Johannesburg where a matter calls for it.",
    ],
    image: {
      src: "/attorney/about.jpg",
      alt: "The boardroom at Nelson & Partners' Durban offices",
    },
    cta: { label: "Meet our people", href: "#team" },
  },

  services: {
    variant: "alternating",
    eyebrow: "Practice areas",
    heading: "Where we practise",
    intro:
      "Four areas, each led by a partner. We do not hold ourselves out as generalists in anything outside them.",
    items: [
      {
        title: "Commercial and corporate",
        description:
          "Contract drafting and negotiation, shareholder agreements, business sales and acquisitions, and commercial litigation for owner-managed businesses and mid-sized companies.",
        icon: "Briefcase",
        image: { src: "/attorney/service-1.jpg", alt: "Commercial contracts being reviewed" },
        points: [
          "Sale of business and due diligence",
          "Shareholder and partnership agreements",
          "Supply, distribution and service contracts",
          "Commercial litigation and arbitration",
        ],
      },
      {
        title: "Labour and employment",
        description:
          "Advice to employers and senior employees on dismissals, restraints of trade, retrenchment processes and workplace investigations, including representation at the CCMA and Labour Court.",
        icon: "Users",
        image: { src: "/attorney/service-2.jpg", alt: "A statue of the scales of justice" },
        points: [
          "Disciplinary and incapacity processes",
          "Section 189 retrenchment consultations",
          "CCMA and Labour Court representation",
          "Restraint of trade enforcement and defence",
        ],
      },
      {
        title: "Family law",
        description:
          "Divorce, care and contact arrangements, maintenance and antenuptial contracts. Handled by attorneys who will tell you plainly when mediation will serve your family better than litigation.",
        icon: "Home",
        image: { src: "/attorney/service-3.jpg", alt: "A family law consultation room" },
        points: [
          "Divorce, contested and uncontested",
          "Care, contact and relocation applications",
          "Maintenance claims and variations",
          "Antenuptial contracts",
        ],
      },
      {
        title: "Deceased estates and wills",
        description:
          "Drafting wills, administering deceased estates through the Master of the High Court, and resolving disputes between heirs and executors.",
        icon: "ScrollText",
        image: { src: "/attorney/service-4.jpg", alt: "Estate documents on a desk" },
        points: [
          "Will drafting and safe custody",
          "Estate administration and liquidation accounts",
          "Executor appointments and removals",
          "Contested estates and heir disputes",
        ],
      },
    ],
  },

  highlights: {
    variant: "numbered",
    eyebrow: "What to expect",
    heading: "How a first consultation works",
    intro:
      "Most people who phone us have never instructed an attorney before. This is the whole process, start to finish.",
    items: [
      {
        title: "You send us the outline",
        description:
          "Use the form on this page or telephone reception. We need a few sentences on what has happened and any dates that are already fixed.",
        icon: "FileText",
      },
      {
        title: "We check for conflict",
        description:
          "Before we discuss anything substantive we confirm the firm does not already act for the other side. This usually takes one working day.",
        icon: "ShieldCheck",
      },
      {
        title: "You meet a partner",
        description:
          "The first consultation is 45 minutes with the partner who leads that practice area, in our Durban office or by video call. It is charged at a fixed R950.",
        icon: "Handshake",
      },
      {
        title: "You get a written assessment",
        description:
          "Within three working days you receive our view of your prospects, the likely cost, and whether we think the matter is worth pursuing. No obligation to proceed.",
        icon: "ClipboardCheck",
      },
    ],
  },

  stats: {
    variant: "cards",
    heading: "The firm in numbers",
    items: [
      { value: "1987", label: "Year established", icon: "Landmark" },
      { value: "15", label: "Attorneys across two offices", icon: "Users" },
      { value: "4", label: "Practice areas, each partner-led", icon: "Scale" },
      { value: "3 days", label: "To a written assessment", icon: "Clock" },
    ],
  },

  team: {
    variant: "rows",
    eyebrow: "Our people",
    heading: "The partners",
    intro: "Each practice area is led by a partner who takes the first consultation personally.",
    members: [
      {
        name: "Ayanda Nelson",
        role: "Managing Partner · Commercial and corporate",
        bio: "Admitted 1998. Joined the firm her father founded in 2004 and took over as managing partner in 2016. Advises owner-managed businesses on sales, shareholder disputes and commercial litigation. Admitted as a conveyancer and notary.",
        image: { src: "/attorney/team-1.jpg", alt: "Ayanda Nelson, Managing Partner" },
        socials: [{ platform: "LinkedIn", href: "https://linkedin.com/company/nelson-partners", icon: "Linkedin" }],
      },
      {
        name: "Pieter Grobler",
        role: "Partner · Labour and employment",
        bio: "Admitted 1994, with twenty years appearing at the CCMA and in the Labour Court. Acts mainly for employers on retrenchment processes and senior dismissals, and lectures on labour procedure at UKZN.",
        image: { src: "/attorney/team-2.jpg", alt: "Pieter Grobler, Partner" },
        socials: [],
      },
      {
        name: "Farhana Ismail",
        role: "Partner · Family law",
        bio: "Admitted 2006 and an accredited family mediator since 2013. Takes a mediation-first approach to care and contact matters, and appears in contested divorces in the High Court where settlement is not possible.",
        image: { src: "/attorney/team-3.jpg", alt: "Farhana Ismail, Partner" },
        socials: [],
      },
      {
        name: "Kobus van Wyk",
        role: "Partner · Deceased estates and wills",
        bio: "Admitted 1991. Has administered estates through the Master's office in Durban and Pietermaritzburg for three decades, and is regularly appointed to resolve estates where the executor has been removed.",
        image: { src: "/attorney/team-4.jpg", alt: "Kobus van Wyk, Partner" },
        socials: [],
      },
    ],
  },

  faq: {
    variant: "two-column",
    eyebrow: "Common questions",
    heading: "What people ask before they instruct us",
    items: [
      {
        question: "What does a first consultation cost?",
        answer:
          "R950 for 45 minutes with a partner, payable in advance. If we take the matter on, that amount is credited against your first invoice.",
      },
      {
        question: "Do you work on contingency?",
        answer:
          "Only in specific personal injury and Road Accident Fund matters, and only where the Contingency Fees Act permits it. We will tell you at the first consultation whether your matter qualifies.",
      },
      {
        question: "How are your fees calculated?",
        answer:
          "Most matters are billed at an hourly rate agreed in writing before we begin. Some work — will drafting, antenuptial contracts, uncontested divorces — is quoted as a fixed fee.",
      },
      {
        question: "Will I deal with a partner or a junior?",
        answer:
          "A partner takes your first consultation and remains responsible for the matter. Routine work is delegated to an associate to keep your costs down, and you are told who is doing what.",
      },
      {
        question: "Do you take matters outside KwaZulu-Natal?",
        answer:
          "Yes. We appear in the High Court in Durban and Pietermaritzburg, and instruct correspondent attorneys elsewhere in South Africa where a matter requires it.",
      },
      {
        question: "How quickly can you see me?",
        answer:
          "Ordinarily within five working days. Where there is a court deadline or an urgent application, phone reception directly and say so.",
      },
    ],
  },

  contact: {
    variant: "full-form",
    eyebrow: "Contact",
    heading: "Request a consultation",
    intro:
      "Tell us briefly what the matter concerns. We check for conflict before responding, which takes about one working day.",
    formHeading: "Your enquiry",
    submitLabel: "Send enquiry",
    successMessage:
      "Thank you. Your enquiry has reached us. We will confirm within one working day, once a conflict check is complete.",
    subjectOptions: [
      "Commercial and corporate",
      "Labour and employment",
      "Family law",
      "Deceased estates and wills",
      "Something else",
    ],
  },

  cta: {
    variant: "split",
    heading: "Speak to a partner first",
    body:
      "Every first consultation at this firm is taken by the partner who leads that practice area. You will not be handed to a junior to find out whether you have a case.",
    primaryCta: { label: "Request a consultation", href: "#contact" },
    secondaryCta: { label: "031 566 4180", href: "tel:0315664180" },
    image: { src: "/attorney/cta.jpg", alt: "The reception area at Nelson & Partners" },
  },
};
