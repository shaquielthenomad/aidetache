import { useEffect } from 'react';
import { useAuth } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

export const Callback = () => {
  const { handleRedirectCallback } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleRedirectCallback();
        navigate('/');
      } catch (error) {
        console.error('Error handling callback:', error);
        navigate('/login');
      }
    };
    handleCallback();
  }, [handleRedirectCallback, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing login...</p>
      </div>
    </div>
  );
}; 