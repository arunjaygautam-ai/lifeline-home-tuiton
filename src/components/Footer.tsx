import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 md:pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 w-full mb-12">
          
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <div className="h-12 flex items-center justify-center overflow-hidden shrink-0">
                <img src="/logo.png" alt="LH Logo" className="h-full w-auto object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white leading-tight">Lifeline</span>
                <span className="text-xs font-semibold text-primary-400 tracking-wider uppercase">Home Tuition</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Trusted Home Tutors in Patna for Every Class & Subject. We provide personalized one-to-one learning experiences to help students excel in their academics.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://www.facebook.com/share/1JL8Dq1tYa/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors text-white"><Facebook className="w-4 h-4" /></a>
              <a href="https://www.instagram.com/arunjaygautam" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors text-white"><Instagram className="w-4 h-4" /></a>
              <a href="https://x.com/lifelinetuition" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors text-white"><Twitter className="w-4 h-4" /></a>
              <a href="https://www.linkedin.com/in/lifeline-home-tuition-36544340b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors text-white"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-semibold text-white tracking-wide uppercase text-sm">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Our Services</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact Us</Link></li>
              <li><a href="/#parents-inquiry" className="hover:text-primary-400 transition-colors">Book a Demo</a></li>
              <li><a href="/#tutor-inquiry" className="hover:text-primary-400 transition-colors">Join as Tutor</a></li>
            </ul>
          </div>

          {/* Subjects */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-semibold text-white tracking-wide uppercase text-sm">Top Subjects</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Mathematics Tuition</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Physics & Chemistry</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Spoken English</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">IIT-JEE / NEET Prep</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Coding Classes</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-semibold text-white tracking-wide uppercase text-sm">Contact Info</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="leading-relaxed">Mourya Vihar Colony, Beur Akhada,<br />Anisabad, Patna, Bihar 800002</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <a href="tel:+919934985213" className="hover:text-white transition-colors">+91 99349 85213</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <a href="mailto:info@lifelinetuition.com" className="hover:text-white transition-colors">info@lifelinetuition.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="w-full pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} Lifeline Home Tuition. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/admin" className="hover:text-slate-300">Admin Login</Link>
            <Link to="#" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="#" className="hover:text-slate-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
