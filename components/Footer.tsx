import React from 'react';
import { Link } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-20 border-t border-gray-100 pt-8 pb-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-6 md:gap-0">
        <p>© {new Date().getFullYear()} Tarmizi. Lhokseumawe, ID.</p>
        <div className="flex items-center gap-6 flex-col md:flex-row">
            <p className="font-mono text-xs">DESIGNED WITH REACT & TAILWIND</p>
            <Link 
              to="/admin" 
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-dark hover:text-white rounded-md text-sm font-bold text-gray-600 transition-all duration-300 shadow-sm border border-transparent hover:border-gray-800"
            >
                <LockKeyhole size={16} />
                <span>Admin Panel</span>
            </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;