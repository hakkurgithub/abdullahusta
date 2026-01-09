'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Hata Görseli / İkonu */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-black text-gray-100 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="ri-restaurant-line text-6xl text-red-600 animate-bounce"></i>
          </div>
        </div>

        {/* Hata Mesajı */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Eyvah! Lezzet Duracağını Kaybettik.
        </h2>
        <p className="text-gray-600 mb-10 max-w-md mx-auto">
          Aradığınız sayfa mutfağa gitmiş olabilir veya hiç var olmamış olabilir. 
          Endişelenmeyin, sizi ana masamıza geri götürebiliriz.
        </p>

        {/* Yönlendirme Butonu */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-100 active:scale-95"
        >
          <i className="ri-home-4-line text-xl"></i>
          Ana Sayfaya Dön
        </Link>

        <div className="mt-12 text-gray-400 text-sm">
          Yardıma mı ihtiyacınız var? <Link href="/contact" className="text-red-600 hover:underline">Bize ulaşın.</Link>
        </div>
      </div>
    </div>
  );
}