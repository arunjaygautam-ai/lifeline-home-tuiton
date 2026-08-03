import { Link } from 'react-router-dom';
import { Home, ArrowLeft, PhoneCall } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 text-center">
        <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary-100">
          <span className="font-heading font-black text-4xl text-primary-600">404</span>
        </div>
        
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 mb-3">
          Page Not Found
        </h1>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved. Let's get you back on track!
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="w-full bg-primary-600 text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors shadow-lg shadow-primary-600/20"
          >
            <Home className="w-4 h-4" /> Go to Homepage
          </Link>
          
          <a
            href="tel:+919934985213"
            className="w-full bg-slate-100 text-slate-700 font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors text-sm"
          >
            <PhoneCall className="w-4 h-4 text-primary-600" /> Need Help? Call Us
          </a>
        </div>
      </div>
    </div>
  );
}
