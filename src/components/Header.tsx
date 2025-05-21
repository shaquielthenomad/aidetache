import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle scroll events for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isAuthenticated ? 'bg-primary-500 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="ml-2 text-white font-bold text-xl">Detachd</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link to="/features" className="text-white hover:text-neutral-200 transition-colors">
                  Features
                </Link>
                <Link to="/about" className="text-white hover:text-neutral-200 transition-colors">
                  About
                </Link>
                <Link to="/contact" className="text-white hover:text-neutral-200 transition-colors">
                  Contact
                </Link>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-lg bg-secondary-500 text-white font-semibold hover:bg-secondary-600 transition-colors"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-white hover:text-neutral-200 transition-colors">
                  Dashboard
                </Link>
                <Link to="/upload" className="text-white hover:text-neutral-200 transition-colors">
                  Upload
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-white hover:text-neutral-200 transition-colors">
                    <span className="mr-1">{user?.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-primary-800 hover:bg-primary-50 rounded-md transition-colors"
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/certificates" 
                        className="block px-4 py-2 text-primary-800 hover:bg-primary-50 rounded-md transition-colors"
                      >
                        Certificates
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-error-500 hover:bg-error-50 rounded-md transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
                <button className="relative text-white p-2">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-500 rounded-full"></span>
                </button>
              </>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-500 shadow-lg animate-slide-down">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              {!isAuthenticated ? (
                <>
                  <Link to="/features" className="text-white py-2">
                    Features
                  </Link>
                  <Link to="/about" className="text-white py-2">
                    About
                  </Link>
                  <Link to="/contact" className="text-white py-2">
                    Contact
                  </Link>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-lg bg-secondary-500 text-white font-semibold text-center"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="text-white py-2">
                    Dashboard
                  </Link>
                  <Link to="/upload" className="text-white py-2">
                    Upload
                  </Link>
                  <Link to="/profile" className="text-white py-2">
                    Profile
                  </Link>
                  <Link to="/certificates" className="text-white py-2">
                    Certificates
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-error-200 py-2"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;