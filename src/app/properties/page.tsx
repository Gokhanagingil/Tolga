'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters from '@/components/SearchFilters';
import ChatWidget from '@/components/ChatWidget';
import { useAppStore } from '@/lib/store';
import { PropertyType } from '@/types';
import { Building2, SearchX } from 'lucide-react';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const { getFilteredProperties, setFilters, filters } = useAppStore();

  useEffect(() => {
    const location = searchParams.get('location');
    const type = searchParams.get('type');
    if (location) setFilters({ location });
    if (type) setFilters({ type: type as PropertyType });
  }, [searchParams, setFilters]);

  const filteredProperties = getFilteredProperties();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-istanbul-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white font-display mb-2">Mülk Ara</h1>
          <p className="text-gray-300">
            İstanbul&apos;un tüm semtlerinde satılık ve kiralık mülkleri keşfedin
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <SearchFilters />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-istanbul-navy">{filteredProperties.length}</span> mülk bulundu
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Sonuç Bulunamadı
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Arama kriterlerinize uygun mülk bulunamadı. Filtreleri değiştirerek tekrar deneyin.
            </p>
          </div>
        )}
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-istanbul-navy border-t-transparent rounded-full" />
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
