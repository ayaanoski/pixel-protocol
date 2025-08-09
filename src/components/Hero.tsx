import React from 'react';
import ScrollAnimation from './ScrollAnimation';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 press-start-2p-regular relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/40 z-0"></div>
      
      <div className="text-center max-w-5xl mx-auto relative z-10">
        <ScrollAnimation>
          <div className="mb-12">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden mb-8">
                <img 
                  src="/logo.jpeg" 
                  alt="Pixel Protocol Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="inline-block relative">
                <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-4 relative z-10">
                  Pixel Protocol
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl z-0"></div>
              </div>
              <h2 className="text-2xl md:text-3xl text-white/90 mt-6 font-light">
                Your On-Chain Reputation, Decoded
              </h2>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <h3 className="text-lg md:text-xl text-purple-200/90 mb-8 font-light tracking-wide">
            Building the foundational infrastructure for a private, self-sovereign Web3 financial ecosystem
          </h3>
        </ScrollAnimation>
        
        <ScrollAnimation>
          <p className="text-base md:text-lg text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            The current centralized credit system is broken. It excludes billions of people, is controlled by a few opaque entities, 
            and fails to capture the full scope of a person's financial behavior. Pixel Protocol is the decentralized solution, 
            giving users ownership of their financial identity and empowering a new era of consumer finance.
          </p>
        </ScrollAnimation>

        <ScrollAnimation>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a href="/developers" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <button className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center">
                <span className="text-gray-200 group-hover:text-white transition duration-200 text-sm">
                  Enter the Protocol
                  <span className="block mt-1 text-purple-400 group-hover:text-purple-300">(For Devs)</span>
                </span>
              </button>
            </a>
            
            <a href="/credentials" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <button className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center border border-white/10">
                <span className="text-gray-200 group-hover:text-white transition duration-200 text-sm">
                  View Your Credentials
                  <span className="block mt-1 text-purple-400 group-hover:text-purple-300">(For Users)</span>
                </span>
              </button>
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Hero;