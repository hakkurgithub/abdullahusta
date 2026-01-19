import { prisma } from '@/lib/prisma';
import Link from 'next/link';
// AdminPanel bileşenini sayfaya ekliyoruz (Eğer components klasöründeyse)
import AdminPanel from '@/components/AdminPanel'; 

export default async function AdminDashboard() {
  // Veritabanı boşsa hata vermemesi için try-catch veya varsayılan değerler
  const userCount = await prisma.user.count().catch(() => 0);
  const productCount = await prisma.product.count().catch(() => 0);
  const orderCount = await prisma.order.count().catch(() => 0);
  
  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Yönetici Paneli</h1>
            {/* Ana Sayfaya Dön Butonu */}
            <Link href="/" className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700">
                Siteye Dön
            </Link>
        </div>
        
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Toplam Üye</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{userCount}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Toplam Sipariş</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{orderCount}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Menüdeki Ürün</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{productCount}</p>
          </div>
        </div>

        {/* Hızlı İşlemler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-xl mb-4 border-b pb-2">Hızlı İşlemler</h3>
            <div className="space-y-3">
              {/* Ürün Ekleme Sayfasına Giden Link */}
              <Link 
                href="/admin/add-product"
                className="block w-full text-center px-4 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-200"
              >
                + YENİ ÜRÜN EKLE
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
             <h3 className="font-bold text-xl mb-4 border-b pb-2">Son Durum</h3>
             <p className="text-gray-500">Sistem sorunsuz çalışıyor.</p>
          </div>
        </div>
      </div>
    </div>
  );
}