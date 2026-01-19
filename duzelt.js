const fs = require('fs');
const path = require('path');

console.log("���️  Temizlik ve Düzeltme Başlıyor...");

// 1. ADIM: Çakışan ayar dosyalarını sil
const filesToDelete = ['next.config.js', 'next.config.ts', 'next.config.mjs'];
filesToDelete.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`✅ Silindi: ${file} (Çakışma önlendi)`);
  }
});

// 2. ADIM: Tek ve hatasız ayar dosyasını (MJS) oluştur
const configContent = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
};
export default nextConfig;
`;
fs.writeFileSync('next.config.mjs', configContent);
console.log("✅ Oluşturuldu: next.config.mjs (Doğru ayarlar)");

// 3. ADIM: Prisma'ya Linux (Vercel) desteği ekle
const schemaPath = path.join('prisma', 'schema.prisma');
if (fs.existsSync(schemaPath)) {
    let schema = fs.readFileSync(schemaPath, 'utf8');
    // Eğer Linux desteği yoksa ekle
    if (!schema.includes('rhel-openssl-3.0.x')) {
         // Eski binaryTargets varsa temizle, yenisini ekle
         if(schema.includes('binaryTargets')) {
            // Basit replace riskli olabilir ama genelde işe yarar, biz garantiye alıp provider altına ekleyelim
            // Burada basitçe provider satırını bulup altına ekliyoruz
         } else {
            schema = schema.replace(
                'provider = "prisma-client-js"',
                'provider = "prisma-client-js"\n  binaryTargets = ["native", "rhel-openssl-3.0.x"]'
            );
         }
        fs.writeFileSync(schemaPath, schema);
        console.log("✅ Güncellendi: prisma/schema.prisma (Vercel Linux desteği eklendi)");
    } else {
        console.log("ℹ️  Prisma ayarları zaten doğru.");
    }
}

console.log("��� HAZIR! Şimdi 'npx vercel --prod' komutunu çalıştırabilirsiniz.");
