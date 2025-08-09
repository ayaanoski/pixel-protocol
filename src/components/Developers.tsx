import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

const Developers: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippet = `// Example: Calculate a user's lending score
const userWallet = "0x...";
const score = await pixelProtocol.getReputationScore(userWallet, 'lending-v1');
console.log(\`Lending Score: \${score}\`);

// Example: Check for a specific credential
const hasLoanRepaymentVC = await pixelProtocol.hasCredential(userWallet, 'loan-repayment-history');
console.log(\`Has loan repayment history: \${hasLoanRepaymentVC}\`);`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="py-20 px-4 border-t border-white press-start-2p-regular">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <div className="text-center relative mb-16">
            <h2 className="text-3xl md:text-5xl text-white mb-4 relative z-10">
              Building on Pixel Protocol
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-xl z-0 rounded-full"></div>
          </div>
        </ScrollAnimation>
        
        <ScrollAnimation>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-center mb-16">
            Pixel Protocol isn't just an app; it's a public good for the entire Web3 ecosystem. 
            We provide a suite of smart contracts and a developer SDK that makes it simple to integrate 
            a decentralized reputation system into any dApp. Our modular API lets you build innovative 
            consumer finance products on a foundation of on-chain trust.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ScrollAnimation>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group hover:border-blue-500/50 transition-all duration-500">
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-sm">pixel-protocol.js</div>
                <button 
                  onClick={handleCopyCode}
                  className="text-gray-400 hover:text-white px-3 py-1 text-sm rounded-md hover:bg-white/10 transition-colors"
                >
                  {copiedCode ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code className="text-gray-300 font-mono">{codeSnippet}</code>
              </pre>
            </div>
          </ScrollAnimation>

          <ScrollAnimation>
            <div className="space-y-8">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-500">
                <h3 className="text-xl text-blue-400 mb-3">Simple Integration</h3>
                <p className="text-gray-400">
                  Our comprehensive SDK provides everything you need to start leveraging decentralized reputation in your dApp.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-500">
                <h3 className="text-xl text-blue-400 mb-3">Flexible API</h3>
                <p className="text-gray-400">
                  Build custom reputation scoring models that perfectly match your use case and requirements.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-500">
                <h3 className="text-xl text-blue-400 mb-3">Key Features</h3>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Simple Integration
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Customizable Scoring
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Privacy by Design
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Cross-Chain Ready
                  </li>
                </ul>
              </div>

              <a 
                href="https://docs.pixelprotocol.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <button className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center">
                  <span className="text-gray-200 group-hover:text-white transition duration-200">
                    Read the GitBook
                    <span className="inline-block ml-2">→</span>
                  </span>
                </button>
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Developers;