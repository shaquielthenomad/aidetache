import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-card overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-4 border-b border-neutral-200 ${className}`}>
      {children}
    </div>
  );
};

type CardBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

type CardFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-4 border-t border-neutral-200 ${className}`}>
      {children}
    </div>
  );
};

export default Card;