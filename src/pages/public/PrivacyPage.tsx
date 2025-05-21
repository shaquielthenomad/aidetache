import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#003366] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="bg-white text-[#003366] rounded-lg p-8 shadow-lg">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-6">
              At Detachd, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our platform.
            </p>

            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="mb-6">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Insurance policy details</li>
              <li>Claim-related documentation and images</li>
              <li>Communication records between you and our platform</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="mb-6">We use the collected information for:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Processing and verifying insurance claims</li>
              <li>Communicating with you about your claims</li>
              <li>Improving our services and user experience</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">4. POPIA Compliance</h2>
            <p className="mb-6">
              We comply with the Protection of Personal Information Act (POPIA) by:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Only collecting information necessary for our services</li>
              <li>Processing information lawfully and transparently</li>
              <li>Implementing appropriate security measures</li>
              <li>Respecting your rights regarding your personal information</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p className="mb-6">
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, modification, or disclosure.
            </p>

            <h2 className="text-2xl font-semibold mb-4">6. Data Sharing</h2>
            <p className="mb-6">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Insurance providers (for claim processing)</li>
              <li>Service providers (who assist in our operations)</li>
              <li>Legal authorities (when required by law)</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
            <p className="mb-6">
              Under POPIA, you have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to the processing of your information</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">8. Retention Period</h2>
            <p className="mb-6">
              We retain your personal information for as long as necessary to fulfill the
              purposes outlined in this Privacy Policy, unless a longer retention period is
              required by law.
            </p>

            <h2 className="text-2xl font-semibold mb-4">9. Changes to Privacy Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. We will notify you of
              any changes by posting the new Privacy Policy on this page.
            </p>

            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="mb-6">
              For any questions about this Privacy Policy, please contact our Information
              Officer at privacy@detachd.com
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

export default PrivacyPage; 