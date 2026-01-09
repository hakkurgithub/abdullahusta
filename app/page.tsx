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
      {/* HERO SECTION */}
      <section 
        className="relative h-[85vh] flex items-center justify-center text-center text-white bg-neutral-900"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://raw.githubusercontent.com/hakkurgithub/images/main/abdullah-usta-hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}>
        {/* mt-48 eklenerek yazı aşağı kaydırıldı */}
        <div className="relative z-10 px-4 max-w-4xl mx-auto mt-48">
          {/* Yazı boyutu küçültüldü: text-4xl md:text-6xl */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-2xl leading-tight">
            {content.heroTitle || "Lezzetin Ustası Abdullah Usta"}
          </h1>
          <p className="text-lg md:text-xl font-medium mb-10 opacity-95 drop-shadow-lg">
            {content.heroSubtitle || "Geleneksel ocakbaşı lezzetini usta ellerden deneyimleyin."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-xl text-lg">
              Menüyü İncele
            </Link>
            <button 
              onClick={() => setShowReservationModal(true)}
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-full transition-all shadow-xl hover:scale-105 text-lg">
              Rezervasyon Yap
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <span className="text-3xl opacity-80 text-white">⬇️</span>
        </div>
      </section>

      {/* POPÜLER ÜRÜNLER SECTION */}
      <section className="py-20 container mx-auto px-4 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Öne Çıkan Lezzetler</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Misafirlerimizin en çok tercih ettiği imza tabaklarımız.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularItems.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
              <div className="relative h-64 w-full overflow-hidden">
                <img 
                  src={item.image || 'https://raw.githubusercontent.com/hakkurgithub/images/main/placeholder.jpg'} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <span className="text-sm">⭐</span>
                  <span className="text-sm font-bold text-gray-800">4.9</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-black text-2xl">{item.price} ₺</span>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 active:scale-95">
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/menu" className="inline-flex items-center gap-2 text-red-600 font-bold hover:underline text-lg">
            Tüm Menüyü Gör →
          </Link>
        </div>
      </section>

      <ReservationModal isOpen={showReservationModal} onClose={() => setShowReservationModal(false)} />
      <WhatsAppOrderModal isOpen={showWhatsAppModal} onClose={() => setShowWhatsAppModal(false)} />
      {isAdminMode && <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />}
    </>
  );
}