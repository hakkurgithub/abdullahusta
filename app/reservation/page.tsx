'use client';

import { useState } from 'react';

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Rezervasyon bilgilerini WhatsApp'a yönlendirme
    const msg = `*YENİ REZERVASYON (Abdullah Usta)*%0A` +
                `-----------------%0A` +
                `*İsim:* ${formData.name}%0A` +
                `*Telefon:* ${formData.phone}%0A` +
                `*Tarih:* ${formData.date}%0A` +
                `*Saat:* ${formData.time}%0A` +
                `*Kişi Sayısı:* ${formData.guests}%0A` +
                `*Not:* ${formData.note || 'Yok'}`;
    
    setTimeout(() => {
      window.open(`https://wa.me/905442024244?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-red-700 py-16 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Masa Rezervasyonu</h1>
        <p className="text-red-100 max-w-xl mx-auto px-4">
          Abdullah Usta lezzetlerini yerinde tatmak için yerinizi şimdiden ayırtın.
        </p>
      </section>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          {success ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                <i className="ri-checkbox-circle-fill"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Talebiniz Alındı!</h2>
              <p className="text-gray-600 mb-8">Rezervasyon talebiniz WhatsApp üzerinden bize iletildi. Sizi en kısa sürede arayacağız.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="text-red-600 font-bold hover:underline"
              >
                Yeni Rezervasyon Yap
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Adınız Soyadınız</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    placeholder="Örn: Ahmet Yılmaz"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Telefon Numaranız</label>
                  <input
                    type="tel"
                    required
                    className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    placeholder="05XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tarih</label>
                  <input
                    type="date"
                    required
                    className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Saat</label>
                  <input
                    type="time"
                    required
                    className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kişi Sayısı</label>
                  <select
                    className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all bg-white"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} Kişi</option>
                    ))}
                    <option value="10+">10+ Kişi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Özel Not (Opsiyonel)</label>
                <textarea
                  className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all h-32 resize-none"
                  placeholder="Doğum günü, pencere kenarı vb. istekleriniz..."
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-100 active:scale-95 disabled:bg-gray-400"
              >
                {isSubmitting ? 'İşleniyor...' : 'Rezervasyon Talebi Oluştur'}
              </button>
            </form>
          )}
        </div>

        <div className="mt-12 text-center text-gray-500">
          <p>Hızlı rezervasyon için bizi arayabilirsiniz:</p>
          <a href="tel:02128120244" className="text-red-600 font-bold text-xl mt-2 block hover:underline">0212 812 02 44</a>
        </div>
      </main>
    </div>
  );
}