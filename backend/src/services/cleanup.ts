import { db } from '../db/client.js';

export async function cleanupExpiredNotes() {
  try {
    const now = Date.now();
    const result = await db.execute({
      sql: 'DELETE FROM secure_notes WHERE exp_ts < ?',
      args: [now]
    });
    
    if (result.rowsAffected > 0) {
      console.log(`🧹 Cleaned up ${result.rowsAffected} expired notes`);
    }
  } catch (error) {
    console.error('Error cleaning up expired notes:', error);
  }
}

