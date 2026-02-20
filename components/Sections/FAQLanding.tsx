import React, { useState } from 'react';
import { IconChevronDown } from '../Icons';

const FAQLanding: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Will this increase AOV?",
      answer: "Yes. Stackable offers and tiered incentives encourage larger carts."
    },
    {
      question: "Will it slow down my store?",
      answer: "No. Built for performance and Shopify API compliant."
    },
    {
      question: "Can I control margin protection?",
      answer: "Absolutely. Set guardrails and exclusions."
    },
    {
      question: "How long does setup take?",
      answer: "Most promotions can be launched in minutes."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about the waitlist and launch.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg sm:rounded-xl border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 sm:p-6 text-left focus:outline-none focus:bg-slate-50 hover:bg-slate-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-base sm:text-lg font-semibold text-slate-900 pr-4 sm:pr-8">
                  {faq.question}
                </span>
                <span 
                  className={`flex-shrink-0 text-slate-500 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <IconChevronDown />
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 sm:p-6 pt-0 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-transparent">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQLanding;
