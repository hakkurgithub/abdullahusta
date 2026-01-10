'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  // Sadece ana sayfada miyiz?
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- KESİN ÇÖZÜM MANTIĞI ---
  // Varsayılan olarak (her sayfa için): Arka plan BEYAZ, Yazı SİYAH (Görünür)
  // Sadece: Ana Sayfadaysak VE Scroll yapmadıysak -> Şeffaf/Beyaz yap.
  
  const isTransparentMode = isHomePage && !isScrolled;

  // Renk sınıfları (Zorlayıcı ! işaretleri ile)
  const navClasses = isTransparentMode
    ? 'bg-transparent text-white' 
    : 'bg-white !text-black shadow-md border-b border-gray-100'; // !text-black ile siyahı zorluyoruz

  // Link renkleri
  const linkClasses = isTransparentMode
    ? 'text-white hover:text-red-400'
    : '!text-black hover:text-red-600'; // !text-black ile siyahı zorluyoruz

  // Logo kutusu
  const logoBoxClass = isTransparentMode
    ? 'bg-white/20 text-white'
    : 'bg-red-600 text-white';

  // Logo yazısı
  const logoTextClass = isTransparentMode
    ? 'text-white'
    : '!text-black';

  // Hamburger Menü İkonu Rengi
  const hamburgerColor = isTransparentMode ? 'text-white' : '!text-black';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${logoBoxClass}`}>
              <span className="text-2xl font-bold">A</span>
            </div>
            <span className={`font-bold text-xl tracking-wider ${logoTextClass}`}>
              {process.env.NEXT_PUBLIC_RESTAURANT_NAME || 'ABDULLAH USTA'}
            </span>
          </Link>

          {/* MASAÜSTÜ MENÜ */}
          <div className="hidden md:flex items-center space-x-8">
            {['Ana Sayfa', 'Menü', 'Hakkımızda', 'İletişim'].map((item) => {
              const href = item === 'Ana Sayfa' ? '/' : `/${item.toLowerCase().replace('ü', 'u').replace('ı', 'i').replace('ş', 's').replace(' ', '-')}`;
              const isActive = pathname === href;
              
              return (
                <Link 
                  key={item}
                  href={href} 
                  className={`font-medium transition-colors ${
                    isActive 
                      ? 'text-red-600 font-bold' 
                      : linkClasses
                  }`}
                >
                  {item}
                </Link>
              );
            })}
            
            {/* Rezervasyon Butonu */}
            <Link 
              href="/contact" 
              className={`px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 shadow-sm ${
                isTransparentMode 
                  ? 'bg-white text-gray-900 hover:bg-gray-100' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              Rezervasyon
            </Link>

            {/* Sepet İkonu */}
             <Link href="/login" className={`p-2 transition-colors ${linkClasses}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
             </Link>
          </div>

          {/* MOBİL MENÜ BUTONU (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md focus:outline-none ${hamburgerColor}`}
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

      {/* MOBİL MENÜ AÇILIR KUTUSU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl border-t border-gray-100 absolute w-full left-0 top-20 z-50">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {['Ana Sayfa', 'Menü', 'Hakkımızda', 'İletişim'].map((item) => {
               const href = item === 'Ana Sayfa' ? '/' : `/${item.toLowerCase().replace('ü', 'u').replace('ı', 'i').replace('ş', 's').replace(' ', '-')}`;
               return (
                <Link 
                  key={item}
                  href={href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-4 rounded-xl text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600 transition-colors border-b border-gray-50 last:border-0"
                >
                  {item}
                </Link>
               )
            })}
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
