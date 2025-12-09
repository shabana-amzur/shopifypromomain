import React from 'react';
import { BENEFITS } from '../../constants';
import { BenefitItem } from '../../types';

const BenefitCard: React.FC<{ benefit: BenefitItem }> = ({ benefit }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
      {benefit.icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
    <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
  </div>
);

const Benefits: React.FC = () => {
  const rowOneBenefits = BENEFITS.slice(0, 2);
  const rowTwoBenefits = BENEFITS.slice(2, 5);

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase mb-2">Results</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Why Merchants Love This App
          </p>
          <p className="text-lg text-slate-600">
            Drive higher AOV, reduce promo errors, and launch campaigns faster.
          </p>
        </div>

        <div className="space-y-8">
          {/* Row 1: 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rowOneBenefits.map((benefit, idx) => (
              <BenefitCard key={idx} benefit={benefit} />
            ))}
          </div>

          {/* Row 2: 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rowTwoBenefits.map((benefit, idx) => (
              <BenefitCard key={idx} benefit={benefit} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
