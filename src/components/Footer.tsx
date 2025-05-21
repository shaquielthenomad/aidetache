import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-800 text-white pb-4">
      {/* Protea Pattern */}
      <div className="h-6 bg-[url('/assets/protea-pattern.svg')] bg-repeat-x"></div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Logo />
              <span className="ml-2 font-bold text-xl">Detachd</span>
            </div>
            <p className="text-neutral-300 text-sm mb-4">
              AI-powered insurance fraud detection system helping protect South Africa's insurance industry.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                aria-label="Facebook"
                className="text-neutral-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                className="text-neutral-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.017 10.017 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482 13.98 13.98 0 01-10.15-5.147 4.919 4.919 0 001.523 6.574 4.88 4.88 0 01-2.23-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.9 13.9 0 007.548 2.209c9.054 0 14.004-7.5 14.004-14.001 0-.21 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>
              <a 
                href="#" 
                aria-label="LinkedIn"
                className="text-neutral-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.11-13.019c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-neutral-300 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-neutral-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-neutral-300 hover:text-white transition-colors">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </span>
                <span className="text-neutral-300">
                  123 Insurance Avenue<br />
                  Sandton, Johannesburg
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </span>
                <span className="text-neutral-300">+27 123 456 7890</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary-500 mr-2 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </span>
                <span className="text-neutral-300">info@detachd.co.za</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-primary-700 mt-8 pt-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-neutral-400 text-sm">
            &copy; {currentYear} Detachd. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <span className="text-neutral-400 text-sm">
              POPIA, ECTA, and FSCA Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;