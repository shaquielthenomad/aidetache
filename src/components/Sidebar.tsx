import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  FileCheck, 
  Download, 
  Settings, 
  HelpCircle, 
  PieChart, 
  Users, 
  FileSearch
} from 'lucide-react';

type SidebarProps = {
  role: 'policyholder' | 'insurer' | 'admin';
};

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();
  
  const policyholderLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/upload', label: 'Upload New Claim', icon: <Upload className="w-5 h-5" /> },
    { to: '/certificates', label: 'Certificates', icon: <Download className="w-5 h-5" /> },
    { to: '/help', label: 'Help & Support', icon: <HelpCircle className="w-5 h-5" /> },
    { to: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];
  
  const insurerLinks = [
    { to: '/insurer/dashboard', label: 'Analytics', icon: <PieChart className="w-5 h-5" /> },
    { to: '/insurer/claims', label: 'Claim Queue', icon: <FileSearch className="w-5 h-5" /> },
    { to: '/insurer/users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { to: '/insurer/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];
  
  const links = role === 'insurer' ? insurerLinks : policyholderLinks;
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <aside className="hidden md:block w-64 bg-white shadow-card min-h-full">
      <div className="p-4">
        <h2 className="text-primary-800 font-semibold text-lg mb-6">
          {role === 'insurer' ? 'Insurer Portal' : 'Policyholder Portal'}
        </h2>
        
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-500 text-white' 
                    : 'text-primary-800 hover:bg-primary-50'
                }`
              }
            >
              <span className="mr-3">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;