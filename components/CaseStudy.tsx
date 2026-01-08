import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ArrowLeft, ExternalLink, Database, Target, Layers, Trophy } from 'lucide-react';
import Contact from './Contact';

const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
           <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-dark"></span>
              <span className="text-dark font-mono font-bold tracking-widest uppercase text-sm">Mission Report</span>
           </div>
           
           <h1 className="font-heading font-black text-5xl md:text-7xl text-dark mb-6 leading-[0.9] uppercase tracking-tighter">
             {project.title.split('—')[0]}
           </h1>
           
           <div className="bg-white border-l-4 border-primary p-6 shadow-sm">
             <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
               {project.shortDescription}
             </p>
           </div>
        </div>

        {/* Tactical Image View */}
        <div className="container mx-auto px-6 md:px-12 max-w-6xl mb-16">
            <div className="relative rounded-lg overflow-hidden border-2 border-dark shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-dark">
                <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-auto opacity-90"
                />
                {/* HUD Overlay on Image */}
                <div className="absolute top-4 right-4 bg-black/70 text-white font-mono text-[10px] px-2 py-1 backdrop-blur-sm border border-white/20">
                   IMG_SOURCE_01.PNG
                </div>
            </div>
        </div>

        {/* Mission Data Grid */}
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 border-y-2 border-gray-200 py-6">
                <div>
                   <span className="block text-xs font-mono text-gray-400 uppercase mb-1">Role</span>
                   <span className="block font-bold text-dark">{project.role}</span>
                </div>
                <div>
                   <span className="block text-xs font-mono text-gray-400 uppercase mb-1">Class</span>
                   <span className="block font-bold text-dark">{project.category}</span>
                </div>
                <div>
                   <span className="block text-xs font-mono text-gray-400 uppercase mb-1">Tools</span>
                   <span className="block font-bold text-dark text-xs">{project.tools.join(', ')}</span>
                </div>
                <div className="flex items-center justify-end">
                    {project.artifactLink && (
                        <a 
                            href={project.artifactLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-2 bg-dark text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-primary transition-colors"
                        >
                            Artifact <ExternalLink size={12} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                
                {/* Sidebar Navigation (Fake) */}
                <div className="hidden md:block md:col-span-3">
                   <div className="sticky top-32 space-y-4">
                      <div className="text-xs font-mono text-gray-400 uppercase mb-2">Table of Contents</div>
                      {['Briefing', 'Objectives', 'Tactics', 'Outcome'].map((item, i) => (
                          <div key={item} className={`pl-4 border-l-2 ${i === 0 ? 'border-primary text-dark font-bold' : 'border-gray-200 text-gray-400'} text-sm py-1`}>
                              {item}
                          </div>
                      ))}
                   </div>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-9 space-y-16">
                    
                    {/* Background */}
                    <section className="relative">
                        <div className="absolute -left-12 top-0 text-gray-200 -rotate-90 origin-bottom-right font-mono text-xs tracking-widest hidden md:block">SEC_01</div>
                        <h2 className="font-heading font-black text-3xl text-dark mb-6 flex items-center gap-3">
                            <Database className="text-primary" /> BRIEFING
                        </h2>
                        <div className="prose prose-lg text-gray-600">
                           <p>{project.background}</p>
                        </div>
                    </section>

                    {/* Problem */}
                    {project.problem && (
                        <section className="bg-white border border-red-200 rounded-lg p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Target size={100} className="text-red-500" />
                            </div>
                            <h2 className="font-heading font-black text-2xl text-dark mb-4 relative z-10">
                                <span className="text-red-500">//!</span> MISSION OBJECTIVE (PROBLEM)
                            </h2>
                            <p className="text-gray-700 relative z-10 font-medium">
                                {project.problem}
                            </p>
                        </section>
                    )}

                    {/* Process */}
                    {project.process && (
                        <section>
                            <h2 className="font-heading font-black text-3xl text-dark mb-8 flex items-center gap-3">
                                <Layers className="text-primary" /> TACTICS
                            </h2>
                            <div className="space-y-4">
                                {project.process.map((step, idx) => (
                                    <div key={idx} className="flex items-start group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 border border-gray-300 flex items-center justify-center mr-6 font-mono font-bold text-lg text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                                            0{idx + 1}
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-gray-700 text-lg">{step}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Solution & Results */}
                    <section>
                         <h2 className="font-heading font-black text-3xl text-dark mb-6 flex items-center gap-3">
                            <Trophy className="text-primary" /> OUTCOME
                        </h2>
                        <div className="bg-dark text-white p-8 rounded-lg shadow-xl mb-8">
                            <p className="text-lg leading-relaxed opacity-90 font-light">
                                {project.solution}
                            </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-6 py-2 bg-green-50">
                            <p className="text-green-800 font-bold">
                                RESULT: {project.results}
                            </p>
                        </div>
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