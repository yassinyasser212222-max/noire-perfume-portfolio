export interface ProjectCredits {
  artDirection: string;
  concept: string;
  retouching: string;
  studio: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  brand: string;
  fragranceName: string;
  tagline: string;
  category: string;
  year: string;
  defaultImage: string | null;
  description: string;
  dimensions: string;
  palette: string[];
  credits: ProjectCredits;
  isPlaceholderDefault: boolean;
}

export interface StudioContactConfig {
  instagramHandle: string;
  whatsappNumber: string;
  email: string;
  location: string;
}
