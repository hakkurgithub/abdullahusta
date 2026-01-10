'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Hangi sayfada oldugumuzu aliyoruz
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- KRITIK RENK MANTIGI ---
  // Navigasyonun "Dolu" (Beyaz Zemin, Siyah Yazi) gorunmesi gereken durumlar:
  // 1. Ana sayfada degilsek (Orn: /contact, /menu) -> KESINLIKLE DOLU OLSUN
  // 2. Ana sayfadaysak AMA asagi kaydirdiysak -> DOLU OLSUN
  const shouldBeSolid = !isHomePage || isScrolled;

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        shouldBeSolid 
          ? 'bg-white text-gray-900 shadow-md' // Dolu durum: Beyaz Zemin, Siyah Yazi
          : 'bg-transparent text-white'        // Seffaf durum: Seffaf Zemin, Beyaz Yazi
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              shouldBeSolid ? 'bg-red-600 text-white' : 'bg-white/10 text-white'
            }`}>
              <span className="text-2xl font-bold">A</span>
            </div>
            <span className={`font-bold text-xl tracking-wider ${
              shouldBeSolid ? 'text-gray-900' : 'text-white'
            }`}>
              {process.env.NEXT_PUBLIC_RESTAURANT_NAME || 'ABDULLAH USTA'}
            </span>
          </Link>

          {/* MASAUSTU MENU */}
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
                      : (shouldBeSolid ? 'text-gray-700 hover:text-red-600' : 'text-white/90 hover:text-white')
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
                shouldBeSolid 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              Rezervasyon
            </Link>
          </div>

          {/* MOBIL MENU BUTONU (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md focus:outline-none ${
                shouldBeSolid ? 'text-gray-900' : 'text-white'
              }`}
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
        <div className="md:hidden bg-white shadow-xl border-t border-gray-100 absolute w-full left-0 top-20">
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
