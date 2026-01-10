'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ totalUsers: 0, totalOrders: 0 });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await fetch('/api/admin/dashboard');
        
        if (res.status === 401 || res.status === 403) {
          alert('Bu sayfaya erişim yetkiniz yok. Ana sayfaya yönlendiriliyorsunuz.');
          router.push('/');
          return;
        }

        const data = await res.json();
        setStats(data.stats);
        setUsers(data.users);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-bold text-gray-600">Admin Paneli Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Üst Bar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">Abdullah Usta Yönetim</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => router.push('/')} 
            className="text-gray-600 hover:text-gray-900"
          >
            Siteye Dön
          </button>
          <button 
            onClick={() => {
              // Basit çıkış işlemi: Cookie'yi silmek gerekir ama şimdilik ana sayfaya atalım
              // Gerçek çıkış api/auth/logout ile yapılmalı
              document.cookie = 'session_token=; Max-Age=0; path=/;';
              window.location.href = '/login';
            }}
            className="text-red-600 font-bold hover:text-red-800"
          >
            Çıkış Yap
          </button>
        </div>
      </nav>

      <div className="p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Genel Bakış</h2>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Toplam Üye</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Aktif Siparişler</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2 text-yellow-600">Yakında</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Toplam Gelir</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2 text-green-600">Yakında</p>
          </div>
        </div>

        {/* Kullanıcı Tablosu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">Son Kayıt Olan Üyeler</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900 font-bold uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">İsim Soyisim</th>
                  <th className="px-6 py-3">E-posta</th>
                  <th className="px-6 py-3">Rol</th>
                  <th className="px-6 py-3">Kayıt Tarihi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{user.id}</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role === 'admin' ? 'Yönetici' : 'Müşteri'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(user.created_at).toLocaleDateString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="p-6 text-center text-gray-500">Henüz hiç üye yok.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
