import { Phone, Users, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function MobileStickyFooter() {
  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-slate-200 z-[999] flex justify-around items-center pt-2.5 px-2 shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.1)]"
      style={{ paddingBottom: 'calc(max(env(safe-area-inset-bottom), 10px))' }}
    >
      <a href="/#parents-inquiry" className="flex flex-col items-center justify-center w-1/4 group">
        <Users className="w-[26px] h-[26px] text-black mb-1.5 transition-transform group-hover:scale-110" strokeWidth={1.5} />
        <span className="text-[12px] font-bold text-black text-center leading-tight">Parents<br/>Enquiry</span>
      </a>
      
      <a href="tel:+919934985213" className="flex flex-col items-center justify-center w-1/4 group">
        <Phone className="w-[26px] h-[26px] text-red-600 mb-1.5 animate-bounce" strokeWidth={0} fill="currentColor" />
        <span className="text-[12px] font-bold text-red-600 text-center leading-tight mt-0.5">Call</span>
      </a>
      
      <a href="https://wa.me/919934985213" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center w-1/4 group">
        <div className="bg-[#25d366] text-white p-1 rounded-full mb-1 transition-transform group-hover:scale-110">
          <WhatsAppIcon className="w-5 h-5" fill="white" />
        </div>
        <span className="text-[12px] font-bold text-black text-center leading-tight">Chat</span>
      </a>

      <a href="/#tutor-inquiry" className="flex flex-col items-center justify-center w-1/4 group">
        <GraduationCap className="w-[26px] h-[26px] text-black mb-1.5 transition-transform group-hover:scale-110" strokeWidth={1.5} />
        <span className="text-[12px] font-bold text-black text-center leading-tight">Tutor<br/>Enquiry</span>
      </a>
    </div>
  );
}
