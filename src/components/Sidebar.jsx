import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Layers, Briefcase, Mail } from 'lucide-react';
import logoIcon from '../assets/Glowing Logo Icon.png';

export default function Sidebar() {
  const sidebarRef = useRef(null);
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If we are not on the home page, always show the sidebar
      if (location.pathname !== '/') {
        setIsVisible(true);
        return;
      }
      
      // On the home page, the Hero section is pinned for 400vh (4x viewport height)
      // So we should only show the sidebar when the user scrolls past the pinned sequence
      if (window.scrollY > window.innerHeight * 4) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: Layers },
    { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <aside ref={sidebarRef} className={`fixed top-2 md:top-4 left-[2px] h-[calc(100vh-1rem)] md:h-[calc(100vh-2rem)] w-24 md:w-32 z-50 flex flex-col items-center py-8 glass border border-glass-border rounded-3xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Logo */}
      <div className="w-16 h-16 md:w-20 md:h-20 mb-16 relative group cursor-pointer">
        <div className="absolute inset-0 bg-primary-cyan rounded-full blur-[20px] opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
        <img src={logoIcon} alt="Icon" className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 origin-center" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-10">
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path}
            className={({ isActive }) => 
              `relative group flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 ${isActive ? 'text-primary-cyan glass shadow-[0_0_20px_rgba(0,255,255,0.2)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
            }
          >
            <item.icon className="w-6 h-6 md:w-8 md:h-8" />
            <span className="text-[10px] uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 absolute left-full ml-4 bg-glass-bg border border-glass-border px-3 py-2 rounded-lg pointer-events-none transition-opacity whitespace-nowrap backdrop-blur-md">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Decorative Bottom Element */}
      <div className="mt-auto w-1 h-12 rounded-full bg-gradient-to-b from-primary-cyan to-transparent opacity-50"></div>
    </aside>
  );
}
