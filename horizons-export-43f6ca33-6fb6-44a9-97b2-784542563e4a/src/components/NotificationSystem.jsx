import React from 'react';
import { Toaster, toast as sonnerToast } from 'sonner';

const NotificationSystem = () => {
  return <Toaster richColors position="top-right" />;
};

export const showNotification = (type, title, description) => {
  switch (type) {
    case 'success':
      sonnerToast.success(title, { description });
      break;
    case 'error':
      sonnerToast.error(title, { description });
      break;
    case 'info':
      sonnerToast.info(title, { description });
      break;
    case 'warning':
      sonnerToast.warning(title, { description });
      break;
    default:
      sonnerToast(title, { description });
      break;
  }
};

export default NotificationSystem;