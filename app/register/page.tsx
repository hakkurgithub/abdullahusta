'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('🎉 Kayıt Başarılı! Şimdi giriş yapabilirsiniz.');
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.error || 'Kayıt başarısız.');
      }
    } catch (err) {
      setError('Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl font-bold mb-4">
            A
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Aramıza Katılın</h2>
          <p className="mt-2 text-sm text-gray-600">
            Lezzet dolu dünyaya adım atın
          </p>
        </div>
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Ad Soyad</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Adınız Soyadınız"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-1">Telefon</label>
             <input
               type="tel"
               required
               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
               placeholder="05XX XXX XX XX"
               value={formData.phone}
               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
             />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">E-posta</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="ornek@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Şifre</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center font-bold bg-red-50 p-2 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-red-600 hover:bg-red-700 transition-all shadow-lg shadow-red-200"
          >
            {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
          </button>
          
          <div className="text-center text-sm pt-2">
             Zaten hesabınız var mı? <Link href="/login" className="font-bold text-red-600 hover:text-red-500">Giriş Yapın</Link>
          </div>
        </form>
      </div>
    </div>
  );
}