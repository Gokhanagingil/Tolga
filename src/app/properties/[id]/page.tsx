'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import PropertyCard from '@/components/PropertyCard';
import ChatWidget from '@/components/ChatWidget';
import { useAppStore } from '@/lib/store';
import {
  Heart, Share2, MapPin, Bed, Bath, Maximize2, Building, Calendar, Sofa,
  Phone, Mail, ChevronRight, Eye, Printer, Flag, CheckCircle2
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const { properties, isLoggedIn, toggleFavorite, isFavorite } = useAppStore();

  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Mülk Bulunamadı</h2>
          <p className="text-gray-400 mb-6">Aradığınız mülk mevcut değil veya kaldırılmış olabilir.</p>
          <Link href="/properties" className="btn-primary">
            Mülklere Dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const fav = isFavorite(property.id);
  const similarProperties = properties
    .filter(p => p.id !== property.id && (p.location === property.location || p.category === property.category))
    .slice(0, 3);

  const details = [
    { icon: Bed, label: 'Oda Sayısı', value: property.rooms > 0 ? `${property.rooms} Oda` : '-' },
    { icon: Bath, label: 'Banyo', value: property.bathrooms > 0 ? `${property.bathrooms} Banyo` : '-' },
    { icon: Maximize2, label: 'Alan', value: `${property.area} m²` },
    { icon: Building, label: 'Kat', value: property.floor !== undefined ? `${property.floor}/${property.totalFloors}` : '-' },
    { icon: Calendar, label: 'Bina Yaşı', value: property.buildingAge !== undefined ? `${property.buildingAge} yıl` : '-' },
    { icon: Sofa, label: 'Eşya', value: property.furnished ? 'Eşyalı' : 'Boş' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-istanbul-navy transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/properties" className="hover:text-istanbul-navy transition-colors">Mülkler</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-istanbul-navy font-medium line-clamp-1">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ImageGallery images={property.images} />

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`badge ${property.type === 'Satılık' ? 'bg-istanbul-terracotta text-white' : 'bg-istanbul-sea text-white'}`}>
                      {property.type}
                    </span>
                    <span className="badge bg-gray-100 text-gray-600">
                      {property.category}
                    </span>
                    {property.isFeatured && (
                      <span className="badge bg-istanbul-gold text-white">Öne Çıkan</span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-istanbul-navy font-display">
                    {property.title}
                  </h1>
                </div>
                <div className="flex gap-2">
                  {isLoggedIn && (
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                        fav ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${fav ? 'fill-current' : ''}`} />
                    </button>
                  )}
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-200 text-gray-400 hover:bg-gray-50 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{property.address}, {property.district}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {property.views} görüntülenme
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(property.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>

              <div className="text-3xl font-bold text-istanbul-navy mb-8">
                {property.priceFormatted}
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-8">
                {details.map((detail, i) => (
                  <div key={i} className="text-center p-3 bg-gray-50 rounded-xl">
                    <detail.icon className="w-5 h-5 text-istanbul-sea mx-auto mb-1" />
                    <div className="text-xs text-gray-400 mb-0.5">{detail.label}</div>
                    <div className="text-sm font-semibold text-gray-800">{detail.value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-istanbul-navy mb-3">Açıklama</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-istanbul-navy mb-3">Özellikler</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-istanbul-sea flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-semibold text-istanbul-navy mb-4">İlan Sahibi</h3>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={property.agentAvatar}
                  alt={property.agentName}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-800">{property.agentName}</div>
                  <div className="text-sm text-gray-400">Emlak Danışmanı</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a
                  href={`tel:${property.agentPhone}`}
                  className="btn-primary w-full"
                >
                  <Phone className="w-4 h-4" />
                  {property.agentPhone}
                </a>
                <button className="btn-secondary w-full">
                  <Mail className="w-4 h-4" />
                  Mesaj Gönder
                </button>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-400 mb-2">İlan No: {property.id}</div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                    <Printer className="w-3.5 h-3.5" />
                    Yazdır
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                    <Flag className="w-3.5 h-3.5" />
                    Bildir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {similarProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-istanbul-navy font-display mb-6">
              Benzer Mülkler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
}
