import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InsurerCodeScreen: React.FC = () => {
  const [insurerCode, setInsurerCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding/accident-code');
  };

  return (
    <div className="min-h-screen bg-[#003366] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-[#003366] mb-6">
          Enter Your Insurer Code
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="insurerCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Insurer Code
            </label>
            <input
              type="text"
              id="insurerCode"
              value={insurerCode}
              onChange={(e) => setInsurerCode(e.target.value)}
              placeholder="e.g., SANLAM123"
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-[#009933] focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter the code provided by your insurance company
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#009933] text-white py-2 px-4 rounded-md
                     hover:bg-[#009933]/90 transition-colors duration-200"
          >
            Add Insurer
          </button>

          <button
            type="button"
            onClick={() => navigate('/onboarding/accident-code')}
            className="w-full text-[#003366] text-sm mt-2 hover:underline"
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  );
};

export default InsurerCodeScreen;