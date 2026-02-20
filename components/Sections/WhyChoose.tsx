import React from 'react';

const WhyChoose: React.FC = () => {
  const features = [
    "No advanced stacking logic",
    "Manual configuration",
    "Limited automation",
    "No unified control engine"
  ];

  return (
    <section className="pt-8 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Heading and Checklist */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4" style={{ lineHeight: '1.2' }}>
              Why Not Just Use Native Shopify Discounts?
            </h2>
            <p className="font-medium text-slate-600 mb-8 text-base sm:text-lg md:text-[19px]">
              Shopify's built-in discount system is limited.
            </p>
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#ea580b' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="font-medium text-slate-900 text-base sm:text-lg md:text-[19px]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-bold text-slate-900 text-base sm:text-lg md:text-[19px]">
              PromoHub gives you precision, flexibility, and automation.
            </p>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <img 
              src="/Why%20Not%20Just%20Use%20Native%20Shopify%20Discounts.jpg" 
              alt="Why Not Just Use Native Shopify Discounts" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
