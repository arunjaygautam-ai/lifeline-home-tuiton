import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import RightSidebar from '../RightSidebar';
import MobileStickyFooter from '../MobileStickyFooter';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen pb-[80px] md:pb-0">
      <Navbar />
      <main className="flex-1 mt-[80px] md:mt-[104px]">
        <Outlet />
      </main>
      <Footer />
      <RightSidebar />
      <MobileStickyFooter />
    </div>
  );
}
