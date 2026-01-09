'use client';

import { useState } from 'react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rezervasyon Mesajı Oluşturma
    const message = `✨ *YENİ REZERVASYON (Abdullah Usta)* ✨\n\n` +
                    `👤 *İsim:* ${formData.name}\n` +
                    `📞 *Telefon:* ${formData.phone}\n` +
                    `📅 *Tarih:* ${formData.date}\n` +
                    `⏰ *Saat:* ${formData.time}\n` +
                    `👥 *Kişi Sayısı:* ${formData.guests}\n` +
                    `✉️ *E-posta:* ${formData.email}\n` +
                    `📝 *Not:* ${formData.notes || 'Yok'}`;

    const phoneNumber = '905442024244';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10000] p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>
        
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
          <i className="ri-calendar-check-line mr-3 text-red-600"></i>
          Rezervasyon
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Ad Soyad *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
                placeholder="Ahmet Yılmaz"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Telefon *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  placeholder="05XX XXX XX XX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">E-posta</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  placeholder="örnek@mail.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tarih *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Saat *</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Kişi Sayısı</label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
                className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm outline-none cursor-pointer"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} Kişi</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Özel İstekler</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm h-24 resize-none focus:ring-2 focus:ring-red-500 outline-none transition-all"
                placeholder="Doğum günü, çocuk koltuğu vb..."
                maxLength={500}
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-100 active:scale-95 cursor-pointer mt-4"
          >
            Rezervasyon Talebi Gönder
          </button>
        </form>
      </div>
    </div>
  );
}