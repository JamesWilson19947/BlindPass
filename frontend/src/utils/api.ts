/**
 * API client for communicating with the backend
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export interface CreateNoteRequest {
  encryptedContent: string;
  contentType?: string;
  hasPassword?: boolean;
  expiryMinutes?: number;
  oneTime?: boolean;
}

export interface CreateNoteResponse {
  noteId: string;
  expiresAt: number;
}

export interface GetNoteResponse {
  encryptedContent: string;
  contentType: string;
  hasPassword: boolean;
  oneTime: boolean;
  expiresAt: number;
}

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Create a new encrypted note
 */
export async function createNote(
  data: CreateNoteRequest
): Promise<CreateNoteResponse> {
  const response = await fetch(`${API_BASE}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(response.status, error.error || 'Failed to create note');
  }

  return response.json();
}

/**
 * Retrieve an encrypted note
 */
export async function getNote(noteId: string): Promise<GetNoteResponse> {
  const response = await fetch(`${API_BASE}/notes/${noteId}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(response.status, error.error || 'Failed to retrieve note');
  }

  return response.json();
}

/**
 * Check if a note exists
 */
export async function checkNote(noteId: string): Promise<boolean> {
  const response = await fetch(`${API_BASE}/notes/${noteId}`, {
    method: 'HEAD',
  });

  return response.ok;
}

