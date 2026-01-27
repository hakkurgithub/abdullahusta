'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Renkli Durum Etiketleri
  const STATUS_OPTS = {
    'PENDING': { label: 'Onay Bekliyor', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    'PREPARING': { label: 'Hazırlanıyor', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    'ON_WAY': { label: 'Yolda 🛵', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    'DELIVERED': { label: 'Teslim Edildi ✅', color: 'bg-green-100 text-green-800 border-green-200' },
    'CANCELLED': { label: 'İptal ❌', color: 'bg-red-100 text-red-800 border-red-200' },
  };

  useEffect(() => {
    fetchOrders();
    // Her 30 saniyede bir yeni sipariş var mı diye bak
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) setOrders(await res.json());
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    // Önce ekranda hemen güncelle (Hız hissi için)
    const oldOrders = [...orders];
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    // Sonra arka plana gönder
    const res = await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status: newStatus }),
    });

    if (!res.ok) {
      alert('Hata! Durum güncellenemedi.');
      setOrders(oldOrders); // Hata varsa geri al
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">📦 Sipariş Takip Ekranı</h1>
            <p className="text-sm text-gray-500">Anlık sipariş akışı</p>
          </div>
          <Link href="/admin/dashboard" className="bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 font-medium transition-colors">
            ← Panele Dön
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Siparişler yükleniyor...</div>
        ) : (
          <div className="space-y-4">
            {orders.length === 0 && (
               <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">Henüz sipariş yok.</div>
            )}
            
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  
                  {/* Sol: Müşteri ve Sipariş Detayı */}
                  <div className="space-y-3 flex-grow">
                    <div className="flex items-center gap-3">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm font-bold text-gray-600">#{order.id.slice(-6).toUpperCase()}</span>
                      <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString('tr-TR')}</span>
                    </div>
                    
                    <div>
                      <div className="font-bold text-lg text-gray-900">{order.user?.name || 'Misafir'}</div>
                      <div className="text-gray-600 text-sm">{order.user?.phone || order.address}</div>
                      {/* Adres uzunsa tamamını göster */}
                      <div className="text-gray-500 text-xs mt-1 bg-gray-50 p-2 rounded">{order.address}</div>
                    </div>

                    <div className="border-t pt-3 mt-2">
                      <p className="text-xs font-bold text-gray-400 mb-2">SİPARİŞ İÇERİĞİ:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {order.items.map((item: any) => (
                          <div key={item.id} className="text-sm flex items-center gap-2">
                            <span className="bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded text-xs">{item.quantity}x</span> 
                            <span className="text-gray-700">{item.name}</span>
                          </div>
                        ))}
                      </div>
                      {order.note && (
                        <div className="mt-3 bg-red-50 text-red-700 p-2 rounded text-sm font-bold border border-red-100">
                          🔔 Müşteri Notu: {order.note}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sağ: Tutar ve Durum Değiştirme */}
                  <div className="flex flex-col items-end justify-between min-w-[220px] border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 gap-4">
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Toplam Tutar</div>
                      <div className="text-2xl font-black text-red-600">{Number(order.total).toFixed(2)} ₺</div>
                      <div className="text-xs font-bold text-gray-500 mt-1">{order.paymentMethod === 'CASH' ? '💵 Nakit' : '💳 Kredi Kartı'}</div>
                    </div>

                    <div className="w-full">
                      <label className="text-xs text-gray-400 font-bold block mb-1">DURUMU GÜNCELLE</label>
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        // @ts-ignore
                        className={`w-full p-3 rounded-lg font-bold border-2 cursor-pointer outline-none appearance-none transition-colors ${STATUS_OPTS[order.status]?.color || 'bg-gray-100'}`}
                      >
                        {Object.entries(STATUS_OPTS).map(([key, val]) => (
                          <option key={key} value={key}>{val.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}