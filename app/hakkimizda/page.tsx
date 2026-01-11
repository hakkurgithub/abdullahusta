'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Hakkımızda Sayfasına Özel */}
      <section className="relative h-64 bg-red-700 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2">Hakkımızda</h1>
          <div className="w-20 h-1 bg-white mx-auto mb-4"></div>
          <p className="text-xl opacity-90">Geleneksel lezzet hikayemiz</p>
        </div>
      </section>

      {/* İçerik Alanı */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Ustalığın ve Lezzetin Adresi</h2>
            <p className="text-gray-600 leading-relaxed">
              Abdullah Usta olarak, 40 yılı aşkın süredir kebap ve pide sanatını en saf haliyle icra ediyoruz. 
              Avcılar Üniversite Mahallesi'ndeki yerimizde, babadan oğula geçen kadim tariflerle hizmet vermekteyiz.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Her sabah özenle seçilen etlerimiz, taze sebzelerimiz ve usta ellerin dokunuşuyla hazırlanan 
              ürünlerimizle, misafirlerimize sadece bir yemek değil, bir lezzet serüveni sunuyoruz.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-bold text-xl">40+ Yıl</h4>
                <p className="text-sm text-gray-500">Tecrübe</p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-bold text-xl">88+ Çeşit</h4>
                <p className="text-sm text-gray-500">Zengin Menü</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://raw.githubusercontent.com/hakkurgithub/images/main/abdullah-usta-oncu.jpg" 
              alt="Abdullah Usta Restoran" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
              <p className="text-white font-medium italic">"Lezzet, usta ellerde hayat bulur."</p>
            </div>
          </div>
        </div>

        {/* Vizyon & Misyon */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <div className="text-red-600 text-3xl mb-4">
              {/* Emoji ikon kullandik cunku remixicon kutuphanesi yuklu olmayabilir */}
              <span>���</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Kalite Politikamız</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              En üst kalite standartlarında ürün seçimi yaparak, hijyen kurallarından asla taviz vermeden hizmet sunuyoruz.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <div className="text-red-600 text-3xl mb-4">
               <span>❤️</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Tazelik Sözü</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tüm sebze ve et ürünlerimizi günlük olarak tedarik ediyor, dondurulmuş ürün kullanmıyoruz.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <div className="text-red-600 text-3xl mb-4">
               <span>���</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Müşteri Memnuniyeti</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Her misafirimizi evimizde ağırlıyormuşçasına samimiyet ve özenle karşılıyoruz.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
