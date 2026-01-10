'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Ana sayfada miyiz kontrolu
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // RENK MANTIGI:
  // 1. Eger Ana Sayfadaysak VE henuz asagi kaydirmadiysak -> Seffaf Arkaplan + Beyaz Yazi
  // 2. Diger tum durumlarda (Iletisim sayfasi veya scroll yapilmis ana sayfa) -> Beyaz Arkaplan + Siyah Yazi
  const isTransparent = isHomePage && !isScrolled;

  const navClasses = isTransparent
    ? 'bg-transparent text-white'
    : 'bg-white text-gray-900 shadow-md';

  const linkClasses = isTransparent
    ? 'hover:text-red-400'
    : 'hover:text-red-600';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isTransparent ? 'bg-white/10' : 'bg-red-600'}`}>
              <span className={`text-2xl font-bold ${isTransparent ? 'text-white' : 'text-white'}`}>A</span>
            </div>
            <span className={`font-bold text-xl tracking-wider ${isTransparent ? 'text-white' : 'text-gray-900'}`}>
              {process.env.NEXT_PUBLIC_RESTAURANT_NAME || 'ABDULLAH USTA'}
            </span>
          </Link>

          {/* MASAUSTU MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`font-medium transition-colors ${linkClasses}`}>Ana Sayfa</Link>
            <Link href="/menu" className={`font-medium transition-colors ${linkClasses}`}>Menü</Link>
            <Link href="/contact" className={`font-medium transition-colors ${linkClasses}`}>İletişim</Link>
            
            {/* Rezervasyon Butonu */}
            <Link 
              href="/contact" 
              className={`px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 ${
                isTransparent 
                  ? 'bg-white text-gray-900 hover:bg-gray-100' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              Rezervasyon
            </Link>
          </div>

          {/* MOBIL MENU BUTONU */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md focus:outline-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBIL MENU ACILIR KUTUSU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl border-t border-gray-100 absolute w-full left-0">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-4 rounded-xl text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              Ana Sayfa
            </Link>
            <Link 
              href="/menu" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-4 rounded-xl text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              Menü
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-4 rounded-xl text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              İletişim
            </Link>
            <div className="pt-4">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-4 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 shadow-lg transition-all"
              >
                Rezervasyon Yap
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
