import { ServiceItem, GalleryProject, BusinessHoursState, FaqItem, WhatsAppContext, WhatsAppInput } from '../types';
import { loadCmsProjects, GALLERY_CATEGORIES, getFullResolutionImageUrl } from './projects';

export { GALLERY_CATEGORIES, getFullResolutionImageUrl } from './projects';
export type { WhatsAppContext, WhatsAppInput } from '../types';

export const BUSINESS_INFO = {
  name: 'Mashallah Welding Works',
  tagline: 'Custom Iron Fabrication, Welding & Repair Works',

  // Primary Customer-Facing Contact (Enquiries, Quotes & On-Site Visits)
  primaryContact: {
    name: 'Karimulla C.',
    role: 'Lead Fabricator / Enquiries',
    phone: '9553217643',
    phoneFormatted: '+91 95532 17643',
    phoneTel: 'tel:9553217643',
    whatsappNumber: '919440658955',
  },

  // Proprietor
  proprietorContact: {
    name: 'Abdul Sattar',
    role: 'Proprietor',
    phone: '9000491853',
    phoneFormatted: '+91 90004 91853',
    phoneTel: 'tel:9000491853',
  },

  // Helper references
  proprietor: 'Abdul Sattar',
  proprietorPhone: '9000491853',
  proprietorPhoneFormatted: '+91 90004 91853',
  proprietorPhoneTel: 'tel:9000491853',

  leadFabricator: 'Karimulla C.',
  leadFabricatorPhone: '9553217643',
  leadFabricatorPhoneFormatted: '+91 95532 17643',
  leadFabricatorPhoneTel: 'tel:9553217643',

  // Default customer-facing enquiry phone & WhatsApp
  phone: '9553217643',
  phoneFormatted: '+91 95532 17643',
  phoneTel: 'tel:9553217643',
  whatsappNumber: '919440658955',
  whatsappDefaultMsg: 'Hello Mashallah Welding Works, I would like to ask about welding and fabrication work.',
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
    slug: 'iron-gates',
    title: 'Gates & Doors',
    shortDescription: 'Custom main gates, sliding gates, double-leaf swing gates, and safety doors.',
    category: 'residential',
    description: 'Strong main gates, sliding gates, and entrance doors custom made for your home or property in Proddatur.',
    heroHeadline: 'Custom Steel Gates in Proddatur',
    heroDescription: 'Custom main gates, sliding gates, swing gates, and safety gates fabricated based on your size and preferred design. Send us a reference photo or measurements to get started.',
    features: ['Custom size and design', 'Rust-resistant coating', 'Strong locks and hinges', 'Free fitting in Proddatur'],
    iconName: 'Shield',
    projectCategorySlug: 'gates-doors',
    commonOptions: ['Main Swing Gates', 'Sliding Gates with Ground Track', 'Double-Leaf Entrance Gates', 'Compound Wall Safety Gates', 'Pedestrian Entry Wicket Gates'],
    quoteFactors: ['Dimensions (Width × Height in feet)', 'Steel section/thickness & tube gauge', 'Design complexity (ornamental vs minimalist)', 'Rust-inhibiting primer & enamel paint finish', 'Ground anchor & on-site fitting requirements'],
    ctaText: 'Send Gate Design & Get Quote',
    whatsappIntent: 'gate',
  },
  {
    id: 'iron-grills',
    slug: 'iron-grills',
    title: 'Window Grills',
    shortDescription: 'Solid iron safety grills for residential windows, balconies, and open areas.',
    category: 'residential',
    description: 'Strong safety grills for windows, balconies, and open areas engineered to protect your home in Proddatur.',
    heroHeadline: 'Window & Safety Grills in Proddatur',
    heroDescription: 'Heavy-duty solid iron safety grills for windows, balconies, and ventilators. Fabricated with clean patterns, child-safe spacing, and sturdy wall mounting.',
    features: ['Solid iron safety bars', 'Clean, modern patterns', 'Rust-resistant paint', 'Firm wall fitting'],
    iconName: 'Grid',
    projectCategorySlug: 'window-safety-grills',
    commonOptions: ['Standard Window Safety Grills', 'Balcony Protective Grills', 'Box Grills with Planter Space', 'Modern Horizontal/Vertical Bar Patterns', 'Heavy Solid Square Bar Grills'],
    quoteFactors: ['Total window area (sq. ft.)', 'Square bar / flat iron thickness', 'Bar density & safety spacing', 'Protective paint finish', 'Number of window openings'],
    ctaText: 'Send Grill Design & Get Quote',
    whatsappIntent: 'grill',
  },
  {
    id: 'railings',
    slug: 'railings',
    title: 'Railings',
    shortDescription: 'Safe, sturdy handrails and railings for staircases, balconies, and open terraces.',
    category: 'residential',
    description: 'Safe, sturdy handrails and railings for staircases, balconies, and open terraces across Proddatur.',
    heroHeadline: 'Staircase & Balcony Railings in Proddatur',
    heroDescription: 'Architectural and safety railings fabricated to exact stair angles and terrace lengths. Smooth hand grips, rigid mounting, and durable weather coating.',
    features: ['Easy hand grip', 'Safe spacing for children', 'Built for outdoor weather', 'Strong floor mounting'],
    iconName: 'Layers',
    projectCategorySlug: 'railings-staircases',
    commonOptions: ['Internal Staircase Handrails', 'Outdoor Step Handrails', 'Balcony Safety Railings', 'Terrace Perimeter Guards', 'Modern Geometric Bar Railings'],
    quoteFactors: ['Total running length (linear feet)', 'Handrail pipe diameter & post thickness', 'Child-safe bar spacing', 'Indoor vs outdoor weather-resistant finish', 'Level vs stepped stair mounting'],
    ctaText: 'Send Railing Design & Get Quote',
    whatsappIntent: 'railing',
  },
  {
    id: 'iron-repair-works',
    slug: 'iron-repair-works',
    title: 'Welding Repairs',
    shortDescription: 'Broken hinge, damaged grill, loose railing or welding failure? Fast local repair.',
    category: 'repair',
    description: 'Quick fixing for broken gates, rusted hinges, loose grills, and damaged iron items.',
    heroHeadline: 'Welding & Gate Repairs in Proddatur',
    heroDescription: 'Broken hinge, damaged grill, loose railing, broken tank stand or welding failure? Send us a photo of the problem on WhatsApp for fast diagnosis and repair assistance.',
    features: ['Fixing broken hinges and locks', 'Re-welding loose joints', 'Rust patch repairs', 'Fast visits in Proddatur'],
    iconName: 'Wrench',
    projectCategorySlug: 'welding-repairs',
    commonOptions: ['Gate Hinge Replacement & Realignment', 'Re-welding Broken Joints & Anchors', 'Rusted Section Cut & Steel Patching', 'Lock Bracket & Latch Replacement', 'Door Frame Strengthening & Wheel Repairs'],
    quoteFactors: ['Nature and extent of damage', 'On-site welding visit vs workshop fixing', 'Replacement steel material needed', 'Location in Proddatur'],
    ctaText: 'Send Repair Photo',
    whatsappIntent: 'repair',
  },
  {
    id: 'small-industrial-fabrication',
    slug: 'small-industrial-fabrication',
    title: 'Sheds & Roofing',
    shortDescription: 'Sturdy roof shed frames, truss work, and steel structures for homes and workshops.',
    category: 'industrial',
    description: 'Sturdy roof shed frames, machine stands, and steel structures for workshops and homes in Proddatur.',
    heroHeadline: 'Shed & Roofing Fabrication in Proddatur',
    heroDescription: 'Durable steel truss frames, GI sheet roofing structures, terrace sun shades, and vehicle parking sheds engineered for high wind resistance.',
    features: ['Roofing sheet frame structures', 'Heavy machine mounting stands', 'Strong steel support beams', 'Sturdy on-site assembly'],
    iconName: 'Factory',
    projectCategorySlug: 'sheds-roofing',
    commonOptions: ['Terrace Roofing Sheds', 'Car & Bike Parking Sheds', 'Shopfront Awning Frames', 'Industrial Godown Trusses', 'Sunshade Canopies'],
    quoteFactors: ['Roof span and covered area (sq. ft.)', 'Pillar pipe gauge and truss section size', 'Sheet material (GI, colour-coated or polycarbonate)', 'Height and site anchoring conditions'],
    ctaText: 'Send Shed Specs & Get Quote',
    whatsappIntent: 'shed',
  },
  {
    id: 'iron-stands',
    slug: 'iron-stands',
    title: 'Steel Racks & Stands',
    shortDescription: 'Heavy-duty stands for water tanks, AC units, machinery, and commercial storage racks.',
    category: 'fabrication',
    description: 'Heavy-duty stands for water tanks, AC units, machinery, and commercial storage racks.',
    heroHeadline: 'Steel Racks & Tank Stands in Proddatur',
    heroDescription: 'Engineered heavy-gauge stands for overhead water tanks, AC outdoor compressors, shop inventory shelves, and heavy-duty industrial workbenches.',
    features: ['Holds heavy water tanks and ACs', 'Strong angle-iron frame', 'Shop storage racks', 'Firmly balanced and painted'],
    iconName: 'Box',
    projectCategorySlug: 'steel-racks-stands',
    commonOptions: ['Overhead Water Tank Stands (500L–2000L)', 'Heavy Storage Racks for Shops', 'Outdoor AC Compressor Wall Brackets', 'Workshop Heavy Workbenches', 'Commercial Display Racks'],
    quoteFactors: ['Total weight / volume load requirement', 'Angle-iron vs hollow tube thickness', 'Number of tiers/shelves and dimensions', 'Anti-rust weather primer & paint'],
    ctaText: 'Send Rack Specs & Get Quote',
    whatsappIntent: 'stand',
  },
  {
    id: 'metal-doors',
    slug: 'metal-doors',
    title: 'Metal Doors',
    shortDescription: 'Durable sheet metal doors, safety mesh doors, and secure entrance doors.',
    category: 'commercial',
    description: 'Durable sheet metal doors, safety mesh doors, and secure entrance doors for shops and homes.',
    heroHeadline: 'Metal & Safety Doors in Proddatur',
    heroDescription: 'Heavy-gauge steel doors, wire mesh mosquito/security doors, and back entrance safety doors built for high security and long-lasting durability.',
    features: ['Thick iron sheet metal', 'Strong locks and latches', 'Extra safety wire mesh', 'Custom frame sizes'],
    iconName: 'DoorClosed',
    projectCategorySlug: 'gates-doors',
    commonOptions: ['Heavy Sheet Metal Entrance Doors', 'Perforated Mesh Security Doors', 'Double-Door Safety Grille Gate', 'Shop Utility & Back Doors', 'Louvered Ventilation Doors'],
    quoteFactors: ['Door frame width & height', 'Sheet gauge (16G / 18G) and tube thickness', 'Lock brackets and handle hardware', 'Rust-resistant finish'],
    ctaText: 'Send Door Specs & Get Quote',
    whatsappIntent: 'door',
  },
  {
    id: 'school-furniture',
    slug: 'school-furniture',
    title: 'Benches & Desks',
    shortDescription: 'Durable steel desk-bench sets, tables, and study furniture made to order for schools.',
    category: 'commercial',
    description: 'Durable steel desk-bench sets, tables, and study furniture made to order for schools and colleges.',
    heroHeadline: 'School & College Furniture in Proddatur',
    heroDescription: 'Heavy-gauge steel desk-bench combined sets, classroom study tables, and institutional seating built with child-safe deburred edges and welded durability.',
    features: ['Heavy-gauge square tube frames', 'Smooth wood or steel top fixing', 'Child-safe deburred edges', 'Bulk order delivery in Proddatur'],
    iconName: 'School',
    projectCategorySlug: 'school-college-furniture',
    commonOptions: ['Dual Student Desk-Bench Combined Sets', 'Three-Seater Classroom Benches', 'Teacher Podium & Lecture Tables', 'Library Reading Tables', 'Heavy Storage Cupboards'],
    quoteFactors: ['Quantity & batch size', 'Square tube gauge & dimensions', 'Wooden/laminate board vs steel top', 'Paint finish & bulk delivery'],
    ctaText: 'Request Furniture Quote',
    whatsappIntent: 'furniture',
  },
  {
    id: 'custom-iron-fabrication',
    slug: 'custom-iron-fabrication',
    title: 'Custom Steel Work',
    shortDescription: 'Custom gates, grills, railings, racks, and other steel work made to your needs.',
    category: 'fabrication',
    description: 'Custom gates, grills, railings, racks, and other steel work made to your needs.',
    heroHeadline: 'Custom Steel Fabrication in Proddatur',
    heroDescription: 'Bring us any reference photo, Pinterest idea, or hand sketch. We cut, weld, grind, and finish custom metal structures to your exact specifications.',
    features: ['Made from your photo or sketch', 'Free measurement visit', 'Choose your steel thickness', 'Clear upfront price'],
    iconName: 'Compass',
    projectCategorySlug: 'custom-fabrication',
    commonOptions: ['Custom Architectural Ironwork', 'Decorative Boundary Screens', 'Arched Entryway Frames', 'Custom Plant Stands & Planters', 'Bespoke Brackets & Structural Fittings'],
    quoteFactors: ['Dimensions & material specifications', 'Complexity of cuts, curves & decorative details', 'Type of steel (mild steel, sheet, square bar)', 'Finish requirements'],
    ctaText: 'Send Custom Idea & Get Quote',
    whatsappIntent: 'custom',
  },
  {
    id: 'welding-works',
    slug: 'welding-works',
    title: 'Custom Welding Work',
    shortDescription: 'General welding and metal making for any iron item, frame, or bracket you need.',
    category: 'fabrication',
    description: 'General welding and metal making for any iron item, frame, or bracket you need in Proddatur.',
    heroHeadline: 'General Welding Services in Proddatur',
    heroDescription: 'Clean, strong arc welding for any iron item, bracket, structural frame, or custom metal requirement at our workshop or doorstep.',
    features: ['Clean, strong weld joints', 'Workshop or doorstep work', 'Any custom shape or size', 'Quick turnaround'],
    iconName: 'Flame',
    projectCategorySlug: 'custom-fabrication',
    commonOptions: ['Structural Arc Welding', 'Bracket & Hanger Fabrication', 'Equipment Frame Re-inforcing', 'Pillar & Beam Mounting Plates', 'Workshop Custom Metal Cutting'],
    quoteFactors: ['Job scale & welding rod requirements', 'Steel thickness and joint preparation', 'Doorstep visit vs workshop execution'],
    ctaText: 'Send Welding Specs & Get Quote',
    whatsappIntent: 'welding',
  },
  {
    id: 'residential-iron-works',
    slug: 'residential-iron-works',
    title: 'Home Iron Work',
    shortDescription: 'Complete ironwork for independent houses, villas, and apartments from gates to window grills.',
    category: 'residential',
    description: 'Complete ironwork for independent houses, villas, and apartments from gates to window grills.',
    heroHeadline: 'Full Home Ironwork in Proddatur',
    heroDescription: 'Complete ironwork packages for newly constructed independent houses, villas, and renovations. Matching main gates, window grills, stair railings, and safety doors.',
    features: ['Full house iron packages', 'Matching gate and grill designs', 'Smooth finish with no sharp edges', 'Direct maker prices'],
    iconName: 'Home',
    projectCategorySlug: 'gates-doors',
    commonOptions: ['Full House Matching Gate + Grill Package', 'Boundary Wall Safety Grills', 'Internal + External Railings', 'Terrace Overhead Water Tank Stands', 'Safety Backdoor Installation'],
    quoteFactors: ['Total scope of house items', 'Coordinated design pattern selection', 'Steel thickness across items', 'Free measurement visit & package pricing'],
    ctaText: 'Request Full Home Quote',
    whatsappIntent: 'home-package',
  },
  {
    id: 'commercial-iron-works',
    slug: 'commercial-iron-works',
    title: 'Shop & Office Work',
    shortDescription: 'Durable steel fabrication for retail shops, godowns, offices, and commercial spaces.',
    category: 'commercial',
    description: 'Durable steel fabrication for retail shops, godowns, offices, and commercial spaces in Proddatur.',
    heroHeadline: 'Shop & Commercial Steel Work in Proddatur',
    heroDescription: 'Durable steel fabrication built for high commercial foot traffic and heavy rough use. Shopfront frames, rolling frames, godown storage racks, and safety shutters.',
    features: ['Shopfront rolling frames and gates', 'Heavy storage and display racks', 'Shade and awning frames', 'Built for daily rough use'],
    iconName: 'Briefcase',
    projectCategorySlug: 'steel-racks-stands',
    commonOptions: ['Shop Entrance Grille Gates', 'Godown Heavy Storage Racks', 'Store Display Shelving', 'Awning & Signboard Support Frames', 'Air Conditioner Security Cages'],
    quoteFactors: ['Commercial grade steel specification', 'Daily load requirements', 'Custom shop dimensions', 'Delivery & on-site fitting'],
    ctaText: 'Request Commercial Quote',
    whatsappIntent: 'commercial',
  },
];

const cmsProjects = loadCmsProjects();

export const FALLBACK_GALLERY_ITEMS: GalleryProject[] = [
  {
    id: 'proj-1',
    title: 'Copper-Finish Window Safety Grill with Twin S-Curve Design',
    category: 'window-safety-grills',
    categoryLabel: 'Window & Safety Grills',
    imageUrl: '/images/window-safety-grill-s-curve-design-proddatur-1.webp',
    imageAlt: 'Copper-finish window safety grill with twin S-curve bars and flower rosettes, fabricated in Proddatur',
    srcSetWebp: '/images/window-safety-grill-s-curve-design-proddatur-1-480.webp 480w, /images/window-safety-grill-s-curve-design-proddatur-1-768.webp 768w, /images/window-safety-grill-s-curve-design-proddatur-1.webp 1164w',
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
    title: 'Custom Heavy Duty Storage Rack',
    category: 'steel-racks-stands',
    categoryLabel: 'Steel Racks & Stands',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Custom steel storage rack fabricated by Mashallah Welding Works',
    description: 'Heavy-duty multi-tier welded steel storage rack engineered for commercial storerooms and workshop inventory.',
    specifications: 'Custom Welded Steel Frame • Multi-Tier Reinforced Shelves • Heavy Gauge MS Angle',
  },
];

export const CMS_PROJECTS: GalleryProject[] = cmsProjects;
export const GALLERY_ITEMS: GalleryProject[] = cmsProjects.length > 0 ? cmsProjects : FALLBACK_GALLERY_ITEMS;

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
    imageUrl: '/images/window-safety-grill-s-curve-design-proddatur-1-768.webp',
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

export function getWhatsAppMessage(input?: WhatsAppInput): string {
  if (!input) {
    return 'Hello Mashallah Welding Works, I would like to ask about welding and fabrication work.';
  }

  if (typeof input === 'string') {
    return input.trim() || 'Hello Mashallah Welding Works, I would like to ask about welding and fabrication work.';
  }

  switch (input.type) {
    case 'hero':
      return 'Hello Mashallah Welding Works, I’d like a quote. I’ll send my design/photo and approximate measurements here.';
    case 'project': {
      const urlInfo = input.projectUrl ? ` (${input.projectUrl})` : '';
      return `Hello Mashallah Welding Works, I’m interested in a design similar to "${input.projectName}"${urlInfo}. My location is ____. I’ll send my approximate size/photo below.`;
    }
    case 'service':
      return `Hello Mashallah Welding Works,\n\nI’d like a quote for ${input.serviceName}.${input.customNote ? `\nNote: ${input.customNote}` : ''}\n\nI’ll send my design/photo and approximate measurements here.`;
    case 'repair':
      return `Hello Mashallah Welding Works,\n\nI need a welding repair${input.details ? ` for: ${input.details}` : ''}.${input.location ? `\nLocation: ${input.location}` : ''}\n\nI’ll send a photo of the issue below.`;
    case 'quote_form': {
      const isRepair = input.requirement.toLowerCase().includes('repair');
      const locationLine = input.location?.trim() ? `Location: ${input.location.trim()}\n` : '';
      const noteLine = input.note?.trim() ? `Note: ${input.note.trim()}\n` : '';

      if (isRepair) {
        return `Hello Mashallah Welding Works,\n\nI need a welding repair.\n\n${locationLine}${noteLine}I'll send a photo of the issue below.`.replace(/\n\n\n+/g, '\n\n');
      }

      const reqFormatted = input.requirement.toLowerCase().startsWith('gate')
        ? 'a custom gate'
        : input.requirement.toLowerCase().startsWith('grill')
        ? 'custom window grills'
        : input.requirement.toLowerCase().startsWith('railing')
        ? 'custom railings'
        : input.requirement.toLowerCase().startsWith('shed')
        ? 'shed / structural work'
        : input.requirement;

      return `Hello Mashallah Welding Works,\n\nI'm looking for ${reqFormatted}.\n\n${locationLine}${noteLine}I'll send my design/photo and approximate measurements here.`.replace(/\n\n\n+/g, '\n\n');
    }
    case 'generic':
    default:
      return input.message?.trim() || 'Hello Mashallah Welding Works, I would like to ask about welding and fabrication work.';
  }
}

export function generateWhatsAppUrl(input?: WhatsAppInput): string {
  const message = getWhatsAppMessage(input);
  const text = encodeURIComponent(message);
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
