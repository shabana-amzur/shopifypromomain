import React, { useState, useRef, useEffect } from 'react';
import { IconX } from '../Icons';

const HeroAlt: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt to play video with sound
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        // If unmuted autoplay fails, try muted
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }
  }, []);

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
      <section id="home-alt" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20 sm:pt-24 md:pt-32 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        
        {/* --- Grid Background Image --- */}
        <div className="absolute inset-0 z-0 opacity-100" 
             style={{ 
               backgroundImage: `url(/grid-bg.png)`, 
               backgroundSize: 'auto 262px',
               backgroundPosition: 'center top',
               backgroundRepeat: 'no-repeat'
             }}>
        </div>

        {/* =========================================
            CENTERED VERTICAL LAYOUT
           ========================================= */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
          
          {/* Main Heading */}
          <h1 className="font-semibold tracking-tight leading-[1.05] animate-fade-in-up drop-shadow-sm" style={{ fontSize: '4rem' }}>
            <span className="block text-[#0A2540]">Smarter Promotions</span>
            <span className="block text-[#0A2540]">for Shopify</span>
            <span className="block" style={{ color: '#ea580b', marginTop: '0.25rem' }}>One Powerful App.</span>
          </h1>

          {/* Description */}
          <p className="text-slate-600 leading-relaxed max-w-3xl animate-fade-in-up font-medium text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-0" style={{ animationDelay: '0.1s' }}>
            Join the waitlist to get early access, launch updates, and special beta perks
          </p>

          {/* Join Waitlist Form */}
          <div className="w-full max-w-2xl px-4 sm:px-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
                  className="px-8 py-4 bg-[#95BF47] text-white font-bold rounded-xl hover:bg-slate-900 hover:text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap animate-pulse-btn"
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
          <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 animate-fade-in-up relative" style={{ animationDelay: '0.3s' }}>
            <div className="relative aspect-video rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-black" style={{ 
              boxShadow: '0 20px 60px rgba(147, 51, 234, 0.4), 0 10px 30px rgba(147, 51, 234, 0.4)'
            }}>
              <video
                ref={videoRef}
                src="/demo-video.mp4"
                className="w-full h-full"
                autoPlay
                loop
                playsInline
                controls
              />
            </div>
          </div>

        </div>

        {/* --- Bottom Grid Background Image --- */}
        <div className="absolute left-0 right-0 z-0 opacity-100 h-[262px] pointer-events-none" 
             style={{ 
               backgroundImage: `url(/grid-bottom-bg.png)`, 
               backgroundSize: 'auto 262px',
               backgroundPosition: 'center bottom',
               backgroundRepeat: 'no-repeat',
               bottom: '-100px'
             }}>
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
