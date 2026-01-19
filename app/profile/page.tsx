import ProfileActions from './ProfileActions';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

// Sayfanın her istekte güncel veriyi çekmesini sağlar (Sipariş düşünce hemen görünür)
export const dynamic = 'force-dynamic';

// Sipariş durumu için yardımcı fonksiyon (Türkçeleştirme ve Renklendirme)
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'PENDING':
      return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">Onay Bekliyor</span>;
    case 'PREPARING':
      return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-bold">Hazırlanıyor</span>;
    case 'ON_WAY':
      return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-bold">Yolda</span>;
    case 'DELIVERED':
      return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Teslim Edildi</span>;
    case 'CANCELLED':
      return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold">İptal Edildi</span>;
    default:
      return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-bold">{status}</span>;
  }
};

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  try {
    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "gizli-anahtar");
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Kullanıcıyı ve Siparişlerini Çek
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      include: { 
        orders: {
          orderBy: { createdAt: 'desc' }, // En yeni sipariş en üstte olsun
          // include: { items: true } // İleride sipariş detaylarını da göstermek isterseniz açabilirsiniz
        } 
      } 
    });
    
    return user;
  } catch (error) {
    return null;
  }
}

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
       <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oturum Süreniz Doldu</h2>
          <Link href="/login" className="text-red-600 hover:underline">Tekrar Giriş Yap</Link>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Üst Bilgi Kartı */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="bg-gradient-to-r from-red-700 to-red-600 px-8 py-8 text-white flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/30">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold">Merhaba, {user.name}</h1>
                <p className="opacity-90 text-sm mt-1">Lezzet yolculuğuna hoş geldin.</p>
              </div>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 text-sm font-medium">
              {user.role === 'ADMIN' ? '🛡️ Yönetici Hesabı' : '🍽️ Lezzet Sever Üye'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* SOL KOLON: KİŞİSEL BİLGİLER & AYARLAR */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Profil Kartı */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h3 className="font-bold text-gray-900 text-lg">Kişisel Bilgiler</h3>
                  <span className="text-xs text-gray-400">Gizli & Güvenli</span>
                </div>
                
                <div className="space-y-5">
                  <div className="group">
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">E-posta</span>
                    <div className="font-medium text-gray-800 flex items-center gap-2">
                      <span className="truncate">{user.email}</span>
                      {/* Doğrulanmış İkonu (Görsel) */}
                      <span className="text-blue-500 text-xs" title="Doğrulanmış">✓</span>
                    </div>
                  </div>
                  
                  <div className="group">
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Telefon</span>
                    <span className="font-medium text-gray-800">{user.phone || 'Eklenmemiş'}</span>
                  </div>

                  <div className="group">
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Kayıtlı Adres</span>
                    <p className="font-medium text-gray-800 text-sm leading-relaxed">
                      {user.address || 'Henüz adres kaydetmediniz. Sipariş verirken ekleyebilirsiniz.'}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <span className="block text-xs text-gray-400">Kayıt Tarihi: {new Date(user.createdAt).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
              </div>
              
              {/* Aksiyon Butonları (Güncelle / Çıkış) */}
              <ProfileActions />
            </div>

            {/* SAĞ KOLON: SİPARİŞ GEÇMİŞİ */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    📦 Sipariş Geçmişim
                    <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {user.orders.length}
                    </span>
                  </h2>
                </div>
                
                {user.orders.length === 0 ? (
                  // HİÇ SİPARİŞ YOKSA
                  <div className="text-center py-16 px-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-3xl mb-4">
                      🍽️
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Henüz Siparişiniz Yok</h3>
                    <p className="text-gray-500 mb-6 max-w-sm">
                      Menümüzdeki efsane lezzetleri denemek için harika bir zaman!
                    </p>
                    <Link href="/menu" className="px-8 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200">
                      Menüye Git & Sipariş Ver
                    </Link>
                  </div>
                ) : (
                  // SİPARİŞ LİSTESİ
                  <div className="space-y-4">
                    {user.orders.map((order) => (
                      <div key={order.id} className="group border border-gray-100 rounded-xl p-5 hover:border-red-200 hover:shadow-md transition-all bg-white">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                          
                          {/* Sol: Sipariş Detayları */}
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-sm font-bold text-gray-900">#{order.id.slice(-6).toUpperCase()}</span>
                              {getStatusBadge(order.status)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString('tr-TR', { 
                                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                              })}
                            </div>
                          </div>

                          {/* Sağ: Tutar ve Detay Butonu */}
                          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                            <div className="text-right">
                              <span className="block text-xs text-gray-400">Toplam Tutar</span>
                              <span className="text-lg font-black text-red-600">{Number(order.total).toFixed(2)} ₺</span>
                            </div>
                            {/* İleride detay sayfasına gidecek buton */}
                            <button className="text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-lg group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                              Detay
                            </button>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

        </div>
      </div>
    </div>
  );
}