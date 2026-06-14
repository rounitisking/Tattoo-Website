import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@inkrise.com';
  const adminHash = process.env.ADMIN_PASSWORD_HASH || '$2b$12$Eu2hLLcRGEhyKDutxJ7J9OluUPYauBho35uziZ8cCWCEQM8o8mEJi';

  if (!adminEmail || !adminHash) {
    return Response.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const emailMatch = email === adminEmail;
  const passwordMatch = await bcrypt.compare(password, adminHash);

  if (!emailMatch || !passwordMatch) {
    // Deliberate 400ms delay to slow brute-force attempts
    await new Promise((r) => setTimeout(r, 400));
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = signToken({ email, role: 'admin' });
  return Response.json({ token });
}
