import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext';

const VerificationPage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  
  const verificationSteps = [
    'Uploading image...',
    'Analyzing metadata...',
    'Running AI detection algorithms...',
    'Checking for image manipulation...',
    'Verifying authenticity...',
    'Generating report...',
  ];
  
  useEffect(() => {
    const uploadedImage = sessionStorage.getItem('uploadedImage');
    
    if (!uploadedImage) {
      addNotification({
        type: 'error',
        message: 'No image found for verification. Please upload an image first.',
      });
      navigate('/upload');
      return;
    }
    
    // Simulate verification process
    let currentProgress = 0;
    const totalDuration = 5000; // 5 seconds total
    const stepDuration = totalDuration / verificationSteps.length;
    const increment = 100 / (totalDuration / 50); // Update every 50ms
    
    const progressInterval = setInterval(() => {
      currentProgress += increment;
      setProgress(Math.min(Math.round(currentProgress), 100));
      
      // Update current step based on progress
      const newStep = Math.min(
        Math.floor((currentProgress / 100) * verificationSteps.length),
        verificationSteps.length - 1
      );
      setCurrentStep(newStep);
      
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        
        // Generate a random result ID and store it
        const resultId = Math.floor(Math.random() * 1000000).toString();
        sessionStorage.setItem('resultId', resultId);
        
        // Generate a random confidence score between 85-99 for demo
        const confidenceScore = Math.floor(Math.random() * 15) + 85;
        sessionStorage.setItem('confidenceScore', confidenceScore.toString());
        
        // Random verification result with more passing than failing
        const passed = Math.random() > 0.3; // 70% chance of passing
        sessionStorage.setItem('verificationPassed', passed.toString());
        
        // Navigate to results page after a small delay
        setTimeout(() => {
          navigate(`/result/${resultId}`);
        }, 500);
      }
    }, 50);
    
    return () => clearInterval(progressInterval);
  }, [navigate, addNotification, verificationSteps.length]);
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
            <div
              className="absolute inset-0 border-4 border-secondary-500 rounded-full"
              style={{
                clipPath: `polygon(0% 0%, ${progress}% 0%, ${progress}% 100%, 0% 100%)`,
                transition: 'clip-path 0.2s ease-in-out',
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-primary-800">
              {progress}%
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-primary-800 mb-2">
            Analyzing Your Image
          </h1>
          <p className="text-primary-600 mb-6">
            Please wait while our AI analyzes your image for authenticity
          </p>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-primary-50 p-4 border-b border-primary-100">
              <h2 className="font-medium text-primary-800">Verification Progress</h2>
            </div>
            
            <div className="p-4">
              <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-6">
                <div
                  className="bg-secondary-500 h-2.5 rounded-full"
                  style={{ width: `${progress}%`, transition: 'width 0.2s ease-in-out' }}
                ></div>
              </div>
              
              <ul className="space-y-3">
                {verificationSteps.map((step, index) => (
                  <li
                    key={index}
                    className={`flex items-center ${
                      index <= currentStep ? 'text-primary-800' : 'text-neutral-400'
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-5 h-5 mr-3 rounded-full flex items-center justify-center ${
                        index < currentStep
                          ? 'bg-secondary-500 text-white'
                          : index === currentStep
                          ? 'bg-primary-500 text-white animate-pulse'
                          : 'border border-neutral-300'
                      }`}
                    >
                      {index < currentStep ? (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : null}
                    </span>
                    <span className={index === currentStep ? 'font-medium' : ''}>
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-primary-500">
          This process typically takes a few seconds. Please don't close this page.
        </p>
      </div>
    </div>
  );
};

export default VerificationPage;