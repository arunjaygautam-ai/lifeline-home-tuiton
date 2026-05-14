import React, { useEffect, useState } from 'react';
import { db, auth, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { LogOut, BookOpen, AlertCircle } from 'lucide-react';

type StudentEnquiry = { id: string; parentsName: string; studentClass: string; subjects: string; school: string; location: string; mobile: string; createdAt: any };
type TutorEnquiry = { id: string; fullName: string; classesTeach: string; experience: string; location: string; mobile: string; createdAt: any };

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingA, setLoadingA] = useState(true);
  
  const [studentEnquiries, setStudentEnquiries] = useState<StudentEnquiry[]>([]);
  const [tutorEnquiries, setTutorEnquiries] = useState<TutorEnquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'students' | 'tutors'>('students');

  // Email/Password state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoadingA(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (user?.email?.toLowerCase() === 'arunjaygautam@gmail.com') {
      const unsubStudents = onSnapshot(collection(db, 'studentEnquiries'), (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StudentEnquiry));
        setStudentEnquiries(data.sort((a,b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()));
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'studentEnquiries');
      });

      const unsubTutors = onSnapshot(collection(db, 'tutorEnquiries'), (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TutorEnquiry));
        setTutorEnquiries(data.sort((a,b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()));
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'tutorEnquiries');
      });

      return () => {
        unsubStudents();
        unsubTutors();
      };
    }
  }, [user]);

  const handleGoogleLogin = async () => {
    setLoginError('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch(err: any) {
      console.error(err);
      if (err.code === 'auth/unauthorized-domain') {
        setLoginError('This domain is not authorized. Please go to Firebase Console -> Authentication -> Settings -> Authorized Domains and add your Netlify domain.');
      } else {
        setLoginError(err.message || 'Login failed');
      }
    }
  };

  const [isRegistering, setIsRegistering] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch(err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        setLoginError('Invalid credentials. If this is your first time, click "Register Instead" below.');
      } else {
        setLoginError(err.message || 'Login/Register failed. Make sure you have enabled Email/Password auth in Firebase Console.');
      }
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      setLoginError('Please enter your email above first, then click Forgot Password again.');
      return;
    }
    setLoginError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setLoginError('Password reset email sent! Check your inbox to set a password, then log in here.');
    } catch(err: any) {
      setLoginError(err.message || 'Failed to send reset email.');
    }
  };

  if (loadingA) return <div className="p-8 text-center text-slate-500">Loading auth...</div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Access</h1>
          <p className="text-slate-500 mb-6">Please sign in to view enquiries.</p>
          
          {loginError && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm flex items-start text-left">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <button onClick={handleGoogleLogin} className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 mb-6">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">Or sign in with email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4 text-left">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email (Admin)</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors mt-2">
              {isRegistering ? 'Register Admin' : 'Sign in with Password'}
            </button>
          </form>
          
          <button 
            type="button"
            onClick={handleResetPassword}
            className="w-full text-center mt-4 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Forgot Password? Set a new one here
          </button>

          <button 
            onClick={() => setIsRegistering(!isRegistering)} 
            className="w-full text-center mt-2 text-sm text-slate-500 hover:text-primary-600 transition-colors"
          >
            {isRegistering ? 'Already have an account? Sign in' : "First time? Register instead"}
          </button>
        </div>
      </div>
    );
  }

  if (user.email?.toLowerCase() !== 'arunjaygautam@gmail.com') {
    return (
      <div className="p-8 text-center bg-slate-50 min-h-screen">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-600">Unauthorized Access</h2>
          <p className="mt-2 text-slate-600 mb-6 font-medium">{user.email}</p>
          <p className="mt-2 text-slate-500 mb-8 text-sm">
            This account is not authorized as an admin. Only the admin email can view enquiries.
          </p>
          <button onClick={() => signOut(auth)} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-3 px-4 rounded-xl transition-colors">
            Sign out and try another account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary-600" /> Admin Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full hidden sm:inline-block">{user.email}</span>
          <button onClick={() => signOut(auth)} className="text-slate-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 flex items-center gap-2" title="Sign out">
            <span className="text-sm font-medium sm:hidden block">Sign Out</span>
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row gap-4 mb-8 border-b border-slate-200 pb-4">
          <button 
            onClick={() => setActiveTab('students')}
            className={`px-5 py-2.5 rounded-full font-medium transition-colors ${activeTab === 'students' ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
          >
            Student Enquiries ({studentEnquiries.length})
          </button>
          <button 
            onClick={() => setActiveTab('tutors')}
            className={`px-5 py-2.5 rounded-full font-medium transition-colors ${activeTab === 'tutors' ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
          >
            Tutor Enquiries ({tutorEnquiries.length})
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {activeTab === 'students' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Parents Name</th>
                    <th className="p-4 font-semibold">Student Class</th>
                    <th className="p-4 font-semibold">Subjects</th>
                    <th className="p-4 font-semibold">School</th>
                    <th className="p-4 font-semibold">Location</th>
                    <th className="p-4 font-semibold">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {studentEnquiries.length === 0 ? (
                    <tr><td colSpan={7} className="p-8 text-center text-slate-500">No student enquiries yet.</td></tr>
                  ) : (
                    studentEnquiries.map(enq => (
                      <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 whitespace-nowrap">{enq.createdAt?.toDate ? new Date(enq.createdAt.toDate()).toLocaleDateString() : 'N/A'}</td>
                        <td className="p-4 font-medium">{enq.parentsName}</td>
                        <td className="p-4">{enq.studentClass}</td>
                        <td className="p-4 max-w-xs truncate" title={enq.subjects}>{enq.subjects}</td>
                        <td className="p-4">{enq.school}</td>
                        <td className="p-4">{enq.location}</td>
                        <td className="p-4 font-medium">{enq.mobile}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Tutor Name</th>
                    <th className="p-4 font-semibold">Classes/Subjects</th>
                    <th className="p-4 font-semibold">Experience</th>
                    <th className="p-4 font-semibold">Location</th>
                    <th className="p-4 font-semibold">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {tutorEnquiries.length === 0 ? (
                    <tr><td colSpan={6} className="p-8 text-center text-slate-500">No tutor enquiries yet.</td></tr>
                  ) : (
                    tutorEnquiries.map(enq => (
                      <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 whitespace-nowrap">{enq.createdAt?.toDate ? new Date(enq.createdAt.toDate()).toLocaleDateString() : 'N/A'}</td>
                        <td className="p-4 font-medium">{enq.fullName}</td>
                        <td className="p-4 max-w-xs truncate" title={enq.classesTeach}>{enq.classesTeach}</td>
                        <td className="p-4">{enq.experience}</td>
                        <td className="p-4">{enq.location}</td>
                        <td className="p-4 font-medium">{enq.mobile}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
