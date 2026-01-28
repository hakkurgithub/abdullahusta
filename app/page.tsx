'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from '@/components/CartProvider'; // Sepet bağlantısı

export default function Home() {
  const { addToCart } = useCart(); // DÜZELTME: addItem yerine addToCart kullanıyoruz
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");

  // Kategoriler
  const CATEGORIES = ["Hepsi", "Çorbalar", "Kebaplar", "Izgaralar", "Pide & Lahmacun", "Dönerler", "Tatlılar", "İçecekler"];

  // 1. Ürünleri Veritabanından Çek
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          // Sadece 'Yayında' (isAvailable: true) olanları göster
          setProducts(data.filter((p: any) => p.isAvailable));
        }
      } catch (error) {
        console.error("Ürünler yüklenemedi", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Kategori Filtreleme
  const filteredProducts = selectedCategory === "Hepsi" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600 font-bold text-xl animate-pulse">Lezzetler Yükleniyor...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* HERO / KAPAK ALANI */}
      <div className="bg-red-700 text-white py-16 px-4 text-center rounded-b-[3rem] shadow-xl mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Abdullah Usta</h1>
        <p className="text-red-100 text-lg max-w-2xl mx-auto">
          Geleneksel lezzetlerin modern sunumu. En taze malzemelerle hazırlanan kebaplar, pideler ve daha fazlası.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        
        {/* KATEGORİ FİLTRESİ */}
        <div className="flex overflow-x-auto gap-3 pb-6 mb-4 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-6 py-3 rounded-full font-bold transition-all shadow-sm ${
                selectedCategory === cat 
                  ? 'bg-red-600 text-white shadow-red-200' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ÜRÜN LİSTESİ */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">Bu kategoride henüz ürün bulunmuyor.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
                
                {/* Resim Alanı */}
                <div className="relative h-48 w-full bg-gray-100 rounded-xl overflow-hidden mb-4">
                  {product.image ? (
                    <Image src={product.image} alt={product.name} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm font-bold">Resim Yok</div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-sm">
                    {product.category}
                  </div>
                </div>

                {/* Bilgiler */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 leading-tight">{product.name}</h3>
                    <span className="text-red-600 font-black text-xl whitespace-nowrap">{product.price} ₺</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {product.description || 'Lezzetli ve taze günlük üretim.'}
                  </p>
                </div>

                {/* Sepete Ekle Butonu */}
                <button
                  onClick={() => addToCart(product)} // KRİTİK DÜZELTME BURADA YAPILDI
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Sepete Ekle</span>
                  <i className="ri-shopping-basket-2-fill"></i>
                </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}