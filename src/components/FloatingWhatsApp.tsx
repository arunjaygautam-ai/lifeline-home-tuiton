import { motion } from 'motion/react';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/919934985213"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-green-500/30 hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ y: -5 }}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-7 h-7" fill="white" />
    </motion.a>
  );
}
