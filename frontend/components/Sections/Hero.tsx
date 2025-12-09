import React, { useState } from 'react';
import { 
  IconLayers, 
  IconTag, 
  IconBarChart,
  IconPlay,
  IconX
} from '../Icons';

// --- Types & Data ---

interface OrbitFeature {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  angle: number; // Starting angle in degrees
}

// Features sit on the main orbit ring.
// Positioned at 0 (Top), 90 (Right), and 270 (Left) to avoid the bottom area.
const ORBIT_FEATURES: OrbitFeature[] = [
  { 
    title: "Stackable Offers", 
    subtitle: "No more conflicts", 
    icon: <IconLayers className="w-5 h-5 text-[#95BF47]" />,
    angle: 0,
  },
  { 
    title: "Tiered Discounts", 
    subtitle: "Reward loyalty", 
    icon: <IconTag className="w-5 h-5 text-[#95BF47]" />,
    angle: 270,
  },
  { 
    title: "AOV Insights", 
    subtitle: "Track value", 
    icon: <IconBarChart className="w-5 h-5 text-brand-600" />,
    angle: 90,
  },
];

const Hero: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Configuration for the orbit layout
  // Using a larger container (900px) allows cards to orbit AROUND the text without overlap.
  const ORBIT_RADIUS = 380; // Distance from center to card center
  
  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50/70 via-white to-orange-50/30 pt-16">
        
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
            ORBIT LAYER
            Centered behind the text.
            Pointer-events-none ensures it doesn't block text selection,
            but we re-enable pointer-events for the cards themselves.
           ========================================= */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
          {/* 
            Main Scale Wrapper 
            Scales down on mobile to ensure the orbit fits or bleeds gracefully 
            Scale 0.35 * 900px = 315px, fits on 320px screens.
          */}
          <div className="relative w-[900px] h-[900px] scale-[0.35] sm:scale-[0.65] md:scale-[0.85] lg:scale-100 transition-transform duration-700">
            
            {/* --- Static Concentric Rings --- */}
            {/* Inner Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-orange-200/30" />
            {/* Middle Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-orange-200/20" />
            {/* Outer Ring (Orbit Path) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full border border-orange-300/20 border-dashed" />

            {/* 
                ROTATING GROUP 
                The entire wrapper rotates clockwise (0 -> 360).
            */}
            <div className="absolute inset-0 origin-center animate-orbit-spin-slow">
              {ORBIT_FEATURES.map((feature, idx) => (
                <div 
                  key={idx}
                  className="absolute left-1/2 top-1/2 origin-center"
                  style={{ 
                    // 1. Initial Angle Placement
                    transform: `translate(-50%, -50%) rotate(${feature.angle}deg)` 
                  }}
                >
                  <div 
                    className="flex flex-col items-center justify-center"
                    style={{ 
                      // 2. Push to Radius & Fix Initial Rotation
                      transform: `translateY(-${ORBIT_RADIUS}px) rotate(-${feature.angle}deg)` 
                    }}
                  >
                    {/* Green Dot - Placed exactly on the orbit line */}
                    <div className="absolute w-3 h-3 bg-[#95BF47] rounded-full shadow-sm ring-4 ring-white" />

                    {/* 
                       3. Card Wrapper (Counter-Rotation)
                       Spins counter-clockwise to keep the card upright as the parent spins.
                       We shift the card down slightly so it floats *below* or *near* the dot, not on top of it.
                    */}
                    <div className="pointer-events-auto animate-orbit-spin-reverse-slow absolute top-4 left-1/2 -translate-x-1/2 min-w-[160px]">
                      <div className="
                          flex items-center gap-3 p-3 
                          bg-white/95 backdrop-blur-md 
                          border border-slate-100 
                          shadow-xl shadow-orange-900/5 
                          rounded-xl 
                          hover:scale-105 hover:shadow-2xl hover:border-orange-200 
                          transition-all duration-300 
                          cursor-default
                        ">
                           <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-brand-600">
                              {feature.icon}
                           </div>
                           <div className="text-left">
                              <p className="text-xs font-bold text-slate-800 leading-tight">
                                {feature.title}
                              </p>
                              <p className="text-[10px] text-slate-500 font-medium">
                                {feature.subtitle}
                              </p>
                           </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* =========================================
            CENTER CONTENT
            Headings and Play Button
           ========================================= */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-6 w-full mt-8">
          
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
          <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-lg mx-auto animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
            Advanced discounts, stackable offers, and fully synchronized campaigns. No code required.
          </p>

          {/* 
              PLAY BUTTON (Fixed Center) 
              Increased size and simplified shockwave layering.
          */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
             
             {/* Shockwaves - Strictly BEHIND the button */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                <span className="block w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-brand-500/40 animate-pulse-ring delay-0" />
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                <span className="block w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-brand-500/20 animate-pulse-ring delay-[1000ms]" />
             </div>

             {/* Button Itself */}
             <button 
                onClick={() => setIsVideoOpen(true)}
                className="
                  relative z-10 
                  w-20 h-20 sm:w-28 sm:h-28 
                  bg-brand-500 
                  rounded-full 
                  shadow-[0_10px_40px_-10px_rgba(249,115,22,0.6)]
                  flex flex-col items-center justify-center 
                  hover:scale-105 hover:bg-brand-600 
                  hover:shadow-[0_20px_50px_-10px_rgba(249,115,22,0.7)]
                  transition-all duration-300 
                  border-[4px] sm:border-[6px] border-white
                "
                aria-label="Watch Demo Video"
             >
               <IconPlay className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-current ml-1.5" />
             </button>
             
             <div className="mt-5 font-bold text-xs tracking-[0.2em] text-slate-400 uppercase group-hover:text-brand-600 transition-colors">
               Watch Demo
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

export default Hero;