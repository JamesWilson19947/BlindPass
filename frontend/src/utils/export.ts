/**
 * Export utilities for password managers
 */

export interface PasswordEntry {
  username: string;
  password: string;
  notes: string;
  url?: string;
  title?: string;
}

/**
 * Export to LastPass CSV format
 * Format: url,username,password,extra,name,grouping,fav
 */
export function exportToLastPass(entry: PasswordEntry): string {
  const url = entry.url || '';
  const username = escapeCSV(entry.username);
  const password = escapeCSV(entry.password);
  const extra = escapeCSV(entry.notes);
  const name = escapeCSV(entry.title || 'Shared Password');
  const grouping = '';
  const fav = '0';

  const csv = `url,username,password,extra,name,grouping,fav\n${url},${username},${password},${extra},${name},${grouping},${fav}`;
  
  return csv;
}

/**
 * Export to Bitwarden JSON format
 */
export function exportToBitwarden(entry: PasswordEntry): string {
  const bitwardenEntry = {
    folders: [],
    items: [
      {
        id: generateUUID(),
        organizationId: null,
        folderId: null,
        type: 1, // Login type
        name: entry.title || 'Shared Password',
        notes: entry.notes,
        favorite: false,
        login: {
          username: entry.username,
          password: entry.password,
          totp: null,
          uris: entry.url ? [{ match: null, uri: entry.url }] : []
        },
        collectionIds: null
      }
    ]
  };

  return JSON.stringify(bitwardenEntry, null, 2);
}

/**
 * Export to 1Password 1PIF format
 */
export function exportTo1Password(entry: PasswordEntry): string {
  const onePifEntry = {
    uuid: generateUUID(),
    title: entry.title || 'Shared Password',
    securityLevel: 'SL5',
    contentsHash: '',
    typeName: 'webforms.WebForm',
    secureContents: {
      fields: [
        {
          designation: 'username',
          name: 'username',
          type: 'T',
          value: entry.username
        },
        {
          designation: 'password',
          name: 'password',
          type: 'P',
          value: entry.password
        }
      ],
      notesPlain: entry.notes,
      URLs: entry.url ? [{ url: entry.url }] : []
    },
    createdAt: Date.now() / 1000,
    updatedAt: Date.now() / 1000
  };

  return JSON.stringify(onePifEntry, null, 2);
}

/**
 * Trigger download of exported file
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Escape CSV values
 */
function escapeCSV(value: string): string {
  if (!value) return '';
  
  // If value contains comma, quote, or newline, wrap in quotes and escape quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  
  return value;
}

/**
 * Generate a simple UUID
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

