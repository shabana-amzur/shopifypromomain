import React from 'react';

const TopBanner: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <div className="inline-flex items-center bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold">
          Promotions
        </div>
        <span className="text-sm md:text-base text-slate-700 font-medium">
          Smarter Discounts, Higher Revenue
        </span>
        <svg 
          className="w-4 h-4 text-slate-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default TopBanner;
