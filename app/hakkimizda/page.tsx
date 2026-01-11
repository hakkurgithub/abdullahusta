'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-64 bg-red-700 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2">Hakk&#305;m&#305;zda</h1>
          <div className="w-20 h-1 bg-white mx-auto mb-4"></div>
          <p className="text-xl opacity-90">Geleneksel lezzet hikayemiz</p>
        </div>
      </section>

      {/* Icerik Alani */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Ustal&#305;&#287;&#305;n ve Lezzetin Adresi</h2>
            <p className="text-gray-600 leading-relaxed">
              Abdullah Usta olarak, 40 y&#305;l&#305; a&#351;k&#305;n s&#252;redir kebap ve pide sanat&#305;n&#305; en saf haliyle icra ediyoruz. 
              Avc&#305;lar &#220;niversite Mahallesi'ndeki yerimizde, babadan o&#287;ula ge&#231;en kadim tariflerle hizmet vermekteyiz.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Her sabah &#246;zenle se&#231;ilen etlerimiz, taze sebzelerimiz ve usta ellerin dokunu&#351;uyla haz&#305;rlanan 
              &#252;r&#252;nlerimizle, misafirlerimize sadece bir yemek de&#287;il, bir lezzet ser&#252;veni sunuyoruz.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-bold text-xl">40+ Y&#305;l</h4>
                <p className="text-sm text-gray-500">Tecr&#252;be</p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-bold text-xl">88+ &#199;e&#351;it</h4>
                <p className="text-sm text-gray-500">Zengin Men&#252;</p>
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
              <span>&#127941;</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Kalite Politikam&#305;z</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              En &#252;st kalite standartlar&#305;nda &#252;r&#252;n se&#231;imi yaparak, hijyen kurallar&#305;ndan asla taviz vermeden hizmet sunuyoruz.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <div className="text-red-600 text-3xl mb-4">
               <span>&#10084;&#65039;</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Tazelik S&#246;z&#252;</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              T&#252;m sebze ve et &#252;r&#252;nlerimiz g&#252;nl&#252;k olarak tedarik ediyor, dondurulmu&#351; &#252;r&#252;n kullanm&#305;yoruz.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <div className="text-red-600 text-3xl mb-4">
               <span>&#128522;</span>
            </div>
            <h3 className="text-xl font-bold mb-3">M&#252;&#351;teri Memnuniyeti</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Her misafirimizi evimizde a&#287;&#305;rl&#305;yormu&#351;&#231;as&#305;na samimiyet ve &#246;zenle kar&#351;&#305;l&#305;yoruz.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
