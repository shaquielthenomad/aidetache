import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, MessageSquare } from 'lucide-react';

type TwoFactorMethod = 'authenticator_app' | 'sms_verification';

const TwoFactorSetupPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<TwoFactorMethod>('authenticator_app');

  const handleMethodChange = (method: TwoFactorMethod) => {
    setSelectedMethod(method);
  };

  const handleProceed = () => {
    // TODO: Implement 2FA setup logic based on selected method
    console.log('Proceeding with 2FA setup using method:', selectedMethod);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0F172A] text-white">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#1E293B] px-10 py-4 shadow-md">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="size-6 text-[#1043CF]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Detachd</h2>
          </Link>
          <nav className="flex flex-1 justify-end gap-6">
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium hover:text-[#1043CF] transition-colors">Dashboard</Link>
              <Link to="/claims" className="text-sm font-medium hover:text-[#1043CF] transition-colors">Claims</Link>
              <Link to="/policy" className="text-sm font-medium hover:text-[#1043CF] transition-colors">Policy</Link>
              <Link to="/support" className="text-sm font-medium hover:text-[#1043CF] transition-colors">Support</Link>
            </div>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#1043CF]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB44e9vTgT77pdL_qHuJ7-fLtMrOX3sE2wSej8OIgvX0vQM5cImjCQ1Qp-uUgxD9MFy9Vi7FlkEEAcqGYtMqc4IVD7wDg_MU_1CrrPL-39M7sG1jccwlC7AAGOLvDAVGtn9GT8aCVYX2pSDN8i7CHk9tH2pnncW8Szf4GApeAOr49IkHWM0DeSH_o5QhY0hxori-XkgmNB1rRVyqxy1DbMvQ-dXl2o7RxNgN7rvW65jfczig6LKtbpL2OIYj4QFKfUjoU2hBhOiiSA")' }} />
          </nav>
        </header>

        <main className="flex flex-1 justify-center py-12 px-6 bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
          <div className="layout-content-container flex flex-col w-full max-w-2xl space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">Set Up Two-Factor Authentication (2FA)</h1>
              <p className="text-lg text-[#94A3B8]">
                Add an extra layer of security to your Detachd account. 2FA helps protect your account even if your password is compromised.
              </p>
            </div>

            <div className="bg-[#1E293B] p-8 rounded-xl shadow-2xl space-y-6">
              <h3 className="text-xl font-semibold text-center">Choose Your Preferred 2FA Method</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label
                  className={`flex flex-col items-center gap-4 rounded-lg border-2 p-6 cursor-pointer transition-all duration-200 ease-in-out ${
                    selectedMethod === 'authenticator_app'
                      ? 'border-[#1043CF] bg-[#1043cf]/10'
                      : 'border-[#334155] hover:border-[#1043CF]'
                  }`}
                >
                  <QrCode className="text-4xl text-[#1043CF]" />
                  <input
                    checked={selectedMethod === 'authenticator_app'}
                    className="h-5 w-5 border-2 border-[#334155] bg-transparent text-transparent checked:border-[#1043CF] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-2 focus:ring-[#1043CF] focus:ring-offset-2 focus:ring-offset-[#1E293B] checked:focus:border-[#1043CF]"
                    name="2fa_method"
                    type="radio"
                    value="authenticator_app"
                    onChange={() => handleMethodChange('authenticator_app')}
                  />
                  <div className="text-center">
                    <p className="text-base font-medium">Authenticator App</p>
                    <p className="text-sm text-[#94A3B8]">Use an app like Authy or Google Authenticator.</p>
                  </div>
                </label>

                <label
                  className={`flex flex-col items-center gap-4 rounded-lg border-2 p-6 cursor-pointer transition-all duration-200 ease-in-out ${
                    selectedMethod === 'sms_verification'
                      ? 'border-[#1043CF] bg-[#1043cf]/10'
                      : 'border-[#334155] hover:border-[#1043CF]'
                  }`}
                >
                  <MessageSquare className="text-4xl text-[#1043CF]" />
                  <input
                    checked={selectedMethod === 'sms_verification'}
                    className="h-5 w-5 border-2 border-[#334155] bg-transparent text-transparent checked:border-[#1043CF] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-2 focus:ring-[#1043CF] focus:ring-offset-2 focus:ring-offset-[#1E293B] checked:focus:border-[#1043CF]"
                    name="2fa_method"
                    type="radio"
                    value="sms_verification"
                    onChange={() => handleMethodChange('sms_verification')}
                  />
                  <div className="text-center">
                    <p className="text-base font-medium">SMS Verification</p>
                    <p className="text-sm text-[#94A3B8]">Receive codes via text message.</p>
                  </div>
                </label>
              </div>

              <div className="border-t border-[#334155] pt-6 space-y-4">
                <h4 className="text-lg font-semibold text-center">Next Steps:</h4>
                <ol className="list-decimal list-inside space-y-2 text-[#94A3B8] text-sm pl-4">
                  <li>
                    <strong>If using an Authenticator App:</strong>
                    <ul className="list-disc list-inside pl-4">
                      <li>Install an authenticator app on your smartphone (e.g., Google Authenticator, Authy).</li>
                      <li>Scan the QR code that will be displayed on the next screen with your app.</li>
                      <li>Enter the 6-digit code generated by your app to verify.</li>
                    </ul>
                  </li>
                  <li className="mt-2">
                    <strong>If using SMS Verification:</strong>
                    <ul className="list-disc list-inside pl-4">
                      <li>Ensure your phone number is up-to-date in your profile.</li>
                      <li>Enter the verification code sent to your phone number.</li>
                    </ul>
                  </li>
                </ol>
                <p className="text-xs text-center text-[#64748B]">
                  Detailed instructions will be provided on the next page based on your selection.
                </p>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={handleProceed}
                  className="flex w-full md:w-auto min-w-[120px] items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-[#1043CF] text-white text-base font-semibold tracking-wide hover:bg-[#0D36A6] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1043CF] focus:ring-offset-2 focus:ring-offset-[#1E293B]"
                >
                  <span className="truncate">Proceed to Setup</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TwoFactorSetupPage; 