"use client";

import React from "react";

export default function OrderChannelDropdown() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "905442024244";
    const message = encodeURIComponent("Merhaba Abdullah Usta, menü hakkında bilgi almak istiyorum.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={handleWhatsAppClick}
        className="bg-[#25D366] text-white px-5 py-2.5 rounded-xl hover:bg-[#1ebe57] transition-all font-bold cursor-pointer shadow-lg shadow-green-100 flex items-center gap-2 active:scale-95"
      >
        <i className="ri-whatsapp-line text-xl"></i>
        WhatsApp Sipariş
      </button>
    </div>
  );
}