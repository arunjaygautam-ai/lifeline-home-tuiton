import React, { useEffect, useState } from 'react';
import { db, auth, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { LogOut, User as UserIcon, BookOpen } from 'lucide-react';

type StudentEnquiry = { id: string; parentsName: string; studentClass: string; subjects: string; school: string; location: string; mobile: string; createdAt: any };
type TutorEnquiry = { id: string; fullName: string; classesTeach: string; experience: string; location: string; mobile: string; createdAt: any };

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingA, setLoadingA] = useState(true);
  
  const [studentEnquiries, setStudentEnquiries] = useState<StudentEnquiry[]>([]);
  const [tutorEnquiries, setTutorEnquiries] = useState<TutorEnquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'students' | 'tutors'>('students');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoadingA(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (user?.email === 'arunjaygautam@gmail.com') {
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

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch(err) {
      console.error(err);
      alert('Login failed');
    }
  };

  if (loadingA) return <div className="p-8 text-center text-slate-500">Loading auth...</div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Access</h1>
          <p className="text-slate-500 mb-8">Please sign in to view enquiries.</p>
          <button onClick={handleLogin} className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors">
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (user.email !== 'arunjaygautam@gmail.com') {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl text-red-500">Unauthorized Access</h2>
        <p className="mt-2 text-slate-500">{user.email} is not an authorized admin.</p>
        <button onClick={() => signOut(auth)} className="mt-4 text-primary-600 underline">Sign out</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary-600" /> Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">{user.email}</span>
          <button onClick={() => signOut(auth)} className="text-slate-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50" title="Sign out">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex gap-4 mb-8 border-b border-slate-200 pb-4">
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
