'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Merhaba, ben ${formData.name}. %0AE-posta: ${formData.email} %0A%0AMesajım: ${formData.message}`;
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">İletişim</h1>
          <p className="text-lg text-gray-600">Sorularınız ve rezervasyonlarınız için bize ulaşın.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* İletişim Bilgileri */}
          <div className="space-y-8">
            
            {/* ADRES KARTI VE BUTONU */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                  ���
                </div>
                <h3 className="text-xl font-bold text-gray-900">Adres</h3>
              </div>
              
              <p className="text-gray-600 ml-16 mb-6">
                {process.env.NEXT_PUBLIC_ADDRESS}
              </p>

              <div className="ml-16">
                <a 
                  href={process.env.NEXT_PUBLIC_MAPS_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-md hover:shadow-lg w-full sm:w-auto"
                >
                  <span>���️</span>
                  <span>Adrese Git (Haritada Aç)</span>
                </a>
              </div>
            </div>

            {/* Telefon Kartı */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                  ���
                </div>
                <h3 className="text-xl font-bold text-gray-900">Telefon</h3>
              </div>
              <div className="ml-16 space-y-2">
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="block text-gray-600 hover:text-red-600 hover:scale-105 transition-all origin-left font-medium">
                  Sabit: {process.env.NEXT_PUBLIC_PHONE_NUMBER}
                </a>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} target="_blank" className="block text-gray-600 hover:text-green-600 hover:scale-105 transition-all origin-left font-medium">
                  WhatsApp: 0544 202 42 44
                </a>
              </div>
            </div>

            {/* E-posta Kartı */}
            <a 
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              className="block bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                  ✉️
                </div>
                <h3 className="text-xl font-bold text-gray-900">E-posta</h3>
              </div>
              <p className="text-gray-600 ml-16 group-hover:text-red-600 transition-colors">
                {process.env.NEXT_PUBLIC_EMAIL}
              </p>
            </a>
          </div>

          {/* İletişim Formu */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">WhatsApp'tan Hızlı Mesaj</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Adınız Soyadınız</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="Adınız"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresiniz</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mesajınız</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all resize-none"
                  placeholder="Size nasıl yardımcı olabiliriz?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>WhatsApp İle Gönder</span>
                <span className="text-xl">���</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
