'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from './CartProvider';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // GÜVENLİ KOD: items undefined gelirse boş dizi [] kabul et
  const cartContext = useCart();
  const items = cartContext?.items || []; 

  // Sepetteki toplam ürün sayısı (Hata korumalı)
  const cartItemCount = items.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-red-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-xl">A</div>
            <span className="font-bold text-xl text-gray-800">Abdullah Usta</span>
          </Link>

          {/* Masaüstü Menü */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-red-600 font-medium transition">Ana Sayfa</Link>
            <Link href="/menu" className="text-gray-600 hover:text-red-600 font-medium transition">Menü</Link>
            <Link href="/hakkimizda" className="text-gray-600 hover:text-red-600 font-medium transition">Hakkımızda</Link>
            <Link href="/contact" className="text-gray-600 hover:text-red-600 font-medium transition">İletişim</Link>
          </div>

          {/* Sağ Taraf */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-red-600 transition">
              <i className="ri-shopping-bag-3-line text-2xl"></i>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white transform translate-x-1 -translate-y-1">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link href="/login" className="text-gray-600 font-medium hover:text-red-600">Giriş Yap</Link>
            <Link href="/register" className="bg-red-600 text-white px-5 py-2 rounded-full font-bold hover:bg-red-700 transition shadow-lg shadow-red-200">
              Kayıt Ol
            </Link>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="md:hidden flex items-center gap-4">
             <Link href="/cart" className="relative p-2 text-gray-600">
              <i className="ri-shopping-bag-3-line text-2xl"></i>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-gray-600 hover:text-red-600 font-medium">Ana Sayfa</Link>
            <Link href="/menu" className="block px-3 py-2 text-gray-600 hover:text-red-600 font-medium">Menü</Link>
            <Link href="/hakkimizda" className="block px-3 py-2 text-gray-600 hover:text-red-600 font-medium">Hakkımızda</Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-600 hover:text-red-600 font-medium">İletişim</Link>
            <div className="border-t pt-2 mt-2">
              <Link href="/login" className="block px-3 py-2 text-gray-600 font-medium">Giriş Yap</Link>
              <Link href="/register" className="block px-3 py-2 text-red-600 font-bold">Kayıt Ol</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}