import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Notifications from '../components/Notifications';
import Sidebar from '../components/Sidebar';

type ProtectedLayoutProps = {
  role: 'policyholder' | 'insurer' | 'admin';
};

export const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ role }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If finished loading and not authenticated, redirect to login
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
    
    // If user doesn't have the required role, redirect to appropriate dashboard
    if (!loading && isAuthenticated && user?.role !== role) {
      const redirectPath = user?.role === 'insurer' ? '/insurer/dashboard' : '/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, role, user?.role]);
  
  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary-50">
        <div className="animate-pulse text-primary-500 text-center">
          <div className="w-16 h-16 mx-auto border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, don't render anything while redirecting
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-primary-50">
      <Header />
      <div className="flex flex-grow">
        <Sidebar role={role} />
        <main className="flex-grow p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
      <Notifications />
    </div>
  );
};