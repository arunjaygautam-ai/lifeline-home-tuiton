import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../assets/logo.png';
import { FALLBACK_LOGO_BASE64 } from '../lib/logoFallback';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 40) {
        setScrolled(true);
      } else if (scrollY < 10) {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 md:px-4',
        scrolled ? 'pt-2 md:pt-3' : 'pt-0 md:pt-4'
      )}
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto flex justify-between items-center transition-all duration-300",
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50 border border-slate-100 rounded-full px-5 py-2.5 sm:px-6 sm:py-3" 
            : "bg-transparent px-4 py-4 md:px-0"
        )}
      >
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-sm border border-slate-100 p-0.5">
            <img
              src={logoImg}
              alt="Lifeline Home Tuition Logo"
              width={44}
              height={44}
              className="w-full h-full object-contain rounded-lg"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.failed) {
                  target.dataset.failed = '1';
                  target.src = '/logo.png';
                } else if (target.dataset.failed === '1') {
                  target.dataset.failed = '2';
                  target.src = '/favicon-128x128.png';
                } else if (target.dataset.failed === '2') {
                  target.dataset.failed = '3';
                  target.src = FALLBACK_LOGO_BASE64;
                }
              }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-heading font-bold text-slate-900 leading-tight tracking-tight text-lg sm:text-xl">Lifeline</span>
            <span className="font-bold text-primary-600 tracking-widest uppercase text-[9px] sm:text-[10px]">Home Tuition</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
          {navLinks.map((link) => {
            const isActive = link.path.startsWith('/#') 
              ? location.pathname === '/' && location.hash === link.path.replace('/', '')
              : location.pathname === link.path && !location.hash;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-semibold transition-colors hover:text-primary-600 relative group truncate',
                  isActive ? 'text-primary-600' : 'text-slate-600'
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
          <a href="tel:+919934985213" className="flex items-center gap-2 text-slate-700 hover:text-primary-600 transition-colors text-sm font-bold hidden xl:flex mr-1">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary-100">
               <Phone className="w-4 h-4 text-primary-600" />
            </div>
            +91 99349 85213
          </a>
          <Link
            to="/#tutor-inquiry"
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors whitespace-nowrap bg-slate-100 hover:bg-blue-50 px-3.5 py-2 rounded-full border border-slate-200"
          >
            🧑‍🏫 Tutor Inquiry
          </Link>
          <Link
            to="/#parents-inquiry"
            className="bg-primary-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-slate-900 transition-colors shadow-md shadow-primary-600/20 hover:shadow-slate-900/20 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>👨‍👩‍👧</span> Parents Inquiry
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2 text-slate-600 bg-slate-50 rounded-full border border-slate-200 shrink-0" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-[calc(100%+10px)] left-4 right-4 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-2xl z-50"
          >
            <div className="p-5 flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = link.path.startsWith('/#') 
                  ? location.pathname === '/' && location.hash === link.path.replace('/', '')
                  : location.pathname === link.path && !location.hash;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      'text-base font-bold p-3 rounded-2xl transition-colors',
                      isActive ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:bg-slate-50'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="h-px bg-slate-100 my-1" />
              <Link
                to="/#parents-inquiry"
                onClick={() => setIsOpen(false)}
                className="block bg-[#7a52a3] text-white p-3.5 rounded-2xl text-center font-bold shadow-md"
              >
                👨‍👩‍👧 Parents Inquiry
              </Link>
              <Link
                to="/#tutor-inquiry"
                onClick={() => setIsOpen(false)}
                className="block bg-[#7a52a3] text-white p-3.5 rounded-2xl text-center font-bold shadow-md"
              >
                🧑‍🏫 Tutor Inquiry
              </Link>
              <a href="tel:+919934985213" className="flex items-center justify-center gap-2 p-3.5 text-slate-700 border border-slate-200 bg-slate-50 rounded-2xl font-bold">
                <Phone className="w-5 h-5 text-primary-600" /> Call Us: +91 99349 85213
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
