/**
 * Zero-Knowledge Encryption Utilities
 * All encryption/decryption happens client-side
 */

// Base64URL encoding/decoding utilities
export function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function base64UrlToArrayBuffer(base64url: string): ArrayBuffer {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(base64 + padding);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Generate a random base key for encryption
 */
export function generateBaseKey(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(32)); // 256 bits for AES-256
}

/**
 * Derive master key from base key and optional password
 */
export async function deriveMasterKey(
  baseKey: Uint8Array,
  password?: string
): Promise<CryptoKey> {
  if (!password) {
    // No password: use base key directly
    return crypto.subtle.importKey(
      'raw',
      baseKey.buffer as ArrayBuffer,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  // With password: derive key using PBKDF2
  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: baseKey.buffer as ArrayBuffer, // Use base key as salt
      iterations: 100000,
      hash: 'SHA-256'
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt content using AES-GCM
 */
export async function encryptContent(
  content: string,
  masterKey: CryptoKey
): Promise<{ iv: string; ciphertext: string }> {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96 bits for AES-GCM
  
  const encoder = new TextEncoder();
  const data = encoder.encode(content);

  // Encrypt using AES-GCM
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    masterKey,
    data
  );

  return {
    iv: arrayBufferToBase64Url(iv.buffer),
    ciphertext: arrayBufferToBase64Url(encryptedBuffer)
  };
}

/**
 * Decrypt content using AES-GCM
 */
export async function decryptContent(
  encryptedData: { iv: string; ciphertext: string },
  masterKey: CryptoKey
): Promise<string> {
  const iv = base64UrlToArrayBuffer(encryptedData.iv);
  const ciphertext = base64UrlToArrayBuffer(encryptedData.ciphertext);

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    masterKey,
    ciphertext
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
}

/**
 * Create encrypted password entry
 */
export async function createEncryptedEntry(
  username: string,
  password: string,
  notes: string,
  protectionPassword?: string
): Promise<{
  baseKey: string;
  encryptedContent: string;
  hasPassword: boolean;
}> {
  // Generate base key
  const baseKey = generateBaseKey();
  
  // Derive master key
  const masterKey = await deriveMasterKey(baseKey, protectionPassword);
  
  // Prepare content
  const content = JSON.stringify({
    username,
    password,
    notes,
    timestamp: Date.now()
  });
  
  // Encrypt content
  const encrypted = await encryptContent(content, masterKey);
  
  return {
    baseKey: arrayBufferToBase64Url(baseKey.buffer),
    encryptedContent: JSON.stringify(encrypted),
    hasPassword: Boolean(protectionPassword)
  };
}

/**
 * Decrypt password entry
 */
export async function decryptEntry(
  encryptedContent: string,
  baseKey: string,
  protectionPassword?: string
): Promise<{
  username: string;
  password: string;
  notes: string;
  timestamp: number;
}> {
  // Parse encrypted data
  const encrypted = JSON.parse(encryptedContent);
  
  // Convert base key from string
  const baseKeyBytes = new Uint8Array(base64UrlToArrayBuffer(baseKey));
  
  // Derive master key
  const masterKey = await deriveMasterKey(baseKeyBytes, protectionPassword);
  
  // Decrypt content
  const decrypted = await decryptContent(encrypted, masterKey);
  
  return JSON.parse(decrypted);
}

