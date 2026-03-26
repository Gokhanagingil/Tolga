'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { ISTANBUL_DISTRICTS } from '@/lib/data';
import { PropertyType } from '@/types';
import {
  User, Mail, Phone, ChevronRight, MapPin, Home, DollarSign,
  Sparkles, CheckCircle2, ArrowRight, Building2
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, updatePreferences } = useAppStore();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [selectedTypes, setSelectedTypes] = useState<PropertyType[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRooms, setMinRooms] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Ad soyad gereklidir';
    if (!email.trim()) newErrors.email = 'E-posta gereklidir';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Geçerli bir e-posta girin';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1 = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleComplete = () => {
    register(name, email, phone);
    updatePreferences({
      propertyTypes: selectedTypes,
      preferredLocations: selectedLocations,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minRooms: minRooms ? Number(minRooms) : undefined,
    });
    router.push('/');
  };

  const toggleType = (type: PropertyType) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev =>
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-istanbul-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-istanbul-gold" />
          </div>
          <h1 className="text-2xl font-bold text-istanbul-navy font-display mb-2">
            Hesap Oluştur
          </h1>
          <p className="text-gray-500 text-sm">
            Kişiselleştirilmiş öneriler alın ve favorilerinizi kaydedin
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= s ? 'bg-istanbul-navy text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              <span className={`text-sm font-medium ${step >= s ? 'text-istanbul-navy' : 'text-gray-400'}`}>
                {s === 1 ? 'Hesap Bilgileri' : 'Tercihler'}
              </span>
              {s < 2 && <ChevronRight className="w-4 h-4 text-gray-300" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Ad Soyad *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adınız ve soyadınız"
                    className={`input-field pl-10 ${errors.name ? 'border-red-300 focus:ring-red-300' : ''}`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  E-posta *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    className={`input-field pl-10 ${errors.email ? 'border-red-300 focus:ring-red-300' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Telefon
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+90 5xx xxx xx xx"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <button onClick={handleStep1} className="btn-primary w-full mt-4">
                Devam Et
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-sm text-gray-500">
                Zaten hesabınız var mı?{' '}
                <Link href="/login" className="text-istanbul-sea font-semibold hover:underline">
                  Giriş Yap
                </Link>
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-istanbul-gold" />
                <h3 className="font-semibold text-istanbul-navy">Tercihlerinizi Belirleyin</h3>
              </div>
              <p className="text-sm text-gray-500 -mt-4">
                Kişiselleştirilmiş öneriler almak için tercihlerinizi seçin
              </p>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  İlgilendiğiniz Mülk Tipi
                </label>
                <div className="flex gap-2">
                  {(['Satılık', 'Kiralık'] as PropertyType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                        selectedTypes.includes(type)
                          ? 'bg-istanbul-navy text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {type === 'Satılık' ? <Home className="w-4 h-4 inline mr-2" /> : null}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Tercih Ettiğiniz Bölgeler
                </label>
                <div className="flex flex-wrap gap-2">
                  {ISTANBUL_DISTRICTS.slice(0, 10).map(loc => (
                    <button
                      key={loc}
                      onClick={() => toggleLocation(loc)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedLocations.includes(loc)
                          ? 'bg-istanbul-sea text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Min. Bütçe (₺)
                  </label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="0"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Maks. Bütçe (₺)
                  </label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Sınırsız"
                    className="input-field text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Min. Oda Sayısı
                </label>
                <select
                  value={minRooms}
                  onChange={(e) => setMinRooms(e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">Farketmez</option>
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n}+</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  Geri
                </button>
                <button
                  onClick={handleComplete}
                  className="btn-primary flex-1"
                >
                  Tamamla
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleComplete}
                className="text-sm text-gray-400 hover:text-gray-600 mx-auto block transition-colors"
              >
                Bu adımı atla →
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
