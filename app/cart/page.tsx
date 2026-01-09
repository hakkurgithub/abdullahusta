'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../components/CartProvider';

type FormData = { address: string; phone: string; payment: 'K.K.' | 'Nakit' };

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [form, setForm] = useState<FormData>({ 
    address: '', 
    phone: '', 
    payment: 'Nakit' 
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sendOrderToWhatsApp = () => {
    if (items.length === 0) {
      alert('Sepetiniz boş.');
      return;
    }
    setShowForm(true);
  };

  const finalizeOrder = () => {
    if (!form.address || !form.phone) {
      alert('Lütfen teslimat adresi ve telefon numaranızı girin.');
      return;
    }
    
    // Abdullah Usta WhatsApp Hattı
    const phoneRaw = '905442024244'; 
    
    const products = items
      .map((i) => `• ${i.name} x${i.quantity} -> ₺${(i.price * i.quantity).toFixed(0)}`)
      .join('%0A');
    
    const total = getTotalPrice().toFixed(0);
    const msg =
      `*YENİ SİPARİŞ (Abdullah Usta)*%0A` +
      `-----------------%0A` +
      products +
      `%0A-----------------%0A` +
      `*Toplam: ₺${total}*%0A` +
      `*Adres:* ${form.address}%0A` +
      `*Telefon:* ${form.phone}%0A` +
      `*Ödeme:* ${form.payment}`;

    window.open(`https://wa.me/${phoneRaw}?text=${msg}`, '_blank');
    clearCart();
    setShowForm(false);
  };

  if (!isClient) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i className="ri-shopping-cart-2-line text-4xl text-gray-400"></i>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sepetiniz Boş</h1>
        <p className="text-gray-500 mb-6">Görünüşe göre henüz bir ürün eklemediniz.</p>
        <Link href="/menu" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200">
          Menüye Göz At
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Alışveriş Sepetim</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ürün Listesi */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-6 border-b last:border-0 border-gray-50">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                    <p className="text-red-600 font-bold">{item.price} ₺</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <i className="ri-subtract-line"></i>
                      </button>
                      <span className="w-8 text-center font-bold text-gray-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <i className="ri-add-line"></i>
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="text-gray-400 hover:text-red-600 transition-colors p-2"
                      title="Ürünü Sil"
                    >
                      <i className="ri-delete-bin-line text-xl"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sipariş Özeti */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Sipariş Özeti</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Ara Toplam</span>
                  <span>{getTotalPrice().toFixed(0)} ₺</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Teslimat</span>
                  <span className="text-green-600 font-medium">Ücretsiz</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="text-lg font-bold text-gray-800">Toplam</span>
                  <span className="text-2xl font-black text-red-600">{getTotalPrice().toFixed(0)} ₺</span>
                </div>
              </div>

              <button 
                onClick={sendOrderToWhatsApp}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100 active:scale-95"
              >
                <i className="ri-whatsapp-line text-2xl"></i>
                Siparişi WhatsApp'la Gönder
              </button>
              
              <Link href="/menu" className="block text-center mt-4 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors">
                ← Alışverişe Devam Et
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sipariş Bilgi Formu Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Teslimat Bilgileri</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 p-2">
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Teslimat Adresi</label>
                <textarea 
                  placeholder="Mahalle, sokak, kapı no ve kat bilgilerini yazınız..." 
                  className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all h-32 resize-none"
                  value={form.address}
                  onChange={(e) => setForm({...form, address: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Telefon Numarası</label>
                <input 
                  type="tel" 
                  placeholder="05XX XXX XX XX" 
                  className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  value={form.phone}
                  onChange={(e) => setForm({...form, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ödeme Yöntemi</label>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setForm({...form, payment: 'Nakit'})}
                    className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${form.payment === 'Nakit' ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-100 bg-gray-50 text-gray-400'}`}
                  >
                    Nakit
                  </button>
                  <button 
                    onClick={() => setForm({...form, payment: 'K.K.'})}
                    className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${form.payment === 'K.K.' ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-100 bg-gray-50 text-gray-400'}`}
                  >
                    Kredi Kartı
                  </button>
                </div>
              </div>

              <button 
                onClick={finalizeOrder}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-100 mt-4 active:scale-95"
              >
                Siparişi Tamamla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}