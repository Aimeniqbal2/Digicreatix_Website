import React, { useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import gsap from 'gsap';
import fullLogo from '../assets/Glowing Full Logo.png';

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
        <div className="flex items-center group cursor-pointer -my-8 md:-my-10 ml-2 md:ml-4">
          <img src={fullLogo} alt="DigiCreatix" className="h-24 md:h-28 object-contain group-hover:scale-105 transition-transform duration-300" />
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm uppercase tracking-widest text-gray-300 hover:text-primary-cyan hover:text-glow transition-all duration-300 font-medium">
              {item}
            </a>
          ))}
        </div>

        <button className="md:hidden text-primary-cyan p-2 glass rounded-full">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
