"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Sheet Context
// ============================================================================

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

const useSheetContext = () => {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet components must be used within a Sheet");
  }
  return context;
};

// ============================================================================
// Sheet Root
// ============================================================================

export interface SheetProps {
  /** Controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Sheet: React.FC<SheetProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
};

// ============================================================================
// Sheet Trigger
// ============================================================================

export interface SheetTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ children, asChild, onClick, ...props }, ref) => {
    const { setOpen } = useSheetContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(true);
      onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        onClick: handleClick,
        ...props,
      });
    }

    return (
      <button ref={ref} type="button" onClick={handleClick} {...props}>
        {children}
      </button>
    );
  }
);

SheetTrigger.displayName = "SheetTrigger";

// ============================================================================
// Sheet Portal
// ============================================================================

interface SheetPortalProps {
  children: React.ReactNode;
}

const SheetPortal: React.FC<SheetPortalProps> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(children, document.body);
};

// ============================================================================
// Sheet Overlay
// ============================================================================

export interface SheetOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SheetOverlay = React.forwardRef<HTMLDivElement, SheetOverlayProps>(
  ({ className, ...props }, ref) => {
    const { open, setOpen } = useSheetContext();

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
          "data-[state=open]:animate-[fade-in_200ms_ease-out]",
          "data-[state=closed]:animate-[fade-out_200ms_ease-in]",
          className
        )}
        data-state={open ? "open" : "closed"}
        onClick={() => setOpen(false)}
        {...props}
      />
    );
  }
);

SheetOverlay.displayName = "SheetOverlay";

// ============================================================================
// Sheet Content Variants
// ============================================================================

const sheetContentVariants = cva(
  [
    "fixed z-50 flex flex-col",
    "bg-surface-800 border-surface-700",
    // 3D effect
    "shadow-[0_0_50px_rgba(0,0,0,0.5)]",
  ],
  {
    variants: {
      side: {
        top: [
          "inset-x-0 top-0 border-b",
          "data-[state=open]:animate-[slide-in-from-top_300ms_ease-out]",
          "data-[state=closed]:animate-[slide-out-to-top_300ms_ease-in]",
        ],
        bottom: [
          "inset-x-0 bottom-0 border-t",
          "data-[state=open]:animate-[slide-in-from-bottom_300ms_ease-out]",
          "data-[state=closed]:animate-[slide-out-to-bottom_300ms_ease-in]",
        ],
        left: [
          "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r",
          "data-[state=open]:animate-[slide-in-from-left_300ms_ease-out]",
          "data-[state=closed]:animate-[slide-out-to-left_300ms_ease-in]",
        ],
        right: [
          "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l",
          "data-[state=open]:animate-[slide-in-from-right_300ms_ease-out]",
          "data-[state=closed]:animate-[slide-out-to-right_300ms_ease-in]",
        ],
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

// ============================================================================
// Sheet Content
// ============================================================================

export interface SheetContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetContentVariants> {}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, side = "right", children, ...props }, ref) => {
    const { open, setOpen } = useSheetContext();

    // Handle escape key
    React.useEffect(() => {
      if (!open) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, setOpen]);

    // Prevent body scroll
    React.useEffect(() => {
      if (!open) return;

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [open]);

    if (!open) return null;

    return (
      <SheetPortal>
        <SheetOverlay />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          data-state={open ? "open" : "closed"}
          className={cn(sheetContentVariants({ side }), className)}
          {...props}
        >
          {children}
          <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-surface-900 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <svg
              className="h-5 w-5 text-surface-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
      </SheetPortal>
    );
  }
);

SheetContent.displayName = "SheetContent";

// ============================================================================
// Sheet Close
// ============================================================================

export interface SheetCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ children, asChild, onClick, className, ...props }, ref) => {
    const { setOpen } = useSheetContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(false);
      onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        onClick: handleClick,
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SheetClose.displayName = "SheetClose";

// ============================================================================
// Sheet Header
// ============================================================================

export interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-2 p-6 pb-0 text-left",
        className
      )}
      {...props}
    />
  )
);

SheetHeader.displayName = "SheetHeader";

// ============================================================================
// Sheet Footer
// ============================================================================

export interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SheetFooter = React.forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0",
        className
      )}
      {...props}
    />
  )
);

SheetFooter.displayName = "SheetFooter";

// ============================================================================
// Sheet Title
// ============================================================================

export interface SheetTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const SheetTitle = React.forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-lg font-semibold text-surface-100", className)}
      {...props}
    />
  )
);

SheetTitle.displayName = "SheetTitle";

// ============================================================================
// Sheet Description
// ============================================================================

export interface SheetDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  SheetDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-surface-400", className)}
    {...props}
  />
));

SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetTrigger,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetContentVariants,
};

