import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send } from 'lucide-react';

const AccountVerificationPage: React.FC = () => {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleResendVerification = async () => {
    setIsResending(true);
    // TODO: Implement resend verification email logic
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendSuccess(true);
    } catch (error) {
      console.error('Failed to resend verification email:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0D1117] text-white">
      <div className="flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#21262D] px-6 sm:px-10 py-4">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="size-6 text-[#1043cf]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Detachd</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/policyholders" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Policyholders</Link>
            <Link to="/insurers" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Insurers</Link>
            <Link to="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About Us</Link>
          </nav>
          <Link
            to="/login"
            className="hidden md:flex min-w-[90px] items-center justify-center rounded-md h-10 px-5 bg-[#1043cf] text-white text-sm font-semibold hover:bg-[#0D37AF] transition-colors duration-300 hover:shadow-[0_0_15px_5px_rgba(16,67,207,0.5)]"
          >
            Log In
          </Link>
          <button className="md:hidden text-white">
            <span className="material-icons-outlined">menu</span>
          </button>
        </header>

        <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8 bg-[#161B22] p-8 sm:p-10 rounded-xl shadow-2xl border border-[#21262D]">
            <div className="text-center">
              <Mail className="mx-auto h-12 w-12 text-[#1043cf] mb-4" />
              <h2 className="mt-2 text-3xl font-extrabold text-white">
                Verify Your Account
              </h2>
              <p className="mt-3 text-md text-gray-400">
                We've sent a verification link to your email address. Please click the link to confirm your account.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div className="rounded-md bg-[#0D1117] p-4 border border-[#21262D]">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-white">Verification Email Sent To:</span>
                  <br />
                  <span className="text-[#1043cf] font-medium">user@example.com</span>
                  <span className="text-gray-500 text-xs block mt-1">(This is a placeholder, replace with actual user email)</span>
                </p>
              </div>

              <div>
                <button
                  onClick={handleResendVerification}
                  disabled={isResending || resendSuccess}
                  className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-[#1043cf] hover:bg-[#0D37AF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1043cf] focus:ring-offset-[#161B22] transition-colors duration-300 hover:shadow-[0_0_15px_5px_rgba(16,67,207,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                >
                  <Send className="h-5 w-5" />
                  {isResending ? 'Sending...' : resendSuccess ? 'Email Resent!' : 'Resend Verification Email'}
                </button>
              </div>

              {resendSuccess && (
                <div className="rounded-md bg-green-600/20 p-4 border border-green-600/30">
                  <p className="text-sm text-green-400">
                    A new verification email has been sent. Please check your inbox.
                  </p>
                </div>
              )}

              <p className="mt-6 text-center text-sm text-gray-500">
                Didn't receive the email? Check your spam or promotions folder. If you still can't find it, please{' '}
                <Link to="/support" className="font-medium text-[#1043cf] hover:text-[#3b82f6] transition-colors">
                  contact support
                </Link>.
              </p>
            </div>
          </div>
        </main>

        <footer className="border-t border-solid border-[#21262D] px-10 py-6 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Detachd. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AccountVerificationPage; 