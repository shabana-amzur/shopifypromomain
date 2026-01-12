import React from 'react';

interface ComingSoonItem {
  title: string;
  description: string;
}

const ITEMS: ComingSoonItem[] = [
  {
    title: 'App configurable for multiple ERPs',
    description: 'Works with leading ERPs so promotions stay synced without manual updates.',
  },
  {
    title: 'Advanced Analytics',
    description: 'Understand which promotions drive revenue, engagement, and repeat purchases.',
  },
  {
    title: 'Testing Tools',
    description: 'Compare different promotion setups and see what performs best before scaling.',
  },
];

const ComingSoon: React.FC = () => {
  return (
    <section id="coming-soon" className="py-20 my-16 md:my-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">Coming Soon</h2>
          <p className="text-lg text-slate-200">
            Unlock even more promotion power
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="h-full rounded-2xl border border-orange-400/30 bg-white/5 backdrop-blur-sm p-6 shadow-[0_10px_30px_rgba(234,88,12,0.15)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(234,88,12,0.25)] hover:border-orange-400/60"
            >
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-slate-200 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
