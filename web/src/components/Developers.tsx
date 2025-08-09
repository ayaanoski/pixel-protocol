import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

const Developers: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippet = `// 1. Install the SDK
npm install @pixel-protocol/sdk

// 2. Initialize Protocol
import { PixelProtocol } from "@pixel-protocol/sdk";

const protocol = new PixelProtocol({
  rpcUrl: "https://rpc-quicknode-holesky.morphl2.io",
  chainId: 2810, // Morph Holesky Testnet
  credentialIssuerAddress: "YOUR_CONTRACT_ADDRESS",
  reputationCalculatorAddress: "YOUR_CONTRACT_ADDRESS",
  zkpVerifierAddress: "YOUR_CONTRACT_ADDRESS"
});

// 3. Issue a credential
const credential = await protocol.issueCredential({
  recipient: "0x...",
  type: "PAYMENT_HISTORY",
  data: {
    score: 95,
    transactions: 150
  }
});

// 4. Generate & verify proof
const proof = await protocol.generateProof({
  credentialId: credential.id,
  claim: "score > 90"
});

const isValid = await protocol.verifyProof(proof);`;

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
            Integrate decentralized reputation into your dApp with our developer-friendly SDK. 
            Built with TypeScript, zero-knowledge proofs, and a focus on developer experience. 
            Our REST API is coming soon to provide even more integration options.
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
                <h3 className="text-xl text-blue-400 mb-3">SDK Integration</h3>
                <p className="text-gray-400">
                  Get started quickly with our TypeScript/JavaScript SDK. Full support for credential issuance, verification, and reputation scoring.
                </p>
                <div className="mt-4">
                  <a 
                    href="https://www.npmjs.com/package/@pixel-protocol/sdk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300"
                  >
                    View on npm →
                  </a>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-500">
                <h3 className="text-xl text-blue-400 mb-3">REST API (Coming Soon)</h3>
                <p className="text-gray-400">
                  Our REST API will provide a simple interface for credential verification and reputation queries. Currently in development.
                </p>
                <div className="mt-4">
                  <button 
                    className="text-blue-400 hover:text-blue-300 opacity-50 cursor-not-allowed"
                  >
                    Join Waitlist →
                  </button>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-500">
                <h3 className="text-xl text-blue-400 mb-3">Features & Support</h3>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Full TypeScript Support
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Zero-Knowledge Proofs
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Modular Architecture
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Comprehensive Documentation
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">•</span>
                    Discord Developer Support
                  </li>
                </ul>
                <div className="mt-4">
                  <a 
                    href="https://github.com/ayaanoski/pixel-protocol/pixel-sdk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300"
                  >
                    Read Documentation →
                  </a>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Developers;
