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

    const orderText = items.map(item => `${item.name} x${item.quantity} - ₺${(item.price * item.quantity).toFixed(0)}`).join('\n');
    const totalPrice = getTotalPrice().toFixed(0);
    
    const message = `🍽️ *Abdullah Usta Siparişi*\n\n📋 *Sipariş Detayları:*\n${orderText}\n\n💰 *Toplam Tutar:* ₺${totalPrice}\n\n👤 *Müşteri Bilgileri:*\n📛 Ad: ${customerInfo.name}\n📞 Telefon: ${customerInfo.phone}\n📍 Adres: ${customerInfo.address}`;
    
    const phoneNumber = '905455093462';
    const encodedMessage = encodeURIComponent(message);
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let whatsappUrl;
    if (isMobile) {
      whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    } else {
      whatsappUrl = `https://web.whatsapp.com/send?phone=+${phoneNumber}&text=${encodedMessage}`;
    }
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">WhatsApp Sipariş</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Sepet Özeti */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold mb-3 flex items-center">
              <i className="ri-shopping-cart-line mr-2 text-red-600"></i>
              Sepet Özeti
            </h3>
            {items.length === 0 ? (
              <p className="text-gray-600 text-center py-4">Sepetinizde ürün bulunmuyor</p>
            ) : (
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-sm">{item.name} x{item.quantity}</span>
                    <span className="font-semibold text-red-600">₺{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Toplam:</span>
                    <span className="text-red-600">₺{getTotalPrice().toFixed(0)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Müşteri Bilgileri */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center">
              <i className="ri-user-line mr-2 text-red-600"></i>
              İletişim Bilgileri
            </h3>
            
            <input
              type="text"
              placeholder="Adınız *"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              required
            />
            
            <input
              type="tel"
              placeholder="Telefon Numaranız *"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              required
            />
            
            <textarea
              placeholder="Teslimat Adresiniz"
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg text-sm h-20 resize-none"
              maxLength={500}
            />
            <div className="text-xs text-gray-500">* Zorunlu alanlar</div>
          </div>
          
          <button
            onClick={handleWhatsAppOrder}
            disabled={items.length === 0}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors whitespace-nowrap flex items-center justify-center space-x-2 cursor-pointer"
          >
            <i className="ri-whatsapp-line text-lg"></i>
            <span>WhatsApp ile Sipariş Ver</span>
          </button>
          
          {items.length === 0 && (
            <p className="text-center text-sm text-gray-600">
              Sipariş vermek için önce sepetinize ürün ekleyin
            </p>
          )}
        </div>
      </div>
    </div>
  );
}