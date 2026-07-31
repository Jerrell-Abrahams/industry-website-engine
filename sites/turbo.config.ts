import type { SiteConfigInput } from "@/lib/schema";

/**
 * Redline Turbo Engineering — Wadeville, Germiston. Turbocharger reconditioning.
 *
 * DESIGN BRIEF
 * Direction: a bench, not a showroom. The trade buyer and the retail customer
 * both want the same three facts — what it costs, how long it takes, and whether
 * it will fail again — so every section answers one of those.
 * Anti-default: the industry ships black-and-carbon-fibre with a red gradient
 * turbine. This inverts it — warm engineering paper, oxide red as the primary
 * rather than a glow effect, and heat-tinted steel blue for the accent, which is
 * the colour the exhaust housing actually turns.
 * Type: Jost uppercase over Inter. Jost is geometric enough to read as drafting
 * lettering without the novelty of a stencil face.
 * Signature: `services: list` — a workshop price list with leader rules, so a
 * fleet controller can price a job without reading a single card. Paired with a
 * vertical timeline of the bench process, because "we recondition turbos" means
 * nothing until you show the six things that happen to one.
 *
 * Structural pair: split + list. Kept clear of mechanic (angled + tabs), which is
 * the other automotive site in the registry.
 *
 * Images expected in /public/turbo/ — hero 1920×1080, cta 1000×750.
 */
export const turboConfig: SiteConfigInput = {
  id: "turbo",

  business: {
    name: "Redline Turbo Engineering",
    tagline: "Stripped, balanced, calibrated, tested",
    phone: "011 824 6140",
    email: "bench@redlineturbo.co.za",
    whatsapp: "27824116140",
    address: {
      street: "14 Barlow Road, Wadeville",
      suburb: "Wadeville",
      city: "Germiston",
      province: "Gauteng",
      postalCode: "1428",
    },
    geo: { lat: -26.2721, lng: 28.1687 },
    googleMapsUrl: "https://maps.google.com/?q=Barlow+Road+Wadeville+Germiston",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=Barlow+Road+Wadeville+Germiston&output=embed",
    socialLinks: [
      // ponytail: lucide-react v1 dropped every brand glyph, so "Facebook" (what the
      // other 15 configs still use) renders nothing. Globe is the icon that exists.
      { platform: "Facebook", href: "https://facebook.com/redlineturboza", icon: "Globe" },
    ],
    businessHours: [
      { day: "Monday – Thursday", opens: "07:30", closes: "16:30", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday"] },
      { day: "Friday", opens: "07:30", closes: "15:00", schemaDays: ["Friday"] },
      { day: "Saturday", opens: "08:00", closes: "12:00", schemaDays: ["Saturday"] },
      { day: "Sunday", closed: true, schemaDays: ["Sunday"] },
    ],
  },

  branding: {
    primaryColor: "#A6321E",
    secondaryColor: "#3E3833",
    accentColor: "#1E5A8C",
    neutral: {
      bg: "#F6F2EC",
      surface: "#FFFFFF",
      border: "#DED6CB",
      text: "#17130F",
      textMuted: "#5A544C",
      onPrimary: "#FFFFFF",
    },
    fontHeading: "jost",
    fontBody: "inter",
    borderRadius: "sm",
    buttonStyle: "solid",
    cardStyle: "flat",
    shadowStyle: "none",
    spacingScale: "compact",
    animationStyle: "subtle",
    headingTransform: "uppercase",
  },

  features: {
    booking: true,
    gallery: false,
    testimonials: true,
    blog: false,
    pricing: true,
    whatsapp: true,
    newsletter: false,
    map: true,
    faq: true,
  },

  seo: {
    title: "Redline Turbo Engineering | Turbo repairs and reconditioning, Germiston",
    description:
      "Turbocharger reconditioning, VNT and electronic actuator calibration, and VSR balancing in Wadeville, Germiston. Free strip and quote, 12-month warranty.",
    keywords: [
      "turbo repairs Johannesburg",
      "turbocharger reconditioning Germiston",
      "VNT actuator calibration",
      "turbo balancing Gauteng",
      "diesel turbo specialist",
    ],
    ogImage: "/turbo/og.svg",
    schemaType: "AutoRepair",
    locale: "en_ZA",
    url: "https://redlineturbo.co.za",
  },

  layout: [
    "hero",
    "stats",
    "services",
    "timeline",
    "highlights",
    "pricing",
    "testimonials",
    "faq",
    "booking",
    "contact",
    "cta",
  ],

  navbar: {
    variant: "solid",
    links: [
      { label: "What we do", href: "#services" },
      { label: "The bench", href: "#timeline" },
      { label: "Pricing", href: "#pricing" },
      { label: "Questions", href: "#faq" },
      { label: "Find us", href: "#contact" },
    ],
    cta: { label: "Book a slot", href: "#booking" },
    showPhone: true,
  },

  footer: {
    variant: "minimal",
    blurb:
      "Turbocharger reconditioning in Wadeville since 1998. Passenger, commercial, agricultural and earthmoving units. Trade accounts welcome.",
    columns: [
      {
        heading: "Site",
        links: [
          { label: "What we do", href: "#services" },
          { label: "The bench", href: "#timeline" },
          { label: "Pricing", href: "#pricing" },
          { label: "Questions", href: "#faq" },
          { label: "Book a slot", href: "#booking" },
          { label: "Find us", href: "#contact" },
        ],
      },
    ],
    legal: "© {year} {business}. Wadeville, Germiston. VSR balancing and VNT calibration in-house.",
  },

  hero: {
    variant: "split",
    eyebrow: "Wadeville, Germiston",
    headline: "Your turbo did not fail on its own",
    subheadline:
      "We strip it, photograph it and tell you what killed it before we quote. Recondition the unit without fixing the cause and you will be back here in four months — so the report comes first, every time.",
    image: {
      src: "/turbo/hero.jpg",
      alt: "A stripped turbocharger core on the balancing bench at Redline Turbo Engineering",
    },
    primaryCta: { label: "Get a free strip and quote", href: "#contact" },
    secondaryCta: { label: "WhatsApp the bench", href: "https://wa.me/27824116140" },
    highlights: ["Free strip and report", "12-month warranty", "Nationwide courier"],
    align: "left",
  },

  stats: {
    variant: "bar",
    items: [
      { value: "1998", label: "On the same bench since" },
      { value: "240 000", label: "rpm VSR balance, every core" },
      { value: "12mo", label: "Warranty, parts and labour" },
      { value: "48hr", label: "Typical turnaround" },
    ],
  },

  services: {
    variant: "list",
    eyebrow: "The bench list",
    heading: "What comes across the counter",
    intro:
      "Passenger, light commercial, truck, tractor, generator and earthmoving units. Garrett, BorgWarner, Holset, IHI, Mitsubishi and Hitachi. If it spins, we have had one apart.",
    items: [
      {
        title: "Full recondition — fixed geometry",
        description:
          "Stripped to the last circlip, hot-tanked, new bearings, seals, thrust assembly and O-rings, then rebalanced and pressure tested. Compressor and turbine wheels are replaced rather than dressed if a blade is short — a filed wheel never balances honestly.",
        icon: "Wrench",
        price: "From R4 500",
        points: ["Genuine or OE-equivalent kits", "VSR balanced", "12-month warranty"],
      },
      {
        title: "Full recondition — VNT / variable geometry",
        description:
          "Everything above, plus the nozzle ring de-coked and freed, vane pivots measured for wear, and the actuator re-calibrated on the flow bench so the stop screws sit at the airflow spec for your engine, not at where the last person left them.",
        icon: "Fan",
        price: "From R6 200",
        points: ["Nozzle ring de-coked", "Vane clearance measured", "Calibrated to airflow spec"],
      },
      {
        title: "Electronic actuator repair and calibration",
        description:
          "Hella, Garrett and Holset VGT units. Motor, gear train and position sensor tested under load, then relearned and calibrated to the turbo it is going back onto. Most actuators arrive here as an unnecessary R14 000 dealer quote.",
        icon: "Cpu",
        price: "From R2 800",
        points: ["Bench tested under load", "Position relearn", "Fraction of a new unit"],
      },
      {
        title: "VSR high-speed balancing",
        description:
          "Core assembly balanced to 240 000 rpm on the VSR rig. Available on its own if you have built the unit yourself and want the rotating assembly signed off before it goes in.",
        icon: "Scale",
        price: "R1 250",
        points: ["Trade welcome", "Printed balance report", "Same day"],
      },
      {
        title: "Failure diagnosis and strip report",
        description:
          "Free. Ten-point inspection — shaft play, axial float, housing damage, oil feed and return, actuator travel, wheel contact — with photographs and a written cause. You get the report whether or not you have the work done here.",
        icon: "Search",
        price: "No charge",
        points: ["Photographed", "Written cause", "Yours to keep"],
      },
      {
        title: "Fitment, oil-feed flush and pressure test",
        description:
          "The repeat failure most shops never chase: a partly blocked oil feed, a collapsed return, or an intercooler holding oil from the last turbo. We fit, flush the feed line, pressure test the charge side and only then hand the vehicle back.",
        icon: "Droplets",
        price: "From R1 600",
        points: ["Feed line flushed", "Charge side pressure tested", "Required for warranty"],
      },
      {
        title: "Commercial, agricultural and earthmoving",
        description:
          "Truck, tractor, TLB and generator units, including the large Holset frames. Collection anywhere in Gauteng, courier to the rest of the country, and a loan unit on the common frames so the machine keeps working.",
        icon: "Truck",
        price: "Quoted on assessment",
        points: ["Gauteng collection", "Loan units on common frames", "Fleet accounts"],
      },
    ],
  },

  timeline: {
    variant: "vertical",
    eyebrow: "The bench",
    heading: "Six things that happen to your turbo",
    intro:
      "A rebuild that skips any one of these is a turbo that comes back. This is why a reconditioned unit from here is not the same thing as a cleaned-up unit from a classified ad.",
    items: [
      {
        marker: "01",
        title: "Booked in and photographed",
        description:
          "Every unit is photographed as it arrives, before anything is touched. That photo settles any later argument about what came in and in what state.",
        icon: "Camera",
      },
      {
        marker: "02",
        title: "Stripped and measured",
        description:
          "Full teardown. Shaft play, axial float, journal and housing bores measured against the manufacturer's limits rather than judged by feel.",
        icon: "Ruler",
      },
      {
        marker: "03",
        title: "Cause reported, then quoted",
        description:
          "You get the failure cause and the photographs before the price. Oil starvation, foreign object, over-fuelling and a blocked DPF each leave a different signature, and each needs something fixed on the engine too.",
        icon: "FileText",
      },
      {
        marker: "04",
        title: "Rebuilt with a full kit",
        description:
          "Bearings, seals, thrust assembly, O-rings and any wheel that failed inspection. We do not reuse a thrust bearing to save four hundred rand on a job you are trusting for a hundred thousand kilometres.",
        icon: "Wrench",
      },
      {
        marker: "05",
        title: "Balanced and calibrated",
        description:
          "Core balanced on the VSR rig to 240 000 rpm, then the actuator — vacuum, pressure or electronic — set on the flow bench to the airflow figure for your engine.",
        icon: "Gauge",
      },
      {
        marker: "06",
        title: "Tested, sealed and dispatched",
        description:
          "Leak and travel tested, balance report printed, unit sealed and either collected, couriered or fitted here the same week.",
        icon: "PackageCheck",
      },
    ],
  },

  highlights: {
    variant: "icon-grid",
    eyebrow: "Before you replace it",
    heading: "Four things worth knowing",
    items: [
      {
        title: "A rattle is not a death sentence",
        description:
          "Whine, lag, blue smoke and a boost fault code are usually a worn core, a stuck vane ring or a tired actuator. All three are bench work. Roughly nine of every ten units through this door are repaired rather than replaced.",
        icon: "Ear",
      },
      {
        title: "Oil kills more turbos than mileage",
        description:
          "A bearing spinning at 200 000 rpm survives on a clean, unrestricted oil feed. Stretched service intervals, a partly blocked feed line or a shut-down straight off the highway account for most of what we strip.",
        icon: "Droplets",
      },
      {
        title: "New is not automatically better",
        description:
          "A reconditioned unit built with a genuine kit and balanced on a VSR rig outlasts a cheap import copy, and costs about a third of a dealer replacement. We will tell you when a unit is genuinely past rebuilding.",
        icon: "Recycle",
      },
      {
        title: "Trade pricing, trade turnaround",
        description:
          "Workshops and fleets get 20% off the list below, collection anywhere in Gauteng, and a call the moment the strip report is done rather than at the end of the day.",
        icon: "Handshake",
      },
    ],
  },

  pricing: {
    variant: "simple-list",
    eyebrow: "Pricing",
    heading: "What it costs",
    intro:
      "Indicative pricing for common passenger and light commercial frames. The strip report is free and the exact figure follows it — nobody can price a turbo honestly before it is open.",
    note:
      "All prices include VAT and a 12-month warranty on parts and labour. Trade accounts take 20% off. Large commercial and earthmoving frames are quoted on assessment.",
    plans: [
      {
        name: "Strip, inspection and report",
        price: "Free",
        description: "Ten-point inspection, photographs and a written failure cause. No obligation to have the work done here.",
      },
      {
        name: "Recondition — fixed geometry",
        price: "R4 500",
        unit: "from",
        description: "Full rebuild kit, VSR balance and pressure test. Same-day on common frames if it is in before nine.",
      },
      {
        name: "Recondition — VNT / variable geometry",
        price: "R6 200",
        unit: "from",
        description: "As above, plus nozzle ring de-coke, vane clearance check and actuator calibration to airflow spec.",
      },
      {
        name: "Electronic actuator repair",
        price: "R2 800",
        unit: "from",
        description: "Hella, Garrett and Holset VGT. Bench tested under load and relearned to the unit it returns on.",
      },
      {
        name: "VSR balancing only",
        price: "R1 250",
        description: "Your core, our rig, to 240 000 rpm with a printed balance report. Trade and self-builders welcome.",
      },
      {
        name: "Fitment, oil-feed flush and pressure test",
        price: "R1 600",
        unit: "from",
        description: "Required for the warranty if we fit. Includes the charge-side pressure test and intercooler check.",
      },
    ],
  },

  testimonials: {
    variant: "single-featured",
    eyebrow: "Reviews",
    heading: "From the trade and the driveway",
    items: [
      {
        quote:
          "The dealer quoted me R38 000 for a new turbo on the Ranger. Redline stripped it free, showed me photographs of a scored thrust bearing and a feed line half full of carbon, and did the lot for under nine. Eighteen months and it is still pulling.",
        name: "Thabo Mokoena",
        role: "Boksburg",
        rating: 5,
      },
      {
        quote:
          "We send everything here. Strip report by ten, quote by eleven, unit back on the shelf the next day. They are the only people I have found who will say a unit is not worth rebuilding instead of taking the money.",
        name: "Deon van Wyk",
        role: "Workshop owner, Alberton",
        rating: 5,
      },
      {
        quote:
          "Two shops replaced my actuator and the fault came back both times. These guys found the vane ring was seized, not the actuator, and calibrated it properly afterwards.",
        name: "Yusuf Patel",
        role: "Kempton Park",
        rating: 5,
      },
      {
        quote:
          "Couriered a Holset from Polokwane on the Monday, had it back on the Thursday with a balance report in the box. Fair price for a truck unit.",
        name: "Riaan Botha",
        role: "Fleet controller, Limpopo",
        rating: 5,
      },
      {
        quote:
          "Not a fancy place and they do not pretend to be. They phoned before doing anything extra and the invoice matched the quote exactly.",
        name: "Nomsa Dlamini",
        role: "Germiston",
        rating: 4,
      },
    ],
  },

  faq: {
    variant: "two-column",
    eyebrow: "Questions",
    heading: "What people ask before sending a unit",
    items: [
      {
        question: "Can my turbo be repaired, or do I need a new one?",
        answer:
          "Most can be repaired. Worn bearings, blown seals, a seized vane ring or a tired actuator are all bench work. A cracked turbine housing, a shaft that has contacted the housing hard enough to score it, or a burst compressor wheel that has gone through the engine are the cases where we tell you to replace it — and we say so in the free report rather than after you have committed.",
      },
      {
        question: "Why did it fail in the first place?",
        answer:
          "In order of how often we see it: oil starvation or dirty oil, a foreign object through the compressor, over-fuelling from a bad injector or an aggressive remap, and a blocked DPF driving exhaust back pressure up. Each leaves a different mark inside the unit, which is why the strip report names the cause. Fix the turbo without fixing that and the new one fails the same way.",
      },
      {
        question: "How long does it take?",
        answer:
          "Common passenger frames go out the same day if they are in before nine. VNT units and anything needing an actuator calibration are usually 24 to 48 hours. If a wheel or housing has to come in, we tell you the day it is ordered rather than the day it does not arrive.",
      },
      {
        question: "Do you work outside Gauteng?",
        answer:
          "Yes. We collect anywhere in Gauteng at no charge and courier nationwide — most units go out on an overnight service. Pack the turbo with the oil ports taped and include your name and number in the box.",
      },
      {
        question: "What does the 12-month warranty actually cover?",
        answer:
          "Parts and labour on everything we touched, for twelve months from fitment. It does not cover a unit killed a second time by the same untreated cause, which is why the oil feed flush is a condition of the warranty when we fit, and why we ask for proof of an oil and filter change when you fit it yourself.",
      },
      {
        question: "Do you take payment on account?",
        answer:
          "Card, EFT and SnapScan for retail, on collection. Registered workshops and fleets run 30-day accounts once the first job is settled, at 20% off the published list.",
      },
    ],
  },

  booking: {
    variant: "steps",
    eyebrow: "Book a slot",
    heading: "Book your strip and quote",
    intro:
      "Three quick steps — what you need, a day and time that suits you, and how to reach you. We confirm by WhatsApp or email the same working day.",
    submitLabel: "Book my slot",
    successMessage: "Booking received — we'll confirm your slot shortly.",
    serviceOptions: [
      "Free strip and quote",
      "Full recondition — fixed geometry",
      "Full recondition — VNT",
      "Actuator repair or calibration",
      "VSR balancing only",
      "Commercial or earthmoving unit",
    ],
    askPreferredTime: true,
    slotLengthMinutes: 60,
  },

  contact: {
    variant: "split-map",
    eyebrow: "Find us",
    heading: "14 Barlow Road, Wadeville",
    intro:
      "Send the vehicle make, engine and the turbo part number off the plate if you can read it, plus what it is doing. WhatsApp a photo of the unit and we will tell you what we are looking at before you drive out.",
    formHeading: "Send us the unit",
    submitLabel: "Send details",
    successMessage:
      "Got it. We will come back to you on WhatsApp or email, usually within the working day.",
    subjectOptions: [
      "Recondition a turbo",
      "VNT or actuator problem",
      "Balancing only",
      "Commercial or earthmoving unit",
      "Trade account",
      "Something else",
    ],
  },

  cta: {
    variant: "banner",
    heading: "Strip and report costs you nothing",
    body:
      "Drop the unit off, or send us a photo and the part number. You get the failure cause and the photographs first, and the price after — whether the work ends up here or not.",
    primaryCta: { label: "WhatsApp the bench", href: "https://wa.me/27824116140" },
    secondaryCta: { label: "011 824 6140", href: "tel:0118246140" },
    image: { src: "/turbo/cta.svg", alt: "The workshop counter at Redline Turbo Engineering in Wadeville" },
  },
};
