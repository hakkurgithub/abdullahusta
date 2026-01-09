'use client';

import { useState } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewsPage() {
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      name: "Ahmet Yılmaz",
      rating: 5,
      comment: "Adana kebap efsane, mutlaka denemelisiniz. Hizmet de çok hızlıydı.",
      date: "12 Ocak 2024"
    },
    {
      id: 2,
      name: "Ayşe Demir",
      rating: 5,
      comment: "Pideleri çok taze ve malzemesi bol. Ailecek sürekli buradayız.",
      date: "5 Ocak 2024"
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      rating: 4,
      comment: "Lezzet harika ama haftasonu biraz kalabalık olabiliyor. Rezervasyon şart.",
      date: "28 Aralık 2023"
    },
    {
      id: 4,
      name: "Zeynep Can",
      rating: 5,
      comment: "Künefesi tam kıvamında, Abdullah Usta işini gerçekten iyi yapıyor.",
      date: "15 Aralık 2023"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-red-700 py-16 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Müşteri Yorumları</h1>
        <div className="w-20 h-1 bg-white mx-auto mb-4"></div>
        <p className="text-red-100 max-w-xl mx-auto px-4 text-lg">
          Misafirlerimizin deneyimleri bizim en büyük motivasyon kaynağımız.
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Özet Puan */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-12 flex flex-col md:flex-row items-center justify-around border border-gray-100">
          <div className="text-center mb-6 md:mb-0">
            <h2 className="text-6xl font-black text-gray-800">4.9</h2>
            <div className="flex text-yellow-400 text-2xl mb-2">
              {[...Array(5)].map((_, i) => <i key={i} className="ri-star-fill"></i>)}
            </div>
            <p className="text-gray-500 font-medium">Genel Puanlama</p>
          </div>
          <div className="space-y-2 w-full max-w-xs">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm font-bold w-4">{star}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400" 
                    style={{ width: star === 5 ? '90%' : star === 4 ? '10%' : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yorum Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{review.name}</h3>
                  <span className="text-gray-400 text-sm">{review.date}</span>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`ri-star-${i < review.rating ? 'fill' : 'line'}`}></i>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>

        {/* Yorum Yap CTA */}
        <div className="mt-20 text-center bg-gray-900 text-white p-12 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Deneyiminizi Paylaşın</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Siz de lezzetlerimiz ve servisimiz hakkındaki düşüncelerinizi Google üzerinden paylaşarak bize destek olabilirsiniz.
          </p>
          <a 
            href="https://www.google.com/search?q=abdullah+usta+parseller" 
            target="_blank" 
            className="inline-block bg-red-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-900"
          >
            Google'da Yorum Yap
          </a>
        </div>
      </main>
    </div>
  );
}