import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      <div className="card">
        <div className="w-16 h-16 rounded-2xl bg-gray-700/50 border border-gray-700 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-6xl font-bold mb-3 text-white">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-white">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
