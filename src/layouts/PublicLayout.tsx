import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Notifications from '../components/Notifications';

export const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary-50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Notifications />
    </div>
  );
};