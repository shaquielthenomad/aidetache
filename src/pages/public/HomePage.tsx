import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, TrendingUp } from 'lucide-react';
import Button from '../../components/Button';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen bg-primary-500 text-white flex items-center">
        <div 
          className="absolute inset-0 bg-[url('/assets/protea-pattern.svg')] opacity-10"
          aria-hidden="true"
        ></div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Stop Insurance Fraud with AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-neutral-200">
              Protect your business with our advanced AI-powered fraud detection system, built specifically for South Africa's insurance industry.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register">
                <Button variant="secondary" size="lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <svg 
            className="w-8 h-8 mx-auto animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-primary-600 max-w-3xl mx-auto">
              Our AI-powered system makes detecting fraudulent claims simple, fast, and accurate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg transition-all duration-300 hover:shadow-card-hover">
              <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">
                Upload Your Image
              </h3>
              <p className="text-primary-600">
                Simply upload the insurance claim image through our secure platform.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg transition-all duration-300 hover:shadow-card-hover">
              <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">
                AI Analysis
              </h3>
              <p className="text-primary-600">
                Our advanced AI system analyzes the image for signs of manipulation or fraud.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg transition-all duration-300 hover:shadow-card-hover">
              <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">
                Get Results Instantly
              </h3>
              <p className="text-primary-600">
                Receive a detailed report with verification certificate in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
                Why Choose Detachd?
              </h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 text-secondary-500">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-800 mb-2">
                      Industry-Leading Security
                    </h3>
                    <p className="text-primary-600">
                      POPIA compliant with enterprise-grade encryption and secure data handling.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 text-secondary-500">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-800 mb-2">
                      99.8% Accuracy Rate
                    </h3>
                    <p className="text-primary-600">
                      Our AI has been trained on millions of insurance documents for unparalleled precision.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 text-secondary-500">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-800 mb-2">
                      Reduce Claims Processing Time
                    </h3>
                    <p className="text-primary-600">
                      Process legitimate claims faster and identify suspicious ones immediately.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/register">
                  <Button variant="secondary" size="lg">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-card">
              <img 
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Insurance professional working with digital fraud detection" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
              Trusted by South Africa's Top Insurers
            </h2>
            <p className="text-lg text-primary-600 max-w-3xl mx-auto">
              See what our clients have to say about our fraud detection solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-50 p-6 rounded-lg shadow-card">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className="w-5 h-5 text-secondary-500" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-primary-700 mb-4">
                "Detachd has revolutionized our claims processing. We've reduced fraudulent claims by 67% while speeding up our legitimate claims approval."
              </p>
              <div className="flex items-center">
                <div className="bg-primary-200 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-primary-700 font-semibold">SM</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-800">Sarah Molefe</h4>
                  <p className="text-sm text-primary-600">Claims Director, Liberty Insurance</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg shadow-card">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className="w-5 h-5 text-secondary-500" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-primary-700 mb-4">
                "The analytics dashboard gives us incredible insights into fraud patterns. This tool has paid for itself many times over in the first year alone."
              </p>
              <div className="flex items-center">
                <div className="bg-primary-200 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-primary-700 font-semibold">JN</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-800">James Nkosi</h4>
                  <p className="text-sm text-primary-600">COO, Metropolitan Life</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg shadow-card">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className="w-5 h-5 text-secondary-500" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-primary-700 mb-4">
                "The POPIA compliance features are excellent. We can confidently process claims knowing all data handling meets the highest regulatory standards."
              </p>
              <div className="flex items-center">
                <div className="bg-primary-200 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-primary-700 font-semibold">LP</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-800">Lerato Patel</h4>
                  <p className="text-sm text-primary-600">Legal Advisor, Outsurance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary-500 text-white">
        <div 
          className="absolute inset-0 bg-[url('/assets/protea-pattern.svg')] opacity-10"
          aria-hidden="true"
        ></div>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Fraud Detection?
          </h2>
          <p className="text-xl text-neutral-200 mb-8 max-w-3xl mx-auto">
            Join hundreds of South African insurers already using Detachd to reduce fraud and streamline claims processing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

// Include missing components
function Upload(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function Zap(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}