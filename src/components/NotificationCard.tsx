import React from 'react';
import { CheckCircle, Email, Event, Security, ArrowForward } from 'lucide-react';

export type NotificationType = 'claim' | 'message' | 'policy' | 'security';

interface NotificationCardProps {
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isUnread?: boolean;
  onView?: () => void;
  onDismiss?: () => void;
  showActions?: boolean;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  type,
  title,
  message,
  timestamp,
  isUnread = false,
  onView,
  onDismiss,
  showActions = true
}) => {
  const getIcon = () => {
    switch (type) {
      case 'claim':
        return <CheckCircle className="h-6 w-6" />;
      case 'message':
        return <Email className="h-6 w-6" />;
      case 'policy':
        return <Event className="h-6 w-6" />;
      case 'security':
        return <Security className="h-6 w-6" />;
      default:
        return <Email className="h-6 w-6" />;
    }
  };

  const getIconStyles = () => {
    switch (type) {
      case 'claim':
        return { bg: 'bg-green-100', text: 'text-green-500' };
      case 'message':
        return { bg: 'bg-blue-100', text: 'text-blue-500' };
      case 'policy':
        return { bg: 'bg-orange-100', text: 'text-orange-500' };
      case 'security':
        return { bg: 'bg-red-100', text: 'text-red-500' };
      default:
        return { bg: 'bg-blue-100', text: 'text-blue-500' };
    }
  };

  const iconStyles = getIconStyles();

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="bg-[#0a3bc1] px-6 py-4 flex items-center justify-between">
        <h1 className="text-white text-xl font-semibold leading-tight flex items-center">
          {getIcon()}
          <span className="ml-2">{title}</span>
        </h1>
        <span className="text-xs text-white/80">{timestamp}</span>
      </div>

      <div className="flex items-start gap-4 p-6">
        <div className={`${iconStyles.bg} ${iconStyles.text} flex items-center justify-center rounded-full shrink-0 size-10 mt-1`}>
          {getIcon()}
        </div>
        <div className="flex flex-col justify-center flex-grow">
          <p className="text-[#111318] text-base font-semibold leading-normal">{title}</p>
          <p className="text-slate-600 text-sm font-normal leading-relaxed mt-1">
            {message}
          </p>
        </div>
        {isUnread && (
          <span className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0 mt-1 animate-pulse" title="Unread notification" />
        )}
      </div>

      {showActions && (
        <div className="flex px-6 py-4 bg-slate-50 border-t border-slate-200 justify-end items-center gap-3">
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Dismiss
            </button>
          )}
          {onView && (
            <button
              onClick={onView}
              className="flex items-center justify-center rounded-lg h-10 px-6 bg-[#0a3bc1] text-white text-sm font-semibold hover:bg-opacity-90 transition-colors"
            >
              <span className="truncate">View Details</span>
              <ArrowForward className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCard; 