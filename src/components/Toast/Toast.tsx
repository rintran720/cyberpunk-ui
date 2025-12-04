import * as React from "react";
import { createPortal } from "react-dom";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Toast Types
// ============================================================================

export type ToastType = "default" | "success" | "error" | "warning" | "info";
export type ToastPosition = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Internal: whether toast is closing */
  _closing?: boolean;
}

// ============================================================================
// Toast Context
// ============================================================================

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  position: ToastPosition;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Simple hook for adding toasts
export const useToastAction = () => {
  const { addToast, removeToast } = useToast();
  
  return {
    toast: (props: Omit<Toast, "id">) => addToast(props),
    success: (title: string, description?: string) => addToast({ title, description, type: "success" }),
    error: (title: string, description?: string) => addToast({ title, description, type: "error" }),
    warning: (title: string, description?: string) => addToast({ title, description, type: "warning" }),
    info: (title: string, description?: string) => addToast({ title, description, type: "info" }),
    dismiss: removeToast,
  };
};

// ============================================================================
// Toast Provider
// ============================================================================

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Default position for toasts */
  position?: ToastPosition;
  /** Default duration in ms */
  duration?: number;
  /** Maximum number of toasts visible */
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "bottom-right",
  duration = 5000,
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    // First, mark toast as closing for exit animation
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, _closing: true } : t))
    );
    // Then remove after animation (300ms)
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const addToast = React.useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = {
        ...toast,
        id,
        duration: toast.duration ?? duration,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Limit visible toasts
        return updated.slice(-maxToasts);
      });

      // Auto dismiss
      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, newToast.duration);
      }

      return id;
    },
    [duration, maxToasts, removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, position }}>
      {children}
      {mounted && <ToastViewport />}
    </ToastContext.Provider>
  );
};

// ============================================================================
// Toast Viewport
// ============================================================================

const positionStyles: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

const ToastViewport: React.FC = () => {
  const { toasts, position } = useToast();

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={cn(
        "fixed z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none",
        positionStyles[position]
      )}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body
  );
};

// ============================================================================
// Toast Item
// ============================================================================

const toastVariants = cva(
  [
    "relative w-full p-4 rounded-lg pointer-events-auto",
    "border",
    // 3D effect
    "shadow-[0_8px_16px_rgba(0,0,0,0.3),0_4px_0_0_rgba(0,0,0,0.2)]",
    // Transition for smooth animations
    "transition-all duration-300 ease-out",
  ],
  {
    variants: {
      type: {
        default: "bg-surface-800 border-surface-600 text-surface-100",
        success: "bg-green-900/90 border-green-700 text-green-100",
        error: "bg-red-900/90 border-red-700 text-red-100",
        warning: "bg-yellow-900/90 border-yellow-700 text-yellow-100",
        info: "bg-blue-900/90 border-blue-700 text-blue-100",
      },
    },
    defaultVariants: {
      type: "default",
    },
  }
);

const iconsByType: Record<ToastType, React.ReactNode> = {
  default: null,
  success: (
    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

interface ToastItemProps {
  toast: Toast;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const { removeToast } = useToast();
  const type = toast.type || "default";
  const isClosing = toast._closing;

  return (
    <div 
      className={cn(
        toastVariants({ type }),
        // Enter animation
        !isClosing && "animate-[toast-in_300ms_ease-out]",
        // Exit animation
        isClosing && "opacity-0 translate-x-full"
      )}
    >
      <div className="flex gap-3">
        {/* Icon */}
        {iconsByType[type] && (
          <div className="flex-shrink-0">{iconsByType[type]}</div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {toast.title && (
            <p className="font-medium text-sm">{toast.title}</p>
          )}
          {toast.description && (
            <p className={cn(
              "text-sm opacity-90",
              toast.title && "mt-1"
            )}>
              {toast.description}
            </p>
          )}
          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                removeToast(toast.id);
              }}
              className="mt-2 text-sm font-medium underline underline-offset-2 hover:no-underline"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={() => removeToast(toast.id)}
          className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
        >
          <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// Standalone toast function (for use outside React components)
// ============================================================================

let toastFn: ((props: Omit<Toast, "id">) => string) | null = null;

export const setToastFunction = (fn: (props: Omit<Toast, "id">) => string) => {
  toastFn = fn;
};

export const toast = (props: Omit<Toast, "id">) => {
  if (!toastFn) {
    console.warn("Toast function not initialized. Make sure ToastProvider is mounted.");
    return "";
  }
  return toastFn(props);
};

toast.success = (title: string, description?: string) => toast({ title, description, type: "success" });
toast.error = (title: string, description?: string) => toast({ title, description, type: "error" });
toast.warning = (title: string, description?: string) => toast({ title, description, type: "warning" });
toast.info = (title: string, description?: string) => toast({ title, description, type: "info" });

export { toastVariants };

