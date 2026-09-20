export interface ServiceItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'industrial' | 'repair' | 'fabrication';
  description: string;
  features: string[];
  iconName: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'gates' | 'grills' | 'railings' | 'doors' | 'stands' | 'repairs' | 'custom';
  categoryLabel: string;
  imageUrl: string;
  description: string;
  specifications: string;
}

export interface BusinessHoursState {
  isOpen: boolean;
  statusText: string;
  nextEvent: string;
  todayHours: string;
}
