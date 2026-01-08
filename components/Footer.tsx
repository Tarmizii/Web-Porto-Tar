import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-20 border-t border-gray-100 pt-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Tarmizi. Lhokseumawe, ID.</p>
        <p className="mt-2 md:mt-0 font-mono text-xs">DESIGNED WITH REACT & TAILWIND</p>
      </div>
    </footer>
  );
};

export default Footer;