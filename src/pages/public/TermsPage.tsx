import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
  const handleAccept = () => {
    // TODO: Implement terms acceptance logic
    console.log('Terms accepted');
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0D1117] text-white">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#30363D] px-10 py-4 shadow-md">
          <Link to="/" className="flex items-center gap-4">
            <div className="size-6 text-[#c7d0e9]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">Detachd</h2>
          </Link>
        </header>

        <main className="flex flex-1 justify-center py-12 bg-[#161B22]">
          <div className="layout-content-container flex flex-col w-full max-w-3xl p-8 bg-[#0D1117] rounded-lg shadow-xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#c7d0e9]">Terms of Service</h1>
              <p className="text-sm text-gray-400 mt-2">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-[#c7d0e9] mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-300 text-base leading-relaxed">
                  By accessing or using the Detachd platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then
                  you may not access the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#c7d0e9] mb-3">2. Description of Service</h2>
                <p className="text-gray-300 text-base leading-relaxed">
                  Detachd provides an AI-powered platform for insurance claim submissions and fraud analysis. We offer tools for policyholders to submit claims efficiently and for
                  insurers to analyze potential fraudulent activities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#c7d0e9] mb-3">3. User Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-base leading-relaxed">
                  <li>You are responsible for maintaining the confidentiality of your account information, including your password.</li>
                  <li>You are responsible for all activities that occur under your account.</li>
                  <li>You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</li>
                  <li>You agree not to use the Service for any illegal or unauthorized purpose.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#c7d0e9] mb-3">4. Data Usage and Privacy</h2>
                <p className="text-gray-300 text-base leading-relaxed">
                  We collect and use your data in accordance with our <Link to="/privacy" className="text-[#c7d0e9] hover:underline font-medium">Privacy Policy</Link>. By using our Service, you
                  consent to such collection and use. We are committed to protecting your data and may use anonymized and aggregated data to improve our services and for fraud
                  detection algorithms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#c7d0e9] mb-3">5. Limitation of Liability</h2>
                <p className="text-gray-300 text-base leading-relaxed">
                  To the maximum extent permitted by applicable law, Detachd shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any
                  loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your
                  access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the
                  Service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or
                  any other legal theory, whether or not we have been informed of the possibility of such damage. We provide our platform "as is" and "as available" without
                  warranties of any kind.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#c7d0e9] mb-3">6. Dispute Resolution</h2>
                <p className="text-gray-300 text-base leading-relaxed">
                  Any disputes arising out of or relating to these Terms or the Service will be resolved through binding arbitration in accordance with the rules of the American
                  Arbitration Association. The arbitration shall take place in Johannesburg, South Africa, and the arbitral decision may be enforced in any court.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#c7d0e9] mb-3">7. Changes to Terms</h2>
                <p className="text-gray-300 text-base leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice
                  prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Your continued use of our Service after such
                  changes constitutes your acceptance of the new Terms.
                </p>
              </section>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={handleAccept}
                className="min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#c7d0e9] text-[#0D1117] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#b0bacf] transition-colors duration-200"
              >
                <span className="truncate">I Understand and Accept</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              By clicking "I Understand and Accept", you acknowledge that you have read, understood, and agree to the Terms of Service.
            </p>
          </div>
        </main>

        <footer className="text-center py-6 border-t border-solid border-t-[#30363D] bg-[#0D1117]">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Detachd. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsPage; 