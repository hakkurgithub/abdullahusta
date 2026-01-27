'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // DÜZENLEME PENCERESİ AYARLARI
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  // KATEGORİLER (Sizin menüye özel)
  const CATEGORIES = ["Çorbalar", "Kebaplar", "Izgaralar", "Pide & Lahmacun", "Dönerler", "Tatlılar", "İçecekler", "Salatalar", "Yan Ürünler", "Kiloluk Ürünler", "Dürüm"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) setProducts(await res.json());
    } finally {
      setLoading(false);
    }
  };

  // ÜRÜN SİL
  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    fetchProducts(); // Listeyi yenile
  };

  // AKTİF / PASİF YAP (Göz İkonu)
  const toggleStatus = async (product: any) => {
    const newStatus = !product.isAvailable;
    // Hızlı tepki için önce ekranda değiştir
    setProducts(products.map(p => p.id === product.id ? { ...p, isAvailable: newStatus } : p));

    // Sonra sunucuya kaydet
    await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, isAvailable: newStatus, price: product.price }) // Fiyatı da gönderiyoruz ki bozulmasın
    });
  };

  // DÜZENLEME PENCERESİNİ AÇ
  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  // GÜNCELLEMEYİ KAYDET
  const handleUpdateSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingProduct),
    });

    alert('✅ Ürün Başarıyla Güncellendi!');
    setShowModal(false);
    setEditingProduct(null);
    fetchProducts(); // Listeyi güncelle
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ÜST BAŞLIK */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Yönetici Paneli</h1>
            <p className="text-gray-500 mt-1">Hoş geldin, Başkanım 👨‍🍳</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
             <Link href="/" target="_blank" className="bg-gray-100 text-gray-700 px-5 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                🌐 Siteye Git
             </Link>
             <Link href="/admin/orders" className="bg-blue-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                📦 Siparişler
             </Link>
             <Link href="/admin/add-product" className="bg-red-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                + Yeni Ürün
             </Link>
          </div>
        </div>

        {/* İSTATİSTİKLER (Basit) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
           <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase">Toplam Ürün</div>
              <div className="text-2xl font-bold text-gray-800">{products.length}</div>
           </div>
           <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-xs font-bold text-green-600 uppercase">Aktif Ürünler</div>
              <div className="text-2xl font-bold text-green-600">{products.filter(p => p.isAvailable).length}</div>
           </div>
        </div>

        {/* MENÜ LİSTESİ */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-5 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-lg text-gray-800">🍔 Menü Listesi</h2>
            <button onClick={fetchProducts} className="text-sm text-blue-600 hover:underline font-bold">Listeyi Yenile</button>
          </div>

          <div className="divide-y divide-gray-100">
            {loading ? (
               <div className="p-10 text-center text-gray-500">Yükleniyor...</div>
            ) : products.map((p) => (
              <div key={p.id} className={`p-4 flex flex-col md:flex-row items-center gap-6 hover:bg-gray-50 transition-all ${!p.isAvailable ? 'bg-gray-100 opacity-75' : ''}`}>
                
                {/* 1. RESİM */}
                <div className="w-20 h-20 relative bg-white rounded-lg overflow-hidden flex-shrink-0 border shadow-sm group">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-gray-300">Resim Yok</div>
                  )}
                </div>

                {/* 2. BİLGİLER */}
                <div className="flex-grow text-center md:text-left w-full space-y-1">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wide bg-blue-50 inline-block px-2 py-1 rounded-md">
                    {p.category}
                  </div>
                  <div className="font-bold text-gray-800 text-lg flex items-center justify-center md:justify-start gap-2">
                    {p.name}
                    {!p.isAvailable && <span className="bg-gray-600 text-white text-[10px] px-2 py-0.5 rounded-full">PASİF</span>}
                  </div>
                  <div className="text-red-600 font-bold text-xl">{p.price} ₺</div>
                </div>

                {/* 3. İŞLEM BUTONLARI */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-center">
                  
                  {/* Aktif/Pasif Butonu */}
                  <button 
                    onClick={() => toggleStatus(p)}
                    className={`flex flex-col items-center justify-center w-16 h-12 rounded-lg border transition-all ${p.isAvailable ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-gray-200 text-gray-600 border-gray-300 hover:bg-gray-300'}`}
                    title={p.isAvailable ? "Ürünü Gizle" : "Ürünü Yayınla"}
                  >
                    <span className="text-xl">{p.isAvailable ? '👁️' : '🕶️'}</span>
                    <span className="text-[9px] font-bold">{p.isAvailable ? 'AKTİF' : 'GİZLİ'}</span>
                  </button>

                  {/* Düzenle Butonu */}
                  <button 
                    onClick={() => openEditModal(p)}
                    className="flex flex-col items-center justify-center w-16 h-12 bg-blue-50 text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-600 hover:text-white transition-all group"
                    title="Düzenle"
                  >
                    <span className="text-xl">✏️</span>
                    <span className="text-[9px] font-bold">DÜZENLE</span>
                  </button>

                  {/* Sil Butonu */}
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="flex flex-col items-center justify-center w-12 h-12 bg-red-50 text-red-500 rounded-lg border border-red-100 hover:bg-red-600 hover:text-white transition-all"
                    title="Sil"
                  >
                    <span className="text-xl">🗑️</span>
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- POP-UP DÜZENLEME PENCERESİ (MODAL) --- */}
      {showModal && editingProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
            
            {/* Modal Başlık */}
            <div className="p-5 bg-gray-900 text-white flex justify-between items-center">
              <h3 className="font-bold text-xl">✏️ Ürünü Düzenle</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-2xl">✕</button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleUpdateSave} className="p-6 space-y-5">
              
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">ÜRÜN ADI</label>
                <input 
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition-colors font-bold text-gray-800"
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">FİYAT (TL)</label>
                  <input 
                    type="number"
                    className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none font-bold text-gray-800"
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({...editingProduct, price: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">KATEGORİ</label>
                  <select 
                    className="w-full p-3 border-2 border-gray-100 rounded-xl bg-white focus:border-blue-500 outline-none text-gray-800"
                    value={editingProduct.category}
                    onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">RESİM LİNKİ (URL)</label>
                <input 
                  className="w-full p-3 border-2 border-gray-100 rounded-xl text-sm text-blue-600 font-mono focus:border-blue-500 outline-none"
                  value={editingProduct.image || ''}
                  onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">AÇIKLAMA</label>
                <textarea 
                  rows={2}
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none resize-none text-sm"
                  value={editingProduct.description || ''}
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                  placeholder="Ürün içeriği hakkında kısa bilgi..."
                />
              </div>

              {/* Alt Butonlar */}
              <div className="flex gap-3 pt-4 border-t mt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="flex-1 py-3 bg-gray-100 font-bold text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  İptal
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-red-600 font-bold text-white rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-colors"
                >
                  💾 Kaydet
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}