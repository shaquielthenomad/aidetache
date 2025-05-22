import React, { useEffect } from 'react';
import { useStore } from '../../store';
import { Download, FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import Card, { CardBody, CardHeader, CardFooter } from '../../components/Card';
import Button from '../../components/Button';
import { useNotification } from '../../contexts/NotificationContext';

const CertificateDownloadPage: React.FC = () => {
  const { certificates, certificatesLoading, certificatesError, fetchCertificates, downloadCertificate, verifyCertificate } = useStore();
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchCertificates().catch((error) => {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to fetch certificates',
      });
    });
  }, [fetchCertificates, addNotification]);

  const handleDownload = async (id: string) => {
    try {
      await downloadCertificate(id);
      addNotification({
        type: 'success',
        message: 'Certificate downloaded successfully',
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to download certificate',
      });
    }
  };

  const handleVerify = async (id: string) => {
    try {
      await verifyCertificate(id);
      addNotification({
        type: 'success',
        message: 'Certificate verified successfully',
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to verify certificate',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'valid':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Valid
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Expired
          </span>
        );
      case 'revoked':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
            <XCircle className="w-3 h-3 mr-1" />
            Revoked
          </span>
        );
      default:
        return null;
    }
  };

  if (certificatesLoading) {
    return (
      <div className="min-h-screen bg-[#003366] text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded w-1/4 mb-8"></div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-white/5 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (certificatesError) {
    return (
      <div className="min-h-screen bg-[#003366] text-white p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-error-50 border-error-200">
            <CardBody className="text-error-800">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                <h2 className="text-lg font-semibold">Error Loading Certificates</h2>
              </div>
              <p className="mt-2">{certificatesError}</p>
              <Button
                variant="error"
                className="mt-4"
                onClick={() => fetchCertificates()}
              >
                Try Again
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#003366] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Verification Certificates</h1>
          <div className="flex space-x-4">
            <Button
              variant="secondary"
              onClick={() => {
                // Implement bulk download
                addNotification({
                  type: 'info',
                  message: 'Bulk download feature coming soon',
                });
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-50 text-primary-800">
                    <th className="px-6 py-4 text-left font-semibold">Certificate ID</th>
                    <th className="px-6 py-4 text-left font-semibold">Claim ID</th>
                    <th className="px-6 py-4 text-left font-semibold">Issue Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Expiry Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-100">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="text-primary-800">
                      <td className="px-6 py-4">
                        <span className="font-medium">{cert.id}</span>
                      </td>
                      <td className="px-6 py-4">{cert.claimId}</td>
                      <td className="px-6 py-4">
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(cert.expiryDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(cert.status)}</td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <Button
                          variant="text"
                          className="text-primary-600 hover:text-primary-700"
                          onClick={() => handleDownload(cert.id)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button
                          variant="text"
                          className="text-primary-600 hover:text-primary-700"
                          onClick={() => handleVerify(cert.id)}
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Verify
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {certificates.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-primary-400" />
                <h3 className="mt-2 text-sm font-medium text-primary-800">
                  No certificates found
                </h3>
                <p className="mt-1 text-sm text-primary-600">
                  Certificates will appear here after your claims are verified.
                </p>
              </div>
            )}
          </CardBody>
        </Card>

        <Card className="mt-8 shadow-lg">
          <CardHeader className="bg-primary-50">
            <h2 className="text-xl font-semibold text-primary-800">
              About Verification Certificates
            </h2>
          </CardHeader>
          <CardBody className="text-primary-800">
            <p className="text-primary-600">
              Verification certificates are official documents that confirm the authenticity
              of your insurance claims. These certificates can be shared with your insurer
              or other relevant parties as proof of verification.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-primary-600">
                <CheckCircle className="w-4 h-4 mr-2 text-success-500" />
                Valid certificates are active and can be used for verification
              </div>
              <div className="flex items-center text-sm text-primary-600">
                <AlertCircle className="w-4 h-4 mr-2 text-warning-500" />
                Expired certificates should be renewed if needed
              </div>
              <div className="flex items-center text-sm text-primary-600">
                <XCircle className="w-4 h-4 mr-2 text-error-500" />
                Revoked certificates are no longer valid and cannot be used
              </div>
            </div>
          </CardBody>
          <CardFooter className="bg-primary-50 border-t border-primary-100">
            <p className="text-sm text-primary-600">
              Need help? Contact our support team for assistance with your certificates.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CertificateDownloadPage; 