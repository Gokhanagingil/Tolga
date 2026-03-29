'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { useAppStore } from '@/lib/store';
import { ISTANBUL_DISTRICTS } from '@/lib/data';
import { PropertyType, PropertyCategory } from '@/types';
import {
  User, Plus, CheckCircle2, Building2, X
} from 'lucide-react';

export default function AddPropertyPage() {
  const router = useRouter();
  const { isLoggedIn, user, addProperty } = useAppStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState<PropertyType>('Satılık');
  const [category, setCategory] = useState<PropertyCategory>('Daire');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [rooms, setRooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [area, setArea] = useState('');
  const [floor, setFloor] = useState('');
  const [totalFloors, setTotalFloors] = useState('');
  const [buildingAge, setBuildingAge] = useState('');
  const [furnished, setFurnished] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <User className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Giriş yapmanız gerekiyor</h2>
          <p className="text-gray-400 mb-6">İlan vermek için giriş yapın.</p>
          <Link href="/login" className="btn-primary">Giriş Yap</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (f: string) => {
    setFeatures(features.filter(feat => feat !== f));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Başlık gereklidir';
    if (!description.trim()) newErrors.description = 'Açıklama gereklidir';
    if (!price) newErrors.price = 'Fiyat gereklidir';
    if (!location) newErrors.location = 'Bölge seçimi gereklidir';
    if (!area) newErrors.area = 'Alan bilgisi gereklidir';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const priceNum = Number(price);
    const formatted = type === 'Kiralık'
      ? `${new Intl.NumberFormat('tr-TR').format(priceNum)} ₺/ay`
      : `${new Intl.NumberFormat('tr-TR').format(priceNum)} ₺`;

    addProperty({
      title,
      description,
      price: priceNum,
      priceFormatted: formatted,
      type,
      category,
      location,
      district: location,
      address: address || location,
      features: features.length > 0 ? features : [`${rooms || 0} Oda`, `${bathrooms || 0} Banyo`, `${area} m²`],
      rooms: Number(rooms) || 0,
      bathrooms: Number(bathrooms) || 0,
      area: Number(area),
      floor: floor ? Number(floor) : undefined,
      totalFloors: totalFloors ? Number(totalFloors) : undefined,
      buildingAge: buildingAge ? Number(buildingAge) : undefined,
      furnished,
      images: [
        { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', alt: 'Mülk fotoğrafı', isMain: true },
        { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', alt: 'İç mekan', isMain: false },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', alt: 'Mutfak', isMain: false },
        { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop', alt: 'Yatak odası', isMain: false },
        { url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop', alt: 'Banyo', isMain: false },
      ],
      agentId: user!.id,
      agentName: user!.name,
      agentPhone: user!.phone || '+90 5xx xxx xx xx',
    });

    setSuccess(true);
    setTimeout(() => router.push('/properties'), 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-istanbul-navy mb-2">İlanınız Eklendi!</h2>
          <p className="text-gray-500 mb-6">İlanınız başarıyla yayınlandı. Yönlendiriliyorsunuz...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-istanbul-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Plus className="w-8 h-8 text-istanbul-gold" />
            <div>
              <h1 className="text-3xl font-bold text-white font-display">İlan Ver</h1>
              <p className="text-gray-300">Mülkünüzü hızlıca platforma ekleyin</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-lg font-semibold text-istanbul-navy mb-6">Temel Bilgiler</h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">İlan Başlığı *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn: Boğaz Manzaralı Lüks Daire"
                  className={`input-field ${errors.title ? 'border-red-300' : ''}`}
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Açıklama *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mülkünüzü detaylı olarak açıklayın..."
                  rows={4}
                  className={`input-field resize-none ${errors.description ? 'border-red-300' : ''}`}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">İlan Tipi</label>
                  <div className="flex gap-2">
                    {(['Satılık', 'Kiralık'] as PropertyType[]).map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                          type === t ? 'bg-istanbul-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PropertyCategory)}
                    className="input-field"
                  >
                    {['Daire', 'Villa', 'Dükkan', 'Ofis', 'Arsa'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Fiyat (₺) {type === 'Kiralık' ? '/ Aylık' : ''} *
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    className={`input-field ${errors.price ? 'border-red-300' : ''}`}
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Bölge *</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`input-field ${errors.location ? 'border-red-300' : ''}`}
                  >
                    <option value="">Seçin</option>
                    {ISTANBUL_DISTRICTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Adres</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Mahalle, cadde, sokak..."
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-lg font-semibold text-istanbul-navy mb-6">Mülk Detayları</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Oda Sayısı</label>
                <input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} placeholder="3" className="input-field" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Banyo</label>
                <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} placeholder="2" className="input-field" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Alan (m²) *</label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="150"
                  className={`input-field ${errors.area ? 'border-red-300' : ''}`}
                />
                {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Bulunduğu Kat</label>
                <input type="number" value={floor} onChange={(e) => setFloor(e.target.value)} placeholder="5" className="input-field" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Toplam Kat</label>
                <input type="number" value={totalFloors} onChange={(e) => setTotalFloors(e.target.value)} placeholder="10" className="input-field" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Bina Yaşı</label>
                <input type="number" value={buildingAge} onChange={(e) => setBuildingAge(e.target.value)} placeholder="5" className="input-field" />
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={furnished}
                  onChange={(e) => setFurnished(e.target.checked)}
                  className="rounded border-gray-300 text-istanbul-navy focus:ring-istanbul-sea"
                />
                <span className="text-sm text-gray-700">Eşyalı</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-lg font-semibold text-istanbul-navy mb-6">Özellikler</h2>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                placeholder="Özellik ekleyin (ör: Havuz)"
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="btn-secondary px-4"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {features.map((f) => (
                  <span key={f} className="badge bg-istanbul-sea/10 text-istanbul-sea pr-1">
                    {f}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(f)}
                      className="ml-1 w-5 h-5 rounded-full hover:bg-istanbul-sea/20 flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="btn-primary w-full py-4 text-lg">
            <CheckCircle2 className="w-5 h-5" />
            İlanı Yayınla
          </button>
        </form>
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
}
