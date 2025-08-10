import React from 'react';
import ScrollAnimation from './ScrollAnimation';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const mailtoLink = `mailto:razeprotocol@gmail.com?subject=${encodeURIComponent('Waitlist Request for Pixel Protocol')}&body=${encodeURIComponent('Hello,\n\nI would like to join the waitlist for Pixel Protocol. Please add me to your list for updates and early access.\n\nThank you,\n[Your Name]')}`;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 press-start-2p-regular relative overflow-hidden">
      <div className="absolute inset-0 bg-transparent z-0"></div>
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 z-0"></div>

      <div className="text-center max-w-5xl mx-auto relative z-10">
        <ScrollAnimation>
          <div className="mb-10">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden mb-6">
                <img
                  src="/logo.jpeg"
                  alt="Pixel Protocol Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="inline-block relative">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-3 relative z-10">
                  Pixel Protocol
                </h1>
              </div>
              <h2 className="text-xl md:text-2xl text-gray-300 mt-4 font-light">
                Your On-Chain Reputation, Decoded
              </h2>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <h3 className="text-lg md:text-xl text-gray-400 mb-6 font-light tracking-wide">
            Building the foundational infrastructure for a private, self-sovereign Web3 financial ecosystem
          </h3>
        </ScrollAnimation>

        <ScrollAnimation>
          <p className="text-base md:text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            The current centralized credit system is broken. It excludes billions of people, is controlled by a few opaque entities,
            and fails to capture the full scope of a person's financial behavior. Pixel Protocol is the decentralized solution,
            giving users ownership of their financial identity and empowering a new era of consumer finance.
          </p>
        </ScrollAnimation>

        <ScrollAnimation>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://pixel-protocol-2.gitbook.io/pixel-protocol-docs" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-800 rounded-md blur opacity-50 group-hover:opacity-75 transition duration-200"></div>
              <button className="relative px-6 py-3 bg-black rounded-md leading-none flex items-center border border-gray-700 hover:border-gray-500 transition-colors">
                <span className="text-gray-300 group-hover:text-white transition duration-200 text-sm">
                  Enter the Protocol
                  <span className="block mt-1 text-gray-500 group-hover:text-gray-400">(For Devs)</span>
                </span>
              </button>
            </a>

            <Link to="/credentials" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-800 rounded-md blur opacity-40 group-hover:opacity-60 transition duration-200"></div>
              <button className="relative px-6 py-3 bg-black rounded-md leading-none flex items-center border border-gray-700 hover:border-gray-500 transition-colors">
                <span className="text-gray-300 group-hover:text-white transition duration-200 text-sm">
                  View Your Credentials
                  <span className="block mt-1 text-gray-500 group-hover:text-gray-400">(For Users)</span>
                </span>
              </button>
            </Link>
          </div>
          
          {/* New Join Waitlist feature */}
          <div className="mt-8 flex justify-center">
            <a href={mailtoLink} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-md blur opacity-60 group-hover:opacity-80 transition duration-200"></div>
              <button className="relative px-6 py-3 bg-blue-800 rounded-md leading-none flex items-center border border-blue-600 hover:border-blue-500 transition-colors">
                <span className="text-white group-hover:text-gray-100 transition duration-200 text-sm">
                  Join the Waitlist
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