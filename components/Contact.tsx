import React from 'react';
import { useContent } from './ContentContext';
import Footer from './Footer';
import { ArrowRight, Terminal } from 'lucide-react';

interface ContactProps {
    simpleMode?: boolean;
}

const Contact: React.FC<ContactProps> = ({ simpleMode = false }) => {
  const { contactInfo } = useContent();

  return (
    <section id="contact" className="relative pt-32 pb-10 bg-white flex flex-col min-h-[70vh] justify-between border-t border-gray-100">
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="container mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center relative z-10">
        
        <div className="max-w-4xl reveal-up">
            <div className="flex items-center gap-4 mb-6">
               <div className="h-[2px] w-12 bg-primary"></div>
               <span className="font-mono text-dark text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                   <Terminal size={14} /> System Message
               </span>
            </div>
            
            <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-dark mb-12 tracking-tight">
                READY TO <br/>
                COLLABORATE?
            </h2>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <a 
                    href={`mailto:${contactInfo.email}`} 
                    className="group relative px-10 py-5 bg-primary text-white font-heading font-bold text-xl uppercase tracking-wider overflow-hidden btn-game transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(250,92,92,0.6)]"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        Initiate Contact <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    
                    {/* Hover Glow/Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                    
                    {/* Background darkening on hover */}
                    <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-300"></div>
                </a>

                <div className="flex gap-6">
                     <a href={contactInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 font-mono text-sm hover:text-primary transition-colors hover:underline flex items-center gap-1">
                        [ WHATSAPP ]
                     </a>
                     <a href="/cv-tarmizi.pdf" target="_blank" className="text-gray-500 font-mono text-sm hover:text-primary transition-colors hover:underline flex items-center gap-1">
                        [ DOWNLOAD DATA ]
                     </a>
                </div>
            </div>
        </div>

      </div>

      <Footer />
    </section>
  );
};

export default Contact;