import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordRequirement {
  id: string;
  label: string;
  regex: RegExp;
  met: boolean;
}

const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requirements, setRequirements] = useState<PasswordRequirement[]>([
    { id: 'length', label: 'Minimum 8 characters', regex: /.{8,}/, met: false },
    { id: 'uppercase', label: 'At least one uppercase letter (A-Z)', regex: /[A-Z]/, met: false },
    { id: 'lowercase', label: 'At least one lowercase letter (a-z)', regex: /[a-z]/, met: false },
    { id: 'number', label: 'At least one number (0-9)', regex: /[0-9]/, met: false },
    { id: 'special', label: 'At least one special character (e.g., !@#$%)', regex: /[^A-Za-z0-9]/, met: false },
  ]);

  useEffect(() => {
    // Update requirements status when password changes
    setRequirements(prev => prev.map(req => ({
      ...req,
      met: req.regex.test(newPassword)
    })));
  }, [newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    // Validate all requirements are met
    const allRequirementsMet = requirements.every(req => req.met);
    if (!allRequirementsMet) {
      alert('Please ensure your password meets all requirements.');
      return;
    }

    // TODO: Implement password reset logic
    console.log('Password reset submitted');
    setIsSubmitted(true);
  };

  const togglePasswordVisibility = (field: 'new' | 'confirm') => {
    if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0D1117] text-white">
      <div className="flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#21262D] px-10 py-4">
          <Link to="/" className="flex items-center gap-4">
            <div className="size-6 text-[#1043cf]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">Detach<span className="text-[#1043cf]">d</span></h1>
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center p-4 md:p-0">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white">Reset Your Password</h2>
              <p className="mt-2 text-center text-sm text-gray-400">
                Choose a new password for your account.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="sr-only" htmlFor="new-password">New Password</label>
                    <div className="relative">
                      <input
                        autoComplete="new-password"
                        className="form-input relative block w-full appearance-none rounded-md border px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-[#1043cf] focus:outline-none sm:text-sm h-12 bg-[#161B22] border-[#30363D]"
                        id="new-password"
                        name="new_password"
                        placeholder="New Password"
                        required
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        onClick={() => togglePasswordVisibility('new')}
                      >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="confirm-password">Confirm New Password</label>
                    <div className="relative">
                      <input
                        autoComplete="new-password"
                        className="form-input relative block w-full appearance-none rounded-md border px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-[#1043cf] focus:outline-none sm:text-sm h-12 bg-[#161B22] border-[#30363D]"
                        id="confirm-password"
                        name="confirm_password"
                        placeholder="Confirm New Password"
                        required
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        onClick={() => togglePasswordVisibility('confirm')}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-sm font-medium text-gray-300">Password requirements:</p>
                  {requirements.map((req) => (
                    <div
                      key={req.id}
                      className={`password-requirement flex items-center text-sm ${
                        req.met ? 'text-green-400' : 'text-gray-400'
                      }`}
                    >
                      <span className="mr-2">
                        {req.met ? '✓' : '×'}
                      </span>
                      <span>{req.label}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <button
                    className="btn-primary group relative flex w-full justify-center rounded-md border border-transparent py-3 px-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#1043cf] focus:ring-offset-2 focus:ring-offset-gray-800 h-12"
                    type="submit"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            ) : (
              <div className="rounded-md bg-green-600/20 p-4 ring-1 ring-inset ring-green-600/30">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-300">Password Reset Successful!</h3>
                    <div className="mt-2 text-sm text-green-400">
                      <p>
                        Your password has been updated. You can now{' '}
                        <Link to="/login" className="font-medium text-white hover:text-gray-200 underline">
                          log in
                        </Link>{' '}
                        with your new password.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <p className="mt-6 text-center text-xs text-gray-500">
              Remembered your password?{' '}
              <Link to="/login" className="font-medium text-[#1043cf] hover:text-[#0a38b0]">
                Log in here
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 