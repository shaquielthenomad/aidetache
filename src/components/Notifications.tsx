import React from 'react';
import { X } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotification();
  
  if (notifications.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-xs w-full">
      {notifications.map((notification) => {
        // Determine color based on notification type
        let bgColor, borderColor, iconColor;
        let icon;
        
        switch (notification.type) {
          case 'success':
            bgColor = 'bg-success-500';
            borderColor = 'border-success-600';
            iconColor = 'text-success-200';
            icon = (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            );
            break;
          case 'error':
            bgColor = 'bg-error-500';
            borderColor = 'border-error-600';
            iconColor = 'text-error-200';
            icon = (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            );
            break;
          case 'warning':
            bgColor = 'bg-warning-500';
            borderColor = 'border-warning-600';
            iconColor = 'text-warning-200';
            icon = (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            );
            break;
          default: // info
            bgColor = 'bg-primary-500';
            borderColor = 'border-primary-600';
            iconColor = 'text-primary-200';
            icon = (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            );
        }
        
        return (
          <div 
            key={notification.id}
            className={`${bgColor} text-white p-4 rounded-lg shadow-md border-l-4 ${borderColor} animate-fade-in flex items-start`}
            role="alert"
          >
            <div className={`mr-3 ${iconColor}`}>
              {icon}
            </div>
            <div className="flex-grow">{notification.message}</div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 text-white hover:text-neutral-200 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;