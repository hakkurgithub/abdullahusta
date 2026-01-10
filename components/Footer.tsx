'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* 1. Bolum: Marka ve Aciklama */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-red-600">
              {process.env.NEXT_PUBLIC_RESTAURANT_NAME || 'Abdullah Usta'}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Geleneksel lezzetleri modern sunumla buluşturuyoruz. 
              Kebap, pide ve ızgara çeşitlerimizle hizmetinizdeyiz.
            </p>
          </div>

          {/* 2. Bolum: Hizli Linkler */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold border-b border-gray-800 pb-2 inline-block">Hızlı Erişim</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-red-500 transition-colors flex items-center gap-2"><span>›</span> Ana Sayfa</a></li>
              <li><a href="/menu" className="hover:text-red-500 transition-colors flex items-center gap-2"><span>›</span> Menü</a></li>
              <li><a href="/contact" className="hover:text-red-500 transition-colors flex items-center gap-2"><span>›</span> İletişim</a></li>
            </ul>
          </div>

          {/* 3. Bolum: Iletisim ve Harita (GUNCELLENEN KISIM) */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold border-b border-gray-800 pb-2 inline-block">İletişim</h4>
            
            {/* Adres */}
            <div className="flex items-start gap-3 text-gray-400">
              <span className="text-xl mt-1">📍</span>
              <p className="text-sm">{process.env.NEXT_PUBLIC_ADDRESS}</p>
            </div>

            {/* --- YENI EKLENEN HARITA BUTONU --- */}
            <div className="pl-8">
              <a 
                href={process.env.NEXT_PUBLIC_MAPS_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold transition-all transform hover:scale-105"
              >
                <span>🗺️</span>
                <span>Haritada Yol Tarifi Al</span>
              </a>
            </div>

            {/* Telefon */}
            <div className="flex items-center gap-3 text-gray-400 mt-4">
              <span className="text-xl">📞</span>
              <div className="flex flex-col">
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="hover:text-white transition-colors text-sm">
                  {process.env.NEXT_PUBLIC_PHONE_NUMBER}
                </a>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} target="_blank" className="hover:text-green-400 transition-colors text-sm">
                  WhatsApp: 0544 202 42 44
                </a>
              </div>
            </div>

            {/* E-posta */}
             <div className="flex items-center gap-3 text-gray-400">
              <span className="text-xl">✉️</span>
              <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className="hover:text-white transition-colors text-sm break-all">
                {process.env.NEXT_PUBLIC_EMAIL}
              </a>
            </div>
          </div>

        </div>
        
        {/* Alt Telif Hakki Kismi */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_RESTAURANT_NAME}. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
