import React from 'react';
import { Link } from 'react-router-dom';
import { VerifiedUser, HistoryToggleOff, LockPerson, Insights, IntegrationInstructions, SupportAgent } from 'lucide-react';

const FeaturesPage: React.FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#0B0C0F] text-white">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#0B0C0F]/80 backdrop-blur-md">
          <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-6 py-4">
            <Link to="/" className="flex items-center gap-3 text-white">
              <svg className="size-7 text-[#c7d0e9]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd" />
              </svg>
              <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">Detachd</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/features" className="text-sm font-medium leading-normal hover:text-[#c7d0e9] transition-colors">Product</Link>
              <Link to="/solutions" className="text-sm font-medium leading-normal hover:text-[#c7d0e9] transition-colors">Solutions</Link>
              <Link to="/pricing" className="text-sm font-medium leading-normal hover:text-[#c7d0e9] transition-colors">Pricing</Link>
              <Link to="/resources" className="text-sm font-medium leading-normal hover:text-[#c7d0e9] transition-colors">Resources</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/register" className="flex min-w-[90px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#c7d0e9] text-[#0B0C0F] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors">
                <span className="truncate">Get Started</span>
              </Link>
              <Link to="/login" className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1e2024] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#2c2e35] transition-colors">
                <span className="truncate">Login</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-20 md:py-32 bg-cover bg-center" style={{
            backgroundImage: 'linear-gradient(rgba(11, 12, 15, 0.85) 0%, rgba(11, 12, 15, 0.95) 70%, #0B0C0F 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAo_0I_UlGMBDzRmuU12yiQ-RguZ1D6fZRYDwLyadTF9d1nfPAFD7f4T0NQAkF6wm4IZrK6CBM3STLvm88oFkp60H0rYU86cfK7dRRXA4NUu4SgCNP3wlbKb5YoE_JfZfA3_r0IfdyRJNrsM96cNWDaXGuLGRLB4GRDJG0oxXX4M7KGUNfSUDAxO9yUOc3SbPyV9T_TGftCw7Irsia_sfT2D0HtDkeWMB5fPrwRcXbPllYB89YWxddFPuUv4Mga7pbbsfzKU21uQGc")'
          }}>
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter mb-6">
                Empowering Trust in Insurance
              </h1>
              <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-10">
                Detachd is an AI-powered platform designed to prevent insurance fraud, ensuring transparency and security for both policyholders and insurers.
              </p>
              <Link to="/demo" className="flex mx-auto min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#c7d0e9] text-[#0B0C0F] text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors">
                <span className="truncate">Request a Demo</span>
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24 bg-[#0B0C0F]">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">Key Features</h2>
                <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                  Explore the core capabilities of Detachd that enhance fraud prevention and streamline insurance processes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature Cards */}
                <FeatureCard
                  icon={<VerifiedUser className="text-[#c7d0e9] text-2xl" />}
                  title="Real-Time Image Verification"
                  description="Verify the authenticity of images submitted with claims in real-time using advanced AI algorithms, preventing doctored evidence."
                />
                <FeatureCard
                  icon={<HistoryToggleOff className="text-[#c7d0e9] text-2xl" />}
                  title="Blockchain-Based Audit Trails"
                  description="Maintain a secure, transparent, and immutable record of all claim interactions and data points using cutting-edge blockchain technology."
                />
                <FeatureCard
                  icon={<LockPerson className="text-[#c7d0e9] text-2xl" />}
                  title="POPIA Compliance"
                  description="Ensure full compliance with the Protection of Personal Information Act, safeguarding user data integrity and privacy at every step."
                />
                <FeatureCard
                  icon={<Insights className="text-[#c7d0e9] text-2xl" />}
                  title="AI-Powered Fraud Scoring"
                  description="Leverage sophisticated AI models to analyze claim data and provide real-time fraud risk scores, enabling proactive intervention."
                />
                <FeatureCard
                  icon={<IntegrationInstructions className="text-[#c7d0e9] text-2xl" />}
                  title="Seamless Platform Integration"
                  description="Easily integrate Detachd with your existing systems and workflows through robust APIs for a smooth transition and enhanced efficiency."
                />
                <FeatureCard
                  icon={<SupportAgent className="text-[#c7d0e9] text-2xl" />}
                  title="Dedicated User Support"
                  description="Access comprehensive support and resources to help both policyholders and insurers maximize the benefits of the Detachd platform."
                />
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#131416] border-t border-[#2c2e35]">
          <div className="container mx-auto px-6 py-10 text-center">
            <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
              <Link to="/privacy" className="text-[#a3a7b2] text-sm font-normal leading-normal hover:text-[#c7d0e9] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[#a3a7b2] text-sm font-normal leading-normal hover:text-[#c7d0e9] transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-[#a3a7b2] text-sm font-normal leading-normal hover:text-[#c7d0e9] transition-colors">
                Contact Us
              </Link>
            </div>
            <p className="text-[#7d828f] text-sm font-normal leading-normal">
              © {new Date().getFullYear()} Detachd. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col gap-6 rounded-xl border border-[#2c2e35] bg-[#131416] p-6 hover:shadow-2xl hover:border-[#c7d0e9]/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
    <div className="p-3 bg-[#c7d0e9]/10 rounded-full w-12 h-12 flex items-center justify-center self-start">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold leading-tight mb-2">{title}</h3>
      <p className="text-[#a3a7b2] text-sm font-normal leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default FeaturesPage; 