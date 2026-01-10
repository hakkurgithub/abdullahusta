'use client';

import { useState, useTransition, useMemo } from 'react';
import Image from 'next/image';
import { MENU_ITEMS, MenuCategory } from '../../lib/menuData';
import { useCart } from '../../components/CartProvider';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Kebaplar & Izgaralar");
  // INP ÇÖZÜMÜ: useTransition kullanıyoruz
  const [isPending, startTransition] = useTransition();
  const { addItem } = useCart();

  // Kategorileri veri dosyasından otomatik çıkar
  const categories = useMemo(() => {
    const cats = new Set(MENU_ITEMS.map(item => item.category));
    return Array.from(cats);
  }, []);

  // Filtreleme işlemi
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    // INP ÇÖZÜMÜ: Ağır işlemi (filtrelemeyi) startTransition içine alıyoruz
    startTransition(() => {
      setActiveCategory(category);
    });
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Başlık Alanı */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Menümüz</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Geleneksel lezzetler, usta ellerden sofranıza.
          </p>
        </div>

        {/* Kategori Filtreleri (INP Sorununun Olduğu Yer Burasıydı) */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-3 no-scrollbar justify-start md:justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all transform active:scale-95 border
                ${activeCategory === category
                  ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-200'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Ürün Listesi */}
        {/* isPending true ise listeyi hafif opak yapıyoruz (Yükleniyor hissi) */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
          {filteredItems.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
              
              {/* Resim Alanı */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {item.rating && (
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                    <span className="text-yellow-500 text-xs">⭐</span>
                    <span className="text-xs font-bold text-gray-800">{item.rating}</span>
                  </div>
                )}
              </div>

              {/* İçerik Alanı */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-red-600 font-black text-lg whitespace-nowrap ml-2">
                    {item.price} ₺
                  </span>
                </div>
                
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                  {item.description}
                </p>

                <button
                  onClick={() => addItem({ id: parseInt(item.id), name: item.name, price: item.price })}
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-gray-200"
                >
                  <span>Sepete Ekle</span>
                  <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">+</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}