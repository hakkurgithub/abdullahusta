<<<<<<< HEAD
'use client';

// Gerekli bileşenleri ve hook'ları içe aktarıyoruz
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReservationModal from '../components/ReservationModal';
import WhatsAppOrderModal from '../components/WhatsAppOrderModal';
import OrderChannelDropdown from '../components/OrderChannelDropdown';
import AdminPanel from '../components/AdminPanel';
import { adminConfig } from '../lib/admin';
import { useContent } from '../hooks/useContent';
import { useCart } from '../components/CartProvider';
=======
// app/page.tsx DOSYASININ DOĞRU VE TAM HALİ

"use client";

import Link from "next/link";
import Image from "next/image";
import { useContent } from "../hooks/useContent";
import { MenuItem } from "../lib/menuData";
import { useState } from "react";
import { useCart } from "../components/CartProvider";
import ReservationModal from "../components/ReservationModal";
>>>>>>> 1f5b1163 (İlk yükleme)

// Menü öğesi için tip tanımı yapıyoruz
interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
}

export default function Home() {
<<<<<<< HEAD
  // Modal ve panel durumları için state'leri tanımlıyoruz
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
=======
>>>>>>> 1f5b1163 (İlk yükleme)
  const { content } = useContent();
  const { addItem, getTotalItems } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

<<<<<<< HEAD
  // Bileşen client tarafında yüklendiğinde state'i güncelliyoruz
  useEffect(() => {
    setIsClient(true);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isClient && isMounted) {
      checkAdminAuth();
    }
  }, [isClient, isMounted]);

  // Admin yetkilendirmesini kontrol eden fonksiyon
  const checkAdminAuth = () => {
    if (typeof window === 'undefined') return false;

    const isAuthenticated = localStorage.getItem(adminConfig.sessionKey) === 'true';
    setIsAdminMode(isAuthenticated);
    return isAuthenticated;
  };

  const handleAdminClick = () => {
    router.push('/admin');
  };

  // Sepete ürün ekleme
=======
  const popularItems: MenuItem[] = (content.allMenuItems || []).slice(0, 4);

>>>>>>> 1f5b1163 (İlk yükleme)
  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: parseInt(item.id),
      name: item.name,
      price: item.price,
    });
  };

  return (
<<<<<<< HEAD
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800">{content.restaurantName}</span>
          </Link>
          <nav className="flex-1 hidden md:flex justify-center space-x-6 lg:space-x-10">
            <Link href="#menu" className="text-gray-600 hover:text-purple-600 transition-colors">
              Menü
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-purple-600 transition-colors">
              Hakkımızda
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-purple-600 transition-colors">
              İletişim
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => router.push('/cart')}
                className="relative w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                title="Sepet"
              >
                <i className="ri-shopping-cart-2-line text-lg"></i>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              </button>
            </div>
            <OrderChannelDropdown />
=======
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xl border-2 border-black">
              BK
            </div>
            <span className="text-2xl font-bold text-red-600 font-[Pacifico]">
              {content.restaurantName}
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-red-600 font-medium">
              Ana Sayfa
            </Link>
            <Link href="/menu" className="text-gray-700 hover:text-red-600">
              Menü
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600">
              Hakkımızda
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600">
              İletişim
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-red-600">
              Yorumlar
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              Rezervasyon
            </button>
            <Link
              href="/cart"
              className="relative bg-gray-100 text-red-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold cursor-pointer"
            >
              🛒 Sepetim
              {getTotalItems() > 0 && (
                 <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                   {getTotalItems()}
                 </span>
              )}
            </Link>
>>>>>>> 1f5b1163 (İlk yükleme)
          </div>
        </div>
      </header>

<<<<<<< HEAD
      <main>
        {/* Hero Section */}
        <section
          className="relative h-[60vh] sm:h-[80vh] bg-cover bg-center flex items-center justify-center text-center text-white"
          style={{ backgroundImage: "url('https://raw.githubusercontent.com/hakkurgithub/images/c566b1f24db82f2807adac6acc67e5f3e2474a67/Borcan-kebap-personeli.png')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 p-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">{content.heroTitle}</h1>
            <p className="text-lg sm:text-2xl font-light mb-8 max-w-2xl mx-auto">{content.heroSubtitle}</p>
            <Link
              href="#menu"
              className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-3 px-8 rounded-full shadow-lg"
            >
              Menüyü Keşfet
            </Link>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-16 sm:py-24 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-4">
              Öne Çıkan Lezzetler
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Damak zevkinize hitap eden en özel ve popüler yemeklerimizden seçmeler.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.menuItems?.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-600 font-bold text-xl">
                        {item.price.toFixed(2)} TL
                      </span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                        title="Sepete Ekle"
                      >
                        <i className="ri-add-line text-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/menu"
                className="bg-transparent border-2 border-purple-600 text-purple-600 font-semibold py-3 px-8 rounded-full hover:bg-purple-600 hover:text-white transition-colors"
              >
                Tüm Menüyü Gör
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 sm:py-24 bg-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  {content.restaurantName} Hakkında
                </h2>
                <p className="text-gray-600 mb-6">{content.aboutText}</p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-600 text-white p-3 rounded-full flex-shrink-0">
                      <i className="ri-leaf-line text-2xl"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">Taze Malzemeler</h4>
                      <p className="text-sm text-gray-600">Her gün özenle seçilen ürünler.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-600 text-white p-3 rounded-full flex-shrink-0">
                      <i className="ri-chef-line text-2xl"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">Usta Şefler</h4>
                      <p className="text-sm text-gray-600">Yılların deneyimi ile harmanlanmış lezzetler.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-600 text-white p-3 rounded-full flex-shrink-0">
                      <i className="ri-truck-line text-2xl"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">Hızlı Teslimat</h4>
                      <p className="text-sm text-gray-600">Siparişleriniz en kısa sürede kapınızda.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://readdy.ai/api/search-image?query=Chef%20preparing%20a%20delicious%20dish%20in%20a%20professional%20kitchen%20restaurant%20setting%20food%20preparation%20authentic%20and%20candid%20photo&width=600&height=400&seq=chef1&orientation=landscape"
                  alt="Aşçı Yemeği Hazırlarken"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 sm:py-24 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
              İletişim ve Adres
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Bize Ulaşın</h3>
                <p className="text-gray-600 mb-6">
                  Lezzet dolu bir deneyim için bizi arayın veya adresimize uğrayın.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <i className="ri-phone-line text-2xl text-purple-600"></i>
                    <a href={`tel:${content.phone}`} className="text-gray-600 hover:text-purple-600 transition-colors">
                      {content.phone}
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-map-pin-line text-2xl text-purple-600"></i>
                    <a
                      href="https://maps.app.goo.gl/rQdBMCqk5GMwdVSM7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {content.address}
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="ri-time-line text-2xl text-purple-600"></i>
                    <span className="text-gray-600">Her gün 09:00 - 23:00</span>
                  </li>
                </ul>
                <div className="flex space-x-4 mt-6">
                  {content.socialMedia?.facebook && (
                    <a href={content.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                      <i className="ri-facebook-box-fill text-2xl text-gray-600 hover:text-purple-600 transition-colors"></i>
                    </a>
                  )}
                  {content.socialMedia?.instagram && (
                    <a href={content.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                      <i className="ri-instagram-fill text-2xl text-gray-600 hover:text-purple-600 transition-colors"></i>
                    </a>
                  )}
                  {content.socialMedia?.twitter && (
                    <a href={content.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="ri-twitter-fill text-2xl text-gray-600 hover:text-purple-600 transition-colors"></i>
                    </a>
                  )}
                </div>
              </div>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.872895521406!2d37.009472315264376!3d37.042790979893966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e21b20c2b291%3A0x633d995b0b2e8e7a!2sBorcan%20Kebap!5e0!3m2!1str!2str!4v1628163617195!5m2!1str!2str"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Harita"
                  className="rounded-lg shadow-md"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold mb-4">{content.restaurantName}</h3>
              <p className="text-sm text-gray-400">
                Geleneksel lezzetleri modern dokunuşlarla birleştiriyoruz.
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Menü</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/menu" className="hover:text-white transition-colors">Kebaplar</Link></li>
                <li><Link href="/menu" className="hover:text-white transition-colors">Pideler</Link></li>
                <li><Link href="/menu" className="hover:text-white transition-colors">Dürümler</Link></li>
                <li><Link href="/menu" className="hover:text-white transition-colors">Tatlılar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Hızlı Erişim</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#about" className="hover:text-white transition-colors">Hakkımızda</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">İletişim</Link></li>
                <li><a onClick={() => setShowReservationModal(true)} className="hover:text-white transition-colors cursor-pointer">Rezervasyon Yap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href={`tel:${content.phone}`} className="hover:text-white transition-colors">
                    {content.phone}
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.app.goo.gl/rQdBMCqk5GMwdVSM7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
=======
      {/* HERO SECTION */}
      <section className="relative bg-cover bg-center py-20" style={{ backgroundImage: "url('/hero.jpg')" }}>
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{content.heroTitle || "Lezzetin Adresi Borcan Kebap"}</h1>
          <p className="text-lg mb-6">{content.heroSubtitle || "Gerçek kebap lezzetini keşfedin"}</p>
          {/* ✅✅✅ HATA BURADA DÜZELTİLDİ ✅✅✅ */}
          <Link
            href="/menu"
            className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Menüye Göz At
          </Link>
        </div>
      </section>

      {/* POPÜLER ÜRÜNLER */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Popüler Lezzetler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularItems.map((item: MenuItem) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-4 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-2 flex-grow">{item.description}</p>
                <div className="flex justify-between items-center mt-auto pt-2">
                  <span className="text-red-600 font-bold text-lg">{item.price} ₺</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-sm"
>>>>>>> 1f5b1163 (İlk yükleme)
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
<<<<<<< HEAD
      </footer>

      {/* Modals */}
      {showReservationModal && <ReservationModal isOpen={showReservationModal} onClose={() => setShowReservationModal(false)} />}

      {showWhatsAppModal && <WhatsAppOrderModal isOpen={showWhatsAppModal} onClose={() => setShowWhatsAppModal(false)} />}

      {/* Admin Panel */}
      {isAdminMode && <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />}
=======
      </section>
      
      {/* REZERVASYON MODAL */}
      <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
>>>>>>> 1f5b1163 (İlk yükleme)
    </div>
  );
}