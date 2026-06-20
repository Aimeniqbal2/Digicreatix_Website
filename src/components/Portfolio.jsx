import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);



export default function Portfolio() {
  const gridRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gridRef.current.children;
      gsap.fromTo(cards,
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" className="py-24 px-6 pl-28 md:pl-40 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white/90 tracking-tight">Selected Works</h2>
          <button className="hidden md:flex items-center gap-2 text-primary-cyan hover:text-white transition-colors group font-medium tracking-wide">
            View All <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {projects.map((project) => (
            <Link 
              to={`/portfolio/${project.id}`}
              key={project.id} 
              className={`glass-panel p-0 group relative overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,255,255,0.15)] hover:border-primary-cyan/50 block ${project.size}`}
            >
              <div className="absolute inset-0 bg-dark-bg/40 group-hover:bg-dark-bg/10 transition-colors duration-700 z-10"></div>
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end bg-gradient-to-t from-dark-bg/95 via-dark-bg/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p className="text-primary-cyan text-xs tracking-[0.2em] uppercase mb-3 font-semibold">{project.category}</p>
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-bold text-white tracking-tight">{project.title}</h3>
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <ArrowUpRight className="w-6 h-6 text-primary-cyan" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
