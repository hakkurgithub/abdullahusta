import { auth } from "../../lib/auth"; // Auth kütüphanesi
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"; // Doğrudan Prisma kullanıyoruz (Garanti çözüm)
import ProfileActions from "./ProfileActions"; // Mevcut butonlarınız
import OrderList from "@/components/OrderList"; // Yeni oluşturduğumuz liste

export default async function ProfilePage() {
  // 1. Oturum Kontrolü
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  // 2. Kullanıcı Bilgilerini Çek
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // 3. Siparişleri Çek (Ürün detaylarıyla birlikte!)
  const orders = await prisma.order.findMany({
    where: { userEmail: session.user.email },
    include: {
      items: {
        include: { product: true } // Ürün ismini ve resmini almak için
      }
    },
    orderBy: { createdAt: 'desc' } // En yeni sipariş en üstte
  });

  // İstatistikler
  const totalSpent = orders.reduce((sum, order) => sum + Number(order.total), 0);
  const completedOrders = orders.filter(o => o.status === 'Teslim Edildi').length;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* ÜST KIRMIZI KART */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl shadow-xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm border-2 border-white/30">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Merhaba, {user?.name}</h1>
                <p className="text-red-100 opacity-90">Lezzet yolculuğuna hoş geldin.</p>
              </div>
            </div>
            <div className="bg-black/20 px-4 py-2 rounded-lg backdrop-blur-md border border-white/10 flex items-center gap-2">
              <span>🍽️</span>
              <span className="font-bold text-sm">Lezzet Sever Üye</span>
            </div>
          </div>
          {/* Arka plan süsü */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SOL: KİŞİSEL BİLGİLER */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-gray-800">Kişisel Bilgiler</h2>
                  <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded">Gizli & Güvenli</span>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">E-POSTA</label>
                    <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      {user?.email} 
                      <span className="text-blue-500 text-xs">✓</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">TELEFON</label>
                    <div className="text-sm font-medium text-gray-900">{user?.phone || 'Henüz girilmedi'}</div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">KAYITLI ADRES</label>
                    <div className="text-sm font-medium text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      {user?.address || 'Kayıtlı adres yok.'}
                    </div>
                  </div>
                </div>

                {/* Güncelleme ve Çıkış Butonları */}
                <ProfileActions />
             </div>
          </div>

          {/* SAĞ: SİPARİŞ GEÇMİŞİ */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* İstatistikler */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm text-center border-b-4 border-red-500">
                <div className="text-xs text-gray-500 font-bold mb-1">SİPARİŞ</div>
                <div className="text-xl font-bold text-gray-800">{orders.length}</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center border-b-4 border-green-500">
                <div className="text-xs text-gray-500 font-bold mb-1">HARCAMA</div>
                <div className="text-xl font-bold text-gray-800">
                  {totalSpent.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center border-b-4 border-blue-500">
                <div className="text-xs text-gray-500 font-bold mb-1">TAMAMLANAN</div>
                <div className="text-xl font-bold text-gray-800">{completedOrders}</div>
              </div>
            </div>

            {/* Sipariş Listesi (Bileşen) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-4 border-b bg-gray-50 flex items-center gap-2">
                 <span className="text-xl">📦</span>
                 <h2 className="font-bold text-gray-800">Sipariş Geçmişim</h2>
                 <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full ml-auto font-bold">{orders.length}</span>
               </div>
               
               {/* Listeyi ve Modalı Yöneten Bileşen */}
               <OrderList orders={orders} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}