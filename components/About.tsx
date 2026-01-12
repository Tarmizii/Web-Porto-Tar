import React, { useEffect, useState } from 'react';
import { useContent } from './ContentContext';
import { Layout, Palette, Gamepad2, ChevronRight, PenTool, Cpu, Eye } from 'lucide-react';

const About: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="relative py-32 bg-white overflow-hidden">
      {/* Decorative Section Number with Parallax */}
      <div 
        className="absolute top-0 right-6 md:right-20 pointer-events-none opacity-10 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${offset * 0.1}px)` }}
      >
        <span className="font-heading font-black text-9xl md:text-[12rem] text-dark stroke-text">01</span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
          
          {/* Left Panel: Bio (Lore) */}
          <div className="lg:w-2/3 reveal-up">
            <div className="inline-block border border-dark px-3 py-1 mb-6 rounded-none relative">
               <span className="font-mono text-xs font-bold uppercase tracking-widest relative z-10">Character Profile</span>
               <div className="absolute top-0 right-0 -mt-1 -mr-1 w-2 h-2 bg-primary"></div>
               <div className="absolute bottom-0 left-0 -mb-1 -ml-1 w-2 h-2 bg-primary"></div>
            </div>
            
            <h2 className="font-heading font-black text-4xl md:text-5xl text-dark mb-8 leading-tight">
              LOGIC MEETS <br/><span className="text-primary">INTUITION.</span>
            </h2>
            
            <div className="bg-panel-bg p-8 rounded-none border border-gray-200 relative hud-corners shadow-sm">
               <div className="prose prose-lg text-gray-600 font-light leading-relaxed">
                  <p className="mb-6">
                    <strong className="text-primary font-mono text-sm uppercase mr-2">[PLAYER]</strong> Tarmizi (Tar)<br/>
                    <strong className="text-primary font-mono text-sm uppercase mr-2">[ORIGIN]</strong> Politeknik Negeri Lhokseumawe (IPK 3.56)<br/>
                    <strong className="text-primary font-mono text-sm uppercase mr-2">[GUILD]</strong> Garis Kode (Zeocaf)
                  </p>
                  <p>
                    Saya menyeimbangkan logika teknis dan intuisi artistik. Di siang hari, saya mendesain sistem yang kompleks untuk instansi pemerintahan. Di malam hari, saya mengeksplorasi narasi interaktif melalui pengembangan game 2D.
                  </p>
               </div>
            </div>
          </div>

          {/* Right Panel: Stats (Skills) */}
          <div className="lg:w-1/3 w-full reveal-up" style={{ transitionDelay: '0.2s' }}>
             <div className="bg-white border-2 border-dark p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] relative">
                
                <h3 className="font-heading font-bold text-xl mb-6 flex items-center gap-2 border-b-2 border-dashed border-gray-200 pb-4">
                   STATS & EQUIPMENT
                </h3>

                <div className="space-y-4 mb-8">
                   <h4 className="font-bold text-sm mb-2 text-dark font-mono bg-gray-100 inline-block px-2">CORE ATTRIBUTES</h4>
                   
                   {/* UI Update: List with Icons */}
                   <div className="space-y-3">
                      <div className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-100 rounded-md hover:border-primary/50 transition-colors group">
                          <div className="p-2 bg-white border border-gray-200 rounded text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                              <Layout size={20} strokeWidth={2} />
                          </div>
                          <div className="flex flex-col">
                              <span className="font-bold text-dark text-sm leading-tight">UI/UX Design</span>
                              <span className="text-[10px] text-gray-400 font-mono tracking-wider">LVL. MASTER</span>
                          </div>
                      </div>

                      <div className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-100 rounded-md hover:border-secondary/50 transition-colors group">
                          <div className="p-2 bg-white border border-gray-200 rounded text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                              <Eye size={20} strokeWidth={2} />
                          </div>
                          <div className="flex flex-col">
                              <span className="font-bold text-dark text-sm leading-tight">Visual Design</span>
                              <span className="text-[10px] text-gray-400 font-mono tracking-wider">LVL. ADVANCED</span>
                          </div>
                      </div>

                      <div className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-100 rounded-md hover:border-accent/50 transition-colors group">
                          <div className="p-2 bg-white border border-gray-200 rounded text-accent group-hover:bg-accent group-hover:text-dark transition-colors">
                              <Cpu size={20} strokeWidth={2} />
                          </div>
                          <div className="flex flex-col">
                              <span className="font-bold text-dark text-sm leading-tight">Game Logic</span>
                              <span className="text-[10px] text-gray-400 font-mono tracking-wider">LVL. EXPERT</span>
                          </div>
                      </div>
                   </div>
                </div>

                <div>
                   <h4 className="font-bold text-sm mb-3 text-dark font-mono bg-gray-100 inline-block px-2">INVENTORY</h4>
                   <div className="flex flex-wrap gap-2">
                      {['Figma', 'Unity', 'Photoshop', 'Notion', 'C#'].map(tool => (
                         <span key={tool} className="px-2 py-1 bg-white border border-gray-300 text-xs font-mono font-bold text-gray-600 hover:bg-dark hover:text-white transition-colors cursor-default">
                            {tool}
                         </span>
                      ))}
                   </div>
                </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;