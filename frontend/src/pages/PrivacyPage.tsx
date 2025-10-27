import { Eye, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6">
          <Eye className="w-8 h-8 text-primary-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div className="card space-y-6 text-gray-700 dark:text-gray-300">
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <h3 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            TL;DR - We're Blind to Your Data
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            We don't collect personal information. We don't track you. We don't log your activity. 
            We can't see your passwords because they're encrypted in your browser before reaching our servers. 
            We're literally blind to your data.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">1. Introduction</h2>
          <p>
            BlindPass ("we," "our," or "us") operates on a zero-knowledge, zero-visibility architecture. 
            This Privacy Policy explains what we don't collect, what we can't see, and how your data is protected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">2. What We DON'T Collect</h2>
          <p className="mb-2">
            <strong>We do not collect, store, or process:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Personal Information:</strong> No names, emails, phone numbers, or user accounts</li>
            <li><strong>IP Addresses:</strong> We don't log IP addresses or location data</li>
            <li><strong>Plaintext Content:</strong> Your passwords/credentials are never visible to us</li>
            <li><strong>Encryption Keys:</strong> Keys never leave your browser</li>
            <li><strong>Tracking Cookies:</strong> We don't use analytics or tracking cookies</li>
            <li><strong>User Activity:</strong> We don't log when notes are created or viewed</li>
            <li><strong>Browser Information:</strong> No fingerprinting or device tracking</li>
            <li><strong>Behavioral Data:</strong> No profiling, analysis, or data mining</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">3. What We DO Store (Encrypted)</h2>
          <p className="mb-2">
            We store only the minimum necessary to operate the service:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Encrypted Ciphertext:</strong> Your content after it's been encrypted in your browser</li>
            <li><strong>Note ID:</strong> A random identifier to retrieve the encrypted content</li>
            <li><strong>Expiration Timestamp:</strong> When the note should be automatically deleted</li>
            <li><strong>Settings:</strong> Whether the note is one-time view and if it has a password</li>
          </ul>
          <p className="mt-3 font-bold">
            Important: All of this data is <strong>encrypted</strong> and <strong>temporary</strong>. 
            We cannot decrypt it, and it's automatically deleted after viewing or expiration.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">4. Zero-Knowledge Architecture</h2>
          <p className="mb-3">
            <strong>How it works:</strong>
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Encryption in Browser:</strong> Your content is encrypted using AES-256-GCM 
              locally in your browser before any data is sent to our servers.
            </li>
            <li>
              <strong>Key Stays Local:</strong> The encryption key is stored in the URL hash fragment (#key), 
              which never gets sent to any server (per RFC 3986).
            </li>
            <li>
              <strong>Server Stores Ciphertext:</strong> Our servers only receive and store encrypted ciphertext 
              that's mathematically impossible to decrypt without the key.
            </li>
            <li>
              <strong>Recipient Decrypts:</strong> When someone opens the link, their browser fetches the 
              encrypted data and decrypts it locally using the key from the URL hash.
            </li>
            <li>
              <strong>Automatic Deletion:</strong> After viewing or expiration, the encrypted data is 
              permanently destroyed from our servers.
            </li>
          </ol>
          <p className="mt-3 font-bold text-primary-600 dark:text-primary-400">
            Result: We never see your plaintext content. Ever. We're completely blind to your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">5. Data Retention</h2>
          <p className="mb-2">
            Encrypted data is automatically deleted:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>After First View:</strong> If one-time viewing is enabled (default)</li>
            <li><strong>After Expiration:</strong> Maximum 7 days, customizable from 15 minutes to 7 days</li>
            <li><strong>Daily Cleanup:</strong> Automated cleanup runs at midnight UTC to remove expired notes</li>
          </ul>
          <p className="mt-3">
            Once deleted, data is <strong>permanently and irreversibly destroyed</strong>. We cannot recover it, 
            and neither can anyone else.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">6. Third-Party Services</h2>
          <p className="mb-2">
            We use minimal third-party services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Vercel (Hosting):</strong> Our infrastructure provider. 
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" 
                 className="text-primary-500 hover:text-primary-400 underline ml-1">
                Vercel Privacy Policy
              </a>
            </li>
            <li>
              <strong>Turso (Database):</strong> Stores encrypted data only. 
              <a href="https://turso.tech/privacy-policy" target="_blank" rel="noopener noreferrer" 
                 className="text-primary-500 hover:text-primary-400 underline ml-1">
                Turso Privacy Policy
              </a>
            </li>
          </ul>
          <p className="mt-2">
            <strong>No third-party analytics, tracking, or advertising services are used.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">7. GDPR Compliance</h2>
          <p className="mb-2">
            BlindPass is designed to be GDPR-compliant by default:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>No Personal Data:</strong> We don't collect data defined as "personal" under GDPR (Art. 4)</li>
            <li><strong>No Data Controller:</strong> We can't access the data, so we're not a data controller (Art. 24)</li>
            <li><strong>Automatic Deletion:</strong> Right to be forgotten is automatic (Art. 17)</li>
            <li><strong>No Processing:</strong> We don't process your data; encryption happens locally (Art. 6)</li>
            <li><strong>No Transfers:</strong> Encryption happens in your browser, not on servers (Art. 44-50)</li>
            <li><strong>No Breach Risk:</strong> We only have encrypted ciphertext (Art. 33)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">8. CCPA Compliance</h2>
          <p>
            Under the California Consumer Privacy Act (CCPA), you have rights regarding personal information. 
            However, <strong>we don't collect personal information</strong>, so these rights are automatically satisfied:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>We don't sell your data (we don't have it)</li>
            <li>We don't share your data (we don't collect it)</li>
            <li>You can't request deletion (it auto-deletes anyway)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">9. Law Enforcement Requests</h2>
          <p className="mb-2">
            <strong>What we can provide:</strong> Nothing meaningful.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>We don't have access logs</li>
            <li>We don't have user information</li>
            <li>We cannot decrypt content</li>
            <li>We cannot identify who created or viewed notes</li>
            <li>Content auto-deletes and cannot be recovered</li>
          </ul>
          <p className="mt-3">
            Our zero-knowledge architecture means we literally cannot provide plaintext content 
            to anyone - not law enforcement, not governments, not even ourselves.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">10. Security</h2>
          <p className="mb-2">
            Security measures we implement:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>AES-256-GCM Encryption:</strong> Military-grade encryption standard</li>
            <li><strong>PBKDF2 Key Derivation:</strong> 100,000 iterations for password-protected notes</li>
            <li><strong>HTTPS Only:</strong> All connections are encrypted in transit</li>
            <li><strong>Security Headers:</strong> Helmet.js protection against common attacks</li>
            <li><strong>Rate Limiting:</strong> Protection against abuse and DoS attacks</li>
            <li><strong>No XSS/CSRF:</strong> Content is encrypted, not rendered</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">11. Children's Privacy</h2>
          <p>
            BlindPass does not knowingly collect any information from anyone, including children under 13. 
            If you are under 13, please use the service with parental supervision.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">12. International Users</h2>
          <p>
            BlindPass is available globally. Since we don't collect personal information, 
            there are no cross-border data transfer concerns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">13. Changes to Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We encourage you to review it regularly. 
            Continued use of the service after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">14. Contact & Transparency</h2>
          <p className="mb-2">
            BlindPass is fully open source. You can:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Review our code on{' '}
              <a
                href="https://github.com/JamesWilson19947/BlindPass"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-400 underline"
              >
                GitHub
              </a>
            </li>
            <li>Verify the encryption implementation</li>
            <li>Audit the zero-knowledge architecture</li>
            <li>Report security issues via GitHub Issues</li>
          </ul>
        </section>

        <section className="pt-6 border-t border-gray-200 dark:border-dark-border">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Bottom Line:</strong> We can't see your data because it's encrypted in your browser 
            before reaching our servers. We don't track you. We don't collect personal information. 
            We're completely blind to what you share.
          </p>
        </section>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="text-primary-500 hover:text-primary-400 text-sm">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

