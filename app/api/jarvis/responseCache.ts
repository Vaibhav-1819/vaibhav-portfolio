import crypto from 'crypto';

interface CacheEntry {
  response: string;
  timestamp: number;
}

const responseCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

function getCacheKey(query: string) {
  // Simple hash for the query
  return crypto.createHash('sha256').update(query.toLowerCase().trim()).digest('hex');
}

export function getCachedResponse(query: string): string | null {
  const key = getCacheKey(query);
  const entry = responseCache.get(key);
  
  if (entry && Date.now() - entry.timestamp < CACHE_TTL_MS) {
    return entry.response;
  }
  return null;
}

export function setCachedResponse(query: string, response: string) {
  const key = getCacheKey(query);
  responseCache.set(key, { response, timestamp: Date.now() });
  
  // Cleanup occasionally to prevent memory leak
  if (responseCache.size > 1000) {
    const now = Date.now();
    for (const [k, v] of responseCache.entries()) {
      if (now - v.timestamp > CACHE_TTL_MS) {
        responseCache.delete(k);
      }
    }
  }
}
