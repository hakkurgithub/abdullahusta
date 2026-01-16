import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "gizli-anahtar";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Kullanıcı bulunamadı." },
        { status: 401 }
      );
    }

    // 2. Şifreyi kontrol et
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Hatalı şifre!" },
        { status: 401 }
      );
    }

    // 3. Güvenli Token oluştur (Kimlik Kartı)
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({ 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h") // 24 saat geçerli
      .sign(secret);

    // 4. Token'ı çereze (cookie) kaydet
    const cookieStore = await cookies();
    
    cookieStore.set("auth_token", token, {
      httpOnly: true, // JavaScript ile erişilemez (Güvenlik)
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 gün (saniye cinsinden)
      path: "/",
    });

    // Başarılı yanıt (Rol bilgisini de dönüyoruz ki yönlendirme yapabilelim)
    return NextResponse.json({ 
      message: "Giriş başarılı!", 
      role: user.role 
    });

  } catch (error) {
    console.error("Login hatası:", error);
    return NextResponse.json(
      { message: "Bir hata oluştu." },
      { status: 500 }
    );
  }
}
