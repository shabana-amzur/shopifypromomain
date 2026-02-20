import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import HeroAlt from '../components/Sections/HeroAlt';
import Features from '../components/Sections/Features';
import BentoGrid from '../components/Sections/BentoGrid';
import Outcomes from '../components/Sections/Outcomes';
import Trust from '../components/Sections/Trust';
import WhyChoose from '../components/Sections/WhyChoose';
import FAQLanding from '../components/Sections/FAQLanding';
import CTALanding from '../components/Sections/CTALanding';
import { IconX, IconTag, IconLayers, IconClock, IconZap, IconDollarSign } from '../components/Icons';

const LandingPage: React.FC = () => {
  const problemFeatures = [
    {
      title: "Discounts don't stack properly",
      description: "",
      icon: <IconTag className="w-6 h-6 text-brand-600" />
    },
    {
      title: "Customers miss eligible offers",
      description: "",
      icon: <IconLayers className="w-6 h-6 text-brand-600" />
    },
    {
      title: "Manual setups slow your team down",
      description: "",
      icon: <IconClock className="w-6 h-6 text-brand-600" />
    },
    {
      title: "Promotions conflict with each other",
      description: "",
      icon: <IconZap className="w-6 h-6 text-brand-600" />
    },
    {
      title: "Multiple apps increase costs",
      description: "",
      icon: <IconDollarSign className="w-6 h-6 text-brand-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Manrope, sans-serif' }}>
      <Header />
      <main className="flex-grow">
        <HeroAlt 
          headline={
            <span className="block text-[#0A2540] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ lineHeight: '1.2' }}>
              Increase AOV and Conversions with{' '}
              <span style={{ color: '#ea580b' }}>Smarter Shopify Promotions</span>
            </span>
          }
          description="Create stackable, rule-based, auto-applied promotions that drive higher order value without hurting your margins."
          ctaText="Get Early Access"
        />
        <Features 
          sectionTitle="The Revenue Problem" 
          sectionDescription="Most Shopify stores leave money on the table."
          maxItems={5}
          hideBenefits={true}
          hideSubtitle={true}
          customFeatures={problemFeatures}
          gridCols="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6"
          afterContent={
            <div className="text-center mt-12 md:mt-16 max-w-4xl mx-auto px-4">
              <p className="font-medium text-slate-900 leading-tight mb-4" style={{ fontSize: '1.5rem' }}>
                Every friction point lowers conversion rate and average order value.
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: '#ea580b' }}>
                PromoHub was built to fix that.
              </p>
            </div>
          }
        />
        <BentoGrid />
        <Outcomes />
        <Trust />
        <WhyChoose />
        <FAQLanding />
        <CTALanding />
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
};

export default LandingPage;
