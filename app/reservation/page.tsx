
'use client';

import Link from 'next/link';
import { useState } from 'react';
import ReservationModal from '../../components/ReservationModal';
import OrderChannelDropdown from '../../components/OrderChannelDropdown';

export default function ReservationPage() {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);

  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
  ];
  const handleQuickReservation = () => {
    // 1) Tarih veya saat seçilmediyse eski modalı aç (isteğe bağlı)
    if (!selectedDate || !selectedTime) {
      setShowReservationModal(true);
      return;
    }

    // 2) Seçili değerleri Türkçe formatla
    const dateTr = new Date(selectedDate).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    const message = `Merhaba!
Abdullah Usta'tan masa rezervasyonu istiyorum:
📅 Tarih: ${dateTr}
🕒 Saat: ${selectedTime}
👥 Kişi sayısı: ${guests}
Teşekkürler!`;

    const phone = '905455093462'; // uluslararası format (+-sız)
    const waURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(waURL, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xl border-2 border-black">
                  BK
                </div>
                <span className="text-2xl font-bold text-red-600 font-[\'Pacifico\']">
                  Abdullah Usta
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Ana Sayfa
              </Link>
              <Link href="/menu" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Menü
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Hakkımızda
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                İletişim
              </Link>
              <Link href="/reservation" className="text-red-600 hover:text-red-700 font-medium transition-colors cursor-pointer">
                Rezervasyon
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button onClick={handleQuickReservation} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
                Rezervasyon
              </button>
              <OrderChannelDropdown />
              <button className="md:hidden w-6 h-6 flex items-center justify-center cursor-pointer">
                <i className="ri-menu-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Elegant%20restaurant%20interior%20with%20beautifully%20set%20tables%2C%20warm%20ambient%20lighting%2C%20romantic%20dining%20atmosphere%2C%20Turkish%20restaurant%20decor%2C%20white%20tablecloths%2C%20professional%20restaurant%20photography%2C%20inviting%20dining%20space%20for%20reservations&width=1200&height=400&seq=reservation-hero&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Rezervasyon</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Abdullah Usta&apos;ta unutulmaz bir yemek deneyimi için masanızı ayırtın
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Reservation Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              <i className="ri-calendar-line mr-3 text-red-600"></i>
              Masa Rezervasyonu
            </h2>
            
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tarih Seçin
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kişi Sayısı
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer"
                  >
                    <i className="ri-subtract-line"></i>
                  </button>
                  <span className="text-2xl font-semibold w-12 text-center">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(12, guests + 1))}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer"
                  >
                    <i className="ri-add-line"></i>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Maksimum 12 kişi</p>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Saat Seçin
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                        selectedTime === time
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-red-600 hover:text-red-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Reservation Button */}
              <button
                onClick={handleQuickReservation}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors cursor-pointer flex items-center justify-center"
              >
                <i className="ri-calendar-check-line mr-2 text-lg"></i>
                Rezervasyon Yap
              </button>
            </div>
          </div>

          {/* Restaurant Info & Special Offers */}
          <div className="space-y-8">
            {/* Restaurant Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Rezervasyon Bilgileri
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-time-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Çalışma Saatleri</h4>
                    <p className="text-gray-600">Her gün 11:00 - 23:00</p>
                    <p className="text-sm text-green-600">Kesintisiz servis</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-phone-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Rezervasyon Hattı</h4>
                    <p className="text-gray-600">0212 423 3727</p>
                    <p className="text-gray-600">0545 509 3462</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-map-pin-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Adres</h4>
                    <p className="text-gray-600">
                      Beyoğlu Caddesi No: 35/A<br/>
                      Parseller, Avcılar/İstanbul
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-user-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Kapasite</h4>
                    <p className="text-gray-600">120 kişilik salon</p>
                    <p className="text-gray-600">Grup rezervasyonları mevcut</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Offers */}
            <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">
                <i className="ri-gift-line mr-2"></i>
                Özel Teklifler
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">🎂 Doğum Günü Sürprizi</h4>
                  <p className="text-sm opacity-90">
                    Doğum günü rezervasyonlarında ücretsiz pasta ve sürpriz
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">👨👩👧👦 Aile Menüsü</h4>
                  <p className="text-sm opacity-90">
                    4+ kişilik rezervasyonlarda %15 indirim
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">🎵 Canlı Müzik</h4>
                  <p className="text-sm opacity-90">
                    Cuma ve Cumartesi akşamları canlı Türk müziği
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Hızlı İletişim
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <i className="ri-phone-fill text-2xl text-green-600 mb-2"></i>
                  <span className="font-medium">Ara</span>
                  <span className="text-xs text-gray-500">0212 423 3727</span>
                </button>
                
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <i className="ri-whatsapp-fill text-2xl text-green-600 mb-2"></i>
                  <span className="font-medium">WhatsApp</span>
                  <span className="text-xs text-gray-500">0545 509 3462</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Rules */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            <i className="ri-information-line mr-2 text-blue-600"></i>
            Rezervasyon Kuralları
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <i className="ri-time-line text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Geç Kalma</h4>
                <p className="text-sm text-gray-600">15 dakikadan fazla geç kalınması durumunda rezervasyon iptal edilebilir.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <i className="ri-close-circle-line text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">İptal</h4>
                <p className="text-sm text-gray-600">Rezervasyon iptali en az 2 saat öncesinden bildirilmelidir.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <i className="ri-user-3-line text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Grup Rezervasyonu</h4>
                <p className="text-sm text-gray-600">8+ kişilik grup rezervasyonları için önceden arayınız.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <i className="ri-calendar-check-line text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Onay</h4>
                <p className="text-sm text-gray-600">Rezervasyonunuz telefon ile teyit edilecektir.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <i className="ri-restaurant-line text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Özel Menü</h4>
                <p className="text-sm text-gray-600">Özel diyet ihtiyaçlarınızı rezervasyon sırasında belirtiniz.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <i className="ri-gift-line text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Özel Günler</h4>
                <p className="text-sm text-gray-600">Doğum günü ve özel günlerinizi rezervasyon sırasında belirtiniz.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-lg border-2 border-black">
                  BK
                </div>
                <span className="font-[\'Pacifico\']">Abdullah Usta</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Geleneksel Türk mutfağının eşsiz lezzetlerini modern sunum ile buluşturuyoruz.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/brcnkbp" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <i className="ri-facebook-fill text-lg"></i>
                </a>
                <a href="https://www.instagram.com/abdullahusta/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-full flex items-center justify-center cursor-pointer hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 transition-all">
                  <i className="ri-instagram-fill text-lg"></i>
                </a>
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                  <i className="ri-twitter-fill text-sm"></i>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/menu" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Menü
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    İletişim
                  </Link>
                </li>
                <li>
                  <Link href="/reservation" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Rezervasyon
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Online Sipariş</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.yemeksepeti.com/restaurant/kw28/Abdullah Usta-kebap-pide-lahmacun-salonu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center">
                    <i className="ri-restaurant-line mr-2 text-orange-600"></i>
                    Yemeksepeti
                  </a>
                </li>
                <li>
                  <a href="https://getir.com/yemek/restoran/Abdullah Usta-kebap-pide-lahmacun-salonu-mustafa-kemalpasa-mah-avcilar-istanbul/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center">
                    <i className="ri-truck-line mr-2 text-orange-600"></i>
                    Getir
                  </a>
                </li>
                <li>
                  <a href="https://www.trendyol.com/yemek" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center">
                    <i className="ri-restaurant-line mr-2 text-purple-600"></i>
                    Trendyol Yemek
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/905455093462?text=Merhaba! Abdullah Usta'tan sipariş vermek istiyorum." target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center">
                    <i className="ri-whatsapp-line mr-2 text-green-600"></i>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <i className="ri-phone-line mr-2"></i>
                  0212 423 3727
                </li>
                <li className="flex items-center">
                  <i className="ri-phone-line mr-2"></i>
                  0545 509 3462
                </li>
                <li className="flex items-center">
                  <i className="ri-whatsapp-line mr-2"></i>
                  0545 509 3462 (WhatsApp)
                </li>
                <li className="flex items-center">
                  <i className="ri-mail-line mr-2"></i>
                  info@abdullahusta.com
                </li>
                <li className="flex items-start">
                  <i className="ri-map-pin-line mr-2 mt-1"></i>
                  <a
                    href="https://maps.app.goo.gl/rQdBMCqk5GMwdVSM7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Beyoğlu Caddesi No: 35/A
                    <br />
                    Parseller, Avcılar/İstanbul
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Abdullah Usta. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      <ReservationModal 
        isOpen={showReservationModal} 
        onClose={() => setShowReservationModal(false)} 
      />
    </div>
  );
}