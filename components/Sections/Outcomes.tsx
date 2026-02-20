import React from 'react';

const Outcomes: React.FC = () => {
  return (
    <section className="pt-8 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rounded Border Container */}
        <div className="bg-gray-100 rounded-3xl p-12 md:p-16">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.2' }}>
              What This Means For Your Store
            </h2>
            <p className="text-[19px] font-medium text-slate-600">
              Revenue growth without adding complexity.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-[#ea580b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Higher average order value</h3>
              <p className="text-[14px] font-medium text-slate-600">
                Encourage customers to add more to cart with structured, stackable incentives.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-[#ea580b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">More completed checkouts</h3>
              <p className="text-[14px] font-medium text-slate-600">
                Clear, auto-applied discounts reduce confusion and friction at checkout.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-[#ea580b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fewer abandoned carts</h3>
              <p className="text-[14px] font-medium text-slate-600">
                Remove promotion friction that makes buyers hesitate.
              </p>
            </div>
          </div>

          {/* Bottom Row - 2 Cards Centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-[#ea580b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Faster campaign launches</h3>
              <p className="text-[14px] font-medium text-slate-600">
                Launch complex promotions in minutes instead of coordinating multiple apps.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-[#ea580b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Reduced app expenses</h3>
              <p className="text-[14px] font-medium text-slate-600">
                Replace multiple discount tools with one unified promotion engine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
