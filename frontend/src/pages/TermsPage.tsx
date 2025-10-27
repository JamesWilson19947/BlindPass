import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6">
          <Shield className="w-8 h-8 text-primary-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div className="card space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing and using BlindPass.io ("the Service"), you accept and agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">2. Description of Service</h2>
          <p className="mb-2">
            BlindPass is a zero-knowledge, temporary password sharing service. The Service allows users to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Encrypt sensitive information locally in their browser</li>
            <li>Generate temporary, shareable links to encrypted content</li>
            <li>Set expiration times and access limits for shared content</li>
          </ul>
          <p className="mt-3">
            <strong>Important:</strong> BlindPass operates on a zero-knowledge architecture. We cannot decrypt, access, 
            or recover your content. The encryption keys never leave your browser.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">3. User Responsibilities</h2>
          <p className="mb-2">You agree to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Service only for lawful purposes</li>
            <li>Not share content that violates any laws or regulations</li>
            <li>Not use the Service to transmit malware, viruses, or harmful code</li>
            <li>Not attempt to bypass, disable, or interfere with security features</li>
            <li>Share links only through secure channels with intended recipients</li>
            <li>Take responsibility for the security of shared links</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">4. Prohibited Use</h2>
          <p className="mb-2">You may NOT use BlindPass to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Share stolen credentials, hacked passwords, or unauthorized access information</li>
            <li>Facilitate illegal activities or cybercrimes</li>
            <li>Distribute copyrighted material without authorization</li>
            <li>Share content that violates third-party rights</li>
            <li>Harass, threaten, or harm others</li>
            <li>Violate any applicable laws or regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">5. Disclaimer of Warranties</h2>
          <p className="mb-3">
            <strong>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.</strong>
          </p>
          <p className="mb-2">We disclaim all warranties, including but not limited to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
            <li>Any guarantee of uninterrupted or error-free service</li>
            <li>Any guarantee that content will remain secure or accessible</li>
            <li>Any guarantee of data recovery after expiration or viewing</li>
          </ul>
          <p className="mt-3">
            We cannot and do not guarantee the security of links shared through insecure channels 
            (email, SMS, unencrypted messaging, etc.).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">6. Limitation of Liability</h2>
          <p className="mb-3">
            <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, BLINDPASS AND ITS OPERATORS SHALL NOT BE LIABLE FOR:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Any indirect, incidental, special, consequential, or punitive damages</li>
            <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
            <li>Unauthorized access to or alteration of your content</li>
            <li>Content shared by users of the Service</li>
            <li>Actions of third parties who obtain shared links</li>
            <li>Data breaches, leaks, or security incidents beyond our control</li>
            <li>Any damages resulting from use or inability to use the Service</li>
          </ul>
          <p className="mt-3">
            <strong>Our total liability shall not exceed $100 USD or the amount you paid us (which is $0), 
            whichever is greater.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">7. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless BlindPass, its operators, and affiliates from any claims, 
            damages, losses, liabilities, and expenses (including legal fees) arising from:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Your use or misuse of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of third parties</li>
            <li>Content you share through the Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">8. Zero-Knowledge Architecture</h2>
          <p className="mb-2">
            <strong>Important Technical Limitation:</strong> BlindPass operates on a zero-knowledge encryption model:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>All encryption happens in your browser before data transmission</li>
            <li>Encryption keys never reach our servers</li>
            <li>We cannot decrypt, access, view, or recover your content</li>
            <li>We cannot assist with lost passwords or expired content</li>
            <li>Content is permanently destroyed after viewing (one-time) or expiration</li>
          </ul>
          <p className="mt-3">
            <strong>This means we cannot:</strong> Recover lost data, provide content to law enforcement, 
            verify content authenticity, or determine what was shared.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">9. Data Retention</h2>
          <p>
            Encrypted content is automatically deleted:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>After one view (if one-time viewing is enabled)</li>
            <li>After the specified expiration time</li>
            <li>During routine cleanup operations</li>
          </ul>
          <p className="mt-3">
            Once deleted, content is <strong>permanently and irreversibly destroyed</strong> and cannot be recovered by anyone.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">10. Service Modifications</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the Service at any time without notice. 
            We are not liable for any modification, suspension, or discontinuation of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">11. Termination</h2>
          <p>
            We may terminate or suspend access to the Service immediately, without notice, for conduct that 
            we believe violates these Terms or is harmful to other users, us, or third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of your jurisdiction, 
            without regard to conflict of law provisions. Any disputes shall be resolved in the courts of your jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">13. DMCA Compliance</h2>
          <p className="mb-2">
            Due to our zero-knowledge architecture, we cannot view or moderate content. However:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>We comply with applicable copyright laws</li>
            <li>Content is temporary and self-destructs automatically</li>
            <li>We cannot remove specific content as we cannot identify it</li>
          </ul>
          <p className="mt-3">
            If you believe content violates copyright, all shared links expire automatically within 7 days maximum.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">14. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the Service after changes constitutes 
            acceptance of the updated Terms. We encourage you to review these Terms periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">15. Contact</h2>
          <p>
            For questions about these Terms, please open an issue on our{' '}
            <a
              href="https://github.com/JamesWilson19947/BlindPass"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-400 underline"
            >
              GitHub repository
            </a>.
          </p>
        </section>

        <section className="pt-6 border-t border-gray-200 dark:border-dark-border">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By using BlindPass, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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

