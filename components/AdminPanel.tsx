'use client';

import { useState, useEffect } from 'react';
import { adminConfig } from '@/lib/admin';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Hazır Kategoriler (Senin için kolaylık olsun)
const CATEGORIES = [
  "Çorbalar",
  "Kebaplar",
  "Izgaralar",
  "Pide & Lahmacun",
  "Dönerler",
  "Tatlılar",
  "İçecekler",
  "Salatalar",
  "Yan Lezzetler"
];

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Form Verileri
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Kebaplar',
    description: '',
    image: ''
  });

  // Paneli açınca ürünleri çek
  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  // Ürünleri Getir
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      setLoading(false);
    }
  };

  // Yeni Ürün Ekle
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('✅ Ürün Başarıyla Eklendi!');
        setFormData({ ...formData, name: '', price: '', description: '', image: '' }); // Formu temizle
        fetchProducts(); // Listeyi güncelle
      } else {
        alert('Hata oluştu.');
      }
    } catch (error) {
      console.error("Ekleme hatası:", error);
    }
  };

  // Ürün Sil
  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts(); // Listeyi güncelle
      }
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  // Çıkış Yap
  const handleLogout = () => {
    localStorage.removeItem(adminConfig.sessionKey);
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Başlık ve Çıkış */}
        <div className="bg-gray-900 text-white p-6 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-bold">🛠️ Yönetici Paneli</h2>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
              Kapat
            </button>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700">
              Çıkış
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* SOL TARAF: ÜRÜN EKLEME FORMU */}
          <div className="md:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Yeni Ürün Ekle</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
                <input 
                  type="text" 
                  required
                  placeholder="Örn: Adana Kebap"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (TL)</label>
                <input 
                  type="number" 
                  required
                  placeholder="0.00"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select 
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none bg-white"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea 
                  placeholder="İçindekiler vb..."
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resim URL (Opsiyonel)</label>
                <input 
                  type="text" 
                  placeholder="https://..."
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>

              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md">
                ➕ Ürünü Kaydet
              </button>
            </form>
          </div>

          {/* SAĞ TARAF: ÜRÜN LİSTESİ */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b flex justify-between items-center">
              <span>Mevcut Menü ({products.length})</span>
              <button onClick={fetchProducts} className="text-sm text-blue-600 hover:underline">Yenile</button>
            </h3>

            {loading ? (
              <div className="text-center py-10">Yükleniyor...</div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {products.map((product) => (
                  <div key={product.id} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex justify-between items-center group hover:border-red-200 transition-all">
                    <div className="flex items-center gap-4">
                      {product.category && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-bold w-24 text-center">
                          {product.category}
                        </span>
                      )}
                      <div>
                        <h4 className="font-bold text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.price} TL</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                      title="Sil"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}