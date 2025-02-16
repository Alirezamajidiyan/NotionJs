export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "alert";
export type NotificationStyle = "default" | "outlined" | "filled";
export type NotificationPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface NotificationOptions {
  id?: string; 
  type: NotificationType;
  message: string;
  duration?: number;
  dismissible?: boolean;
  style?: NotificationStyle;
  position?: NotificationPosition;
}
