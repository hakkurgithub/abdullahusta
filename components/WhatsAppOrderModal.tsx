'use client';

import { useState, useEffect } from 'react';
import { useCart } from './CartProvider';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppOrderModal({ isOpen, onClose }: WhatsAppOrderModalProps) {
  const [isClient, setIsClient] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const { items, getTotalPrice } = useCart();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isOpen || !isClient) return null;

  const handleWhatsAppOrder = () => {
    if (items.length === 0) {
      alert('Sepetinizde ürün bulunmuyor!');
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      alert('Lütfen ad ve telefon bilgilerinizi giriniz!');
      return;
    }

    const orderText = items.map(item => `• ${item.name} x${item.quantity} - ₺${(item.price * item.quantity).toFixed(0)}`).join('\n');
    const total = getTotalPrice().toFixed(0);
    
    // Abdullah Usta Kurumsal Mesaj Formatı
    const message = `🔥 *YENİ SİPARİŞ (Abdullah Usta)*\n\n📋 *Sipariş Detayları:*\n${orderText}\n\n💰 *Toplam Tutar:* ₺${total}\n\n👤 *Müşteri Bilgileri:*\n📛 Ad: ${customerInfo.name}\n📞 Tel: ${customerInfo.phone}\n📍 Adres: ${customerInfo.address || 'Belirtilmedi'}`;
    
    // Abdullah Usta Güncel WhatsApp Numarası
    const phoneNumber = '905442024244'; 
    const encodedMessage = encodeURIComponent(message);
    
    // Güvenli Yönlendirme
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">WhatsApp Sipariş</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-600 cursor-pointer transition-colors p-2"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Sepet Özeti */}
          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50/50">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <i className="ri-shopping-basket-2-line mr-2 text-red-600"></i>
              Sepet Özeti
            </h3>
            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Sepetinizde ürün bulunmuyor</p>
            ) : (
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{item.name} <span className="text-gray-400 text-xs">x{item.quantity}</span></span>
                    <span className="font-bold text-red-600">₺{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center font-black text-xl">
                    <span className="text-gray-800">Toplam:</span>
                    {/* Hata Düzeltildi: getTotalPrice() çağrıldı */}
                    <span className="text-red-600">₺{getTotalPrice().toFixed(0)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Müşteri Bilgileri */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center">
              <i className="ri-map-pin-user-line mr-2 text-red-600"></i>
              Teslimat Bilgileri
            </h3>
            
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Adınız Soyadınız *"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
                required
              />
              
              <input
                type="tel"
                placeholder="Telefon Numaranız *"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
                required
              />
              
              <textarea
                placeholder="Teslimat Adresiniz (Mahalle, Sokak, No...)"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm h-24 resize-none focus:ring-2 focus:ring-red-500 outline-none transition-all"
                maxLength={500}
              />
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">* Doldurulması zorunlu alanlar</div>
          </div>
          
          <button
            onClick={handleWhatsAppOrder}
            disabled={items.length === 0}
            className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#1ebe57] disabled:bg-gray-200 disabled:cursor-not-allowed transition-all shadow-xl shadow-green-100 flex items-center justify-center space-x-3 cursor-pointer active:scale-95"
          >
            <i className="ri-whatsapp-line text-2xl"></i>
            <span>Siparişi WhatsApp ile Gönder</span>
          </button>
        </div>
      </div>
    </div>
  );
}