import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#003366] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="bg-white text-[#003366] rounded-lg p-8 shadow-lg">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-6">
              Welcome to Detachd. By accessing or using our platform, you agree to be bound
              by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
            <p className="mb-6">
              "Service" refers to the Detachd platform and all related services.<br />
              "User" refers to any individual or entity using the Service.<br />
              "Content" refers to all information and materials uploaded to or processed by the Service.
            </p>

            <h2 className="text-2xl font-semibold mb-4">3. Use of Service</h2>
            <p className="mb-6">
              The Service is provided for insurance claim verification purposes. Users must:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide accurate and truthful information</li>
              <li>Maintain the confidentiality of their account</li>
              <li>Use the Service in compliance with all applicable laws</li>
              <li>Not attempt to circumvent or manipulate the verification process</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">4. Data Protection</h2>
            <p className="mb-6">
              We comply with POPIA regulations regarding the collection, processing, and
              storage of personal information. See our Privacy Policy for details.
            </p>

            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
            <p className="mb-6">
              All intellectual property rights in the Service remain the property of
              Detachd. Users grant us a license to use uploaded content for verification
              purposes.
            </p>

            <h2 className="text-2xl font-semibold mb-4">6. Liability</h2>
            <p className="mb-6">
              The Service is provided "as is" without warranties. We shall not be liable
              for any indirect, incidental, or consequential damages.
            </p>

            <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
            <p className="mb-6">
              We reserve the right to terminate or suspend access to the Service for
              violations of these terms or any applicable laws.
            </p>

            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p className="mb-6">
              We may modify these terms at any time. Continued use of the Service
              constitutes acceptance of modified terms.
            </p>

            <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
            <p className="mb-6">
              These terms are governed by the laws of South Africa. Any disputes shall
              be resolved in the courts of Johannesburg.
            </p>

            <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
            <p className="mb-6">
              For questions about these terms, contact us at legal@detachd.com
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Last updated: March 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 