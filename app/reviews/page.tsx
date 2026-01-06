'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OrderChannelDropdown from '../../components/OrderChannelDropdown';

// Mock data for reviews since we don't have the lib file
interface GoogleReview {
  id?: string;
  author_name: string;
  rating: number;
  review_text: string;
  review_date: string;
  relative_time_description: string;
  profile_photo_url: string;
}

interface RestaurantInfo {
  rating: number;
  total_reviews: number;
}

// Mock reviews data
const mockReviews: GoogleReview[] = [
  {
    id: '1',
    author_name: 'Ahmet Yılmaz',
    rating: 5,
    review_text: 'Harika bir deneyimdi! Adana kebabı muhteşemdi, et çok lezzetli ve tazeydi. Personel çok ilgili. Kesinlikle tekrar geleceğim.',
    review_date: new Date().toISOString(),
    relative_time_description: '2 gün önce',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Ahmet Yılmaz')}&size=60&background=f59e0b&color=ffffff`
  },
  {
    id: '2',
    author_name: 'Fatma Özkan',
    rating: 4,
    review_text: 'Pideleri çok güzel, özellikle kuşbaşılı pide tavuk dürümü de lezizdi. Fiyatlar makul, ortam sıcak.',
    review_date: new Date().toISOString(),
    relative_time_description: '1 hafta önce',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Fatma Özkan')}&size=60&background=10b981&color=ffffff`
  },
  {
    id: '3',
    author_name: 'Mehmet Kaya',
    rating: 5,
    review_text: 'İskender kebabı için gelmiştik, beklentimizi fazlasıyla karşıladı. Yoğurt ve tereyağı sosu mükemmeldi.',
    review_date: new Date().toISOString(),
    relative_time_description: '3 gün önce',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Mehmet Kaya')}&size=60&background=3b82f6&color=ffffff`
  },
  {
    id: '4',
    author_name: 'Zeynep Demir',
    rating: 4,
    review_text: 'Lahmacunlar ince hamurlu ve lezzetliydi. Çay servisi de güzeldi. Tek eksik biraz kalabalık olması.',
    review_date: new Date().toISOString(),
    relative_time_description: '5 gün önce',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Zeynep Demir')}&size=60&background=e11d48&color=ffffff`
  },
  {
    id: '5',
    author_name: 'Mustafa Acar',
    rating: 5,
    review_text: 'Döner porsiyonu çok doyurucuydu, et kalitesi yüksek. Salata ve pilav da tazeydi. Personelin ilgisi çok güzeldi.',
    review_date: new Date().toISOString(),
    relative_time_description: '1 gün önce',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Mustafa Acar')}&size=60&background=7c3aed&color=ffffff`
  }
];

const mockRestaurant: RestaurantInfo = {
  rating: 4.6,
  total_reviews: 247
};

// Review Form Component
function AddReviewForm({ onReviewAdded }: { onReviewAdded: () => void }) {
  const [formData, setFormData] = useState({
    author_name: '',
    rating: 5,
    review_text: '',
    profile_photo_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.author_name || !formData.review_text) {
      setMessage({ type: 'error', text: 'Lütfen ad ve yorum alanlarını doldurun.' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      setTimeout(() => {
        setMessage({ type: 'success', text: 'Yorumunuz başarıyla eklendi! Teşekkürler.' });
        setFormData({ author_name: '', rating: 5, review_text: '', profile_photo_url: '' });
        onReviewAdded();
        setIsSubmitting(false);
      }, 2000);
    } catch {
      setMessage({ type: 'error', text: 'Beklenmeyen bir hata oluştu.' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <i className="ri-add-circle-line mr-3 text-green-600"></i>
        Deneyiminizi Paylaşın
      </h2>

      {message && (
        <div className={`p-4 rounded-lg mb-6 flex items-center ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          <i className={`${message.type === 'success' ? 'ri-check-circle-line' : 'ri-error-warning-line'} mr-2`}></i>
          {message.text}
        </div>
      )}

      <form id="review-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adınız *
            </label>
            <input
              type="text"
              required
              name="author_name"
              value={formData.author_name}
              onChange={(e) => setFormData({...formData, author_name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Adınız ve soyadınız"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Puanınız *
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({...formData, rating: star})}
                  className={`text-2xl cursor-pointer transition-colors ${
                    star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-400`}
                >
                  <i className="ri-star-fill"></i>
                </button>
              ))}
              <span className="ml-3 text-gray-600">({formData.rating}/5)</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yorumunuz *
          </label>
          <textarea
            required
            name="review_text"
            value={formData.review_text}
            onChange={(e) => setFormData({...formData, review_text: e.target.value})}
            rows={5}
            maxLength={500}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            placeholder="Deneyiminizi detaylı bir şekilde paylaşın..."
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.review_text.length}/500 karakter
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || formData.review_text.length > 500}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <i className="ri-loader-line animate-spin mr-2"></i>
              Yorum Gönderiliyor...
            </>
          ) : (
            <>
              <i className="ri-send-plane-line mr-2"></i>
              Yorumu Gönder
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// Reviews Display Component
function ReviewsDisplay() {
  const [reviews] = useState<GoogleReview[]>(mockReviews);
  const [restaurant] = useState<RestaurantInfo>(mockRestaurant);
  const [filter, setFilter] = useState<'all' | 5 | 4 | 3 | 2 | 1>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating'>('newest');

  // Filtreleme ve sıralama
  const filteredAndSortedReviews = reviews
    .filter(review => filter === 'all' || review.rating === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.review_date).getTime() - new Date(a.review_date).getTime();
        case 'oldest':
          return new Date(a.review_date).getTime() - new Date(b.review_date).getTime();
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <>
      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-yellow-500">{restaurant?.rating || '4.6'}</div>
            <div className="text-sm text-gray-600">Ortalama Puan</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">{reviews.length}</div>
            <div className="text-sm text-gray-600">Toplam Yorum</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">
              {reviews.filter(r => r.rating === 5).length}
            </div>
            <div className="text-sm text-gray-600">5 Yıldız</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">
              {reviews.filter(r => r.rating >= 4).length}
            </div>
            <div className="text-sm text-gray-600">4+ Yıldız</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">
              {Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Memnuniyet</div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Puan Dağılımı</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = reviews.filter(r => r.rating === rating).length;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center">
                  <span className="text-sm font-medium w-8">{rating}</span>
                  <i className="ri-star-fill text-yellow-400 mr-2"></i>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                filter === 'all' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü ({reviews.length})
            </button>
            {[5, 4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => setFilter(rating as 5 | 4 | 3 | 2 | 1)}
                className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                  filter === rating 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {rating} ⭐ ({reviews.filter(r => r.rating === rating).length})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sırala:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer pr-8"
            >
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
              <option value="rating">Puana Göre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredAndSortedReviews.map((review, index) => (
          <div key={review.id || index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start space-x-4">
              <Image 
                src={review.profile_photo_url}
                alt={review.author_name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-800">{review.author_name}</h4>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`ri-star-${i < review.rating ? "fill" : "line"} ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.relative_time_description}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.review_text}</p>
                <div className="mt-3 text-xs text-gray-500">
                  {new Date(review.review_date).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAndSortedReviews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <i className="ri-emotion-sad-line text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600">Bu filtre için henüz yorum bulunamadı.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default function ReviewsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReviewAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <title>Müşteri Yorumları - Abdullah Usta</title>
      <meta 
        name="description" 
        content="Abdullah Usta müşteri yorumları ve değerlendirmeleri. Gerçek müşteri deneyimlerini okuyun ve yorumunuzu paylaşın." 
      />

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
                  <span className="text-2xl font-bold text-red-600 font-['Pacifico']">
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
                <Link href="/reviews" className="text-red-600 hover:text-red-700 font-medium transition-colors cursor-pointer">
                  Yorumlar
                </Link>
              </nav>
              <div className="flex items-center space-x-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
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
        <div 
          className="relative bg-cover bg-center h-64"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://readdy.ai/api/search-image?query=Happy%20customers%20dining%20at%20Turkish%20restaurant%2C%20people%20enjoying%20food%20and%20smiling%2C%20warm%20atmosphere%2C%20restaurant%20reviews%20and%20testimonials%20background&width=1200&height=300&seq=reviews-hero&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Müşteri Yorumları
              </h1>
              <p className="text-xl mb-6 max-w-2xl mx-auto px-4">
                Gerçek müşteri deneyimleri ve değerlendirmeleri
              </p>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Add Review Form */}
          <Suspense fallback={<div>Form yükleniyor...</div>}>
            <AddReviewForm onReviewAdded={handleReviewAdded} />
          </Suspense>

          {/* Reviews Display */}
          <Suspense fallback={<div>Yorumlar yükleniyor...</div>}>
            <ReviewsDisplay key={refreshKey} />
          </Suspense>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Siz de Deneyiminizi Paylaşın!</h3>
              <p className="text-orange-100 mb-6">
                Abdullah Usta&apos;taki muhteşem lezzetleri tattıktan sonra yorumunuzu bırakmayı unutmayın
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold cursor-pointer"
                >
                  <i className="ri-add-circle-line mr-2"></i>
                  Yorum Ekle
                </button>
                <Link href="/contact" className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-semibold cursor-pointer">
                  <i className="ri-restaurant-line mr-2"></i>
                  Rezervasyon Yap
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-lg border-2 border-black">
                    BK
                  </div>
                  <span className="font-['Pacifico']">
                    Abdullah Usta
                  </span>
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
                    <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      Rezervasyon
                    </a>
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
                      Beyoğlu Caddesi No: 35/A<br />Parseller, Avcılar/İstanbul
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
      </div>
    </>
  );
}