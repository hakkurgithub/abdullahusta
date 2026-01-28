'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Düzenleme Modu
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState(''); // Şifre değiştirme alanı

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) setUsers(await res.json());
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;
    const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchUsers();
    } else {
      alert("Bu kullanıcının siparişleri olduğu için silinemiyor.");
    }
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setNewPassword(''); // Her açılışta şifre alanını temizle
    setShowModal(true);
  };

  const handleUpdateSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // API'ye gönderilecek veri
    const payload = { ...editingUser, password: newPassword };

    await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    alert('✅ Kullanıcı Bilgileri Güncellendi!');
    setShowModal(false);
    setEditingUser(null);
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ÜST BAŞLIK */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Müşteri Yönetimi</h1>
            <p className="text-gray-500 mt-1">Kayıtlı üyeleri düzenleyin ve yönetin.</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
             <Link href="/admin/dashboard" className="bg-gray-100 text-gray-700 px-5 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                ⬅️ Panele Dön
             </Link>
          </div>
        </div>

        {/* LİSTE */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                <tr>
                  <th className="px-6 py-4">Ad Soyad</th>
                  <th className="px-6 py-4">İletişim</th>
                  <th className="px-6 py-4">Adres</th>
                  <th className="px-6 py-4">Rol</th>
                  <th className="px-6 py-4">Son Siparişler</th>
                  <th className="px-6 py-4 text-center">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{user.name}</td>
                    <td className="px-6 py-4">
                      <div>{user.email}</div>
                      <div className="text-xs text-gray-400">{user.phone || '-'}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={user.address}>
                      {user.address || 'Adres Girilmemiş'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-xs bg-gray-100 px-2 py-1 rounded-full font-bold">
                         {user.orders?.length || 0} Sipariş
                       </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => openEditModal(user)}
                          className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                          title="Düzenle"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                          title="Sil"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* --- DÜZENLEME PENCERESİ (MODAL) --- */}
      {showModal && editingUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            
            <div className="p-5 bg-gray-900 text-white flex justify-between items-center">
              <h3 className="font-bold text-xl">👤 Kullanıcı Düzenle</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-2xl">✕</button>
            </div>
            
            <form onSubmit={handleUpdateSave} className="p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">AD SOYAD</label>
                <input 
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none font-bold text-gray-800"
                  value={editingUser.name}
                  onChange={e => setEditingUser({...editingUser, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">TELEFON</label>
                <input 
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none text-gray-800"
                  value={editingUser.phone || ''}
                  onChange={e => setEditingUser({...editingUser, phone: e.target.value})}
                  placeholder="05..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">ADRES</label>
                <textarea 
                  rows={3}
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none resize-none text-sm"
                  value={editingUser.address || ''}
                  onChange={e => setEditingUser({...editingUser, address: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">YETKİ (ROL)</label>
                <select 
                  className="w-full p-3 border-2 border-gray-100 rounded-xl bg-white focus:border-blue-500 outline-none font-bold"
                  value={editingUser.role}
                  onChange={e => setEditingUser({...editingUser, role: e.target.value})}
                >
                  <option value="USER">Müşteri (USER)</option>
                  <option value="ADMIN">Yönetici (ADMIN)</option>
                </select>
              </div>

              <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                <label className="block text-xs font-bold text-red-600 mb-1 ml-1">🔒 ŞİFRE DEĞİŞTİR (İsteğe Bağlı)</label>
                <input 
                  type="text"
                  className="w-full p-3 border-2 border-red-100 rounded-xl focus:border-red-500 outline-none text-sm"
                  placeholder="Değiştirmek istemiyorsanız boş bırakın"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <p className="text-[10px] text-red-400 mt-1 ml-1">Müşteri şifresini unuttuğunda buradan yeni şifre atayabilirsiniz.</p>
              </div>

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
                  className="flex-1 py-3 bg-blue-600 font-bold text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors"
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