import type { CampaignSummary } from 'src/types/Campaign';

// Background images are local assets keyed by campaign slug
const BACKGROUND_IMAGES: Record<string, string> = {
  forest: '/background/Forest.jpg',
  seas: '/background/Sea.jpg',
  agriculture: '/background/Agriculture.jpg',
  education: '/background/Education.jpg',
  charity: '/background/Charity.jpg',
};

export interface TabData {
  slug: string;
  name: string;
  backgroundImage: string;
  accentColor: string;
  title: string;
  description: string;
}

export function campaignsToTabs(campaigns: CampaignSummary[]): TabData[] {
  return campaigns.map((c) => ({
    slug: c.slug,
    name: c.name,
    backgroundImage: BACKGROUND_IMAGES[c.slug] || '/background/Forest.jpg',
    accentColor: c.accent_color,
    title: c.name,
    description: c.tagline,
  }));
}

// Fallback data used when API is unreachable
export const fallbackTabs: TabData[] = [
  {
    slug: 'forest',
    name: 'Forest',
    backgroundImage: '/background/Forest.jpg',
    accentColor: '#0C6100',
    title: 'Forests',
    description: 'Preserve and restore the green lungs of our planet through reforestation projects.',
  },
  {
    slug: 'seas',
    name: 'Seas & Oceans',
    backgroundImage: '/background/Sea.jpg',
    accentColor: '#23cafd',
    title: 'Seas & Oceans',
    description: 'Protect marine ecosystems and fight ocean pollution with cleanup initiatives.',
  },
  {
    slug: 'agriculture',
    name: 'Agriculture',
    backgroundImage: '/background/Agriculture.jpg',
    accentColor: '#dabc0c',
    title: 'Agriculture',
    description: 'Support sustainable farming that feeds communities without harming the earth.',
  },
  {
    slug: 'education',
    name: 'Education',
    backgroundImage: '/background/Education.jpg',
    accentColor: '#0015fa',
    title: 'Education',
    description: 'Give every child a fair chance to learn, grow, and build a better future.',
  },
  {
    slug: 'charity',
    name: 'Charity',
    backgroundImage: '/background/Charity.jpg',
    accentColor: '#6d836c',
    title: 'Charity',
    description: 'Direct support for people and communities when they need it most.',
  },
];
