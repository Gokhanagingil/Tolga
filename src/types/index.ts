export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  preferences: UserPreferences;
  favorites: string[];
  searchHistory: SearchQuery[];
  createdAt: string;
}

export interface UserPreferences {
  propertyTypes: PropertyType[];
  minPrice?: number;
  maxPrice?: number;
  preferredLocations: string[];
  minArea?: number;
  maxArea?: number;
  minRooms?: number;
}

export type PropertyType = 'Satılık' | 'Kiralık';
export type PropertyCategory = 'Daire' | 'Villa' | 'Dükkan' | 'Ofis' | 'Arsa';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceFormatted: string;
  type: PropertyType;
  category: PropertyCategory;
  location: string;
  district: string;
  address: string;
  lat?: number;
  lng?: number;
  features: string[];
  rooms: number;
  bathrooms: number;
  area: number;
  floor?: number;
  totalFloors?: number;
  buildingAge?: number;
  furnished: boolean;
  images: PropertyImage[];
  agentId: string;
  agentName: string;
  agentPhone: string;
  agentAvatar?: string;
  createdAt: string;
  views: number;
  isFeatured: boolean;
}

export interface PropertyImage {
  url: string;
  alt: string;
  isMain: boolean;
}

export interface SearchQuery {
  query?: string;
  type?: PropertyType;
  category?: PropertyCategory;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  minRooms?: number;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export interface FilterState {
  query: string;
  type: PropertyType | '';
  category: PropertyCategory | '';
  location: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  minRooms: number;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc';
}
