import React from 'react';
import ScrollAnimation from './ScrollAnimation';

const UseCases: React.FC = () => {
  const useCases = [
    {
      title: "DeFi Credit",
      description: "Undercollateralized loans based on proven on-chain reputation and payment history.",
      icon: "💳"
    },
    {
      title: "Web3 Identity",
      description: "Verified on-chain profiles that establish trust across decentralized applications.",
      icon: "🆔"
    },
    {
      title: "DAO Governance",
      description: "Reputation-weighted voting systems that reward long-term contributors and experts.",
      icon: "🏛️"
    }
  ];

  return (
    <section className="py-20 px-4 border-t border-white/10 press-start-2p-regular relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-900/5 to-black/10"></div>
      <div className="max-w-6xl mx-auto relative">
        <ScrollAnimation>
          <div className="text-center relative mb-8">
            <h2 className="text-3xl md:text-5xl text-white mb-4 relative z-10">
              UNLOCKING THE FUTURE OF FINANCE
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl z-0 rounded-full"></div>
          </div>
        </ScrollAnimation>
        
        <ScrollAnimation>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed text-center mb-16">
            Pixel Protocol enables new financial primitives that were impossible with traditional credit systems. 
            Build the future of decentralized finance today.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <ScrollAnimation key={index}>
              <div className="group relative bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="text-4xl">{useCase.icon}</div>
                </div>

                <h3 className="text-lg text-gray-300 group-hover:text-purple-400 transition-colors mb-4">
                  {useCase.title}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed">
                  {useCase.description}
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

export default UseCases;