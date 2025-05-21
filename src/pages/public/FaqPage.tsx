import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "What is Detachd?",
      answer: "Detachd is an AI-powered platform that helps verify insurance claims through advanced document analysis and verification technology. We work with multiple insurers to streamline the claims process and prevent fraud."
    },
    {
      question: "How does the verification process work?",
      answer: "Our AI system analyzes uploaded documents for authenticity and cross-references them with existing databases. The verification process typically takes just a few minutes, and you'll receive instant results with a detailed report."
    },
    {
      question: "What types of documents can I upload?",
      answer: "You can upload various documents related to insurance claims, including police reports, accident reports, photos, and other supporting documentation. We accept JPEG, PNG, and PDF formats with a maximum file size of 10MB per document."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security very seriously. All documents are encrypted end-to-end, and we comply with POPIA regulations. Your information is only accessible to authorized personnel and is never shared without your consent."
    },
    {
      question: "Which insurance companies do you work with?",
      answer: "We partner with major South African insurers including Sanlam, Discovery, and Naked Insurance. The list of our partner insurers is continuously growing to provide broader coverage."
    },
    {
      question: "What happens after verification?",
      answer: "After successful verification, you'll receive a detailed report and a verification certificate. These can be shared with your insurer to expedite the claims process. If any issues are found, you'll be notified immediately with next steps."
    },
    {
      question: "How much does it cost?",
      answer: "The service is typically covered by your insurance provider. There are no direct costs to policyholders for using the Detachd platform for claim verification."
    },
    {
      question: "What if I need help?",
      answer: "Our support team is available Monday to Friday, 8:00 AM to 5:00 PM SAST. You can reach us through the contact form, email at support@detachd.com, or phone at +27 (0) 11 234 5678."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#003366] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-white text-[#003366] hover:bg-gray-50"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div
                className={`px-6 overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'max-h-96 py-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl mb-4">Still have questions?</p>
          <button
            className="bg-[#009933] text-white px-8 py-3 rounded-lg font-semibold
                     hover:bg-[#009933]/90 transition-colors duration-200"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaqPage; 