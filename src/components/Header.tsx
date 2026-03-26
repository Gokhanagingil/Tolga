'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import {
  Home, Search, Heart, User, LogOut, Menu, X, Plus, Building2
} from 'lucide-react';

export default function Header() {
  const { user, isLoggedIn, logout } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-istanbul-navy rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-istanbul-gold" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-istanbul-navy font-display leading-tight">
                İstanbul Emlak
              </h1>
              <p className="text-[10px] text-istanbul-sea font-medium -mt-0.5">
                Hayalinizdeki Ev
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:text-istanbul-navy hover:bg-gray-50 transition-all font-medium text-sm">
              <Home className="w-4 h-4" />
              Ana Sayfa
            </Link>
            <Link href="/properties" className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:text-istanbul-navy hover:bg-gray-50 transition-all font-medium text-sm">
              <Search className="w-4 h-4" />
              Mülk Ara
            </Link>
            {isLoggedIn && (
              <>
                <Link href="/favorites" className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:text-istanbul-navy hover:bg-gray-50 transition-all font-medium text-sm">
                  <Heart className="w-4 h-4" />
                  Favoriler
                </Link>
                <Link href="/add-property" className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:text-istanbul-navy hover:bg-gray-50 transition-all font-medium text-sm">
                  <Plus className="w-4 h-4" />
                  İlan Ver
                </Link>
              </>
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link href="/profile" className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all">
                  <div className="w-8 h-8 bg-istanbul-sea rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all"
                  title="Çıkış Yap"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="btn-secondary text-sm py-2 px-4">
                  Giriş Yap
                </Link>
                <Link href="/register" className="btn-primary text-sm py-2 px-4">
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-slide-up">
            <nav className="flex flex-col gap-1">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-istanbul-navy hover:bg-gray-50 transition-all">
                <Home className="w-5 h-5" />
                Ana Sayfa
              </Link>
              <Link href="/properties" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-istanbul-navy hover:bg-gray-50 transition-all">
                <Search className="w-5 h-5" />
                Mülk Ara
              </Link>
              {isLoggedIn && (
                <>
                  <Link href="/favorites" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-istanbul-navy hover:bg-gray-50 transition-all">
                    <Heart className="w-5 h-5" />
                    Favoriler
                  </Link>
                  <Link href="/add-property" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-istanbul-navy hover:bg-gray-50 transition-all">
                    <Plus className="w-5 h-5" />
                    İlan Ver
                  </Link>
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-istanbul-navy hover:bg-gray-50 transition-all">
                    <User className="w-5 h-5" />
                    Profil
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Çıkış Yap
                  </button>
                </>
              )}
              {!isLoggedIn && (
                <div className="flex gap-2 mt-2 px-4">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="btn-secondary text-sm py-2 flex-1">
                    Giriş Yap
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-sm py-2 flex-1">
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
