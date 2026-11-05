export type CrackerCategory =
  | 'All'
  | 'Aerial Cakes'
  | 'Sparklers & Flares'
  | 'Fountains & Cones'
  | 'Ground Spinners'
  | 'Sky Rockets'
  | 'Sound & Crackle'
  | 'Executive Hampers';

export interface CrackerSpecification {
  shots?: number;
  duration?: string;
  soundLevel: 'Whisper Silent' | 'Low / Festive Crackle' | 'Medium / Thunder' | 'High Decibel Boom';
  safetyRadius: string;
  visualEffect: string;
  ecoRating?: 'Green PESO Certified' | 'Reduced Smoke Formula' | 'Zero Heavy Metals';
}

export interface CrackerItem {
  id: string;
  sku: string;
  name: string;
  category: Exclude<CrackerCategory, 'All'>;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  packSize: string;
  isAvailable: boolean;
  image: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  specs: CrackerSpecification;
}

export interface CartItem {
  cracker: CrackerItem;
  quantity: number;
}

