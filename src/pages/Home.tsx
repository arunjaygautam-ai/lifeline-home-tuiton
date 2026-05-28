import { motion } from 'motion/react';
import { 
  Users, BookOpen, Star, Clock, 
  ChevronRight, PhoneCall, CheckCircle2,
  ChevronDown, MessageCircle, ArrowRight,
  ChevronUp, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [studentForm, setStudentForm] = useState({ studentName: '', studentClass: '', subjects: '', school: '', location: '', mobile: '' });
  const [tutorForm, setTutorForm] = useState({ fullName: '', classesTeach: '', subjects: '', experience: '', location: '', mobile: '' });
  const [isSubmittingStudent, setIsSubmittingStudent] = useState(false);
  const [isSubmittingTutor, setIsSubmittingTutor] = useState(false);

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.studentName || !studentForm.mobile) return alert("Please fill all required fields");
    setIsSubmittingStudent(true);
    try {
      await addDoc(collection(db, 'studentEnquiries'), {
        ...studentForm,
        createdAt: serverTimestamp()
      });
      alert('Enquiry submitted successfully!');
      setStudentForm({ studentName: '', studentClass: '', subjects: '', school: '', location: '', mobile: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'studentEnquiries');
      alert('Error submitting enquiry. Please try again.');
    } finally {
      setIsSubmittingStudent(false);
    }
  };

  const handleTutorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorForm.fullName || !tutorForm.mobile) return alert("Please fill all required fields");
    setIsSubmittingTutor(true);
    try {
      await addDoc(collection(db, 'tutorEnquiries'), {
        ...tutorForm,
        createdAt: serverTimestamp()
      });
      alert('Tutor registration enquiry submitted successfully!');
      setTutorForm({ fullName: '', classesTeach: '', subjects: '', experience: '', location: '', mobile: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'tutorEnquiries');
      alert('Error submitting enquiry. Please try again.');
    } finally {
      setIsSubmittingTutor(false);
    }
  };

  const faqs = [
    { q: "How do I book a home tutor through Lifeline Home Tuition?", a: "You can call or fill out our online enquiry form. Based on your child's class, subject, and location, we will match you with a suitable and verified tutor within 24-48 hours." },
    { q: "Are your tutors qualified and verified?", a: "Yes, we thoroughly verify the educational qualifications, background, and identity of every tutor before they join our network." },
    { q: "Can I choose between a male or female tutor?", a: "Absolutely. You can specify your preference when submitting your enquiry, and we will provide a tutor accordingly." },
    { q: "What classes and subjects do you cover?", a: "We cover all subjects for Nursery to Class 12, including specialized tutors for competitive exams like JEE, NEET, and language/computer courses." },
    { q: "Do you offer demo classes before finalizing a tutor?", a: "Yes, we offer a free demo class to ensure you and your child are entirely satisfied with the tutor's teaching methodology." }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* Top Banner exactly like the screenshot */}
      <div className="w-full bg-[#ec2d5e] text-white text-center py-2.5 font-bold md:text-lg">
        Home Tuition in Patna
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full pt-6 pb-10 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold font-heading text-slate-900 leading-[1.2] mb-3">
              Top-Rated Home Tuition in <span className="text-[#ec2d5e]">Patna</span>
            </h1>
            <p className="text-lg md:text-xl font-bold text-[#ec2d5e]">
              1-on-1 Classes | All Classes and All Subjects | Serving Patna since 1990
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:gap-8 max-w-6xl mx-auto">
            
            {/* Top Image/Banner side (styled like screenshot) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="w-full bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <img 
                src="/banner.png.jpeg" 
                alt="Lifeline Home Tuition - Top Rated Home Tutors in Patna" 
                className="w-full h-auto object-contain" 
              />
            </motion.div>

            {/* Right Form Side */}
            <motion.div 
              id="parents-inquiry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full md:max-w-xl mx-auto bg-[#7a52a3] rounded-2xl p-4 md:p-6 shadow-xl text-white"
            >
              <h2 className="text-xl font-bold text-center mb-4" style={{ color: 'white' }}>Parents Inquiry</h2>
              <form className="flex flex-col gap-3" onSubmit={handleStudentSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold mb-1 block text-sm">Student's Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter Student's name" value={studentForm.studentName} onChange={(e) => setStudentForm({...studentForm, studentName: e.target.value})} required className="w-full p-2 rounded text-sm font-medium text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec2d5e]" />
                  </div>
                  <div>
                    <label className="font-bold mb-1 block text-sm">Student Class <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Student Class" value={studentForm.studentClass} onChange={(e) => setStudentForm({...studentForm, studentClass: e.target.value})} required className="w-full p-2 rounded text-sm font-medium text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec2d5e]" />
                  </div>
                  <div>
                    <label className="font-bold mb-1 block text-sm">Subjects you want to study <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Subject you want to study" value={studentForm.subjects} onChange={(e) => setStudentForm({...studentForm, subjects: e.target.value})} required className="w-full p-2 rounded text-sm font-medium text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec2d5e]" />
                  </div>
                  <div>
                    <label className="font-bold mb-1 block text-sm">School <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="School Name" value={studentForm.school} onChange={(e) => setStudentForm({...studentForm, school: e.target.value})} required className="w-full p-2 rounded text-sm font-medium text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec2d5e]" />
                  </div>
                  <div>
                    <label className="font-bold mb-1 block text-sm">Location in Patna <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Location in Patna" value={studentForm.location} onChange={(e) => setStudentForm({...studentForm, location: e.target.value})} required className="w-full p-2 rounded text-sm font-medium text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec2d5e]" />
                  </div>
                  <div>
                    <label className="font-bold mb-1 block text-sm">Mobile Number <span className="text-red-500">*</span></label>
                    <input type="tel" placeholder="10-digit mobile number" value={studentForm.mobile} onChange={(e) => setStudentForm({...studentForm, mobile: e.target.value})} required className="w-full p-2 rounded text-sm font-medium text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec2d5e]" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <input type="checkbox" id="terms" className="w-4 h-4 rounded text-[#ec2d5e]" required defaultChecked />
                  <label htmlFor="terms" className="text-xs font-medium text-white cursor-pointer">
                    Terms and Conditions applied
                  </label>
                </div>
                <button type="submit" disabled={isSubmittingStudent} className="w-full bg-[#ec2d5e] hover:bg-[#d1214d] text-white font-bold py-2.5 rounded mt-1 transition-colors disabled:opacity-50 text-sm">
                  {isSubmittingStudent ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY PARENTS TRUST */}
      <section className="pt-4 pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">Why Parents Trust Lifeline Home Tuition</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-8 text-center flex flex-col justify-center items-center h-48 border border-slate-100">
              <div className="text-4xl font-bold text-[#ec2d5e] mb-3">35+ Years</div>
              <div className="text-slate-700 font-bold">Teaching Experience</div>
            </div>
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-8 text-center flex flex-col justify-center items-center h-48 border border-slate-100">
              <div className="text-4xl font-bold text-[#ec2d5e] mb-3">1000+</div>
              <div className="text-slate-700 font-bold">Students Taught in Patna</div>
            </div>
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-8 text-center flex flex-col justify-center items-center h-48 border border-slate-100">
              <div className="text-4xl font-bold text-[#ec2d5e] mb-3">100%</div>
              <div className="text-slate-700 font-bold">Parent Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY BEST CHOICE */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-3xl font-bold text-slate-900 mb-4">Why Lifeline is the Best Choice for Home Tuition in Patna?</h2>
            <p className="text-[#ec2d5e] font-bold text-lg max-w-3xl mx-auto">Trusted, experienced tutor delivering personalized learning right at your doorstep.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-0 bg-[#fffdf0] border border-orange-100">
            {/* Left Image Side */}
            <div className="w-full md:w-1/2 relative min-h-[400px]">
              <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" alt="Home Teaching" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                 <div className="p-6 text-white w-full">
                    <div className="font-bold text-lg bg-[#ec2d5e] w-max px-3 py-1 mb-4 rounded-md shadow uppercase">Hiring Lifeline tutors means</div>
                    <ul className="space-y-2 font-bold mb-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-white" /> Expertise (Qualified)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-white" /> Trust & emotional safety (Caring)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-white" /> Dedication (Committed)</li>
                    </ul>
                    <a href="/#parents-inquiry" className="bg-[#ec2d5e] hover:bg-[#d1214d] text-white px-6 py-2 rounded-full font-bold inline-block shadow-md transition-colors">
                      REGISTER NOW
                    </a>
                 </div>
              </div>
            </div>
            {/* Right List Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <p className="text-slate-700 font-bold text-lg mb-6 leading-relaxed">
                Lifeline offers expert <span className="text-[#ec2d5e]">home tuition in Patna</span> with personalized attention, a strong academic background, and a proven track record of success. Trusted, one-to-one learning experience tailored for your child's growth.
              </p>
              <ul className="space-y-4">
                {[
                  "Qualified tutor for Classes 1-12",
                  "One-to-one focus for your child",
                  "Safe, verified, and flexible timings",
                  "Affordable monthly tuition plans"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#10b981] shrink-0" />
                    <span className="text-slate-800 font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMIC SUPPORT */}
      <section className="py-16 bg-[#ec2d5e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Academic Support</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg overflow-hidden border-2 border-white shadow-lg">
              <div className="h-48 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80" alt="Academic" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 bg-white text-center border-t-4 border-blue-500">
                <h3 className="text-lg font-bold text-slate-800">📘 Academic Support</h3>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden border-2 border-white shadow-lg">
              <div className="h-48 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80" alt="Language" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="bg-red-500 text-white p-1 rounded-full"><MessageCircle className="w-4 h-4 fill-current"/></div>
                  <div className="bg-yellow-400 text-white p-1 rounded-full"><MessageCircle className="w-4 h-4 fill-current"/></div>
                </div>
              </div>
              <div className="p-4 bg-white text-center border-t-4 border-purple-500">
                <h3 className="text-lg font-bold text-slate-800">🗣️ Language & Spoken English</h3>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden border-2 border-white shadow-lg">
              <div className="h-48 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" alt="Computer" className="w-full h-full object-cover" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="text-white text-4xl opacity-50">🎓</div>
                </div>
              </div>
              <div className="p-4 bg-white text-center border-t-4 border-cyan-500">
                <h3 className="text-lg font-bold text-slate-800">💻 Computer Courses</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-3xl font-bold text-slate-900 text-center mb-16">
            <span className="text-[#ec2d5e]">Our</span> Testimonials
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-between items-center text-center">
              <p className="text-slate-800 italic font-bold leading-relaxed mb-6">
                "The customized approach gives me flexibility and lets me learn at my own pace... It's a smooth experience every time."
              </p>
              <div>
                <div className="text-blue-500 font-bold">— Ms. Swati Sinha</div>
                <div className="text-slate-600 font-bold text-sm">Science & Hindi Tutor</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-between items-center text-center transform scale-105 z-10">
              <p className="text-slate-800 italic font-bold leading-relaxed mb-6">
                "Safe, verified, and skilled tutors — that's what Lifeline delivered. My daughter actually enjoys studying now."
              </p>
              <div>
                <div className="text-blue-500 font-bold">— Mrs. Sunita Sharma</div>
                <div className="text-slate-600 font-bold text-sm">Parents</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-between items-center text-center">
              <p className="text-slate-800 italic font-bold leading-relaxed mb-6">
                "Lifeline Tuition matched us with a highly qualified tutor within two days. My son's confidence in Science has improved tremendously!"
              </p>
              <div>
                <div className="text-blue-500 font-bold">— Mrs. Neha Singh</div>
                <div className="text-slate-600 font-bold text-sm">Parents</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MALE FEMALE TUTORS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">🧑‍🏫 👩‍🏫 Male & Female Tutors Available</h2>
            <p className="text-slate-700 font-bold text-base md:text-lg">Choose your comfort & schedule. Expert tutors at your doorstep in Patna.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden relative shadow-md">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#ec2d5e]"></div>
              <div className="p-6 md:p-8 pl-8 md:pl-10">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">👩‍🏫 Female Tutors</h3>
                <div className="w-full h-64 md:h-72 bg-slate-200 mb-6 overflow-hidden border-4 border-white shadow-sm flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80" alt="Female Tutor" className="w-full h-full object-cover object-[center_15%]" />
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 font-bold text-slate-700 text-sm md:text-base"><span className="text-lg">👩‍🏫</span> 200+ Verified Female Tutors</li>
                  <li className="flex items-center gap-3 font-bold text-slate-700 text-sm md:text-base"><CheckCircle2 className="w-5 h-5 text-green-500" /> Trusted by 100+ Patna parents</li>
                  <li className="flex items-center gap-3 font-bold text-slate-700 text-sm md:text-base"><span className="text-lg">🧘‍♀️</span> Calm, patient, and safety-first</li>
                  <li className="flex items-center gap-3 font-bold text-slate-700 text-sm md:text-base"><span className="text-lg">📚</span> Ideal for primary & middle school</li>
                </ul>
                <a href="/#parents-inquiry" className="block text-center bg-[#ec2d5e] hover:bg-[#d1214d] text-white font-bold py-3 rounded-lg transition-colors mt-auto">
                  Enquire Now
                </a>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden relative shadow-md">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-500"></div>
              <div className="p-6 md:p-8 pl-8 md:pl-10">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">🧑‍🏫 Male Tutors</h3>
                <div className="w-full h-64 md:h-72 bg-slate-200 mb-6 overflow-hidden border-4 border-white shadow-sm flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80" alt="Male Tutor" className="w-full h-full object-cover object-[center_20%]" />
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 font-bold text-slate-700 text-sm md:text-base"><span className="text-lg">🧑‍🏫</span> 500+ Verified Male Tutors</li>
                  <li className="flex items-center gap-3 font-bold text-slate-700 text-sm md:text-base"><CheckCircle2 className="w-5 h-5 text-green-500" /> Subject experts for senior classes</li>
                  <li className="flex items-center gap-3 font-bold text-slate-700 text-sm md:text-base"><span className="w-5 h-5 bg-blue-400 rounded-sm inline-block"></span> Strong in Math, Science, English</li>
                  <li className="flex items-center gap-3 font-bold text-slate-700 text-sm md:text-base"><Clock className="w-5 h-5 text-slate-500" /> Flexible evening time slots</li>
                </ul>
                <a href="/#parents-inquiry" className="block text-center bg-[#ec2d5e] hover:bg-[#d1214d] text-white font-bold py-3 rounded-lg transition-colors mt-auto">
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP LOCALITIES IN PATNA */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 flex justify-center items-center gap-2">
              <MapPin className="w-8 h-8 text-[#ec2d5e]" /> Top Localities We Cover in Patna
            </h2>
            <p className="text-slate-600 text-lg">We provide expert home tutors across all major areas in Patna.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Boring Road", "Kankarbagh", "Rajendra Nagar", "Patliputra Colony", 
              "Anisabad", "Phulwari Sharif", "Bailey Road", "Gola Road",
              "Jagdeo Path", "Saguna More", "Danapur", "Digha",
              "Ashiana Nagar", "Kurji", "SK Puri", "Kadamkuan"
            ].map((area, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 hover:shadow-md transition-shadow hover:border-[#ec2d5e] group">
                <MapPin className="w-5 h-5 text-slate-400 group-hover:text-[#ec2d5e] transition-colors" />
                <span className="font-bold text-slate-700 group-hover:text-slate-900">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TUTOR ENQUIRY FORM */}
      <section id="tutor-inquiry" className="py-8 bg-white">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-[#7a52a3] rounded-2xl p-4 md:p-6 shadow-xl text-white">
            <h2 className="text-xl font-bold text-center mb-4" style={{ color: 'white' }}>Tutor Inquiry</h2>
            <form className="flex flex-col gap-3" onSubmit={handleTutorSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold mb-1 block text-sm">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter Full name" value={tutorForm.fullName} onChange={(e) => setTutorForm({...tutorForm, fullName: e.target.value})} required className="w-full p-2 rounded text-sm font-medium text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec2d5e]" />
                </div>
                <div>
                  <label className="font-bold mb-1 block text-sm">Classes You Teach <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Class you teach" value={tutorForm.classesTeach} onChange={(e) => setTutorForm({...tutorForm, classesTeach: e.target.value})} required className="w-full p-2 rounded text-sm font-medium text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec2d5e]" />
                </div>
                <div>
                  <label className="font-bold mb-1 block text-sm">Subjects you teach <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Subjects you teach" value={tutorForm.subjects} onChange={(e) => setTutorForm({...tutorForm, subjects: e.target.value})} required className="w-full p-2 rounded text-sm font-medium text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec2d5e]" />
                </div>
                <div>
                  <label className="font-bold mb-1 block text-sm">Experience (in years) <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Experience" value={tutorForm.experience} onChange={(e) => setTutorForm({...tutorForm, experience: e.target.value})} required className="w-full p-2 rounded text-sm font-medium text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec2d5e]" />
                </div>
                <div>
                  <label className="font-bold mb-1 block text-sm">Location in Patna <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Location in Patna" value={tutorForm.location} onChange={(e) => setTutorForm({...tutorForm, location: e.target.value})} required className="w-full p-2 rounded text-sm font-medium text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec2d5e]" />
                </div>
                <div>
                  <label className="font-bold mb-1 block text-sm">Mobile Number <span className="text-red-500">*</span></label>
                  <input type="tel" placeholder="10-digit mobile number" value={tutorForm.mobile} onChange={(e) => setTutorForm({...tutorForm, mobile: e.target.value})} required className="w-full p-2 rounded text-sm font-medium text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ec2d5e]" />
                </div>
              </div>

              <button type="submit" disabled={isSubmittingTutor} className="w-full bg-[#ec2d5e] hover:bg-[#d1214d] text-white font-bold py-2.5 rounded mt-2 transition-colors disabled:opacity-50 text-sm">
                {isSubmittingTutor ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="pt-8 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-[#ec2d5e]">Frequently</span> Asked Questions
          </h2>
          
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-slate-200 rounded overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 text-left font-bold transition-colors",
                      isOpen ? "bg-black text-white" : "bg-slate-50 text-slate-800 hover:bg-slate-100"
                    )}
                  >
                    <span className="flex items-center gap-2">
                       {index === 0 ? "💬" : index === 1 ? "🆓" : index === 2 ? "📋" : index === 3 ? "🎯" : "📝"} {faq.q}
                    </span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-blue-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white text-slate-800 font-bold flex items-start gap-3 border-t border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-[#25d366] shrink-0 mt-0.5" />
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
