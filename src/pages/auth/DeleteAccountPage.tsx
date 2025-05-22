import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Trash2 } from 'lucide-react';

const DeleteAccountPage: React.FC = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmation: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfirmed) {
      alert('Please confirm that you understand the consequences of deleting your account.');
      return;
    }

    setIsSubmitting(true);

    // TODO: Implement account deletion logic
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Redirect to home page after successful deletion
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to delete account:', error);
      alert('Failed to delete account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0D1117] text-white">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#30363D] px-10 py-4 shadow-sm">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="size-6 text-[#1043cf]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold leading-tight">Detachd</h2>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Dashboard</Link>
            <Link to="/claims" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Claims</Link>
            <Link to="/policy" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Policy</Link>
            <Link to="/settings" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Settings</Link>
            <Link to="/support" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Support</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <span className="material-icons-outlined">notifications</span>
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1043cf] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1043cf]"></span>
              </span>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#1043cf]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCf-m8WYrfYvIxEfnq60-96nXLydFHxeu4VvVGAwvQObejuw4iLuuLM2FuCRfWArfpz0ZXsEGQ41BErRSlYpTdqImJicgWbovtJddbID_Wt8WCI2N_Wof8sbfBhVTxIYL6KYxCGnoEQuO9hAoXc4Rl06Ef_SSMOawo8icWDV5yRU2hYHOqk73J0oxb26N56_swhcsK8vfKaAlDEsq6rFW5p4bmfnToOS5_scVnOyU5SEV5q1p-I1RQmj2tjI5A5qqN_-fVY6TrH_Bk")' }} />
          </div>
        </header>

        <main className="flex flex-1 justify-center py-12 px-6 bg-[#161B22]">
          <div className="w-full max-w-lg bg-[#0D1117] p-8 rounded-xl shadow-2xl border border-[#30363D]">
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <h1 className="mt-4 text-3xl font-bold text-white tracking-tight">Delete Your Account</h1>
              <p className="mt-2 text-gray-400">This action cannot be undone. Please read the information below carefully.</p>
            </div>

            <div className="mb-8 rounded-lg bg-red-600/10 p-4 border border-red-600/20">
              <h3 className="text-sm font-medium text-red-400">Before you proceed, please understand:</h3>
              <ul className="mt-2 list-disc list-inside text-sm text-red-300 space-y-1">
                <li>All your data will be permanently deleted</li>
                <li>Your claims history will be removed</li>
                <li>Your policy information will be deleted</li>
                <li>This action cannot be reversed</li>
                <li>You will need to create a new account if you wish to use our services again</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="password">
                  Enter Your Password
                </label>
                <div className="relative">
                  <input
                    className="form-input pl-4 pr-10 flex w-full resize-none overflow-hidden rounded-lg text-white bg-[#1C2128] border border-[#30363D] focus:border-[#1043cf] h-12 placeholder:text-gray-500 text-sm"
                    id="password"
                    name="password"
                    placeholder="Enter your password to confirm"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="confirmation">
                  Type "DELETE" to Confirm
                </label>
                <input
                  className="form-input flex w-full resize-none overflow-hidden rounded-lg text-white bg-[#1C2128] border border-[#30363D] focus:border-[#1043cf] h-12 px-4 placeholder:text-gray-500 text-sm"
                  id="confirmation"
                  name="confirmation"
                  placeholder="Type DELETE to confirm"
                  value={formData.confirmation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="confirm-delete"
                    name="confirm-delete"
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#30363D] bg-[#1C2128] text-[#1043cf] focus:ring-[#1043cf]"
                    checked={isConfirmed}
                    onChange={(e) => setIsConfirmed(e.target.checked)}
                    required
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="confirm-delete" className="text-sm text-gray-400">
                    I understand that this action is permanent and cannot be undone. I have backed up any important data I wish to keep.
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  className="flex w-full items-center justify-center rounded-lg h-12 px-6 bg-red-600 hover:bg-red-700 transition-colors text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-[#0D1117] disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting || !isConfirmed || formData.confirmation !== 'DELETE'}
                >
                  <Trash2 className="mr-2 h-5 w-5" />
                  {isSubmitting ? 'Deleting Account...' : 'Delete Account'}
                </button>

                <Link
                  to="/settings"
                  className="flex w-full items-center justify-center rounded-lg h-12 px-6 bg-[#1C2128] hover:bg-[#2D333B] transition-colors text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#1043cf] focus:ring-offset-2 focus:ring-offset-[#0D1117]"
                >
                  Cancel
                </Link>
              </div>
            </form>

            <p className="mt-8 text-center text-xs text-gray-500">
              If you're having trouble with your account, please{' '}
              <Link to="/support" className="font-medium text-[#1043cf] hover:underline">
                contact support
              </Link>{' '}
              before deleting your account.
            </p>
          </div>
        </main>

        <footer className="px-10 py-6 border-t border-solid border-t-[#30363D] text-center">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Detachd. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DeleteAccountPage; 