import { motion } from 'motion/react';
import { Star, CheckCircle, ShieldCheck, GraduationCap } from 'lucide-react';

export default function About() {
  return (
    <div className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold font-heading text-slate-900 mb-6">About Lifeline Home Tuition</h1>
          <p className="text-xl text-slate-600">
            Patna's most trusted home tuition bureau, committed to providing quality education right at your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Education" className="w-full h-[500px] object-cover" referrerPolicy="no-referrer" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl font-bold text-slate-900 font-heading">Our Mission & Vision</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              At Lifeline Home Tuition, we believe that education is the most powerful weapon which you can use to change the world. Our mission is to bridge the gap between quality education and aspiring students across Patna.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              We started with a simple idea: every child learns differently. A classroom of 40 students cannot cater to individual learning paces. That's why we focus on one-to-one interaction, ensuring personalized attention, quick doubt resolution, and robust conceptual clarity.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="flex gap-4 items-start">
                <ShieldCheck className="w-8 h-8 text-primary-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Trust & Safety</h4>
                  <p className="text-sm text-slate-500">Rigorous background verification for all tutors.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <GraduationCap className="w-8 h-8 text-primary-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Expert Tutors</h4>
                  <p className="text-sm text-slate-500">Highly qualified and experienced educators.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Why Us Detailed */}
        <div className="bg-slate-50 rounded-3xl p-8 md:p-16 border border-slate-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-slate-900">Why We Are Patna's Favorite</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Highly qualified and vetted tutors",
              "Thorough verification (Aadhar, Degree, Address)",
              "Female tutors for female students for comfort",
              "Result-oriented customized teaching plans",
              "Flexible timings matching your schedule",
              "Weekly online test series & regular feedback",
              "Both offline home tuition & online classes",
              "24/7 dedicated support team",
              "Fast 24-hour tutor arrangement & replacement"
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <CheckCircle className="w-5 h-5 text-primary-600 shrink-0" />
                <span className="text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
