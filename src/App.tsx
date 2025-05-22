import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout components
import { PublicLayout } from './layouts/PublicLayout';
import { ProtectedLayout } from './layouts/ProtectedLayout';
import PrivateRoute from './components/PrivateRoute';
import InsurerLayout from './layouts/InsurerLayout';

// Public pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/auth/LoginPage';
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

// Insurer pages
import DashboardPage from './pages/insurer/DashboardPage';
import ClaimQueuePage from './pages/insurer/ClaimQueuePage';
import AnalyticsPage from './pages/insurer/AnalyticsPage';
import SettingsPage from './pages/insurer/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import ClaimReviewPage from './pages/insurer/ClaimReviewPage';

// Auth context
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// New authentication pages
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import TwoFactorSetupPage from './pages/auth/TwoFactorSetupPage';
import AccountVerificationPage from './pages/auth/AccountVerificationPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import DeleteAccountPage from './pages/auth/DeleteAccountPage';

// Import the new NotificationsPage
import NotificationsPage from './pages/notifications/NotificationsPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
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
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>

            {/* Protected Insurer Routes */}
            <Route
              path="/insurer"
              element={
                <PrivateRoute
                  allowedRoles={['insurer']}
                  element={
                    <InsurerLayout>
                      <Routes>
                        <Route index element={<Navigate to="/insurer/dashboard" replace />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="claims" element={<ClaimQueuePage />} />
                        <Route path="claims/:id" element={<ClaimReviewPage />} />
                        <Route path="analytics" element={<AnalyticsPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="notifications" element={<NotificationsPage />} />
                      </Routes>
                    </InsurerLayout>
                  }
                />
              }
            />

            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />

            {/* New authentication routes */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/2fa-setup" element={<TwoFactorSetupPage />} />
            <Route path="/verify-account" element={<AccountVerificationPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/delete-account" element={<DeleteAccountPage />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;