import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../../components/Button';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-500 relative">
      <div 
        className="absolute inset-0 bg-[url('/assets/protea-pattern.svg')] opacity-10"
        aria-hidden="true"
      ></div>
      
      <div className="max-w-lg w-full mx-4 text-center z-10 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Welcome to Detachd
        </h1>
        
        <p className="text-xl text-neutral-200 mb-8">
          Let's get started by setting up your insurance profile and linking your first claim.
        </p>
        
        <Link to="/onboarding/insurer-code">
          <Button 
            variant="secondary" 
            size="lg"
            className="flex items-center justify-center"
          >
            Start Setup
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
        
        <p className="mt-6 text-sm text-neutral-300">
          This will only take a few minutes
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;