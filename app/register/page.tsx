'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [debugLog, setDebugLog] = useState(''); // Hata detayını ekranda görmek için
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle
    setLoading(true);
    setDebugLog('İşlem başlatılıyor...');

    try {
      console.log("Gönderilen veri:", formData);

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Yanıtı metin olarak al (JSON hatası varsa görelim)
      const text = await res.text();
      console.log("Sunucu yanıtı:", text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        throw new Error("Sunucudan geçerli bir JSON gelmedi: " + text.substring(0, 50));
      }

      if (!res.ok) {
        throw new Error(data.message || 'Kayıt başarısız oldu.');
      }

      // BAŞARILI OLDUYSA
      alert('✅ KAYIT BAŞARILI! Giriş sayfasına yönlendiriliyorsunuz.');
      router.push('/login');

    } catch (err: any) {
      console.error("Kayıt Hatası:", err);
      setDebugLog('HATA: ' + err.message);
      alert('❌ BİR SORUN OLUŞTU:\n' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Test Modu: Kayıt</h2>
          <p className="mt-2 text-sm text-gray-600">
            Hata ayıklama modu aktif.
          </p>
        </div>
        
        {/* HATA LOG KUTUSU (Düzeltildi) */}
        {debugLog && (
          <div className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs font-mono overflow-auto max-h-32">
            &gt; {debugLog}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
              <input
                type="text"
                required
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Telefon</label>
              <input
                type="tel"
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">E-posta</label>
              <input
                type="email"
                required
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Şifre</label>
              <input
                type="password"
                required
                className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-all disabled:opacity-50"
          >
            {loading ? 'İşlem Yapılıyor...' : 'Kayıt Ol (Test)'}
          </button>
        </form>
      </div>
    </div>
  );
}
