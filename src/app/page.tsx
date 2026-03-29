'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import RecommendationEngine from '@/components/RecommendationEngine';
import ChatWidget from '@/components/ChatWidget';
import { useAppStore } from '@/lib/store';
import { ISTANBUL_DISTRICTS } from '@/lib/data';
import {
  Search, ArrowRight, Building2, Shield, Sparkles, MapPin,
  Star, Users, Headphones
} from 'lucide-react';

export default function HomePage() {
  const { properties, setFilters } = useAppStore();
  const [heroSearch, setHeroSearch] = useState('');
  const [heroType, setHeroType] = useState('');

  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 6);

  const uniqueDistricts = new Set(properties.map(p => p.district));
  const stats = [
    { icon: Building2, label: 'Aktif İlan', value: `${properties.length}` },
    { icon: MapPin, label: 'Bölge', value: `${uniqueDistricts.size}` },
    { icon: Star, label: 'Öne Çıkan', value: `${properties.filter(p => p.isFeatured).length}` },
    { icon: Users, label: 'Demo Mod', value: 'Aktif' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Akıllı Arama',
      desc: 'Gelişmiş filtreleme ile hayalinizdeki mülkü saniyeler içinde bulun.',
    },
    {
      icon: Sparkles,
      title: 'Kişiselleştirilmiş Öneriler',
      desc: 'Tercihlerinize dayalı kişiselleştirilmiş mülk önerileri alın.',
    },
    {
      icon: Shield,
      title: 'Kolay Kullanım',
      desc: 'Modern arayüz ile kolayca mülk ekleyin ve yönetin.',
    },
    {
      icon: Headphones,
      title: 'Destek',
      desc: 'Platform içi destek ile sorularınıza yanıt alın.',
    },
  ];

  const handleHeroSearch = () => {
    setFilters({
      query: heroSearch,
      type: heroType as 'Satılık' | 'Kiralık' | '',
    });
    window.location.href = '/properties';
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative bg-hero-pattern min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-istanbul-navy/95 via-istanbul-navy/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-istanbul-gold/20 text-istanbul-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Emlak Platformu
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display leading-tight mb-6">
              İstanbul&apos;da <br />
              <span className="text-istanbul-gold">Hayalinizdeki</span> Evi Bulun
            </h1>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
              İstanbul&apos;un en prestijli semtlerinde satılık ve kiralık mülkler.
              Akıllı arama ve kişiselleştirilmiş önerilerle size en uygun evi bulun.
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Semt, adres veya anahtar kelime..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleHeroSearch()}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-800 placeholder-gray-400 outline-none text-sm"
                />
              </div>
              <select
                value={heroType}
                onChange={(e) => setHeroType(e.target.value)}
                className="px-4 py-4 rounded-xl bg-white text-gray-800 outline-none text-sm min-w-[140px]"
              >
                <option value="">Tüm Tipler</option>
                <option value="Satılık">Satılık</option>
                <option value="Kiralık">Kiralık</option>
              </select>
              <button
                onClick={handleHeroSearch}
                className="btn-gold py-4 px-8 rounded-xl"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Ara</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {['Beşiktaş', 'Kadıköy', 'Şişli', 'Sarıyer'].map((district) => (
                <Link
                  key={district}
                  href={`/properties?location=${district}`}
                  className="px-3 py-1.5 bg-white/10 text-white/80 rounded-full text-xs hover:bg-white/20 transition-all"
                >
                  {district}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all">
                <stat.icon className="w-8 h-8 text-istanbul-sea mx-auto mb-2" />
                <div className="text-2xl font-bold text-istanbul-navy">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-istanbul-navy font-display mb-2">
                Öne Çıkan Mülkler
              </h2>
              <p className="text-gray-500">İstanbul&apos;un en prestijli semtlerinden seçilmiş ilanlar</p>
            </div>
            <Link
              href="/properties"
              className="hidden sm:flex items-center gap-2 text-istanbul-sea font-semibold hover:gap-3 transition-all"
            >
              Tümünü Gör
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="sm:hidden mt-6 text-center">
            <Link href="/properties" className="btn-secondary">
              Tümünü Gör
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <RecommendationEngine />

      {/* Districts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-istanbul-navy font-display mb-2">
              Popüler Bölgeler
            </h2>
            <p className="text-gray-500">İstanbul&apos;un en çok aranan semtleri</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ISTANBUL_DISTRICTS.slice(0, 10).map((district, i) => {
              const districtImages = [
                'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1549918864-48ac978761a4?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1569396116180-210c182bedb8?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1565623833408-d77ca72f6b09?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1568781269371-57d21cd4b4a1?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop',
              ];
              return (
                <Link
                  key={district}
                  href={`/properties?location=${district}`}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                >
                  <img
                    src={districtImages[i]}
                    alt={district}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-semibold text-sm">{district}</h3>
                    <p className="text-white/70 text-xs">
                      {properties.filter(p => p.location === district).length} ilan
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-istanbul-navy font-display mb-2">
              Neden İstanbul Emlak?
            </h2>
            <p className="text-gray-500">Modern teknoloji ile emlak deneyimini yeniden tanımlıyoruz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-istanbul-navy/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-istanbul-navy group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-istanbul-sea group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-istanbul-navy mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-istanbul-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display mb-4">
            Hayalinizdeki Evi Bulmaya Hazır mısınız?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Hemen kaydolun, kişiselleştirilmiş öneriler alın ve İstanbul&apos;un en güzel mülklerini keşfedin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-gold text-lg py-4 px-8">
              Ücretsiz Kayıt Ol
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/properties" className="btn-secondary border-white text-white hover:bg-white hover:text-istanbul-navy text-lg py-4 px-8">
              Mülkleri İncele
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
