import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 👈 Import the Link component

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 press-start-2p-regular">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Name */}
        <Link to="/" className="flex items-center space-x-3 cursor-pointer"> {/* 👈 Use Link instead of a */}
          <div className="w-10 h-10 rounded-lg overflow-hidden">
            <img
              src="/logo.jpeg"
              alt="Pixel Protocol Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white text-sm bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            PIXEL PROTOCOL
          </span>
        </Link> {/* 👈 Close the Link component */}

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
            href="https://github.com/ayaanoski/pixel-protocol"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white px-4 py-2 text-xs transition-colors"
          >
            GitHub
          </a>

          <a
            href="https://pixel-protocol-2.gitbook.io/pixel-protocol-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white px-4 py-2 text-xs transition-colors"
          >
            GitBook
          </a>

          {/* Credentials Page Button */}
          <Link to="/credentials" className="group relative"> {/* 👈 Use Link and 'to' prop */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative px-4 py-2 bg-black rounded-lg leading-none flex items-center">
              <span className="text-gray-200 group-hover:text-white transition duration-200 text-xs">
                VIEW CREDENTIALS
              </span>
            </div>
          </Link> {/* 👈 Close the Link component */}
        </div>

        {/* Mobile Menu */}
        <div className={`
          fixed md:hidden inset-x-0 top-[73px] bg-black/95 backdrop-blur-md
          transition-all duration-500 ease-in-out border-b border-white/10
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
        `}>
          <div className="flex flex-col p-6 space-y-6">
            <a
              href="https://github.com/ayaanoski/pixel-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white px-4 py-2 text-xs transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              GitHub
            </a>
            <a
              href="https://pixel-protocol-2.gitbook.io/pixel-protocol-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white px-4 py-2 text-xs transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              GitBook
            </a>
            <Link
              to="/credentials" // 👈 Use Link and 'to' prop
              className="group relative w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-4 py-2 bg-black rounded-lg leading-none flex items-center justify-center">
                <span className="text-gray-200 group-hover:text-white transition duration-200 text-xs">
                  VIEW CREDENTIALS
                </span>
              </div>
            </Link> {/* 👈 Close the Link component */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;