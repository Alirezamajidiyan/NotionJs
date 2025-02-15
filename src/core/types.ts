export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "alert";
export type NotificationStyle = "default" | "outlined" | "filled";

export interface NotificationOptions {
  id?: string; // اگر وجود نداشته باشد، توسط NotificationManager تولید می‌شود
  type: NotificationType;
  message: string;
  duration?: number;
  dismissible?: boolean;
  style?: NotificationStyle;
}
