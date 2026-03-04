/**
 * In-memory sliding window rate limiter.
 * No external dependencies — works perfectly for local/college use.
 *
 * Usage in API routes:
 *   const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
 *   const { success } = rateLimit(ip, { limit: 5, windowMs: 60_000 });
 *   if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
 */

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
    /** Maximum requests allowed within windowMs */
    limit: number;
    /** Window duration in milliseconds */
    windowMs: number;
}

export function rateLimit(
    key: string,
    { limit, windowMs }: RateLimitOptions
): { success: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const entry = store.get(key);

    if (!entry || now > entry.resetAt) {
        // Fresh window
        store.set(key, { count: 1, resetAt: now + windowMs });
        return { success: true, remaining: limit - 1, resetAt: now + windowMs };
    }

    if (entry.count >= limit) {
        return { success: false, remaining: 0, resetAt: entry.resetAt };
    }

    entry.count += 1;
    return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

// Auto-cleanup stale keys every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
    setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of store.entries()) {
            if (now > entry.resetAt) store.delete(key);
        }
    }, 5 * 60 * 1000);
}
