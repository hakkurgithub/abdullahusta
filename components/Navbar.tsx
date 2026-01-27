'use client';

import { useState } from 'react';
import Image from 'next/image';

interface OrderListProps {
  orders: any[];
}

export default function OrderList({ orders }: OrderListProps) {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openDetails = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {orders.length > 0 ? (
            orders.map((order) => (
              <li key={order.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-red-600">Sipariş #{order.id.slice(0, 8)}...</p>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full 
                      ${order.status === 'Teslim Edildi' ? 'bg-green-100 text-green-800' : 
                        order.status === 'İptal' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                    <button 
                      onClick={() => openDetails(order)}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-xs font-bold hover:bg-blue-100 border border-blue-200"
                    >
                      Detay
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {order.paymentMethod === 'Kart' ? '💳 Kredi Kartı' : '💵 Nakit'}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 gap-4">
                    <p>📅 {new Date(order.createdAt).toLocaleDateString('tr-TR')}</p>
                    <p className="font-bold text-gray-900 text-lg">
                       {Number(order.total).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-8 text-center text-gray-500">Henüz siparişiniz bulunmuyor.</li>
          )}
        </ul>
      </div>

      {/* --- DETAY PENCERESİ (MODAL) --- */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Başlık */}
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Sipariş İçeriği</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white text-2xl">✕</button>
            </div>

            {/* İçerik */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {selectedOrder.items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-3 last:border-0">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0 border">
                       {/* Ürün resmi varsa göster yoksa boş kutu */}
                       {item.product?.image && <Image src={item.product.image} alt="ürün" fill className="object-cover" />}
                    </div>
                    <div className="flex-grow">
                      <div className="font-bold text-gray-800">{item.product?.name || 'Ürün Silinmiş'}</div>
                      <div className="text-xs text-gray-500">{item.quantity} Adet x {item.price} ₺</div>
                    </div>
                    <div className="font-bold text-red-600">
                      {(item.quantity * item.price).toLocaleString('tr-TR')} ₺
                    </div>
                  </div>
                ))}
              </div>

              {/* Alt Bilgi */}
              <div className="mt-6 pt-4 border-t bg-gray-50 -mx-6 -mb-6 p-4">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-gray-500">Adres:</span>
                  <span className="font-medium text-gray-900 text-right w-2/3 truncate">{selectedOrder.address}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-gray-900 mt-2">
                  <span>Toplam Tutar</span>
                  <span>{Number(selectedOrder.total).toLocaleString('tr-TR')} ₺</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}