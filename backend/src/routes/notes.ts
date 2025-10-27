import { Router } from 'express';
import { nanoid } from 'nanoid';
import { db } from '../db/client.js';

export const notesRouter = Router();

// Create a new encrypted note
notesRouter.post('/', async (req, res) => {
  try {
    const {
      encryptedContent,
      contentType = 'password',
      hasPassword = false,
      expiryMinutes = 60,
      oneTime = true
    } = req.body;

    // Validation
    if (!encryptedContent || typeof encryptedContent !== 'string') {
      return res.status(400).json({ error: 'Invalid encrypted content' });
    }

    if (encryptedContent.length > 10 * 1024 * 1024) { // 10MB limit
      return res.status(400).json({ error: 'Content too large' });
    }

    // Generate unique ID
    const noteId = nanoid(21);
    const now = Date.now();
    const expiresAt = now + (expiryMinutes * 60 * 1000);

    // Store in database
    await db.execute({
      sql: `INSERT INTO secure_notes 
            (id, encrypted_content, content_type, has_password, exp_ts, one_time, created_at, viewed)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        noteId,
        encryptedContent,
        contentType,
        hasPassword ? 1 : 0,
        expiresAt,
        oneTime ? 1 : 0,
        now,
        0
      ]
    });

    res.json({
      noteId,
      expiresAt
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Retrieve an encrypted note
notesRouter.get('/:noteId', async (req, res) => {
  try {
    const { noteId } = req.params;

    if (!noteId || typeof noteId !== 'string') {
      return res.status(400).json({ error: 'Invalid note ID' });
    }

    // Fetch note from database
    const result = await db.execute({
      sql: 'SELECT * FROM secure_notes WHERE id = ?',
      args: [noteId]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found or expired' });
    }

    const note = result.rows[0];

    // Check if expired
    const expiryTimestamp = note.exp_ts ? Number(note.exp_ts) : 0;
    if (expiryTimestamp < Date.now()) {
      // Delete expired note
      await db.execute({
        sql: 'DELETE FROM secure_notes WHERE id = ?',
        args: [noteId]
      });
      return res.status(404).json({ error: 'Note has expired' });
    }

    // Check if already viewed (for one-time notes)
    if (note.one_time && note.viewed) {
      return res.status(404).json({ error: 'Note has already been viewed' });
    }

    // Mark as viewed and delete if one-time
    if (note.one_time) {
      await db.execute({
        sql: 'DELETE FROM secure_notes WHERE id = ?',
        args: [noteId]
      });
    } else {
      await db.execute({
        sql: 'UPDATE secure_notes SET viewed = viewed + 1 WHERE id = ?',
        args: [noteId]
      });
    }

    res.json({
      encryptedContent: note.encrypted_content,
      contentType: note.content_type,
      hasPassword: Boolean(note.has_password),
      expiresAt: note.exp_ts
    });
  } catch (error) {
    console.error('Error retrieving note:', error);
    res.status(500).json({ error: 'Failed to retrieve note' });
  }
});

// Check if a note exists (without retrieving it)
notesRouter.head('/:noteId', async (req, res) => {
  try {
    const { noteId } = req.params;

    const result = await db.execute({
      sql: 'SELECT id, exp_ts, has_password FROM secure_notes WHERE id = ?',
      args: [noteId]
    });

    if (result.rows.length === 0) {
      return res.status(404).end();
    }

    const note = result.rows[0];

    // Check if expired
    const expiryTimestamp = note.exp_ts ? Number(note.exp_ts) : 0;
    if (expiryTimestamp < Date.now()) {
      await db.execute({
        sql: 'DELETE FROM secure_notes WHERE id = ?',
        args: [noteId]
      });
      return res.status(404).end();
    }

    res.status(200).end();
  } catch (error) {
    console.error('Error checking note:', error);
    res.status(500).end();
  }
});

