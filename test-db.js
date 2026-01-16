const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log("⏳ Veritabanına bağlanılıyor...");
  try {
    // Basit bir sorgu yapalım
    const userCount = await prisma.user.count();
    console.log("✅ BAŞARILI! Bağlantı sağlandı.");
    console.log(`��� Mevcut kullanıcı sayısı: ${userCount}`);
  } catch (error) {
    console.error("❌ HATA: Veritabanına bağlanılamadı!");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
