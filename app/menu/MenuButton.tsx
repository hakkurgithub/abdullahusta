'use client';

import { useCart } from '@/components/CartProvider';

// Ürünün "Kimlik Kartını" (Tipini) tanımlıyoruz
type Product = {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  // Başka alanlar varsa buraya ekleyebilirsin ama şimdilik bunlar yeterli
};

// product prop'unun tipini belirtiyoruz: { product: Product }
export default function MenuButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || "" // Resim null ise boş string gönder
    });
    alert(product.name + ' sepete eklendi!');
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-bold mt-auto"
    >
      Sepete Ekle
    </button>
  );
}