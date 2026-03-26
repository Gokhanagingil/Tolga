'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import RecommendationEngine from '@/components/RecommendationEngine';
import ChatWidget from '@/components/ChatWidget';
import { useAppStore } from '@/lib/store';
import { Heart, Search, User } from 'lucide-react';

export default function FavoritesPage() {
  const { isLoggedIn, getFavoriteProperties } = useAppStore();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <User className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Giriş yapmanız gerekiyor</h2>
          <p className="text-gray-400 mb-6">Favorilerinizi görüntülemek için giriş yapın.</p>
          <Link href="/login" className="btn-primary">Giriş Yap</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const favorites = getFavoriteProperties();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-istanbul-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-istanbul-gold" />
            <div>
              <h1 className="text-3xl font-bold text-white font-display">Favorilerim</h1>
              <p className="text-gray-300">{favorites.length} mülk favorilerinizde</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Henüz Favoriniz Yok
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Beğendiğiniz mülkleri favorilere ekleyerek kolayca erişin.
            </p>
            <Link href="/properties" className="btn-primary">
              <Search className="w-4 h-4" />
              Mülk Ara
            </Link>
          </div>
        )}
      </div>

      <RecommendationEngine />

      <Footer />
      <ChatWidget />
    </div>
  );
}
