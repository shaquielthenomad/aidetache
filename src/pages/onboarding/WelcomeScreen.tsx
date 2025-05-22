import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = () => {
    if (user?.role === 'insurer') {
      // Insurers go directly to their dashboard
      navigate('/insurer/dashboard');
    } else {
      // Policyholders go through the claim verification flow
      navigate('/onboarding/insurer-code');
    }
  };

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
          {user?.role === 'insurer'
            ? "Let's set up your insurance verification system."
            : "Let's get started with verifying your insurance claim."}
        </p>
        <button
          onClick={handleStart}
          className="bg-[#009933] text-white px-8 py-3 rounded-lg font-semibold 
                   hover:bg-[#009933]/90 transition-colors duration-200"
        >
          {user?.role === 'insurer' ? 'Go to Dashboard' : 'Start Verification'}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;