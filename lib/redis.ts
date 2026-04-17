import { createClient } from "redis";

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL environment variable is not set");
}

declare global {
  // eslint-disable-next-line no-var
  var _redisClient: ReturnType<typeof createClient> | undefined;
}

const redis =
  globalThis._redisClient ??
  createClient({
    url: process.env.REDIS_URL,
    socket: {
      reconnectStrategy: (retries) => Math.min(retries * 100, 3_000),
    },
  });

redis.on("error", (err) => console.error("[redis] Client error:", err));
redis.on("connect", () => console.log("[redis] Connected"));
redis.on("reconnecting", () => console.warn("[redis] Reconnecting…"));

if (!redis.isOpen) {
  redis.connect().catch((err) => console.error("[redis] Initial connect failed:", err));
}

if (process.env.NODE_ENV !== "production") {
  globalThis._redisClient = redis;
}

export default redis;

// ── Typed helpers ────────────────────────────────────────────────

/** Cache a JSON value with a TTL in seconds (default 5 min) */
export async function setCache<T>(key: string, value: T, ttlSeconds = 300) {
  await redis.set(key, JSON.stringify(value), { EX: ttlSeconds });
}

/** Get a cached JSON value, or null if missing / expired */
export async function getCache<T>(key: string): Promise<T | null> {
  const raw = await redis.get(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** Delete one or more cache keys */
export async function invalidate(...keys: string[]) {
  if (keys.length) await redis.del(keys);
}
