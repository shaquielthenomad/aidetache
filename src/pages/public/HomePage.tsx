import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, TrendingUp } from 'lucide-react';
import Button from '../../components/Button';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-[#003366] text-white"
      style={{
        backgroundImage: 'url(/assets/protea-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#003366]/80"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            Stop Insurance Fraud with AI
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
            Protect your business with our advanced AI-powered insurance claim verification platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="bg-[#009933] text-white px-8 py-3 rounded-lg font-semibold 
                       hover:bg-[#009933]/90 transition-colors duration-200"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-[#003366] px-8 py-3 rounded-lg font-semibold 
                       hover:bg-gray-100 transition-colors duration-200"
            >
              Register
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <div className="text-[#009933] mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Verification</h3>
              <p className="text-gray-300">
                Advanced algorithms detect fraudulent claims with high accuracy
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <div className="text-[#009933] mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Processing</h3>
              <p className="text-gray-300">
                Get instant verification results and certificates
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <div className="text-[#009933] mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">POPIA Compliant</h3>
              <p className="text-gray-300">
                Your data is secure and protected
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
          <button
            onClick={() => navigate('/register')}
            className="bg-[#009933] text-white px-8 py-3 rounded-lg font-semibold 
                     hover:bg-[#009933]/90 transition-colors duration-200"
          >
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// Include missing components
function Upload(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function Zap(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}