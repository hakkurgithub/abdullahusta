"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from '../../components/CartProvider';
import { useContent } from '../../hooks/useContent';

interface MenuItem {
  id: any;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  rating?: number;
}

export default function MenuPage() {
  const [filter, setFilter] = useState<string | "all">("all");
  const [search, setSearch] = useState("");
  const { addItem } = useCart();
  const { content } = useContent();

  const menuItems: MenuItem[] = content.allMenuItems || [];

  const filteredItems = menuItems.filter((item) => {
    const matchCategory = filter === "all" || item.category === filter;
    const matchSearch =
      search === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const categories: string[] = ["all", ...Array.from(new Set(menuItems.map(item => item.category)))];

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: parseInt(item.id),
      name: item.name,
      price: item.price,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Menü Başlık Alanı */}
      <div className="bg-red-700 py-12 text-white text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Lezzet Menümüz</h1>
        <p className="opacity-90">Usta ellerden günlük taze hazırlanan lezzetler</p>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Arama ve Filtreleme */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 bg-white p-4 rounded-xl shadow-sm">
          <div className="relative flex-1">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Ürün veya içerik ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat === "all" ? "Tümü" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ürün Listesi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                   <div className="flex items-center gap-1">
                    <i className="ri-star-fill text-yellow-400 text-xs"></i>
                    <span className="text-xs font-bold text-gray-800">{item.rating || "5.0"}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="text-red-600 font-black text-xl">{item.price} ₺</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-200 font-bold cursor-pointer"
                  >
                    + Ekle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sonuç Bulunamadı */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <i className="ri-search-eye-line text-6xl text-gray-300 mb-4 block"></i>
            <p className="text-gray-500 text-lg">Aradığınız kriterlere uygun ürün bulunamadı.</p>
          </div>
        )}
      </main>
    </div>
  );
}