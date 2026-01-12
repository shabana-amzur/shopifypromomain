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
    description: "Create BOGO, tiered, bundle, and free gift offers without complex scripting.",
    icon: <IconTag className="w-6 h-6 text-brand-600" />
  },
  {
    title: "Stackable & Tiered Offers",
    description: "Let customers combine only the discounts you allow, without risky overlaps.",
    icon: <IconLayers className="w-6 h-6 text-brand-600" />
  },
  {
    title: "No-Code Rule Builder",
    description: "Set promotion rules visually using cart value, products, tags, or locations.",
    icon: <IconCode className="w-6 h-6 text-brand-600" />
  },
  {
    title: "Promotion Scheduling",
    description: "Plan promotions ahead and let them automatically start and stop on the dates you choose.",
    icon: <IconClock className="w-6 h-6 text-brand-600" />
  },
  {
    title: "Auto-Applied Discounts",
    description: "Automatically apply the right offer based on the customer and their cart.",
    icon: <IconZap className="w-6 h-6 text-brand-600" />
  },
  {
    title: "One App Instead of Many",
    description: "Replace multiple disconnected discount tools with one unified engine.",
    icon: <IconGrid className="w-6 h-6 text-brand-600" />
  }
];

export const BENEFITS: BenefitItem[] = [
  {
    title: "Higher Average Order Value",
    description: "Encourage larger orders and increase AOV with smarter promotions.",
    icon: <IconDollarSign className="w-6 h-6 text-[#95BF47]" />
  },
  {
    title: "Protected Margins",
    description: "Protect your margins while still giving shoppers great deals.",
    icon: <IconSettings className="w-6 h-6 text-[#95BF47]" />
  },
  {
    title: "Faster Campaign Launch",
    description: "Launch and adjust promotions without waiting on developers.",
    icon: <IconCode className="w-6 h-6 text-[#95BF47]" />
  },
  {
    title: "Higher Checkout Conversions",
    description: "Reduce friction at checkout and improve conversions.",
    icon: <IconSmile className="w-6 h-6 text-[#95BF47]" />
  },
  {
    title: "Simplified Promotion Stack",
    description: "Simplify management and cut down on extra app costs.",
    icon: <IconGrid className="w-6 h-6 text-[#95BF47]" />
  },
  {
    title: "On-Schedule Campaigns",
    description: "Save time, avoid last-minute changes, and never miss a planned campaign.",
    icon: <IconClock className="w-6 h-6 text-[#95BF47]" />
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Is this app available on the Shopify App Store?",
    answer: "Our App is ready and we are in the process of getting it on the Shopify App Marketplace."
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