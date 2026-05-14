import { BookOpen, MonitorPlay, Users, Target, Code, Calculator, Atom, Languages, BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const services = [
  { icon: Calculator, title: 'Mathematics', desc: 'From basic arithmetic to advanced calculus, tailored to board syllabus (CBSE, ICSE, BSEB).' },
  { icon: Atom, title: 'Physics & Chemistry', desc: 'Conceptual clarity with practical examples for Class 9-12 students.' },
  { icon: Target, title: 'IIT-JEE / NEET', desc: 'Specialized foundation and advanced coaching by expert faculties for competitive exams.' },
  { icon: Languages, title: 'Spoken English', desc: 'Improve fluency, grammar, and confidence with personalized communication classes.' },
  { icon: Code, title: 'Computer & Coding', desc: 'Introduction to programming (Python, Java), web development, and school computer science.' },
  { icon: BrainCircuit, title: 'Biology', desc: 'In-depth pre-medical biology covering botany and zoology with detailed diagrams.' },
];

export default function Services() {
  return (
    <div className="py-12 md:py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Decor */}
        <div className="absolute top-0 right-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-primary-600 font-bold text-xs uppercase tracking-widest mb-6">
            Our Expertise
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-slate-900 mb-6 leading-tight tracking-tight">Our Services <br/><span className="text-primary-600">&</span> Subjects</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            We provide expert tutors for all major subjects, ensuring your child gets the focus and methodology they need to excel.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 cursor-default">
          {services.map((svc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-slate-100 p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-primary-600/10 transition-all group overflow-hidden relative z-10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-8 transition-transform group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white group-hover:rotate-3 shadow-sm">
                <svc.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">{svc.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium">{svc.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Learning Modes split container */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-16 overflow-hidden relative shadow-xl shadow-slate-200/50">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-50 rounded-full blur-[100px] opacity-70 -z-10 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading text-slate-900 mb-6 leading-tight tracking-tight">Flexible Learning Paths</h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                Choose the mode of education that best fits your child's learning style and your family's schedule. Both modes guarantee the same standard of Lifeline excellence.
              </p>
              
              <div className="flex flex-col gap-8">
                <div className="flex gap-5 group">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-2 font-heading">Home Tuition (Offline)</h4>
                    <p className="text-slate-600 leading-relaxed">Tutor visits your home. Best for young students requiring strict monitoring.</p>
                  </div>
                </div>
                <div className="flex gap-5 group">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MonitorPlay className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-2 font-heading">Online Tuition (1-on-1)</h4>
                    <p className="text-slate-600 leading-relaxed">Live interactive via Zoom/Meet. Great for saving travel time and flexible hours.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center bg-slate-900 text-white rounded-[2rem] p-10 md:p-14 shadow-2xl relative overflow-hidden text-center transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 hover:shadow-slate-900/50">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
              <BookOpen className="w-20 h-20 text-primary-400 mb-8 relative z-10" />
              <h3 className="text-3xl font-bold font-heading mb-4 relative z-10">Start Learning Today</h3>
              <p className="text-slate-300 mb-10 relative z-10 text-lg">Book a free demo class to experience our teaching methodology firsthand.</p>
              <Link to="/#parents-inquiry" className="bg-primary-600 block w-full py-4 rounded-xl font-bold text-center text-lg hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/30 relative z-10 hover:-translate-y-1">
                Request Free Demo
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
