'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  // Sadece ana sayfada miyiz? (URL tam olarak "/" mi?)
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- KESİN KARAR MEKANİZMASI ---
  // Şeffaf mod sadece ve sadece: Ana Sayfadaysak VE Scroll yapmadıysak geçerli.
  const isTransparent = isHomePage && !isScrolled;

  // Renkleri JavaScript değişkeni olarak tutuyoruz (Inline Style için)
  const textColor = isTransparent ? '#ffffff' : '#000000'; // Beyaz veya Siyah
  const bgColor = isTransparent ? 'transparent' : '#ffffff'; // Şeffaf veya Beyaz

  return (
    <nav 
      className="fixed w-full z-50 transition-all duration-300 shadow-sm"
      style={{ backgroundColor: bgColor }} // Arka planı zorla ayarla
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              style={{ 
                backgroundColor: isTransparent ? 'rgba(255,255,255,0.2)' : '#DC2626', // Şeffaf beyaz veya Kırmızı
                color: '#ffffff' // Logo içi her zaman beyaz
              }}
            >
              <span className="text-2xl font-bold">A</span>
            </div>
            <span 
              className="font-bold text-xl tracking-wider"
              style={{ color: isTransparent ? '#ffffff' : '#111827' }} // Yazı rengi zorla
            >
              {process.env.NEXT_PUBLIC_RESTAURANT_NAME || 'ABDULLAH USTA'}
            </span>
          </Link>

          {/* MASAÜSTÜ MENÜ */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Linkleri manuel ve doğru tanımlıyoruz */}
            {[
              { name: 'Ana Sayfa', path: '/' },
              { name: 'Menü', path: '/menu' },
              { name: 'İletişim', path: '/contact' }
            ].map((item) => {
              const isActive = pathname === item.path;
              
              return (
                <Link 
                  key={item.name}
                  href={item.path} 
                  className={`font-medium transition-colors hover:text-red-500 ${isActive ? 'font-bold' : ''}`}
                  style={{ 
                    color: isActive ? '#DC2626' : textColor // Aktifse kırmızı, değilse duruma göre (siyah/beyaz)
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
            
            {/* Rezervasyon Butonu */}
            <Link 
              href="/contact" 
              className="px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 shadow-sm"
              style={{
                backgroundColor: isTransparent ? '#ffffff' : '#DC2626',
                color: isTransparent ? '#111827' : '#ffffff'
              }}
            >
              Rezervasyon
            </Link>

             {/* Sepet / Login İkonu */}
             <Link href="/login" className="p-2 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  style={{ color: textColor }} // İkon rengini zorla
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
             </Link>
          </div>

          {/* MOBİL MENÜ BUTONU (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md focus:outline-none"
              style={{ color: textColor }} // Hamburger ikon rengini zorla
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
            {[
              { name: 'Ana Sayfa', path: '/' },
              { name: 'Menü', path: '/menu' },
              { name: 'İletişim', path: '/contact' }
            ].map((item) => (
                <Link 
                  key={item.name}
                  href={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-4 rounded-xl text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600 transition-colors border-b border-gray-50 last:border-0"
                >
                  {item.name}
                </Link>
            ))}
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
