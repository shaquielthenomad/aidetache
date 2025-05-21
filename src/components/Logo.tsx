import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#003366"/>
      <path 
        d="M16 6C10.48 6 6 10.48 6 16C6 21.52 10.48 26 16 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 16 6ZM14 21.5L8.5 16L10.62 13.88L14 17.26L21.38 9.88L23.5 12L14 21.5Z" 
        fill="#009933"
      />
    </svg>
  );
};

export default Logo;