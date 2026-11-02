export type ProjectCategory = 
  | 'All Projects'
  | 'Event & Promotional Posters'
  | 'Commercial Advertisements'
  | 'Awareness & Social Campaigns'
  | 'Festival & Celebration Designs'
  | 'College & Technical Event Designs'
  | 'Organisational & Corporate Designs'
  | 'Calendars & Event Collages';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  client: string;
  year: string;
  description: string;
  designType?: string;
  challenge?: string;
  solution?: string;
  deliverables: string[];
  toolsUsed: string[];
  previewImage: string;
  fullImage?: string;
  featured?: boolean;
  projectDate?: string;
  isReplaceablePlaceholder?: boolean;
  externalUrl?: string;
}

export interface ServicePackage {
  name: string;
  priceINR: string;
  description: string;
  deliverables: string[];
  revisions: string;
  timeline: string;
  popular?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  startingPriceINR: string;
  category: string;
  previewImage: string;
  included: string[];
  deliverables: string[];
  packages: ServicePackage[];
  additionalOptions?: string[];
  turnaround: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  positioning: string;
  heroHeadline: string;
  heroSubheadline: string;
  instagramHandle: string;
  instagramUrl: string;
  whatsappNumber: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  workingHours: string;
}

export type EnquiryStatus = 
  | 'New'
  | 'Contacted'
  | 'In Discussion'
  | 'Proposal Sent'
  | 'Confirmed'
  | 'Completed'
  | 'Rejected'
  | 'In Review'
  | 'Responded';

export interface EnquirySubmission {
  id: string;
  referenceNumber?: string;
  timestamp?: string;
  createdAt?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline?: string;
  description: string;
  status: EnquiryStatus;
  internalNotes?: string;
}
