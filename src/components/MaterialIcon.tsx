import React from 'react';

interface MaterialIconProps {
  icon: string;
  className?: string;
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({ icon, className = '' }) => {
  return (
    <span className={`material-icons ${className}`} style={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
      {icon}
    </span>
  );
};

export default MaterialIcon; 