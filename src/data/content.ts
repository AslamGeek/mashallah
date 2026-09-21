import { ServiceItem, GalleryProject, BusinessHoursState, FaqItem, GalleryCategoryConfig } from '../types';

export const BUSINESS_INFO = {
  name: 'Mashallah Welding Works',
  tagline: 'Custom Iron Fabrication, Welding & Repair Works',
  proprietor: 'Abdul Sattar',
  phone: '9553217643',
  phoneFormatted: '+91 95532 17643',
  phoneTel: 'tel:9553217643',
  whatsappNumber: '919553217643',
  whatsappDefaultMsg: 'Hello Mashallah Welding Works, I would like to enquire about iron fabrication/welding work.',
  address: '11/276, MG, Lakshmi Nagar, Auto Nagar, Proddatur, Andhra Pradesh 516360',
  // Canonical Google Maps place: Mashallah Welding Works
  // Coordinates: 14.7410663, 78.5710838
  mapsUrl: 'https://maps.app.goo.gl/jNsuWLiv61PiG28G8',
  coordinates: {
    latitude: 14.7410663,
    longitude: 78.5710838,
  },
  pinterestUrl: 'https://in.pinterest.com/skarimulla2018',
  instagramUrl: 'https://www.instagram.com/karimulla955',
  hours: {
    monSat: '9:00 AM – 8:00 PM',
    sunday: '9:00 AM – 2:00 PM',
  },
  establishedText: 'Serving Proddatur & Auto Nagar with pride',
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'iron-gates',
    title: 'Iron Gates',
    category: 'residential',
    description: 'Heavy-duty decorative main entrance gates, sliding gates, double-swing gates, and boundary gates tailored to your property.',
    features: ['Custom height & width', 'Anti-rust primer coating', 'Heavy-gauge steel & hinges', 'Smooth ball-bearing sliding rollers'],
    iconName: 'Shield',
  },
  {
    id: 'iron-grills',
    title: 'Iron Grills',
    category: 'residential',
    description: 'Aesthetic and high-strength window safety grills, balcony guard grills, and ventilation security frames.',
    features: ['Square bar & flat iron options', 'Modern geometric & floral patterns', 'Burglar-proof anchor welding', 'Long-lasting paint finish'],
    iconName: 'Grid',
  },
  {
    id: 'railings',
    title: 'Railings',
    category: 'residential',
    description: 'Sturdy staircase handrails, terrace safety railings, and modern architectural balcony balustrades.',
    features: ['Ergonomic handrails', 'Staircase bend fabrication', 'Corrosion-resistant metal', 'Safe child-gap spacing'],
    iconName: 'Layers',
  },
  {
    id: 'metal-doors',
    title: 'Metal Doors',
    category: 'commercial',
    description: 'Durable sheet metal doors, safety iron mesh doors, collapsible security gates, and shop entrance doors.',
    features: ['Heavy-duty locking points', 'Sturdy sheet thickness', 'Reinforced frame borders', 'Precision fit with no gaps'],
    iconName: 'DoorClosed',
  },
  {
    id: 'iron-stands',
    title: 'Iron Stands',
    category: 'fabrication',
    description: 'Custom-built load-bearing stands for rooftop water tanks, outdoor AC units, generators, heavy machinery, and flower pots.',
    features: ['Engineered weight-bearing capacity', 'Heavy L-angle & channel bars', 'Cross-braced structural stability', 'Weather-resistant treatment'],
    iconName: 'Box',
  },
  {
    id: 'welding-works',
    title: 'Welding Works',
    category: 'fabrication',
    description: 'Precision electric arc welding, metal joinery, and structural reinforcement with deep penetration and clean slag removal.',
    features: ['Uniform weld bead quality', 'Heavy joint stress tolerance', 'On-site mobile welding service', 'All iron & mild steel grades'],
    iconName: 'Flame',
  },
  {
    id: 'iron-repair-works',
    title: 'Iron Repair Works',
    category: 'repair',
    description: 'Quick on-site and in-workshop repair services for broken gates, rusted hinges, damaged grills, loose railings, and cracked joints.',
    features: ['Hinge & latch replacement', 'Rust removal & reinforcement', 'Gate re-alignment & leveling', 'Prompt service visits'],
    iconName: 'Wrench',
  },
  {
    id: 'custom-iron-fabrication',
    title: 'Custom Iron Fabrication',
    category: 'fabrication',
    description: 'Bespoke metal structures engineered to your exact blueprints, sketch drawings, or Pinterest photos.',
    features: ['Custom dimensions & layout', 'Tailored metal thickness', 'Prototype & one-off builds', 'Strict quality inspection'],
    iconName: 'Compass',
  },
  {
    id: 'residential-iron-works',
    title: 'Residential Iron Works',
    category: 'residential',
    description: 'Complete ironwork solutions for independent homes, villas, and apartments—from entry gates to safety window boxes.',
    features: ['Enhances home security', 'Matches architectural theme', 'Clean ground finishing', 'Personalized consultations'],
    iconName: 'Home',
  },
  {
    id: 'commercial-iron-works',
    title: 'Commercial Iron Works',
    category: 'commercial',
    description: 'Heavy fabrication for retail shops, offices, commercial complexes, godowns, display stands, and entrance awnings.',
    features: ['High-traffic durability', 'Shopfront rolling frames & doors', 'Display shelving & storage', 'Compliant with safety rules'],
    iconName: 'Briefcase',
  },
  {
    id: 'small-industrial-fabrication',
    title: 'Small Industrial Fabrication Works',
    category: 'industrial',
    description: 'Sturdy structural frames, shed trusses, machine support fixtures, and custom metal fittings for workshops and small factories.',
    features: ['Heavy I-beam & channel steel', 'High load factor welding', 'Shed framework & supports', 'Industrial-grade durability'],
    iconName: 'Factory',
  },
];

export const GALLERY_CATEGORIES: GalleryCategoryConfig[] = [
  { slug: 'gates-doors', label: 'Steel Gates & Doors' },
  { slug: 'window-safety-grills', label: 'Window & Safety Grills' },
  { slug: 'railings-staircases', label: 'Railings & Staircases' },
  { slug: 'sheds-roofing', label: 'Sheds & Roofing' },
  { slug: 'steel-racks-stands', label: 'Steel Racks & Stands' },
  { slug: 'welding-repairs', label: 'Welding Repairs' },
  { slug: 'custom-fabrication', label: 'Custom Fabrication' },
];

export const GALLERY_ITEMS: GalleryProject[] = [
  {
    id: 'proj-1',
    title: 'Copper-Finish Window Safety Grill with Twin S-Curve Design',
    category: 'window-safety-grills',
    categoryLabel: 'Window & Safety Grills',
    imageUrl: '/images/projects/window-safety-grill-s-curve-design-proddatur.webp',
    imageAlt: 'Copper-finish window safety grill with twin S-curve bars and flower rosettes, fabricated in Proddatur',
    srcSetWebp: '/images/projects/window-safety-grill-s-curve-design-proddatur-480.webp 480w, /images/projects/window-safety-grill-s-curve-design-proddatur-768.webp 768w, /images/projects/window-safety-grill-s-curve-design-proddatur-1200.webp 1200w',
    description: 'Double-panel residential window safety grill featuring a warm copper-finish metal frame, symmetrical twin S-curve vertical bars, spherical finial beads, and decorative flower rosettes, installed within a light wooden frame and masonry wall.',
    specifications: 'Double-Panel Design • Twin S-Curve Bars • Spherical Finials • Decorative Flower Rosettes • Copper-Finish Coating • Residential Window Safety Grill',
  },
  {
    id: 'proj-2',
    title: 'Modern Geometric Main Entrance Gate',
    category: 'gates-doors',
    categoryLabel: 'Steel Gates & Doors',
    imageUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=1200&auto=format&fit=crop',
    description: 'Heavy-gauge mild steel entrance gate with clean geometric pattern, integrated pedestrian access door, and high-gloss anti-rust coating.',
    specifications: '14ft x 7ft • Heavy L-Angle Frame • 16-Gauge MS Sheet • Heavy Bearings',
  },
  {
    id: 'proj-3',
    title: 'Architectural Staircase & Balcony Railings',
    category: 'railings-staircases',
    categoryLabel: 'Railings & Staircases',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop',
    description: 'Ergonomically designed internal and external staircase handrails crafted for strong grip, smooth curves, and seamless welds.',
    specifications: 'Tubular Handrail • Vertical Spindle Bar Guard • Heavy Base Plate Fasteners',
  },
  {
    id: 'proj-4',
    title: 'Heavy Metal Security & Grill Door',
    category: 'gates-doors',
    categoryLabel: 'Steel Gates & Doors',
    imageUrl: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?q=80&w=1200&auto=format&fit=crop',
    description: 'Secondary safety door with double lock reinforcement, high-strength expanded metal mesh, and heavy-duty greaseable hinges.',
    specifications: '3.5ft x 7ft • Box Frame Structure • Multi-Point Godrej Lock Mount',
  },
  {
    id: 'proj-5',
    title: 'Heavy-Duty Water Tank & AC Stand',
    category: 'steel-racks-stands',
    categoryLabel: 'Steel Racks & Stands',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop',
    description: 'Four-leg cross-braced structural iron stand built to support 1000L rooftop water tanks and commercial outdoor AC chiller units.',
    specifications: '40x40x5mm Heavy Angle Iron • Cross-Tie Gusset Plates • Reinforced Structural Bracing',
  },
  {
    id: 'proj-6',
    title: 'Precision Arc & Structural Welding',
    category: 'custom-fabrication',
    categoryLabel: 'Custom Fabrication',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
    description: 'Continuous seam welding on structural framework for small industrial sheds with spotless slag cleaning and joint stress relief.',
    specifications: 'Shielded Metal Arc Welding (SMAW) • E6013 / E7018 Electrodes • Full Penetration',
  },
  {
    id: 'proj-7',
    title: 'Compound Wall Security Grills & Spikes',
    category: 'window-safety-grills',
    categoryLabel: 'Window & Safety Grills',
    imageUrl: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?q=80&w=1200&auto=format&fit=crop',
    description: 'Boundary wall perimeter grill extensions fitted with sharp spearhead tops to secure residential complexes and godowns.',
    specifications: 'Modular 10ft Sections • Wall Expansion Bolts • Dual Primer Protection',
  },
  {
    id: 'proj-8',
    title: 'Gate Re-alignment & Welding Repair',
    category: 'welding-repairs',
    categoryLabel: 'Welding Repairs',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop',
    description: 'On-site rehabilitation of sagging commercial gate: installed reinforced pivot pins, replaced rusted bottom channel, and re-welded rollers.',
    specifications: 'Completed On-Site • Realigned Sagging Frame & Reinforced Weld Joints',
  },
  {
    id: 'proj-9',
    title: 'Small Industrial Shed Truss & Frame',
    category: 'sheds-roofing',
    categoryLabel: 'Sheds & Roofing',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop',
    description: 'Engineered steel roof trusses and purlin brackets fabricated for Auto Nagar workshop expansion and material storage shed.',
    specifications: 'Tubular Steel & C-Channels • Pre-drilled Anchor Holes • Red Oxide Primer',
  },
  {
    id: 'proj-10',
    title: 'Custom Steel Storage Rack',
    category: 'steel-racks-stands',
    categoryLabel: 'Steel Racks & Stands',
    imageUrl: '/images/projects/custom-steel-storage-rack.webp',
    imageAlt: 'Custom steel storage rack fabricated by Mashallah Welding Works',
    description: 'Custom-fabricated steel storage rack for indoor storage.',
    specifications: 'Custom Welded Steel Frame • Multi-Tier Indoor Storage',
  },
];

export const PINTEREST_BOARDS = [
  {
    title: 'Modern Iron Gate Designs',
    count: '60+ Designs',
    imageUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=600&auto=format&fit=crop',
    description: 'Inspirations for modern sliding, swing, and contemporary laser-cut hybrid iron gates.',
  },
  {
    title: 'Window Safety Grill Patterns',
    count: '45+ Patterns',
    imageUrl: '/images/projects/window-safety-grill-s-curve-design-proddatur-768.webp',
    imageAlt: 'Copper-finish window safety grill with twin S-curve bars and flower rosettes, fabricated in Proddatur',
    description: 'Double-panel residential window safety grill with symmetrical twin S-curve bars, spherical finials, and decorative flower rosettes in copper finish.',
  },
  {
    title: 'Staircase & Balcony Railing Ideas',
    count: '50+ Ideas',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop',
    description: 'Sleek industrial and ornamental railing ideas to elevate interior and outdoor spaces.',
  },
];

/**
 * Calculates current business open/closed status explicitly in Asia/Kolkata timezone.
 * Mon-Sat: 9:00 AM - 8:00 PM (09:00 - 20:00)
 * Sun: 9:00 AM - 2:00 PM (09:00 - 14:00)
 */
export function getBusinessHoursStatus(date: Date = new Date()): BusinessHoursState {
  // Use native Intl.DateTimeFormat to evaluate the time in the workshop's local timezone (Asia/Kolkata)
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  });

  const parts = formatter.formatToParts(date);
  let weekday = '';
  let hours = 0;
  let minutes = 0;

  for (const part of parts) {
    if (part.type === 'weekday') weekday = part.value;
    if (part.type === 'hour') hours = parseInt(part.value, 10);
    if (part.type === 'minute') minutes = parseInt(part.value, 10);
  }

  const isSunday = weekday === 'Sun';
  const currentTimeInMinutes = hours * 60 + minutes;
  const openTimeMinutes = 9 * 60; // 9:00 AM
  const closeTimeMinutes = isSunday ? 14 * 60 : 20 * 60; // 2:00 PM on Sunday, 8:00 PM Mon-Sat

  const todayHours = isSunday ? '9:00 AM – 2:00 PM' : '9:00 AM – 8:00 PM';

  if (currentTimeInMinutes >= openTimeMinutes && currentTimeInMinutes < closeTimeMinutes) {
    const closingHourDisplay = isSunday ? '2:00 PM' : '8:00 PM';
    return {
      isOpen: true,
      statusText: 'Open Now',
      nextEvent: `Closes today at ${closingHourDisplay}`,
      todayHours,
    };
  } else {
    let nextOpening = 'Opens at 9:00 AM';
    if (currentTimeInMinutes >= closeTimeMinutes) {
      nextOpening = 'Opens tomorrow at 9:00 AM';
    }
    return {
      isOpen: false,
      statusText: 'Closed Now',
      nextEvent: nextOpening,
      todayHours,
    };
  }
}

export function generateWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage || BUSINESS_INFO.whatsappDefaultMsg);
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`;
}

export const FAQS_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What types of iron fabrication and welding works do you undertake?',
    answer:
      'We undertake complete residential, commercial, and small industrial ironworks. Our primary specializations include custom main entrance gates (swing and sliding), window safety grills, staircase and balcony railings, sheet metal doors, heavy water tank and AC stands, shed structural trusses, and on-site welding repairs.',
    category: 'general',
  },
  {
    id: 'faq-2',
    question: 'Can you fabricate custom designs from Pinterest, photos, or architectural drawings?',
    answer:
      'Yes, absolutely! Many of our clients share photos from Pinterest, Instagram, or architectural blueprints. You can share any design photo directly with us on WhatsApp. We will evaluate the structural requirements, recommend appropriate steel bar gauges, and fabricate it to your exact measurements.',
    category: 'custom',
  },
  {
    id: 'faq-3',
    question: 'Do you provide on-site measurement visits and cost estimates?',
    answer:
      'Yes, we provide on-site inspection and measurements across Proddatur, Auto Nagar, and surrounding localities in the YSR Kadapa district. We take exact measurements of your site openings and give you a clear, honest quotation before commencing fabrication.',
    category: 'custom',
  },
  {
    id: 'faq-4',
    question: 'Do you offer on-site mobile welding and repair services?',
    answer:
      'Yes! We have portable arc welding equipment and tools to perform on-site repairs at your home or business. We regularly handle broken gate hinges, re-align sagging gates, replace worn sliding rollers, fix loose railings, and secure window grills.',
    category: 'repairs',
  },
  {
    id: 'faq-5',
    question: 'What materials and anti-rust coatings do you use?',
    answer:
      'We use high-quality Mild Steel (MS) square bars, rectangular hollow pipes, heavy L-angles, and steel plates. All welded joints are de-slagged and buffed smooth, followed by thorough coating with zinc chromate / red oxide anti-rust primer to prevent corrosion in outdoor conditions.',
    category: 'materials',
  },
  {
    id: 'faq-6',
    question: 'How long does it take to complete an order?',
    answer:
      'Standard jobs like window grills, water tank stands, safety doors, or simple repairs are typically completed in 2 to 4 working days. Custom decorative main gates or complete home railing projects typically take 5 to 10 working days depending on design intricacy.',
    category: 'general',
  },
  {
    id: 'faq-7',
    question: 'What are your workshop working hours and where can I visit you?',
    answer:
      'We are located at 11/276, MG, Lakshmi Nagar, Auto Nagar, Proddatur, Andhra Pradesh 516360. Our workshop is open Monday through Saturday from 9:00 AM to 8:00 PM, and on Sundays from 9:00 AM to 2:00 PM. You are always welcome to stop by and discuss your requirements in person.',
    category: 'general',
  },
  {
    id: 'faq-8',
    question: 'How can I get started or request a quotation?',
    answer:
      'Simply give us a call or message us on WhatsApp with your requirements or design pictures. We will provide prompt guidance on pricing, material choices, and turnaround time.',
    category: 'custom',
  },
];
