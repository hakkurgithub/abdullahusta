'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.role === 'ADMIN') {
             window.location.href = '/admin/dashboard';
        } else {
             window.location.href = '/profile';
        }
      } else {
        const data = await res.json();
        setError(data.error || 'Giriş başarısız.');
      }
    } catch (err) {
      setError('Bir hata oluştu. İnternetinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Tekrar Hoş Geldiniz</h2>
          <p className="mt-2 text-sm text-gray-600">
            Hesabınıza giriş yapın
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">E-Posta</label>
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
          </div>

          {error && (
            <div className="flex flex-col gap-2">
              <div className="text-red-500 text-sm text-center font-bold bg-red-50 p-2 rounded-lg border border-red-100">
                {error}
              </div>
            </div>
          )}

          {/* YENİ ŞİFREMİ UNUTTUM LİNKİ */}
          <div className="text-right">
            <Link href="/forgot-password" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Şifremi Unuttum?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-red-600 hover:bg-red-700 transition-all shadow-lg shadow-red-200"
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
          
          <div className="text-center text-sm">
             Hesabınız yok mu? <Link href="/register" className="font-bold text-red-600 hover:text-red-500">Kayıt Olun</Link>
          </div>
        </form>
      </div>
    </div>
  );
}