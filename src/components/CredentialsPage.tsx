import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

const CredentialsPage: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
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
    <div className="min-h-screen bg-black text-white pt-20 press-start-2p-regular">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <ScrollAnimation>
          <h1 className="text-2xl md:text-4xl text-center mb-8">
            YOUR CREDENTIALS
          </h1>
        </ScrollAnimation>

        <ScrollAnimation>
          <p className="text-sm md:text-base text-center mb-16">
            View your on-chain reputation and verifiable credentials
          </p>
        </ScrollAnimation>

        {!walletConnected ? (
          <ScrollAnimation>
            <div className="text-center">
              <div className="border border-white p-12 mb-8">
                <div className="w-16 h-16 bg-white mx-auto mb-4"></div>
                <p className="text-sm mb-6">Connect your wallet to view credentials</p>
                <button 
                  onClick={() => setWalletConnected(true)}
                  className="bg-white text-black px-6 py-3 text-xs hover:bg-gray-200 transition-colors"
                >
                  CONNECT WALLET
                </button>
              </div>
            </div>
          </ScrollAnimation>
        ) : (
          <div className="space-y-8">
            <ScrollAnimation>
              <div className="border border-white p-6">
                <h2 className="text-lg mb-4">WALLET CONNECTED</h2>
                <p className="text-xs text-gray-300">0x1234...5678</p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <h2 className="text-lg mb-6">YOUR VERIFIABLE CREDENTIALS</h2>
            </ScrollAnimation>

            {credentials.map((credential, index) => (
              <ScrollAnimation key={credential.id}>
                <div className="border border-white p-6 hover:bg-white hover:text-black transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm">{credential.title}</h3>
                    <div className="text-right">
                      <div className="text-lg">{credential.score}</div>
                      <div className="text-xs">SCORE</div>
                    </div>
                  </div>
                  <p className="text-xs mb-2">{credential.description}</p>
                  <p className="text-xs opacity-70">Issued: {credential.date}</p>
                </div>
              </ScrollAnimation>
            ))}

            <ScrollAnimation>
              <div className="text-center mt-12">
                <button className="border border-white text-white px-6 py-3 text-xs hover:bg-white hover:text-black transition-colors">
                  GENERATE ZK PROOF
                </button>
              </div>
            </ScrollAnimation>
          </div>
        )}

        <ScrollAnimation>
          <div className="text-center mt-16">
            <a href="/">
              <button className="border border-white text-white px-6 py-3 text-xs hover:bg-white hover:text-black transition-colors">
                BACK TO HOME
              </button>
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default CredentialsPage;