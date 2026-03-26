'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { ISTANBUL_DISTRICTS } from '@/lib/data';
import { PropertyType, PropertyCategory } from '@/types';
import { Search, SlidersHorizontal, X, ChevronDown, RotateCcw } from 'lucide-react';

export default function SearchFilters({ compact = false }: { compact?: boolean }) {
  const { filters, setFilters, resetFilters } = useAppStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const propertyTypes: (PropertyType | '')[] = ['', 'Satılık', 'Kiralık'];
  const propertyCategories: (PropertyCategory | '')[] = ['', 'Daire', 'Villa', 'Dükkan', 'Ofis', 'Arsa'];
  const sortOptions = [
    { value: 'newest', label: 'En Yeni' },
    { value: 'price-asc', label: 'Fiyat (Düşük → Yüksek)' },
    { value: 'price-desc', label: 'Fiyat (Yüksek → Düşük)' },
    { value: 'area-asc', label: 'Alan (Küçük → Büyük)' },
    { value: 'area-desc', label: 'Alan (Büyük → Küçük)' },
  ];

  const hasActiveFilters = filters.query || filters.type || filters.category || filters.location
    || filters.minPrice > 0 || filters.maxPrice > 0 || filters.minArea > 0
    || filters.maxArea > 0 || filters.minRooms > 0;

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Adres, semt veya anahtar kelime ara..."
            value={filters.query}
            onChange={(e) => setFilters({ query: e.target.value })}
            className="input-field pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap lg:flex-nowrap">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ type: e.target.value as PropertyType | '' })}
            className="input-field min-w-[130px]"
          >
            <option value="">Tüm Tipler</option>
            {propertyTypes.filter(t => t).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters({ category: e.target.value as PropertyCategory | '' })}
            className="input-field min-w-[130px]"
          >
            <option value="">Tüm Kategoriler</option>
            {propertyCategories.filter(c => c).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filters.location}
            onChange={(e) => setFilters({ location: e.target.value })}
            className="input-field min-w-[130px]"
          >
            <option value="">Tüm Bölgeler</option>
            {ISTANBUL_DISTRICTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-sm font-medium whitespace-nowrap ${
              showAdvanced ? 'bg-istanbul-navy text-white border-istanbul-navy' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtreler
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-istanbul-gold" />
            )}
          </button>
        </div>
      </div>

      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-100 animate-slide-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Min. Fiyat (₺)</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice || ''}
                onChange={(e) => setFilters({ minPrice: Number(e.target.value) })}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Maks. Fiyat (₺)</label>
              <input
                type="number"
                placeholder="Sınırsız"
                value={filters.maxPrice || ''}
                onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Min. Alan (m²)</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minArea || ''}
                onChange={(e) => setFilters({ minArea: Number(e.target.value) })}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Maks. Alan (m²)</label>
              <input
                type="number"
                placeholder="Sınırsız"
                value={filters.maxArea || ''}
                onChange={(e) => setFilters({ maxArea: Number(e.target.value) })}
                className="input-field text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Min. Oda Sayısı</label>
              <select
                value={filters.minRooms}
                onChange={(e) => setFilters({ minRooms: Number(e.target.value) })}
                className="input-field text-sm"
              >
                <option value={0}>Farketmez</option>
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n}+</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Sıralama</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ sortBy: e.target.value as typeof filters.sortBy })}
                className="input-field text-sm"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 flex items-end">
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Filtreleri Temizle
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
