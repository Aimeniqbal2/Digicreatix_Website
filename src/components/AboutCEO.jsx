import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, MessageSquare, Mail } from 'lucide-react';
import avatar from '../assets/character.png';

gsap.registerPlugin(ScrollTrigger);

export default function AboutCEO() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Card Entrance
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 100, rotationX: 5 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // Avatar Elegant Entrance (sliding in and fading up)
      // Added xPercent: -50 to prevent GSAP from resetting the Tailwind centering
      gsap.fromTo(avatarRef.current,
        { opacity: 0, xPercent: -50, x: -50, y: 50 },
        {
          opacity: 1,
          xPercent: -50,
          x: 0,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6 pl-28 md:pl-40 relative z-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-16 text-center tracking-tight text-white/90">The Visionary</h2>

        <div ref={cardRef} className="glass-panel p-8 md:p-14 flex flex-col md:flex-row gap-12 md:gap-16 items-center">

          {/* Avatar Integration */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
            {/* Glowing backdrop to sit seamlessly in the dark environment */}
            <div className="absolute inset-0 bg-primary-cyan rounded-full blur-[70px] opacity-[0.15] mix-blend-screen pointer-events-none"></div>
            <img
              ref={avatarRef}
              src={avatar}
              alt="Aimen Iqbal - CEO"
              className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 h-[420px] md:h-[520px] w-auto max-w-none object-contain object-bottom z-10 drop-shadow-[0_15px_30px_rgba(0,255,255,0.25)] pointer-events-none"
            />
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-1">
              <h3 className="text-4xl font-bold text-white tracking-tight">Aimen Iqbal</h3>
              <p className="text-primary-cyan tracking-widest uppercase text-sm font-semibold">Founder & CEO</p>
            </div>

            <p className="text-gray-300 leading-relaxed text-lg font-light">
              "We don't just build software; we engineer digital gravity. Our mission is to create experiences so immersive and powerful that they pull users into entirely new dimensions of interaction."
            </p>

            <div className="flex gap-4 justify-center md:justify-start pt-6">
              <a href="#" className="p-4 glass rounded-2xl hover:bg-primary-cyan/20 transition-all duration-300 text-white hover:text-primary-cyan hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-4 glass rounded-2xl hover:bg-primary-cyan/20 transition-all duration-300 text-white hover:text-primary-cyan hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="#" className="p-4 glass rounded-2xl hover:bg-primary-cyan/20 transition-all duration-300 text-white hover:text-primary-cyan hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
