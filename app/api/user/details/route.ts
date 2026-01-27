import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuth } from '@/lib/auth'; // Artık bu dosya var, hata vermez.
import { prisma } from '@/lib/prisma';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  const verifiedUser = await verifyAuth(token);
  
  if (!verifiedUser || typeof verifiedUser.email !== 'string') {
    return NextResponse.json({ error: 'Giriş yapılmamış' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: verifiedUser.email },
      select: { phone: true, address: true, name: true } 
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Veri hatası' }, { status: 500 });
  }
}