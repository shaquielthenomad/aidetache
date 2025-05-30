import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'policyholder' | 'insurer';
  acceptTerms: boolean;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'policyholder',
    acceptTerms: false
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      addNotification({
        type: 'error',
        message: 'Please fill in all required fields',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      addNotification({
        type: 'error',
        message: 'Passwords do not match',
      });
      return;
    }

    if (!formData.acceptTerms) {
      addNotification({
        type: 'error',
        message: 'Please accept the terms and conditions',
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, this would call an API to register the user
      // For demo, we'll just redirect to onboarding
      addNotification({
        type: 'success',
        message: 'Registration successful! Redirecting to onboarding...',
      });

      // Redirect to appropriate onboarding flow based on user type
      if (formData.userType === 'insurer') {
        navigate('/onboarding/welcome');
      } else {
        navigate('/onboarding/insurer-code');
      }
    } catch (error) {
      console.error('Registration error:', error);
      addNotification({
        type: 'error',
        message: 'Registration failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#003366] flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/assets/protea-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-[#003366]/80"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#003366]">Create Account</h1>
            <p className="text-gray-600 mt-2">Join Detachd today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="userType" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                I am a
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md
                         focus:ring-2 focus:ring-[#009933] focus:border-transparent"
              >
                <option value="policyholder">Policyholder</option>
                <option value="insurer">Insurance Provider</option>
              </select>
            </div>

            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md
                         focus:ring-2 focus:ring-[#009933] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md
                         focus:ring-2 focus:ring-[#009933] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md
                         focus:ring-2 focus:ring-[#009933] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md
                         focus:ring-2 focus:ring-[#009933] focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="h-4 w-4 text-[#009933] border-gray-300 rounded
                         focus:ring-[#009933]"
                required
              />
              <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-600">
                I accept the{' '}
                <button
                  type="button"
                  onClick={() => navigate('/terms')}
                  className="text-[#009933] hover:text-[#009933]/80"
                >
                  Terms of Service
                </button>
                {' '}and{' '}
                <button
                  type="button"
                  onClick={() => navigate('/privacy')}
                  className="text-[#009933] hover:text-[#009933]/80"
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#009933] text-white py-2 px-4 rounded-md
                       hover:bg-[#009933]/90 transition-colors duration-200
                       ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#009933] hover:text-[#009933]/80 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;