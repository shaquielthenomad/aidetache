import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout components
import { PublicLayout } from './layouts/PublicLayout';
import { ProtectedLayout } from './layouts/ProtectedLayout';

// Public pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import FeaturesPage from './pages/public/FeaturesPage';
import FaqPage from './pages/public/FaqPage';
import TermsPage from './pages/public/TermsPage';
import PrivacyPage from './pages/public/PrivacyPage';

// Onboarding pages
import WelcomeScreen from './pages/onboarding/WelcomeScreen';
import InsurerCodeScreen from './pages/onboarding/InsurerCodeScreen';
import AccidentCodeScreen from './pages/onboarding/AccidentCodeScreen';
import DocumentUploadScreen from './pages/onboarding/DocumentUploadScreen';

// Policyholder pages
import PolicyholderDashboard from './pages/policyholder/Dashboard';
import UploadImagePage from './pages/policyholder/UploadImagePage';
import VerificationPage from './pages/policyholder/VerificationPage';
import ResultPage from './pages/policyholder/ResultPage';
import ClaimDetailsPage from './pages/policyholder/ClaimDetailsPage';
import CertificateDownloadPage from './pages/policyholder/CertificateDownloadPage';

// Auth context
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Route>

            {/* Onboarding routes */}
            <Route path="/onboarding">
              <Route path="welcome" element={<WelcomeScreen />} />
              <Route path="insurer-code" element={<InsurerCodeScreen />} />
              <Route path="accident-code" element={<AccidentCodeScreen />} />
              <Route path="document-upload" element={<DocumentUploadScreen />} />
            </Route>

            {/* Protected routes - Policyholder */}
            <Route element={<ProtectedLayout role="policyholder" />}>
              <Route path="/dashboard" element={<PolicyholderDashboard />} />
              <Route path="/upload" element={<UploadImagePage />} />
              <Route path="/verification" element={<VerificationPage />} />
              <Route path="/result/:id" element={<ResultPage />} />
              <Route path="/claim/:id" element={<ClaimDetailsPage />} />
              <Route path="/certificates" element={<CertificateDownloadPage />} />
            </Route>
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;