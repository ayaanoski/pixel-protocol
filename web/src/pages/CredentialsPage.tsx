// src/pages/CredentialsPage.tsx

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// Assuming your ScrollAnimation component exists and works as intended
import ScrollAnimation from '../components/ScrollAnimation'; 
import { PixelCredentialsService, Credential } from '../contracts/PixelCredentialsService';
import CredentialModal from '../components/CredentialModal';

// A mock ZK Proof generation function
const generateMockZkProof = async (credentials: Credential[]): Promise<object> => {
    console.log("Generating ZK Proof for credentials:", credentials);
    // Simulate a complex, time-consuming computation
    await new Promise(resolve => setTimeout(resolve, 2500)); 
    return {
        proof: {
            pi_a: ["0x1...", "0x2..."],
            pi_b: [["0x3...", "0x4..."], ["0x5...", "0x6..."]],
            pi_c: ["0x7...", "0x8..."],
            protocol: "groth16",
            curve: "bn128"
        },
        publicSignals: [
            "0xUSER_PUBLIC_IDENTIFIER",
            "1" // 1 represents true, e.g., "score > 800"
        ]
    };
};

const CredentialsPage: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProving, setIsProving] = useState(false);
  const [error, setError] = useState<string>('');
  const [credentialsService, setCredentialsService] = useState<PixelCredentialsService | null>(null);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
  const [zkProof, setZkProof] = useState<object | null>(null);

  useEffect(() => {
    const initializeProvider = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const service = new PixelCredentialsService(provider);
        setCredentialsService(service);
      }
    };
    initializeProvider();
  }, []);

  const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  const resetState = () => {
    setWalletConnected(false);
    setUserAddress('');
    setCredentials([]);
    setError('');
    setZkProof(null);
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
        return setError('Please install MetaMask!');
    }
    if (!credentialsService) {
        return setError('Wallet provider not initialized');
    }
    try {
        setIsLoading(true);
      setError('');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        setUserAddress(address);
        setWalletConnected(true);
        const userCredentials = await credentialsService.getUserCredentials(address);
        setCredentials(userCredentials);
    } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to connect wallet');
    } finally {
        setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    // This resets the dApp's state. The user remains connected in MetaMask.
    console.log('Disconnecting wallet from dApp.');
    resetState();
  };

  const handleGenerateProof = async () => {
    if (credentials.length === 0) {
        setError("No credentials available to generate a proof.");
        return;
    }
    setIsProving(true);
    setError('');
    setZkProof(null);
    try {
        const proof = await generateMockZkProof(credentials);
        setZkProof(proof);
    } catch(err: any) {
        console.error(err);
        setError(err.message || 'Failed to generate ZK Proof.');
    } finally {
        setIsProving(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-transparent text-white pt-20 press-start-2p-regular relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        {/* --- HEADER --- */}
        <ScrollAnimation>
          <div className="text-center relative mb-16">
            <h1 className="text-3xl md:text-5xl text-white mb-4">Your Credentials</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">View and manage your on-chain reputation</p>
          </div>
        </ScrollAnimation>

        {/* --- WALLET NOT CONNECTED VIEW --- */}
        {!walletConnected ? (
          <ScrollAnimation>
            <div className="text-center bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-12">
              <p className="text-lg text-gray-300 mb-8">Connect your wallet to view credentials</p>
              <button onClick={connectWallet} disabled={isLoading} className="relative inline-flex group/button items-center justify-center">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover/button:opacity-100 transition duration-200"></div>
                <span className="relative px-8 py-4 bg-black rounded-lg">
                  {isLoading ? 'Connecting...' : 'Connect Wallet'}
                </span>
              </button>
            </div>
          </ScrollAnimation>
        ) : (
        /* --- WALLET CONNECTED VIEW --- */
          <div className="space-y-8">
            {/* Wallet Info Card */}
            <ScrollAnimation>
              <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                    <div>
                        <h2 className="text-xl text-blue-400 mb-1">Wallet Connected</h2>
                        <p className="text-sm text-gray-400">{formatAddress(userAddress)}</p>
                    </div>
                </div>
                <button onClick={disconnectWallet} className="text-sm text-gray-400 hover:text-red-500 transition-colors">Disconnect</button>
              </div>
            </ScrollAnimation>

            {/* Credentials List */}
            {credentials.length > 0 ? (
              credentials.map((credential) => (
              <ScrollAnimation key={credential.id}>
                  <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 group hover:border-blue-500/50 transition-all duration-500">
                    {/* ... credential card content ... */}
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Issued: {new Date(Number(credential.timestamp) * 1000).toLocaleDateString()}</p>
                      <button onClick={() => setSelectedCredential(credential)} className="px-4 py-2 text-sm text-blue-400 hover:text-blue-300">View Details →</button>
                    </div>
                  </div>
                </ScrollAnimation>
              ))
            ) : (
                <ScrollAnimation>
                    <div className="text-center text-gray-400 p-8 bg-black/40 rounded-xl border border-dashed border-white/10">
                        No credentials found for this address.
                    </div>
                </ScrollAnimation>
            )}

            {/* ZK Proof Section */}
            <ScrollAnimation>
                <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
                    <h3 className="text-xl text-blue-400 mb-6">Generate Zero-Knowledge Proof</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm">Generate a ZK proof of your credentials to use in other applications without revealing your address.</p>
                    <button onClick={handleGenerateProof} disabled={isProving} className="relative inline-flex group/button items-center justify-center">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-75 group-hover/button:opacity-100 transition duration-200"></div>
                        <span className="relative px-8 py-4 bg-black rounded-lg">
                            {isProving ? 'Generating Proof...' : 'Generate ZK Proof'}
                        </span>
                    </button>
                    {zkProof && (
                        <div className="mt-6 text-left">
                            <p className="text-green-400">✓ Proof Generated Successfully!</p>
                            <pre className="bg-gray-900/50 p-3 mt-2 rounded-md text-white text-xs overflow-x-auto">
                                {JSON.stringify(zkProof, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </ScrollAnimation>
          </div>
        )}
        {error && <p className="text-red-500 mt-6 text-center">{error}</p>}
      </div>
    </div>
    <CredentialModal credential={selectedCredential} onClose={() => setSelectedCredential(null)} />
    </>
  );
};

export default CredentialsPage;