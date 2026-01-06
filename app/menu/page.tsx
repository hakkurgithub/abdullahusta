// app/menu/page.tsx DOSYASININ DOĞRU VE TAM HALİ

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// ✅✅✅ YOL DÜZELTMESİ BURADA ✅✅✅
import OrderChannelDropdown from '../../components/OrderChannelDropdown';
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
  const { addItem, getTotalItems } = useCart();
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
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xl border-2 border-black">
                  BK
                </div>
                <span className="text-2xl font-bold text-red-600 font-['Pacifico']">
                  {content.restaurantName || "Abdullah Usta"}
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Ana Sayfa
              </Link>
              <Link href="/menu" className="text-red-600 hover:text-red-700 font-medium transition-colors cursor-pointer">
                Menü
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Hakkımızda
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                İletişim
              </Link>
              <Link href="/reviews" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Yorumlar
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
                Rezervasyon
              </button>
              <OrderChannelDropdown />
              <div className="relative">
                <Link href="/cart">
                  <button className="bg-gray-100 text-red-600 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer" aria-label="Sepeti Görüntüle">
                    <i className="ri-shopping-cart-line text-2xl"></i>
                  </button>
                </Link>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center pointer-events-none">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <button className="md:hidden w-6 h-6 flex items-center justify-center cursor-pointer" aria-label="Menüyü Aç">
                <i className="ri-menu-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Menü & Lezzetler</h1>
        <div className="max-w-2xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Lezzet ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap ${
                filter === cat ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition-colors`}
            >
              {cat === "all" ? "Tümü" : cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col hover:shadow-lg transition-shadow"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={160}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 text-sm mb-2 flex-grow">{item.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-red-600 font-bold text-lg">{item.price} ₺</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`ri-star-${i < (item.rating || 0) ? "fill" : "line"} text-yellow-400 text-sm`}
                    ></i>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg mt-3 hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Sepete Ekle
              </button>
            </div>
          ))}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer içeriği */}
        </div>
      </footer>
    </div>
  );
}