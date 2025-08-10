import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Features from './components/Features';
import Developers from './components/Developers';
import UseCases from './components/UseCases';
import Footer from './components/Footer';
import CredentialsPage from './pages/CredentialsPage'; // assuming you've moved CredentialsPage to a `pages` folder

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const backgroundStyle = { 
    backgroundImage: `url(${isMobile ? '/vertical-bg.png' : '/bg.png'})` 
  };

  return (
    <Router>
      <div className="bg-black text-white min-h-screen relative">
        <div 
          className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat opacity-30"
          style={backgroundStyle}
        />
        <Header />
        <div className="relative z-10">
          <Routes>
            <Route path="/credentials" element={<CredentialsPage />} />
            <Route path="/" element={
              <>
                <Hero />
                <Problem />
                <Features />
                <Developers />
                <UseCases />
              </>
            } />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;