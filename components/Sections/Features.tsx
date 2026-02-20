import React from 'react';
import { FEATURES, BENEFITS } from '../../constants';
import { FeatureItem, BenefitItem } from '../../types';

interface CombinedItem {
  feature: FeatureItem;
  benefit: BenefitItem;
}

interface FeaturesProps {
  sectionTitle?: string;
  sectionDescription?: string;
  maxItems?: number;
  hideBenefits?: boolean;
  calloutBox?: React.ReactNode;
  customFeatures?: FeatureItem[];
  gridCols?: string;
  afterContent?: React.ReactNode;
  hideSubtitle?: boolean;
}

const FeatureBenefitCard: React.FC<{ item: CombinedItem; hideBenefits?: boolean }> = ({ item, hideBenefits }) => (
  <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 hover:border-[#ea580b] shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 h-full flex flex-col">
    {/* Feature Icon */}
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-50 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-brand-600 shadow-sm">
      {React.cloneElement(item.feature.icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5 sm:w-6 sm:h-6' })}
    </div>
    
    {/* Feature Content */}
    <div className="flex-grow">
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">{item.feature.title}</h3>
      <p className="text-slate-600 leading-relaxed text-[19px] font-medium">
        {item.feature.description}
      </p>
    </div>

    {!hideBenefits && (
      <>
        {/* Divider */}
        <div className="border-t border-slate-100 my-4 sm:my-6"></div>

        {/* Benefit Content */}
        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl" style={{ background: '#ea580b' }}>
          <div>
            <span className="block text-xs sm:text-[15px] font-bold text-white tracking-widest uppercase mb-1 sm:mb-2">
              BENEFIT
            </span>
            <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
              {item.benefit.description}
            </p>
          </div>
        </div>
      </>
    )}
  </div>
);

const Features: React.FC<FeaturesProps> = ({ sectionTitle, sectionDescription, maxItems, hideBenefits, calloutBox, customFeatures, gridCols, afterContent, hideSubtitle }) => {
  // Combine features and benefits by index
  const featureList = customFeatures || FEATURES;
  const combinedItems: CombinedItem[] = featureList.map((feature, index) => ({
    feature,
    benefit: BENEFITS[index] || { title: "", description: "", icon: null }
  }));

  // Limit items if maxItems is specified
  const displayItems = maxItems ? combinedItems.slice(0, maxItems) : combinedItems;

  return (
    <section id="features" className="pt-16 md:pt-24 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {!hideSubtitle && (
            <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase mb-2">
              Why Choose Our Shopify Custom Promo App
            </h2>
          )}
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight" style={{ marginBottom: '40px', lineHeight: '1.2' }}>
            {sectionTitle || (
              <>Powerful Features, <br className="hidden md:block" /> Clear Benefits</>
            )}
          </p>
          <p className="text-[19px] font-medium text-slate-600 max-w-2xl mx-auto">
            {sectionDescription || "Everything you need to run smarter promotions, increase AOV, and save time, all in one place."}
          </p>
        </div>

        <div className={gridCols || "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"}>
          {displayItems.map((item, idx) => (
            <FeatureBenefitCard key={idx} item={item} hideBenefits={hideBenefits} />
          ))}
          {calloutBox && calloutBox}
        </div>
        
        {afterContent && afterContent}
      </div>
    </section>
  );
};

export default Features;