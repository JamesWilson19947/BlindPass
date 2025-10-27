import { db } from '../db/client.js';

export async function cleanupExpiredNotes(): Promise<number> {
  try {
    const now = Date.now();
    const result = await db.execute({
      sql: 'DELETE FROM secure_notes WHERE exp_ts < ?',
      args: [now]
    });
    
    const deletedCount = result.rowsAffected;
    if (deletedCount > 0) {
      console.log(`🧹 Cleaned up ${deletedCount} expired notes`);
    }
    
    return deletedCount;
  } catch (error) {
    console.error('Error cleaning up expired notes:', error);
    return 0;
  }
}

