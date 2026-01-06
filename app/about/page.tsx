'use client';

import Link from 'next/link';
import OrderChannelDropdown from '../../components/OrderChannelDropdown';

export default function AboutPage() {
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
                <span className="text-2xl font-bold text-red-600 font-[`Pacifico`] uppercase tracking-tight">
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
              <Link href="/about" className="text-red-600 font-medium transition-colors cursor-pointer">
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
              <a 
                href="tel:+902128120244" 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap cursor-pointer shadow-md"
              >
                Rezervasyon
              </a>
              <OrderChannelDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/c566b1f24db82f2807adac6acc67e5f3e2474a67/Abdullah Usta-kebap-personeli.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">Hakkımızda</h1>
            <p className="text-xl max-w-2xl mx-auto font-light">40 yıllık geleneksel lezzet hikayemiz</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b-4 border-red-600 inline-block">Hikayemiz</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                1985 yılından bu yana hizmet veren <strong>Abdullah Usta</strong>,
                geleneksel Türk mutfağının eşsiz lezzetlerini modern sunum ile buluşturuyor. Ailemizin 40
                yıllık deneyimi ve özel tariflerimizle her lokmada otantik tatları yaşayacaksınız.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Her gün taze malzemelerle hazırlanan kebaplarımız, özel baharatlarımız
                ve mangal ateşimizin verdiği eşsiz aroma ile misafirlerimize unutulmaz bir yemek deneyimi sunuyoruz.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">40+</div>
                  <div className="text-gray-600">Yıllık Deneyim</div>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">50K+</div>
                  <div className="text-gray-600">Mutlu Müşteri</div>
                </div>
              </div>
            </div>
            <div
              className="w-full h-96 bg-cover bg-center rounded-lg shadow-xl"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=Traditional%20Turkish%20chef%20preparing%20kebab%20in%20authentic%20restaurant%20kitchen&width=600&height=400&seq=chef-about')`,
              }}
            ></div>
          </div>
        </section>

        {/* Uzman Kadromuz */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Uzman Kadromuz</h2>
            <p className="text-xl text-gray-600">Lezzetin arkasındaki profesyonel ekip</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-cover bg-center rounded-full mx-auto mb-4 border-2 border-red-600"
                style={{ backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/main/Erhan-Deniz.jpg')` }}
              ></div>
              <h3 className="text-xl font-semibold text-gray-800 uppercase">Executive Chef</h3>
              <p className="text-red-600 font-medium mb-2">Mutfak Şefi</p>
              <p className="text-gray-600 text-sm">35 yıllık gastronomi deneyimi ile tüm mutfak operasyonlarımızı yönetmektedir.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-cover bg-center rounded-full mx-auto mb-4 border-2 border-red-600"
                style={{ backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/main/faruk-deniz.jpg')` }}
              ></div>
              <h3 className="text-xl font-semibold text-gray-800 uppercase">Bakery Manager</h3>
              <p className="text-red-600 font-medium mb-2">Fırın & Hamur İşleri Sorumlusu</p>
              <p className="text-gray-600 text-sm">Geleneksel taş fırın teknikleri ve unlu mamuller üretim süreçlerinden sorumludur.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-cover bg-center rounded-full mx-auto mb-4 border-2 border-red-600"
                style={{ backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/main/oktay-deniz.jpg')` }}
              ></div>
              <h3 className="text-xl font-semibold text-gray-800 uppercase">Operations Manager</h3>
              <p className="text-red-600 font-medium mb-2">Operasyon Müdürü</p>
              <p className="text-gray-600 text-sm">Misafir memnuniyeti ve restoran genel operasyonlarını koordine etmektedir.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white text-lg border-2 border-red-700">
                  AU
                </div>
                <span className="font-[`Pacifico`]">Abdullah Usta</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Geleneksel Türk mutfağının eşsiz lezzetlerini modern sunum ile buluşturuyoruz.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/p/Abdullah-usta-parseller-61570080275040/" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-facebook-box-fill text-2xl"></i>
                </a>
                <a href="https://www.instagram.com/abdullah.usta_parseller/" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-instagram-line text-2xl"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                <li><Link href="/menu" className="text-gray-400 hover:text-white transition-colors">Menü</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">İletişim</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Online Sipariş</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Yemeksepeti</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Getir</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trendyol Yemek</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="leading-relaxed">
                  Avcılar Üniversite Mah. Mareşal Cad. No:22<br />
                  İstanbul, Turkey 34320
                </li>
                <li className="flex items-center">
                  <i className="ri-phone-line mr-2"></i>
                  📞 0212 812 02 44
                </li>
                <li className="flex items-center">
                  <i className="ri-whatsapp-line mr-2"></i>
                  WhatsApp: 0544 202 42 44
                </li>
                <li className="flex items-center">
                  <i className="ri-mail-line mr-2"></i>
                  E-posta: burakkeskin4244@gmail.com
                </li>
                <li className="pt-2">
                  <a
                    href="https://maps.app.goo.gl/yAKxQ5ZcjFJ5jPNYA”"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors inline-block"
                  >
                    Haritada Gör
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Abdullah Usta. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}