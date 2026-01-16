import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Yeni güvenli bağlantıyı kullanıyoruz
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone } = body;

    console.log("Kayıt isteği geldi:", email); // Terminalde bunu görmeliyiz

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Lütfen tüm alanları doldurun." },
        { status: 400 }
      );
    }

    // Veritabanı bağlantısını test edelim
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Bu e-posta adresi zaten kullanılıyor." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: "USER",
      },
    });

    console.log("Kullanıcı oluşturuldu:", user.id);

    return NextResponse.json(
      { message: "Kayıt başarılı!", userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    // BURASI ÇOK ÖNEMLİ: Hatayı terminale yazdırıyoruz
    console.error("DETAYLI KAYIT HATASI:", error);
    
    return NextResponse.json(
      { message: "Sunucu hatası: " + (error.message || "Bilinmeyen hata") },
      { status: 500 }
    );
  }
}
