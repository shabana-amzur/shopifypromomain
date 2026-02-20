import React from 'react';

const ComingSoon: React.FC = () => {
  const features = [
    {
      title: "App configurable for multiple ERPs",
      description: "Works with leading ERPs so promotions stay synced without manual updates.",
      image: "/App configurable for multiple ERPs.jpg"
    },
    {
      title: "Advanced Analytics",
      description: "Understand which promotions drive revenue, engagement, and repeat purchases.",
      image: "/Advanced Analytics.jpg"
    },
    {
      title: "Testing Tools",
      description: "Compare different promotion setups and see what performs best before scaling.",
      image: "/Testing Tools.jpg"
    }
  ];

  return (
    <section className="py-20 bg-[#0A1628]" style={{ marginTop: '40px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Coming Soon
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-[#1a2744] rounded-xl border border-slate-700 overflow-hidden hover:border-[#ea580b] transition-all duration-300"
            >
              {/* Image Container */}
              <div className="aspect-video bg-slate-800 relative overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback gradient if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%)';
                    }
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: '#ea580b' }}>
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
