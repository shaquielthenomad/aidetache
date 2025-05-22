import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../../components/Card';
import Button from '../../components/Button';

const faqs = [
  {
    question: 'How do I submit a claim?',
    answer: 'To submit a claim, go to the Upload New Claim section from your dashboard. Upload your image and follow the verification process. Our AI will analyze the image and provide a verification result.'
  },
  {
    question: 'What types of images are accepted?',
    answer: 'We accept JPG, PNG, and HEIC image formats. The image should be clear, well-lit, and show the damage or incident clearly. Maximum file size is 10MB.'
  },
  {
    question: 'How long does verification take?',
    answer: 'Most verifications are completed within 2-3 minutes. Complex cases may take longer, but you\'ll be notified of the status throughout the process.'
  },
  {
    question: 'What if my verification fails?',
    answer: 'If verification fails, you can submit additional documentation or contact your insurance advisor for assistance. You can also appeal the decision through the claims dashboard.'
  },
  {
    question: 'How do I download my verification certificate?',
    answer: 'Once your claim is verified, you can download the certificate from the Certificates section. The certificate will be available in PDF format and can be shared with your insurer.'
  }
];

const HelpPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">
          Help & Support
        </h1>
        <p className="text-primary-600">
          Get assistance with your claims and verification process
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md">
          <CardBody className="text-center p-6">
            <Mail className="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 className="font-medium text-primary-800 mb-2">Email Support</h3>
            <p className="text-sm text-primary-600 mb-4">
              Get in touch with our support team
            </p>
            <Button
              variant="outline"
              onClick={() => window.location.href = 'mailto:support@aidetache.com'}
            >
              support@aidetache.com
            </Button>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardBody className="text-center p-6">
            <Phone className="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 className="font-medium text-primary-800 mb-2">Phone Support</h3>
            <p className="text-sm text-primary-600 mb-4">
              Speak with a support agent
            </p>
            <Button
              variant="outline"
              onClick={() => window.location.href = 'tel:+27123456789'}
            >
              +27 12 345 6789
            </Button>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardBody className="text-center p-6">
            <MessageCircle className="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 className="font-medium text-primary-800 mb-2">Live Chat</h3>
            <p className="text-sm text-primary-600 mb-4">
              Chat with our support team
            </p>
            <Button
              variant="primary"
              onClick={() => {
                // Implement live chat functionality
                alert('Live chat coming soon!');
              }}
            >
              Start Chat
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="shadow-md mb-8">
        <CardHeader className="bg-primary-50">
          <h2 className="text-xl font-semibold text-primary-800">
            Frequently Asked Questions
          </h2>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-primary-100">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-4 hover:bg-primary-50 transition-colors cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-primary-800">
                    {faq.question}
                  </h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-primary-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary-600" />
                  )}
                </div>
                {expandedFaq === index && (
                  <p className="mt-2 text-primary-600 text-sm">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Insurance Advisor Section */}
      <Card className="shadow-md">
        <CardHeader className="bg-primary-50">
          <h2 className="text-xl font-semibold text-primary-800">
            Contact Your Insurance Advisor
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-primary-600 mb-4">
            Need help with your claim or have questions about your policy? Contact your insurance advisor directly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-medium text-primary-800 mb-2">Your Advisor</h3>
              <p className="text-sm text-primary-600">John Smith</p>
              <p className="text-sm text-primary-600">Senior Claims Advisor</p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => window.location.href = 'mailto:john.smith@insurer.com'}
              >
                Contact Advisor
              </Button>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-medium text-primary-800 mb-2">Office Hours</h3>
              <p className="text-sm text-primary-600">Monday - Friday</p>
              <p className="text-sm text-primary-600">08:00 - 17:00 (SAST)</p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => window.location.href = 'tel:+27123456789'}
              >
                Call Office
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default HelpPage; 