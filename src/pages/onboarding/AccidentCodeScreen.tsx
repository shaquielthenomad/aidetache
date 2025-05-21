import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccidentCodeScreen: React.FC = () => {
  const [accidentCode, setAccidentCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding/document-upload');
  };

  return (
    <div className="min-h-screen bg-[#003366] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-[#003366] mb-6">
          Enter Accident Code
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label 
              htmlFor="accidentCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Accident Code
            </label>
            <input
              type="text"
              id="accidentCode"
              value={accidentCode}
              onChange={(e) => setAccidentCode(e.target.value)}
              placeholder="e.g., POL123456"
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-[#009933] focus:border-transparent"
            />
            <div 
              className="absolute right-3 top-8 cursor-help"
              title="Enter the code from your police report or insurance claim"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Found on your police report or insurance claim document
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#009933] text-white py-2 px-4 rounded-md
                     hover:bg-[#009933]/90 transition-colors duration-200"
          >
            Link Accident
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccidentCodeScreen;