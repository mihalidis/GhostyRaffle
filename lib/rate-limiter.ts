/**
 * Simple in-memory rate limiter.
 * For multi-instance deployments, replace with Upstash Redis or similar.
 *
 * Strategy: sliding window — max N requests per IP within windowMs.
 */

interface Record {
  count: number;
  windowStart: number;
}

const store = new Map<string, Record>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 3;   // max 3 draws per IP per minute

/** Returns true if the IP is allowed, false if rate-limited. */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}

/** Purge stale entries to prevent unbounded memory growth. */
export function purgeExpiredEntries(): void {
  const now = Date.now();
  for (const [ip, entry] of store.entries()) {
    if (now - entry.windowStart > WINDOW_MS) {
      store.delete(ip);
    }
  }
}

// Auto-purge every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(purgeExpiredEntries, 5 * 60_000);
}
