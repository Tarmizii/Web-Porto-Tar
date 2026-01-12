import React, { useEffect, useState } from 'react';
import { useContent } from './ContentContext';
import { useNavigate } from 'react-router-dom';
import { Play, Maximize2 } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { projects } = useContent();
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);

  const handleProjectClick = (id: string) => {
      navigate(`/project/${id}`);
      window.scrollTo(0,0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="portfolio" className="relative py-32 bg-gray-50 overflow-hidden">
       {/* Section Number with Parallax */}
       <div 
         className="absolute -top-24 right-6 pointer-events-none transition-transform duration-75 ease-out"
         style={{ transform: `translateY(${offset * 0.08}px)` }}
       >
          <span className="font-heading font-black text-9xl text-gray-200 opacity-50 stroke-text">03</span>
       </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 reveal-up">
            <div>
                <span className="font-mono text-primary text-sm tracking-widest uppercase mb-2 block">Mission Log</span>
                <h2 className="font-heading font-black text-4xl md:text-5xl text-dark">LEVEL SELECTION</h2>
            </div>
            {/* Visual Progress Bar decoration */}
            <div className="hidden md:flex flex-col items-end gap-1 mt-4 md:mt-0">
               <span className="font-mono text-[10px] text-gray-400">COMPLETION 60%</span>
               <div className="flex gap-1">
                  <div className="w-8 h-2 bg-primary"></div>
                  <div className="w-8 h-2 bg-primary"></div>
                  <div className="w-8 h-2 bg-primary"></div>
                  <div className="w-8 h-2 bg-gray-200"></div>
                  <div className="w-8 h-2 bg-gray-200"></div>
               </div>
            </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {projects.map((project, index) => {
            const isFeatured = index === 0;
            
            return (
                <div 
                  key={project.id} 
                  className={`group cursor-pointer relative ${isFeatured ? 'md:col-span-2 row-span-2' : ''} reveal-up`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  onClick={() => handleProjectClick(project.id)}
                >
                  {/* Card Container with enhanced hover border/shadow */}
                  <div className={`overflow-hidden bg-gray-200 w-full h-full relative border-2 border-transparent group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(250,92,92,0.4)] transition-all duration-300 rounded-lg ${isFeatured ? 'aspect-[4/3]' : 'aspect-square'}`}>
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-20 bg-dark/90 backdrop-blur text-white text-[10px] font-mono uppercase font-bold px-3 py-1.5 rounded-sm border-l-2 border-accent">
                       {project.category}
                    </div>

                    {/* Image with Scale and Filter */}
                    <img 
                      src={project.thumbnail} 
                      alt={`${project.title} thumbnail`} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105 group-hover:saturate-100 filter saturate-[0.8]"
                      loading="lazy"
                    />
                    
                    {/* Pulse Overlay Effect on Hover */}
                    <div className="absolute inset-0 border-4 border-primary/0 group-hover:border-primary/50 group-hover:animate-pulse pointer-events-none transition-all duration-300 rounded-lg z-10"></div>

                    {/* Overlay Info (Slide Up) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8 z-20">
                        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-300 ease-out-expo delay-75">
                           <h3 className="text-white font-heading font-black text-2xl md:text-3xl uppercase mb-2 leading-none drop-shadow-lg">
                              {project.title}
                           </h3>
                           <p className="text-gray-200 text-sm mb-6 line-clamp-2 font-light border-l border-white/30 pl-3">
                              {project.shortDescription}
                           </p>
                           
                           <div className="flex items-center gap-3">
                               {/* Button visibility enhanced */}
                               <button className="flex items-center gap-2 bg-primary hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                                  <Play size={12} fill="currentColor" /> Enter Level
                               </button>
                               <div className="p-2 border border-white/20 rounded-sm text-white hover:bg-white/10 transition-colors">
                                  <Maximize2 size={14} />
                               </div>
                           </div>
                        </div>
                    </div>
                  </div>

                  {/* Decoration Corner (visible on hover) */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 border-l-4 border-t-4 border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 z-30"></div>
                  <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-4 border-b-4 border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 z-30"></div>
                </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Portfolio;