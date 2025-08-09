import React from 'react';
import ScrollAnimation from './ScrollAnimation';

const Footer: React.FC = () => {
  const links = [
    { title: 'GitBook', url: 'https://pixel-protocol-2.gitbook.io/pixel-protocol-docs', icon: '📚' },
    { title: 'GitHub', url: 'https://github.com/ayaanoski/pixel-protocol', icon: '💻' },
    { title: 'Explorer', url: 'https://morphscan.com/pixelprotocol', icon: '🔍' },
    { title: 'Morph L2', url: 'https://morph.network', icon: '⚡' }
  ];

  return (
    <footer className="py-20 px-4 border-t border-white/10 press-start-2p-regular relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-900/5 to-black/10"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <ScrollAnimation>
          <div className="text-center relative mb-16">
            <h2 className="text-3xl md:text-5xl text-white mb-4 relative z-10">
              Connect with the Protocol
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl z-0 rounded-full"></div>
            <p className="text-lg text-gray-400 mt-4">
              Join the decentralized reputation revolution
            </p>
          </div>
        </ScrollAnimation>

      {/* --- ENHANCED LINKS SECTION --- */}
        <ScrollAnimation>
        {/* Adjusted grid for a more balanced layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {links.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                // Added transform and enhanced hover effects for a "lift and glow" feel
                className="group bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 
                           transform transition-all duration-300 ease-in-out
                           hover:-translate-y-2 hover:border-purple-500/80 
                           hover:shadow-2xl hover:shadow-purple-500/30"
              >
                <div className="p-8 text-center">
                  {/* Added transition to the icon for smooth scaling */}
                  <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {link.icon}
                  </div>
                  <h3 className="text-gray-300 group-hover:text-purple-400 transition-colors duration-300 text-sm">
                    {link.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                  <img 
                    src="/logo.jpeg" 
                    alt="Pixel Protocol Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  PIXEL PROTOCOL
                </span>
              </div>
              <div className="text-gray-400 text-sm">Decentralizing Reputation • One Block at a Time</div>
            </div>
            
            <div className="flex flex-col items-center space-y-8">
              <div className="flex space-x-6">
                <a href="https://x.com/ayaanadil2403?t=avaZSj0DagZg2sFrhfaInw&s=09" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Twitter
                </a>
                <a href="https://t.me/VINSMOKee24" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Telegram
                </a>
                <a href="https://medium.com/pixelprotocol" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Medium
                </a>
    _          </div>
              
              <div className="text-center pt-4 border-t border-white/10 w-full">
                <p className="text-gray-400 text-xs">
                  © 2025 PIXEL PROTOCOL • BUILT ON MORPH • POWERED BY ZK-PROOFS
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </footer>
  );
};

export default Footer;