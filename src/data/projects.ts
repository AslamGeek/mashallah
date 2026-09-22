import { GalleryProject, GalleryCategorySlug, GalleryCategoryConfig } from '../types';

export const GALLERY_CATEGORIES: GalleryCategoryConfig[] = [
  { slug: 'gates-doors', label: 'Steel Gates & Doors' },
  { slug: 'school-college-furniture', label: 'School & College Furniture' },
  { slug: 'window-safety-grills', label: 'Window & Safety Grills' },
  { slug: 'railings-staircases', label: 'Railings & Staircases' },
  { slug: 'sheds-roofing', label: 'Sheds & Roofing' },
  { slug: 'steel-racks-stands', label: 'Steel Racks & Stands' },
  { slug: 'welding-repairs', label: 'Welding Repairs' },
  { slug: 'custom-fabrication', label: 'Custom Fabrication' },
];

export interface RawCmsProject {
  title?: string;
  image?: string;
  imageUrl?: string;
  alt?: string;
  imageAlt?: string;
  srcSetWebp?: string;
  description?: string;
  specifications?: string[] | string;
  category?: string;
  location?: string;
  featured?: boolean;
  order?: number;
  id?: string;
}

// Map human-friendly category names or slugs to valid GalleryCategorySlug and labels
const CATEGORY_MAP: Record<string, { slug: GalleryCategorySlug; label: string }> = {
  'gates-doors': { slug: 'gates-doors', label: 'Steel Gates & Doors' },
  'steel gates & doors': { slug: 'gates-doors', label: 'Steel Gates & Doors' },
  'steel gates and doors': { slug: 'gates-doors', label: 'Steel Gates & Doors' },
  'steel gates': { slug: 'gates-doors', label: 'Steel Gates & Doors' },
  'gates': { slug: 'gates-doors', label: 'Steel Gates & Doors' },

  'school-college-furniture': { slug: 'school-college-furniture', label: 'School & College Furniture' },
  'school & college furniture': { slug: 'school-college-furniture', label: 'School & College Furniture' },
  'school and college furniture': { slug: 'school-college-furniture', label: 'School & College Furniture' },
  'school furniture': { slug: 'school-college-furniture', label: 'School & College Furniture' },
  'college furniture': { slug: 'school-college-furniture', label: 'School & College Furniture' },
  'school & college': { slug: 'school-college-furniture', label: 'School & College Furniture' },

  'window-safety-grills': { slug: 'window-safety-grills', label: 'Window & Safety Grills' },
  'window & safety grills': { slug: 'window-safety-grills', label: 'Window & Safety Grills' },
  'window and safety grills': { slug: 'window-safety-grills', label: 'Window & Safety Grills' },
  'window safety grills': { slug: 'window-safety-grills', label: 'Window & Safety Grills' },
  'window grills': { slug: 'window-safety-grills', label: 'Window & Safety Grills' },
  'grills': { slug: 'window-safety-grills', label: 'Window & Safety Grills' },

  'railings-staircases': { slug: 'railings-staircases', label: 'Railings & Staircases' },
  'railings & staircases': { slug: 'railings-staircases', label: 'Railings & Staircases' },
  'railings and staircases': { slug: 'railings-staircases', label: 'Railings & Staircases' },
  'railings': { slug: 'railings-staircases', label: 'Railings & Staircases' },
  'staircases': { slug: 'railings-staircases', label: 'Railings & Staircases' },

  'sheds-roofing': { slug: 'sheds-roofing', label: 'Sheds & Roofing' },
  'sheds & roofing': { slug: 'sheds-roofing', label: 'Sheds & Roofing' },
  'sheds and roofing': { slug: 'sheds-roofing', label: 'Sheds & Roofing' },
  'sheds': { slug: 'sheds-roofing', label: 'Sheds & Roofing' },
  'roofing': { slug: 'sheds-roofing', label: 'Sheds & Roofing' },

  'steel-racks-stands': { slug: 'steel-racks-stands', label: 'Steel Racks & Stands' },
  'steel racks & stands': { slug: 'steel-racks-stands', label: 'Steel Racks & Stands' },
  'steel racks and stands': { slug: 'steel-racks-stands', label: 'Steel Racks & Stands' },
  'steel racks': { slug: 'steel-racks-stands', label: 'Steel Racks & Stands' },
  'stands': { slug: 'steel-racks-stands', label: 'Steel Racks & Stands' },

  'welding-repairs': { slug: 'welding-repairs', label: 'Welding Repairs' },
  'welding repairs': { slug: 'welding-repairs', label: 'Welding Repairs' },
  'repairs': { slug: 'welding-repairs', label: 'Welding Repairs' },

  'custom-fabrication': { slug: 'custom-fabrication', label: 'Custom Fabrication' },
  'custom fabrication': { slug: 'custom-fabrication', label: 'Custom Fabrication' },
  'fabrication': { slug: 'custom-fabrication', label: 'Custom Fabrication' },
};

function normalizeCategory(rawCategory?: string): { slug: GalleryCategorySlug; label: string } {
  if (!rawCategory) {
    return { slug: 'custom-fabrication', label: 'Custom Fabrication' };
  }

  const normalized = rawCategory.trim().toLowerCase();
  if (CATEGORY_MAP[normalized]) {
    return CATEGORY_MAP[normalized];
  }

  // Check if matches any existing category config in GALLERY_CATEGORIES
  const matched = GALLERY_CATEGORIES.find(
    (c) => c.slug.toLowerCase() === normalized || c.label.toLowerCase() === normalized
  );
  if (matched) {
    return { slug: matched.slug, label: matched.label };
  }

  // Fallback: create slug
  const fallbackSlug = normalized.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') as GalleryCategorySlug;
  return {
    slug: fallbackSlug || 'custom-fabrication',
    label: rawCategory.trim(),
  };
}

function normalizeSpecifications(rawSpecs?: string[] | string): string {
  if (Array.isArray(rawSpecs)) {
    return rawSpecs.filter(Boolean).join(' • ');
  }
  if (typeof rawSpecs === 'string') {
    return rawSpecs.trim();
  }
  return '';
}

export function getFullResolutionImageUrl(url?: string): string {
  if (!url) return '';
  // Strip any responsive suffixes like -769.webp, -768.webp, -480.webp to ensure full-resolution source image
  return url.replace(/-\d{3,4}\.(webp|jpg|jpeg|png)$/i, '.$1');
}

export function getProjectUrl(projectId: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/portfolio/${projectId}`;
}

export function findProjectBySlug(slug?: string, items?: GalleryProject[]): GalleryProject | undefined {
  if (!slug) return undefined;
  const projectList = items && items.length > 0 ? items : loadCmsProjects();
  const cleanSlug = slug.trim().toLowerCase().replace(/^#/, '');

  // 1. Exact match by id
  const exact = projectList.find((p) => p.id.toLowerCase() === cleanSlug);
  if (exact) return exact;

  // 2. Normalized match (remove special characters)
  const normalizedSlug = cleanSlug.replace(/[^a-z0-9]/g, '');
  const normalizedMatch = projectList.find(
    (p) => p.id.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedSlug
  );
  if (normalizedMatch) return normalizedMatch;

  // 3. Substring match
  const substringMatch = projectList.find(
    (p) => p.id.toLowerCase().includes(cleanSlug) || cleanSlug.includes(p.id.toLowerCase())
  );
  if (substringMatch) return substringMatch;

  // 4. Keyword matching (handles URLs like /portfolio/heavy-duty-steel-rack)
  const keywords = cleanSlug.split(/[-_ ]+/).filter((w) => w.length > 2);
  if (keywords.length > 0) {
    const allKeywordsMatch = projectList.find((p) => {
      const pId = p.id.toLowerCase();
      const pTitle = p.title.toLowerCase();
      return keywords.every((kw) => pId.includes(kw) || pTitle.includes(kw));
    });
    if (allKeywordsMatch) return allKeywordsMatch;

    // Best fuzzy keyword score
    let bestProject: GalleryProject | undefined;
    let maxMatches = 0;
    for (const p of projectList) {
      const pText = `${p.id} ${p.title}`.toLowerCase();
      let matches = 0;
      for (const kw of keywords) {
        if (pText.includes(kw)) matches++;
      }
      if (matches > maxMatches) {
        maxMatches = matches;
        bestProject = p;
      }
    }
    if (maxMatches >= 2) return bestProject;
  }

  return undefined;
}

/**
 * Load all project JSON records from content/projects/*.json using Vite's import.meta.glob
 * with eager loading.
 */
export function loadCmsProjects(): GalleryProject[] {
  const projectModules = import.meta.glob<RawCmsProject>(
    '/content/projects/*.json',
    {
      eager: true,
      import: 'default',
    }
  );

  const entries = Object.entries(projectModules);

  // Deterministic sorting: sort by order ascending if present, otherwise by title and file path
  entries.sort(([pathA, a], [pathB, b]) => {
    const hasOrderA = typeof a?.order === 'number';
    const hasOrderB = typeof b?.order === 'number';

    if (hasOrderA && hasOrderB) {
      if (a.order !== b.order) {
        return a.order! - b.order!;
      }
    } else if (hasOrderA) {
      return -1;
    } else if (hasOrderB) {
      return 1;
    }

    const titleA = (a?.title || '').trim();
    const titleB = (b?.title || '').trim();
    const titleCompare = titleA.localeCompare(titleB);
    if (titleCompare !== 0) return titleCompare;

    return pathA.localeCompare(pathB);
  });

  return entries.map(([filePath, raw]) => {
    const filename = filePath.split('/').pop()?.replace(/\.json$/, '') || '';
    const id = raw.id || filename || 'project';
    const { slug, label } = normalizeCategory(raw.category);
    const rawImage = raw.imageUrl || raw.image || '';
    const imageUrl = getFullResolutionImageUrl(rawImage);
    const imageAlt = raw.imageAlt || raw.alt || raw.title || 'Mashallah Welding Works project';
    const specifications = normalizeSpecifications(raw.specifications);

    let thumbnailUrl = imageUrl;
    let mediumUrl = imageUrl;
    let srcSetWebp = raw.srcSetWebp;

    // Use responsive webp thumbnails if image is from local public/images
    if (imageUrl.startsWith('/images/')) {
      const baseName = imageUrl.replace(/\.(webp|png|jpg|jpeg)$/i, '');
      thumbnailUrl = `${baseName}-480.webp`;
      mediumUrl = `${baseName}-768.webp`;
      if (!srcSetWebp) {
        srcSetWebp = `${thumbnailUrl} 480w, ${mediumUrl} 768w, ${imageUrl} 1200w`;
      }
    }

    const project: GalleryProject = {
      id,
      title: raw.title || 'Custom Fabrication Project',
      category: slug,
      categoryLabel: label,
      imageUrl,
      thumbnailUrl,
      mediumUrl,
      imageAlt,
      description: raw.description || '',
      specifications,
      srcSetWebp,
    };

    return project;
  });
}

