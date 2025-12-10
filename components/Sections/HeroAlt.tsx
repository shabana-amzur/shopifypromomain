import React, { useState } from 'react';
import { 
  IconLayers, 
  IconTag, 
  IconBarChart,
  IconPlay,
  IconX
} from '../Icons';

// --- Types & Data ---

interface FloatingBox {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay: number;
}

const FLOATING_BOXES: FloatingBox[] = [
  { 
    title: "Stackable Offers", 
    subtitle: "No more conflicts", 
    icon: <IconLayers className="w-5 h-5 text-[#95BF47]" />,
    position: 'top-left',
    delay: 0,
  },
  { 
    title: "Tiered Discounts", 
    subtitle: "Reward loyalty", 
    icon: <IconTag className="w-5 h-5 text-[#95BF47]" />,
    position: 'top-right',
    delay: 1000,
  },
  { 
    title: "AOV Insights", 
    subtitle: "Track value", 
    icon: <IconBarChart className="w-5 h-5 text-brand-600" />,
    position: 'bottom-left',
    delay: 2000,
  },
];

const HeroAlt: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const getPositionClasses = (position: string) => {
    switch(position) {
      case 'top-left': return 'top-20 left-4 md:left-12 lg:left-20';
      case 'top-right': return 'top-20 right-4 md:right-12 lg:right-20';
      case 'bottom-left': return 'bottom-20 left-4 md:left-12 lg:left-20';
      case 'bottom-right': return 'bottom-20 right-4 md:right-12 lg:right-20';
      default: return '';
    }
  };
  
  return (
    <>
      <section id="home-alt" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50/70 via-white to-orange-50/30 pt-16 px-4">
        
        {/* --- Background Texture --- */}
        <div className="absolute inset-0 z-0 opacity-[0.4]" 
             style={{ 
               backgroundImage: `radial-gradient(#fdba74 0.8px, transparent 0.8px)`, 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        {/* --- Animated Background Blobs --- */}
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] md:w-[50rem] md:h-[50rem] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] md:w-[50rem] md:h-[50rem] bg-[#95BF47]/30 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] animate-blob animation-delay-2000"></div>

        {/* =========================================
            FLOATING BOXES - Positioned at periphery
           ========================================= */}
        {FLOATING_BOXES.map((box, idx) => (
          <div 
            key={idx}
            className={`hidden lg:block absolute z-10 animate-float ${getPositionClasses(box.position)}`}
            style={{ animationDelay: `${box.delay}ms` }}
          >
            <div className="flex items-center gap-3 p-3 bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl shadow-orange-900/5 rounded-xl hover:scale-105 hover:shadow-2xl hover:border-orange-200 transition-all duration-300">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-brand-600">
                {box.icon}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">{box.title}</p>
                <p className="text-[10px] text-slate-500 font-medium">{box.subtitle}</p>
              </div>
            </div>
          </div>
        ))}

        {/* =========================================
            MAIN CONTENT - Two Column Layout
           ========================================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12">
        <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12">
          
          {/* =========================================
              LEFT SIDE - Text Content & CTAs
             ========================================= */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center justify-center bg-[#95BF47] rounded-full px-4 py-1.5 mb-8 animate-fade-in-up shadow-sm">
              <span className="text-[10px] sm:text-xs font-bold text-white tracking-widest uppercase">
                JOIN THE WAITLIST
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 animate-fade-in-up drop-shadow-sm" style={{ animationDelay: '0.1s' }}>
              Smarter Promotions for Shopify <br className="hidden sm:block"/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-500">
                One Powerful App.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
              Advanced discounts, stackable offers, and fully synchronized campaigns. No code required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a 
                href="#waitlist"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Join Waitlist
              </a>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-600 font-bold rounded-xl border-2 border-brand-500 hover:bg-brand-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <IconPlay className="w-5 h-5 mr-2 fill-current" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* =========================================
              RIGHT SIDE - Demo Video with Play Button
             ========================================= */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
              {/* Video Thumbnail/Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 text-slate-400">
                    <IconPlay className="w-16 h-16 mx-auto opacity-20" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium">Video Preview</p>
                </div>
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
                <div className="relative">
                  {/* Pulsing Rings */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="block w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/40 animate-pulse-ring" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="block w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/20 animate-pulse-ring delay-[1000ms]" />
                  </div>
                  
                  {/* Play Button */}
                  <button 
                    className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 border-4 border-white/50"
                    aria-label="Watch Demo Video"
                  >
                    <IconPlay className="w-8 h-8 sm:w-10 sm:h-10 text-brand-500 fill-current ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* --- Video Modal --- */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsVideoOpen(false)}
          ></div>
          <div className="relative w-full max-w-5xl bg-black rounded-2xl shadow-2xl overflow-hidden aspect-video animate-scale-up ring-1 ring-white/10">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-white hover:text-black rounded-full text-white transition-all backdrop-blur-md"
            >
              <IconX className="w-6 h-6" />
            </button>
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/0ZAAQGUqua0?autoplay=1&mute=1&rel=0&modestbranding=1" 
              title="ShopifyPromoHub Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroAlt;
