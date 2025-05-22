import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, FileText, BarChart2, Settings, LogOut, Bell, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import Button from '../components/Button';

interface InsurerLayoutProps {
  children: React.ReactNode;
}

const InsurerLayout: React.FC<InsurerLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      addNotification({
        type: 'success',
        message: 'Logged out successfully'
      });
      navigate('/login');
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to logout'
      });
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/insurer/dashboard', icon: Home },
    { name: 'Claims', href: '/insurer/claims', icon: FileText },
    { name: 'Analytics', href: '/insurer/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/insurer/settings', icon: Settings }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#003366]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-primary-100">
            <Link to="/insurer/dashboard" className="flex items-center">
              <img
                src="/logo.svg"
                alt="Logo"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-primary-800">Insurer Portal</span>
            </Link>
            <button
              className="lg:hidden p-2 rounded-md text-primary-600 hover:bg-primary-100"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-800'
                      : 'text-primary-600 hover:bg-primary-50 hover:text-primary-800'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-primary-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-primary-800">Insurer Admin</p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-primary-600 hover:text-primary-800 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <div className="sticky top-0 z-10 flex h-16 bg-white shadow-sm">
          <button
            className="px-4 text-primary-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 flex justify-between px-4">
            <div className="flex-1 flex items-center">
              {/* Search could be added here */}
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  className="p-2 text-primary-600 hover:bg-primary-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error-500 ring-2 ring-white" />
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-primary-100">
                      <h3 className="text-sm font-medium text-primary-800">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {/* Notification items would go here */}
                      <div className="px-4 py-3 hover:bg-primary-50">
                        <p className="text-sm text-primary-800">New claim submitted</p>
                        <p className="text-xs text-primary-600 mt-1">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 border-t border-primary-100">
                      <button className="text-sm text-primary-600 hover:text-primary-800">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-2 text-primary-600 hover:bg-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onClick={() => navigate('/insurer/settings')}
                >
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-primary-800">Insurer Admin</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default InsurerLayout; 