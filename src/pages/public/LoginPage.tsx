import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Card, { CardBody, CardHeader, CardFooter } from '../../components/Card';
import Button from '../../components/Button';
import { DEMO_CREDENTIALS } from '../../constants/auth';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loginType, setLoginType] = useState<'policyholder' | 'insurer'>('policyholder');
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from the location state, or default to appropriate dashboard
  const getRedirectPath = (userType: 'policyholder' | 'insurer') => {
    if (location.state?.from?.pathname) {
      return location.state.from.pathname;
    }
    return userType === 'insurer' ? '/insurer/dashboard' : '/dashboard';
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.email || !formData.password) {
      addNotification({
        type: 'error',
        message: 'Please enter both email and password',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      
      // Determine user type from credentials
      const isInsurer = formData.email === DEMO_CREDENTIALS.INSURER.email;
      const redirectPath = getRedirectPath(isInsurer ? 'insurer' : 'policyholder');
      
      addNotification({
        type: 'success',
        message: 'Login successful! Redirecting...',
      });
      
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      addNotification({
        type: 'error',
        message: 'Invalid email or password. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    if (loginType === 'insurer') {
      setFormData({
        email: DEMO_CREDENTIALS.INSURER.email,
        password: DEMO_CREDENTIALS.INSURER.password
      });
    } else {
      setFormData({
        email: DEMO_CREDENTIALS.POLICYHOLDER.email,
        password: DEMO_CREDENTIALS.POLICYHOLDER.password
      });
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
            <h1 className="text-2xl font-bold text-[#003366]">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
            <div className="mt-2 text-sm text-[#009933]">
              Demo credentials are pre-filled for testing
            </div>
          </div>

          {/* Login Type Selector */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors
                ${loginType === 'policyholder'
                  ? 'bg-white text-[#003366] shadow'
                  : 'text-gray-600 hover:text-[#003366]'
                }`}
              onClick={() => {
                setLoginType('policyholder');
                handleDemoLogin();
              }}
            >
              Policyholder
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors
                ${loginType === 'insurer'
                  ? 'bg-white text-[#003366] shadow'
                  : 'text-gray-600 hover:text-[#003366]'
                }`}
              onClick={() => {
                setLoginType('insurer');
                handleDemoLogin();
              }}
            >
              Insurer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-[#009933] border-gray-300 rounded
                           focus:ring-[#009933]"
                />
                <label htmlFor="remember" className="ml-2 text-gray-600">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-[#009933] hover:text-[#009933]/80"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#009933] text-white py-2 px-4 rounded-md
                       hover:bg-[#009933]/90 transition-colors duration-200
                       ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <button
              onClick={handleDemoLogin}
              className="mt-4 w-full bg-[#003366] text-white py-2 px-4 rounded-md
                       hover:bg-[#003366]/90 transition-colors duration-200"
            >
              Try Demo {loginType === 'insurer' ? 'Insurer' : 'Policyholder'} Account
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-[#009933] hover:text-[#009933]/80 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;