import React from 'react';
import { APP_NAME } from '../../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-slate-400 py-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <p className="text-sm">© 2025 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
