'use client';

import { useRouter } from 'next/navigation';

export default function ProfileActions() {
  const router = useRouter();

  const handleLogout = () => {
    // Çerezi sil ve yönlendir
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.refresh();
    router.push('/login');
  };

  return (
    <div className="space-y-3 mt-4">
      {/* Mavi Güncelleme Butonu */}
      <button 
        onClick={() => alert('Bu özellik yakında aktif olacak!')} 
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md"
      >
        Bilgilerimi Güncelle
      </button>

      {/* Gri Çıkış Butonu */}
      <button 
        onClick={handleLogout}
        className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
      >
        Çıkış Yap
      </button>
    </div>
  );
}