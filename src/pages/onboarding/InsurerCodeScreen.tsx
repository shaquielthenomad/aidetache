import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const InsurerCodeScreen: React.FC = () => {
  const [insurerCode, setInsurerCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useNotification();

  // Redirect insurers to their dashboard
  React.useEffect(() => {
    if (user?.role === 'insurer') {
      navigate('/insurer/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would validate the insurer code with an API
      // For demo, we'll accept any non-empty code
      if (!insurerCode.trim()) {
        addNotification({
          type: 'error',
          message: 'Please enter an insurer code',
        });
        return;
      }

      addNotification({
        type: 'success',
        message: 'Insurer code verified successfully',
      });

      navigate('/onboarding/accident-code');
    } catch (error) {
      console.error('Verification error:', error);
      addNotification({
        type: 'error',
        message: 'Failed to verify insurer code. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render for insurers
  if (user?.role === 'insurer') {
    return null;
  }

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
            disabled={isLoading}
            className={`w-full bg-[#009933] text-white py-2 px-4 rounded-md
                     hover:bg-[#009933]/90 transition-colors duration-200
                     ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Verifying...' : 'Add Insurer'}
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