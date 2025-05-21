import React from 'react';

interface Certificate {
  id: string;
  claimId: string;
  issueDate: string;
  insurer: string;
  status: 'valid' | 'expired';
  downloadUrl: string;
}

const CertificateDownloadPage: React.FC = () => {
  // Mock data - in a real app, this would be fetched from an API
  const certificates: Certificate[] = [
    {
      id: 'CERT-001',
      claimId: 'CLM-2024-001',
      issueDate: '2024-03-15',
      insurer: 'Sanlam',
      status: 'valid',
      downloadUrl: '#'
    },
    {
      id: 'CERT-002',
      claimId: 'CLM-2024-002',
      issueDate: '2024-03-10',
      insurer: 'Discovery',
      status: 'valid',
      downloadUrl: '#'
    },
    {
      id: 'CERT-003',
      claimId: 'CLM-2024-003',
      issueDate: '2024-02-28',
      insurer: 'Naked',
      status: 'expired',
      downloadUrl: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-[#003366] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Verification Certificates</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-white text-[#003366] rounded-lg hover:bg-gray-100">
              Export All
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-[#003366]">
                  <th className="px-6 py-4 text-left font-semibold">Certificate ID</th>
                  <th className="px-6 py-4 text-left font-semibold">Claim ID</th>
                  <th className="px-6 py-4 text-left font-semibold">Issue Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Insurer</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {certificates.map((cert) => (
                  <tr key={cert.id} className="text-[#003366]">
                    <td className="px-6 py-4">
                      <span className="font-medium">{cert.id}</span>
                    </td>
                    <td className="px-6 py-4">{cert.claimId}</td>
                    <td className="px-6 py-4">{cert.issueDate}</td>
                    <td className="px-6 py-4">{cert.insurer}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${cert.status === 'valid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        className="text-[#009933] hover:text-[#009933]/80 font-medium"
                        onClick={() => window.open(cert.downloadUrl)}
                      >
                        Download
                      </button>
                      <button
                        className="text-[#003366] hover:text-[#003366]/80 font-medium"
                        onClick={() => window.open(`/claim/${cert.claimId}`)}
                      >
                        View Claim
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {certificates.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No certificates found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Certificates will appear here after your claims are verified.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-lg p-6 text-[#003366] shadow-lg">
          <h2 className="text-xl font-semibold mb-4">About Verification Certificates</h2>
          <p className="text-gray-600">
            Verification certificates are official documents that confirm the authenticity
            of your insurance claims. These certificates can be shared with your insurer
            or other relevant parties as proof of verification.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Valid certificates are active and can be used for verification
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Expired certificates should be renewed if needed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDownloadPage; 