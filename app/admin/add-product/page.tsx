'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CATEGORIES = ['Kebaplar', 'Izgaralar', 'Pideler', 'Tatlılar', 'İçecekler'];

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Kebaplar',
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Kayit basarisiz');

      alert('Urun basariyla eklendi!');
      router.push('/admin'); // Admin ana sayfasina don
      router.refresh();      // Verileri yenile
    } catch (error) {
      alert('Hata olustu, lutfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Yeni &#220;r&#252;n Ekle</h1>
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
             &larr; Geri D&#246;n
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Urun Adi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">&#220;r&#252;n Ad&#305;</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Orn: Adana Kebap"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Aciklama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">A&#231;&#305;klama</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              rows={3}
              placeholder="Orn: Zirh ile cekilmis kuzu eti..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Fiyat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (TL)</label>
              <input
                type="number"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Resim URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resim Linki (URL)</label>
            <input
              type="url"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
            <p className="text-xs text-gray-400 mt-1">Simdilik internetten bir resim linki yapistirabilirsiniz.</p>
          </div>

          {/* Kaydet Butonu */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : '&#220;r&#252;n&#252; Kaydet'}
          </button>

        </form>
      </div>
    </div>
  );
}
