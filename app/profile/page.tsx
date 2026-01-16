import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  try {
    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "gizli-anahtar");
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Veritabanindan taze bilgiyi cek
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      include: { orders: true } 
    });
    
    return user;
  } catch (error) {
    return null;
  }
}

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) return <div className="p-20 text-center">L&#252;tfen giri&#351; yap&#305;n&#305;z.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* Ust Baslik */}
          <div className="bg-red-600 px-8 py-6 text-white flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Hesab&#305;m</h1>
              <p className="opacity-90">Ho&#351; geldin, {user.name}</p>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              {user.role === 'ADMIN' ? 'Yonetici (Admin)' : 'Lezzet Sever'}
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Sol Menu: Bilgiler */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Ki&#351;isel Bilgiler</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="block text-gray-500">E-posta</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Telefon</span>
                    <span className="font-medium">{user.phone || '-'}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Kay&#305;t Tarihi</span>
                    <span className="font-medium">{new Date(user.createdAt).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors">
                &#199;&#305;k&#305;&#351; Yap
              </button>
            </div>

            {/* Sag Taraf: Siparis Gecmisi */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sipari&#351; Ge&#231;mi&#351;im</h2>
              
              {user.orders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="text-4xl mb-3"></div>
                  <h3 className="font-bold text-gray-900">Hen&#252;z Sipari&#351;iniz Yok</h3>
                  <p className="text-gray-500 mb-6">Can&#305;n&#305;z g&#252;zel bir kebap &#231;ekmedi mi?</p>
                  <Link href="/menu" className="px-6 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700">
                    Men&#252;ye Git
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Sipari&#351;leriniz listeleniyor...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
