import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'inkrise-fallback-secret';

export interface JWTPayload {
  email: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

/** Sign a JWT token (expires in 24h) */
export function signToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

/** Verify a JWT token — returns payload or null */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

/** Extract and verify the Bearer token from a request — returns payload or null */
export function getAuthPayload(req: NextRequest): JWTPayload | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  return verifyToken(token);
}

/** Require auth on an API route — returns null if authorized, or a 401 Response */
export function requireAuth(req: NextRequest): Response | null {
  const payload = getAuthPayload(req);
  if (!payload) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
