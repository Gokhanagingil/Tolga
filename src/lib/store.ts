import { create } from 'zustand';
import { User, Property, FilterState, ChatMessage, SearchQuery } from '@/types';
import { sampleProperties } from './data';
import { v4 as uuidv4 } from 'uuid';

interface AppStore {
  user: User | null;
  properties: Property[];
  filters: FilterState;
  chatMessages: ChatMessage[];
  chatOpen: boolean;
  isLoggedIn: boolean;

  register: (name: string, email: string, phone?: string) => void;
  logout: () => void;
  updatePreferences: (prefs: Partial<User['preferences']>) => void;

  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  getFavoriteProperties: () => Property[];

  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  getFilteredProperties: () => Property[];
  addSearchHistory: (query: SearchQuery) => void;

  getRecommendations: () => Property[];

  addChatMessage: (text: string, sender: 'user' | 'agent') => void;
  toggleChat: () => void;

  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'views' | 'isFeatured'>) => void;
}

const defaultFilters: FilterState = {
  query: '',
  type: '',
  category: '',
  location: '',
  minPrice: 0,
  maxPrice: 0,
  minArea: 0,
  maxArea: 0,
  minRooms: 0,
  sortBy: 'newest',
};

export const useAppStore = create<AppStore>((set, get) => ({
  user: null,
  properties: sampleProperties,
  filters: { ...defaultFilters },
  chatMessages: [
    {
      id: '1',
      sender: 'agent',
      text: 'Merhaba! İstanbul Emlak Platformu\'na hoş geldiniz. Bu otomatik destek asistanıdır. Sorularınızı yazabilirsiniz.',
      timestamp: new Date().toISOString(),
    },
  ],
  chatOpen: false,
  isLoggedIn: false,

  register: (name, email, phone) => {
    const user: User = {
      id: uuidv4(),
      name,
      email,
      phone,
      preferences: {
        propertyTypes: [],
        preferredLocations: [],
      },
      favorites: [],
      searchHistory: [],
      createdAt: new Date().toISOString(),
    };
    set({ user, isLoggedIn: true });
  },

  logout: () => {
    set({ user: null, isLoggedIn: false });
  },

  updatePreferences: (prefs) => {
    const { user } = get();
    if (!user) return;
    set({
      user: {
        ...user,
        preferences: { ...user.preferences, ...prefs },
      },
    });
  },

  toggleFavorite: (propertyId) => {
    const { user } = get();
    if (!user) return;
    const isFav = user.favorites.includes(propertyId);
    set({
      user: {
        ...user,
        favorites: isFav
          ? user.favorites.filter((id) => id !== propertyId)
          : [...user.favorites, propertyId],
      },
    });
  },

  isFavorite: (propertyId) => {
    const { user } = get();
    return user?.favorites.includes(propertyId) ?? false;
  },

  getFavoriteProperties: () => {
    const { user, properties } = get();
    if (!user) return [];
    return properties.filter((p) => user.favorites.includes(p.id));
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  resetFilters: () => {
    set({ filters: { ...defaultFilters } });
  },

  getFilteredProperties: () => {
    const { properties, filters } = get();
    let result = [...properties];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q)
      );
    }

    if (filters.type) {
      result = result.filter((p) => p.type === filters.type);
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.location) {
      result = result.filter((p) => p.location === filters.location || p.district === filters.location);
    }

    if (filters.minPrice > 0) {
      result = result.filter((p) => p.price >= filters.minPrice);
    }

    if (filters.maxPrice > 0) {
      result = result.filter((p) => p.price <= filters.maxPrice);
    }

    if (filters.minArea > 0) {
      result = result.filter((p) => p.area >= filters.minArea);
    }

    if (filters.maxArea > 0) {
      result = result.filter((p) => p.area <= filters.maxArea);
    }

    if (filters.minRooms > 0) {
      result = result.filter((p) => p.rooms >= filters.minRooms);
    }

    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'area-asc':
        result.sort((a, b) => a.area - b.area);
        break;
      case 'area-desc':
        result.sort((a, b) => b.area - a.area);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  },

  addSearchHistory: (query) => {
    const { user } = get();
    if (!user) return;
    set({
      user: {
        ...user,
        searchHistory: [query, ...user.searchHistory].slice(0, 20),
      },
    });
  },

  getRecommendations: () => {
    const { user, properties } = get();
    if (!user) return properties.filter((p) => p.isFeatured).slice(0, 4);

    const { preferences, searchHistory, favorites } = user;
    const favProperties = properties.filter((p) => favorites.includes(p.id));

    const scored = properties
      .filter((p) => !favorites.includes(p.id))
      .map((property) => {
        let score = 0;

        if (preferences.propertyTypes.length > 0 && preferences.propertyTypes.includes(property.type)) {
          score += 3;
        }

        if (preferences.preferredLocations.length > 0 && preferences.preferredLocations.includes(property.location)) {
          score += 3;
        }

        if (preferences.minPrice && preferences.maxPrice) {
          if (property.price >= preferences.minPrice && property.price <= preferences.maxPrice) {
            score += 2;
          }
        }

        if (preferences.minArea && property.area >= preferences.minArea) {
          score += 1;
        }

        if (preferences.minRooms && property.rooms >= preferences.minRooms) {
          score += 1;
        }

        favProperties.forEach((fav) => {
          if (fav.location === property.location) score += 1;
          if (fav.type === property.type) score += 1;
          if (fav.category === property.category) score += 1;
          if (Math.abs(fav.price - property.price) / fav.price < 0.3) score += 1;
        });

        searchHistory.slice(0, 5).forEach((search) => {
          if (search.location && search.location === property.location) score += 0.5;
          if (search.type && search.type === property.type) score += 0.5;
          if (search.category && search.category === property.category) score += 0.5;
        });

        if (property.isFeatured) score += 0.5;
        score += Math.min(property.views / 1000, 1);

        return { property, score };
      });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 6).map((s) => s.property);
  },

  addChatMessage: (text, sender) => {
    const msg: ChatMessage = {
      id: uuidv4(),
      sender,
      text,
      timestamp: new Date().toISOString(),
    };
    set((state) => ({
      chatMessages: [...state.chatMessages, msg],
    }));

    if (sender === 'user') {
      setTimeout(() => {
        const responses = [
          'Mülk arama konusunda size yardımcı olabilirim. Hangi bölgede arıyorsunuz?',
          'Size en uygun mülkleri bulmak için tercihlerinizi öğrenebilir miyim?',
          'Bütçeniz ve alan tercihleriniz hakkında bilgi verebilir misiniz?',
          'Bu konuda size yardımcı olmaktan mutluluk duyarım. Detayları paylaşır mısınız?',
          'İstanbul\'un birçok prestijli semtinde mülklerimiz mevcut. Size özel bir tur ayarlayabilir miyim?',
          'Anlıyorum, hemen araştırayım ve size en iyi seçenekleri sunayım.',
          'Sorularınız için her zaman buradayım. Başka bir konuda yardımcı olabilir miyim?',
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        get().addChatMessage(response, 'agent');
      }, 1000);
    }
  },

  toggleChat: () => {
    set((state) => ({ chatOpen: !state.chatOpen }));
  },

  addProperty: (property) => {
    const newProperty: Property = {
      ...property,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      views: 0,
      isFeatured: false,
    };
    set((state) => ({
      properties: [newProperty, ...state.properties],
    }));
  },
}));
