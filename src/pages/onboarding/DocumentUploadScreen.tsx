import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { useNotification } from '../../contexts/NotificationContext';
import { Upload, FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import Card, { CardBody, CardHeader, CardFooter } from '../../components/Card';
import Button from '../../components/Button';
import { useDropzone } from 'react-dropzone';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

const DocumentUploadScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { uploadDocuments, generateCertificate } = useStore();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [consent, setConsent] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading' as const,
      progress: 0
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true
  });

  const handleUpload = async () => {
    if (!consent) {
      addNotification({
        type: 'error',
        message: 'Please accept the terms and conditions to proceed',
      });
      return;
    }

    if (files.length === 0) {
      addNotification({
        type: 'error',
        message: 'Please upload at least one document',
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload documents
      const uploadedDocs = await uploadDocuments(files.map(f => ({
        name: f.name,
        type: f.type,
        size: f.size
      })));

      // Generate certificate
      const certificate = await generateCertificate({
        documents: uploadedDocs,
        type: 'claim_verification'
      });

      addNotification({
        type: 'success',
        message: 'Documents uploaded and certificate generated successfully',
      });

      // Navigate to certificate page
      navigate(`/certificates/${certificate.id}`);
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to upload documents and generate certificate',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type === 'application/pdf') return '📄';
    if (type.includes('word')) return '📝';
    return '📎';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-[#003366] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-primary-50">
            <h1 className="text-2xl font-bold text-primary-800">
              Upload Supporting Documents
            </h1>
          </CardHeader>
          <CardBody className="text-primary-800">
            <p className="text-primary-600 mb-6">
              Please upload any relevant documents to support your claim verification.
              This may include photos of the damage, police reports, or other supporting evidence.
            </p>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-primary-200 hover:border-primary-400'
                }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-primary-400" />
              <p className="mt-2 text-sm text-primary-600">
                {isDragActive
                  ? 'Drop the files here...'
                  : 'Drag and drop files here, or click to select files'
                }
              </p>
              <p className="mt-1 text-xs text-primary-500">
                Supported formats: JPG, PNG, PDF, DOC, DOCX (max 10MB each)
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-primary-800">
                  Uploaded Files
                </h3>
                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-primary-100"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{getFileIcon(file.type)}</span>
                        <div>
                          <p className="text-sm font-medium text-primary-800">
                            {file.name}
                          </p>
                          <p className="text-xs text-primary-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {file.status === 'uploading' && (
                          <div className="w-24 h-2 bg-primary-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-500 transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        )}
                        {file.status === 'success' && (
                          <CheckCircle className="w-5 h-5 text-success-500" />
                        )}
                        {file.status === 'error' && (
                          <div className="flex items-center text-error-500">
                            <XCircle className="w-5 h-5 mr-1" />
                            <span className="text-xs">{file.error}</span>
                          </div>
                        )}
                        <Button
                          variant="text"
                          className="text-error-600 hover:text-error-700"
                          onClick={() => removeFile(file.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 text-primary-600 rounded border-primary-300"
                />
                <span className="text-sm text-primary-600">
                  I consent to the processing of my personal information for the purpose of
                  claim verification. I understand that my documents will be securely stored
                  and only used for verification purposes.
                </span>
              </label>
            </div>
          </CardBody>
          <CardFooter className="bg-primary-50 border-t border-primary-100">
            <div className="flex justify-between w-full">
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
                disabled={isUploading}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={isUploading || !consent || files.length === 0}
                loading={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload and Generate Certificate'}
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="mt-8 shadow-lg">
          <CardHeader className="bg-primary-50">
            <h2 className="text-xl font-semibold text-primary-800">
              About Document Upload
            </h2>
          </CardHeader>
          <CardBody className="text-primary-800">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-warning-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-primary-800">Document Requirements</h3>
                  <p className="text-sm text-primary-600 mt-1">
                    Please ensure your documents are clear and legible. Photos should be
                    well-lit and show the damage clearly. All documents should be recent
                    and relevant to your claim.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-success-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-primary-800">Security & Privacy</h3>
                  <p className="text-sm text-primary-600 mt-1">
                    Your documents are encrypted and stored securely. We only use them for
                    verification purposes and never share them with unauthorized parties.
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DocumentUploadScreen;