export interface PricingAddon {
  title: string;
  price: string;
}

export interface PricingCategoryStructure {
  id: string;
  serviceTitle: string;
  serviceSlug: string;
  startingPrice: string; // Clearly labelled editable placeholder format
  pricingNote?: string;
  packages: {
    tierName: string;
    price: string; // e.g. "Starting from ₹14,999" or "₹[Your Price]"
    subtitle: string;
    deliverables: string[];
    revisions: string;
    timeline: string;
    isFeatured?: boolean;
    ctaText: string;
  }[];
  additionalCharges: PricingAddon[];
}

export const defaultPricingNote =
  'Final pricing may vary depending on project complexity, requirements and delivery timeline.';

export const defaultPricingData: PricingCategoryStructure[] = [
  {
    id: 'prc-web',
    serviceTitle: 'Website Design & Development',
    serviceSlug: 'website-design-development',
    startingPrice: 'Starting from ₹14,999',
    pricingNote: 'Hosting, domain registration, and third-party API costs are billed separately.',
    packages: [
      {
        tierName: 'Single-Page Landing',
        price: 'Starting from ₹14,999',
        subtitle: 'For launches, lead funnels & high-converting campaign showcases.',
        deliverables: [
          'Custom UI/UX layout crafted from scratch',
          'Mobile & tablet responsive perfection',
          'Integrated enquiry form with WhatsApp link',
          'Speed optimization & Google SEO meta tags',
          'Free SSL & deployment setup assistance',
        ],
        revisions: '3 Rounds of Revisions',
        timeline: '5 – 7 Business Days',
        isFeatured: false,
        ctaText: 'Choose Landing Page',
      },
      {
        tierName: 'Corporate Multi-Page',
        price: 'Starting from ₹29,999',
        subtitle: 'Complete online digital flagship for modern agencies and startups.',
        deliverables: [
          'Up to 5 bespoke designed & coded pages',
          'Editorial portfolio & interactive service showcases',
          'Micro-interactions & fluid animations',
          'Analytics integration & speed audit',
          'Clean source code & admin handover',
        ],
        revisions: 'Unlimited during design phase',
        timeline: '10 – 14 Business Days',
        isFeatured: true,
        ctaText: 'Choose Corporate Web',
      },
      {
        tierName: 'Custom Web Platform',
        price: 'Custom Quotation',
        subtitle: 'Bespoke web applications, client portals, and e-commerce flagships.',
        deliverables: [
          'Custom full-stack architecture & database',
          'Secure user authentication & admin management',
          'Payment gateway & third-party API hooks',
          'Priority maintenance & dedicated sprint cycles',
        ],
        revisions: 'Milestone-based sign-offs',
        timeline: '3 – 6 Weeks',
        isFeatured: false,
        ctaText: 'Request Custom Quote',
      },
    ],
    additionalCharges: [
      { title: 'Additional Custom Page', price: '₹2,500 / page' },
      { title: 'Payment Gateway Integration', price: '₹7,500 one-time' },
      { title: 'Priority 48-Hour Sprint', price: '+40% on project fee' },
    ],
  },
  {
    id: 'prc-poster',
    serviceTitle: 'Poster & Banner Design',
    serviceSlug: 'poster-banner-design',
    startingPrice: 'Starting from ₹1,499',
    packages: [
      {
        tierName: 'Single Event Poster',
        price: 'Starting from ₹1,499',
        subtitle: 'Punchy visual layout for club nights, academic webinars, or launches.',
        deliverables: [
          '1 Polished design concept',
          'Print-ready CMYK PDF (300 DPI)',
          'High-res RGB web version for social media',
          'Standard A4 / A3 / A2 dimensions',
        ],
        revisions: '2 Rounds of Revisions',
        timeline: '24 – 48 Hours',
        ctaText: 'Order Poster',
      },
      {
        tierName: 'Campaign Multi-Format Pack',
        price: 'Starting from ₹3,499',
        subtitle: 'For conferences, exhibitions, and retail brand campaigns.',
        deliverables: [
          '2 Unique creative design concepts',
          '3 Formats (Poster, Standee roll-up, Social banner)',
          'Vector master print assets with bleed marks',
          'Commercial printing guidelines',
        ],
        revisions: '4 Rounds of Revisions',
        timeline: '2 – 3 Days',
        isFeatured: true,
        ctaText: 'Order Campaign Pack',
      },
      {
        tierName: 'Outdoor Hoarding & Venue Signage',
        price: 'Custom Quotation',
        subtitle: 'Large-scale flex hoardings, stage backdrops, and billboard displays.',
        deliverables: [
          'Super-format print resolution specifications',
          'Full venue signage suite layout',
          'Full vector source files (AI/Figma/PDF)',
        ],
        revisions: 'Unlimited Revisions',
        timeline: '3 – 5 Days',
        ctaText: 'Discuss Large Format',
      },
    ],
    additionalCharges: [
      { title: 'Express 12-Hour Rush Delivery', price: '+₹800' },
      { title: 'Additional Dimension Resize', price: '₹400 / size' },
      { title: 'Layered Source File (AI / PSD)', price: '₹600' },
    ],
  },
  {
    id: 'prc-invitation',
    serviceTitle: 'Invitation Design',
    serviceSlug: 'invitation-design',
    startingPrice: 'Starting from ₹1,999',
    packages: [
      {
        tierName: 'Digital Smartphone Invite',
        price: 'Starting from ₹1,999',
        subtitle: 'Mobile-first invitation engineered for WhatsApp and email sharing.',
        deliverables: [
          'High-res single or 2-card digital layout',
          'Clickable map directions & RSVP links',
          'Optimized for mobile retina screens',
        ],
        revisions: '3 Rounds of Revisions',
        timeline: '2 Days',
        ctaText: 'Order Digital Invite',
      },
      {
        tierName: 'Luxury Wedding & Gala Suite',
        price: 'Starting from ₹4,999',
        subtitle: 'Comprehensive stationery suite with bespoke monogram & palette.',
        deliverables: [
          '5 Cohesive cards (Save-the-Date, Main, RSVP, Itinerary, Thank-You)',
          'Print-ready letterpress / gold foil separation files',
          'Interactive clickable digital PDF version',
          'Custom couple / event monogram design',
        ],
        revisions: 'Unlimited Revisions',
        timeline: '4 – 5 Days',
        isFeatured: true,
        ctaText: 'Order Luxury Suite',
      },
      {
        tierName: 'Animated Motion Video Invite',
        price: 'Starting from ₹7,499',
        subtitle: 'Story-driven 30-60 second motion graphic video invitation.',
        deliverables: [
          '1080p Full HD vertical video with audio syncing',
          'Animated typographic typography transitions',
          'Companion static high-res graphic cards',
        ],
        revisions: '3 Rounds of Revisions',
        timeline: '5 – 7 Days',
        ctaText: 'Order Video Invite',
      },
    ],
    additionalCharges: [
      { title: 'Bespoke Crest / Monogram Design', price: '₹1,500' },
      { title: 'Hand-drawn Venue Map Illustration', price: '₹1,200' },
      { title: 'Multi-lingual Layout Version', price: '₹750 / language' },
    ],
  },
  {
    id: 'prc-resume',
    serviceTitle: 'Resume & CV Design',
    serviceSlug: 'resume-cv-design',
    startingPrice: 'Starting from ₹1,199',
    packages: [
      {
        tierName: 'ATS Professional Resume',
        price: 'Starting from ₹1,199',
        subtitle: 'Clean 1-page layout formatted to breeze through ATS screening.',
        deliverables: [
          '1-Page ATS-compliant structured PDF',
          'Editable Microsoft Word or Google Docs file',
          'Clickable links for portfolio, GitHub & LinkedIn',
        ],
        revisions: '2 Rounds of Revisions',
        timeline: '24 Hours',
        ctaText: 'Order ATS Resume',
      },
      {
        tierName: 'Executive Career Suite',
        price: 'Starting from ₹2,499',
        subtitle: 'For senior leaders, tech specialists, and C-suite executives.',
        deliverables: [
          '1-2 Page Executive CV with impeccable hierarchy',
          'Matching branded Cover Letter template',
          'Editable Word / Google Docs source files',
          'LinkedIn header banner graphic',
        ],
        revisions: 'Unlimited Revisions for 7 Days',
        timeline: '48 Hours',
        isFeatured: true,
        ctaText: 'Order Executive Suite',
      },
      {
        tierName: 'Creative Portfolio CV',
        price: 'Starting from ₹3,999',
        subtitle: 'For designers, architects, photographers & creative directors.',
        deliverables: [
          'Multi-page visual CV with embedded work highlights',
          'Interactive media links & layout hierarchy',
          'Full Figma / Illustrator master files included',
        ],
        revisions: '3 Rounds of Revisions',
        timeline: '3 Days',
        ctaText: 'Order Portfolio CV',
      },
    ],
    additionalCharges: [
      { title: 'Express 12-Hour Turnaround', price: '+₹600' },
      { title: 'Professional Content Polish / Copywriting', price: '₹1,000' },
      { title: 'Second Version for Different Industry', price: '₹700' },
    ],
  },
  {
    id: 'prc-certificate',
    serviceTitle: 'Certificate Design',
    serviceSlug: 'certificate-design',
    startingPrice: 'Starting from ₹1,299',
    packages: [
      {
        tierName: 'Single Award Template',
        price: 'Starting from ₹1,299',
        subtitle: 'Distinguished certificate for seminars, workshops, or competitions.',
        deliverables: [
          '1 Bespoke Certificate Template design',
          'Print-ready vector PDF (300 DPI CMYK)',
          'Editable template in PowerPoint/Word to change names easily',
        ],
        revisions: '2 Rounds of Revisions',
        timeline: '24 – 48 Hours',
        ctaText: 'Order Certificate',
      },
      {
        tierName: 'Institution / Tiered Suite',
        price: 'Starting from ₹2,999',
        subtitle: 'Winner, Runner-up, Merit, and Participant variations.',
        deliverables: [
          '3-4 Cohesive Tiered Variations (Gold/Silver/Bronze)',
          'Custom vector crest / official seal badge',
          'Data-merge ready template for bulk certificates',
          'Print specifications guide for textured papers',
        ],
        revisions: '4 Rounds of Revisions',
        timeline: '2 – 3 Days',
        isFeatured: true,
        ctaText: 'Order Tiered Suite',
      },
      {
        tierName: 'Verifiable Certification Program',
        price: 'Custom Quotation',
        subtitle: 'Complete institutional identity with digital verification QR codes.',
        deliverables: [
          'Printable certificate + shareable LinkedIn digital badge',
          'Automated recipient data-generation pipeline guide',
          'Vector master files included',
        ],
        revisions: 'Unlimited Revisions',
        timeline: '3 – 5 Days',
        ctaText: 'Discuss Institution Needs',
      },
    ],
    additionalCharges: [
      { title: 'Foil-stamp / Spot UV Print Separation', price: '₹500' },
      { title: 'Bulk 50+ Personalized PDF Batch Export', price: '₹1,500' },
      { title: 'Express 12-Hour Delivery', price: '+₹600' },
    ],
  },
  {
    id: 'prc-social',
    serviceTitle: 'Social Media & Advertisement Creatives',
    serviceSlug: 'social-media-advertisement-creatives',
    startingPrice: 'Starting from ₹2,499',
    packages: [
      {
        tierName: 'Starter Content Kit (6 Creatives)',
        price: 'Starting from ₹2,499',
        subtitle: 'Keep your social feed active with polished on-brand visuals.',
        deliverables: [
          '6 Custom designed social media posts',
          'Matching Story (9:16) format for all',
          'High-res web optimized exports',
        ],
        revisions: '3 Rounds of Revisions',
        timeline: '2 – 3 Days',
        ctaText: 'Order Starter Kit',
      },
      {
        tierName: 'Growth & Ads Power Pack',
        price: 'Starting from ₹5,499',
        subtitle: 'For product launches and high-converting paid ad campaigns.',
        deliverables: [
          '15 High-impact creative assets',
          'Includes 2 in-depth carousels (up to 7 slides each)',
          'Ad banner variations (Square 1:1, Story 9:16, Display 16:9)',
          'Editable Canva / Figma master templates',
        ],
        revisions: 'Unlimited Revisions',
        timeline: '4 – 5 Days',
        isFeatured: true,
        ctaText: 'Order Growth Pack',
      },
      {
        tierName: 'Monthly Design Retainer',
        price: 'Starting from ₹12,999 / mo',
        subtitle: 'Dedicated studio design bandwidth on monthly retainer.',
        deliverables: [
          '30+ Custom creatives per month',
          'Priority 24-hour turnaround on urgent graphics',
          'Direct WhatsApp creative director access',
          'Strategic quarterly visual reviews',
        ],
        revisions: 'Unlimited Revisions',
        timeline: 'Ongoing Monthly Support',
        ctaText: 'Partner with Studio',
      },
    ],
    additionalCharges: [
      { title: 'Animated GIF / Micro-motion per post', price: '₹750 / post' },
      { title: 'Copywriting & Caption Hooks', price: '₹1,500 / pack' },
      { title: 'Same-day 6-hour Ad Emergency Turnaround', price: '₹950' },
    ],
  },
];
