'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { useAppStore } from '@/lib/store';
import { ISTANBUL_DISTRICTS } from '@/lib/data';
import { PropertyType } from '@/types';
import {
  User, Mail, Phone, MapPin, Heart, Settings, Sparkles,
  CheckCircle2, Save, Home, Clock
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, updatePreferences, getFavoriteProperties } = useAppStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'history'>('profile');

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <User className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Giriş yapmanız gerekiyor</h2>
          <p className="text-gray-400 mb-6">Profilinizi görüntülemek için giriş yapın.</p>
          <Link href="/login" className="btn-primary">Giriş Yap</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const favorites = getFavoriteProperties();

  const togglePrefType = (type: PropertyType) => {
    const current = user.preferences.propertyTypes;
    updatePreferences({
      propertyTypes: current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type],
    });
  };

  const togglePrefLocation = (loc: string) => {
    const current = user.preferences.preferredLocations;
    updatePreferences({
      preferredLocations: current.includes(loc)
        ? current.filter(l => l !== loc)
        : [...current, loc],
    });
  };

  const tabs = [
    { key: 'profile', label: 'Profil', icon: User },
    { key: 'preferences', label: 'Tercihler', icon: Settings },
    { key: 'history', label: 'Geçmiş', icon: Clock },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="bg-istanbul-navy p-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-istanbul-sea rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-display">{user.name}</h1>
                <p className="text-gray-300 text-sm">{user.email}</p>
                <p className="text-gray-400 text-xs mt-1">
                  Üyelik: {new Date(user.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex border-b border-gray-100">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'text-istanbul-navy border-b-2 border-istanbul-navy'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-sm p-8 animate-fade-in">
            <h2 className="text-lg font-semibold text-istanbul-navy mb-6">Kişisel Bilgiler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500 mb-1 block">Ad Soyad</label>
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-800">{user.name}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 mb-1 block">E-posta</label>
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-800">{user.email}</span>
                </div>
              </div>
              {user.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-1 block">Telefon</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-800">{user.phone}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-istanbul-navy">Favoriler</h3>
                  <p className="text-sm text-gray-400">{favorites.length} mülk favorilerinizde</p>
                </div>
                <Link href="/favorites" className="text-istanbul-sea text-sm font-medium hover:underline">
                  Tümünü Gör →
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="bg-white rounded-2xl shadow-sm p-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-istanbul-gold" />
              <h2 className="text-lg font-semibold text-istanbul-navy">AI Tercihleriniz</h2>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Tercihlerinizi güncelleyerek daha doğru mülk önerileri alın.
            </p>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Mülk Tipi</label>
                <div className="flex gap-2">
                  {(['Satılık', 'Kiralık'] as PropertyType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => togglePrefType(type)}
                      className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                        user.preferences.propertyTypes.includes(type)
                          ? 'bg-istanbul-navy text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Tercih Edilen Bölgeler</label>
                <div className="flex flex-wrap gap-2">
                  {ISTANBUL_DISTRICTS.slice(0, 15).map(loc => (
                    <button
                      key={loc}
                      onClick={() => togglePrefLocation(loc)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        user.preferences.preferredLocations.includes(loc)
                          ? 'bg-istanbul-sea text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl shadow-sm p-8 animate-fade-in">
            <h2 className="text-lg font-semibold text-istanbul-navy mb-6">Arama Geçmişi</h2>
            {user.searchHistory.length > 0 ? (
              <div className="space-y-3">
                {user.searchHistory.map((search, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 text-sm">
                      {search.query && <span className="font-medium">{search.query}</span>}
                      {search.type && <span className="text-gray-500"> • {search.type}</span>}
                      {search.location && <span className="text-gray-500"> • {search.location}</span>}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(search.timestamp).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400">Henüz arama geçmişiniz yok</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
}
