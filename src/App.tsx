import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import TutorRegistration from './pages/TutorRegistration';
import StudentInquiry from './pages/StudentInquiry';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register-tutor" element={<TutorRegistration />} />
          <Route path="/student-inquiry" element={<StudentInquiry />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
