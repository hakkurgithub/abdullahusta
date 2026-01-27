import { jwtVerify } from 'jose';

export async function verifyAuth(token: string | undefined) {
  if (!token) return null;

  try {
    // Gizli anahtarı al (.env dosyasından veya varsayılan)
    const secretKey = process.env.JWT_SECRET || 'gizli-anahtar-123';
    const key = new TextEncoder().encode(secretKey);

    // Token'ı doğrula
    const { payload } = await jwtVerify(token, key);
    
    return payload; // { email: '...', ... } döner
  } catch (error) {
    return null; // Token geçersizse veya süresi dolmuşsa null döner
  }
}