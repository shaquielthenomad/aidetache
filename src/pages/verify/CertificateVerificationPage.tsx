import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { useNotification } from '../../contexts/NotificationContext';
import { QrCode, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Card, { CardBody, CardHeader, CardFooter } from '../../components/Card';
import Button from '../../components/Button';

const CertificateVerificationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { verifyCertificate, certificates } = useStore();
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    details: any;
  } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const certificate = certificates.find(c => c.id === id);

  const handleVerify = async (sealData: string) => {
    if (!id) return;

    setIsVerifying(true);
    try {
      const result = await verifyCertificate(id, sealData);
      setVerificationResult(result);
      addNotification({
        type: result.isValid ? 'success' : 'error',
        message: result.isValid
          ? 'Certificate verified successfully'
          : 'Certificate verification failed',
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Verification failed',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  if (!certificate) {
    return (
      <div className="min-h-screen bg-[#003366] text-white p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-warning-50 border-warning-200">
            <CardBody className="text-warning-800">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                <h2 className="text-lg font-semibold">Certificate Not Found</h2>
              </div>
              <p className="mt-2">The requested certificate could not be found.</p>
              <Button
                variant="warning"
                className="mt-4"
                onClick={() => navigate('/')}
              >
                Return Home
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
          <h1 className="text-3xl font-bold">Certificate Verification</h1>
          <Button
            variant="secondary"
            onClick={() => navigate('/')}
          >
            Return Home
          </Button>
        </div>

        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-primary-50">
            <h2 className="text-xl font-semibold text-primary-800">
              Certificate Details
            </h2>
          </CardHeader>
          <CardBody className="text-primary-800">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-primary-600">Certificate ID</h3>
                <p className="mt-1 text-lg">{certificate.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary-600">Claim ID</h3>
                <p className="mt-1 text-lg">{certificate.claimId}</p>
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
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-primary-50">
            <h2 className="text-xl font-semibold text-primary-800">
              Verify Certificate
            </h2>
          </CardHeader>
          <CardBody className="text-primary-800">
            {verificationResult ? (
              <div className="text-center">
                {verificationResult.isValid ? (
                  <div className="text-success-600">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Certificate Verified</h3>
                    <p className="text-success-700">
                      This certificate is authentic and has been verified.
                    </p>
                    <div className="mt-6 text-left bg-success-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Verification Details</h4>
                      <dl className="space-y-2 text-sm">
                        <div>
                          <dt className="text-success-600">Verified By</dt>
                          <dd>{verificationResult.details.verifiedBy}</dd>
                        </div>
                        <div>
                          <dt className="text-success-600">Verification Time</dt>
                          <dd>{new Date(verificationResult.details.timestamp).toLocaleString()}</dd>
                        </div>
                        <div>
                          <dt className="text-success-600">Certificate Owner</dt>
                          <dd>{verificationResult.details.username}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                ) : (
                  <div className="text-error-600">
                    <XCircle className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Verification Failed</h3>
                    <p className="text-error-700">
                      This certificate could not be verified. It may be invalid or expired.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <QrCode className="w-16 h-16 mx-auto mb-4 text-primary-400" />
                <p className="text-primary-600 mb-6">
                  To verify this certificate, please scan the QR code on the certificate
                  or enter the verification code below.
                </p>
                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Enter verification code"
                    className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    onChange={(e) => {
                      if (e.target.value.length === 32) {
                        handleVerify(e.target.value);
                      }
                    }}
                  />
                  <p className="mt-2 text-sm text-primary-500">
                    Enter the 32-character verification code from the certificate
                  </p>
                </div>
              </div>
            )}
          </CardBody>
          <CardFooter className="bg-primary-50 border-t border-primary-100">
            <div className="w-full text-center">
              <p className="text-sm text-primary-600">
                For additional verification, please contact our support team.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CertificateVerificationPage; 