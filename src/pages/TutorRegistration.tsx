import { PenLine, GraduationCap, MapPin, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function TutorRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    phone: '',
    email: '',
    highestQualification: '',
    subjects: '',
    preferredAreas: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'tutorEnquiries'), {
        fullName: `${formData.fullName} (${formData.gender})`,
        classesTeach: formData.subjects,
        experience: formData.highestQualification,
        location: formData.preferredAreas,
        mobile: formData.phone,
        createdAt: serverTimestamp()
      });
      alert('Tutor application submitted successfully!');
      setFormData({
        fullName: '', gender: '', phone: '', email: '', highestQualification: '', subjects: '', preferredAreas: ''
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'tutorEnquiries');
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-24 bg-slate-50 min-h-screen relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-primary-600 -skew-y-3 origin-top-left -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        
        <div className="text-center mb-16">
           <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl mb-6 shadow-sm">
             <GraduationCap className="w-8 h-8" />
           </div>
           <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4 tracking-tight">Join as a Tutor</h1>
           <p className="text-lg text-primary-100 max-w-2xl mx-auto font-medium">
             Empower students in Patna and earn a handsome income by joining Lifeline Home Tuition network.
           </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            
            {/* Sidebar info */}
            <div className="bg-slate-900 text-white p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold font-heading mb-6">Why Join Us?</h3>
                <ul className="flex flex-col gap-5">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 shrink-0" />
                    <span className="text-slate-300">Continuous stream of tuitions near your area.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 shrink-0" />
                    <span className="text-slate-300">Timely and transparent payment system.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 shrink-0" />
                    <span className="text-slate-300">Flexible timings - part time or full time.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-12 text-sm text-slate-400">
                Need help? Contact our support at<br/>
                <a href="tel:+919934985213" className="text-white font-bold hover:text-primary-400">+91 99349 85213</a>
              </div>
            </div>

            {/* Registration Form */}
            <div className="p-8 md:p-12 md:col-span-2">
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-6">Registration Form</h3>
              
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Full Name *</label>
                    <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Gender *</label>
                    <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50" required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Phone Number *</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address (Optional)</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Highest Qualification *</label>
                  <input type="text" placeholder="e.g. B.Tech, M.Sc, B.Ed" value={formData.highestQualification} onChange={(e) => setFormData({...formData, highestQualification: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50" required />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Subjects you can teach *</label>
                  <input type="text" placeholder="e.g. Math, Physics (Class 9-10)" value={formData.subjects} onChange={(e) => setFormData({...formData, subjects: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50" required />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 items-center flex gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" /> Preferred Areas in Patna *
                  </label>
                  <input type="text" placeholder="e.g. Kankarbagh, Boring Road" value={formData.preferredAreas} onChange={(e) => setFormData({...formData, preferredAreas: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50" required />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors mt-4 shadow-md shadow-primary-500/20 disabled:opacity-50">
                  <PenLine className="w-5 h-5" /> {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
