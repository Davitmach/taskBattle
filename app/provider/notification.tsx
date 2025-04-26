'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";
type Notification = {
  message: string;
};

type NotificationContextType = {
  notifications: Notification;
  showNotification: (message: string) => void;
};




const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification>({message: ""});

  const showNotification = (message: string) => {
   
   
    setNotifications({message:message});
  
    setTimeout(() => {
      setNotifications({message: ""});
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notifications, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};


export const useNotification = () => {

    
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
