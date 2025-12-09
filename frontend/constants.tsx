import React from 'react';
import { 
  FeatureItem, 
  BenefitItem, 
  FAQItem 
} from './types';
import { 
  IconZap, 
  IconLayers, 
  IconTag, 
  IconCode, 
  IconTrendingUp, 
  IconClock, 
  IconSmile, 
  IconSettings,
  IconDollarSign,
  IconGrid
} from './components/Icons';

export const APP_NAME = "ShopifyPromoHub";

export const FEATURES: FeatureItem[] = [
  {
    title: "Flexible Discount Types",
    description: "Create BOGO, tiered, bundle, and free gift offers in seconds without complex scripting.",
    icon: <IconTag className="w-6 h-6 text-brand-600" />
  },
  {
    title: "Stackable & Tiered Offers",
    description: "Allow customers to combine specific promotions while preventing margin-killing overlaps.",
    icon: <IconLayers className="w-6 h-6 text-brand-600" />
  },
  {
    title: "No-Code Rule Builder",
    description: "Visual editor lets you set conditions based on cart value, customer tags, or location.",
    icon: <IconCode className="w-6 h-6 text-brand-600" />
  },
  {
    title: "Real-time Analytics",
    description: "Track performance of every active campaign with live dashboards and ROI metrics.",
    icon: <IconTrendingUp className="w-6 h-6 text-brand-600" />
  },
  {
    title: "Auto-Applied Discounts",
    description: "Reduce friction by automatically applying the best deal at checkout. No codes needed.",
    icon: <IconZap className="w-6 h-6 text-brand-600" />
  },
  {
    title: "One App Instead of Many",
    description: "Replace multiple disconnected discount apps with a single robust promotion engine.",
    icon: <IconGrid className="w-6 h-6 text-brand-600" />
  }
];

export const BENEFITS: BenefitItem[] = [
  {
    title: "Higher Average Order Value",
    description: "Incentivize larger purchases with smart tiered rewards and progress bars.",
    icon: <IconDollarSign className="w-6 h-6 text-[#95BF47]" />
  },
  {
    title: "Fewer Promotion Errors",
    description: "Stop accidental discount stacking that eats into your profit margins.",
    icon: <IconSettings className="w-6 h-6 text-[#95BF47]" />
  },
  {
    title: "Faster Campaign Launch",
    description: "Launch flash sales in minutes, not hours. Schedule them in advance with peace of mind.",
    icon: <IconClock className="w-6 h-6 text-[#95BF47]" />
  },
  {
    title: "Improved Customer Loyalty",
    description: "Reward your VIPs with exclusive hidden offers based on their customer tags.",
    icon: <IconSmile className="w-6 h-6 text-[#95BF47]" />
  },
  {
    title: "Zero Dev Dependency",
    description: "Marketing teams can run the show without waiting for developer tickets.",
    icon: <IconCode className="w-6 h-6 text-[#95BF47]" />
  },
  {
    title: "Lower Monthly Costs",
    description: "Reduce your monthly Shopify bill by consolidating multiple tools into one.",
    icon: <IconDollarSign className="w-6 h-6 text-[#95BF47]" />
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Is this app available on the Shopify App Store?",
    answer: "Currently, it’s a custom Shopify app we configure based on your business needs. We work with you to implement and maintain it as part of our custom Shopify development services."
  },
  {
    question: "Will this app work with my current theme and storefront design?",
    answer: "Yes. The app integrates across PDPs, PLPs, cart, and checkout, and can be customized to match your storefront’s look and feel."
  },
  {
    question: "Can I use this without technical knowledge?",
    answer: "Absolutely. The app includes a user-friendly admin interface designed for marketing teams to manage promotions—no developer support required."
  },
  {
    question: "Will it slow down my site or conflict with other apps?",
    answer: "Not at all. It’s optimized for performance and built to reduce dependency on multiple third-party discount tools."
  },
  {
    question: "Can it support flash sales or scheduled promotions?",
    answer: "Yes, you can schedule campaigns in advance or create reusable templates for time-bound offers like flash sales."
  }
];