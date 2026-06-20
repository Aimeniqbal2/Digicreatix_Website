import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Calendar, Clock } from 'lucide-react';
import character3 from '../assets/character3.png';

const serviceOptions = {
  "Website Development": ["Corporate Website", "E-Commerce", "Web Application", "Landing Page", "Other"],
  "ERP Development": ["Full ERP System", "HR Module", "Inventory Management", "CRM Integration", "Other"],
  "AI & Automation": ["AI Chatbot", "Workflow Automation", "Data Analytics", "Custom AI Solution", "Other"],
  "Mobile Apps": ["iOS App", "Android App", "Cross-Platform (Flutter)", "Other"],
  "UI/UX Design": ["Website Design", "App Design", "Dashboard Design", "Branding", "Other"],
  "Digital Marketing": ["SEO", "Social Media", "Content Creation", "Other"]
};

export default function Contact() {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Website Development',
    serviceType: 'Corporate Website',
    budget: '$1k - $5k',
    deadline: '1-3 Months',
    description: ''
  });

  const [meetingStatus, setMeetingStatus] = useState('');
  const [isMeetingFormVisible, setIsMeetingFormVisible] = useState(false);
  const [meetingData, setMeetingData] = useState({
    name: '',
    email: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    // When service changes, update serviceType to the first item of the new service array
    setFormData(prev => ({ ...prev, serviceType: serviceOptions[prev.service][0] }));
  }, [formData.service]);

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "acd2f9d7-5a6a-46e4-b5dc-23d35728fd21",
          subject: `New Project Request: ${formData.service}`,
          "Full Name": formData.name,
          "Email": formData.email,
          "Main Service": formData.service,
          "Specific Type": formData.serviceType,
          "Budget": formData.budget,
          "Timeline": formData.deadline,
          "Project Description": formData.description
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('Success! Your project request has been transmitted. We will contact you soon.');
        setFormData({
          name: '', email: '', service: 'Website Development', serviceType: 'Corporate Website', budget: '$1k - $5k', deadline: '1-3 Months', description: ''
        });
      } else {
        setStatus('Failed to send. Please ensure your Access Key is correct in the code.');
      }
    } catch (err) {
      setStatus('An error occurred while sending the request.');
    }
  };

  const handleMeetingChange = (e) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
  };

  const handleMeetingSubmit = async (e) => {
    e.preventDefault();
    setMeetingStatus('Scheduling...');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "acd2f9d7-5a6a-46e4-b5dc-23d35728fd21",
          subject: `Meeting Request from ${meetingData.name}`,
          "Full Name": meetingData.name,
          "Email": meetingData.email,
          "Preferred Date": meetingData.date,
          "Preferred Time": meetingData.time,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setMeetingStatus('Success! We will email you to confirm the time.');
        setMeetingData({ name: '', email: '', date: '', time: '' });
      } else {
        setMeetingStatus('Failed to schedule. Check Access Key.');
      }
    } catch (err) {
      setMeetingStatus('An error occurred.');
    }
  };

  return (
    <div ref={containerRef} className="pt-12 md:pt-16 px-8 lg:pl-40 min-h-screen flex flex-col pb-24">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Form Section */}
        <div className="glass-panel p-8 md:p-12 order-2 lg:order-2 relative z-20">
          <h2 className="text-4xl md:text-5xl font-black mb-2 text-white">Start a <span className="text-primary-cyan text-glow">Project</span></h2>
          <p className="text-gray-400 mb-8">Fill out the details below or book a meeting to discuss your vision.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full bg-dark-bg/50 border border-glass-border rounded-xl p-4 text-white focus:outline-none focus:border-primary-cyan transition-colors" />
              <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full bg-dark-bg/50 border border-glass-border rounded-xl p-4 text-white focus:outline-none focus:border-primary-cyan transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs text-primary-cyan uppercase tracking-widest font-bold mb-2 pl-2">Required Service</label>
                <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-dark-bg/50 border border-glass-border rounded-xl p-4 text-white focus:outline-none focus:border-primary-cyan transition-colors appearance-none">
                  {Object.keys(serviceOptions).map(key => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-primary-cyan uppercase tracking-widest font-bold mb-2 pl-2">Project Type</label>
                <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full bg-dark-bg/50 border border-glass-border rounded-xl p-4 text-white focus:outline-none focus:border-primary-cyan transition-colors appearance-none">
                  {serviceOptions[formData.service]?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs text-primary-cyan uppercase tracking-widest font-bold mb-2 pl-2">Estimated Budget</label>
                <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-dark-bg/50 border border-glass-border rounded-xl p-4 text-white focus:outline-none focus:border-primary-cyan transition-colors appearance-none">
                  <option value="< $1k">Less than $1,000</option>
                  <option value="$1k - $5k">$1,000 - $5,000</option>
                  <option value="$5k - $10k">$5,000 - $10,000</option>
                  <option value="$10k+">$10,000+</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-primary-cyan uppercase tracking-widest font-bold mb-2 pl-2">Desired Timeline</label>
                <select name="deadline" value={formData.deadline} onChange={handleChange} className="w-full bg-dark-bg/50 border border-glass-border rounded-xl p-4 text-white focus:outline-none focus:border-primary-cyan transition-colors appearance-none">
                  <option value="ASAP">ASAP</option>
                  <option value="1 Month">1 Month</option>
                  <option value="1-3 Months">1-3 Months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>

            <textarea required name="description" value={formData.description} onChange={handleChange} placeholder="Tell us about your project... (Goals, requirements, links)" rows={5} className="w-full bg-dark-bg/50 border border-glass-border rounded-xl p-4 text-white focus:outline-none focus:border-primary-cyan transition-colors"></textarea>
            
            <button type="submit" className="w-full py-4 glass bg-primary-cyan/10 hover:bg-primary-cyan/30 text-white font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:-translate-y-1">
              Transmit Request
            </button>

            {status && (
              <div className={`mt-4 p-4 rounded-xl font-bold text-center ${status.includes('Success') ? 'bg-green-500/20 text-green-400 border border-green-500/50' : status.includes('Submitting') ? 'bg-primary-cyan/20 text-primary-cyan' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                {status}
              </div>
            )}
          </form>
        </div>

        {/* Visuals & Meeting Section */}
        <div className="flex flex-col items-center justify-start order-1 lg:order-1 space-y-20">
          <div className="relative h-[400px] md:h-[600px] w-full flex justify-center items-center">
            <div className="absolute inset-0 bg-primary-cyan rounded-full blur-[100px] opacity-[0.2] mix-blend-screen"></div>
            <img src={character3} alt="Contact Agent" className="h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(0,255,255,0.3)] animate-[pulse_4s_ease-in-out_infinite]" />
          </div>

          <div className="glass-panel p-8 w-full hover:border-primary-cyan/50 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-2 text-center">Prefer to talk?</h3>
            <p className="text-gray-400 mb-6 text-center text-sm">Schedule a direct 1-on-1 strategy call with our expert team.</p>
            
            {!isMeetingFormVisible ? (
              <button 
                onClick={() => setIsMeetingFormVisible(true)}
                className="w-full py-4 rounded-xl bg-white text-dark-bg font-black tracking-widest uppercase transition-all duration-300 hover:bg-primary-cyan hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:-translate-y-1"
              >
                Book a Meeting
              </button>
            ) : (
              <form onSubmit={handleMeetingSubmit} className="space-y-4 flex flex-col animate-in fade-in slide-in-from-top-4 duration-500">
                <input required type="text" name="name" value={meetingData.name} onChange={handleMeetingChange} placeholder="Full Name" className="w-full bg-dark-bg/50 border border-glass-border rounded-xl p-3 text-white focus:outline-none focus:border-primary-cyan transition-colors" />
                <input required type="email" name="email" value={meetingData.email} onChange={handleMeetingChange} placeholder="Email Address" className="w-full bg-dark-bg/50 border border-glass-border rounded-xl p-3 text-white focus:outline-none focus:border-primary-cyan transition-colors" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col relative group">
                    <label className="absolute -top-2 left-3 bg-dark-bg px-1 text-[10px] text-primary-cyan uppercase tracking-widest z-10 hidden group-focus-within:block">Date</label>
                    <div className="relative">
                      <input required type="date" name="date" value={meetingData.date} onChange={handleMeetingChange} className="w-full bg-dark-bg/50 border border-glass-border rounded-xl pl-10 p-3 text-gray-300 focus:outline-none focus:border-primary-cyan transition-colors [color-scheme:dark] cursor-pointer appearance-none" />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-cyan pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex flex-col relative group">
                    <label className="absolute -top-2 left-3 bg-dark-bg px-1 text-[10px] text-primary-cyan uppercase tracking-widest z-10 hidden group-focus-within:block">Time</label>
                    <div className="relative">
                      <input required type="time" name="time" value={meetingData.time} onChange={handleMeetingChange} className="w-full bg-dark-bg/50 border border-glass-border rounded-xl pl-10 p-3 text-gray-300 focus:outline-none focus:border-primary-cyan transition-colors [color-scheme:dark] cursor-pointer appearance-none" />
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-cyan pointer-events-none" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full py-4 rounded-xl bg-primary-cyan text-dark-bg font-black tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:-translate-y-1 mt-2">
                  Confirm Booking
                </button>
                {meetingStatus && (
                  <div className={`mt-2 p-3 rounded-xl font-bold text-center text-sm ${meetingStatus.includes('Success') ? 'bg-green-500/20 text-green-400 border border-green-500/50' : meetingStatus.includes('Scheduling') ? 'bg-primary-cyan/20 text-primary-cyan' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                    {meetingStatus}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
