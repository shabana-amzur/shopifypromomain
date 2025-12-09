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
        const testRes = await fetch('/api/test');
        const testData = await testRes.json();
        console.log('API Test Response:', testData);
        
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
          console.error('API Error:', res.status, data);
          alert(`Submission failed: ${data.message || 'Please try again.'}`);
        }
      } catch (err) {
        console.error('Network Error:', err);
        alert(`Network error: ${err.message}`);
      }
    }
  };

  return (
    <section id="join" className="py-16 md:py-24 bg-gradient-to-br from-[#95BF47] to-black text-white relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#95BF47] rounded-full mix-blend-screen opacity-20 filter blur-3xl"></div>
         <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#95BF47] rounded-full mix-blend-screen opacity-20 filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Be the First to Try Smarter Promotions
        </h2>
        <p className="text-xl text-[#95BF47] text-opacity-90 mb-10 max-w-2xl mx-auto font-medium">
          Join the waitlist to get early access, launch updates, and special beta perks.
        </p>

        {submitted ? (
           <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg p-8 max-w-lg mx-auto">
             <p className="text-2xl font-bold text-white mb-2">Welcome aboard! 🚀</p>
             <p className="text-[#95BF47]">We'll notify you as soon as spots open up.</p>
           </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
            <label htmlFor="cta-email" className="sr-only">Email address</label>
            <input
              id="cta-email"
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-slate-900 text-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              type="submit" 
              className="bg-white text-black hover:bg-gray-100 border-transparent py-4 font-bold text-lg shadow-lg w-full sm:w-auto"
            >
              Join Now
            </Button>
          </form>
        )}
        
        <p className="mt-8 text-sm text-[#95BF47] opacity-80">
          Your privacy is important to us. We'll never share your email.
        </p>
      </div>
    </section>
  );
};

export default CTA;