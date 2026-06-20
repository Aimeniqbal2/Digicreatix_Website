import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/Glowing Logo Icon.png';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const frameCount = 240;
  const images = useRef([]);
  const playhead = useRef({ frame: 0 });

  // Format frame string e.g. "001"
  const currentFrame = index => (
    `/logo-sequence/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
  );

  // 1. Preload sequence & Setup Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set internal resolution perfectly
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let loadedCount = 0;
    
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      // Enforce absolute ordering despite async loading times
      images.current[i - 1] = img;
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(Math.round(playhead.current.frame)); 
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const render = (index) => {
    if (!images.current[index]) return;
    const img = images.current[index];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Clear frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate center-fit scaling to be responsive
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    // Math.max ensures the image completely fills the screen without black bars (cover)
    const ratio = Math.max(hRatio, vRatio); 
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.drawImage(
      img, 
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  // 2. Apple-Style GSAP Scrub Timeline
  useEffect(() => {
    if (!imagesLoaded) return;
    
    // Draw initial frame
    render(0);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', // Defines how long the scroll experience lasts (4x viewport)
          scrub: 1, // Smooth interpolation value
          pin: true, // Lock the section in place
        }
      });

      // Animate playhead from 0 to 239 over the first 70% of the scroll duration
      tl.to(playhead.current, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: () => render(Math.round(playhead.current.frame)),
        duration: 0.7
      }, 0);

      // UI Fade-in Choreography
      // The text perfectly rises only AFTER the 3D sequence finishes
      tl.fromTo(textRef.current, 
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.15, ease: "power3.out" }, 
        0.7 // Triggers exactly when sequence finishes at 70% depth
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.15, ease: "power3.out" },
        0.7 // Triggers at the exact same time
      )
      .fromTo(buttonsRef.current.querySelectorAll('a'),
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.15, ease: "power3.out" },
        0.7 // Triggers at the exact same time
      );

      // Subtle continuous breathing to make it feel alive immediately
      gsap.to(canvasRef.current, {
        scale: 1.04,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [imagesLoaded]);

  return (
    <section ref={containerRef} className="h-screen w-full relative bg-black overflow-hidden perspective-[1000px]">
      
      {/* Immersive Loading Screen */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-primary-cyan">
          <img src={logoIcon} alt="DigiCreatix Loading" className="w-24 h-24 mb-8 drop-shadow-[0_0_20px_rgba(77,252,252,0.6)] animate-[pulse_2s_ease-in-out_infinite]" />
          <div className="text-2xl font-bold tracking-widest mb-6 animate-pulse drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]">INITIALIZING DIGICREATIX</div>
          <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
            <div className="h-full bg-primary-cyan transition-all duration-300 drop-shadow-[0_0_10px_rgba(0,255,255,1)]" style={{ width: `${loadProgress}%` }}></div>
          </div>
          <div className="mt-4 text-sm text-gray-500 font-mono">{loadProgress}% - Loading Core Engine</div>
        </div>
      )}

      {/* Frame Sequence Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0 mix-blend-screen" 
      />
      
      {/* Dark fade gradient to help text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 z-0 pointer-events-none"></div>

      {/* UI Elements overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full px-6 pointer-events-none">
        
        <div ref={textRef} className="opacity-0 translate-y-[100px]">
          <h1 className="text-[4rem] md:text-[8rem] lg:text-[11rem] font-black tracking-tighter mb-4 text-white leading-[0.85] flex justify-center flex-wrap" style={{ textShadow: '0 0 30px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)' }}>
            DIGICREATIX
          </h1>
          <Sparkles className="absolute -top-4 -right-2 md:-top-10 md:-right-10 w-8 h-8 md:w-16 md:h-16 text-primary-cyan opacity-50 animate-pulse pointer-events-none" />
        </div>
        
        <div className="flex flex-col items-center w-full z-20">
          <p ref={subtitleRef} className="opacity-0 translate-y-[40px] text-xl md:text-3xl text-gray-400 max-w-3xl mx-auto font-light tracking-wide leading-relaxed mt-8 text-center">
            We don't follow the future. <br className="hidden md:block"/>
            <span className="text-white font-medium drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">We engineer it.</span>
          </p>

          <div ref={buttonsRef} className="flex flex-col md:flex-row gap-6 mt-16 pointer-events-auto">
            <Link to="/portfolio" className="opacity-0 px-10 py-5 glass bg-primary-cyan/10 hover:bg-primary-cyan/20 text-white font-bold tracking-widest uppercase rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] hover:-translate-y-1 flex items-center gap-3 group border border-primary-cyan/50 backdrop-blur-xl">
              Explore Portfolio <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/contact" className="opacity-0 px-10 py-5 glass text-gray-300 hover:text-white font-bold tracking-widest uppercase rounded-full transition-all duration-300 hover:-translate-y-1 flex items-center justify-center hover:bg-white/5 backdrop-blur-xl border border-white/10">
              Start a Project
            </Link>
          </div>
        </div>

      </div>
      
      {/* Scroll indicator bounces at the bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-60 hover:opacity-100 transition-opacity z-20 pointer-events-none">
        <span className="text-primary-cyan tracking-[0.4em] text-[10px] uppercase font-bold text-glow">Scroll</span>
        <div className="glass p-3 md:p-4 rounded-full border border-primary-cyan/30 bg-black/80 backdrop-blur-xl box-glow">
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-primary-cyan" />
        </div>
      </div>
    </section>
  );
}
