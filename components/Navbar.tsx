"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

export default function Navbar() {
  const { getTotalItems } = useCart();
  const [itemCount, setItemCount] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const count = getTotalItems();
    if (count !== itemCount) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
      setItemCount(count);
    }
  }, [getTotalItems, itemCount]); // ✅ Uyarı çözüldü

  const phoneNumber = "905333715577";
  const whatsappMessage = encodeURIComponent("Merhaba, sipariş vermek istiyorum.");

  return (
    <nav className="bg-red-700 text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition"
        >
          Abdullah Usta
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <NavLink href="/" label="Ana Sayfa" active={pathname === "/"} />
          <NavLink href="/menu" label="Menü" active={pathname === "/menu"} />
          <NavLink href="/about" label="Hakkımızda" active={pathname === "/about"} />
          <NavLink href="/contact" label="İletişim" active={pathname === "/contact"} />

          {/* 🛒 Sepetim */}
          <Link
            href="/cart"
            className={`relative bg-yellow-400 text-red-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition ${
              animate ? "scale-110 transition-transform" : ""
            }`}
          >
            🛒 Sepetim
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobil Menü */}
      {menuOpen && (
        <div className="md:hidden bg-red-800 text-white px-4 py-4 space-y-4 pb-20">
          <MobileLink href="/" label="Ana Sayfa" setMenuOpen={setMenuOpen} />
          <MobileLink href="/menu" label="Menü" setMenuOpen={setMenuOpen} />
          <MobileLink href="/about" label="Hakkımızda" setMenuOpen={setMenuOpen} />
          <MobileLink href="/contact" label="İletişim" setMenuOpen={setMenuOpen} />

          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className={`relative bg-yellow-400 text-red-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition block text-center ${
              animate ? "scale-110 transition-transform" : ""
            }`}
          >
            🛒 Sepetim
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      )}

      {/* 📞 ve 💬 Mobil Sabit Butonlar */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center space-x-4 md:hidden z-50">
        <a
          href={`tel:${phoneNumber}`}
          className="bg-green-600 text-white flex items-center gap-2 px-5 py-3 rounded-full shadow-lg hover:bg-green-500 transition"
        >
          <Phone size={18} /> Ara
        </a>

        <a
          href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 text-white flex items-center gap-2 px-5 py-3 rounded-full shadow-lg hover:bg-emerald-400 transition"
        >
          <MessageCircle size={18} /> WhatsApp
        </a>
      </div>
    </nav>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`hover:text-yellow-300 transition ${
        active ? "text-yellow-300 font-semibold" : ""
      }`}
    >
      {label}
    </Link>
  );
}

function MobileLink({
  href,
  label,
  setMenuOpen,
}: {
  href: string;
  label: string;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <Link
      href={href}
      onClick={() => setMenuOpen(false)}
      className="block hover:text-yellow-300 transition"
    >
      {label}
    </Link>
  );
}
