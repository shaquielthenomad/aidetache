import React from 'react';
import { MaterialIcon } from '../MaterialIcon';

interface ConfirmationDialogProps {
  type: 'delete' | 'reject';
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  type,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText,
  cancelText = 'Cancel'
}) => {
  const getIconStyles = () => {
    switch (type) {
      case 'delete':
        return {
          icon: 'warning_amber',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          buttonBg: 'bg-red-600',
          buttonHover: 'hover:bg-red-700',
          buttonFocus: 'focus:ring-red-500',
          confirmIcon: 'delete_outline'
        };
      case 'reject':
        return {
          icon: 'help_outline',
          iconBg: 'bg-blue-100',
          iconColor: 'text-[#0a3bc1]',
          buttonBg: 'bg-[#0a3bc1]',
          buttonHover: 'hover:bg-blue-700',
          buttonFocus: 'focus:ring-[#0a3bc1]',
          confirmIcon: 'thumb_down_alt'
        };
    }
  };

  const styles = getIconStyles();
  const defaultConfirmText = type === 'delete' ? 'Delete Claim' : 'Reject Claim';

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className={`mb-4 flex size-12 items-center justify-center rounded-full ${styles.iconBg} ${styles.iconColor}`}>
          <MaterialIcon icon={styles.icon} className="text-3xl" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mb-6 text-gray-600">{description}</p>
        <div className="w-full space-y-3 sm:flex sm:space-x-3 sm:space-y-0">
          <button
            onClick={onCancel}
            className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            <span>{cancelText}</span>
          </button>
          <button
            onClick={onConfirm}
            className={`flex w-full items-center justify-center rounded-lg ${styles.buttonBg} px-4 py-2.5 text-sm font-semibold text-white transition-colors ${styles.buttonHover} focus:outline-none focus:ring-2 ${styles.buttonFocus} focus:ring-offset-2`}
          >
            <MaterialIcon icon={styles.confirmIcon} className="mr-2 text-lg" />
            <span>{confirmText || defaultConfirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog; 