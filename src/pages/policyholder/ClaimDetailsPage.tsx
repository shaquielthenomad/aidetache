import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { useNotification } from '../../contexts/NotificationContext';
import { FileText, Download, Share2, CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';
import Card, { CardBody, CardHeader, CardFooter } from '../../components/Card';
import Button from '../../components/Button';

const ClaimDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const {
    claims,
    certificates,
    fetchClaimDetails,
    fetchCertificates,
    downloadCertificate,
    shareCertificate,
    claimLoading,
    claimError,
    certificatesLoading,
    certificatesError
  } = useStore();

  useEffect(() => {
    if (id) {
      fetchClaimDetails(id).catch((error) => {
        addNotification({
          type: 'error',
          message: error.message || 'Failed to fetch claim details',
        });
      });
      fetchCertificates().catch((error) => {
        addNotification({
          type: 'error',
          message: error.message || 'Failed to fetch certificates',
        });
      });
    }
  }, [id, fetchClaimDetails, fetchCertificates, addNotification]);

  const claim = claims.find(c => c.id === id);
  const certificate = certificates.find(c => c.claimId === id);

  const handleDownload = async () => {
    if (!certificate) return;
    try {
      await downloadCertificate(certificate.id);
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

  const handleShare = async () => {
    if (!certificate) return;
    try {
      await shareCertificate(certificate.id);
      addNotification({
        type: 'success',
        message: 'Certificate shared successfully',
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to share certificate',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  if (claimLoading || certificatesLoading) {
    return (
      <div className="min-h-screen bg-[#003366] text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-32 bg-white/10 rounded"></div>
              <div className="h-64 bg-white/10 rounded"></div>
              <div className="h-48 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (claimError || certificatesError) {
    return (
      <div className="min-h-screen bg-[#003366] text-white p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-error-50 border-error-200">
            <CardBody className="text-error-800">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                <h2 className="text-lg font-semibold">Error Loading Claim Details</h2>
              </div>
              <p className="mt-2">{claimError || certificatesError}</p>
              <Button
                variant="error"
                className="mt-4"
                onClick={() => {
                  if (id) {
                    fetchClaimDetails(id);
                    fetchCertificates();
                  }
                }}
              >
                Try Again
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="min-h-screen bg-[#003366] text-white p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-warning-50 border-warning-200">
            <CardBody className="text-warning-800">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                <h2 className="text-lg font-semibold">Claim Not Found</h2>
              </div>
              <p className="mt-2">The requested claim could not be found.</p>
              <Button
                variant="warning"
                className="mt-4"
                onClick={() => navigate('/claims')}
              >
                Back to Claims
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
          <h1 className="text-3xl font-bold">Claim Details</h1>
          <Button
            variant="secondary"
            onClick={() => navigate('/claims')}
          >
            Back to Claims
          </Button>
        </div>

        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-primary-50">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-primary-800">
                Claim Information
              </h2>
              {getStatusBadge(claim.status)}
            </div>
          </CardHeader>
          <CardBody className="text-primary-800">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-primary-600">Claim ID</h3>
                <p className="mt-1 text-lg">{claim.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary-600">Date Submitted</h3>
                <p className="mt-1 text-lg">
                  {new Date(claim.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary-600">Insurer</h3>
                <p className="mt-1 text-lg">{claim.insurer}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary-600">Policy Number</h3>
                <p className="mt-1 text-lg">{claim.policyNumber}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {certificate && (
          <Card className="shadow-lg mb-8">
            <CardHeader className="bg-primary-50">
              <h2 className="text-xl font-semibold text-primary-800">
                Verification Certificate
              </h2>
            </CardHeader>
            <CardBody className="text-primary-800">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-primary-600">Certificate ID</h3>
                  <p className="mt-1 text-lg">{certificate.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-primary-600">Issue Date</h3>
                  <p className="mt-1 text-lg">
                    {new Date(certificate.issueDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-primary-600">Expiry Date</h3>
                  <p className="mt-1 text-lg">
                    {new Date(certificate.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-primary-600">Status</h3>
                  <p className="mt-1">{getStatusBadge(certificate.status)}</p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="bg-primary-50 border-t border-primary-100">
              <div className="flex space-x-4">
                <Button
                  variant="primary"
                  onClick={handleDownload}
                  disabled={certificate.status !== 'valid'}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleShare}
                  disabled={certificate.status !== 'valid'}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Certificate
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}

        <Card className="shadow-lg">
          <CardHeader className="bg-primary-50">
            <h2 className="text-xl font-semibold text-primary-800">
              Supporting Documents
            </h2>
          </CardHeader>
          <CardBody className="text-primary-800">
            {claim.documents && claim.documents.length > 0 ? (
              <div className="space-y-4">
                {claim.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-primary-100"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-sm font-medium text-primary-800">
                          {doc.name}
                        </p>
                        <p className="text-xs text-primary-500">
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="text"
                      className="text-primary-600 hover:text-primary-700"
                      onClick={() => window.open(doc.url)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-primary-600">No documents uploaded for this claim.</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ClaimDetailsPage; 