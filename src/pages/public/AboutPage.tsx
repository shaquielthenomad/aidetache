import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#003366] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Detachd</h1>
        <div className="bg-white text-[#003366] rounded-lg p-6 shadow-lg">
          <p className="mb-4">
            Detachd is an innovative AI-powered platform designed to stop insurance fraud
            through advanced verification technology.
          </p>
          <p className="mb-4">
            Our mission is to protect both insurers and policyholders by providing
            fast, accurate, and reliable claim verification services.
          </p>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Trust and Transparency</li>
              <li>Innovation in Insurance</li>
              <li>Data Security and Privacy</li>
              <li>Customer-First Approach</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 