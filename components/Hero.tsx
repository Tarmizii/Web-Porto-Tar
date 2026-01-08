import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white">
       {/* Background decorative shapes (Parallax) */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
             className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-60"
             style={{ transform: `translateY(${offset * 0.2}px)` }}
          ></div>
          <div 
             className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-t from-secondary/10 to-transparent blur-3xl opacity-60"
             style={{ transform: `translateY(${-offset * 0.1}px)` }}
          ></div>
          
          {/* Grid Lines - HUD feel */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
       </div>

       <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
         <div className="flex flex-col items-start max-w-4xl">
            
            {/* Role / Class Header */}
            <div className={`overflow-hidden mb-4 border-l-4 border-primary pl-4 transition-all duration-1000 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
               <span className="font-mono text-sm tracking-[0.2em] text-gray-500 uppercase">
                 Class: Designer / Dev
               </span>
            </div>

            {/* Main Title - Character Name */}
            <div className="overflow-hidden mb-2">
               <h1 className={`font-heading font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter text-dark uppercase transform transition-transform duration-1000 ease-out-expo ${loaded ? 'translate-y-0' : 'translate-y-full'}`}>
                 Tarmizi
               </h1>
            </div>
            
            <div className="overflow-hidden mb-8">
               <h2 className={`font-heading font-bold text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary transform transition-transform duration-1000 delay-100 ease-out-expo ${loaded ? 'translate-y-0' : 'translate-y-full'}`}>
                 Level 25 • Lhokseumawe
               </h2>
            </div>

            {/* Description - Mission Brief */}
            <p className={`text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed mb-12 transform transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
               Mendesain antarmuka yang jelas, visual yang kuat, dan mekanik permainan yang membuat pengguna kembali.
            </p>

            {/* CTA - Start Game */}
            <div className={`transform transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <a 
                href="#portfolio"
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-dark text-white font-heading font-bold text-lg tracking-wider uppercase overflow-hidden btn-game shadow-[4px_4px_0px_0px_rgba(250,92,92,1)] hover:shadow-[2px_2px_0px_0px_rgba(250,92,92,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                 <span className="relative z-10 flex items-center gap-2">
                    Start Exploration <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                 </span>
                 {/* Hover Glow Effect */}
                 <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
            </div>

         </div>
       </div>

       {/* Decorative Bottom HUD */}
       <div className="absolute bottom-10 right-6 md:right-12 text-right hidden md:block opacity-50">
          <div className="text-[10px] font-mono tracking-widest mb-1">SYSTEM STATUS</div>
          <div className="flex items-center gap-2 justify-end">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="font-bold">ONLINE</span>
          </div>
       </div>
    </section>
  );
};

export default Hero;