import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-[#003366] flex items-center justify-center relative"
      style={{
        backgroundImage: 'url(/assets/protea-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-[#003366]/80"></div>
      <div className="relative z-10 text-center p-6">
        <h1 className="text-4xl font-bold text-white mb-6">
          Welcome to Detachd!
        </h1>
        <p className="text-white/90 text-lg mb-8 max-w-md mx-auto">
          Let's get started with setting up your insurance verification system.
        </p>
        <button
          onClick={() => navigate('/onboarding/insurer-code')}
          className="bg-[#009933] text-white px-8 py-3 rounded-lg font-semibold 
                   hover:bg-[#009933]/90 transition-colors duration-200"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;