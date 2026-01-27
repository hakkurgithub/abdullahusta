'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileActions() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form verileri
  const [formData, setFormData] = useState({
    phone: '',
    address: ''
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/user/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('✅ Bilgileriniz başarıyla güncellendi!');
        setShowForm(false);
        router.refresh(); // Sayfayı yenile ki yeni bilgiler görünsün
      } else {
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      alert('Bağlantı hatası.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    // 1. Sunucuya çıkış isteği gönder (HttpOnly çerezi silmesi için)
    await fetch('/api/auth/logout', { method: 'POST' });
    
    // 2. Sayfayı yenile ve giriş sayfasına git
    router.refresh();
    window.location.href = '/login';
  };

  return (
    <div className="space-y-4 mt-6">
      
      {!showForm ? (
        // --- NORMAL GÖRÜNÜM ---
        <>
          <button 
            onClick={() => setShowForm(true)} 
            className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-100 flex items-center justify-center gap-2"
          >
            ✏️ Bilgilerimi Güncelle
          </button>

          <button 
            onClick={handleLogout}
            className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            Çıkış Yap
          </button>
        </>
      ) : (
        // --- DÜZENLEME FORMU (Butona basınca açılır) ---
        <div className="bg-white p-6 rounded-2xl border-2 border-red-50 shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Bilgileri Düzenle</h3>
          
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">TELEFON NUMARASI</label>
              <input 
                type="tel"
                placeholder="05XX XXX XX XX" 
                required
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">TESLİMAT ADRESİ</label>
              <textarea 
                placeholder="Mahalle, Cadde, No..." 
                required
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200"
              >
                İptal
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-100 disabled:opacity-50"
              >
                {loading ? 'Kaydediliyor...' : '💾 Kaydet'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}