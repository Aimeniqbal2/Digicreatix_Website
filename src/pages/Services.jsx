import React, { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import gsap from 'gsap';
import { Globe, Database, Cpu, Smartphone, PenTool, Palette, Cloud, Layers, BarChart, Box, CheckCircle2, ArrowRight } from 'lucide-react';
import character2 from '../assets/character2.png';

const servicesData = [
  {
    category: "Website Development",
    icon: <Globe className="w-8 h-8 text-primary-cyan" />,
    description: "Engineering digital experiences from corporate profiles to advanced multi-vendor platforms.",
    subcategories: [
      {
        title: "Business Websites",
        items: ["Corporate Websites", "Company Profile Websites", "Startup Websites", "Portfolio Websites", "Landing Pages", "Personal Websites"]
      },
      {
        title: "Advanced Web Development",
        items: ["Custom Web Applications", "Admin Dashboards", "Customer Portals", "Booking Systems", "Appointment Systems", "Membership Platforms", "Multi-Vendor Platforms"]
      },
      {
        title: "E-Commerce Solutions",
        items: ["Online Stores", "WooCommerce Development", "Shopify Development", "Custom E-Commerce Systems", "Inventory Integration", "Payment Gateway Integration"]
      },
      {
        title: "CMS Development",
        items: ["WordPress Development", "Custom CMS Development", "Headless CMS Solutions", "Blog Platforms", "News Portals"]
      }
    ]
  },
  {
    category: "ERP Development",
    icon: <Database className="w-8 h-8 text-primary-cyan" />,
    description: "Centralizing operations, finance, inventory, HR, and reporting into a single robust platform.",
    subcategories: [
      {
        title: "Core ERP Modules",
        items: ["HR Management", "Employee Management", "Payroll Management", "Attendance Management", "Recruitment Management", "Leave Management"]
      },
      {
        title: "Business Operations",
        items: ["CRM", "Sales Management", "Purchase Management", "Inventory Management", "Warehouse Management", "Supplier Management", "Finance & Accounting", "Invoicing", "Expense Tracking", "Financial Reports", "Cash Flow Management", "Tax Management"]
      },
      {
        title: "Industry-Specific ERP",
        items: ["School ERP", "Hospital ERP", "Clinic ERP", "Retail ERP", "Manufacturing ERP", "Construction ERP", "Real Estate ERP", "Logistics ERP", "Restaurant ERP", "Hotel ERP"]
      },
      {
        title: "ERP Customization",
        items: ["Custom Module Development", "ERP Migration", "ERP Integration", "ERP Support & Maintenance"]
      }
    ]
  },
  {
    category: "AI Solutions & Automation",
    icon: <Cpu className="w-8 h-8 text-primary-cyan" />,
    description: "AI automation, document intelligence, and workflow optimization for digital transformation.",
    subcategories: [
      {
        title: "AI Business Automation",
        items: ["AI Chatbots", "AI Customer Support Agents", "AI Lead Qualification", "AI Appointment Booking Systems", "AI Voice Assistants"]
      },
      {
        title: "AI Content Solutions",
        items: ["AI Content Generation", "AI Social Media Automation", "AI Marketing Automation", "AI Email Automation"]
      },
      {
        title: "AI Business Intelligence",
        items: ["Predictive Analytics", "AI Reporting Systems", "AI Recommendation Systems", "Data Analytics Dashboards"]
      },
      {
        title: "AI Integrations",
        items: ["OpenAI Integration", "Claude Integration", "Gemini Integration", "Custom AI Solutions"]
      }
    ]
  },
  {
    category: "Mobile App Development",
    icon: <Smartphone className="w-8 h-8 text-primary-cyan" />,
    description: "Native and cross-platform mobile experiences.",
    subcategories: [
      {
        title: "Android Applications",
        items: ["Business Apps", "ERP Mobile Apps", "E-Commerce Apps", "Customer Apps"]
      },
      {
        title: "iOS Applications",
        items: ["Native iOS Apps", "Business Applications", "Startup Applications"]
      },
      {
        title: "Cross Platform Apps",
        items: ["Flutter Development", "React Native Development"]
      }
    ]
  },
  {
    category: "UI/UX Design",
    icon: <PenTool className="w-8 h-8 text-primary-cyan" />,
    description: "Crafting beautiful, intuitive interfaces and experiences.",
    subcategories: [
      {
        title: "User Experience Design",
        items: ["Wireframing", "Prototyping", "User Flow Design", "UX Audits"]
      },
      {
        title: "User Interface Design",
        items: ["Dashboard Design", "Mobile App Design", "Website Design", "SaaS Product Design"]
      },
      {
        title: "Design Systems",
        items: ["Design Libraries", "Component Systems", "Brand Consistency Systems"]
      }
    ]
  },
  {
    category: "Branding & Creative Services",
    icon: <Palette className="w-8 h-8 text-primary-cyan" />,
    description: "Establishing powerful visual identities.",
    subcategories: [
      {
        title: "Brand Identity",
        items: ["Logo Design", "Brand Guidelines", "Company Profiles", "Corporate Identity"]
      },
      {
        title: "Graphic Design",
        items: ["Social Media Posts", "Marketing Materials", "Brochures", "Flyers", "Banners"]
      },
      {
        title: "Motion Graphics",
        items: ["Animated Videos", "Explainer Videos", "Product Showcase Videos"]
      }
    ]
  },
  {
    category: "Cloud & DevOps Services",
    icon: <Cloud className="w-8 h-8 text-primary-cyan" />,
    description: "Robust cloud architecture and infrastructure.",
    subcategories: [
      {
        title: "Cloud Solutions",
        items: ["Cloud Migration", "Cloud Infrastructure Setup", "Cloud Storage Solutions", "Backup Systems"]
      }
    ]
  },
  {
    category: "Integrations & Automation",
    icon: <Layers className="w-8 h-8 text-primary-cyan" />,
    description: "Connecting systems and streamlining workflows.",
    subcategories: [
      {
        title: "API Development",
        items: ["Custom API Development", "Third-Party API Integration", "Payment Gateway Integration"]
      },
      {
        title: "Business Integrations",
        items: ["WhatsApp Business API", "CRM Integrations", "ERP Integrations", "Accounting Software Integration"]
      },
      {
        title: "Automation Systems",
        items: ["Workflow Automation", "Email Automation", "Data Synchronization", "Reporting Automation"]
      }
    ]
  },
  {
    category: "Business Intelligence",
    icon: <BarChart className="w-8 h-8 text-primary-cyan" />,
    description: "Data-driven insights and reporting.",
    subcategories: [
      {
        title: "Analytics Solutions",
        items: ["KPI Dashboards", "Executive Dashboards", "Real-Time Reporting", "Business Analytics"]
      },
      {
        title: "Data Management",
        items: ["Data Warehousing", "ETL Pipelines", "Reporting Systems", "Performance Monitoring"]
      }
    ]
  },
  {
    category: "SaaS Development",
    icon: <Box className="w-8 h-8 text-primary-cyan" />,
    description: "Scalable multi-tenant software platforms.",
    subcategories: [
      {
        title: "SaaS Products",
        items: ["Multi-Tenant SaaS Platforms", "Subscription Systems", "Membership Platforms", "Customer Portals"]
      },
      {
        title: "SaaS Features",
        items: ["User Management", "Billing Systems", "Subscription Management", "Analytics Dashboards"]
      }
    ]
  }
];

const techStack = [
  { name: 'React', slug: 'react', top: '15%', left: '10%' },
  { name: 'Node.js', slug: 'nodedotjs', top: '25%', left: '30%' },
  { name: 'Python', slug: 'python', top: '10%', left: '50%' },
  { name: 'WordPress', slug: 'wordpress', top: '35%', left: '70%' },
  { name: 'Shopify', slug: 'shopify', top: '20%', left: '85%' },
  { name: 'WooCommerce', slug: 'woocommerce', top: '50%', left: '15%' },
  { name: 'Flutter', slug: 'flutter', top: '65%', left: '35%' },
  { name: 'Figma', slug: 'figma', top: '45%', left: '55%' },
  { name: 'Vercel', slug: 'vercel', top: '55%', left: '80%' },
  { name: 'Docker', slug: 'docker', top: '80%', left: '20%' },
  { name: 'Stripe', slug: 'stripe', top: '75%', left: '45%' },
  { name: 'Supabase', slug: 'supabase', top: '85%', left: '70%' },
  { name: 'Google Cloud', slug: 'googlecloud', top: '90%', left: '85%' },
  { name: 'Next.js', slug: 'nextdotjs', top: '5%', left: '25%' },
  { name: 'Vite', slug: 'vite', top: '8%', left: '65%' },
  { name: 'MongoDB', slug: 'mongodb', top: '40%', left: '5%' },
  { name: 'PostgreSQL', slug: 'postgresql', top: '70%', left: '5%' },
  { name: 'Redis', slug: 'redis', top: '30%', left: '90%' },
  { name: 'Tailwind', slug: 'tailwindcss', top: '60%', left: '95%' },
  { name: 'TypeScript', slug: 'typescript', top: '95%', left: '30%' },
  { name: 'JavaScript', slug: 'javascript', top: '15%', left: '40%' },
  { name: 'HTML5', slug: 'html5', top: '25%', left: '10%' },
  { name: 'CSS3', slug: 'css3', top: '45%', left: '85%' },
  { name: 'Vue.js', slug: 'vuedotjs', top: '35%', left: '25%' },
  { name: 'Angular', slug: 'angular', top: '55%', left: '5%' },
  { name: 'PHP', slug: 'php', top: '85%', left: '10%' },
  { name: 'Laravel', slug: 'laravel', top: '65%', left: '60%' },
  { name: 'MySQL', slug: 'mysql', top: '15%', left: '75%' },
  { name: 'GitHub', slug: 'github', top: '90%', left: '50%' },
  { name: 'Git', slug: 'git', top: '25%', left: '60%' },
  { name: 'Linux', slug: 'linux', top: '40%', left: '40%' },
  { name: 'Ubuntu', slug: 'ubuntu', top: '75%', left: '85%' },
  { name: 'Apple', slug: 'apple', top: '50%', left: '75%' },
  { name: 'Android', slug: 'android', top: '80%', left: '35%' },
  { name: 'GraphQL', slug: 'graphql', top: '10%', left: '90%' },
  { name: 'Firebase', slug: 'firebase', top: '35%', left: '95%' },
  { name: 'DigitalOcean', slug: 'digitalocean', top: '5%', left: '50%' },
  { name: 'Netlify', slug: 'netlify', top: '65%', left: '15%' },
  { name: 'Cloudflare', slug: 'cloudflare', top: '45%', left: '30%' },
  { name: 'Framer', slug: 'framer', top: '95%', left: '15%' },
  { name: 'NestJS', slug: 'nestjs', top: '12%', left: '80%' },
  { name: 'Express', slug: 'express', top: '22%', left: '45%' },
  { name: 'Django', slug: 'django', top: '32%', left: '60%' },
  { name: 'Rust', slug: 'rust', top: '42%', left: '15%' },
  { name: 'Go', slug: 'go', top: '52%', left: '25%' },
  { name: 'Swift', slug: 'swift', top: '62%', left: '45%' },
  { name: 'Kotlin', slug: 'kotlin', top: '72%', left: '15%' },
  { name: 'Java', slug: 'java', top: '82%', left: '60%' },
  { name: 'Sass', slug: 'sass', top: '92%', left: '40%' },
  { name: 'Bootstrap', slug: 'bootstrap', top: '18%', left: '25%' },
  { name: 'Kubernetes', slug: 'kubernetes', top: '28%', left: '55%' },
  { name: 'NGINX', slug: 'nginx', top: '38%', left: '85%' },
  { name: 'Apache', slug: 'apache', top: '48%', left: '70%' },
  { name: 'Amazon', slug: 'amazon', top: '58%', left: '95%' },
  { name: 'Microsoft', slug: 'microsoft', top: '68%', left: '80%' },
  { name: 'Slack', slug: 'slack', top: '78%', left: '5%' },
  { name: 'Discord', slug: 'discord', top: '88%', left: '25%' },
  { name: 'Notion', slug: 'notion', top: '10%', left: '65%' },
  { name: 'Postman', slug: 'postman', top: '20%', left: '5%' },
  { name: 'Jest', slug: 'jest', top: '30%', left: '75%' }
];

const extendedTechStack = [
  ...techStack,
  ...techStack.map(tech => ({
    ...tech,
    top: `${Math.floor(Math.random() * 90 + 5)}%`,
    left: `${Math.floor(Math.random() * 90 + 5)}%`,
  }))
];

export default function Services() {
  const containerRef = useRef(null);
  const iconsRef = useRef([]);
  const location = useLocation();
  
  // Handle smooth scrolling to hash links when navigating from Home
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Continuous floating animation for tech stack icons
    iconsRef.current.forEach((icon) => {
      if(!icon) return;
      gsap.to(icon, {
        y: `+=${Math.random() * 30 - 15}`,
        x: `+=${Math.random() * 30 - 15}`,
        rotation: Math.random() * 20 - 10,
        duration: 3 + Math.random() * 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    });
  }, []);

  const handleDodge = (e) => {
    gsap.to(e.currentTarget, {
      x: `+=${(Math.random() - 0.5) * 300}`,
      y: `+=${(Math.random() - 0.5) * 300}`,
      rotation: `+=${(Math.random() - 0.5) * 180}`,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  return (
    <div ref={containerRef} className="pt-8 md:pt-12 px-6 lg:pl-40 min-h-screen pb-32">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center mb-32">
        <div className="flex-1 space-y-8 z-10">
          <div>
            <span className="text-primary-cyan font-bold tracking-[0.3em] text-2xl md:text-3xl uppercase mb-6 block drop-shadow-[0_0_15px_rgba(77,252,252,0.8)]">Our Services</span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">Digital <br/><span className="text-primary-cyan text-glow">Excellence</span></h1>
          </div>
          <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
            Deploying world-class technological solutions. We engineer scalable architectures, automated AI workflows, and premium digital products that elevate your brand.
          </p>
        </div>
        <div className="flex-1 relative h-[400px] lg:h-[500px] w-full flex items-center justify-center">
          <div className="absolute inset-0 bg-primary-cyan rounded-full blur-[120px] opacity-[0.15] mix-blend-screen pointer-events-none"></div>
          <img src={character2} alt="Services Agent" className="h-full object-contain relative z-10 drop-shadow-[0_20px_30px_rgba(0,255,255,0.2)] animate-[pulse_4s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Services Massive Directory */}
      <div className="max-w-7xl mx-auto space-y-12">
        {servicesData.map((service, idx) => {
          const sectionId = service.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <div key={idx} id={sectionId} className="glass-panel p-8 md:p-12 relative overflow-hidden group scroll-mt-32">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-cyan/5 rounded-full blur-[80px] group-hover:bg-primary-cyan/10 transition-colors duration-700 pointer-events-none"></div>
            
            {/* Category Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 relative z-10 border-b border-glass-border pb-8">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center shrink-0 border border-primary-cyan/30 box-glow">
                {service.icon}
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{service.category}</h2>
                <p className="text-gray-400 mt-2 text-lg">{service.description}</p>
              </div>
            </div>

            {/* Subcategories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12 relative z-10">
              {service.subcategories.map((sub, subIdx) => (
                <div key={subIdx} className="flex flex-col">
                  <h3 className="text-primary-cyan font-bold tracking-widest uppercase text-sm mb-5 flex items-center gap-2">
                    {sub.title}
                  </h3>
                  <ul className="space-y-3">
                    {sub.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-gray-300 group/item hover:-translate-y-0.5 transition-transform">
                        <CheckCircle2 className="w-4 h-4 mt-1 text-primary-cyan/50 shrink-0 group-hover/item:text-primary-cyan transition-colors" />
                        <span className="text-sm font-medium leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-12 pt-8 border-t border-glass-border/50">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-cyan/10 text-primary-cyan border border-primary-cyan/30 hover:bg-primary-cyan hover:text-dark-bg transition-all font-bold tracking-wide group/btn">
                Request a Project <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          );
        })}
      </div>

      {/* Tech Stack Header Moved Above */}
      <div className="max-w-7xl mx-auto mt-32 border-t border-glass-border pt-32 text-center z-10 relative">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white/90 drop-shadow-2xl">
          Powered By <br/><span className="text-primary-cyan text-glow">The Future</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-md mx-auto text-lg backdrop-blur-sm rounded-xl">
          The elite tools and software engines we command to engineer your digital reality.
        </p>
      </div>

      {/* Tech Stack Messy/Interactive Section */}
      <div className="max-w-7xl mx-auto mt-16 mb-16 relative h-[600px] flex items-center justify-center z-20">

        {/* Scattered Icons */}
        {extendedTechStack.map((tech, idx) => (
          <div 
            key={idx}
            ref={el => iconsRef.current[idx] = el}
            onMouseEnter={handleDodge}
            className="absolute p-4 glass rounded-2xl border border-primary-cyan/20 hover:border-primary-cyan/80 hover:shadow-[0_0_30px_rgba(77,252,252,0.4)] transition-colors cursor-pointer group flex flex-col items-center justify-center gap-2"
            style={{ top: tech.top, left: tech.left }}
          >
            <img 
              src={`https://cdn.simpleicons.org/${tech.slug}/4dfcfc`} 
              alt={tech.name} 
              className="w-8 h-8 md:w-12 md:h-12 object-contain filter drop-shadow-[0_0_10px_rgba(77,252,252,0.5)]"
              onError={(e) => e.target.style.display = 'none'}
            />
            <span className="text-[10px] uppercase tracking-widest text-primary-cyan font-bold opacity-0 group-hover:opacity-100 absolute -bottom-6 whitespace-nowrap transition-opacity">
              {tech.name}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}
