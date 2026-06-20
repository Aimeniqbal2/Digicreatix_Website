import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';

export default function Project() {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0,0);
    gsap.fromTo('.project-hero', 
      { opacity: 0, y: 100 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' }
    );
  }, [id]);

  if (!project) return <div className="text-white pt-32 text-center">Project not found</div>;

  return (
    <div className="min-h-screen pb-32">
      <div className="h-[50vh] md:h-[70vh] relative project-hero overflow-hidden">
        <div className="absolute inset-0 bg-dark-bg/60 z-10 mix-blend-multiply"></div>
        <img src={project.image} className="w-full h-full object-cover" alt={project.title} />

        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 pl-28 md:p-16 md:pl-40 bg-gradient-to-t from-dark-bg via-transparent to-transparent">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-cyan hover:text-white mb-8 transition-colors uppercase tracking-widest text-sm font-bold">
            <ArrowLeft className="w-5 h-5" /> Return to Base
          </Link>
          <h1 className="text-5xl md:text-8xl font-black text-white">{project.title}</h1>
          <p className="text-lg md:text-xl text-primary-cyan uppercase tracking-[0.3em] mt-4 font-semibold text-glow">{project.category}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 lg:pl-40 pt-24 space-y-16 relative">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
          <div>
            {project.logo && (
              <img src={project.logo} className="w-48 md:w-64 h-auto object-contain" alt={`${project.title} Logo`} />
            )}
          </div>
          {project.link !== '#' && (
            <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary-cyan/10 text-primary-cyan border border-primary-cyan/30 hover:bg-primary-cyan hover:text-dark-bg transition-all font-bold tracking-wide shrink-0">
              View Live Project <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed whitespace-pre-wrap">
          {project.description.split('\n').map((line, idx) => {
            if (line.includes('**')) {
              // Basic bold markdown parser
              const parts = line.split('**');
              return (
                <p key={idx} className="mb-4">
                  {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part)}
                </p>
              );
            }
            return <p key={idx} className="mb-4">{line}</p>;
          })}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-glass-border">
          <div>
            <h4 className="text-gray-500 uppercase tracking-widest text-xs mb-2">Client</h4>
            <p className="text-white font-bold text-lg">{project.client}</p>
          </div>
          <div>
            <h4 className="text-gray-500 uppercase tracking-widest text-xs mb-2">Timeline</h4>
            <p className="text-white font-bold text-lg">{project.timeline}</p>
          </div>
          <div>
            <h4 className="text-gray-500 uppercase tracking-widest text-xs mb-2">Role</h4>
            <p className="text-white font-bold text-lg">{project.role}</p>
          </div>
          <div>
            <h4 className="text-gray-500 uppercase tracking-widest text-xs mb-2">Tech</h4>
            <p className="text-white font-bold text-lg">{project.tech}</p>
          </div>
        </div>

        {/* Detail Image(s) / Gallery */}
        {project.gallery && project.gallery.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-8">
            {project.gallery.map((imgSrc, idx) => {
              // Perfect Symmetrical Grid Logic: 
              // First image spans full width, the rest sit beautifully side-by-side
              const spanClass = idx === 0 ? 'md:col-span-2' : 'col-span-1';

              return (
                <div key={idx} className={`glass-panel p-2 hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_20px_50px_rgba(0,255,255,0.15)] cursor-pointer group ${spanClass}`}>
                  <div className="w-full h-full rounded-2xl overflow-hidden relative bg-dark-bg/50">
                    <img src={imgSrc} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" alt={`${project.title} Gallery ${idx+1}`} />
                    <div className="absolute inset-0 bg-primary-cyan/0 group-hover:bg-primary-cyan/10 transition-colors duration-500 mix-blend-overlay pointer-events-none"></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-panel p-2 md:p-4 hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_20px_50px_rgba(0,255,255,0.2)] cursor-pointer mt-16">
            <img src={project.detailImage} className="w-full rounded-[1.5rem] object-cover" alt="Detail" />
          </div>
        )}

        {/* Strong CTA Section */}
        <div className="mt-24 mb-12 relative overflow-hidden rounded-3xl glass-panel p-12 text-center group border border-primary-cyan/20">
          <div className="absolute inset-0 bg-primary-cyan/5 group-hover:bg-primary-cyan/10 transition-colors duration-500"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to Build Something <span className="text-primary-cyan text-glow">Similar?</span></h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">Let's discuss how we can engineer a custom solution tailored to your exact specifications.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/contact" className="px-8 py-4 rounded-full bg-primary-cyan text-dark-bg font-black tracking-widest uppercase hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] hover:-translate-y-1 transition-all duration-300">
                Start a Project
              </Link>
              <Link to="/contact" className="px-8 py-4 rounded-full bg-dark-bg border border-primary-cyan text-primary-cyan font-bold tracking-widest uppercase hover:bg-primary-cyan/10 transition-all duration-300">
                Book a Meeting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
