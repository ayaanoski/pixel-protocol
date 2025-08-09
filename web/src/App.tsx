
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Features from './components/Features';
import Developers from './components/Developers';
import UseCases from './components/UseCases';
import Footer from './components/Footer';
import CredentialsPage from './components/CredentialsPage';

function App() {
  const isCredentialsPage = window.location.pathname === '/credentials';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isCredentialsPage) {
    return (
      <div className="bg-black text-white min-h-screen relative">
        <div 
          className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: `url(${isMobile ? '/vertical-bg.png' : '/bg.png'})` }}
        />
        <Header />
        <div className="relative z-10">
          <CredentialsPage />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen relative">
      <div 
        className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${isMobile ? '/vertical-bg.png' : '/bg.png'})` }}
      />
      <Header />
      <div className="relative z-10">
        <Hero />
        <Problem />
        <Features />
        <Developers />
        <UseCases />
        <Footer />
      </div>
    </div>
  );
}

export default App;