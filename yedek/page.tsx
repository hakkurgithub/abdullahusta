'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useContent } from '../hooks/useContent';
import { useCart } from '../components/CartProvider';
import ReservationModal from '../components/ReservationModal';
import WhatsAppOrderModal from '../components/WhatsAppOrderModal';
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
  const { addItem } = useCart();

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
    <>
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

      {/* Modals */}
      <ReservationModal isOpen={showReservationModal} onClose={() => setShowReservationModal(false)} />
      <WhatsAppOrderModal isOpen={showWhatsAppModal} onClose={() => setShowWhatsAppModal(false)} />
      {isAdminMode && <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />}
    </>
  );
}