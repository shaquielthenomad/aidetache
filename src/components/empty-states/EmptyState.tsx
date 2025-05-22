import React from 'react';
import { MaterialIcon } from '../MaterialIcon';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonIcon?: string;
  onButtonClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonIcon?: string;
  onSecondaryButtonClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  buttonText,
  buttonIcon,
  onButtonClick,
  secondaryButtonText,
  secondaryButtonIcon,
  onSecondaryButtonClick,
  variant = 'primary'
}) => {
  return (
    <section className="bg-white p-8 rounded-lg shadow-lg text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="text-[#0A3BC1] p-4 rounded-full bg-indigo-100">
          <MaterialIcon icon={icon} className="text-6xl" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600 max-w-md">{description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          {buttonText && (
            <button
              onClick={onButtonClick}
              className={`flex items-center gap-2 min-w-[84px] max-w-[480px] cursor-pointer justify-center overflow-hidden rounded-md h-11 px-6 ${
                variant === 'primary'
                  ? 'bg-[#0A3BC1] text-white hover:bg-indigo-700'
                  : 'bg-white text-[#0A3BC1] border border-[#0A3BC1] hover:bg-indigo-50'
              } text-sm font-medium tracking-wide transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {buttonIcon && <MaterialIcon icon={buttonIcon} className="text-xl" />}
              <span className="truncate">{buttonText}</span>
            </button>
          )}
          {secondaryButtonText && (
            <button
              onClick={onSecondaryButtonClick}
              className="flex items-center gap-2 min-w-[84px] max-w-[480px] cursor-pointer justify-center overflow-hidden rounded-md h-11 px-6 bg-white text-[#0A3BC1] border border-[#0A3BC1] text-sm font-medium tracking-wide hover:bg-indigo-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {secondaryButtonIcon && <MaterialIcon icon={secondaryButtonIcon} className="text-xl" />}
              <span className="truncate">{secondaryButtonText}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmptyState; 