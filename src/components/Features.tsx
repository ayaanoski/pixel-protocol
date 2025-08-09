import React from 'react';
import ScrollAnimation from './ScrollAnimation';

const Features: React.FC = () => {
  const features = [
    {
      title: "Verifiable Credentials (VCs)",
      description: "VCs are non-transferable NFTs (Soulbound Tokens) that act as on-chain proofs of a user's actions and achievements. They are issued by dApps after a successful interaction, creating an immutable record of financial responsibility, work history, or educational attainment. A user's reputation is the sum of these VCs, which they fully own and control.",
      icon: "🔐"
    },
    {
      title: "Dynamic Reputation Score",
      description: "We move beyond a single, static number. The Pixel Protocol reputation score is a dynamic, on-chain value that can be weighted differently depending on the use case. A lending dApp can calculate a score based on repayment history VCs, while a decentralized marketplace can prioritize VCs related to positive reviews and completed projects.",
      icon: "📊"
    },
    {
      title: "Zero-Knowledge Proofs (ZKPs)",
      description: 'Privacy is a core principle. While VCs are publicly verifiable, users can leverage Zero-Knowledge Proofs to prove they meet specific criteria (e.g., "I have a positive repayment history") without revealing the specific details of their credentials. This allows for trust without compromising sensitive personal data.',
      icon: "🔒"
    }
  ];

  return (
    <section className="py-20 px-4 border-t border-white/10 press-start-2p-regular relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-900/5 to-black/10"></div>
      <div className="max-w-6xl mx-auto relative">
        <ScrollAnimation>
          <div className="text-center relative mb-16">
            <h2 className="text-3xl md:text-5xl text-white mb-4 relative z-10">
              HOW THE PROTOCOL WORKS
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl z-0 rounded-full"></div>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollAnimation key={index}>
              <div className="group relative bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-500">
                <div className="mb-6">
                  <div className="text-4xl">{feature.icon}</div>
                </div>

                <h3 className="text-lg text-gray-300 group-hover:text-purple-400 transition-colors mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-colors rounded-xl"></div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;