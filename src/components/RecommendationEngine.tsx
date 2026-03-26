'use client';

import { useAppStore } from '@/lib/store';
import PropertyCard from './PropertyCard';
import { Sparkles, TrendingUp, Brain } from 'lucide-react';

export default function RecommendationEngine() {
  const { getRecommendations, isLoggedIn, user } = useAppStore();
  const recommendations = getRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-istanbul-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-istanbul-gold/10 rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-istanbul-gold" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-istanbul-navy font-display">
              {isLoggedIn ? 'AI Destekli Öneriler' : 'Öne Çıkan Mülkler'}
            </h2>
            <p className="text-sm text-gray-500">
              {isLoggedIn
                ? 'Tercihlerinize ve arama geçmişinize göre kişiselleştirilmiş öneriler'
                : 'İstanbul\'un en çok ilgi gören mülkleri'
              }
            </p>
          </div>
        </div>

        {isLoggedIn && user && (
          <div className="flex items-center gap-4 mb-6 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-istanbul-navy/5 rounded-full text-xs text-istanbul-navy">
              <Sparkles className="w-3.5 h-3.5 text-istanbul-gold" />
              Kişiselleştirilmiş
            </div>
            {user.preferences.preferredLocations.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-istanbul-sea/10 rounded-full text-xs text-istanbul-sea">
                <TrendingUp className="w-3.5 h-3.5" />
                {user.preferences.preferredLocations.join(', ')} bölgesine uygun
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {recommendations.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
