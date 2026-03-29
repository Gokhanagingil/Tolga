'use client';

import Link from 'next/link';
import { Building2, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-istanbul-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-istanbul-gold rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display">İstanbul Emlak</h3>
                <p className="text-xs text-istanbul-sea">Demo Platform</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              İstanbul&apos;un en prestijli semtlerinde emlak arama ve listeleme platformu.
            </p>
          </div>

          <div>
            <h4 className="text-istanbul-gold font-semibold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">Ana Sayfa</Link></li>
              <li><Link href="/properties" className="text-gray-300 hover:text-white transition-colors text-sm">Mülk Ara</Link></li>
              <li><Link href="/properties?type=Satılık" className="text-gray-300 hover:text-white transition-colors text-sm">Satılık Mülkler</Link></li>
              <li><Link href="/properties?type=Kiralık" className="text-gray-300 hover:text-white transition-colors text-sm">Kiralık Mülkler</Link></li>
              <li><Link href="/register" className="text-gray-300 hover:text-white transition-colors text-sm">Kayıt Ol</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-istanbul-gold font-semibold mb-4">Popüler Bölgeler</h4>
            <ul className="space-y-2">
              {['Beşiktaş', 'Kadıköy', 'Şişli', 'Sarıyer', 'Ataşehir', 'Bakırköy'].map((district) => (
                <li key={district}>
                  <Link
                    href={`/properties?location=${district}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {district}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; 2026 İstanbul Emlak Platformu. Demo uygulama.
          </p>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            İstanbul, Türkiye
          </div>
        </div>
      </div>
    </footer>
  );
}
