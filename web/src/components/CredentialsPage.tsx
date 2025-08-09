import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

const CredentialsPage: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [credentials] = useState([
    {
      id: 1,
      title: "DeFi Lending Score",
      score: 750,
      description: "Based on 24 successful loan repayments",
      date: "2024-12-15"
    },
    {
      id: 2,
      title: "DAO Participation",
      score: 890,
      description: "Active governance participation across 5 DAOs",
      date: "2024-12-10"
    },
    {
      id: 3,
      title: "NFT Trading History",
      score: 650,
      description: "Verified trading history with 98% success rate",
      date: "2024-12-05"
    }
  ]);

  return (
    <div className="min-h-screen bg-black text-white pt-20 press-start-2p-regular relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent blur-2xl"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent blur-3xl"></div>
      <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        <ScrollAnimation>
          <div className="text-center relative mb-16">
            <h1 className="text-3xl md:text-5xl text-white mb-4 relative z-10">
              Your Credentials
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-xl z-0 rounded-full"></div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-center mb-16">
            View and manage your on-chain reputation and verifiable credentials
          </p>
        </ScrollAnimation>

        {!walletConnected ? (
          <ScrollAnimation>
            <div className="text-center">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-12 mb-8 group hover:border-blue-500/50 transition-all duration-500">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6 p-1">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 114-4 4 4 0 01-4 4z" />
                    </svg>
                  </div>
                </div>
                <p className="text-lg text-gray-300 mb-8">Connect your wallet to view credentials</p>
                <button 
                  onClick={() => setWalletConnected(true)}
                  className="relative inline-flex group/button items-center justify-center"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover/button:opacity-100 transition duration-1000 group-hover/button:duration-200"></div>
                  <span className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center">
                    <span className="text-gray-200 group-hover/button:text-white transition duration-200">Connect Wallet</span>
                  </span>
                </button>
              </div>
            </div>
          </ScrollAnimation>
        ) : (
          <div className="space-y-8">
            <ScrollAnimation>
              <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:border-blue-500/50 transition-all duration-500">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full p-1">
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl text-blue-400 mb-1">Wallet Connected</h2>
                    <p className="text-sm text-gray-400">0x1234...5678</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <h2 className="text-2xl text-blue-400 mb-8">Verifiable Credentials</h2>
            </ScrollAnimation>

            {credentials.map((credential) => (
              <ScrollAnimation key={credential.id}>
                <div 
                  className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 group hover:border-blue-500/50 transition-all duration-500"
                  onMouseEnter={() => setHoveredCard(credential.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl text-blue-400 mb-2">{credential.title}</h3>
                      <p className="text-gray-400">{credential.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl text-white group-hover:text-blue-400 transition-colors">{credential.score}</div>
                      <div className="text-sm text-gray-400">SCORE</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Issued: {credential.date}</p>
                    <button className="px-4 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>
              </ScrollAnimation>
            ))}

            <ScrollAnimation>
              <div className="text-center mt-12">
                <button className="relative inline-flex group items-center justify-center">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <span className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center">
                    <span className="text-gray-200 group-hover:text-white transition duration-200">Generate ZK Proof</span>
                  </span>
                </button>
              </div>
            </ScrollAnimation>
          </div>
        )}

        <ScrollAnimation>
          <div className="text-center mt-16">
            <a href="/" className="relative inline-flex group items-center justify-center">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <span className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center">
                <span className="text-gray-200 group-hover:text-white transition duration-200">← Back to Home</span>
              </span>
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default CredentialsPage;