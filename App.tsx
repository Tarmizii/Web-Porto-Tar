import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import CaseStudy from './components/CaseStudy';
import { CONTACT_INFO } from './constants';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 h-64 w-2 z-50 hidden md:flex flex-col justify-between items-center mix-blend-difference pointer-events-none">
       {/* HUD Lines Top */}
       <div className="w-4 h-[1px] bg-white/50"></div>
       
       <div className="h-full w-[2px] bg-gray-300/20 relative rounded-none overflow-hidden">
          <div 
            className="w-full bg-white transition-all duration-100 ease-out"
            style={{ height: `${scrollProgress * 100}%` }}
          />
       </div>

       {/* HUD Lines Bottom */}
       <div className="w-4 h-[1px] bg-white/50"></div>
       
       {/* Numeric Indicator */}
       <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 -rotate-90 text-[10px] font-mono tracking-widest text-white/50 w-24 text-center">
          LVL {Math.min(Math.floor(scrollProgress * 5) + 1, 5)}
       </div>
    </div>
  );
};

const FloatingContact = () => {
  return (
    <a 
      href={CONTACT_INFO.whatsappUrl}
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-6 md:right-10 z-50 bg-dark text-white p-4 rounded-xl border border-white/10 shadow-2xl hover:bg-primary hover:border-primary transition-all duration-300 group btn-game"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-dark animate-pulse"></div>
    </a>
  );
};

const HomePage: React.FC = () => {
  // Simple intersection observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="animate-fade-in relative">
      {/* Global Noise Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-noise opacity-40"></div>
      
      <ScrollProgress />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <FloatingContact />
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="font-sans text-dark antialiased bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<CaseStudy />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;