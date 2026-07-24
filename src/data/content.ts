export const brand = {
  name: "Smile Media",
  tagline: "We Build. We Create.",
  location: "Colombo, Sri Lanka",
  website: "http://www.SmileMedia.lk",
  phone: "0779644946",
  address: "131, Thimbirigasyaya Rd, Colombo 05",
  year: 2025,
};

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#success-stories", label: "Stories" },
  { href: "#difference", label: "About" },
  { href: "#vision", label: "Vision" },
  { href: "#portfolio", label: "Work" },
  { href: "#contact", label: "Get In Touch", cta: true },
];

export const hero = {
  eyebrow: "Digital Marketing Agency · Colombo, Sri Lanka",
  headline: ["WE BUILD.", "WE CREATE."],
  sub: "Transforming ideas into powerful designs and strategies that make brands unforgettable.",
  stats: [
    { num: "5+", label: "Service Lines" },
    { num: "360°", label: "Brand Strategy" },
    { num: "LK", label: "Colombo Based" },
  ],
  slides: [
    {
      title: ["CREATIVE", "DEVELOPMENT"] as [string, string],
      image: "/assets/images/hero-slides/01-creative-development.png",
    },
    {
      title: ["CREATIVE", "STRATEGY"] as [string, string],
      image: "/assets/images/hero-slides/02-creative-strategy.png",
    },
    {
      title: ["PRODUCTION", "HOUSE"] as [string, string],
      image: "/assets/images/hero-slides/03-production-house.png",
    },
    {
      title: ["BTL", "ACTIVITIES"] as [string, string],
      image: "/assets/images/hero-slides/04-btl-activities.jpg",
    },
    {
      title: ["WEB", "DEVELOPMENT"] as [string, string],
      image: "/assets/images/hero-slides/05-web-development.png",
    },
    {
      title: ["OTHER", "SERVICES"] as [string, string],
      image: "/assets/images/hero-slides/06-other-services.png",
    },
  ],
};

export const marqueeItems = [
  "Campaign Development",
  "Graphic Design",
  "Brand Identity",
  "TV Commercials",
  "Social Media Strategy",
  "BTL Activations",
  "Corporate Events",
  "OOH Advertising",
  "Digital Printing",
  "Script Writing",
  "Web Development",
];

export const services = [
  {
    num: "01",
    name: "Creative Development",
    image: "/assets/images/modern-workspace-setup.png",
    items: [
      "Campaign Development",
      "Copywriting & Content",
      "Graphic Design",
      "Brand Identity & Design",
      "Script Writing",
    ],
  },
  {
    num: "02",
    name: "Creative Strategy",
    image: "/assets/images/creative-workspace-scene.png",
    items: [
      "Social Media Strategy",
      "Communication Strategy",
      "Content Strategy",
    ],
  },
  {
    num: "03",
    name: "Production House",
    image: "/assets/images/studio-cameraman-scene.png",
    items: [
      "TV Commercials",
      "Product Demos",
      "Corporate Videos",
      "Social Media Video Ads",
    ],
  },
  {
    num: "04",
    name: "BTL Activities",
    image: "/assets/images/disco-ball-celebration.png",
    items: [
      "Corporate Events",
      "Exhibitions",
      "BTL Activations",
      "Street Promotions",
    ],
  },
  {
    num: "05",
    name: "Web Development",
    image: "/assets/images/coding-workspace-setup.png",
    items: [
      "Website Development",
      "Landing Pages",
      "E-Commerce Sites",
      "Web Applications",
      "SEO Optimization",
    ],
  },
  {
    num: "06",
    name: "Other Services",
    image: "/assets/images/stack-of-gift-boxes.png",
    items: [
      "Corporate Gifts",
      "Branding",
      "Offset & Digital Printing",
      "OOH",
    ],
  },
];

export const successStories = [
  {
    id: "baseus-giveaway",
    tab: "Baseus Power Bank Giveaway",
    client: "Baseus",
    logo: "/assets/images/company_logos/basues.svg",
    title: "Campaign Spotlight: Power Bank Giveaway",
    type: "Social Media · Contest · Instagram & Facebook",
    tags: ["Brand Awareness", "Follower Growth", "Paid + Organic"],
    body: [
      "Our agency executed a highly engaging social media campaign for Baseus, designed to boost brand awareness, drive follower growth, and increase audience engagement across Instagram and Facebook.",
      "Users entered a contest to win a Baseus Power Bank worth Rs. 8,000 by following the brand's social handles and engaging with shareable creative — combining striking visuals with targeted ad placements for maximum reach.",
    ],
    highlights: {
      title: "Campaign Highlights",
      items: [
        "Exceeded KPI targets of 2–2.5 million impressions",
        "400+ active participants with strong organic engagement",
        "Performance-driven social campaign with measurable conversion",
      ],
    },
    stats: [
      { num: "2.04", unit: "M+", label: "Impressions" },
      { num: "14.3", unit: "K", label: "Total Engagement" },
      { num: "600", unit: "+", label: "New Followers" },
      { num: "1,764", label: "Comments & Saves" },
      { num: "1,200", label: "Web Visits" },
      { num: "400", unit: "+", label: "Active Participants" },
    ],
    footnote:
      "Creativity meets measurable results — a contest format that captured attention and converted engagement into lasting audience growth.",
  },
  {
    id: "baseus-launch",
    tab: "Baseus Sri Lanka Launch",
    client: "Baseus · Trident Corporation",
    logo: "/assets/images/company_logos/basues.svg",
    title: "Sri Lanka Launch Awareness Campaign",
    type: "Brand Launch · Digital Awareness · Multi-Channel",
    tags: ["Market Entry", "Premium Positioning", "Audience Targeting"],
    body: [
      "To support the launch of Baseus in Sri Lanka, we developed and executed a comprehensive awareness campaign to introduce the brand locally, establish credibility, and drive engagement across digital platforms.",
      "The campaign communicated Baseus' premium mobile accessories ecosystem and its status as an officially authorized brand distributed through Trident Corporation — using high-impact creative and precise audience targeting.",
    ],
    highlights: {
      title: "Campaign Objectives",
      items: [
        "Increase brand awareness and market visibility",
        "Introduce the Baseus product ecosystem to Sri Lankan consumers",
        "Grow the brand's social media community and digital traffic",
      ],
    },
    stats: [
      { num: "2.55", unit: "M+", label: "Impressions" },
      { num: "1.92", unit: "M+", label: "Reach" },
      { num: "5,300", label: "Facebook Account Visits" },
      { num: "1,200", label: "Instagram Account Visits" },
      { num: "1,200", label: "Website Visits" },
      { num: "683", label: "New Followers (FB + IG)" },
    ],
    footnote:
      "Successfully positioned Baseus as a premium tech accessories brand in Sri Lanka — building a strong foundation for future sales and community growth.",
  },
  {
    id: "abans-tiktok",
    tab: "Abans TikTok Campaign",
    client: "Abans",
    logo: "/assets/images/company_logos/abans.jpg",
    title: "TikTok Engagement Campaign",
    type: "TikTok · Influencer · Community Building",
    tags: ["Gen Z Audience", "Influencer Collabs", "User Participation"],
    body: [
      "We conceptualized and executed an interactive TikTok campaign to strengthen Abans' presence among younger, digitally engaged audiences — combining user participation, influencer collaborations, and content amplification.",
      "Entertaining, shareable content encouraged audience interaction while influencer partnerships extended reach — growing the Abans TikTok community from a smaller base to 828 followers with substantial video performance.",
    ],
    highlights: {
      title: "Campaign Objectives",
      items: [
        "Increase brand awareness among younger audiences",
        "Grow the Abans TikTok community through interactive content",
        "Amplify reach via influencer-driven collaborations",
      ],
    },
    stats: [
      { num: "1.18", unit: "M+", label: "Total Video Views" },
      { num: "732", unit: "K+", label: "Total Reach" },
      { num: "597", label: "New TikTok Followers" },
      { num: "59", unit: "K+", label: "Influencer Collaboration Views" },
      { num: "100", unit: "+", label: "Audience Interactions" },
      { num: "828", label: "Total TikTok Followers" },
    ],
    footnote:
      "Established a stronger Abans presence on one of the fastest-growing platforms — social-first experiences that drive measurable growth and active communities.",
  },
];

export const campaignBanner = {
  slides: [
    "/assets/images/car.png",
    "/assets/images/samples/Dynamic Sports Car.png",
    "/assets/images/samples/Pink Jeep in Desert Landscape.png",
    "/assets/images/car2.png",
    "/assets/images/samples/Futuristic Portrait Art.png",
    "/assets/images/samples/Urban Pose with Fire Hydrant.png",
  ],
  headline: ["IDEAS THAT", "IGNITE.", "BRANDS", "THAT", "LAST."],
  sub: "Every campaign we craft is built to be remembered — from the first impression to the final conversion.",
  stats: [
    { num: "200", suffix: "+", label: "Campaigns Delivered" },
    { num: "80", suffix: "+", label: "Brands Elevated" },
    { num: "4", suffix: "×", label: "Avg. ROI Multiplier" },
  ],
};

export const difference = {
  eyebrow: "Our Advantage",
  title: ["WHAT MAKES US", "DIFFERENT"],
  sub: "Transforming ideas into powerful designs and strategies that make brands unforgettable.",
  cards: [
    {
      num: "01",
      title: "Integrated Approach",
      text: "We combine strategy, creativity and analytics to deliver results.",
    },
    {
      num: "02",
      title: "Agile Execution",
      text: "Our agile team can adapt quickly without compromising quality.",
    },
    {
      num: "03",
      title: "Results Matter",
      text: "We focus on what truly drives growth — engagement, leads, conversations, and ROI. Every service is measured and optimized for real, trackable results.",
    },
    {
      num: "04",
      title: "Passionate Team, Positive Culture",
      text: "Fueled by creativity and committed to excellence, we make every client feel uniquely valued.",
    },
    {
      num: "05",
      title: "We Make You Smile",
      text: "When you work with Smile Media, you're not just getting an agency — you're gaining a creative ally who genuinely wants to see you succeed.",
    },
  ],
};

export const portfolio = {
  eyebrow: "Creative Work",
  title: "OUR ARTISTRY",
  sub: "Flyers, banners, brand identities & digital campaigns — crafted to stop the scroll.",
  filters: ["All", "Flyers", "Banners", "Branding", "Digital"],
  items: [
    {
      tag: "Product Launch Flyer",
      title: "Bold New World Campaign",
      image: "/assets/images/samples/Silhouette on Red.png",
      grid: "bc-1",
    },
    {
      tag: "Social Media Post",
      title: "Fashion Brand Square",
      image: "/assets/images/samples/lap.png",
      grid: "bc-2",
    },
    {
      tag: "Infographic",
      title: "Campaign Performance Card",
      image: "/assets/images/samples/Modern Watch Display.png",
      grid: "bc-3",
    },
    {
      tag: "Event Poster",
      title: "Brand Futures Summit 2025",
      image: "/assets/images/samples/Futuristic Human Fusion.png",
      grid: "bc-4",
    },
    {
      tag: "Brand Identity",
      title: "Nexus Co. Logo & Identity",
      image: "/assets/images/samples/Futuristic Portrait Art.png",
      grid: "bc-5",
    },
    {
      tag: "Digital Banner Ad",
      title: "Launch Season Promo Banner",
      image: "/assets/images/samples/Dynamic Sports Car.png",
      grid: "bc-6",
    },
    {
      tag: "Digital Campaign",
      title: "Brand Elevation Series",
      image: "/assets/images/samples/manonlp2.png",
      grid: "bc-7",
    },
    {
      tag: "OOH · Billboard",
      title: "Outdoor Impact Campaign",
      image: "/assets/images/samples/Pink Jeep in Desert Landscape.png",
      grid: "bc-8",
    },
    {
      tag: "Fashion Editorial",
      title: "Green Ensemble Lookbook",
      image: "/assets/images/samples/Elegant Green Ensemble.png",
      grid: "bc-9",
    },
    {
      tag: "Lifestyle Campaign",
      title: "Urban Street Style",
      image: "/assets/images/samples/Urban Pose with Fire Hydrant.png",
      grid: "bc-10",
    },
    {
      tag: "Product Feature",
      title: "Sneaker Aesthetic Drop",
      image: "/assets/images/samples/Green Sneakers Aesthetic.png",
      grid: "bc-11",
    },
    {
      tag: "Social Reel Cover",
      title: "Creative Studio Session",
      image: "/assets/images/samples/manonlap.png",
      grid: "bc-12",
    },
  ],
  stats: [
    { num: "200", suffix: "+", label: "Projects Delivered" },
    { num: "80", suffix: "+", label: "Happy Clients" },
    { num: "5", suffix: "★", label: "Client Satisfaction" },
    { num: "360", suffix: "°", label: "Creative Coverage" },
  ],
};

export const webWork = {
  eyebrow: "Web Development",
  title: ["WEBSITES", "WE BUILT"],
  sub: "Live websites we've designed and developed — built fast, optimized for search, and crafted to convert.",
  sites: [
    {
      num: "01",
      url: "https://baseussl.lk",
      domain: "baseussl.lk",
      tag: "E-Commerce · Mobile Accessories",
      image: "/assets/images/Web_snaps/baseus_snap.png",
      desc: "Official Baseus storefront for Sri Lanka — premium mobile accessories with a seamless shopping experience.",
    },
    {
      num: "02",
      url: "https://ultracare.lk",
      domain: "ultracare.lk",
      tag: "IT Services · Repairs & Accessories",
      image: "/assets/images/Web_snaps/ultra.png",
      desc: "An IT service center website for device repairs and accessory sales — built to showcase services and drive in-store visits.",
    },
    {
      num: "03",
      url: "https://farbe.lk",
      domain: "farbe.lk",
      tag: "AI Technologies · Computer Vision",
      image: "/assets/images/Web_snaps/farbe.png",
      desc: "Corporate site for an AI-focused tech startup — showcasing R&D across computer vision, remote sensing, multispectral imaging, and intelligent automation.",
    },
    {
      num: "04",
      url: "https://colombocolts.lk",
      domain: "colombocolts.lk",
      tag: "Sports Club · Cricket",
      image: "/assets/images/Web_snaps/colombo_colts.png",
      desc: "Official website for Colombo Colts Cricket Club — heritage, fixtures, academy, and membership for a premier League Division A club.",
    },
  ],
};

export const visionMission = {
  eyebrow: "Who We Are",
  title: ["OUR PURPOSE &", "DIRECTION"],
  manifesto: [
    { num: "01", text: "Strategy before execution" },
    { num: "02", text: "Creative grounded in data" },
    { num: "03", text: "Every campaign built to be remembered" },
  ],
  vision: {
    title: "OUR VISION",
    text: "At Smile Media Agency, we aim to redefine business engagement with innovative media strategies, combining creativity and technology to connect brands with consumers and drive measurable results.",
    pillars: ["Innovation Led", "Tech & Creativity", "Measurable Impact"],
    cta: "The future we're building",
  },
  mission: {
    title: "OUR MISSION",
    text: "Our mission at Smile Media Agency is to elevate brands with strategic, data driven media solutions, delivering innovative campaigns that engage audiences and drive impactful growth.",
    pillars: ["Strategic Solutions", "Data Driven", "Growth Focused"],
    cta: "How we get there",
  },
  marquee: [
    "Purpose",
    "Vision",
    "Mission",
    "Direction",
    "Impact",
    "Strategy",
    "Creativity",
    "Growth",
  ],
};

export const contact = {
  eyebrow: "Get In Touch",
  title: ["LET'S BUILD", "SOMETHING", "GREAT."],
  desc: "Ready to transform your brand? Reach out to our team and let's start creating something unforgettable together.",
  cards: [
    {
      num: "01",
      label: "Our Website",
      value: "www.SmileMedia.lk",
      href: "http://www.SmileMedia.lk",
      action: "Visit",
    },
    {
      num: "02",
      label: "Book Us",
      value: "0779644946",
      href: "tel:0779644946",
      action: "Call",
    },
    {
      num: "03",
      label: "Address",
      value: "131, Thimbirigasyaya Rd, Colombo 05",
      href: "https://maps.google.com/?q=131+Thimbirigasyaya+Road+Colombo+05",
      action: "Map",
    },
  ],
  meta: [
    { label: "Reply Within", value: "24 Hours" },
    { label: "Based In", value: "Colombo, LK" },
    { label: "Working Hours", value: "Mon–Fri · 9–6" },
  ],
  socials: ["Fb", "Ig", "In", "Yt", "Tt"],
  closing: "Have an idea? Let's bring it to life.",
};
