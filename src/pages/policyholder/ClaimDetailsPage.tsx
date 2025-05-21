import React from 'react';
import { useParams } from 'react-router-dom';

interface ClaimStatus {
  status: 'pending' | 'verified' | 'rejected';
  color: string;
  text: string;
}

const getStatusConfig = (status: string): ClaimStatus => {
  const statusMap: Record<string, ClaimStatus> = {
    pending: {
      status: 'pending',
      color: 'bg-yellow-100 text-yellow-800',
      text: 'Pending Verification'
    },
    verified: {
      status: 'verified',
      color: 'bg-green-100 text-green-800',
      text: 'Verified'
    },
    rejected: {
      status: 'rejected',
      color: 'bg-red-100 text-red-800',
      text: 'Verification Failed'
    }
  };

  return statusMap[status] || statusMap.pending;
};

const ClaimDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - in a real app, this would be fetched from an API
  const claimDetails = {
    id,
    status: 'verified',
    submissionDate: '2024-03-15',
    verificationDate: '2024-03-15',
    insurer: 'Sanlam',
    policyNumber: 'POL-123456',
    documents: [
      { name: 'Accident Report.pdf', size: '2.4 MB', type: 'PDF' },
      { name: 'Vehicle Photo 1.jpg', size: '1.8 MB', type: 'Image' },
      { name: 'Police Report.pdf', size: '3.1 MB', type: 'PDF' }
    ],
    verificationResults: {
      documentAuthenticity: 98,
      dataConsistency: 95,
      fraudRiskScore: 2
    }
  };

  const statusConfig = getStatusConfig(claimDetails.status);

  return (
    <div className="min-h-screen bg-[#003366] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Claim Details</h1>
          <span className={`px-4 py-2 rounded-full ${statusConfig.color}`}>
            {statusConfig.text}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-lg p-6 text-[#003366] shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Claim Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600">Claim ID</label>
                <p className="font-medium">{claimDetails.id}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Submission Date</label>
                <p className="font-medium">{claimDetails.submissionDate}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Insurer</label>
                <p className="font-medium">{claimDetails.insurer}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Policy Number</label>
                <p className="font-medium">{claimDetails.policyNumber}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 text-[#003366] shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Verification Results</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Document Authenticity</label>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-[#009933] h-2 rounded-full"
                      style={{ width: `${claimDetails.verificationResults.documentAuthenticity}%` }}
                    ></div>
                  </div>
                  <span className="font-medium">
                    {claimDetails.verificationResults.documentAuthenticity}%
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600">Data Consistency</label>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-[#009933] h-2 rounded-full"
                      style={{ width: `${claimDetails.verificationResults.dataConsistency}%` }}
                    ></div>
                  </div>
                  <span className="font-medium">
                    {claimDetails.verificationResults.dataConsistency}%
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600">Fraud Risk Score</label>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${claimDetails.verificationResults.fraudRiskScore}%` }}
                    ></div>
                  </div>
                  <span className="font-medium">
                    {claimDetails.verificationResults.fraudRiskScore}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 text-[#003366] shadow-lg md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
            <div className="divide-y divide-gray-200">
              {claimDetails.documents.map((doc, index) => (
                <div key={index} className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-400 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.size} • {doc.type}</p>
                    </div>
                  </div>
                  <button className="text-[#009933] hover:text-[#009933]/80 font-medium">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button className="px-6 py-2 bg-white text-[#003366] rounded-lg hover:bg-gray-100">
            Download Report
          </button>
          <button className="px-6 py-2 bg-[#009933] text-white rounded-lg hover:bg-[#009933]/90">
            Share with Insurer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetailsPage; 