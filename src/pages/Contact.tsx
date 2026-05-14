import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi! I would like to get in touch.
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || 'N/A'}

Message:
${form.message}`;

    const url = `https://wa.me/919934985213?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="py-12 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold font-heading text-slate-900 mb-6">Contact Us</h1>
          <p className="text-xl text-slate-600">
            Have questions or need help finding the perfect tutor? We're here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details & Map */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-6">Get In Touch</h3>
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Phone & WhatsApp</h4>
                    <a href="tel:+919934985213" className="text-slate-600 hover:text-primary-600 transition-colors">+91 99349 85213</a>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Email Address</h4>
                    <a href="mailto:info@lifelinetuition.com" className="text-slate-600 hover:text-primary-600 transition-colors">info@lifelinetuition.com</a>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Office Address</h4>
                    <p className="text-slate-600 leading-relaxed">Mourya colony Beur Akhada,<br/>Anisabad,<br/>Patna, Bihar 800002</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed Placeholder */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm h-64 relative bg-slate-200">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115132.86107297379!2d85.06064095408428!3d25.608020764126284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5844f0bb6903%3A0x57ad33b3a655ce54!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1714578168282!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100 flex flex-col gap-6">
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-2">Send us a Message</h3>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-colors bg-slate-50 hover:bg-white" placeholder="Enter your name" required />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-colors bg-slate-50 hover:bg-white" placeholder="10-digit mobile number" required />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Email (Optional)</label>
                <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-colors bg-slate-50 hover:bg-white" placeholder="Enter your email" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Message</label>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-colors bg-slate-50 hover:bg-white resize-none" placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className="w-full bg-[#25d366] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors mt-2">
                Send via WhatsApp <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
