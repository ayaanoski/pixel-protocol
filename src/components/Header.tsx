import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 press-start-2p-regular">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden">
            <img 
              src="/logo.jpeg" 
              alt="Pixel Protocol Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="hidden sm:inline text-white text-sm bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            PIXEL PROTOCOL
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white my-1.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://github.com/pixelprotocol"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white px-4 py-2 text-xs transition-colors"
          >
            GitHub
          </a>

          {/* GitBook Button */}
          <a
            href="https://docs.pixelprotocol.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white px-4 py-2 text-xs transition-colors"
          >
            GitBook
          </a>

          {/* Connect Wallet Button */}
          <button
            onClick={connectWallet}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative px-4 py-2 bg-black rounded-lg leading-none flex items-center">
              <span className="text-gray-200 group-hover:text-white transition duration-200 text-xs">
                {isConnected ? formatAddress(walletAddress) : 'CONNECT WALLET'}
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`
          fixed md:hidden inset-x-0 top-[73px] bg-black/95 backdrop-blur-md
          transition-all duration-500 ease-in-out border-b border-white/10
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
        `}>
          <div className="flex flex-col p-6 space-y-6">
            <a
              href="https://github.com/pixelprotocol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white px-4 py-2 text-xs transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              GitHub
            </a>
            <a
              href="https://docs.pixelprotocol.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white px-4 py-2 text-xs transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              GitBook
            </a>
            <button
              onClick={() => {
                connectWallet();
                setIsMenuOpen(false);
              }}
              className="group relative w-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-4 py-2 bg-black rounded-lg leading-none flex items-center justify-center">
                <span className="text-gray-200 group-hover:text-white transition duration-200 text-xs">
                  {isConnected ? formatAddress(walletAddress) : 'CONNECT WALLET'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;