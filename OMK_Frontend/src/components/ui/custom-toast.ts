import { toast } from "sonner";
import { Camera, CheckCircle, AlertCircle, XCircle, Info, Heart, Star, Calendar, MapPin } from "lucide-react";

// Custom toast types for photography business
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'booking' | 'gallery' | 'review' | 'location';

interface CustomToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
}

// Custom toast component with photography-themed styling
export const customToast = {
  success: (message: string, options?: CustomToastOptions) => {
    return toast.success(message, {
      duration: options?.duration || 4000,
      dismissible: options?.dismissible ?? true,
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      className: "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800",
      action: options?.action,
      cancel: options?.cancel,
    });
  },

  error: (message: string, options?: CustomToastOptions) => {
    return toast.error(message, {
      duration: options?.duration || 5000,
      dismissible: options?.dismissible ?? true,
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      className: "bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-800",
      action: options?.action,
      cancel: options?.cancel,
    });
  },

  warning: (message: string, options?: CustomToastOptions) => {
    return toast.warning(message, {
      duration: options?.duration || 4000,
      dismissible: options?.dismissible ?? true,
      icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
      className: "bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-800",
      action: options?.action,
      cancel: options?.cancel,
    });
  },

  info: (message: string, options?: CustomToastOptions) => {
    return toast.info(message, {
      duration: options?.duration || 4000,
      dismissible: options?.dismissible ?? true,
      icon: <Info className="w-5 h-5 text-blue-500" />,
      className: "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800",
      action: options?.action,
      cancel: options?.cancel,
    });
  },

  // Photography-specific toast types
  booking: (message: string, options?: CustomToastOptions) => {
    return toast(message, {
      duration: options?.duration || 5000,
      dismissible: options?.dismissible ?? true,
      icon: <Calendar className="w-5 h-5 text-purple-500" />,
      className: "bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 text-purple-800",
      action: options?.action,
      cancel: options?.cancel,
    });
  },

  gallery: (message: string, options?: CustomToastOptions) => {
    return toast(message, {
      duration: options?.duration || 4000,
      dismissible: options?.dismissible ?? true,
      icon: <Camera className="w-5 h-5 text-indigo-500" />,
      className: "bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 text-indigo-800",
      action: options?.action,
      cancel: options?.cancel,
    });
  },

  review: (message: string, options?: CustomToastOptions) => {
    return toast(message, {
      duration: options?.duration || 4000,
      dismissible: options?.dismissible ?? true,
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      className: "bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 text-yellow-800",
      action: options?.action,
      cancel: options?.cancel,
    });
  },

  location: (message: string, options?: CustomToastOptions) => {
    return toast(message, {
      duration: options?.duration || 4000,
      dismissible: options?.dismissible ?? true,
      icon: <MapPin className="w-5 h-5 text-pink-500" />,
      className: "bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 text-pink-800",
      action: options?.action,
      cancel: options?.cancel,
    });
  },

  // Special toast for client love/testimonials
  love: (message: string, options?: CustomToastOptions) => {
    return toast(message, {
      duration: options?.duration || 6000,
      dismissible: options?.dismissible ?? true,
      icon: <Heart className="w-5 h-5 text-red-500 animate-pulse" />,
      className: "bg-gradient-to-r from-red-50 via-pink-50 to-rose-50 border border-red-200 text-red-800",
      action: options?.action,
      cancel: options?.cancel,
    });
  },

  // Custom toast with your own icon and styling
  custom: (message: string, icon?: React.ReactNode, className?: string, options?: CustomToastOptions) => {
    return toast(message, {
      duration: options?.duration || 4000,
      dismissible: options?.dismissible ?? true,
      icon: icon || <Camera className="w-5 h-5 text-gray-500" />,
      className: className || "bg-white border border-gray-200 text-gray-800",
      action: options?.action,
      cancel: options?.cancel,
    });
  },
};

// Utility functions for common photography business scenarios
export const photographyToasts = {
  bookingConfirmed: (clientName: string, date: string) => {
    customToast.booking(
      `Booking confirmed for ${clientName} on ${date}`,
      {
        duration: 6000,
        action: {
          label: "View Details",
          onClick: () => console.log("Navigate to booking details")
        }
      }
    );
  },

  photoUploaded: (count: number) => {
    customToast.gallery(
      `${count} photo${count > 1 ? 's' : ''} uploaded successfully`,
      {
        action: {
          label: "View Gallery",
          onClick: () => console.log("Navigate to gallery")
        }
      }
    );
  },

  newReview: (rating: number, clientName: string) => {
    customToast.review(
      `New ${rating}-star review from ${clientName}!`,
      {
        duration: 5000,
        action: {
          label: "View Review",
          onClick: () => console.log("Navigate to reviews")
        }
      }
    );
  },

  paymentReceived: (amount: string, clientName: string) => {
    customToast.success(
      `Payment of ₹${amount} received from ${clientName}`,
      {
        duration: 5000,
        action: {
          label: "View Invoice",
          onClick: () => console.log("Navigate to invoice")
        }
      }
    );
  },

  deliveryReady: (clientName: string) => {
    customToast.love(
      `${clientName}'s photos are ready for delivery! 📸✨`,
      {
        action: {
          label: "Send Link",
          onClick: () => console.log("Send delivery link")
        }
      }
    );
  },

  equipmentReminder: (equipment: string, eventDate: string) => {
    customToast.warning(
      `Don't forget to pack ${equipment} for ${eventDate} shoot`,
      {
        duration: 8000,
        action: {
          label: "Checklist",
          onClick: () => console.log("Open equipment checklist")
        }
      }
    );
  },

  locationShared: (location: string) => {
    customToast.location(
      `Location shared: ${location}`,
      {
        action: {
          label: "Open Maps",
          onClick: () => console.log("Open location in maps")
        }
      }
    );
  },
};

// Export individual toast functions for easier importing
export const {
  success: toastSuccess,
  error: toastError,
  warning: toastWarning,
  info: toastInfo,
  booking: toastBooking,
  gallery: toastGallery,
  review: toastReview,
  location: toastLocation,
  love: toastLove,
  custom: toastCustom,
} = customToast;