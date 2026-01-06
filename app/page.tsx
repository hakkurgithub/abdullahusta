'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useContent } from '../hooks/useContent';
import { useCart } from '../components/CartProvider';
import ReservationModal from '../components/ReservationModal';
import WhatsAppOrderModal from '../components/WhatsAppOrderModal';
import OrderChannelDropdown from '../components/OrderChannelDropdown';
import AdminPanel from '../components/AdminPanel';
import { adminConfig } from '../lib/admin';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
}

export default function Home() {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { content } = useContent();
  const { addItem, getTotalItems } = useCart();

  useEffect(() => {
    setIsClient(true);
    const isAuthenticated = localStorage.getItem(adminConfig.sessionKey) === 'true';
    setIsAdminMode(isAuthenticated);
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: parseInt(item.id),
      name: item.name,
      price: item.price,
    });
  };

  if (!isClient) return null;

  const popularItems: MenuItem[] = (content.allMenuItems || []).slice(0, 4);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg">
              AU
            </div>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">
              Abdullah Usta
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/menu" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Menü</Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Hakkımızda</Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors">İletişim</Link>
            <a 
              href="tel:+902128120244" 
              className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition-all shadow-md font-medium"
            >
              Rezervasyon
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-red-600 transition-colors">
              <span className="text-2xl">🛒</span>
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <OrderChannelDropdown />
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section 
          className="relative h-[70vh] flex items-center justify-center text-center text-white bg-neutral-900"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://raw.githubusercontent.com/hakkurgithub/images/main/hero-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              {content.heroTitle || "Lezzetin Ustası Abdullah Usta"}
            </h1>
            <p className="text-xl md:text-2xl font-light mb-10 max-w-3xl mx-auto opacity-90">
              {content.heroSubtitle || "Geleneksel kebap lezzetini usta ellerden deneyimleyin."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl">
                Hemen Sipariş Ver
              </Link>
              <a 
                href="tel:+902128120244" 
                className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-10 rounded-full transition-all shadow-xl"
              >
                Masa Ayırt
              </a>
            </div>
          </div>
        </section>

        {/* Popüler Ürünler Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Öne Çıkan Lezzetler</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {popularItems.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
                <div className="relative h-56 w-full">
                  <img 
                    src={item.image || 'https://raw.githubusercontent.com/hakkurgithub/images/main/placeholder.jpg'} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-extrabold text-2xl">{item.price} ₺</span>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="bg-gray-100 hover:bg-red-600 hover:text-white text-red-600 p-3 rounded-xl transition-all font-bold"
                    >
                      + Ekle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-red-500">Abdullah Usta</h3>
            <p className="text-gray-400 leading-relaxed">
              Geleneksel Türk mutfağının eşsiz lezzetlerini modern sunum ile buluşturuyoruz.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest">İletişim</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>📍 Avcılar Üniversite Mah. Mareşal Cad. No:22</li>
              <li>📞 0212 812 02 44</li>
              <li>💬 WhatsApp: 0544 202 42 44</li>
              <li>✉️ burakkeskin4244@gmail.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest">Hızlı Linkler</h4>
            <div className="flex flex-col space-y-3 text-gray-400">
              <Link href="/menu" className="hover:text-red-500 transition-colors">Menü</Link>
              <Link href="/about" className="hover:text-red-500 transition-colors">Hakkımızda</Link>
              <Link href="/contact" className="hover:text-red-500 transition-colors">İletişim</Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest">Sosyal Medya</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/p/Abdullah-usta-parseller-61570080275040/" target="_blank" className="text-2xl hover:text-blue-500 transition-colors">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="https://www.instagram.com/abdullah.usta_parseller/" target="_blank" className="text-2xl hover:text-pink-500 transition-colors">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="https://maps.app.goo.gl/yAKxQ5ZcjFJ5jPNYA”" target="_blank" className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors">
                Haritada Gör
              </a>
            </div>
          </div>
        </div>
        <div className="text-center pt-10 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Abdullah Usta. Tüm Hakları Saklıdır.
        </div>
      </footer>

      {/* Modals */}
      <ReservationModal isOpen={showReservationModal} onClose={() => setShowReservationModal(false)} />
      <WhatsAppOrderModal isOpen={showWhatsAppModal} onClose={() => setShowWhatsAppModal(false)} />
      {isAdminMode && <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />}
    </div>
  );
}