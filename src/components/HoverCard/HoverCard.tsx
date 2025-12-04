"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

// ============================================================================
// HoverCard Context
// ============================================================================

interface HoverCardContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
  openDelay: number;
  closeDelay: number;
  // Shared timeout refs for coordinated hover behavior
  openTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>;
  closeTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>;
  handleOpen: () => void;
  handleClose: () => void;
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(
  null
);

const useHoverCardContext = () => {
  const context = React.useContext(HoverCardContext);
  if (!context) {
    throw new Error("HoverCard components must be used within a HoverCard");
  }
  return context;
};

// ============================================================================
// HoverCard Root
// ============================================================================

export interface HoverCardProps {
  /** Controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Delay before opening (ms) */
  openDelay?: number;
  /** Delay before closing (ms) */
  closeDelay?: number;
  children: React.ReactNode;
}

const HoverCard: React.FC<HoverCardProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  openDelay = 200,
  closeDelay = 300,
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLElement>(null);
  const openTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

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

  // Shared handlers for coordinated hover behavior
  const handleOpen = React.useCallback(() => {
    clearTimeout(closeTimeoutRef.current);
    // If already open, keep it open immediately (no delay needed)
    if (open) {
      return;
    }
    openTimeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, openDelay);
  }, [open, openDelay, setOpen]);

  const handleClose = React.useCallback(() => {
    clearTimeout(openTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  }, [closeDelay, setOpen]);

  // Cleanup timeouts on unmount
  React.useEffect(() => {
    return () => {
      clearTimeout(openTimeoutRef.current);
      clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <HoverCardContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
        openDelay,
        closeDelay,
        openTimeoutRef,
        closeTimeoutRef,
        handleOpen,
        handleClose,
      }}
    >
      <div className="relative inline-block">{children}</div>
    </HoverCardContext.Provider>
  );
};

// ============================================================================
// HoverCard Trigger
// ============================================================================

export interface HoverCardTriggerProps
  extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const HoverCardTrigger = React.forwardRef<HTMLElement, HoverCardTriggerProps>(
  ({ children, asChild, ...props }, _ref) => {
    const { triggerRef, handleOpen, handleClose } = useHoverCardContext();

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref: triggerRef,
        onMouseEnter: handleOpen,
        onMouseLeave: handleClose,
        ...props,
      });
    }

    return (
      <span
        ref={triggerRef as React.RefObject<HTMLSpanElement>}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        {...props}
      >
        {children}
      </span>
    );
  }
);

HoverCardTrigger.displayName = "HoverCardTrigger";

// ============================================================================
// HoverCard Content
// ============================================================================

export interface HoverCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment of the card */
  align?: "start" | "center" | "end";
  /** Side to show the card */
  side?: "top" | "bottom";
  /** Offset from the trigger */
  sideOffset?: number;
}

const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(
  (
    {
      className,
      align = "center",
      side = "bottom",
      sideOffset = 8,
      children,
      ...props
    },
    ref
  ) => {
    const { open, triggerRef, handleOpen, handleClose } = useHoverCardContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    // Calculate position
    React.useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return;

      const trigger = triggerRef.current.getBoundingClientRect();
      const content = contentRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      // Vertical position
      if (side === "bottom") {
        top = trigger.bottom + sideOffset;
      } else {
        top = trigger.top - content.height - sideOffset;
      }

      // Horizontal alignment
      if (align === "start") {
        left = trigger.left;
      } else if (align === "end") {
        left = trigger.right - content.width;
      } else {
        left = trigger.left + (trigger.width - content.width) / 2;
      }

      // Keep within viewport
      const padding = 8;
      left = Math.max(
        padding,
        Math.min(left, window.innerWidth - content.width - padding)
      );
      top = Math.max(
        padding,
        Math.min(top, window.innerHeight - content.height - padding)
      );

      setPosition({ top, left });
    }, [open, align, side, sideOffset, triggerRef]);

    // When mouse enters content, cancel any pending close
    const handleContentMouseEnter = () => {
      handleOpen(); // This cancels close timeout and keeps it open
    };

    // When mouse leaves content, start close timeout
    const handleContentMouseLeave = () => {
      handleClose();
    };

    if (!open || !mounted) return null;

    const content = (
      <div
        ref={contentRef}
        onMouseEnter={handleContentMouseEnter}
        onMouseLeave={handleContentMouseLeave}
        className={cn(
          "z-50 w-64 p-4",
          "rounded-lg border border-surface-600",
          "bg-surface-800 text-surface-200",
          // 3D effect
          "shadow-[0_8px_24px_rgba(0,0,0,0.4),0_4px_0_0_rgba(0,0,0,0.2)]",
          // Animation
          "animate-[fade-in_150ms_ease-out]",
          className
        )}
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
        }}
        {...props}
      >
        <div ref={ref}>{children}</div>
      </div>
    );

    if (typeof document !== "undefined") {
      return createPortal(content, document.body);
    }

    return null;
  }
);

HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };
