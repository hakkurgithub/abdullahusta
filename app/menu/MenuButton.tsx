'use client';

import { useCart } from '@/components/CartProvider';

export default function MenuButton({ product }: { product: any }) {
  // HATA BURADAYDI: addItem yerine addToCart kullanmalıyız.
  const { addToCart } = useCart(); 

  const handleAddToCart = () => {
    // DÜZELTME: Fonksiyon ismini doğrusuyla değiştirdik
    addToCart(product); 
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-red-100"
    >
      <span>Sepete Ekle</span>
      <i className="ri-shopping-basket-2-fill"></i>
    </button>
  );
}