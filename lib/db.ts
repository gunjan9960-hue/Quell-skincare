import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Reuse the pool across hot-reloads in development
declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

const pool: Pool =
  globalThis._pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,               // max connections in pool
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis._pgPool = pool;
}

export default pool;

// Convenience wrapper — auto-releases the client back to the pool
export async function query<T extends object = Record<string, unknown>>(
  text: string,
  params?: unknown[]
) {
  const start = Date.now();
  const result = await pool.query<T>(text, params);
  if (process.env.NODE_ENV === "development") {
    console.log(`[db] ${text.slice(0, 80)} — ${Date.now() - start}ms`);
  }
  return result;
}
