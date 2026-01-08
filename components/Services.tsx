import React, { useState, useEffect } from 'react';
import { SERVICES } from '../constants';
import { Layout, Palette, Gamepad2, Zap } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  layout: <Layout size={40} />,
  palette: <Palette size={40} />,
  gamepad: <Gamepad2 size={40} />,
};

const Services: React.FC = () => {
  const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);

  const toggleMobile = (index: number) => {
    setActiveMobileIndex(activeMobileIndex === index ? null : index);
  };

  const handleDesktopClick = (index: number) => {
    // Allows clicking to toggle flip on desktop, useful if hover isn't preferred or for accessibility
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-20 md:py-32 relative text-white bg-gradient-to-br from-primary to-[#e04545] overflow-hidden">
       {/* Background Grid/Pattern */}
       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
       
       <div 
         className="absolute top-0 left-0 -ml-10 -mt-10 select-none pointer-events-none opacity-20 transition-transform duration-100 ease-out"
         style={{ transform: `translateY(${offset * 0.05}px)` }}
       >
         <span className="font-heading font-black text-[10rem] md:text-[16rem] text-dark mix-blend-overlay">02</span>
       </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-end justify-between mb-12 md:mb-16 border-b border-white/20 pb-6 reveal-up">
           <div>
              <span className="font-mono text-accent text-sm tracking-widest uppercase mb-2 block">Skill Tree</span>
              <h2 className="font-heading font-black text-4xl md:text-5xl">ABILITIES</h2>
           </div>
           <div className="hidden md:block text-right">
              <span className="font-mono text-sm opacity-70 bg-black/20 px-2 py-1 rounded">CLICK CARD TO INSPECT</span>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {SERVICES.map((service, index) => (
            <div key={index} className="h-auto md:h-[420px] reveal-up" style={{ transitionDelay: `${index * 0.1}s` }}>
              
              {/* DESKTOP: Flip Card Panel */}
              {/* We use a combination of group-hover and state to ensure interaction works reliably */}
              <div 
                className="hidden md:block group w-full h-full perspective-1000 cursor-pointer"
                onClick={() => handleDesktopClick(index)}
              >
                <div 
                  className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flippedIndex === index ? 'rotate-y-180' : 'group-hover:rotate-y-180'}`}
                >
                  
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden bg-dark/20 backdrop-blur-sm border border-white/20 p-8 flex flex-col justify-between rounded-xl transition-all duration-300 hover:bg-dark/40 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(251,239,118,0.15)]">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-white/10 rounded-lg text-accent shadow-inner">
                           {iconMap[service.icon]}
                        </div>
                        <span className="font-mono text-xs opacity-50 bg-black/20 px-2 py-1 rounded">LVL {index + 1}</span>
                    </div>
                    <div>
                        <h3 className="font-heading font-bold text-2xl leading-tight mb-4">{service.title}</h3>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                           <div className="h-full bg-accent w-2/3"></div>
                        </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden bg-white text-dark p-8 rotate-y-180 flex flex-col justify-center rounded-xl shadow-2xl border-4 border-accent relative overflow-hidden">
                     {/* Tech decoration lines */}
                     <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                     <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-primary"></div>

                     <div className="absolute top-4 right-4 text-primary animate-pulse">
                        <Zap size={24} fill="currentColor" />
                     </div>
                     
                     <h3 className="font-heading font-bold text-xl mb-4 text-primary uppercase tracking-tight">{service.title}</h3>
                     <p className="text-gray-600 mb-6 text-sm leading-relaxed font-medium">
                        {service.description}
                     </p>
                     <div className="space-y-2">
                        {service.outcomes.map((outcome, idx) => (
                            <div key={idx} className="flex items-center text-xs font-bold text-gray-600 bg-gray-100 border border-gray-200 px-3 py-2 rounded-md">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                                {outcome}
                            </div>
                        ))}
                     </div>
                  </div>

                </div>
              </div>

              {/* MOBILE: Accordion Panel */}
              {/* Reduced height constraints and fixed padding for mobile */}
              <div className="md:hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-lg">
                <div 
                    className="flex justify-between items-center p-5 cursor-pointer active:bg-white/20 transition-colors"
                    onClick={() => toggleMobile(index)}
                >
                    <div className="flex items-center gap-4">
                        <span className="text-accent">{iconMap[service.icon]}</span>
                        <h3 className="font-heading font-bold text-lg">{service.title}</h3>
                    </div>
                    <div className={`transition-transform duration-300 ${activeMobileIndex === index ? 'rotate-180' : ''}`}>
                       <Zap size={20} className={activeMobileIndex === index ? 'text-accent' : 'text-white/50'} />
                    </div>
                </div>
                
                <div className={`transition-all duration-300 ease-out-expo ${activeMobileIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-5 pt-0 border-t border-white/10 bg-black/10">
                        <p className="text-white/90 mb-4 text-sm leading-relaxed mt-4 font-light">
                            {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {service.outcomes.map((outcome, idx) => (
                                <span key={idx} className="text-xs font-mono bg-dark/40 text-accent px-2 py-1 rounded border border-white/10">
                                    [{outcome}]
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;