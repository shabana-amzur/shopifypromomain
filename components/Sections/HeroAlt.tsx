import React, { useState } from 'react';
import { IconX } from '../Icons';

const HeroAlt: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, sourcePage: 'hero-waitlist' }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Thank you! You\'re on the waitlist.');
        setEmail('');
      } else {
        setSubmitMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <section id="home-alt" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50/70 via-white to-orange-50/30 pt-16 px-4 py-20">
        
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
            CENTERED VERTICAL LAYOUT
           ========================================= */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tight leading-[1.05] animate-fade-in-up drop-shadow-sm">
            <span className="block text-[#0A2540]">Smarter Promotions</span>
            <span className="block text-[#0A2540]">for Shopify</span>
            <span className="block text-[#FF5A3C] mt-1">One Powerful App.</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl animate-fade-in-up font-medium" style={{ animationDelay: '0.1s' }}>
            Advanced discounts, stackable offers, and fully synchronized campaigns. No code required.
          </p>

          {/* Join Waitlist Form */}
          <div className="w-full max-w-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {submitMessage ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-800 font-semibold">{submitMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-brand-500 focus:outline-none text-slate-900 placeholder-slate-400 font-medium transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
            )}
            <p className="mt-3 text-xs text-slate-500">
              Your privacy is important to us. We'll never share your email.
            </p>
          </div>

          {/* Autoplay Video */}
          <div className="w-full max-w-6xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200 bg-black" style={{ minHeight: '500px' }}>
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/0ZAAQGUqua0?autoplay=1&mute=1&loop=1&playlist=0ZAAQGUqua0&controls=0&modestbranding=1&rel=0&showinfo=0"
                title="ShopifyPromoHub Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="mt-4 text-brand-600 hover:text-brand-700 font-semibold text-sm underline underline-offset-4 transition-colors"
            >
              Watch with controls →
            </button>
          </div>

        </div>

      </section>

      {/* --- Video Modal (Full Controls) --- */}
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
              src="https://www.youtube.com/embed/0ZAAQGUqua0?autoplay=1&mute=0&rel=0&modestbranding=1" 
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
