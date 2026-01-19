import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      
      {/* KAPAK FOTOĞRAFI */}
      <div className="relative h-[50vh] w-full bg-black flex items-center justify-center overflow-hidden">
        <Image
          src="https://raw.githubusercontent.com/hakkurgithub/images/main/abdullah-usta- oncu.jpg"
          alt="Abdullah Usta Mekan"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 text-center text-white px-4 drop-shadow-xl">
          <h1 className="text-5xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-xl font-light tracking-wider">Geleneksel Lezzet, Modern Sunum</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        
        {/* LOGO (Ortada Yuvarlak) */}
        <div className="flex justify-center -mt-28 relative z-20">
           <div className="bg-white p-2 rounded-full shadow-2xl">
             <Image
               src="https://raw.githubusercontent.com/hakkurgithub/images/main/abdullah-usta-logo.jpg"
               alt="Abdullah Usta Logo"
               width={180}
               height={180}
               className="rounded-full"
             />
           </div>
        </div>

        {/* METİN */}
        <section className="text-center pt-6">
          <h2 className="text-3xl font-bold text-red-600 mb-6">Ustalığın ve Lezzetin Adresi</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Abdullah Usta olarak, Hatay mutfağının o eşsiz baharatlarını ve el lezzetini İstanbul'a taşıdık. 
            Kebaplarımız zırhla çekilir, pidelerimiz taş fırında odun ateşiyle pişer. 
            Bizim için yemek sadece doymak değil, bir kültür ve keyif işidir.
          </p>
        </section>

        {/* İSTATİSTİKLER */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-b border-gray-100 py-8">
           <div>
             <div className="text-3xl font-bold text-red-600">40+</div>
             <div className="text-gray-500 text-sm">Yıllık Tecrübe</div>
           </div>
           <div>
             <div className="text-3xl font-bold text-red-600">88+</div>
             <div className="text-gray-500 text-sm">Çeşit Menü</div>
           </div>
           <div>
             <div className="text-3xl font-bold text-red-600">%100</div>
             <div className="text-gray-500 text-sm">Doğal Malzeme</div>
           </div>
           <div>
             <div className="text-3xl font-bold text-red-600">7/24</div>
             <div className="text-gray-500 text-sm">Hizmet</div>
           </div>
        </div>
      </div>
    </div>
  );
}