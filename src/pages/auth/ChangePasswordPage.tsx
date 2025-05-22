import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Save } from 'lucide-react';

const ChangePasswordPage: React.FC = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match. Please try again.');
      setIsSubmitting(false);
      return;
    }

    // TODO: Implement password change logic
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (error) {
      console.error('Failed to change password:', error);
      alert('Failed to change password. Please try again.');
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
              <h1 className="text-3xl font-bold text-white tracking-tight">Change Your Password</h1>
              <p className="text-gray-400 mt-2">Update your password to keep your account secure.</p>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="current-password">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <input
                      className="form-input pl-10 pr-10 flex w-full resize-none overflow-hidden rounded-lg text-white bg-[#1C2128] border border-[#30363D] focus:border-[#1043cf] h-12 placeholder:text-gray-500 text-sm"
                      id="current-password"
                      name="currentPassword"
                      placeholder="Enter your current password"
                      type={showPasswords.current ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      onClick={() => togglePasswordVisibility('current')}
                    >
                      {showPasswords.current ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="new-password">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <input
                      className="form-input pl-10 pr-10 flex w-full resize-none overflow-hidden rounded-lg text-white bg-[#1C2128] border border-[#30363D] focus:border-[#1043cf] h-12 placeholder:text-gray-500 text-sm"
                      id="new-password"
                      name="newPassword"
                      placeholder="Enter your new password"
                      type={showPasswords.new ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      onClick={() => togglePasswordVisibility('new')}
                    >
                      {showPasswords.new ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="confirm-password">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <input
                      className="form-input pl-10 pr-10 flex w-full resize-none overflow-hidden rounded-lg text-white bg-[#1C2128] border border-[#30363D] focus:border-[#1043cf] h-12 placeholder:text-gray-500 text-sm"
                      id="confirm-password"
                      name="confirmPassword"
                      placeholder="Confirm your new password"
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      onClick={() => togglePasswordVisibility('confirm')}
                    >
                      {showPasswords.confirm ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <div className="bg-[#1C2128] p-4 rounded-md border border-[#30363D]">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    <strong className="text-gray-300">Password requirements:</strong>
                    <br />
                    - Minimum 8 characters
                    <br />
                    - At least one uppercase letter (A-Z)
                    <br />
                    - At least one lowercase letter (a-z)
                    <br />
                    - At least one number (0-9)
                    <br />
                    - At least one special character (e.g., !@#$%^&*)
                  </p>
                </div>

                <div>
                  <button
                    className="flex w-full items-center justify-center rounded-lg h-12 px-6 bg-[#1043cf] hover:bg-[#0D38B3] transition-colors text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#1043cf] focus:ring-offset-2 focus:ring-offset-[#0D1117] disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <Save className="mr-2 h-5 w-5" />
                    {isSubmitting ? 'Changing Password...' : 'Change Password'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="rounded-md bg-green-600/20 p-4 border border-green-600/30">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-300">Password Changed Successfully!</h3>
                    <p className="mt-2 text-sm text-green-400">
                      Your password has been updated. You can now use your new password to log in.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="mt-8 text-center text-xs text-gray-500">
              If you've forgotten your current password, you can{' '}
              <Link to="/forgot-password" className="font-medium text-[#1043cf] hover:underline">
                reset it here
              </Link>.
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

export default ChangePasswordPage; 