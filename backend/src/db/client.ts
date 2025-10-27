import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize database schema
export async function initDatabase() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS secure_notes (
      id TEXT PRIMARY KEY,
      encrypted_content TEXT NOT NULL,
      content_type TEXT NOT NULL DEFAULT 'password',
      has_password INTEGER NOT NULL DEFAULT 0,
      exp_ts INTEGER NOT NULL,
      one_time INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL,
      viewed INTEGER NOT NULL DEFAULT 0
    )
  `);

  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_notes_exp_ts ON secure_notes(exp_ts)
  `);

  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_notes_viewed ON secure_notes(viewed)
  `);

  console.log('✅ Database initialized');
}

