import React, { useEffect, useState } from "react";
import { NotificationOptions } from "./types";
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaInfoCircle, FaQuestionCircle } from "react-icons/fa";

interface NotificationProps extends NotificationOptions {}

const Notification: React.FC<NotificationProps> = ({
  id,
  title,
  type,
  message,
  duration = 3000,
  dismissible = true,
  style = "default",
  position = "top-right",
  onClose,
  onConfirm,
  onCancel,
}) => {
  const [exiting, setExiting] = useState(false);
  const notificationId = id || `notif-${Date.now()}`;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (type !== "confirm") {
      timer = setTimeout(() => handleClose(), duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [duration, type]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      onClose && onClose();
    }, 4000);
  };

  const handleConfirm = () => {
    onConfirm && onConfirm();
    handleClose();
  };

  const handleCancel = () => {
    onCancel && onCancel();
    handleClose();
  };

  // Render icons using react-icons
  const renderIcon = () => {
    const iconProps = { size: 24, className: "icon" }; // تنظیم اندازه و کلاس آیکون

    switch (type) {
      case "success":
        return <FaCheckCircle {...iconProps} color="#4caf50" />;
      case "error":
        return <FaTimesCircle {...iconProps} color="#f44336" />;
      case "warning":
        return <FaExclamationTriangle {...iconProps} color="#ff9800" />;
      case "info":
        return <FaInfoCircle {...iconProps} color="#2196f3" />;
      case "confirm":
        return <FaQuestionCircle {...iconProps} color="#213358" />;
      default:
        return null;
    }
  };

  return (
    <div
      id={notificationId}
      className={`notification ${
        exiting ? "exit" : "enter"
      } notification-${type} notification-${style} notification-${position}`}
      role={type === "confirm" ? "dialog" : "alert"}
      aria-live="assertive"
    >
      <div className="notification-content">
        {renderIcon()}
        <div className="text-content">
          {title && <div className="notification-title">{title}</div>}
          <div className="notification-message">{message}</div>
        </div>
        {dismissible && type !== "confirm" && (
          <button
            className="close-btn"
            onClick={handleClose}
            aria-label="Close notification"
          >
            &times;
          </button>
        )}
      </div>
      {type !== "confirm" && duration > 0 && (
        <div
          className="progress-bar"
          style={{ animation: `progress ${duration}ms linear forwards` }}
        />
      )}
      {type === "confirm" && (
        <div className="confirm-buttons">
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;