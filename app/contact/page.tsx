'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Doğru Google Maps Bağlantısı
  const mapLink = "https://www.google.com/maps/place/?q=place_id:ChIJJWhsEXqhyhQRDGKx44DnLiI";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form gönderme simülasyonu
    setTimeout(() => {
      setSubmitMessage({
        type: 'success',
        text: 'Mesajınız başarıyla iletildi! En kısa sürede size dönüş yapacağız.',
      });
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-red-700 py-16 text-white text-center">
        <h1 className="text-4xl font-extrabold mb-4 uppercase tracking-tight">İletişim</h1>
        <p className="text-red-100 max-w-2xl mx-auto px-4">
          Abdullah Usta lezzetleri ve hizmetiyle ilgili her türlü sorunuz için yanınızdayız.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-6">
            {/* Adres Kartı */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                  <i className="ri-map-pin-2-fill text-2xl"></i>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Adres</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Avcılar Üniversite Mah. Mareşal Cad. No:22<br />
                İstanbul, Turkey 34320
              </p>
              <a 
                href={mapLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-red-600 font-bold hover:underline flex items-center gap-1"
              >
                <i className="ri-map-2-line"></i> Haritada Yol Tarifi Al
              </a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                  <i className="ri-phone-fill text-2xl"></i>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Telefon</h3>
              </div>
              <p className="text-gray-600">Sabit: 0212 812 02 44</p>
              <p className="text-gray-900 font-bold mt-1">WhatsApp: 0544 202 42 44</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                  <i className="ri-mail-fill text-2xl"></i>
                </div>
                <h3 className="font-bold text-gray-800 text-lg">E-posta</h3>
              </div>
              <p className="text-gray-600">burakkeskin4244@gmail.com</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Bize Mesaj Gönderin</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Adınız Soyadınız"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-posta Adresiniz"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    required
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Mesajınız..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-100 active:scale-95 disabled:bg-gray-400 cursor-pointer"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                </button>
                {submitMessage && (
                  <div className={`mt-4 p-4 rounded-xl text-center font-bold ${submitMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {submitMessage.text}
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}