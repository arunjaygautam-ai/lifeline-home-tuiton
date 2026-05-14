import { Phone, BookOpen, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function RightSidebar() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50 p-2">
      <motion.a 
        whileHover={{ scale: 1.1, x: -5 }}
        href="tel:+919934985213" 
        className="w-12 h-12 bg-[#da2a2a] rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white"
        title="Call Us"
      >
        <Phone className="w-5 h-5 fill-current" />
      </motion.a>
      <motion.a 
        whileHover={{ scale: 1.1, x: -5 }}
        href="https://wa.me/919934985213" 
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white"
        title="WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6" fill="white" />
      </motion.a>
      <motion.a 
        whileHover={{ scale: 1.1, x: -5 }}
        href="/#tutor-inquiry" 
        className="w-12 h-12 bg-[#d73f7a] rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white"
        title="Register as Tutor"
      >
        <BookOpen className="w-5 h-5 fill-current" />
      </motion.a>
      <motion.a 
        whileHover={{ scale: 1.1, x: -5 }}
        href="/#parents-inquiry" 
        className="w-12 h-12 bg-[#f4a222] rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white"
        title="Enquire Now"
      >
        <HelpCircle className="w-5 h-5 fill-current border border-white rounded-full p-[1px]" />
      </motion.a>
    </div>
  );
}
