import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building2, HelpCircle } from 'lucide-react';
import Card, { CardBody, CardHeader, CardFooter } from '../../components/Card';
import Button from '../../components/Button';
import { useNotification } from '../../contexts/NotificationContext';

const insurerCodeSchema = z.object({
  insurerCode: z.string()
    .min(6, 'Insurer code must be at least 6 characters')
    .max(12, 'Insurer code cannot exceed 12 characters')
    .regex(/^[A-Z0-9]+$/, 'Code must contain only uppercase letters and numbers'),
});

type InsurerCodeForm = z.infer<typeof insurerCodeSchema>;

const InsurerCodeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InsurerCodeForm>({
    resolver: zodResolver(insurerCodeSchema),
  });

  const onSubmit = async (data: InsurerCodeForm) => {
    try {
      // In a real app, this would validate the code with an API
      console.log('Validating insurer code:', data.insurerCode);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store the code in session storage for demo
      sessionStorage.setItem('insurerCode', data.insurerCode);
      
      addNotification({
        type: 'success',
        message: 'Insurer code validated successfully!',
      });
      
      navigate('/onboarding/accident-code');
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to validate insurer code. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-500 p-4">
      <div 
        className="absolute inset-0 bg-[url('/assets/protea-pattern.svg')] opacity-10"
        aria-hidden="true"
      ></div>
      
      <div className="w-full max-w-md animate-fade-in">
        <Card className="shadow-lg">
          <CardHeader className="bg-primary-50">
            <h1 className="text-xl font-semibold text-primary-800 flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              Enter Your Insurer Code
            </h1>
          </CardHeader>
          
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label 
                  htmlFor="insurerCode" 
                  className="block text-sm font-medium text-primary-700 mb-1"
                >
                  Insurer Code
                </label>
                <div className="relative">
                  <input
                    id="insurerCode"
                    type="text"
                    {...register('insurerCode')}
                    className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 ${
                      errors.insurerCode
                        ? 'border-error-300 focus:border-error-500 focus:ring-error-500'
                        : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                    placeholder="e.g., SANLAM123"
                  />
                  <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                    <HelpCircle 
                      className="w-5 h-5 text-neutral-400 cursor-help"
                      title="Enter the code provided by your insurer"
                    />
                  </div>
                </div>
                {errors.insurerCode && (
                  <p className="mt-1 text-sm text-error-600">
                    {errors.insurerCode.message}
                  </p>
                )}
                <p className="mt-2 text-sm text-primary-600">
                  You can find this code in your insurance documentation or contact your insurer
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Validating...
                    </div>
                  ) : (
                    'Continue'
                  )}
                </Button>
                
                <Link to="/onboarding/accident-code" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                  >
                    Skip for Now
                  </Button>
                </Link>
              </div>
            </form>
          </CardBody>
          
          <CardFooter className="bg-primary-50 text-center">
            <p className="text-sm text-primary-700">
              Need help finding your code?{' '}
              <Link to="/help" className="text-primary-600 hover:text-primary-500 font-medium">
                Contact Support
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default InsurerCodeScreen;