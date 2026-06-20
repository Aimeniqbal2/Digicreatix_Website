import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-glass-border/50 bg-dark-bg/80 backdrop-blur-md relative z-20 mt-auto">
      <div className="max-w-7xl mx-auto px-8 lg:pl-40 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="text-gray-400 text-xs md:text-sm font-medium tracking-widest uppercase">
          &copy; {new Date().getFullYear()} DigiCreatix. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary-cyan animate-pulse box-glow"></div>
          <p className="text-primary-cyan text-xs font-bold tracking-[0.2em] uppercase">
            Engineered for the Future
          </p>
        </div>
      </div>
    </footer>
  );
}
