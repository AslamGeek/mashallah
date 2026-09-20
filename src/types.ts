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
  | 'window-safety-grills'
  | 'railings-staircases'
  | 'sheds-roofing'
  | 'steel-racks-stands'
  | 'welding-repairs'
  | 'custom-fabrication';

export interface GalleryCategoryConfig {
  slug: GalleryCategorySlug;
  label: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: GalleryCategorySlug;
  categoryLabel: string;
  imageUrl: string;
  imageAlt?: string;
  description: string;
  specifications: string;
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
