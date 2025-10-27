import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Download, Eye, EyeOff, AlertCircle, Loader, CheckCircle, Copy, Lock, FileText, FileJson, Info, X } from 'lucide-react';
import { getNote } from '../utils/api';
import { decryptEntry } from '../utils/crypto';
import { exportToLastPass, exportToBitwarden, exportTo1Password, downloadFile } from '../utils/export';

export default function ViewPage() {
  const { noteId } = useParams<{ noteId: string }>();
  const [baseKey, setBaseKey] = useState('');
  const [protectionPassword, setProtectionPassword] = useState('');
  const [needsPassword, setNeedsPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [encryptedNote, setEncryptedNote] = useState<string | null>(null);
  const [isOneTime, setIsOneTime] = useState(false); // Track if note is one-time
  const [decryptedData, setDecryptedData] = useState<{
    credentials?: Record<string, string>;
    username?: string;
    password?: string;
    notes: string;
    timestamp: number;
  } | null>(null);
  const [showFields, setShowFields] = useState<Record<string, boolean>>({});
  const [showImportHelp, setShowImportHelp] = useState<string | null>(null);

  useEffect(() => {
    // Extract base key from URL hash
    const hash = window.location.hash.substring(1);
    if (hash) {
      setBaseKey(hash);
    } else {
      setError('Invalid link: Missing encryption key');
    }
  }, []);

  const handleDecrypt = async () => {
    if (!noteId || !baseKey) {
      setError('Invalid link format');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Fetch encrypted note from server only if we haven't already
      let noteContent = encryptedNote;

      if (!encryptedNote) {
        const note = await getNote(noteId);
        noteContent = note.encryptedContent;
        
        // Store the encrypted note and one-time flag so we don't need to fetch again
        setEncryptedNote(note.encryptedContent);
        setIsOneTime(note.oneTime || false);

        // Check if password is required
        if (note.hasPassword && !protectionPassword) {
          setNeedsPassword(true);
          setIsLoading(false);
          return;
        }
      }

      // Decrypt the content
      let decrypted = await decryptEntry(
        noteContent!,
        baseKey,
        protectionPassword || undefined
      );

      // Parse credentials if they're in JSON format (new format)
      if (decrypted.username && decrypted.username.startsWith('{')) {
        try {
          const credentials = JSON.parse(decrypted.username);
          decrypted = {
            notes: decrypted.notes,
            timestamp: decrypted.timestamp,
            credentials,
          } as any;
        } catch (e) {
          // Keep as is if parsing fails
        }
      }

      setDecryptedData(decrypted);
      setNeedsPassword(false);
    } catch (err) {
      console.error('Decryption error:', err);
      
      if (err instanceof Error && err.message.includes('decrypt')) {
        setError('Failed to decrypt. Invalid password or corrupted data.');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to retrieve password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFieldVisibility = (fieldName: string) => {
    setShowFields(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const handleExport = (format: 'lastpass' | 'bitwarden' | '1password' | 'text' | 'json') => {
    if (!decryptedData) return;

    // Get first credential or fallback to username/password
    const credentials = decryptedData.credentials || {
      Username: decryptedData.username || '',
      Password: decryptedData.password || ''
    };
    
    const firstKey = Object.keys(credentials)[0] || '';
    const firstValue = credentials[firstKey] || '';
    const secondKey = Object.keys(credentials)[1] || '';
    const secondValue = credentials[secondKey] || '';

    const entry = {
      username: firstValue,
      password: secondValue || firstValue,
      notes: decryptedData.notes,
      title: 'Shared Credentials',
    };

    let content: string;
    let filename: string;
    let mimeType: string;

    switch (format) {
      case 'lastpass':
        content = exportToLastPass(entry);
        filename = 'blindpass-export-lastpass.csv';
        mimeType = 'text/csv';
        break;
      case 'bitwarden':
        content = exportToBitwarden(entry);
        filename = 'blindpass-export-bitwarden.json';
        mimeType = 'application/json';
        break;
      case '1password':
        content = exportTo1Password(entry);
        filename = 'blindpass-export-1password.json';
        mimeType = 'application/json';
        break;
      case 'text':
        // Plain text export
        const textLines = [];
        if (decryptedData.credentials) {
          Object.entries(decryptedData.credentials).forEach(([key, value]) => {
            textLines.push(`${key}: ${value}`);
          });
        } else {
          if (decryptedData.username) textLines.push(`Username: ${decryptedData.username}`);
          if (decryptedData.password) textLines.push(`Password: ${decryptedData.password}`);
        }
        if (decryptedData.notes) textLines.push(`\nNotes:\n${decryptedData.notes}`);
        content = textLines.join('\n');
        filename = 'blindpass-credentials.txt';
        mimeType = 'text/plain';
        break;
      case 'json':
        // JSON export
        content = JSON.stringify({
          credentials: decryptedData.credentials || {
            username: decryptedData.username,
            password: decryptedData.password
          },
          notes: decryptedData.notes,
          exportedAt: new Date().toISOString(),
          source: 'BlindPass.io'
        }, null, 2);
        filename = 'blindpass-export.json';
        mimeType = 'application/json';
        break;
      default:
        return;
    }

    downloadFile(content, filename, mimeType);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (error && !needsPassword && !decryptedData) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="card text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Already Gone</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{error}</p>
              <p className="text-sm text-gray-600 dark:text-gray-500">
                This password has been destroyed and disappeared forever. It may have been viewed, expired, or the link is invalid.
              </p>
        </div>
      </div>
    );
  }

  if (decryptedData) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="card">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Decrypted Successfully</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Decrypted on your device. This password has been destroyed from our servers - we never saw it.
              </p>
            </div>
          </div>

          {/* Dynamic Credentials Display */}
          <div className="space-y-4 mb-6">
            {decryptedData.credentials ? (
              // New format: dynamic fields
              Object.entries(decryptedData.credentials).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-2 text-gray-300">{key || 'Field'}</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type={showFields[key] ? 'text' : 'password'}
                        value={value}
                        readOnly
                        className="input w-full font-mono pr-10"
                      />
                      <button
                        onClick={() => toggleFieldVisibility(key)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showFields[key] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <button
                      onClick={() => copyToClipboard(value)}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              // Legacy format: username/password
              <>
                {decryptedData.username && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Username / Email</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={decryptedData.username}
                        readOnly
                        className="input flex-1 font-mono"
                      />
                      <button
                        onClick={() => copyToClipboard(decryptedData.username!)}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {decryptedData.password && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type={showFields['password'] ? 'text' : 'password'}
                          value={decryptedData.password}
                          readOnly
                          className="input w-full font-mono pr-10"
                        />
                        <button
                          onClick={() => toggleFieldVisibility('password')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          {showFields['password'] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <button
                        onClick={() => copyToClipboard(decryptedData.password!)}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Notes */}
          {decryptedData.notes && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-300">Additional Notes</label>
              <textarea
                value={decryptedData.notes}
                readOnly
                className="input min-h-[100px] resize-none"
              />
            </div>
          )}

          {/* Export Options */}
          <div className="border-t border-gray-200 dark:border-dark-border pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <Download className="w-5 h-5" />
              Export Credentials
            </h3>
            
            {/* Password Managers */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password Managers
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <button
                    onClick={() => handleExport('lastpass')}
                    className="btn-secondary text-sm w-full flex items-center justify-center gap-2"
                  >
                    <span className="text-red-600 dark:text-red-400 font-bold">LP</span>
                    LastPass CSV
                  </button>
                  <button
                    onClick={() => setShowImportHelp(showImportHelp === 'lastpass' ? null : 'lastpass')}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center text-xs transition-colors"
                    title="How to import"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => handleExport('bitwarden')}
                    className="btn-secondary text-sm w-full flex items-center justify-center gap-2"
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-bold">BW</span>
                    Bitwarden JSON
                  </button>
                  <button
                    onClick={() => setShowImportHelp(showImportHelp === 'bitwarden' ? null : 'bitwarden')}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center text-xs transition-colors"
                    title="How to import"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => handleExport('1password')}
                    className="btn-secondary text-sm w-full flex items-center justify-center gap-2"
                  >
                    <span className="text-sky-600 dark:text-sky-400 font-bold">1P</span>
                    1Password JSON
                  </button>
                  <button
                    onClick={() => setShowImportHelp(showImportHelp === '1password' ? null : '1password')}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center text-xs transition-colors"
                    title="How to import"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Import Help Modals */}
            {showImportHelp && (
              <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg relative">
                <button
                  onClick={() => setShowImportHelp(null)}
                  className="absolute top-2 right-2 p-1 hover:bg-blue-500/20 rounded transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </button>
                
                {showImportHelp === 'lastpass' && (
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <span className="text-red-600 dark:text-red-400 font-bold">LP</span>
                      Importing to LastPass
                    </h4>
                    <ol className="text-sm text-blue-700 dark:text-blue-200 space-y-1 list-decimal list-inside">
                      <li>Log into your LastPass vault</li>
                      <li>Go to <strong>Account Options</strong> → <strong>Advanced</strong> → <strong>Import</strong></li>
                      <li>Select <strong>"Generic CSV File"</strong> as the import format</li>
                      <li>Upload the downloaded <code>blindpass-export-lastpass.csv</code> file</li>
                      <li>Review and confirm the import</li>
                    </ol>
                  </div>
                )}
                
                {showImportHelp === 'bitwarden' && (
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">BW</span>
                      Importing to Bitwarden
                    </h4>
                    <ol className="text-sm text-blue-700 dark:text-blue-200 space-y-1 list-decimal list-inside">
                      <li>Log into your Bitwarden web vault</li>
                      <li>Go to <strong>Tools</strong> → <strong>Import Data</strong></li>
                      <li>Select <strong>"Bitwarden (json)"</strong> as the file format</li>
                      <li>Upload the downloaded <code>blindpass-export-bitwarden.json</code> file</li>
                      <li>Click <strong>Import Data</strong></li>
                    </ol>
                  </div>
                )}
                
                {showImportHelp === '1password' && (
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <span className="text-sky-600 dark:text-sky-400 font-bold">1P</span>
                      Importing to 1Password
                    </h4>
                    <ol className="text-sm text-blue-700 dark:text-blue-200 space-y-1 list-decimal list-inside">
                      <li>Open 1Password app</li>
                      <li>Go to <strong>File</strong> → <strong>Import</strong></li>
                      <li>Select <strong>"1Password Unencrypted Data (.1pux or .json)"</strong></li>
                      <li>Choose the downloaded <code>blindpass-export-1password.json</code> file</li>
                      <li>Select the vault to import into and confirm</li>
                    </ol>
                  </div>
                )}
              </div>
            )}
            
            {/* Plain Export */}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Plain Export
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleExport('text')}
                  className="btn-secondary text-sm flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Plain Text (.txt)
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="btn-secondary text-sm flex items-center justify-center gap-2"
                >
                  <FileJson className="w-4 h-4" />
                  JSON (.json)
                </button>
              </div>
            </div>
          </div>

          {/* Warning - Only show for one-time notes */}
          {isOneTime && (
            <div className="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200/80 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-red-600 dark:text-red-400">Gone Forever:</strong> This password has been permanently destroyed.
                  Save these credentials now - there's no way to recover them.
                </span>
              </p>
            </div>
          )}
          
          {/* Info - For non-one-time notes */}
          {!isOneTime && (
            <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200/80 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  This password will remain accessible until it expires. Make sure to save these credentials securely.
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">View Secure Password</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {needsPassword
              ? 'This password is protected. Enter the password to decrypt and view it.'
              : 'Click below to decrypt and view this password. Once viewed, it will be destroyed forever.'}
          </p>
        </div>

        {needsPassword && (
          <div className="mb-6">
            <label htmlFor="protectionPassword" className="block text-sm font-medium mb-2 text-gray-300 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Protection Password
            </label>
            <input
              type="password"
              id="protectionPassword"
              className="input"
              value={protectionPassword}
              onChange={(e) => setProtectionPassword(e.target.value)}
              placeholder="Enter password"
              onKeyDown={(e) => e.key === 'Enter' && handleDecrypt()}
              autoFocus
            />
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleDecrypt}
          disabled={isLoading || (needsPassword && !protectionPassword)}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Decrypting...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              {needsPassword ? 'Decrypt with Password' : 'View Password'}
            </>
          )}
        </button>

        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200/60 flex items-start gap-2">
            <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Zero-Visibility:</strong> This password will decrypt on your device and be destroyed from our servers immediately.
              We never see your data - we're completely blind to it.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
