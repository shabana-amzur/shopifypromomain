import React from 'react';
import { FEATURES, BENEFITS } from '../../constants';
import { FeatureItem, BenefitItem } from '../../types';
import { IconArrowRight } from '../Icons';

interface CombinedItem {
  feature: FeatureItem;
  benefit: BenefitItem;
}

const FeatureBenefitCard: React.FC<{ item: CombinedItem }> = ({ item }) => (
  <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 h-full flex flex-col">
    {/* Feature Icon */}
    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 text-brand-600 shadow-sm">
      {React.cloneElement(item.feature.icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}
    </div>
    
    {/* Feature Content */}
    <div className="flex-grow">
      <h3 className="text-xl font-bold text-slate-900 mb-3">{item.feature.title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
        {item.feature.description}
      </p>
    </div>

    {/* Divider */}
    <div className="border-t border-slate-100 my-6"></div>

    {/* Benefit Content */}
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-3 mt-1">
        <div className="w-5 h-5 rounded-full bg-[#95BF47]/10 flex items-center justify-center">
             <IconArrowRight className="w-3 h-3 text-[#95BF47]" />
        </div>
      </div>
      <div>
        <span className="block text-[11px] font-bold text-[#95BF47] tracking-widest uppercase mb-1">
          Benefit
        </span>
        <p className="text-sm font-medium text-slate-700 leading-relaxed">
          {item.benefit.description}
        </p>
      </div>
    </div>
  </div>
);

const Features: React.FC = () => {
  // Combine features and benefits by index
  const combinedItems: CombinedItem[] = FEATURES.map((feature, index) => ({
    feature,
    benefit: BENEFITS[index] || { title: "", description: "", icon: null }
  }));

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase mb-2">
            Why Choose ShopifyPromoHub
          </h2>
          <p className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Powerful Features, <br className="hidden md:block" /> Clear Benefits
          </p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to run smarter promotions, increase AOV, and save time—all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {combinedItems.map((item, idx) => (
            <FeatureBenefitCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;