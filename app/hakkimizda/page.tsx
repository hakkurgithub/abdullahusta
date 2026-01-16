'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-64 bg-red-700 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2">Hakk&#305;m&#305;zda</h1>
          <div className="w-20 h-1 bg-white mx-auto mb-4"></div>
          <p className="text-xl opacity-90">Geleneksel lezzet hikayemiz</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Ustal&#305;&#287;&#305;n ve Lezzetin Adresi</h2>
            <p className="text-gray-600 leading-relaxed">
              Abdullah Usta olarak, 40 y&#305;l&#305; a&#351;k&#305;n s&#252;redir kebap ve pide sanat&#305;n&#305; en saf haliyle icra ediyoruz. 
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
          </div>
        </div>
      </main>
    </div>
  );
}
