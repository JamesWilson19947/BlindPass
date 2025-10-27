import { Router } from 'express';
import { cleanupExpiredNotes } from '../services/cleanup.js';

export const cronRouter = Router();

/**
 * Cron endpoint to clean up expired notes
 * This endpoint should be called by Vercel Cron or external cron service
 * Protected by checking the Authorization header with CRON_SECRET
 */
cronRouter.get('/cleanup', async (req, res) => {
  try {
    // Verify the request is from an authorized source
    const authHeader = req.headers.authorization;
    const cronSecret = process.env.CRON_SECRET;

    // If CRON_SECRET is set, verify it matches
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      console.warn('Unauthorized cron attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('Running scheduled cleanup...');
    const deletedCount = await cleanupExpiredNotes();
    
    res.json({ 
      success: true, 
      deletedCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in cron cleanup:', error);
    res.status(500).json({ error: 'Cleanup failed' });
  }
});

