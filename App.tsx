import React, { useEffect } from 'react';
import { injectSpeedInsights } from '@vercel/speed-insights';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HeroAlt from './components/Sections/HeroAlt';
import Features from './components/Sections/Features';
import FAQ from './components/Sections/FAQ';
import CTA from './components/Sections/CTA';

const SpeedInsightsBridge: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      injectSpeedInsights({ framework: 'react' });
    } catch (error) {
      console.warn('Speed Insights failed to initialize', error);
    }
  }, []);

  return null;
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroAlt />
        <Features />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <SpeedInsightsBridge />
    </div>
  );
};

export default App;