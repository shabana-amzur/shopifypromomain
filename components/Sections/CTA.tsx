import React, { useState } from 'react';
import Button from '../UI/Button';

const CTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        // First test if the API is working at all
        console.log('Testing API connection...');
        const testRes = await fetch('/api/hello');
        console.log('API Test Status:', testRes.status);
        if (testRes.ok) {
          const testData = await testRes.json();
          console.log('API Test Response:', testData);
        } else {
          console.error('API Test Failed:', testRes.status, testRes.statusText);
        }
        
        // Now try the actual submission
        console.log('Submitting email:', email);
        const res = await fetch('/api/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email,
            sourcePage: 'waitlist'
          }),
        });
        const data = await res.json();
        console.log('Submission Response:', res.status, data);
        
        if (res.ok) {
          setSubmitted(true);
        } else {
          alert(`Submission failed: ${data.message || 'Please try again.'}`);
        }
      } catch (err) {
        alert(`Network error: ${err.message}`);
      }
    }
  };

  if (submitted) {
    return (
      <section id="thankyou" className="py-16 md:py-24 bg-gradient-to-br from-[#95BF47] to-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#95BF47] rounded-full mix-blend-screen opacity-20 filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#95BF47] rounded-full mix-blend-screen opacity-20 filter blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg p-8 max-w-lg mx-auto">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight text-white">Thank you for joining the waitlist!</h2>
            <p className="text-xl text-[#95BF47] text-opacity-90 mb-4 font-medium">We appreciate your interest. You'll be the first to know when we launch and as soon as spots open up.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="join" 
      className="py-16 md:py-24 text-white relative overflow-hidden"
      style={{
        backgroundImage: 'url(/cta_banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#95BF47] rounded-full mix-blend-screen opacity-20 filter blur-3xl"></div>
         <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#95BF47] rounded-full mix-blend-screen opacity-20 filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight text-[#95BF47]">
          Be the First to Try Smarter Promotions
        </h2>
        <p className="text-xl text-white mb-10 max-w-2xl mx-auto font-medium">
          Run advanced, scalable promotions effortlessly with our custom Shopify app. No coding, no plugins required, get full control.
        </p>

        <button
          onClick={() => {
            const heroSection = document.querySelector('section');
            if (heroSection) {
              heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="px-8 py-4 bg-white text-black hover:bg-gray-100 font-bold text-lg shadow-lg rounded-lg transition-all duration-300 hover:scale-105"
        >
          Join Now
        </button>
      </div>
    </section>
  );
};

export default CTA;