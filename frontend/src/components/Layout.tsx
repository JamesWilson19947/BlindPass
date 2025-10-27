import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-dark-border backdrop-blur-sm sticky top-0 z-50 bg-white/80 dark:bg-black/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
            <Shield className="w-7 h-7 text-primary-500 group-hover:text-primary-400 transition-colors" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              BlindPass<span className="text-primary-500">.io</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/about"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              How It Works
            </Link>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            <a
              href="https://github.com/JamesWilson19947/BlindPass"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-dark-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-500 max-w-4xl">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              Zero-knowledge encryption
            </span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span>GDPR Compliant</span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link to="/about" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
              How It Works
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span>Open source</span>
          </p>
          <p className="mt-3 flex items-center justify-center gap-3 text-xs">
            <Link to="/terms" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link to="/privacy" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <a
              href="https://github.com/JamesWilson19947/BlindPass"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              GitHub
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-600">
            Your passwords are encrypted locally in your browser and never leave your device unencrypted
          </p>
        </div>
      </footer>
    </div>
  );
}

