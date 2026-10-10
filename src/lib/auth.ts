import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";

const JWT_SECRET_STRING = process.env.JWT_SECRET || "pesantren-ppdb-secret-key-super-secure-change-in-production-2026";
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET_STRING);
const COOKIE_NAME = "pesantren_session";
const SESSION_DURATION = 7 * 24 * 60 * 60; // 7 days in seconds

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  [key: string]: unknown;
}

/**
 * Hash plain password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Compare plain password with stored hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate encrypted JWT session token
 */
export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(SECRET_KEY);
}

/**
 * Verify JWT session token
 */
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Set HTTP-Only session cookie
 */
export async function setSessionCookie(payload: SessionPayload): Promise<string> {
  const token = await createSessionToken(payload);
  const cookieStore = await cookies();
  
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });

  return token;
}

/**
 * Delete session cookie
 */
export async function removeSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Get current authenticated user from session
 */
export async function getCurrentUser(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = await verifySessionToken(token);
    if (!payload?.userId) return null;

    // Verify user is still active in database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, role: true, isActive: true },
    });

    if (!user || !user.isActive) {
      return null;
    }

    return {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch {
    return null;
  }
}
