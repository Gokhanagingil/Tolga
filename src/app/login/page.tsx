'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { Mail, Lock, Building2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { register } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('E-posta adresinizi girin');
      return;
    }
    register(email.split('@')[0], email);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-istanbul-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-istanbul-gold" />
          </div>
          <h1 className="text-2xl font-bold text-istanbul-navy font-display mb-2">
            Hoş Geldiniz
          </h1>
          <p className="text-gray-500 text-sm">
            Hesabınıza giriş yapın
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="ornek@email.com"
                  className={`input-field pl-10 ${error ? 'border-red-300' : ''}`}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 text-istanbul-navy focus:ring-istanbul-sea" />
                <span className="text-sm text-gray-600">Beni hatırla</span>
              </label>
              <a href="#" className="text-sm text-istanbul-sea hover:underline">Şifremi unuttum</a>
            </div>

            <button type="submit" className="btn-primary w-full">
              Giriş Yap
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Hesabınız yok mu?{' '}
              <Link href="/register" className="text-istanbul-sea font-semibold hover:underline">
                Kayıt Ol
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
