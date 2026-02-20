import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import HeroAlt from '../components/Sections/HeroAlt';
import Features from '../components/Sections/Features';
import ComingSoon from '../components/Sections/ComingSoon';
import FAQ from '../components/Sections/FAQ';
import CTA from '../components/Sections/CTA';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroAlt />
        <Features />
        <ComingSoon />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
};

export default HomePage;
