import { NotificationOptions } from "./types";

type AddNotificationFunc = (notification: NotificationOptions) => void;
let addNotificationHandler: AddNotificationFunc | null = null;

/**
 * Called by NotificationManager to register the addNotification function.
 */
export function registerNotificationHandler(handler: AddNotificationFunc) {
  addNotificationHandler = handler;
}

/**
 * Displays a new notification using the registered handler.
 */
function show(notification: NotificationOptions) {
  if (addNotificationHandler) {
    addNotificationHandler(notification);
  } else {
    console.error(
      "Notification system is not initialized. Ensure that your app is wrapped in NotificationProvider."
    );
  }
}

export const NotificationService = {
  show,
  success: (message: string, title?: string, duration?: number) => {
    show({
      type: "success",
      message,
      title,
      duration,
      dismissible: true,
      position: "top-right",
    });
  },
  error: (message: string, title?: string, duration?: number) => {
    show({
      type: "error",
      message,
      title,
      duration,
      dismissible: true,
      position: "top-right",
    });
  },
  warning: (message: string, title?: string, duration?: number) => {
    show({
      type: "warning",
      message,
      title,
      duration,
      dismissible: true,
      position: "top-right",
    });
  },
  info: (message: string, title?: string, duration?: number) => {
    show({
      type: "info",
      message,
      title,
      duration,
      dismissible: true,
      position: "top-right",
    });
  },
  confirm: (
    message: string,
    onConfirm: () => void,
    onCancel: () => void,
    title?: string
  ) => {
    show({
      type: "confirm",
      message,
      title,
      dismissible: false,
      position: "top-center",
      onConfirm,
      onCancel,
    });
  },
};

export default NotificationService;
