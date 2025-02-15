import React, { createContext, useContext, useState, ReactNode } from "react";
import { NotificationOptions } from "./types";
import Notification from "./Notification";

interface NotificationContextProps {
  addNotification: (notification: NotificationOptions) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationOptions[]>([]);

  const addNotification = (notification: NotificationOptions) => {
    const newNotification = { ...notification, id: `notif-${Date.now()}` };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="notification-container">
        {notifications.map((notif) => (
          <Notification
            key={notif.id}
            {...notif}
            onRemove={removeNotification}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
