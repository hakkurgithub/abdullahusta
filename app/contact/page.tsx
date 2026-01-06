'use client';

import Link from 'next/link';
import { useState } from 'react';
import OrderChannelDropdown from '../../components/OrderChannelDropdown';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simüle edilmiş form gönderimi
    setTimeout(() => {
      setSubmitMessage({
        type: 'success',
        text: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.',
      });
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white text-xl border-2 border-red-700 shadow-sm">
                  AU
                </div>
                <span className="text-2xl font-bold text-red-600 font-[`Pacifico`]">
                  Abdullah Usta
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">Ana Sayfa</Link>
              <Link href="/menu" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">Menü</Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">Hakkımızda</Link>
              <Link href="/contact" className="text-red-600 font-medium transition-colors cursor-pointer">İletişim</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="tel:+902128120244" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md">
                Rezervasyon
              </a>
              <OrderChannelDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">Bize Ulaşın</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Görüşleriniz bizim için değerli. Her türlü soru, öneri veya iş birliği için yanınızdayız.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* İletişim Bilgileri */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">İletişim Detayları</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mr-4 shrink-0">
                    <i className="ri-map-pin-2-fill text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Adres</h3>
                    <p className="text-gray-600">Avcılar Üniversite Mah. Mareşal Cad. No:22<br />İstanbul, Turkey 34320</p>
                    <a href="https://maps.app.goo.gl/yAKxQ5ZcjFJ5jPNYA”" target="_blank" rel="noopener noreferrer" className="text-red-600 text-sm font-bold hover:underline mt-2 inline-block">Haritada Gör</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mr-4 shrink-0">
                    <i className="ri-phone-fill text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Telefon</h3>
                    <p className="text-gray-600">Sabit: 0212 812 02 44</p>
                    <p className="text-gray-600">WhatsApp: 0544 202 42 44</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mr-4 shrink-0">
                    <i className="ri-mail-fill text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">E-posta</h3>
                    <p className="text-gray-600">burakkeskin4244@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sosyal Medya */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Bizi Takip Edin</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/p/Abdullah-usta-parseller-61570080275040/" target="_blank" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md">
                  <i className="ri-facebook-fill text-xl"></i>
                </a>
                <a href="https://www.instagram.com/abdullah.usta_parseller/" target="_blank" className="w-10 h-10 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow-md">
                  <i className="ri-instagram-line text-xl"></i>
                </a>
              </div>
            </div>
          </div>

          {/* İletişim Formu */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Bize Mesaj Gönderin</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Adınız Soyadınız</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all" placeholder="Örn: Ahmet Yılmaz" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">E-posta Adresiniz</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" placeholder="ahmet@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon No</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" placeholder="05XX XXX XX XX" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Konu</label>
                    <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none">
                      <option value="">Seçiniz...</option>
                      <option value="Sipariş">Sipariş Hakkında</option>
                      <option value="Rezervasyon">Rezervasyon</option>
                      <option value="Şikayet/Öneri">Şikayet / Öneri</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mesajınız</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none" placeholder="Mesajınızı buraya yazınız..."></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg active:scale-95 disabled:bg-gray-400">
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                </button>
                {submitMessage && (
                  <div className={`mt-4 p-4 rounded-xl text-center font-medium ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {submitMessage.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-red-600 mb-4">Abdullah Usta</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">Geleneksel lezzetleri modern dokunuşlarla sunuyoruz.</p>
          <div className="border-t border-gray-800 pt-8 text-gray-500 text-sm">
            © 2024 Abdullah Usta. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}