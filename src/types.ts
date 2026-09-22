export interface ServiceItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'industrial' | 'repair' | 'fabrication';
  description: string;
  features: string[];
  iconName: string;
}

export type GalleryCategorySlug =
  | 'gates-doors'
  | 'school-college-furniture'
  | 'window-safety-grills'
  | 'railings-staircases'
  | 'sheds-roofing'
  | 'steel-racks-stands'
  | 'welding-repairs'
  | 'custom-fabrication';

export interface GalleryCategoryConfig {
  slug: GalleryCategorySlug;
  label: string;
  description?: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: GalleryCategorySlug;
  categoryLabel: string;
  imageUrl: string;
  thumbnailUrl?: string;
  mediumUrl?: string;
  imageAlt?: string;
  srcSetWebp?: string;
  description: string;
  specifications: string;
  location?: string;
  whatsappMessage?: string;
}

export interface BusinessHoursState {
  isOpen: boolean;
  statusText: string;
  nextEvent: string;
  todayHours: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'custom' | 'repairs' | 'materials';
}

export type WhatsAppContext =
  | { type: 'hero' }
  | { type: 'project'; projectName: string; projectUrl?: string; projectSlug?: string }
  | { type: 'service'; serviceName: string }
  | { type: 'repair'; details?: string }
  | { type: 'generic'; message?: string };

export type WhatsAppInput = WhatsAppContext | string;
