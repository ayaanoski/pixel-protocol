import React from 'react';
import ScrollAnimation from './ScrollAnimation';

const Problem: React.FC = () => {
  return (
    <section className="py-20 px-4 relative press-start-2p-regular">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimation>
          <div className="text-center relative">
            <h2 className="text-3xl md:text-5xl text-white mb-8 relative z-10">
              The Legacy of a Broken System
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 blur-xl z-0 rounded-full"></div>
          </div>
        </ScrollAnimation>
        
        <ScrollAnimation>
          <div className="mt-16 bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed text-center">
              Traditional credit scores like FICO are a relic of the past. They are static, centralized, 
              and opaque, locking billions of people out of financial services. This system fails to recognize 
              on-time rent payments, successful freelance gigs, or other real-world financial commitments, 
              creating a global divide.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/50 transition-colors">
                <h3 className="text-purple-400 text-lg mb-3">Centralized Control</h3>
                <p className="text-gray-400">Controlled by a few opaque entities with no transparency or accountability</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/50 transition-colors">
                <h3 className="text-purple-400 text-lg mb-3">Limited Scope</h3>
                <p className="text-gray-400">Fails to capture the full spectrum of financial responsibility and behavior</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/50 transition-colors">
                <h3 className="text-purple-400 text-lg mb-3">Global Exclusion</h3>
                <p className="text-gray-400">Billions of people remain locked out of essential financial services</p>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center hover:border-red-500/50 transition-all duration-500">
              <div className="text-3xl md:text-5xl text-red-400 mb-3 font-bold">2.5B</div>
              <div className="text-gray-300 text-sm">UNBANKED GLOBALLY</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center hover:border-orange-500/50 transition-all duration-500">
              <div className="text-3xl md:text-5xl text-orange-400 mb-3 font-bold">45%</div>
              <div className="text-gray-300 text-sm">NO CREDIT HISTORY</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center hover:border-yellow-500/50 transition-all duration-500">
              <div className="text-3xl md:text-5xl text-yellow-400 mb-3 font-bold">0</div>
              <div className="text-gray-300 text-sm">CONTROL OVER DATA</div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Problem;