import React from 'react';
import { Shield, Lock, Key, Eye, Server, Code, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6">
          <Shield className="w-8 h-8 text-primary-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          How Does BlindPass Stay Blind?
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Zero-visibility architecture means we never see your passwords. Ever. We're completely blind to your data.
        </p>
      </div>

      {/* Zero-Knowledge Architecture */}
      <div className="card mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
            <Lock className="w-6 h-6 text-primary-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">👁️ Zero-Visibility, Zero-Knowledge</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              BlindPass operates on a zero-visibility architecture, which means <strong>we can never see your data</strong>. 
              We're completely blind to your passwords - they never exist in plaintext on our servers, not in logs, nowhere.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All encryption happens entirely in your browser before any data leaves your device
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Encryption keys are never sent to our servers - they're stored in the URL hash fragment
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our server only stores encrypted ciphertext that's completely useless without the key
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="card mb-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">How It Works</h2>
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary-500">1</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Generate Random Key</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A cryptographically secure 256-bit encryption key is generated in your browser using <code className="text-xs bg-gray-100 dark:bg-dark-hover px-1.5 py-0.5 rounded">crypto.getRandomValues()</code>
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary-500">2</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Encrypt Your Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your credentials are encrypted using AES-256-GCM (military-grade encryption) with the generated key. 
                If you set a protection password, we use PBKDF2 with 100,000 iterations.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary-500">3</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Store Only Encrypted Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The encrypted ciphertext is sent to our server and stored temporarily. The encryption key never leaves your browser.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary-500">4</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Share Secure Link</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The encryption key is embedded in the URL's hash fragment (after the #). This part of the URL is never sent to any server - it stays in the browser.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary-500">5</span>
            </div>
          <div>
            <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Decrypt & Destroy</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              When the recipient opens the link, their browser fetches the encrypted data and decrypts it locally. The data is immediately deleted from our servers - we never see the plaintext, leaving zero traces.
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <Key className="w-5 h-5 text-primary-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Encryption</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• AES-256-GCM algorithm</li>
            <li>• 256-bit encryption keys</li>
            <li>• PBKDF2-SHA256 key derivation</li>
            <li>• 100,000 PBKDF2 iterations</li>
            <li>• Cryptographically secure randomness</li>
          </ul>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <Server className="w-5 h-5 text-primary-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Server Security</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Zero-knowledge architecture</li>
            <li>• Rate limiting protection</li>
            <li>• Security headers (Helmet.js)</li>
            <li>• CORS protection</li>
            <li>• Automatic data expiration</li>
          </ul>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-5 h-5 text-primary-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Privacy</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• No user accounts required</li>
            <li>• No tracking or analytics</li>
            <li>• No access logs</li>
            <li>• No IP address storage</li>
            <li>• One-time access by default</li>
          </ul>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <Code className="w-5 h-5 text-primary-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Open Source</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Fully open source code</li>
            <li>• Auditable by anyone</li>
            <li>• MIT licensed</li>
            <li>• Community contributions</li>
            <li>• Transparent security</li>
          </ul>
        </div>
      </div>

      {/* GDPR & Data Protection */}
      <div className="card mb-6 bg-green-500/5 border-green-500/20">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">🇪🇺 GDPR & Data Protection Compliant</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              BlindPass is designed from the ground up to be fully compliant with GDPR, CCPA, and all major data protection regulations. 
              In fact, our architecture makes compliance automatic.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-dark-hover rounded-lg border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-600 dark:text-green-500" />
              Your Password Never Leaves Your Browser Unencrypted
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All encryption happens <strong>locally in your browser</strong> before any data is transmitted. 
              Your plaintext password never touches the internet - it's encrypted on your device using military-grade AES-256-GCM encryption, 
              and only the encrypted ciphertext is sent to our servers.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-dark-hover rounded-lg border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-500" />
              No Personal Data Collection
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We don't collect any personal data. No accounts, no emails, no IP addresses, no tracking cookies, no analytics. 
              There's nothing to comply with because there's nothing to protect - we're completely blind to who you are and what you're sharing.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-dark-hover rounded-lg border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600 dark:text-green-500" />
              Right to Be Forgotten - Automatic
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              GDPR's "Right to be Forgotten" is built-in. Data automatically deletes after viewing or expiration. 
              No need to request deletion - it's automatic, immediate, and irreversible. Once gone, it's gone forever.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-dark-hover rounded-lg border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-green-600 dark:text-green-500" />
              Encryption Keys Stay Local
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Encryption keys are stored in the URL's hash fragment (after the #) which <strong>never gets sent to our servers</strong>. 
              This is a browser standard (RFC 3986) - the hash fragment stays on your device. Without the key, the encrypted data is mathematically unbreakable.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-dark-hover rounded-lg border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-green-600 dark:text-green-500" />
              Data Processing Location
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All encryption/decryption is processed <strong>on your device</strong>, not our servers. 
              Our servers only store encrypted ciphertext that's useless without the key. We don't "process" your data because we can't see it.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-dark-hover rounded-lg border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500" />
              Why BlindPass is GDPR-Proof
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li>We don't collect personal data (Art. 4 GDPR)</li>
              <li>No data controller needed - we can't access the data (Art. 24 GDPR)</li>
              <li>Automatic data deletion (Art. 17 GDPR)</li>
              <li>No data transfers - encryption happens locally (Art. 44-50 GDPR)</li>
              <li>No consent needed - we never see your data (Art. 6 GDPR)</li>
              <li>No data breaches possible - we only have encrypted ciphertext (Art. 33 GDPR)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* What We Don't Store */}
      <div className="card mb-6 bg-red-500/5 border-red-500/20">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">👁️ What We're Blind To (Never Stored)</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <span className="text-red-500 font-bold">✗</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Plaintext passwords or credentials</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 font-bold">✗</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Encryption keys</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 font-bold">✗</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">User accounts or emails</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 font-bold">✗</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">IP addresses</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 font-bold">✗</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Access logs</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 font-bold">✗</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Tracking data</span>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Best Practices for Blind Sharing</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Always use HTTPS</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">BlindPass.io uses HTTPS to prevent interception during transmission</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Share links securely</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Use encrypted messaging apps (Signal, WhatsApp) to share links</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Enable one-time viewing</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Self-destruct links are most secure - they disappear forever after one view</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Use short expiration times</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Set the shortest practical expiration to minimize exposure</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Add protection passwords</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Extra layer of security before viewing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center p-8 rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 border border-primary-500/20">
        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Ready to Share Blindly?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          BlindPass is open source. Review our code, verify our zero-visibility architecture, and contribute to the project.
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}

