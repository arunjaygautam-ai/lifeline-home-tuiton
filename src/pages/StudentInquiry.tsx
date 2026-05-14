import { CalendarClock, Contact, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function StudentInquiry() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    contactNumber: '',
    address: '',
    classVal: '',
    board: '',
    subjects: '',
    preference: 'any',
    mode: 'home'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'studentEnquiries'), {
        parentsName: formData.studentName,
        mobile: formData.contactNumber,
        location: formData.address,
        studentClass: formData.classVal,
        school: formData.board,
        subjects: `${formData.subjects} | Pref: ${formData.preference} | Mode: ${formData.mode}`,
        createdAt: serverTimestamp()
      });
      alert('Demo class request submitted successfully!');
      setFormData({
        studentName: '', contactNumber: '', address: '', classVal: '', board: '', subjects: '', preference: 'any', mode: 'home'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'studentEnquiries');
      alert('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-24 bg-slate-50 min-h-screen relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary-100 rounded-full blur-[100px] opacity-60 z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-blue-100 rounded-full blur-[100px] opacity-60 z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center w-16 h-16 bg-white border border-primary-100 text-primary-600 rounded-2xl mb-6 shadow-sm">
             <CalendarClock className="w-8 h-8" />
           </div>
           <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-4 tracking-tight">Book Free Demo Class</h1>
           <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
             Fill out the form below to request a tutor. We will arrange a free trial class within 24 hours.
           </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-14 relative"
        >
          <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
            
            {/* Contact Details */}
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold font-heading text-slate-900 mb-5 border-b border-slate-100 pb-3">
                <Contact className="text-primary-600 w-5 h-5" /> Guardian / Student Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Student Name *</label>
                  <input type="text" value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 transition-colors" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Contact Number *</label>
                  <input type="tel" value={formData.contactNumber} onChange={(e) => setFormData({...formData, contactNumber: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 transition-colors" required />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Complete Address (in Patna) *</label>
                  <input type="text" placeholder="e.g. Kankarbagh Main Road..." value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 transition-colors" required />
                </div>
              </div>
            </div>

            {/* Tuition Requirements */}
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold font-heading text-slate-900 mb-5 border-b border-slate-100 pb-3">
                <BookOpen className="text-primary-600 w-5 h-5" /> Requirement Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Class *</label>
                  <select value={formData.classVal} onChange={(e) => setFormData({...formData, classVal: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 transition-colors" required>
                    <option value="">Select Class</option>
                    <option value="1-5">Class 1 to 5</option>
                    <option value="6-8">Class 6 to 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                    <option value="competitive">JEE / NEET</option>
                    <option value="other">Other / Spoken English</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Board *</label>
                  <select value={formData.board} onChange={(e) => setFormData({...formData, board: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 transition-colors" required>
                    <option value="">Select Board</option>
                    <option value="cbse">CBSE</option>
                    <option value="icse">ICSE</option>
                    <option value="bseb">Bihar Board (BSEB)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Subjects Needed *</label>
                  <input type="text" placeholder="e.g. Mathematics and Science" value={formData.subjects} onChange={(e) => setFormData({...formData, subjects: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 transition-colors" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Tutor Preference</label>
                  <select value={formData.preference} onChange={(e) => setFormData({...formData, preference: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 transition-colors">
                    <option value="any">Any (Male or Female)</option>
                    <option value="female">Female Tutor Preferred</option>
                    <option value="male">Male Tutor Preferred</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Mode of Class</label>
                  <select value={formData.mode} onChange={(e) => setFormData({...formData, mode: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 transition-colors">
                    <option value="home">Home Tuition (Offline)</option>
                    <option value="online">Online Tuition</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 transform hover:-translate-y-0.5 text-lg mt-4 disabled:opacity-50">
              {isSubmitting ? 'Submitting...' : 'Request Demo Class'}
            </button>
            <p className="text-center text-xs text-slate-500 mt-2">
              By submitting this form, you agree to our terms. We will contact you shortly to confirm the details.
            </p>
          </form>

        </motion.div>
      </div>
    </div>
  );
}
