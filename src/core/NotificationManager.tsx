import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Notification from "./Notification";
import { NotificationOptions } from "./types";
import { registerNotificationHandler } from "./NotificationService";

interface NotificationContextProps {
  addNotification: (notification: NotificationOptions) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationOptions[]>([]);

  const addNotification = (notification: NotificationOptions) => {
    const id = notification.id || `notif-${Date.now()}`;
    setNotifications((prev) => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Register the addNotification handler so that the service can call it
  useEffect(() => {
    registerNotificationHandler(addNotification);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification }}
    >
      {children}
      {/* Render grouped notifications based on position (non-confirm) */}
      {[
        "top-right",
        "top-left",
        "top-center",
        "bottom-right",
        "bottom-left",
        "bottom-center",
      ].map((position) => {
        const positionNotifs = notifications.filter(
          (n) => n.position === position && n.type !== "confirm"
        );
        return (
          <div
            key={position}
            className={`notification-container notification-${position}`}
          >
            {positionNotifs.map((notif) => (
              <Notification
                key={notif.id}
                {...notif}
                onClose={() => {
                  notif.onClose && notif.onClose();
                  removeNotification(notif.id!);
                }}
              />
            ))}
          </div>
        );
      })}
      {/* Render confirm notifications in a centered modal overlay */}
      {notifications.filter((n) => n.type === "confirm").length > 0 && (
        <div className="modal-overlay">
          {notifications
            .filter((n) => n.type === "confirm")
            .map((notif) => (
              <Notification
                key={notif.id}
                {...notif}
                onClose={() => {
                  notif.onClose && notif.onClose();
                  removeNotification(notif.id!);
                }}
              />
            ))}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};

export { Notification };
