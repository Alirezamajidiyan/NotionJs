// Define all notification-related types and interfaces

export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "confirm";
export type NotificationStyle = "default" | "outlined" | "filled";
export type NotificationPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"
  | string; // Allow custom positions via a CSS class

export interface NotificationOptions {
  id?: string;
  title?: string;
  type: NotificationType;
  message: string;
  duration?: number; // In milliseconds; not applicable for "confirm"
  dismissible?: boolean;
  style?: NotificationStyle;
  position?: NotificationPosition;
  onClose?: () => void;
  onConfirm?: () => void; // Only for confirm notifications
  onCancel?: () => void; // Only for confirm notifications
}
