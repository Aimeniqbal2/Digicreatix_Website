import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Project from './pages/Project';
import gsap from 'gsap';

import PortfolioPage from './pages/PortfolioPage';
import Footer from './components/Footer';

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5, ease: 'power2.out' }
    );
  }, []);

  return (
    <Router>
      <div ref={containerRef} className="min-h-screen bg-[#020204] text-white flex">
        {/* Background Atmosphere */}
        <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-[0.03] pointer-events-none z-0"></div>
        
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen relative z-10 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:id" element={<Project />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;
