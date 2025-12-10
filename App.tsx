import React from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import HeroAlt from './components/Sections/HeroAlt';
import Features from './components/Sections/Features';
import FAQ from './components/Sections/FAQ';
import CTA from './components/Sections/CTA';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HeroAlt />
        <Features />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;