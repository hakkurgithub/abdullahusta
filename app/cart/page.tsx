'use client';

import { useCart } from '../../components/CartProvider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, removeFromCart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  
  // Form Bilgileri
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Nakit');
  const [loading, setLoading] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // --- SAYFA AÇILINCA KULLANICI BİLGİLERİNİ ÇEK ---
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch('/api/user/details');
        if (res.ok) {
          const data = await res.json();
          if (data.address) setAddress(data.address);
          if (data.phone) setPhone(data.phone);
          setIsUserLoggedIn(true);
        }
      } catch (error) {
        console.log("Misafir kullanıcı veya veri çekilemedi");
      }
    };
    fetchUserInfo();
  }, []);

  // --- SİPARİŞ VE WHATSAPP YÖNLENDİRMESİ ---
  const handleOrder = async () => {
    // 1. Validasyonlar
    if (items.length === 0) return alert('Sepetiniz boş!');
    if (!address) return alert('Lütfen teslimat adresi giriniz.');
    if (!phone) return alert('Lütfen telefon numarası giriniz.');

    // 2. VERİLERİ SABİTLE (SNAPSHOT AL)
    // React state'i değişse bile bu değişkenler sabit kalır.
    const currentItems = [...items]; 
    const currentTotal = totalPrice;
    const currentAddress = address;
    const currentPhone = phone;
    const currentPayment = paymentMethod;

    setLoading(true);

    try {
      // 3. Veritabanına Kaydet
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: currentItems,
          total: currentTotal,
          address: currentAddress,
          phone: currentPhone,
          paymentMethod: currentPayment,
        }),
      });

      if (res.ok) {
        const orderData = await res.json();
        const orderId = orderData.id ? orderData.id.slice(0, 5).toUpperCase() : 'YENI';

        // 4. WhatsApp Mesajını Hazırla (Sabitlenen Verilerle)
        const adminPhone = '905442024244'; // Abdullah Usta Telefon
        
        // Ürünleri listele
        const itemsList = currentItems.map(item => 
          `- ${item.name} (${item.quantity} Adet)`
        ).join('\n');
        
        const message = `👋 Merhaba Abdullah Usta!\n\nWeb sitenizden yeni bir sipariş verdim.\n\n🧾 *Sipariş No:* #${orderId}\n📦 *Sipariş Özeti:*\n${itemsList}\n\n💰 *Tutar:* ${currentTotal} TL\n💳 *Ödeme:* ${currentPayment}\n📍 *Adres:* ${currentAddress}\n📱 *İletişim:* ${currentPhone}\n\nSiparişimi onaylar mısınız?`;
        
        const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;

        // 5. Sepeti Temizle
        // Artık mesajı oluşturduğumuz için sepeti güvenle silebiliriz.
        clearCart();
        
        // 6. Kullanıcıyı Bilgilendir ve Yönlendir
        alert('✅ Siparişiniz başarıyla alındı! Onay için WhatsApp\'a yönlendiriliyorsunuz...');
        
        // window.open yerine location.href mobilde daha stabildir (popup engelleyiciye takılmaz)
        window.location.href = whatsappUrl; 

      } else {
        // Hata Durumları
        if (res.status === 401) {
          alert('Sipariş vermek için lütfen giriş yapın.');
          router.push('/login');
        } else {
          alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
      }
    } catch (error) {
      alert('Bağlantı hatası. İnternetinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-400 mb-4">Sepetinizde ürün yok 😔</h2>
        <button 
          onClick={() => router.push('/menu')}
          className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors"
        >
          Menüye Git
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL TARAF: ÜRÜNLER */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sepetim ({items.length} Ürün)</h2>
          
          {items.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 border border-gray-100">
              <div className="w-20 h-20 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-gray-400">Resim Yok</div>
                )}
              </div>
              
              <div className="flex-grow">
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-red-600 font-bold">{item.price} ₺</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-bold text-sm">x{item.quantity}</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SAĞ TARAF: ÖDEME FORMU */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
            <h3 className="font-bold text-xl text-gray-800 mb-6">Siparişi Tamamla</h3>

            <div className="space-y-4">
              
              {/* Adres Kutusu */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">TESLİMAT ADRESİ</label>
                <textarea 
                  placeholder="Mahalle, Cadde, Kapı No, Tarif..." 
                  rows={3}
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-red-500 outline-none transition-colors resize-none text-sm"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Telefon Kutusu */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">TELEFON</label>
                <input 
                  type="tel"
                  placeholder="05XX XXX XX XX" 
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-red-500 outline-none transition-colors text-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Ödeme Yöntemi */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 ml-1">ÖDEME YÖNTEMİ</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPaymentMethod('Nakit')}
                    className={`py-3 rounded-xl font-bold text-sm border-2 transition-all ${paymentMethod === 'Nakit' ? 'border-red-600 bg-red-50 text-red-700' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
                  >
                    💵 Nakit / Kapıda
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('Kart')}
                    className={`py-3 rounded-xl font-bold text-sm border-2 transition-all ${paymentMethod === 'Kart' ? 'border-red-600 bg-red-50 text-red-700' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
                  >
                    💳 Kredi Kartı
                  </button>
                </div>
              </div>

              <div className="border-t border-dashed my-4 pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-bold">Toplam Tutar</span>
                  <span className="text-2xl font-extrabold text-gray-900">{totalPrice} ₺</span>
                </div>

                <button 
                  onClick={handleOrder}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg shadow-green-200 transition-transform active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? 'İşleniyor...' : (
                    <>
                      <span>Siparişi WhatsApp ile Onayla</span>
                      <i className="ri-whatsapp-line text-xl"></i>
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-2">
                  *Siparişiniz önce sisteme kaydedilir, sonra onay için WhatsApp açılır.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}