import type { SiteConfigInput } from "@/lib/schema";

/**
 * Terra Build — Gqeberha, Eastern Cape. Residential construction.
 * Variants: video + tabs. Slate-green on paper grey with Oswald over Archivo and
 * hard shadows — industrial like the mechanic, but light-grounded and set in a
 * condensed display face, so the two do not read as siblings.
 */
export const constructionConfig: SiteConfigInput = {
  id: "construction",

  business: {
    name: "Terra Build",
    tagline: "Built to the drawing, finished on the date",
    phone: "041 373 2280",
    email: "projects@terrabuild.co.za",
    whatsapp: "27833732280",
    address: {
      street: "14 Newton Street",
      suburb: "Newton Park",
      city: "Gqeberha",
      province: "Eastern Cape",
      postalCode: "6045",
    },
    geo: { lat: -33.9581, lng: 25.5701 },
    googleMapsUrl: "https://maps.google.com/?q=Newton+Street+Newton+Park+Gqeberha",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Newton+Street+Newton+Park+Gqeberha&output=embed",
    socialLinks: [
      { platform: "Facebook", href: "https://facebook.com/terrabuildsa", icon: "Facebook" },
      { platform: "Instagram", href: "https://instagram.com/terrabuildsa", icon: "Instagram" },
    ],
    businessHours: [
      { day: "Monday – Friday", opens: "07:00", closes: "17:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
      { day: "Saturday", opens: "08:00", closes: "12:00", schemaDays: ["Saturday"] },
      { day: "Sunday", closed: true, schemaDays: ["Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#33422F",
    secondaryColor: "#24301F",
    accentColor: "#A8630F",
    neutral: {
      bg: "#F5F5F3",
      surface: "#FFFFFF",
      border: "#DCDCD6",
      text: "#1A1A17",
      textMuted: "#50504A",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "oswald",
    fontBody: "archivo",
    borderRadius: "none",
    buttonStyle: "solid",
    cardStyle: "elevated",
    shadowStyle: "hard",
    spacingScale: "compact",
    animationStyle: "subtle",
    headingTransform: "uppercase",
  },

  features: {
    booking: false,
    gallery: true,
    testimonials: true,
    pricing: false,
    whatsapp: true,
    newsletter: false,
    map: true,
    faq: true,
    openNowBadge: true,
  },

  seo: {
    title: "Terra Build | Residential builders in Gqeberha, Eastern Cape",
    description:
      "New homes, extensions and renovations in Gqeberha. NHBRC registered, fixed-price contracts, weekly progress reports with photographs.",
    keywords: ["builders Gqeberha", "home extension Port Elizabeth", "NHBRC builder Eastern Cape", "renovation Newton Park"],
    ogImage: "/construction/og.svg",
    schemaType: "GeneralContractor",
    locale: "en_ZA",
    url: "https://terrabuild.co.za",
  },

  layout: ["hero", "stats", "services", "highlights", "gallery", "timeline", "testimonials", "faq", "contact", "cta"],

  navbar: {
    variant: "solid",
    links: [
      { label: "What we build", href: "#services" },
      { label: "Projects", href: "#gallery" },
      { label: "How it works", href: "#timeline" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Request a quote", href: "#contact" },
    showPhone: true,
  },

  footer: {
    variant: "columns",
    blurb:
      "NHBRC-registered residential builders working across Gqeberha and the surrounding Eastern Cape since 2004. Fixed-price contracts, weekly reports.",
    columns: [
      {
        heading: "Build",
        links: [
          { label: "What we build", href: "#services" },
          { label: "Projects", href: "#gallery" },
          { label: "How it works", href: "#timeline" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "Questions", href: "#faq" },
          { label: "Request a quote", href: "#contact" },
        ],
      },
    ],
    legal: "© {year} {business}. NHBRC registration 3872041. Gqeberha, Eastern Cape.",
  },

  hero: {
    variant: "video",
    eyebrow: "Gqeberha, Eastern Cape",
    headline: "The price on the contract is the price on the invoice",
    subheadline:
      "Fixed-price building contracts with a written programme and weekly photographic progress reports. Variations are quoted and signed before the work happens, never billed afterwards.",
    image: { src: "/construction/hero.jpg", alt: "A Terra Build residential project under construction" },
    primaryCta: { label: "Request a quote", href: "#contact" },
    secondaryCta: { label: "See projects", href: "#gallery" },
    highlights: ["NHBRC registered", "Fixed-price contracts", "Weekly progress reports"],
    overlayOpacity: 60,
  },

  stats: {
    variant: "bar",
    items: [
      { value: "2004", label: "Building since" },
      { value: "180+", label: "Homes completed" },
      { value: "94%", label: "Finished on or before date" },
      { value: "5yr", label: "NHBRC structural warranty" },
    ],
  },

  services: {
    variant: "tabs",
    eyebrow: "What we build",
    heading: "Choose your project",
    intro: "Residential only. We do not take on commercial work, and we do not subcontract the build to someone else.",
    items: [
      {
        title: "New homes",
        description:
          "From your architect's drawings or ours, on your plot, from foundation to occupation certificate. We handle council submission, NHBRC enrolment and every trade on site.",
        icon: "Home",
        image: { src: "/construction/service-1.jpg", alt: "A new home nearing completion" },
        price: "From R14 500 per m²",
        points: [
          "Council submission and approvals",
          "NHBRC enrolment and inspections",
          "All trades managed in-house",
          "Occupation certificate on handover",
        ],
      },
      {
        title: "Extensions",
        description:
          "Additional bedrooms, a second storey, or opening up the back of the house. The hardest part is living in the property while we build, so we plan the sequence around that first.",
        icon: "Blocks",
        image: { src: "/construction/service-2.jpg", alt: "A double-storey extension under construction" },
        price: "From R12 800 per m²",
        points: [
          "Plans drawn and submitted",
          "Sequenced so you can stay in the house",
          "Dust screening and daily clean-down",
          "Structural engineer's sign-off",
        ],
      },
      {
        title: "Renovations",
        description:
          "Kitchens, bathrooms and full interior refits. We open up and inspect before quoting the finish, so the wiring and plumbing you cannot see get priced honestly.",
        icon: "Hammer",
        image: { src: "/construction/service-3.jpg", alt: "A kitchen renovation in progress" },
        price: "Quoted per project",
        points: [
          "Strip-out and inspection before final quote",
          "Electrical and plumbing CoCs included",
          "Fixed programme with a completion date",
        ],
      },
      {
        title: "Cottages and flatlets",
        description:
          "Granny flats, garden cottages and garage conversions — usually the best return per rand of any residential work in Gqeberha at the moment.",
        icon: "Warehouse",
        image: { src: "/construction/service-4.jpg", alt: "A completed garden cottage" },
        price: "From R11 500 per m²",
        points: ["Second-dwelling approvals handled", "Separate metering where required", "8 to 14 weeks typical"],
      },
      {
        title: "Structural repairs",
        description:
          "Cracking, subsidence, damp and roof failure. Investigated with a structural engineer before anything is quoted, because guessing at a foundation problem is expensive.",
        icon: "Wrench",
        image: { src: "/construction/service-5.jpg", alt: "Structural repair work to a foundation" },
        price: "Investigation from R6 500",
        points: ["Engineer's report", "Insurance-ready documentation", "Underpinning and crack stitching"],
      },
    ],
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "How we contract",
    heading: "Why our quotes look higher",
    intro:
      "They usually are, at quote stage. They are also usually the final number, which is the part that matters.",
    items: [
      {
        title: "Fixed price, not an estimate",
        description:
          "We measure and price the whole job before contracting. A cheaper 'estimate' that grows by thirty percent is not cheaper — it is a deposit on an argument.",
        icon: "FileCheck",
      },
      {
        title: "Variations signed first",
        description:
          "Any change to scope is priced, put in writing and signed by you before the work happens. Nothing appears on a final invoice that you have not already approved.",
        icon: "PenLine",
      },
      {
        title: "Weekly photographic reports",
        description:
          "Every Friday you get photographs, what was done, what is next, and whether we are on programme. Including the weeks we have slipped.",
        icon: "Camera",
      },
      {
        title: "Retention you actually hold",
        description:
          "Five percent held for three months after practical completion, released when the snag list is closed. We build the snag period into the programme.",
        icon: "ShieldCheck",
      },
    ],
  },

  gallery: {
    variant: "masonry",
    eyebrow: "Projects",
    heading: "Recently completed",
    intro: "A selection from the last two years across Gqeberha and the surrounding areas.",
    images: [
      { src: "/construction/gallery-1.jpg", alt: "A large family house, newly completed" },
      { src: "/construction/gallery-2.jpg", alt: "A double-storey extension in Mill Park" },
      { src: "/construction/gallery-3.jpg", alt: "A kitchen renovation in Newton Park" },
      { src: "/construction/gallery-4.jpg", alt: "A garden cottage in Walmer" },
      { src: "/construction/gallery-5.jpg", alt: "An open-plan living room after renovation" },
      { src: "/construction/gallery-6.jpg", alt: "A newly built house exterior" },
    ],
  },

  timeline: {
    variant: "vertical",
    eyebrow: "How it works",
    heading: "From first call to handover",
    intro: "A typical new home runs seven to eleven months. This is where the time actually goes.",
    items: [
      {
        marker: "Week 1",
        title: "Site visit and brief",
        description: "We walk the plot or the house, talk through what you want, and give you a realistic budget band before you spend anything on plans.",
        icon: "MapPin",
      },
      {
        marker: "Weeks 2–6",
        title: "Drawings and approvals",
        description: "Plans drawn or reviewed, structural engineer engaged, and the council submission lodged. This is the step that most often runs over, and it is largely out of our hands.",
        icon: "FileText",
      },
      {
        marker: "Week 7",
        title: "Fixed-price contract",
        description: "A measured, fixed-price quote against the approved drawings, with a written programme and payment schedule. You sign before we order anything.",
        icon: "PenLine",
      },
      {
        marker: "Weeks 8–30",
        title: "Construction",
        description: "Foundation through to finishes, with NHBRC inspections at each stage and a photographic progress report every Friday.",
        icon: "HardHat",
      },
      {
        marker: "Final 3 weeks",
        title: "Snagging and handover",
        description: "You walk the property and write the snag list. We close it, then hand over with the occupation certificate and all CoCs.",
        icon: "ClipboardCheck",
      },
      {
        marker: "+3 months",
        title: "Retention released",
        description: "Five percent retention released once the snag list has stayed closed for three months.",
        icon: "CheckCheck",
      },
    ],
  },

  testimonials: {
    variant: "single-featured",
    eyebrow: "Clients",
    heading: "What clients say",
    items: [
      {
        quote:
          "We had two cheaper quotes. Terra Build were about eleven percent higher and warned us the others had not priced the retaining wall at all. The final invoice matched the contract to the cent, eight months later. Both cheaper builders would have been well past it by then.",
        name: "Deon and Marika Swanepoel",
        role: "New home, Lorraine",
        rating: 5,
      },
      {
        quote: "The Friday report arrived every Friday for seven months, including the fortnight when it rained and nothing happened.",
        name: "Anele Gwala",
        role: "Extension, Mill Park",
        rating: 5,
      },
      {
        quote: "They stripped the bathroom before finalising the quote and found rotten joists. Better to know then than halfway through.",
        name: "Heather Bosman",
        role: "Renovation, Newton Park",
        rating: 5,
      },
      {
        quote: "We lived in the house through a double-storey extension with two small kids. It was not fun, but it was organised.",
        name: "Sipho Jantjies",
        role: "Extension, Framesby",
        rating: 4,
      },
    ],
  },

  faq: {
    variant: "two-column",
    eyebrow: "Questions",
    heading: "What clients ask",
    items: [
      {
        question: "What does building cost per square metre?",
        answer:
          "In Gqeberha, roughly R14 500/m² for a new home to a good standard, R12 800/m² for an extension and R11 500/m² for a cottage. Finishes move that considerably, and anyone quoting a firm figure before seeing the site is guessing.",
      },
      {
        question: "Are you NHBRC registered?",
        answer:
          "Yes, registration 3872041. Every new home is enrolled, which gives you the five-year structural warranty. A builder who is not registered cannot legally build you a new home.",
      },
      {
        question: "How long does approval take?",
        answer:
          "Four to eight weeks with the Nelson Mandela Bay municipality for a straightforward residential submission, longer if there are heritage or zoning issues. We lodge and follow up, but the timing is theirs.",
      },
      {
        question: "Do you take a deposit?",
        answer:
          "Payment follows a schedule tied to completed stages — foundation, wall plate, roof, and so on. There is a small mobilisation payment to order materials, never a large upfront deposit.",
      },
      {
        question: "What happens if the job runs late?",
        answer:
          "The contract carries a completion date and penalties for our delays. Weather and council delays are excluded, and both are logged in the weekly report as they happen, not claimed at the end.",
      },
      {
        question: "Can I use my own architect?",
        answer:
          "Yes, and most clients do. We are happy to build to another professional's drawings and will flag anything we think will cause a problem before contracting rather than during.",
      },
    ],
  },

  contact: {
    variant: "split-map",
    eyebrow: "Get in touch",
    heading: "Request a quote",
    intro:
      "Tell us what you are planning and roughly where. We do a free site visit and give you a realistic budget band before anyone spends money on plans.",
    formHeading: "Tell us about the project",
    submitLabel: "Request a site visit",
    successMessage:
      "Thank you — we will phone you within two working days to arrange a site visit.",
    subjectOptions: ["New home", "Extension", "Renovation", "Cottage or flatlet", "Structural repair", "Something else"],
  },

  cta: {
    variant: "split",
    heading: "Get a realistic number before you pay for plans",
    body:
      "The site visit and budget band cost nothing. It is the cheapest way to find out whether what you want and what you can spend are the same project.",
    primaryCta: { label: "Request a site visit", href: "#contact" },
    secondaryCta: { label: "041 373 2280", href: "tel:0413732280" },
    image: { src: "/construction/cta.jpg", alt: "A completed Terra Build home at handover" },
  },
};
