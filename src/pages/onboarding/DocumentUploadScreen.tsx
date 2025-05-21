import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, AlertCircle, FileText, X } from 'lucide-react';
import Card, { CardBody, CardHeader, CardFooter } from '../../components/Card';
import Button from '../../components/Button';
import { useNotification } from '../../contexts/NotificationContext';

const DocumentUploadScreen: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [agreeProcessing, setAgreeProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      validateAndAddFiles(selectedFiles);
    }
  };

  const validateAndAddFiles = (selectedFiles: File[]) => {
    const validFiles = selectedFiles.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isValidType) {
        addNotification({
          type: 'error',
          message: `${file.name} is not a supported file type. Please use JPG, PNG, or PDF.`,
        });
      }
      
      if (!isValidSize) {
        addNotification({
          type: 'error',
          message: `${file.name} exceeds the 10MB size limit.`,
        });
      }
      
      return isValidType && isValidSize;
    });

    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      validateAndAddFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      addNotification({
        type: 'error',
        message: 'Please upload at least one document',
      });
      return;
    }
    
    if (!agreeProcessing) {
      addNotification({
        type: 'error',
        message: 'Please agree to document processing',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addNotification({
        type: 'success',
        message: 'Documents uploaded successfully!',
      });
      
      navigate('/onboarding/insurer-selection');
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to upload documents. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-500 p-4">
      <div 
        className="absolute inset-0 bg-[url('/assets/protea-pattern.svg')] opacity-10"
        aria-hidden="true"
      ></div>
      
      <div className="w-full max-w-2xl animate-fade-in">
        <Card className="shadow-lg">
          <CardHeader className="bg-primary-50">
            <h1 className="text-xl font-semibold text-primary-800 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Upload Accident Documents
            </h1>
          </CardHeader>
          
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  dragActive 
                    ? 'border-secondary-500 bg-secondary-50' 
                    : 'border-neutral-300 hover:border-primary-400 hover:bg-primary-50'
                } transition-colors cursor-pointer`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,application/pdf"
                  multiple
                  className="hidden"
                />
                
                <div className="space-y-3">
                  <div className="mx-auto w-16 h-16 text-primary-400">
                    <FileText className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-primary-700">
                      Drop your documents here, or <span className="text-primary-500">browse</span>
                    </p>
                    <p className="text-sm text-primary-500 mt-1">
                      JPG, PNG, or PDF (max 10MB per file)
                    </p>
                  </div>
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  <h2 className="font-medium text-primary-800">Uploaded Documents</h2>
                  <div className="bg-primary-50 rounded-lg divide-y divide-primary-100">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-primary-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-primary-700">{file.name}</p>
                            <p className="text-xs text-primary-500">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-neutral-400 hover:text-error-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="processing-consent"
                    type="checkbox"
                    checked={agreeProcessing}
                    onChange={(e) => setAgreeProcessing(e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="processing-consent" className="text-primary-700">
                    I consent to the processing of these documents by the Detachd AI system in accordance with POPIA regulations
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Uploading...
                    </div>
                  ) : (
                    'Continue'
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/onboarding/insurer-selection')}
                  className="flex-1"
                >
                  Skip for Now
                </Button>
              </div>
            </form>
          </CardBody>
          
          <CardFooter className="bg-primary-50">
            <div className="flex items-start text-sm text-primary-600">
              <AlertCircle className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0" />
              <p>
                For best results, ensure documents are clear and all text is legible. Supported formats include police reports, accident reports, and related documentation.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DocumentUploadScreen;