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
    
    // İşletme Numarası: 0544 202 42 44
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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sepetiniz Boş</h1>
        <Link href="/menu" className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold">
          Menüye Geri Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md p-4 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-600">Abdullah Usta</Link>
          <Link href="/menu" className="text-gray-600 hover:text-red-600 font-medium">Menü</Link>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">Sepetteki Ürünler</h2>
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-0">
              <div>
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.price} ₺</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1">-</button>
                  <span className="px-2 font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1">+</button>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-600 font-bold">Sil</button>
              </div>
            </div>
          ))}
          <div className="text-right mt-6">
            <p className="text-2xl font-extrabold text-red-600">Toplam: {getTotalPrice().toFixed(0)} ₺</p>
          </div>
        </div>

        <button 
          onClick={sendOrderToWhatsApp}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
        >
          Siparişi Onayla ve WhatsApp'tan Gönder
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Teslimat Bilgileri</h3>
            <div className="space-y-4">
              <textarea 
                placeholder="Tam Adresiniz (Mahalle, Sokak, No, Kat...)" 
                className="w-full border p-3 rounded-lg"
                value={form.address}
                onChange={(e) => setForm({...form, address: e.target.value})}
              />
              <input 
                type="tel" 
                placeholder="Telefon Numaranız" 
                className="w-full border p-3 rounded-lg"
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
              />
              <div className="flex gap-2">
                <button 
                  onClick={() => setForm({...form, payment: 'Nakit'})}
                  className={`flex-1 py-2 rounded-lg border ${form.payment === 'Nakit' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
                >Nakit</button>
                <button 
                  onClick={() => setForm({...form, payment: 'K.K.'})}
                  className={`flex-1 py-2 rounded-lg border ${form.payment === 'K.K.' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
                >Kredi Kartı</button>
              </div>
              <button 
                onClick={finalizeOrder}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold"
              >Tamamla</button>
              <button 
                onClick={() => setShowForm(false)}
                className="w-full text-gray-500 font-medium"
              >Vazgeç</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}