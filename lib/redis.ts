import { createClient } from "redis";

declare global {
  // eslint-disable-next-line no-var
  var _redisClient: ReturnType<typeof createClient> | undefined;
}

function getClient() {
  if (globalThis._redisClient) return globalThis._redisClient;

  const url = process.env.REDIS_URL;
  if (!url) throw new Error("REDIS_URL environment variable is not set");

  const client = createClient({
    url,
    socket: {
      reconnectStrategy: (retries) => Math.min(retries * 100, 3_000),
    },
  });

  client.on("error", (err) => console.error("[redis] Client error:", err));
  client.on("connect", () => console.log("[redis] Connected"));
  client.on("reconnecting", () => console.warn("[redis] Reconnecting…"));

  if (process.env.NODE_ENV !== "production") {
    globalThis._redisClient = client;
  }

  return client;
}

async function ensureConnected() {
  const client = getClient();
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
}

/** Cache a JSON value with a TTL in seconds (default 5 min) */
export async function setCache<T>(key: string, value: T, ttlSeconds = 300) {
  const redis = await ensureConnected();
  await redis.set(key, JSON.stringify(value), { EX: ttlSeconds });
}

/** Get a cached JSON value, or null if missing / expired */
export async function getCache<T>(key: string): Promise<T | null> {
  const redis = await ensureConnected();
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
  const redis = await ensureConnected();
  if (keys.length) await redis.del(keys);
}
