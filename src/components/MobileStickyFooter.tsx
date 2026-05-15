const ParentsCustomIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" fill="black" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M48 64 h256 c26 0 48 22 48 48 v128 c0 26 -22 48 -48 48 h-80 l-64 80 v-80 h-112 c-26 0 -48 -22 -48 -48 v-128 c0 -26 22 -48 48 -48 z" />
    <rect x="96" y="112" width="160" height="24" fill="white" rx="8" />
    <rect x="96" y="168" width="160" height="24" fill="white" rx="8" />
    <rect x="96" y="224" width="96" height="24" fill="white" rx="8" />
    <circle cx="368" cy="304" r="76" fill="white" />
    <path d="M216 480c0-80 64-144 144-144h16c80 0 144 64 144 144v16H216v-16z" fill="white" />
    <circle cx="368" cy="304" r="56" fill="black" />
    <path d="M240 480c0-64 56-112 120-112h16c64 0 120 48 120 112v16H240v-16z" fill="white" stroke="black" strokeWidth="24" strokeLinejoin="round" />
    <path d="M352 384h32l-8 48 16 40-24 24-24-24 16-40z" fill="black" />
  </svg>
);

const CallCustomIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
    <path d="M320 160 A128 128 0 0 1 448 288" stroke="currentColor" strokeWidth="32" strokeLinecap="round" fill="none"/>
    <path d="M384 100 A224 224 0 0 1 512 288" stroke="currentColor" strokeWidth="32" strokeLinecap="round" fill="none"/>
  </svg>
);

const WhatsAppCustomIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M256 32c-123.7 0-224 100.3-224 224c0 39.5 10.3 76.6 28.5 109L28 480l118.8-31.2c31.1 16.5 66.5 25.2 103.2 25.2c123.7 0 224-100.3 224-224S379.7 32 256 32z" fill="#25d366" />
    <path d="M371.4 316.5c-6.1-3.1-36.4-18-42-20.1c-5.7-2-9.8-3.1-13.9 3.1c-4.1 6.1-15.9 20.1-19.5 24.2c-3.7 4.1-7.3 4.6-13.5 1.5c-6.1-3.1-26-9.6-49.5-30.6c-18.3-16.4-30.7-36.7-34.3-42.8c-3.7-6.1-.4-9.4 2.7-12.5c2.8-2.8 6.1-7.1 9.2-10.7c3.1-3.6 4.1-6.1 6.1-10.2c2-4.1 1-7.6-.5-10.7c-1.5-3.1-13.9-33.5-19-45.9c-5-12.1-10-10.4-13.9-10.6c-3.6-.2-7.8-.2-11.9-.2c-4.1 0-10.7 1.5-16.3 7.6c-5.6 6.1-21.4 20.9-21.4 51c0 30.1 21.9 59.2 25 63.2c3.1 4.1 43.1 65.8 104.4 92.2c14.6 6.3 26 10.1 34.9 12.9c14.6 4.6 27.9 4 38.6 2.4c11.9-1.8 36.4-14.9 41.5-29.3c5.1-14.4 5.1-26.8 3.6-29.3c-1.5-2.6-5.6-4.1-11.7-7.2z" fill="white" />
  </svg>
);

const TutorCustomIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" fill="black" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="256" cy="176" r="96" />
    <path d="M256 304c-87 0-160 70-160 156v20h320v-20c0-86-73-156-160-156z" />
    <path d="M128 176c0-70 58-128 128-128s128 58 128 128" stroke="black" strokeWidth="24" fill="none" />
    <rect x="104" y="144" width="24" height="64" rx="12" />
    <rect x="384" y="144" width="24" height="64" rx="12" />
    <path d="M396 176c0 60-30 110-80 110" stroke="white" strokeWidth="24" fill="none" strokeLinecap="round" />
    <circle cx="316" cy="286" r="16" fill="white" />
  </svg>
);

export default function MobileStickyFooter() {
  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-slate-200 z-[999] flex justify-between items-center pt-3 pb-2 px-4 shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.1)]"
      style={{ paddingBottom: 'calc(max(env(safe-area-inset-bottom), 12px))' }}
    >
      <a href="/#parents-inquiry" className="flex flex-col items-center justify-center flex-1 group">
        <ParentsCustomIcon className="w-9 h-9 mb-1" />
        <span className="text-[14px] font-bold text-black text-center leading-tight">Parents<br/>Enquiry</span>
      </a>
      
      <a href="tel:+919934985213" className="flex flex-col items-center justify-center flex-1 group">
        <CallCustomIcon className="w-9 h-9 mb-1 text-red-600 animate-bounce" />
        <span className="text-[14px] font-bold text-black text-center leading-tight mt-[14px]">Call</span>
      </a>
      
      <a href="https://wa.me/919934985213" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center flex-1 group">
        <WhatsAppCustomIcon className="w-9 h-9 mb-1 shadow-sm rounded-full" />
        <span className="text-[14px] font-bold text-black text-center leading-tight mt-[14px]">Chat</span>
      </a>

      <a href="/#tutor-inquiry" className="flex flex-col items-center justify-center flex-1 group">
        <TutorCustomIcon className="w-9 h-9 mb-1" />
        <span className="text-[14px] font-bold text-black text-center leading-tight">Tutor<br/>Enquiry</span>
      </a>
    </div>
  );
}
