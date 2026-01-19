import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import MenuButton from './MenuButton';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function MenuPage() {
  // 1. Tüm ürünleri isme göre sıralı çek
  const rawProducts = await prisma.product.findMany({
    orderBy: { name: 'asc' }
  });

  // 2. Fiyat Dönüştürme (Decimal -> Number)
  // Bu işlem "Decimal objects cannot be rendered" hatasını ve hesaplama sorunlarını çözer.
  const products = rawProducts.map(product => ({
    ...product,
    price: Number(product.price)
  }));

  // 3. Kategorileri otomatik çıkart ve alfabetik sırala
  const uniqueCategories = [...new Set(products.map(p => p.category))].sort();
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      
      {/* --- KATEGORİ NAVİGASYONU --- */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md shadow-sm py-3 -mx-4 px-4 mb-8 border-y border-gray-100 overflow-x-auto">
        <div className="flex gap-3 min-w-max mx-auto max-w-7xl px-2">
          {uniqueCategories.map((cat) => (
            <Link 
              key={cat} 
              href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-5 py-2 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white text-gray-700 font-bold transition-all text-sm whitespace-nowrap border border-gray-200"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Menümüz</h1>
          <p className="text-gray-600">
            {products.length > 0 
              ? `Toplam ${products.length} çeşit lezzet sizi bekliyor.` 
              : 'Menü yükleniyor...'}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-red-100">
            <h2 className="text-xl font-bold text-red-600">Veriler Yükleniyor...</h2>
            <p className="text-gray-500 mt-2">
              Lütfen sayfayı yenileyiniz.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {uniqueCategories.map((category) => {
              const categoryProducts = products.filter(p => p.category === category);
              if (categoryProducts.length === 0) return null;

              // ID oluştur (Örn: "Kebaplar" -> "kebaplar")
              const categoryId = category.toLowerCase().replace(/\s+/g, '-');

              return (
                <section key={category} id={categoryId} className="scroll-mt-40">
                  {/* Kategori Başlığı */}
                  <div className="flex items-center mb-6">
                     <div className="bg-red-600 w-2 h-8 rounded-full mr-3"></div>
                     <h2 className="text-3xl font-bold text-gray-800">
                        {category}
                     </h2>
                     <span className="ml-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                        {categoryProducts.length}
                     </span>
                     <div className="flex-grow ml-6 h-px bg-gray-200"></div>
                  </div>
                  
                  {/* Ürün Listesi */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryProducts.map((product) => (
                      <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group">
                        
                        {/* Resim Alanı */}
                        <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                              <span className="text-3xl mb-2">🍽️</span>
                              <span className="text-xs">Görsel Yok</span>
                            </div>
                          )}
                          {/* Fiyat - Hatasız Gösterim */}
                          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur shadow-lg px-3 py-1 rounded-lg border border-gray-100">
                             <span className="text-lg font-black text-gray-900">{product.price} ₺</span>
                          </div>
                        </div>

                        {/* İçerik */}
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{product.name}</h3>
                          <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                            {product.description || "Açıklama hazırlanıyor..."}
                          </p>
                          <MenuButton product={product} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}