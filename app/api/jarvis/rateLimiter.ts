// Simple in-memory rate limiter for Next.js API routes.
// Note: In serverless environments (like Vercel Edge/Serverless functions),
// this state may be reset frequently. For strict rate limiting, consider Upstash/Redis.

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT = 5; // Allow 5 requests
const WINDOW_MS = 60 * 1000; // per minute

export function checkRateLimit(ip: string): { success: boolean; limit: number; remaining: number } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  // Cleanup old entries periodically (10% chance on request)
  if (Math.random() < 0.1) {
    for (const [key, data] of rateLimitMap.entries()) {
      if (data.lastReset < windowStart) {
        rateLimitMap.delete(key);
      }
    }
  }

  let record = rateLimitMap.get(ip);
  if (!record || record.lastReset < windowStart) {
    record = { count: 0, lastReset: now };
  }

  record.count += 1;
  rateLimitMap.set(ip, record);

  const success = record.count <= RATE_LIMIT;
  const remaining = Math.max(0, RATE_LIMIT - record.count);

  return { success, limit: RATE_LIMIT, remaining };
}
