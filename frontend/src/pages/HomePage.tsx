import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Copy, CheckCircle, AlertCircle, Lock, Clock, Eye, Plus, Trash2, Key, Info } from 'lucide-react';
import { createEncryptedEntry } from '../utils/crypto';
import { createNote } from '../utils/api';

interface CredentialField {
  id: string;
  label: string;
  value: string;
  isSecret: boolean;
}

export default function HomePage() {
  const [fields, setFields] = useState<CredentialField[]>([
    { id: '1', label: 'Username', value: '', isSecret: false },
    { id: '2', label: 'Password', value: '', isSecret: true },
  ]);
  const [notes, setNotes] = useState('');
  const [protectionPassword, setProtectionPassword] = useState('');
  const [expiryMinutes, setExpiryMinutes] = useState(60);
  const [oneTime, setOneTime] = useState(true);

  const [generatedUrl, setGeneratedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const generatedLinkRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to generated link when it appears
  useEffect(() => {
    if (generatedUrl && generatedLinkRef.current) {
      generatedLinkRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest'
      });
    }
  }, [generatedUrl]);

  const addField = () => {
    const newField: CredentialField = {
      id: Date.now().toString(),
      label: '',
      value: '',
      isSecret: false,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    if (fields.length > 1) {
      setFields(fields.filter(f => f.id !== id));
    }
  };

  const updateField = (id: string, updates: Partial<CredentialField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const loadTemplate = (template: 'password' | 'apikey' | 'custom') => {
    switch (template) {
      case 'password':
        setFields([
          { id: '1', label: 'Username', value: '', isSecret: false },
          { id: '2', label: 'Password', value: '', isSecret: true },
        ]);
        break;
      case 'apikey':
        setFields([
          { id: '1', label: 'API Key', value: '', isSecret: true },
        ]);
        break;
      case 'custom':
        setFields([
          { id: '1', label: '', value: '', isSecret: false },
        ]);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate inputs
      const hasData = fields.some(f => f.value.trim() !== '');
      if (!hasData) {
        throw new Error('At least one field is required');
      }

      // Convert fields to a structured format
      const credentials = fields.reduce((acc, field) => {
        if (field.value.trim()) {
          acc[field.label || 'Field'] = field.value;
        }
        return acc;
      }, {} as Record<string, string>);

      // Create encrypted entry (storing credentials in JSON format)
      const { baseKey, encryptedContent, hasPassword } = await createEncryptedEntry(
        JSON.stringify(credentials),
        '', // Empty password field, all data is in username
        notes,
        protectionPassword || undefined
      );

      // Send to server
      const response = await createNote({
        encryptedContent,
        contentType: 'password',
        hasPassword,
        expiryMinutes: expiryMinutes,
        oneTime: oneTime,
      });

      // Generate shareable URL with base key in hash fragment
      const url = `${window.location.origin}/view/${response.noteId}#${baseKey}`;
      setGeneratedUrl(url);

      // Clear form
      setFields([
        { id: '1', label: 'Username', value: '', isSecret: false },
        { id: '2', label: 'Password', value: '', isSecret: true },
      ]);
      setNotes('');
      setProtectionPassword('');
    } catch (err) {
      console.error('Error creating note:', err);
      setError(err instanceof Error ? err.message : 'Failed to create secure link');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6">
          <Shield className="w-8 h-8 text-primary-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Passwords We Never See
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Zero-visibility password sharing with military-grade encryption.
          Share credentials that self-destruct after one view. We're completely blind to your data.
        </p>
        
        {/* Security Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm transition-colors"
          >
            <Info className="w-4 h-4" />
            👁️ How does BlindPass stay blind?
          </Link>
          <Link
            to="/about#gdpr"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-600 dark:text-green-400 text-sm transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            🇪🇺 GDPR Compliant
          </Link>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="card max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Quick Templates */}
          <div className="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-dark-border">
            <Key className="w-4 h-4 text-gray-500 dark:text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Quick templates:</span>
            <button
              type="button"
              onClick={() => loadTemplate('password')}
              className="text-xs px-3 py-1 rounded bg-gray-100 dark:bg-dark-hover hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => loadTemplate('apikey')}
              className="text-xs px-3 py-1 rounded bg-gray-100 dark:bg-dark-hover hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              API Key
            </button>
            <button
              type="button"
              onClick={() => loadTemplate('custom')}
              className="text-xs px-3 py-1 rounded bg-gray-100 dark:bg-dark-hover hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              Custom
            </button>
          </div>

          {/* Dynamic Fields */}
          <div className="space-y-3">
            {fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Field name (e.g., Username, API Key)"
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                    className="input text-sm w-48"
                  />
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type={field.isSecret ? 'password' : 'text'}
                      placeholder="Enter value"
                      value={field.value}
                      onChange={(e) => updateField(field.id, { value: e.target.value })}
                      className="input flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => updateField(field.id, { isSecret: !field.isSecret })}
                      className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      title={field.isSecret ? 'Show as text' : 'Hide as password'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField(field.id)}
                        className="p-2.5 rounded-lg hover:bg-red-500/10 transition-colors text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        title="Remove field"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Add Field Button */}
            <button
              type="button"
              onClick={addField}
              className="w-full py-2.5 rounded-lg border-2 border-dashed border-gray-300 dark:border-dark-border hover:border-gray-400 dark:hover:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Field
            </button>
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Additional Notes <span className="text-gray-500 dark:text-gray-600">(optional)</span>
            </label>
            <textarea
              id="notes"
              className="input min-h-[100px] resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional information..."
            />
          </div>

          {/* Settings Grid */}
          <div className="grid md:grid-cols-2 gap-5 pt-2">
            {/* Protection Password */}
            <div>
              <label htmlFor="protectionPassword" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Protection Password
              </label>
              <input
                type="password"
                id="protectionPassword"
                className="input"
                value={protectionPassword}
                onChange={(e) => setProtectionPassword(e.target.value)}
                placeholder="Optional password"
              />
            </div>

            {/* Expiration */}
            <div>
              <label htmlFor="expiry" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Expires In
              </label>
              <select
                id="expiry"
                className="input"
                value={expiryMinutes}
                onChange={(e) => setExpiryMinutes(Number(e.target.value))}
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={180}>3 hours</option>
                <option value={360}>6 hours</option>
                <option value={720}>12 hours</option>
                <option value={1440}>24 hours</option>
                <option value={10080}>7 days</option>
              </select>
            </div>
          </div>

          {/* One-Time Toggle */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-dark-hover border border-gray-200 dark:border-dark-border">
            <input
              type="checkbox"
              id="oneTime"
              checked={oneTime}
              onChange={(e) => setOneTime(e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 focus:ring-offset-white dark:focus:ring-offset-black bg-white dark:bg-dark-card border-gray-300 dark:border-gray-700"
            />
            <label htmlFor="oneTime" className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Self-destruct after first view (recommended)
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full text-base"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Secure Link'
            )}
          </button>
        </form>
      </div>

      {/* Generated URL */}
      {generatedUrl && (
        <div 
          ref={generatedLinkRef}
          className="card max-w-2xl mx-auto animate-fade-in border-2 border-green-500/30 shadow-lg shadow-green-500/10"
        >
          <div className="flex items-start gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 animate-pulse">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">✨ Secure Link Created!</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share this link with the recipient. It will self-destruct after one view - we'll never see it.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={generatedUrl}
                readOnly
                onClick={(e) => e.currentTarget.select()}
                className="input flex-1 font-mono text-sm bg-green-500/5 border-green-500/30 focus:ring-green-500"
              />
              <button
                onClick={handleCopy}
                className="btn-primary flex items-center gap-2 flex-shrink-0 min-w-[100px]"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200/80 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Make sure to copy the entire URL including the encryption key after the # symbol.
                </span>
              </p>
            </div>

            {/* Create Another Button */}
            <button
              onClick={() => {
                setGeneratedUrl('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Another Secure Link
            </button>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-primary-500" />
          </div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Completely Blind</h3>
          <p className="text-sm text-gray-600 dark:text-gray-500">
            We never see your passwords. Keys never touch our servers.
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-primary-500" />
          </div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Auto-Destruct</h3>
          <p className="text-sm text-gray-600 dark:text-gray-500">
            Set expiration times or one-time self-destruct links
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-4">
            <Eye className="w-6 h-6 text-primary-500" />
          </div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Zero Visibility</h3>
          <p className="text-sm text-gray-600 dark:text-gray-500">
            Once viewed, it's gone forever. No logs, no traces, no visibility.
          </p>
        </div>
      </div>
    </div>
  );
}
