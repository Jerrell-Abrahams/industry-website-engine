import type { SiteConfigInput } from "@/lib/schema";

/**
 * Moolmans Services / Auto Electrical — Kempton Park, Gauteng.
 *
 * A real client rather than a fictional demo, which changes how this file is
 * written: every value here came from something they actually told us, or from
 * their own flyer. Where they have not told us yet — hours, prices, photos,
 * domain — the field is left out rather than invented, because invented detail
 * on a real business's site is what sends a customer to the wrong place. Each
 * gap is marked `CLIENT:` so filling them in is a search, not a re-read.
 *
 * Variants: typographic + list, the only pairing using the typographic hero.
 * Chosen because it is the one hero needing no photograph at all — this site
 * can go up and still look deliberate before a single image arrives, and ten
 * services read better as a dotted list than as ten cards.
 *
 * Palette is theirs, taken off the flyer: gold and red on near-black. Gold
 * carries the buttons rather than the red, because white-on-red cannot hold
 * 4.5:1 while red also stays readable on a dark ground — gold clears both with
 * room to spare. This is the only dark site in the registry, which keeps it
 * well clear of Precision Auto's light workshop grey.
 *
 * Logo: /public/moolmans/logo.png is the client's flyer artwork with its flat
 * black backdrop keyed out to transparent (a threshold on pixel brightness,
 * not an alpha divide — the metallic "MOOLMANS" fill has genuine grey shading
 * that a naive premultiplied-black un-key would have faded into false
 * transparency) and padded to the engine's 4:1 brand-logo ratio. Once the
 * backdrop is gone there is no black box left to colour-match, which is what
 * the client actually asked for — the navbar and footer already sit on
 * neutral.bg/neutral.surface, both near-black by design, so the logo now
 * drops onto them with no seam.
 */
export const moolmansConfig: SiteConfigInput = {
  id: "moolmans",

  // Sent to the client for review, not indexed yet — `demo` still gates that,
  // same as an unsold showcase. The label is the only thing that changes:
  // this is their own site in progress, not a template pitch. Flip `demo` to
  // false once they sign off, at which point also fill in `compliance` below
  // (see the ECTA note on that field).
  demo: true,
  demoLabel: "In Development",

  business: {
    name: "Moolmans Services",
    tagline: "Auto electrical — fast, reliable, professional",
    logo: { src: "/moolmans/logo.png", alt: "Moolmans Services" },
    favicon: "/moolmans/favicon.png",
    phone: "082 754 9758",
    /** Enquiries land here unless CONTACT_TO_EMAIL is set on the deployment. */
    email: "moolmansservices@gmail.com",
    whatsapp: "27827549758",
    /**
     * The Google Business listing's CID rather than the search-results URL the
     * client sent: that one carried rlz/oq/gs_lcrp — parameters tied to their
     * own browser session, not something to ship to every visitor.
     *
     * `search.google.com/local/writereview?placeid=<CID>` (which would open the
     * review composer directly, no extra tap) 404s — confirmed by hand — because
     * that endpoint wants Google's actual Place ID, a different identifier this
     * CID doesn't convert to without the Places API. This CID-based Maps link is
     * one tap from the composer instead of zero, but it is confirmed working.
     * CLIENT: for the zero-tap version, Google Business Profile → "Ask for
     * reviews" issues an official g.page/r/.../review short link — swap it in
     * here the moment you have it. Powers the floating review button, which is
     * why it lives here rather than in `socialLinks` — same reason `whatsapp`
     * above does.
     */
    googleReviewUrl: "https://www.google.com/maps?cid=15270502245147142822",
    address: {
      street: "197 Dann Road",
      suburb: "Aston Manor",
      city: "Kempton Park",
      province: "Gauteng",
      postalCode: "1619",
    },
    // No `geo`: guessing coordinates puts the pin on the wrong side of the
    // road. The embed below resolves the address on Google's side instead.
    googleMapsUrl: "https://maps.google.com/?q=197+Dann+Road+Aston+Manor+Kempton+Park",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=197+Dann+Road+Aston+Manor+Kempton+Park&output=embed",
    socialLinks: [
      { platform: "Facebook", href: "https://www.facebook.com/MoolmansRepairs/", icon: "Facebook" },
    ],
    businessHours: [
      {
        day: "Monday – Friday",
        opens: "08:00",
        closes: "17:00",
        schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
      { day: "Saturday", opens: "08:00", closes: "13:00", schemaDays: ["Saturday"] },
      { day: "Sunday", closed: true, schemaDays: ["Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#F2B300",
    secondaryColor: "#C8102E",
    accentColor: "#E8323F",
    neutral: {
      bg: "#0C0C0E",
      surface: "#16161A",
      border: "#2C2C32",
      text: "#F4F4F5",
      textMuted: "#A8A9AF",
      // Dark ink on the gold button — white on gold is unreadable.
      onPrimary: "#0C0C0E",
    },
    fontHeading: "archivo",
    fontBody: "montserrat",
    borderRadius: "sm",
    buttonStyle: "solid",
    buttonHover: "press",
    cardStyle: "bordered",
    borderWeight: "medium",
    shadowStyle: "none",
    spacingScale: "normal",
    animationStyle: "subtle",
    headingTransform: "uppercase",
  },

  features: {
    whatsapp: true,
    faq: true,
    map: true,
    openNowBadge: true,
    booking: false,
    gallery: true,
    testimonials: false,
    // Not for auto-electrical prices — those stay quote-only, see `services`
    // above. This is for the tree felling offer below, which is a real
    // package (free quotation, no call-out fee) worth a plan card.
    pricing: true,
    newsletter: false,
  },

  seo: {
    title: "Moolmans Services | Auto electrical, Kempton Park",
    description:
      "Auto electrical repairs and diagnostics in Aston Manor, Kempton Park since 1985. Starters, alternators, batteries, wiring faults, ABS and airbag diagnostics. Call or WhatsApp 082 754 9758.",
    keywords: [
      "auto electrician Kempton Park",
      "auto electrical Aston Manor",
      "starter motor repair Kempton Park",
      "alternator repair Kempton Park",
      "car wiring fault Glen Marais",
      "computer diagnostics Kempton Park",
      "ABS airbag diagnostics Gauteng",
      "Fault Finding Kempton Park",
      "Kempton Park auto electrical",
      "Kempton Park car electrical repairs",
    ],
    ogImage: "/moolmans/og.svg",
    schemaType: "AutoRepair",
    locale: "en_ZA",
    // CLIENT: domain. Placeholder until one is registered.
    url: "https://moolmansauto.co.za",
  },

  layout: ["hero", "services", "highlights", "about", "pricing", "gallery", "faq", "contact", "cta"],

  navbar: {
    variant: "solid",
    links: [
      { label: "What we fix", href: "#services" },
      { label: "Why us", href: "#highlights" },
      { label: "About", href: "#about" },
      { label: "Other services", href: "#pricing" },
      { label: "Our work", href: "#gallery" },
      { label: "Find us", href: "#contact" },
    ],
    cta: { label: "WhatsApp us", href: "https://wa.me/27827549758" },
    showPhone: true,
  },

  footer: {
    variant: "minimal",
    blurb:
      "Auto electrical repairs and diagnostics from 197 Dann Road, Aston Manor since 1985, working across Kempton Park, Glen Marais, Pomona and Bredell. Cars, bakkies, SUVs and light commercial vehicles. Call or WhatsApp 082 754 9758.",
    legal: "© {year} {business}. Kempton Park, Gauteng.",
  },

  hero: {
    variant: "typographic",
    eyebrow: "Aston Manor, Kempton Park · Since 1985",
    headline: "Electrical problems with your vehicle?",
    subheadline:
      "Starters, alternators, batteries, wiring faults, ABS and airbag diagnostics — on cars, bakkies, SUVs and light commercial vehicles. Send a WhatsApp with the vehicle and what it is doing, and we will take it from there.",
    primaryCta: { label: "WhatsApp 082 754 9758", href: "https://wa.me/27827549758" },
    secondaryCta: { label: "Call 082 754 9758", href: "tel:0827549758" },
    // CLIENT: confirm 1985 is the year the business started — it is on your
    // flyer and it is the strongest thing on this page, so it must be right.
    highlights: ["Trading since 1985", "Expert diagnostics", "Open Saturday mornings"],
    align: "left",
  },

  services: {
    variant: "list",
    eyebrow: "What we do",
    heading: "Auto electrical work",
    intro:
      "Cars, bakkies, SUVs and light commercial vehicles, in and around Kempton Park.",
    // No prices shown, by decision rather than by gap — every job gets a quote
    // instead, since electrical work varies too much by vehicle and fault for
    // a price list to be honest. `price: "From R___"` per item still works if
    // that ever changes.
    items: [
      {
        title: "Auto electrical repairs",
        description:
          "The whole electrical side of the vehicle, from a single dead circuit to a fault nobody else has been able to place.",
        icon: "Zap",
        points: [],
      },
      {
        title: "Computer diagnostics",
        description:
          "A warning light on the dash. The vehicle is scanned, the codes are read, and you are told what they mean before any work is quoted.",
        icon: "Laptop",
        points: [],
      },
      {
        title: "Starter motor repairs",
        description:
          "The car will not turn over, or turns over slowly. The starter is tested on the vehicle before it comes off.",
        icon: "Power",
        points: [],
      },
      {
        title: "Alternator repairs",
        description:
          "Battery light on, or a battery that keeps going flat. Usually the charging side rather than the battery itself.",
        icon: "BatteryCharging",
        points: [],
      },
      {
        title: "Battery testing and replacement",
        description:
          "Batteries tested under load, so you replace one that has actually failed rather than one that was not being charged.",
        icon: "Battery",
        points: [],
      },
      {
        title: "Wiring repairs and fault finding",
        description:
          "A circuit that blows the same fuse every time, or something that only plays up when it rains. The fault gets traced back to where it actually is.",
        icon: "Cable",
        points: [],
      },
      {
        title: "Lights and electrical faults",
        description:
          "Headlights, indicators, brake lights, interior lights and the switches and earths behind them.",
        icon: "Lightbulb",
        points: [],
      },
      {
        title: "Gearbox electrical diagnostics",
        description:
          "Sensors, solenoids and wiring on automatic gearboxes — the electrical side of a box that is shifting badly or going into limp mode.",
        icon: "Cog",
        points: [],
      },
      {
        title: "Airbag and ABS diagnostics",
        description:
          "Airbag or ABS light on the dash. Both are safety systems, so they get read and diagnosed properly rather than reset and sent away.",
        icon: "ShieldAlert",
        points: [],
      },
      {
        title: "Charging and starting system repairs",
        description:
          "The full charging and starting circuit — battery, alternator, starter, cables and earths tested as one system.",
        icon: "PlugZap",
        points: [],
      },
    ],
    cta: { label: "Request a quote", href: "https://wa.me/27827549758" },
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "Why us",
    heading: "How we work",
    items: [
      {
        title: "Honest service",
        description:
          "You are told what the vehicle is actually doing and what it will take to fix, including when the answer is that it is not an electrical fault.",
        icon: "BadgeCheck",
      },
      {
        title: "Affordable prices",
        description:
          "Priced for the job in front of us, and quoted before the work starts rather than after.",
        icon: "HandCoins",
      },
      {
        title: "Quality workmanship",
        description:
          "Faults traced to the source instead of parts replaced on a guess, which is what makes electrical work expensive elsewhere.",
        icon: "ThumbsUp",
      },
      {
        title: "Fast turnaround",
        description:
          "Most electrical faults are diagnosed the same day. You will be told up front if a part has to come in.",
        icon: "Clock",
      },
    ],
  },

  about: {
    // CLIENT: the one section written without your words. Written for now as a
    // drop-off workshop (vehicle comes to 197 Dann Road) — confirm that, and
    // say if you also do callouts. Also tell us who runs the workshop and
    // anything you would say to a customer on the phone.
    variant: "stacked",
    eyebrow: "About",
    heading: "Auto electrical in Kempton Park since 1985",
    body: [
      "Moolmans Services handles the electrical side of a vehicle — starting, charging, wiring, lights and the diagnostics that read them — for drivers across Kempton Park, Glen Marais, Pomona and Bredell. Bring the vehicle to 197 Dann Road in Aston Manor, or send the fault through on WhatsApp first.",
      "Electrical faults are the ones most often guessed at, and guessing is what makes them expensive. Work here starts with testing what the vehicle is actually doing, so the part that gets replaced is the part that failed. Cars, bakkies, SUVs and light commercial vehicles.",
    ],
    // Stock photos — see PHOTO-CREDITS.md. CLIENT: real photos of the
    // workshop or bench would replace these well.
    images: [
      { src: "/moolmans/about-1.jpg", alt: "A mechanic working on a car's fuse box under the bonnet" },
      { src: "/moolmans/about-2.jpg", alt: "A close-up of industrial electrical wiring and relays" },
      { src: "/moolmans/about-3.jpg", alt: "A car battery and jump-start clamp under the bonnet" },
    ],
    cta: { label: "Get in touch", href: "#contact" },
  },

  /**
   * Two more trades under the same name and number, neither a service of the
   * auto-electrical business — tree felling comes from Moolmans' own tree
   * felling flyer, appliance repairs from a plain list, no flyer. Deliberately
   * its own section with its own heading and its own quote buttons rather
   * than folded into `services` or `highlights` above, both specifically
   * about the electrical side. `pricing` is the section type here because it
   * is the one that gives a distinct block both a heading and a CTA per
   * plan — the "plans" are really their real offers, not a price list.
   */
  pricing: {
    variant: "cards",
    eyebrow: "Also from Moolmans",
    heading: "Tree Felling & Appliance Repairs",
    intro: "Two more trades from the same team, on the same number.",
    plans: [
      {
        name: "Tree Felling & Site Clean-up",
        price: "Free quotation",
        unit: "no call-out fee",
        features: [
          "Cutting and removal",
          "Proper tree pruning",
          "Site cleaning",
          "Stump removal",
          "Debris removal and disposal",
        ],
        // Real job photo, not stock — see the gallery below for more.
        image: {
          src: "/moolmans/tree-felling.jpg",
          alt: "A worker on a ladder cutting near the crown of a large ornamental palm with a chainsaw",
        },
        cta: {
          label: "WhatsApp for a tree quote",
          href: "https://wa.me/27827549758?text=Hi%20Moolmans%2C%20I%27d%20like%20a%20quote%20for%20tree%20felling",
        },
      },
      {
        // CLIENT: no flyer for this one — confirm the list is complete, and
        // whether there's an offer worth stating (free quotation? call-out fee?).
        name: "Appliance Repairs",
        price: "Request a quote",
        features: [
          "Fault finding",
          "Washing machines",
          "Tumble dryers",
          "Stoves",
          "Ovens",
          "Dishwashers",
          "Fridges",
          "Microwaves",
        ],
        image: {
          src: "/moolmans/appliance-repairs.jpg",
          alt: "A washing machine and tumble dryer side by side in a laundry room",
        },
        cta: {
          label: "WhatsApp for an appliance quote",
          href: "https://wa.me/27827549758?text=Hi%20Moolmans%2C%20I%27d%20like%20a%20quote%20for%20an%20appliance%20repair",
        },
      },
    ],
  },

  // Real job photos the client sent over, picked for variety across the
  // different tree types and jobs rather than for any one being the "best" —
  // masonry because they're all phone-camera portrait shots of differing
  // heights, which is exactly what that layout is for.
  gallery: {
    variant: "masonry",
    eyebrow: "Tree felling",
    heading: "Recent jobs",
    intro: "A few jobs from around the area.",
    images: [
      {
        src: "/moolmans/tree-gallery-1.jpg",
        alt: "A tall ornamental palm being pruned from a ladder beside a two-storey house, with the work vehicle parked on the street",
      },
      {
        src: "/moolmans/tree-gallery-2.jpg",
        alt: "Two workers at the base of a tall palm tree with a ladder extended into the crown",
      },
      {
        src: "/moolmans/tree-gallery-3.jpg",
        alt: "A palm tree with a freshly pruned, healthy crown against a clear sky",
      },
      {
        src: "/moolmans/tree-gallery-4.jpg",
        alt: "A freshly cut tree stump and sawn log, with felled branches loaded onto the truck behind",
      },
      {
        src: "/moolmans/tree-gallery-5.jpg",
        alt: "A worker on a ladder in a bare tree holding a freshly cut branch section",
      },
      {
        src: "/moolmans/tree-gallery-6.jpg",
        alt: "A worker on a ladder cutting a branch with a chainsaw, high in a bare tree",
      },
      {
        src: "/moolmans/tree-gallery-7.jpg",
        alt: "Workers at the base of a large bare tree and a tall cypress, mid-job",
      },
      {
        src: "/moolmans/tree-gallery-8.jpg",
        alt: "A worker using a chainsaw to cut down a fire-damaged tree stump against a brick wall",
      },
    ],
  },

  faq: {
    variant: "single-column",
    eyebrow: "Questions",
    heading: "What people ask",
    // CLIENT: check these say what you would say, and send the questions you
    // actually get asked on the phone.
    items: [
      {
        question: "Which vehicles do you work on?",
        answer:
          "Cars, bakkies, SUVs and light commercial vehicles. If you are not sure whether yours qualifies, phone and ask.",
      },
      {
        question: "Which areas do you cover?",
        answer:
          "Kempton Park and the areas around it, including Glen Marais, Pomona and Bredell. If you are just outside that, phone and ask.",
      },
      {
        question: "What does an auto electrician do that a mechanic does not?",
        answer:
          "Everything on the electrical side: starting, charging, wiring, lights, sensors, ABS and airbag systems, and the diagnostics that read them. A general mechanic will often send an electrical fault to someone like us rather than chase it themselves.",
      },
      {
        question: "Will having electrical work done here affect my car's manufacturer warranty?",
        answer:
          "No. South African competition regulations let you have a vehicle serviced or repaired at any accredited independent workshop without affecting the manufacturer's warranty, provided correct-specification parts are used and the work is properly recorded. That covers auto-electrical work the same as it covers a standard service.",
      },
      {
        question: "The car just clicks when I turn the key — what does that mean?",
        answer:
          "A single dry click is usually the starter motor or a poor connection; a rapid repeated clicking is almost always a battery too flat or too weak to turn the engine over. Both look identical from the driver's seat, which is why the fix starts with testing the battery, the starter and the connections between them rather than guessing at one.",
      },
      {
        question: "My battery keeps going flat. Is it the battery?",
        answer:
          "Often it is not. A battery that will not hold charge, an alternator that is not charging, and something on the vehicle draining current overnight all look identical from the driver's seat. Testing the charging system tells you which one you are paying for.",
      },
      {
        question: "Does load shedding damage a car's electronics?",
        answer:
          "Not directly — a car's electrical system runs off its own battery and alternator, not the mains, so a power cut on its own does not touch it. What does cause problems is what happens around it: gate motors and security systems drawing on backup batteries near a parked car, or a car being jump-started incorrectly during an outage. If a car has been harder to start since load shedding began at the property, the battery and charging system are worth testing.",
      },
      {
        question: "Is it safe to jump-start my own car?",
        answer:
          "Generally yes, but modern vehicles carry more sensitive electronics than older ones, and connecting jumper cables to the wrong terminals, in the wrong order, or leaving them attached too long can damage the alternator or the car's computer. If something electrical behaves differently after a jump-start — warning lights, windows, central locking — get it checked rather than waiting to see if it resolves itself.",
      },
      {
        question: "How do I get a quote?",
        answer:
          "Phone or WhatsApp 082 754 9758 with the make and model and a description of what the vehicle is doing. The more detail, the closer the answer.",
      },
    ],
  },

  contact: {
    variant: "split-map",
    eyebrow: "Find us",
    heading: "197 Dann Road, Aston Manor",
    intro:
      "Drop the vehicle at 197 Dann Road, Aston Manor, or WhatsApp 082 754 9758 first with the vehicle and what it is doing.",
    formHeading: "Request a quote",
    submitLabel: "Send message",
    successMessage: "Thanks — we have your details and will come back to you.",
    subjectOptions: [
      "Starter, alternator or battery",
      "Wiring or lights",
      "Computer diagnostics",
      "ABS or airbag light",
      "Something else electrical",
    ],
  },

  cta: {
    variant: "banner",
    heading: "Do not let an electrical problem leave you stranded",
    body: "Make, model, and what the vehicle is doing. WhatsApp is quickest.",
    primaryCta: { label: "WhatsApp 082 754 9758", href: "https://wa.me/27827549758" },
    secondaryCta: { label: "Call 082 754 9758", href: "tel:0827549758" },
  },
};
