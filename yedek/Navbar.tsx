'use client';

import Link from 'next/link';
import { useCart } from './CartProvider'; // Sepet context'inizin yolu

export default function Navbar() {
  const { getTotalItems } = useCart();

  return (
    <header className="bg-[#111] text-white py-3 sticky top-0 z-[1000] shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 max-w-[1200px]">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-white no-underline">
          AU
        </Link>

        {/* ANA NAVİGASYON */}
        <nav className="hidden md:block" aria-label="Ana Navigasyon">
          <ul className="flex gap-5 list-none m-0 p-0">
            <li><Link href="/" className="text-white no-underline font-medium hover:text-red-500 transition-colors">Ana Sayfa</Link></li>
            <li><Link href="/menu" className="text-white no-underline font-medium hover:text-red-500 transition-colors">Menü</Link></li>
            <li><Link href="/about" className="text-white no-underline font-medium hover:text-red-500 transition-colors">Hakkımızda</Link></li>
            <li><Link href="/contact" className="text-white no-underline font-medium hover:text-red-500 transition-colors">İletişim</Link></li>
            <li><Link href="/reservation" className="text-white no-underline font-medium hover:text-red-500 transition-colors">Rezervasyon</Link></li>
            <li>
              <Link href="/cart" className="inline-flex items-center gap-1 text-white no-underline font-medium hover:text-red-500 transition-colors">
                🛒 Sepetim <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{getTotalItems()}</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* WHATSAPP CTA */}
        <a 
          href="https://wa.me/905442024244?text=Merhaba,%20sipariş%20vermek%20istiyorum."
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-[#25d366] text-white px-4 py-2 rounded font-semibold no-underline hover:bg-[#1ebe57] transition-all hidden sm:block"
        >
          WhatsApp’tan Sipariş Ver
        </a>
      </div>
    </header>
  );
}