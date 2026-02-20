import React from 'react';

const BentoGrid: React.FC = () => {
  return (
    <section className="pt-20 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
          
          {/* Box 1 - Left Column Tall - How PromoHub Increases Revenue */}
          <div className="md:col-span-2 md:row-span-2 bg-[#ea580b] rounded-2xl p-6 md:p-8 shadow-lg flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-left" style={{ lineHeight: '1.2' }}>
              How PromoHub Increases Revenue
            </h2>
            <p className="text-white/90 text-left leading-relaxed text-base sm:text-lg md:text-[19px] font-medium">
              Smart automation and intelligent promotion stacking that drives higher order values without sacrificing profit margins.
            </p>
          </div>

          {/* Box 2 - Top Right - Auto-Applied Discounts - Image + Content */}
          <div className="md:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200 transition-all duration-300 overflow-hidden">
            <div className="flex flex-col md:flex-row items-stretch h-full">
              {/* Left Side - Image/Visual */}
              <div className="md:w-1/2 overflow-hidden">
                <img 
                  src="/auto_applied_discounts.jpg" 
                  alt="Auto-Applied Discounts" 
                  className="w-full h-full object-cover"
                  style={{ display: 'block', minHeight: '100%' }}
                />
              </div>
              
              {/* Right Side - Content */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-3">Auto-Applied Discounts</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base md:text-[19px] font-medium">
                  No codes required. Offers apply automatically at checkout. Higher conversion, less confusion.
                </p>
              </div>
            </div>
          </div>

          {/* Box 3 - Middle Right - Tiered & Volume Incentives */}
          <div className="md:col-span-2 bg-white rounded-2xl px-8 py-6 shadow-sm border border-slate-200 hover:border-[#ea580b] transition-all duration-300 text-center">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/filled_cart.png" 
                alt="Shopping Cart" 
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2">Tiered & Volume Incentives</h3>
            <p className="text-sm sm:text-base md:text-[19px] font-medium text-slate-600 leading-relaxed">
              Encourage larger carts with structured reward logic.
            </p>
          </div>

          {/* Box 4 - Middle Right - Smart Rule Builder */}
          <div className="md:col-span-2 bg-[#1a1a1a] rounded-2xl py-6 shadow-sm transition-all duration-300 text-center" style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Smart Rule Builder</h3>
            <p className="text-sm sm:text-base md:text-[19px] font-medium text-white/90 leading-relaxed mb-6">
              Control promotions by product, cart value, location, tags, and more.
            </p>
            <button className="bg-white text-[#1a1a1a] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2">
              Get Early Access
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="4" height="4"/>
                <rect x="10" y="2" width="4" height="4"/>
                <rect x="18" y="2" width="4" height="4"/>
                <rect x="10" y="10" width="4" height="4"/>
                <rect x="18" y="10" width="4" height="4"/>
                <rect x="18" y="18" width="4" height="4"/>
              </svg>
            </button>
          </div>

          {/* Center Box - Intelligent Offer Stacking - Wide */}
          <div className="md:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-[#ea580b] transition-all duration-300 overflow-hidden">
            <div className="flex flex-col md:flex-row h-full">
              {/* Left Side - Content */}
              <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-3">Intelligent Offer Stacking</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base md:text-[19px] font-medium">
                  Let customers combine promotions the right way without breaking your margins.
                </p>
              </div>
              
              {/* Right Side - Icon */}
              <div className="md:w-1/3 p-6 md:p-8 flex items-center justify-center">
                <div className="relative w-24 h-24 md:w-32 md:h-32" style={{ padding: '10px' }}>
                  {/* Outer large gray background circle */}
                  <div className="absolute inset-0 rounded-full bg-gray-100"></div>
                  
                  {/* Middle white circle */}
                  <div className="absolute inset-4 rounded-full bg-white"></div>
                  
                  {/* Progress ring */}
                  <svg className="absolute inset-4 transform -rotate-90" viewBox="0 0 160 160">
                    {/* Light gray base circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="72"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                    />
                    {/* Orange arc (270 degrees / 75% progress) */}
                    <circle
                      cx="80"
                      cy="80"
                      r="72"
                      fill="none"
                      stroke="#ea580b"
                      strokeWidth="16"
                      strokeDasharray="452"
                      strokeDashoffset="113"
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ padding: '10px' }}>
                    <img 
                      src="/stacking.png" 
                      alt="Promotion Stack" 
                      className="object-contain"
                      style={{ width: '50px', height: '50px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Box 5 - Bottom Right - One App Instead of Many */}
          <div className="md:col-span-2 bg-white rounded-2xl px-8 py-6 shadow-sm border border-slate-200 hover:border-[#ea580b] transition-all duration-300" style={{ paddingTop: '2rem' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#ea580b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2">One App Instead of Many</h3>
            <p className="text-sm sm:text-base md:text-[19px] font-medium text-slate-600 leading-relaxed">
              Reduce app conflicts and eliminate unnecessary costs.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
