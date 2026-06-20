import React, { useRef, useState } from 'react';
import { Globe, Database, Cpu, Smartphone, PenTool, Palette, Cloud, Layers, BarChart, Box, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const servicesData = [
  {
    category: "Website Development",
    icon: <Globe className="w-8 h-8 text-primary-cyan" />,
    description: "Engineering digital experiences from corporate profiles to advanced multi-vendor platforms."
  },
  {
    category: "ERP Development",
    icon: <Database className="w-8 h-8 text-primary-cyan" />,
    description: "Centralizing operations, finance, inventory, HR, and reporting into a robust platform."
  },
  {
    category: "AI Solutions & Automation",
    icon: <Cpu className="w-8 h-8 text-primary-cyan" />,
    description: "AI automation, document intelligence, and workflow optimization for digital transformation."
  },
  {
    category: "Mobile App Development",
    icon: <Smartphone className="w-8 h-8 text-primary-cyan" />,
    description: "High-performance native and cross-platform mobile experiences for iOS and Android."
  },
  {
    category: "UI/UX Design",
    icon: <PenTool className="w-8 h-8 text-primary-cyan" />,
    description: "Crafting beautiful, intuitive interfaces, design systems, and unparalleled user experiences."
  },
  {
    category: "Branding & Creative Services",
    icon: <Palette className="w-8 h-8 text-primary-cyan" />,
    description: "Establishing powerful visual identities, company profiles, and motion graphics."
  },
  {
    category: "Cloud & DevOps Services",
    icon: <Cloud className="w-8 h-8 text-primary-cyan" />,
    description: "Robust cloud architecture, migrations, and impenetrable infrastructure setups."
  },
  {
    category: "Integrations & Automation",
    icon: <Layers className="w-8 h-8 text-primary-cyan" />,
    description: "Connecting complex systems and streamlining enterprise workflows via Custom APIs."
  },
  {
    category: "Business Intelligence",
    icon: <BarChart className="w-8 h-8 text-primary-cyan" />,
    description: "Data-driven insights, executive dashboards, and real-time analytics reporting."
  },
  {
    category: "SaaS Development",
    icon: <Box className="w-8 h-8 text-primary-cyan" />,
    description: "Scalable multi-tenant software platforms and subscription membership systems."
  }
];

export default function ServicesSlider() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (Math.abs(walk) > 10) {
      setDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const navigateToService = (category) => {
    if (dragged) return;
    const hash = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    navigate(`/services#${hash}`);
  };

  return (
    <section className="py-24 relative z-10 lg:pl-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
            Our Core <span className="text-primary-cyan text-glow">Expertise</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            Scroll through our elite digital capabilities. Click any module to dive deep into the technical sub-services we offer.
          </p>
        </div>
        <div className="hidden md:flex gap-4">
          <button onClick={() => handleScroll('left')} className="p-4 glass rounded-full hover:bg-primary-cyan/20 transition-colors border border-primary-cyan/30 text-white hover:shadow-[0_0_20px_rgba(77,252,252,0.4)]">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={() => handleScroll('right')} className="p-4 glass rounded-full hover:bg-primary-cyan/20 transition-colors border border-primary-cyan/30 text-white hover:shadow-[0_0_20px_rgba(77,252,252,0.4)]">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex overflow-x-auto gap-8 px-6 pt-8 pb-12 hide-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${!isDragging ? 'snap-x snap-mandatory' : ''}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Spacer for exact alignment with the container on large screens */}
        <div className="hidden xl:block shrink-0" style={{ width: 'calc((100vw - 80rem) / 2 - 24px)' }}></div>

        {servicesData.map((service, idx) => (
          <div 
            key={idx}
            onClick={() => navigateToService(service.category)}
            className="snap-start shrink-0 w-[300px] md:w-[400px] glass-panel p-8 rounded-3xl cursor-pointer group hover:-translate-y-2 hover:border-primary-cyan/50 hover:shadow-[0_10px_40px_rgba(77,252,252,0.2)] transition-all duration-500 relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-cyan/10 blur-[50px] rounded-full group-hover:bg-primary-cyan/30 transition-colors duration-500"></div>
            
            <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center border border-primary-cyan/20 mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10 box-glow">
              {service.icon}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10 group-hover:text-primary-cyan transition-colors duration-300">
              {service.category}
            </h3>
            
            <p className="text-gray-400 mb-8 relative z-10 flex-1">
              {service.description}
            </p>

            <div className="flex items-center gap-2 text-primary-cyan font-bold tracking-widest text-xs uppercase relative z-10 mt-auto">
              Explore Module <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        ))}
        
        {/* Trailing spacer */}
        <div className="shrink-0 w-6"></div>
      </div>
    </section>
  );
}
