import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Email } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset request logic
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0A0F1E] text-white">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#1E243A] px-10 py-4 shadow-sm">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="size-6 text-[#1043CF]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Detachd</h2>
          </Link>
          <div className="flex flex-1 justify-end gap-6">
            <div className="flex items-center gap-6">
              <Link to="/features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Product</Link>
              <Link to="/solutions" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Solutions</Link>
              <Link to="/resources" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Resources</Link>
              <Link to="/pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</Link>
            </div>
            <Link to="/login" className="flex items-center justify-center rounded-lg h-10 px-5 bg-[#1E243A] hover:bg-[#2B324D] text-white text-sm font-semibold transition-colors">
              <span>Log in</span>
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center py-16 px-4">
          <div className="layout-content-container flex w-full max-w-md flex-col items-center rounded-xl bg-[#111827] p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Forgot Your Password?</h2>
              <p className="mt-3 text-base text-gray-400">
                No worries! Enter the email address associated with your Detachd account, and we'll send you a secure link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div>
                <label className="sr-only" htmlFor="email">Email address</label>
                <input
                  autoComplete="email"
                  className="form-input block w-full rounded-lg border-0 bg-[#1E243A] px-4 py-3.5 text-white placeholder-gray-500 shadow-sm ring-1 ring-inset ring-[#2B324D] focus:ring-2 focus:ring-inset focus:ring-[#1043CF] sm:text-sm sm:leading-6 transition-all duration-200"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="flex w-full items-center justify-center rounded-lg bg-[#1043CF] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0D36A9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1043CF] transition-colors duration-200"
                  type="submit"
                >
                  Send Reset Link
                </button>
              </div>
            </form>

            {isSubmitted && (
              <div className="mt-6 w-full rounded-md bg-green-700/30 p-4 border border-green-500/50 animate-fadeIn">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg aria-hidden="true" className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" fillRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-300">Password reset link sent! Please check your email.</p>
                  </div>
                </div>
              </div>
            )}

            <p className="mt-8 text-center text-sm text-gray-500">
              Remember your password?
              <Link to="/login" className="font-semibold leading-6 text-[#1043CF] hover:text-[#0D36A9] transition-colors duration-200 ml-1">
                Log in here
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 