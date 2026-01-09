'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  // Doğru Google Maps Bağlantısı (Place ID ile sabitlendi)
  const mapLink = "https://www.google.com/maps/place/?q=place_id:ChIJJWhsEXqhyhQRDGKx44DnLiI";

  return (
    <footer className="bg-[#0a0a0a] text-[#ccc] pt-10 pb-4 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-[1200px]">
        {/* Sütun-1 : Marka */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Abdullah Usta</h3>
          <p className="text-sm leading-relaxed">Lezzetin adresi, 40 yıllık tecrübeyle Avcılar'da hizmetinizdeyiz.</p>
        </div>

        {/* Sütun-2 : İletişim */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">İletişim</h4>
          <div className="flex flex-col gap-2">
            <a href="tel:02128120244" className="text-[#ccc] no-underline hover:text-white hover:underline leading-7">
              📞 0212 812 02 44
            </a>
            <a 
              href="https://wa.me/905442024244"
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#ccc] no-underline hover:text-white hover:underline leading-7"
            >
              💬 WhatsApp: 0544 202 42 44
            </a>
            <a 
              href="mailto:burakkeskin4244@gmail.com"
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#ccc] no-underline hover:text-white hover:underline leading-7"
            >
              ✉️ burakkeskin4244@gmail.com
            </a>
            <a 
              href={mapLink}
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#ccc] no-underline hover:text-white hover:underline leading-7"
            >
              📍 Avcılar Üniversite Mah. Mareşal Cad. No:22 <br/>
              (Kanatçı Abdullah Usta Parseller)
            </a>
            <a 
              href={mapLink}
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block mt-2 bg-[#222] text-white px-3 py-1.5 rounded no-underline text-center text-sm w-fit hover:bg-red-600 transition-all cursor-pointer"
            >
              Haritada Gör
            </a>
          </div>
        </div>

        {/* Sütun-3 : Kısa Navigasyon */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Hızlı Erişim</h4>
          <ul className="list-none p-0 flex flex-col gap-2">
            <li><Link href="/" className="text-[#ccc] no-underline hover:text-white transition-colors">Ana Sayfa</Link></li>
            <li><Link href="/menu" className="text-[#ccc] no-underline hover:text-white transition-colors">Menü</Link></li>
            <li><Link href="/about" className="text-[#ccc] no-underline hover:text-white transition-colors">Hakkımızda</Link></li>
            <li><Link href="/contact" className="text-[#ccc] no-underline hover:text-white transition-colors">İletişim</Link></li>
            <li><Link href="/reservation" className="text-[#ccc] no-underline hover:text-white transition-colors">Rezervasyon</Link></li>
          </ul>
        </div>
      </div>

      {/* ALT ÇİZGİ */}
      <div className="text-center mt-8 pt-4 border-t border-[#222] text-xs">
        <p>© {currentYear} Abdullah Usta. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}