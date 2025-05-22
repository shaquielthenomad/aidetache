import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, FileText, Info, ArrowLeft, BarChart2 } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import { useStore } from '../../store';
import Card, { CardBody, CardHeader, CardFooter } from '../../components/Card';
import Button from '../../components/Button';

const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { generateCertificate, downloadCertificate } = useStore();
  
  const [resultData, setResultData] = useState<{
    image: string | null;
    imageName: string | null;
    passed: boolean;
    confidence: number;
    timestamp: string;
  }>({
    image: null,
    imageName: null,
    passed: false,
    confidence: 0,
    timestamp: new Date().toISOString(),
  });
  
  useEffect(() => {
    const fetchResultData = async () => {
      try {
        // Get data from sessionStorage for backward compatibility
        const uploadedImage = sessionStorage.getItem('uploadedImage');
        const uploadedImageName = sessionStorage.getItem('uploadedImageName');
        const verificationPassed = sessionStorage.getItem('verificationPassed');
        const confidenceScore = sessionStorage.getItem('confidenceScore');
        
        if (!uploadedImage || verificationPassed === null) {
          addNotification({
            type: 'error',
            message: 'No verification results found. Please upload an image first.',
          });
          navigate('/upload');
          return;
        }
        
        setResultData({
          image: uploadedImage,
          imageName: uploadedImageName,
          passed: verificationPassed === 'true',
          confidence: confidenceScore ? parseInt(confidenceScore, 10) : 0,
          timestamp: new Date().toISOString(),
        });
        
        // Store in sessionStorage as a claim for the dashboard
        const claimId = id || Math.floor(Math.random() * 1000000).toString();
        const existingClaims = JSON.parse(sessionStorage.getItem('claims') || '[]');
        
        const newClaim = {
          id: claimId,
          image: uploadedImage,
          imageName: uploadedImageName,
          passed: verificationPassed === 'true',
          confidence: confidenceScore ? parseInt(confidenceScore, 10) : 0,
          timestamp: new Date().toISOString(),
        };
        
        // Add to claims if not already present
        if (!existingClaims.some((claim: any) => claim.id === claimId)) {
          sessionStorage.setItem('claims', JSON.stringify([...existingClaims, newClaim]));
        }
      } catch (error) {
        addNotification({
          type: 'error',
          message: 'Failed to load verification results',
        });
        navigate('/upload');
      }
    };

    fetchResultData();
  }, [id, navigate, addNotification]);
  
  // Generate certificate
  const handleGenerateCertificate = async () => {
    try {
      if (!id) {
        throw new Error('No claim ID found');
      }

      // Generate certificate
      const certificate = await generateCertificate(id);
      
      addNotification({
        type: 'success',
        message: 'Certificate generated successfully!',
      });

      // Download the certificate
      await downloadCertificate(certificate.id);
      
      // Navigate to certificates page
      navigate('/certificates');
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to generate certificate',
      });
    }
  };
  
  // Upload another image
  const handleUploadAnother = () => {
    navigate('/upload');
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-800">
          Analysis Results
        </h1>
        
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-primary-600 hover:text-primary-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <Card className="shadow-md h-full">
            <CardHeader className={`flex justify-between items-center ${
              resultData.passed ? 'bg-success-50 text-success-700' : 'bg-error-50 text-error-700'
            }`}>
              <h2 className="text-xl font-semibold flex items-center">
                {resultData.passed ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 mr-2" />
                )}
                {resultData.passed ? 'Verification Passed' : 'Verification Failed'}
              </h2>
              <span className="text-sm">
                ID: {id}
              </span>
            </CardHeader>
            
            <CardBody>
              <div className="flex flex-col md:flex-row md:space-x-6">
                {resultData.image && (
                  <div className="mb-4 md:mb-0 md:w-1/2">
                    <h3 className="font-medium text-primary-800 mb-2">Analyzed Image</h3>
                    <img
                      src={resultData.image}
                      alt="Analyzed"
                      className="w-full h-auto rounded-md border border-neutral-200 object-contain max-h-48"
                    />
                    {resultData.imageName && (
                      <p className="text-sm text-primary-600 mt-2">
                        Filename: {resultData.imageName}
                      </p>
                    )}
                  </div>
                )}
                
                <div className="md:w-1/2">
                  <h3 className="font-medium text-primary-800 mb-4">Analysis Results</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-primary-700">Authenticity Score</span>
                        <span className="text-sm font-medium text-primary-800">
                          {resultData.confidence}%
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            resultData.passed ? 'bg-success-500' : 'bg-error-500'
                          }`}
                          style={{ width: `${resultData.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-primary-50 p-3 rounded-md">
                        <p className="text-sm text-primary-600">Status</p>
                        <p className={`font-medium ${
                          resultData.passed ? 'text-success-600' : 'text-error-600'
                        }`}>
                          {resultData.passed ? 'Authentic' : 'Suspicious'}
                        </p>
                      </div>
                      
                      <div className="bg-primary-50 p-3 rounded-md">
                        <p className="text-sm text-primary-600">Timestamp</p>
                        <p className="font-medium text-primary-800">
                          {formatDate(resultData.timestamp)}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded-md ${
                      resultData.passed ? 'bg-success-50' : 'bg-error-50'
                    }`}>
                      <div className="flex">
                        <div className={`mr-3 ${
                          resultData.passed ? 'text-success-500' : 'text-error-500'
                        }`}>
                          <Info className="w-5 h-5" />
                        </div>
                        <div>
                          <p className={`font-medium ${
                            resultData.passed ? 'text-success-700' : 'text-error-700'
                          }`}>
                            {resultData.passed ? 'Image Appears Authentic' : 'Potential Manipulation Detected'}
                          </p>
                          <p className="text-sm mt-1">
                            {resultData.passed 
                              ? 'Our AI has determined this image has not been manipulated and appears to be an authentic photograph.'
                              : 'Our AI has detected potential signs of manipulation in this image. Further review is recommended.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
            
            <CardFooter className="bg-neutral-50 border-t">
              <div className="flex flex-wrap gap-4">
                <Button
                  variant={resultData.passed ? 'success' : 'primary'}
                  onClick={handleGenerateCertificate}
                  className="flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Certificate
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleUploadAnother}
                  className="flex items-center"
                >
                  Upload Another Image
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="shadow-md mb-6">
            <CardHeader className="bg-primary-50">
              <h3 className="font-medium text-primary-800 flex items-center">
                <BarChart2 className="w-4 h-4 mr-2" />
                Analysis Details
              </h3>
            </CardHeader>
            
            <CardBody className="text-sm">
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-primary-600">Metadata Integrity</span>
                  <StatusBadge passed={resultData.passed} />
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-primary-600">Image Consistency</span>
                  <StatusBadge passed={resultData.passed} />
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-primary-600">Error Level Analysis</span>
                  <StatusBadge passed={resultData.confidence > 90} />
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-primary-600">AI Model Confidence</span>
                  <span className="font-medium text-primary-800">{resultData.confidence}%</span>
                </li>
              </ul>
            </CardBody>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="bg-primary-50">
              <h3 className="font-medium text-primary-800 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Next Steps
              </h3>
            </CardHeader>
            
            <CardBody className="text-sm">
              <ul className="space-y-3">
                {resultData.passed ? (
                  <>
                    <li className="flex">
                      <CheckCircle className="w-4 h-4 mr-2 text-success-500 flex-shrink-0" />
                      <span>Generate a verification certificate</span>
                    </li>
                    <li className="flex">
                      <CheckCircle className="w-4 h-4 mr-2 text-success-500 flex-shrink-0" />
                      <span>Submit the certificate with your claim</span>
                    </li>
                    <li className="flex">
                      <CheckCircle className="w-4 h-4 mr-2 text-success-500 flex-shrink-0" />
                      <span>Your claim will be processed with priority</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex">
                      <XCircle className="w-4 h-4 mr-2 text-error-500 flex-shrink-0" />
                      <span>Contact your insurer for further review</span>
                    </li>
                    <li className="flex">
                      <XCircle className="w-4 h-4 mr-2 text-error-500 flex-shrink-0" />
                      <span>Provide additional documentation</span>
                    </li>
                    <li className="flex">
                      <XCircle className="w-4 h-4 mr-2 text-error-500 flex-shrink-0" />
                      <span>Consider submitting an unedited original image</span>
                    </li>
                  </>
                )}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Status badge component
const StatusBadge: React.FC<{ passed: boolean }> = ({ passed }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
        passed
          ? 'bg-success-100 text-success-800'
          : 'bg-error-100 text-error-800'
      }`}
    >
      {passed ? (
        <>
          <CheckCircle className="w-3 h-3 mr-1" />
          Passed
        </>
      ) : (
        <>
          <XCircle className="w-3 h-3 mr-1" />
          Failed
        </>
      )}
    </span>
  );
};

export default ResultPage;