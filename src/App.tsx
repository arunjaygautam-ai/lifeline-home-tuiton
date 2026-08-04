import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import AnalyticsTracker from './components/AnalyticsTracker';

const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-7T950VPZMF";
if (gaMeasurementId) {
  ReactGA.initialize(gaMeasurementId);
}

const FAVICON_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAByFBMVEX/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD+AAD+AAD+AQH+BAT+AgL+AAD+AAD+AAD/AAD/ISH/bW3/mZn/lpb/Y2P/GRn/TU3/1dX//v7//////Pz/yMj/OTn/MjL/39//zc3/ICD/k5P/d3f/Dg7/ycn/r6//BAT/EhL/0dH/uLj/Bgb/sbH/lZX/XV3/+Pj/7u7/RET/Cgr/+vr/9fX/e3v/Wlr/fX3/dHT/WFj/Dw//DAz/amr/xcX/5OT/4+P/vb3/Bwf/ExP/Ojr/YmL/eXn/UFD/Cwv/v7//7e3/IyP/IiL/AQH/KCj/gID/8vL//f3/q6v/DQ3/wsL/2tr/bm7/ERH/4OD/ra3/CAj/ubn/qan/JCT/sLD/pqb/oaH/Jib/jIz/eHj/FBT/tLT/QUH/8/P/f3//g4P/7Oz/5eX/NDT/Njb/5+f/kpL/+/v/YWH/HBz/z8//29v/Hh7/3Nz/wMD/W1v/9PT/T0//S0v/j4//gYH/fn7/AwP/oqL/o6P/pKT/lJT/trb/iYn/aWn/3d3/s7P/1tb/KSn/jY3/3t7/2dn/hIT/AgL/n5//mpr/JSX/GxvjcpHxAAAAFXRSTlMADGDD8xec9gth9cLy6+7u7u7C5OVtbGTSAAAAAWJLR0QfBQ0QvQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB+oIAxQsDpxoO24AAAHHSURBVDjLhVNVWwJBFB2MFcVE13YHxAABRQywEQNbVsXu7i5EsBM7/66bM/uw6nnZPeeeb+bODQCAIiQ0jJRBWGiIAjAIJyLIXxBBhAOgJMg/QChAZJSEJ6ekpqVnSISoSKCS0MwsCkKNNlsiqUA0JrocyCE3D2sxQOLOhwL0WIuVGAwFosFokjWYC0VDkUXWYCkWDVb5K8iSUj5eVv6LwZZvZ+MVlSapwVRVXVOrq+OYo97Z0NhU1cwRV0trW3V7HOjoZGrT5dR38y/pdnext7fPA2F/PBgY5O6lhoYN+OAR/SjFyWPxYHxCSN0+iQo4Na0RxJkEQM+Kj4NNbj4+N4ikeeYVC4hBo5mNLy4hgUpnDMsriHtWaSa/NQ8S1nWMwazFR2xskuTWNuZFNrZQNRRWdkjaitnuHlfJ/QMsHXq9R5j5XHypj/1IsgcCdkTKToReWE5xWqtn2Hx+ITbLfIkcV9cogRsH7qYrTeg0vL0Vfvx3Br6b/NDa7oO8vvTAV+ixxCIMrTj2T88vbANm2crvvr650dijxXl3731oX3y+oPPz2EvjxZGu3rth/2vq20FjhVD+v7zs+zsTk2SQqGbX/wdghYxu679IXwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNi0wOC0wM1QxNzozMjoxNyswMDowMCpi+gcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjYtMDgtMDNUMTc6MzI6MDErMDA6MDD0RXcfAAAAAElFTkSuQmCC";

function FaviconManager() {
  useEffect(() => {
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.type = 'image/png';
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = FAVICON_BASE64;
  }, []);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <FaviconManager />
      <ScrollToTop />
      <AnalyticsTracker />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
