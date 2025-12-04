import * as React from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Dialog Context
interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: "default" | "elevated" | "glass";
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog");
  }
  return context;
};

// Dialog Root
export interface DialogProps {
  /** Whether the dialog is open */
  open?: boolean;
  /** Default open state for uncontrolled usage */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Visual variant */
  variant?: "default" | "elevated" | "glass";
  /** Children */
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  variant = "default",
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DialogContext.Provider
      value={{ open, onOpenChange: handleOpenChange, variant }}
    >
      {children}
    </DialogContext.Provider>
  );
};

Dialog.displayName = "Dialog";

// Dialog Trigger
export interface DialogTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const DialogTrigger = React.forwardRef<HTMLElement, DialogTriggerProps>(
  ({ children, asChild = true, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialogContext();

    // By default, treat children as the trigger element (asChild behavior)
    if (React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<{
          onClick?: (e: React.MouseEvent) => void;
          ref?: React.Ref<HTMLElement>;
        }>,
        {
          onClick: (e: React.MouseEvent) => {
            // Call original onClick if exists
            const originalOnClick = (
              children as React.ReactElement<{
                onClick?: (e: React.MouseEvent) => void;
              }>
            ).props.onClick;
            originalOnClick?.(e);
            onOpenChange(true);
          },
          ref,
        }
      );
    }

    // Fallback to span wrapper if children is not an element
    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        onClick={(e) => {
          (onClick as React.MouseEventHandler<HTMLSpanElement>)?.(e);
          onOpenChange(true);
        }}
        style={{ cursor: "pointer" }}
        {...props}
      >
        {children}
      </span>
    );
  }
);

DialogTrigger.displayName = "DialogTrigger";

// Dialog Portal (renders to body)
interface DialogPortalProps {
  children: React.ReactNode;
}

const DialogPortal: React.FC<DialogPortalProps> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return typeof document !== "undefined"
    ? createPortal(children, document.body)
    : null;
};

// Dialog Overlay
const overlayVariants = cva(["fixed inset-0 z-50", "animate-overlay-show"], {
  variants: {
    variant: {
      default: "bg-black/60 backdrop-blur-sm",
      elevated: "bg-surface-950/80 backdrop-blur-md",
      glass: "bg-black/40 backdrop-blur-lg",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface DialogOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, ...props }, ref) => {
    const { open, onOpenChange, variant } = useDialogContext();

    if (!open) return null;

    return (
      <DialogPortal>
        <div
          ref={ref}
          className={cn(
            overlayVariants({ variant }),
            open ? "opacity-100" : "opacity-0",
            className
          )}
          onClick={() => onOpenChange(false)}
          aria-hidden="true"
          {...props}
        />
      </DialogPortal>
    );
  }
);

DialogOverlay.displayName = "DialogOverlay";

// Dialog Content
const contentVariants = cva(
  [
    "fixed z-[51]",
    "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
    "max-h-[85vh]",
    "overflow-auto",
    "rounded-2xl",
    "outline-none",
    // Animation
    "animate-dialog-show",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-surface-800",
          "border border-surface-700/50",
          // 3D shadow effect
          "shadow-[0_8px_0_0_rgba(0,0,0,0.25),0_16px_40px_-8px_rgba(0,0,0,0.4)]",
          // Top highlight
          "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        ],
        elevated: [
          "bg-gradient-to-b from-surface-700 to-surface-800",
          "border border-surface-600/30",
          // Deep 3D shadow
          "shadow-[0_12px_0_0_rgba(0,0,0,0.3),0_24px_60px_-12px_rgba(0,0,0,0.5)]",
          // Stronger highlight
          "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
        ],
        glass: [
          "bg-white/10 backdrop-blur-xl",
          "border border-white/20",
          // Glass shadow
          "shadow-[0_8px_0_0_rgba(255,255,255,0.05),0_16px_40px_-8px_rgba(0,0,0,0.4)]",
          // Glass highlight
          "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
        ],
      },
      size: {
        sm: "w-full max-w-sm",
        md: "w-full max-w-md",
        lg: "w-full max-w-lg",
        xl: "w-full max-w-xl",
        "2xl": "w-full max-w-2xl",
        full: "w-full max-w-[calc(100vw-2rem)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentVariants> {
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Called when escape key is pressed or close button clicked */
  onClose?: () => void;
}

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  (
    { className, size, showCloseButton = true, onClose, children, ...props },
    ref
  ) => {
    const { open, onOpenChange, variant } = useDialogContext();
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Handle escape key
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && open) {
          onOpenChange(false);
          onClose?.();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, onOpenChange, onClose]);

    // Lock body scroll when open
    React.useEffect(() => {
      if (open) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [open]);

    // Focus trap
    React.useEffect(() => {
      if (open && contentRef.current) {
        const focusableElements = contentRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        const handleTab = (e: KeyboardEvent) => {
          if (e.key === "Tab") {
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        };

        document.addEventListener("keydown", handleTab);
        firstElement?.focus();

        return () => document.removeEventListener("keydown", handleTab);
      }
    }, [open]);

    if (!open) return null;

    return (
      <DialogPortal>
        {/* Overlay */}
        <div
          className={cn(overlayVariants({ variant }))}
          onClick={() => onOpenChange(false)}
          aria-hidden="true"
        />
        {/* Dialog content */}
        <div
          ref={(node) => {
            (
              contentRef as React.MutableRefObject<HTMLDivElement | null>
            ).current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          role="dialog"
          aria-modal="true"
          data-state={open ? "open" : "closed"}
          className={cn(contentVariants({ variant, size }), className)}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {showCloseButton && (
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onClose?.();
              }}
              className={cn(
                "absolute right-4 top-4 z-10",
                "p-2 rounded-lg",
                "text-surface-400 hover:text-surface-100",
                "hover:bg-surface-700/50",
                "transition-colors duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              )}
              aria-label="Close dialog"
            >
              <CloseIcon />
            </button>
          )}
          {children}
        </div>
      </DialogPortal>
    );
  }
);

DialogContent.displayName = "DialogContent";

// Dialog Header
export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => {
    const { variant } = useDialogContext();

    return (
      <div
        ref={ref}
        className={cn(
          "px-6 pt-6 pb-4",
          variant === "glass" ? "text-white" : "text-surface-50",
          className
        )}
        {...props}
      />
    );
  }
);

DialogHeader.displayName = "DialogHeader";

// Dialog Title
export interface DialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn("text-xl font-semibold", className)}
        {...props}
      />
    );
  }
);

DialogTitle.displayName = "DialogTitle";

// Dialog Description
export interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => {
  const { variant } = useDialogContext();

  return (
    <p
      ref={ref}
      className={cn(
        "mt-2 text-sm",
        variant === "glass" ? "text-white/70" : "text-surface-400",
        className
      )}
      {...props}
    />
  );
});

DialogDescription.displayName = "DialogDescription";

// Dialog Body
export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, ...props }, ref) => {
    const { variant } = useDialogContext();

    return (
      <div
        ref={ref}
        className={cn(
          "px-6 py-4",
          variant === "glass" ? "text-white/90" : "text-surface-300",
          className
        )}
        {...props}
      />
    );
  }
);

DialogBody.displayName = "DialogBody";

// Dialog Footer
export interface DialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => {
    const { variant } = useDialogContext();

    return (
      <div
        ref={ref}
        className={cn(
          "px-6 pb-6 pt-4",
          "flex items-center justify-end gap-3",
          variant === "default" && "border-t border-surface-700/50",
          className
        )}
        {...props}
      />
    );
  }
);

DialogFooter.displayName = "DialogFooter";

// Dialog Close (wraps a button that closes the dialog)
export interface DialogCloseProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const DialogClose = React.forwardRef<HTMLElement, DialogCloseProps>(
  ({ children, asChild = true, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialogContext();

    // By default, treat children as the close element (asChild behavior)
    if (React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<{
          onClick?: (e: React.MouseEvent) => void;
          ref?: React.Ref<HTMLElement>;
        }>,
        {
          onClick: (e: React.MouseEvent) => {
            // Call original onClick if exists
            const originalOnClick = (
              children as React.ReactElement<{
                onClick?: (e: React.MouseEvent) => void;
              }>
            ).props.onClick;
            originalOnClick?.(e);
            onOpenChange(false);
          },
          ref,
        }
      );
    }

    // Fallback to span wrapper if children is not an element
    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        onClick={(e) => {
          (onClick as React.MouseEventHandler<HTMLSpanElement>)?.(e);
          onOpenChange(false);
        }}
        style={{ cursor: "pointer" }}
        {...props}
      >
        {children}
      </span>
    );
  }
);

DialogClose.displayName = "DialogClose";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogOverlay,
};
