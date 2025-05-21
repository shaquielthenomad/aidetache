import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image, AlertCircle, Info } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import Card, { CardBody, CardHeader, CardFooter } from '../../components/Card';
import Button from '../../components/Button';

const UploadImagePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [agreeProcessing, setAgreeProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(selectedFile.type)) {
        addNotification({
          type: 'error',
          message: 'Only JPG and PNG image files are supported',
        });
        return;
      }
      
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        addNotification({
          type: 'error',
          message: 'File size exceeds 10MB limit',
        });
        return;
      }
      
      setFile(selectedFile);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  
  // Handle drag and drop events
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(droppedFile.type)) {
        addNotification({
          type: 'error',
          message: 'Only JPG and PNG image files are supported',
        });
        return;
      }
      
      // Validate file size (max 10MB)
      if (droppedFile.size > 10 * 1024 * 1024) {
        addNotification({
          type: 'error',
          message: 'File size exceeds 10MB limit',
        });
        return;
      }
      
      setFile(droppedFile);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };
  
  // Trigger file input click
  const onButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      addNotification({
        type: 'error',
        message: 'Please select an image to upload',
      });
      return;
    }
    
    if (!agreeProcessing) {
      addNotification({
        type: 'error',
        message: 'You must consent to image processing',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to upload the image
      // For demo purposes, we'll simulate a successful upload after a delay
      setTimeout(() => {
        // Save file info in session storage for demo purposes
        sessionStorage.setItem('uploadedImage', preview || '');
        sessionStorage.setItem('uploadedImageName', file.name);
        
        // Navigate to verification page
        navigate('/verification');
      }, 1500);
    } catch (error) {
      console.error('Upload error:', error);
      addNotification({
        type: 'error',
        message: 'Failed to upload image. Please try again.',
      });
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6">
        Upload Image for Analysis
      </h1>
      
      <Card className="shadow-md">
        <CardHeader className="bg-primary-50">
          <h2 className="text-xl font-semibold text-primary-800 flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Image Upload
          </h2>
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
              onClick={onButtonClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/jpg"
                className="hidden"
              />
              
              {preview ? (
                <div className="space-y-4">
                  <div className="relative max-w-sm mx-auto">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-60 mx-auto rounded-md object-contain"
                    />
                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setPreview(null);
                      }}
                      className="absolute top-2 right-2 bg-error-500 text-white rounded-full p-1 shadow-md hover:bg-error-600 transition-colors"
                      aria-label="Remove image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="text-primary-700">
                    <p className="font-medium">{file?.name}</p>
                    <p className="text-sm">
                      {file && (file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  
                  <p className="text-primary-600 text-sm">
                    Click or drag to replace this image
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="mx-auto w-16 h-16 text-primary-400">
                    <Image className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-primary-700">
                      Drop your image here, or <span className="text-primary-500">browse</span>
                    </p>
                    <p className="text-sm text-primary-500 mt-1">
                      JPG or PNG, max 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-primary-50 p-4 rounded-lg flex">
              <div className="text-primary-500 mr-3 flex-shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="text-sm text-primary-700">
                <p className="font-medium">Important Information</p>
                <p>All uploaded images will be analyzed by our AI system to detect potential fraud. The system examines image metadata, identifies manipulation indicators, and assesses authenticity based on our trained models.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="processing-consent"
                  name="processing-consent"
                  type="checkbox"
                  checked={agreeProcessing}
                  onChange={(e) => setAgreeProcessing(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="processing-consent" className="text-primary-700">
                  I consent to the processing of this image by the Detachd AI fraud detection system in accordance with the <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a> and POPIA regulations
                </label>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                type="submit"
                variant="primary"
                disabled={!file || !agreeProcessing || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Uploading...
                  </div>
                ) : (
                  'Upload and Analyze'
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardBody>
        
        <CardFooter className="bg-neutral-50 border-t">
          <div className="flex items-start text-sm text-primary-600">
            <AlertCircle className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0" />
            <p>
              For best results, ensure the image is clear, unmodified, and shows the full extent of the damage or item being claimed.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UploadImagePage;