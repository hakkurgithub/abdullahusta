'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/CartProvider';
// Eğer ReservationModal bileşeni yoksa hata verir, varsa bu satır kalsın. 
// Yoksa satırı silip aşağıdan butonu güncelleyebilirsiniz.
import ReservationModal from '@/components/ReservationModal'; 

export default function Home() {
  const { addToCart } = useCart(); // DOĞRU FONKSİYON
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReservationModal, setShowReservationModal] = useState(false);

  // 1. Ürünleri Veritabanından Çek
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          // Sadece Yayında olanları al
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

  // Popüler ürünler (Veritabanından gelen ilk 4 ürün)
  const popularItems = products.slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-red-600 font-bold text-xl animate-pulse">Lezzetler Hazırlanıyor...</div>
      </div>
    );
  }

  return (
    <>
      {/* --- HERO SECTION (ESKİ GÜZEL TASARIM) --- */}
      <section 
        className="relative h-[85vh] flex items-center justify-center text-center text-white bg-neutral-900"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://raw.githubusercontent.com/hakkurgithub/images/main/abdullah-usta-hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
      >
        <div className="relative z-10 px-4 max-w-4xl mx-auto mt-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-2xl leading-tight">
            Lezzetin Ustası Abdullah Usta
          </h1>
          <p className="text-lg md:text-xl font-medium mb-10 opacity-95 drop-shadow-lg text-gray-200">
            Geleneksel ocakbaşı lezzetini usta ellerden deneyimleyin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl text-lg border-2 border-red-600">
              Menüyü İncele
            </Link>
            <button 
              onClick={() => setShowReservationModal(true)}
              className="bg-transparent hover:bg-white hover:text-gray-900 text-white border-2 border-white font-bold py-4 px-10 rounded-full transition-all shadow-xl hover:scale-105 text-lg"
            >
              Rezervasyon Yap
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <span className="text-3xl opacity-80 text-white">⬇️</span>
        </div>
      </section>

      {/* --- POPÜLER ÜRÜNLER (VERİTABANI ENTEGRASYONLU) --- */}
      <section className="py-20 container mx-auto px-4 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Öne Çıkan Lezzetler</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Misafirlerimizin en çok tercih ettiği imza tabaklarımız.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col">
              
              {/* Resim */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                {item.image ? (
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 font-bold">Resim Yok</div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <span className="text-sm">⭐</span>
                  <span className="text-sm font-bold text-gray-800">4.9</span>
                </div>
              </div>

              {/* İçerik */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {item.description || 'En taze malzemelerle günlük hazırlanır.'}
                  </p>
                </div>
                
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-red-600 font-black text-2xl">{item.price} ₺</span>
                  <button 
                    onClick={() => addToCart(item)} // HATA DÜZELDİ: addToCart kullanıldı
                    className="bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 active:scale-95"
                  >
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

      {/* Rezervasyon Modalı (Bileşen varsa çalışır) */}
      {showReservationModal && <ReservationModal isOpen={showReservationModal} onClose={() => setShowReservationModal(false)} />}
    </>
  );
}