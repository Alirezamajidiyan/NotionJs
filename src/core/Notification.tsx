import React, { useEffect } from "react";
import { NotificationOptions,NotificationPosition } from "./types";

interface NotificationProps extends NotificationOptions {
  onRemove?: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  message,
  duration = 3000,
  dismissible = true,
  style = "default",
  position="top-right",
  onRemove,
}) => {
  // تولید یک شناسه منحصر به فرد در صورت عدم وجود id
  const notificationId = id || `notif-${Date.now()}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove && onRemove(notificationId);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, notificationId, onRemove]);

  return (
    <div
      className={`notification notification-${type} notification-${style} notification-${position}`}
      id={notificationId}
    >
      {message}
      {dismissible && (
        <button
          className="close-btn"
          onClick={() => onRemove && onRemove(notificationId)}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Notification;
