'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import { useAppStore } from '@/lib/store';
import {
  Heart, MapPin, Bed, Bath, Maximize2, Eye, Camera, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function PropertyCard({ property }: { property: Property }) {
  const { isLoggedIn, toggleFavorite, isFavorite } = useAppStore();
  const [currentImage, setCurrentImage] = useState(0);
  const [imageHover, setImageHover] = useState(false);
  const fav = isFavorite(property.id);

  return (
    <div className="card group animate-fade-in">
      <div
        className="relative aspect-[4/3] overflow-hidden"
        onMouseEnter={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}
      >
        <img
          src={property.images[currentImage]?.url}
          alt={property.images[currentImage]?.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {imageHover && property.images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); setCurrentImage(i => i > 0 ? i - 1 : property.images.length - 1); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); setCurrentImage(i => i < property.images.length - 1 ? i + 1 : 0); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`badge ${property.type === 'Satılık' ? 'bg-istanbul-terracotta text-white' : 'bg-istanbul-sea text-white'}`}>
            {property.type}
          </span>
          {property.isFeatured && (
            <span className="badge bg-istanbul-gold text-white">Öne Çıkan</span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          {isLoggedIn && (
            <button
              onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                fav ? 'bg-red-500 text-white' : 'bg-white/80 backdrop-blur text-gray-600 hover:bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="flex gap-2">
            <span className="badge bg-black/50 backdrop-blur text-white text-xs">
              <Camera className="w-3 h-3 mr-1" />
              {property.images.length}
            </span>
          </div>
          <span className="badge bg-black/50 backdrop-blur text-white text-xs">
            <Eye className="w-3 h-3 mr-1" />
            {property.views}
          </span>
        </div>

        {property.images.length > 1 && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
            {property.images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentImage ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <Link href={`/properties/${property.id}`} className="block p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-istanbul-navy transition-colors line-clamp-1">
            {property.title}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{property.address}, {property.district}</span>
        </div>

        <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
          {property.rooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              {property.rooms}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {property.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5" />
            {property.area} m²
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <p className="text-xl font-bold text-istanbul-navy">
            {property.priceFormatted}
          </p>
          <span className="text-xs text-istanbul-sea font-medium bg-istanbul-sea/10 px-2 py-1 rounded-lg">
            {property.category}
          </span>
        </div>
      </Link>
    </div>
  );
}
