import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const userCount = await prisma.user.count();
  const productCount = await prisma.product.count();
  const orderCount = await prisma.order.count();
  
  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Y&#246;netici Paneli</h1>
        
        {/* Istatistik Kartlari */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Toplam &#220;ye</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{userCount}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Toplam Sipari&#351;</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{orderCount}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Men&#252;deki &#220;r&#252;n</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{productCount}</p>
          </div>
        </div>

        {/* Alt Bolumler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-xl mb-4 border-b pb-2">Son Sipari&#351;ler</h3>
            <p className="text-gray-500 italic">Hen&#252;z sipari&#351; yok.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-xl mb-4 border-b pb-2">H&#305;zl&#305; &#304;&#351;lemler</h3>
            <div className="space-y-3">
              {/* BURASI GÜNCELLENDİ: Buton artık Link oldu */}
              <Link 
                href="/admin/add-product"
                className="block w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-bold transition-colors border border-red-100"
              >
                + Yeni &#220;r&#252;n Ekle
              </Link>
              
              <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                Rezervasyonlar&#305; G&#246;r
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
