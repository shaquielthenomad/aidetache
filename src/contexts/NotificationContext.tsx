import React, { createContext, useContext, useState, useEffect } from 'react';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

type Notification = {
  id: string;
  type: NotificationType;
  message: string;
  autoDismiss?: boolean;
  duration?: number;
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Add notification
  const addNotification = ({ type, message, autoDismiss = true, duration = 5000 }: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification = { id, type, message, autoDismiss, duration };
    
    setNotifications(prevNotifications => [...prevNotifications, newNotification]);
    
    // Auto dismiss if enabled
    if (autoDismiss) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  // Remove notification
  const removeNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};