import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
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
        'fixed top-0 w-full z-50 transition-all duration-300 md:px-8',
        scrolled ? 'pt-4' : 'pt-0 md:pt-4'
      )}
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto flex justify-between items-center transition-all duration-300",
          scrolled 
            ? "bg-white/90 backdrop-blur-md shadow-lg shadow-slate-200/50 border border-slate-100 rounded-full px-6 py-3" 
            : "bg-transparent px-4 py-5 md:px-0"
        )}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center font-heading font-bold text-xl group-hover:scale-105 transition-transform shadow-sm">
            LH
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl text-slate-900 leading-tight tracking-tight">Lifeline</span>
            <span className="text-[10px] font-bold text-primary-600 tracking-widest uppercase">Home Tuition</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm font-semibold transition-colors hover:text-primary-600 relative group',
                location.pathname === link.path ? 'text-primary-600' : 'text-slate-600'
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div layoutId="underline" className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary-600 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
          <a href="tel:+919934985213" className="flex items-center gap-2 text-slate-700 hover:text-primary-600 transition-colors text-sm font-bold hidden lg:flex">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary-100">
               <Phone className="w-4 h-4 text-primary-600" />
            </div>
            +91 99349 85213
          </a>
          <div className="w-px h-6 bg-slate-200 hidden lg:block" />
          <Link
            to="/register-tutor"
            className="text-sm font-bold text-slate-700 hover:text-primary-600 transition-colors"
          >
            Become a Tutor
          </Link>
          <Link
            to="/student-inquiry"
            className="bg-primary-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-900 transition-colors shadow-lg shadow-primary-600/20 hover:shadow-slate-900/20 hover:-translate-y-0.5"
          >
            Book Demo
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-slate-600 bg-slate-50 rounded-full border border-slate-200" onClick={() => setIsOpen(!isOpen)}>
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
            className="md:hidden absolute top-[calc(100%+10px)] left-4 right-4 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-2xl z-50"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'text-base font-bold p-3 rounded-2xl transition-colors',
                    location.pathname === link.path ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:bg-slate-50'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              <Link
                to="/register-tutor"
                onClick={() => setIsOpen(false)}
                className="text-base font-bold p-3 text-slate-700 hover:bg-slate-50 rounded-2xl transition-colors"
              >
                Become a Tutor
              </Link>
              <Link
                to="/student-inquiry"
                onClick={() => setIsOpen(false)}
                className="bg-primary-600 text-white p-4 rounded-full text-center font-bold mt-2 shadow-lg shadow-primary-500/20"
              >
                Book Free Demo
              </Link>
              <a href="tel:+919934985213" className="flex items-center justify-center gap-2 p-4 text-slate-700 border border-slate-200 bg-slate-50 rounded-full mt-2 font-bold">
                <Phone className="w-5 h-5 text-primary-600" /> Call Us Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
