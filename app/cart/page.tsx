'use client';

import { useCart } from '@/components/CartProvider';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeItem, total, clearCart } = useCart();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    paymentMethod: 'CASH', // Varsayılan: Nakit
    note: ''
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total,
          ...formData
        }),
      });

      const data = await res.json();

      if (res.ok) {
        clearCart(); // Sepeti temizle
        alert('🎉 Siparişiniz Alındı! Profil sayfasından takip edebilirsiniz.');
        router.push('/profile'); // Profile yönlendir
      } else {
        if (res.status === 401) {
          if (confirm('Sipariş vermek için giriş yapmalısınız. Giriş sayfasına gidilsin mi?')) {
            router.push('/login');
          }
        } else {
          alert('Hata: ' + data.error);
        }
      }
    } catch (error) {
      alert('Bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sepetiniz Boş 😔</h1>
        <button onClick={() => router.push('/menu')} className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700">
          Menüye Dön
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL: SEPET LİSTESİ */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sepetim ({items.length} Ürün)</h2>
          {items.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.image ? (
                   <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                   <div className="flex items-center justify-center h-full text-xs text-gray-400">Resim Yok</div>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <p className="text-red-600 font-bold">{item.price} ₺</p>
              </div>
              <div className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">x{item.quantity}</div>
              <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-600 p-2">🗑️</button>
            </div>
          ))}
        </div>

        {/* SAĞ: ÖDEME FORMU */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Siparişi Tamamla</h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Teslimat Adresi</label>
                <textarea required placeholder="Adresiniz..." className="w-full p-3 border rounded-lg h-24 resize-none"
                  value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Telefon</label>
                <input type="tel" required placeholder="05XX..." className="w-full p-3 border rounded-lg"
                  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ödeme</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setFormData({...formData, paymentMethod: 'CASH'})}
                    className={`p-3 rounded-lg border text-sm font-bold ${formData.paymentMethod === 'CASH' ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-200'}`}>
                    💵 Nakit
                  </button>
                  <button type="button" onClick={() => setFormData({...formData, paymentMethod: 'CREDIT_CARD'})}
                    className={`p-3 rounded-lg border text-sm font-bold ${formData.paymentMethod === 'CREDIT_CARD' ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-200'}`}>
                    💳 Kart
                  </button>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-bold text-gray-900 mb-4">
                  <span>Toplam</span><span>{total} ₺</span>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all disabled:opacity-50">
                  {loading ? 'İşleniyor...' : 'Siparişi Onayla'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}