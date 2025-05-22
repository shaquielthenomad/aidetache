import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Email, Phone } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#131416] text-white">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#2c2e35] px-10 py-4 shadow-sm">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="size-6 text-[#c7d0e9]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Detachd</h2>
          </Link>
          <nav className="flex items-center gap-8">
            <Link to="/features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Product</Link>
            <Link to="/solutions" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Solutions</Link>
            <Link to="/resources" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Resources</Link>
            <Link to="/pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/register" className="flex items-center justify-center rounded-lg h-10 px-5 bg-[#c7d0e9] text-[#131416] text-sm font-semibold tracking-wide hover:bg-opacity-90 transition-colors">
              <span>Get started</span>
            </Link>
            <Link to="/login" className="flex items-center justify-center rounded-lg h-10 px-5 bg-[#2c2e35] text-white text-sm font-semibold tracking-wide hover:bg-[#383a42] transition-colors">
              <span>Log in</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Contact Us</h1>
              <p className="mt-4 text-lg text-[#a3a7b2]">We're here to help. Reach out to us with any questions or feedback.</p>
            </div>

            <div className="bg-[#1e1f22] p-8 sm:p-10 rounded-xl shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    className="form-input w-full rounded-lg border-0 bg-[#2c2e35] text-white placeholder:text-[#707582] focus:ring-2 focus:ring-[#c7d0e9] py-3 px-4 text-base transition-shadow"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="form-input w-full rounded-lg border-0 bg-[#2c2e35] text-white placeholder:text-[#707582] focus:ring-2 focus:ring-[#c7d0e9] py-3 px-4 text-base transition-shadow"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    className="form-input w-full rounded-lg border-0 bg-[#2c2e35] text-white placeholder:text-[#707582] focus:ring-2 focus:ring-[#c7d0e9] py-3 px-4 text-base transition-shadow"
                    id="subject"
                    name="subject"
                    placeholder="Enter the subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="form-input w-full rounded-lg border-0 bg-[#2c2e35] text-white placeholder:text-[#707582] focus:ring-2 focus:ring-[#c7d0e9] py-3 px-4 text-base resize-y transition-shadow"
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <button
                    className="w-full flex items-center justify-center rounded-lg py-3 px-5 bg-[#c7d0e9] text-[#131416] text-base font-semibold tracking-wide hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#c7d0e9] focus:ring-offset-2 focus:ring-offset-[#1e1f22]"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-12 text-center">
              <p className="text-base text-[#a3a7b2]">
                Alternatively, you can reach us directly:
              </p>
              <div className="mt-4 flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 sm:gap-8">
                <a
                  className="flex items-center justify-center gap-2 text-lg text-[#c7d0e9] hover:text-white transition-colors"
                  href="mailto:support@detachd.com"
                >
                  <Email className="w-5 h-5" />
                  support@detachd.com
                </a>
                <a
                  className="flex items-center justify-center gap-2 text-lg text-[#c7d0e9] hover:text-white transition-colors"
                  href="tel:+15551234567"
                >
                  <Phone className="w-5 h-5" />
                  (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </main>

        <footer className="py-8 px-10 border-t border-solid border-t-[#2c2e35]">
          <p className="text-center text-sm text-[#a3a7b2]">
            © {new Date().getFullYear()} Detachd. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ContactPage; 