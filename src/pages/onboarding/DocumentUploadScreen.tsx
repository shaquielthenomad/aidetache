import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DocumentUploadScreen: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (files && consent) {
      // Handle file upload logic here
      navigate('/onboarding/insurer-selection');
    }
  };

  return (
    <div className="min-h-screen bg-[#003366] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-[#003366] mb-6">
          Upload Accident Documents
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="documents"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Documents
            </label>
            <input
              type="file"
              id="documents"
              accept=".jpg,.jpeg,.png,.pdf"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md
                       focus:ring-2 focus:ring-[#009933] focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              Accepted formats: JPEG, PNG, PDF (max 10MB per file)
            </p>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="popia-consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 text-[#009933] border-gray-300 rounded
                       focus:ring-[#009933]"
            />
            <label
              htmlFor="popia-consent"
              className="ml-2 block text-sm text-gray-700"
            >
              I consent to the processing of my personal information in accordance
              with POPIA (Protection of Personal Information Act)
            </label>
          </div>

          <button
            type="submit"
            disabled={!files || !consent}
            className={`w-full py-2 px-4 rounded-md transition-colors duration-200
                     ${files && consent
                       ? 'bg-[#009933] text-white hover:bg-[#009933]/90'
                       : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentUploadScreen;