'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartProvider'; // Sepet verisini çekiyoruz

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Sepetteki ürün sayısını hesapla
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHomePage && !isScrolled;
  
  const menuItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Menü', path: '/menu' },
    { name: 'Hakkımızda', path: '/hakkimizda' },
    { name: 'İletişim', path: '/contact' }
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage ? 'bg-white shadow-md text-gray-900' : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
             <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">A</div>
             <span className={`font-bold text-xl ${isScrolled || !isHomePage ? 'text-gray-900' : 'text-white'}`}>
               Abdullah Usta
             </span>
          </Link>

          {/* MASAÜSTÜ MENÜ */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link 
                key={item.name}
                href={item.path} 
                className="font-medium hover:text-red-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* --- YENİ EKLENEN SEPET İKONU --- */}
            <Link href="/cart" className="relative p-2 hover:text-red-600 transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* REZERVASYON BUTONU */}
            <Link 
              href="/reservation" 
              className="bg-red-600 text-white px-5 py-2 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg"
            >
              Rezervasyon
            </Link>
          </div>

          {/* MOBİL MENÜ BUTONU */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobilde de Sepet Görünsün */}
            <Link href="/cart" className="relative p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-2xl">
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* MOBİL MENÜ LİSTESİ */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl border-t border-gray-100 absolute w-full left-0 top-20 z-50">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {menuItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-gray-900 hover:bg-red-50 hover:text-red-600 border-b border-gray-50"
                >
                  {item.name}
                </Link>
            ))}
            <Link
                href="/reservation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-4 bg-red-600 text-white font-bold rounded-xl mt-4"
            >
              Rezervasyon Yap
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}