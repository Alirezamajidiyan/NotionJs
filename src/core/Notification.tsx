import React, { useEffect, useState } from "react";
import { NotificationOptions } from "./types";

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
  // Generate a unique ID if none is provided
  const notificationId = id || `notif-${Date.now()}`;

  // Auto-dismiss (for non-confirm notifications)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (type !== "confirm") {
      timer = setTimeout(() => handleClose(), duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [duration, type]);

  // Handle closing with an exit animation before firing callback
  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      onClose && onClose();
    }, 300); // Match exit animation duration (300ms)
  };

  // For confirm notifications, proxy confirm and cancel callbacks
  const handleConfirm = () => {
    onConfirm && onConfirm();
    handleClose();
  };

  const handleCancel = () => {
    onCancel && onCancel();
    handleClose();
  };

  // Inline SVG icons optimized for size
  const renderIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5z"
            />
          </svg>
        );
      case "error":
        return (
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
                    10-4.48 10-10S17.52 2 12 2zm5 13l-1.41 
                    1.41L12 13.41l-3.59 3.59L7 15l3.59-3.59L7 
                    7.83 8.41 6.41 12 10l3.59-3.59L17 7.83l-3.59 
                    3.59L17 15z"
            />
          </svg>
        );
      case "warning":
        return (
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
            />
          </svg>
        );
      case "info":
        return (
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2zm1-7C6.48 
                    2 2 6.48 2 12s4.48 10 10 10 10-4.48 
                    10-10S17.52 2 12 2z"
            />
          </svg>
        );
      case "confirm":
        return (
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 
                    10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"
            />
          </svg>
        );
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
      {/* Reverse progress bar for auto-dismiss notifications */}
      {type !== "confirm" && duration > 0 && (
        <div
          className="progress-bar"
          style={{ animation: `progress ${duration}ms linear forwards` }}
        />
      )}
      {/* Render Confirm/Cancel buttons for confirm notifications */}
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
