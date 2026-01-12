import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from './ContentContext';
import { ArrowLeft, ExternalLink, Database, Target, Layers, Trophy } from 'lucide-react';
import Contact from './Contact';

const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects } = useContent();
  const project = projects.find(p => p.id === id);
  const [activeSection, setActiveSection] = useState('briefing');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
        const sections = ['briefing', 'objectives', 'tactics', 'outcome'];
        let current = '';
        
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                // If section top crosses the top third of the screen, it becomes active
                if (rect.top < window.innerHeight * 0.4) {
                    current = section;
                }
            }
        }
        
        // If we are at the very top, default to first
        if (window.scrollY < 200) {
            current = 'briefing';
        }

        if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const offset = 120; // Height of nav + breathing room
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
      
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 font-heading">DATA NOT FOUND</h2>
        <button onClick={() => navigate('/')} className="text-primary underline font-mono">RETURN TO BASE</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in font-sans selection:bg-primary selection:text-white">
      {/* Top HUD Nav */}
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-50 border-b-2 border-gray-100 h-16 flex items-center">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')} 
            className="group flex items-center text-gray-500 hover:text-dark transition-colors font-mono text-sm uppercase font-bold tracking-wider"
          >
            <span className="p-1 border border-gray-300 rounded mr-2 group-hover:bg-dark group-hover:text-white transition-all"><ArrowLeft size={16} /></span>
            Mission Select
          </button>
          <div className="hidden md:block font-mono text-xs text-primary bg-primary/10 px-3 py-1 rounded">
             STATUS: DECLASSIFIED
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        
        {/* Mission Header */}
        <div className="container mx-auto px-6 md:px-12 max-w-5xl mb-12">
           <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-12 bg-dark"></span>
              <span className="text-dark font-mono font-bold tracking-[0.2em] uppercase text-sm">Mission Report</span>
           </div>
           
           <h1 className="font-heading font-black text-6xl md:text-8xl lg:text-9xl text-dark mb-8 leading-[0.85] uppercase tracking-tighter">
             {project.title.split('—')[0]}
           </h1>
           
           {/* Visual Update: Clean border-left description */}
           <div className="flex items-stretch gap-6 pl-2">
             <div className="w-1.5 bg-primary flex-shrink-0"></div>
             <p className="text-xl md:text-3xl text-gray-500 font-light leading-normal py-2">
               {project.shortDescription}
             </p>
           </div>
        </div>

        {/* Tactical Image View */}
        <div className="container mx-auto px-6 md:px-12 max-w-6xl mb-16">
            <div className="relative rounded-xl overflow-hidden border-[3px] border-dark shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] bg-dark group">
                <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-auto opacity-100 group-hover:opacity-90 transition-opacity"
                />
                {/* HUD Overlay on Image */}
                <div className="absolute top-4 right-4 bg-dark text-white font-mono text-[10px] px-3 py-1.5 font-bold tracking-wider border border-white/20">
                   IMG_SOURCE_01.PNG
                </div>
            </div>
        </div>

        {/* Mission Data Grid */}
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 border-y border-gray-300 py-8">
                <div>
                   <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">Role</span>
                   <span className="block font-bold text-dark text-lg">{project.role}</span>
                </div>
                <div>
                   <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">Class</span>
                   <span className="block font-bold text-dark text-lg">{project.category}</span>
                </div>
                <div>
                   <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">Tools</span>
                   <span className="block font-bold text-dark text-sm">{project.tools.join(', ')}</span>
                </div>
                <div className="flex items-center justify-end">
                    {project.artifactLink && (
                        <a 
                            href={project.artifactLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-2 bg-dark text-white px-5 py-3 text-xs font-bold uppercase tracking-wider hover:bg-primary transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                        >
                            Artifact <ExternalLink size={12} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative">
                
                {/* Sidebar Navigation with Active State */}
                <div className="hidden md:block md:col-span-3">
                   <div className="sticky top-32 space-y-6">
                      <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-4">Table of Contents</div>
                      {[
                        { id: 'briefing', label: 'Briefing' },
                        { id: 'objectives', label: 'Objectives' },
                        { id: 'tactics', label: 'Tactics' },
                        { id: 'outcome', label: 'Outcome' }
                      ].map((item) => (
                          <button 
                            key={item.id} 
                            onClick={() => scrollToSection(item.id)}
                            className={`block w-full text-left pl-4 border-l-2 transition-all duration-300 text-sm py-1 ${
                              activeSection === item.id 
                                ? 'border-primary text-dark font-bold translate-x-1' 
                                : 'border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300'
                            }`}
                          >
                              {item.label}
                          </button>
                      ))}
                   </div>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-9 space-y-24">
                    
                    {/* Briefing */}
                    <section id="briefing" className="relative scroll-mt-32">
                        <div className="absolute -left-16 top-1 text-gray-300 -rotate-90 origin-bottom-right font-mono text-[10px] tracking-widest hidden lg:block">SEC_01</div>
                        <h2 className="font-heading font-black text-3xl md:text-4xl text-dark mb-8 flex items-center gap-3 uppercase">
                            <Database className="text-primary w-8 h-8" strokeWidth={3} /> BRIEFING
                        </h2>
                        <div className="prose prose-lg prose-gray max-w-none font-light text-gray-600 leading-loose">
                           <p>{project.background || "No briefing data available."}</p>
                        </div>
                    </section>

                    {/* Objectives / Problem */}
                    {project.problem && (
                        <section id="objectives" className="scroll-mt-32">
                             <h2 className="font-heading font-black text-3xl md:text-4xl text-dark mb-8 flex items-center gap-3 uppercase">
                                <Target className="text-primary w-8 h-8" strokeWidth={3} /> Objectives
                            </h2>
                            <div className="bg-white border-l-4 border-red-500 p-8 md:p-10 shadow-sm relative overflow-hidden group">
                                <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Target size={150} className="text-red-500" />
                                </div>
                                <h3 className="font-bold text-red-500 text-xs tracking-widest uppercase mb-4">Core Problem</h3>
                                <p className="text-xl text-dark font-medium leading-relaxed relative z-10">
                                    {project.problem}
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Tactics / Process */}
                    {project.process && (
                        <section id="tactics" className="scroll-mt-32">
                            <h2 className="font-heading font-black text-3xl md:text-4xl text-dark mb-10 flex items-center gap-3 uppercase">
                                <Layers className="text-primary w-8 h-8" strokeWidth={3} /> TACTICS
                            </h2>
                            <div className="space-y-6">
                                {project.process.map((step, idx) => (
                                    <div key={idx} className="flex items-start group bg-white p-6 rounded-lg border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center mr-6 font-mono font-bold text-lg text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors rounded">
                                            0{idx + 1}
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-gray-700 text-lg leading-relaxed">{step}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Outcome & Results */}
                    <section id="outcome" className="scroll-mt-32">
                         <h2 className="font-heading font-black text-3xl md:text-4xl text-dark mb-8 flex items-center gap-3 uppercase">
                            <Trophy className="text-primary w-8 h-8" strokeWidth={3} /> OUTCOME
                        </h2>
                        <div className="bg-dark text-white p-8 md:p-10 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary blur-[80px] opacity-20"></div>
                            <p className="text-xl md:text-2xl leading-relaxed opacity-90 font-light relative z-10">
                                {project.solution || "Solution pending declassification."}
                            </p>
                        </div>
                        {project.results && (
                            <div className="flex items-center gap-6 border-l-4 border-green-500 pl-6 py-4 bg-green-50/50">
                                <div>
                                    <span className="block text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Mission Success Metric</span>
                                    <p className="text-green-900 font-bold text-lg md:text-xl">
                                        {project.results}
                                    </p>
                                </div>
                            </div>
                        )}
                    </section>

                </div>
            </div>

        </div>
      </main>

      <div className="bg-white border-t-2 border-dashed border-gray-200">
        <Contact simpleMode={true} />
      </div>
    </div>
  );
};

export default CaseStudy;