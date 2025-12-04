"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

// ============================================================================
// Popover Context
// ============================================================================

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | HTMLButtonElement>;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover");
  }
  return context;
};

// ============================================================================
// Popover Root
// ============================================================================

export interface PopoverProps {
  /** Controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether popover should be full width */
  fullWidth?: boolean;
  /** Custom className for the wrapper */
  className?: string;
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  fullWidth = false,
  className,
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLElement | HTMLButtonElement>(null);

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
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      <div
        className={cn(
          "relative",
          fullWidth ? "block w-full" : "inline-block",
          className
        )}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

// ============================================================================
// Popover Trigger
// ============================================================================

export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, asChild, onClick, ...props }, _ref) => {
    const { open, setOpen, triggerRef } = usePopoverContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(!open);
      onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref: triggerRef,
        onClick: handleClick,
        "aria-expanded": open,
        "aria-haspopup": "dialog",
        ...props,
      });
    }

    return (
      <button
        ref={triggerRef as React.RefObject<HTMLButtonElement>}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = "PopoverTrigger";

// ============================================================================
// Popover Content
// ============================================================================

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment of the popover */
  align?: "start" | "center" | "end";
  /** Side of the trigger to show */
  side?: "top" | "bottom" | "left" | "right";
  /** Offset from the trigger */
  sideOffset?: number;
  /** Whether to use portal */
  portal?: boolean;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      className,
      align = "center",
      side = "bottom",
      sideOffset = 8,
      portal = true,
      children,
      ...props
    },
    _ref
  ) => {
    const { open, setOpen, triggerRef } = usePopoverContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    const [mounted, setMounted] = React.useState(false);

    // Handle mounting for SSR
    React.useEffect(() => {
      setMounted(true);
    }, []);

    // Calculate position
    React.useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return;

      const updatePosition = () => {
        if (!triggerRef.current || !contentRef.current) return;

        const trigger = triggerRef.current.getBoundingClientRect();
        const content = contentRef.current.getBoundingClientRect();

        // For components with TextField, find the TextField container div (the one with w-full or w-fit)
        // This ensures we align with the actual TextField container, not the outer wrapper
        let actualTrigger = trigger;
        if (triggerRef.current && align === "start" && side === "bottom") {
          // Find the TextField container div (the outermost div that contains the input wrapper)
          const textFieldContainer = triggerRef.current.querySelector(
            'div[class*="w-full"], div[class*="w-fit"]'
          ) as HTMLElement;
          if (textFieldContainer) {
            const containerRect = textFieldContainer.getBoundingClientRect();
            // Use container if it has valid dimensions
            if (containerRect.width > 0 && containerRect.height > 0) {
              actualTrigger = containerRect;
            }
          }
        }

        let top = 0;
        let left = 0;

        // Calculate vertical position
        if (side === "bottom") {
          top = actualTrigger.bottom + sideOffset;
        } else if (side === "top") {
          top = actualTrigger.top - content.height - sideOffset;
        } else if (side === "left" || side === "right") {
          top = actualTrigger.top + (actualTrigger.height - content.height) / 2;
        }

        // Calculate horizontal position
        if (side === "left") {
          left = actualTrigger.left - content.width - sideOffset;
        } else if (side === "right") {
          left = actualTrigger.right + sideOffset;
        } else {
          // top or bottom
          if (align === "start") {
            left = actualTrigger.left;
          } else if (align === "end") {
            left = actualTrigger.right - content.width;
          } else {
            // center
            left =
              actualTrigger.left + (actualTrigger.width - content.width) / 2;
          }
        }

        // Keep within viewport (only adjust if absolutely necessary)
        const padding = 8;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (left + content.width > viewportWidth - padding) {
          left = Math.max(padding, viewportWidth - content.width - padding);
        } else if (left < padding) {
          left = padding;
        }

        // Only adjust vertical if it would overflow
        if (top + content.height > viewportHeight - padding) {
          // Try to show above instead
          if (side === "bottom") {
            top = trigger.top - content.height - sideOffset;
          }
          // If still doesn't fit, adjust to fit
          if (top < padding) {
            top = padding;
          }
          if (top + content.height > viewportHeight - padding) {
            top = Math.max(padding, viewportHeight - content.height - padding);
          }
        } else if (top < padding) {
          top = padding;
        }

        setPosition({ top: Math.round(top), left: Math.round(left) });
      };

      // Use double requestAnimationFrame to ensure DOM is ready and styles (including padding) are applied
      const rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updatePosition();
        });
      });

      // Also update on scroll and resize
      const handleScroll = () => updatePosition();
      const handleResize = () => updatePosition();

      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleResize);
      };
    }, [open, align, side, sideOffset, triggerRef, props.style]);

    // Close on click outside
    React.useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;

        // Check if click is inside PopoverContent
        if (contentRef.current && contentRef.current.contains(target)) {
          return;
        }

        // Check if click is on trigger
        if (triggerRef.current && triggerRef.current.contains(target)) {
          return;
        }

        // Check if click is inside any SelectContent (which might be rendered via portal)
        // SelectContent has z-[60] class and is rendered as a sibling to SelectTrigger
        const selectContent = document.querySelector('[role="listbox"]');
        if (selectContent && selectContent.contains(target)) {
          return;
        }

        // Also check if clicking on any SelectItem (role="option")
        // This is important for TimePicker where closeOnSelect={false}
        if (target instanceof HTMLElement) {
          const selectItem = target.closest('[role="option"]');
          if (selectItem) {
            return; // Don't close Popover when clicking on SelectItem
          }
        }

        // Check if click is inside any PopoverContent (nested popovers)
        const allPopovers = document.querySelectorAll('[role="dialog"]');
        for (const popover of allPopovers) {
          if (popover !== contentRef.current && popover.contains(target)) {
            return;
          }
        }

        setOpen(false);
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, setOpen, triggerRef]);

    if (!open || !mounted) return null;

    const content = (
      <div
        ref={contentRef}
        role="dialog"
        className={cn(
          "z-50 min-w-[200px]",
          // Only apply default padding if not provided via style prop
          !props.style?.padding && "p-4",
          "rounded-lg border border-surface-600",
          "bg-surface-800 text-surface-200",
          // 3D effect
          "shadow-[0_8px_24px_rgba(0,0,0,0.4),0_4px_0_0_rgba(0,0,0,0.2)]",
          // Animation
          "animate-[fade-in_150ms_ease-out]",
          className
        )}
        style={
          portal
            ? {
                position: "fixed",
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: "none",
                willChange: "transform",
                margin: 0,
                boxSizing: "border-box",
                ...(props.style || {}),
              }
            : props.style
        }
        {...props}
      >
        {children}
      </div>
    );

    if (portal && typeof document !== "undefined") {
      return createPortal(content, document.body);
    }

    return content;
  }
);

PopoverContent.displayName = "PopoverContent";

export { usePopoverContext };

// ============================================================================
// Popover Close
// ============================================================================

export interface PopoverCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ children, asChild, onClick, ...props }, ref) => {
    const { setOpen } = usePopoverContext();

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
      <button ref={ref} type="button" onClick={handleClick} {...props}>
        {children}
      </button>
    );
  }
);

PopoverClose.displayName = "PopoverClose";

// ============================================================================
// Popover Anchor (for custom positioning)
// ============================================================================

export interface PopoverAnchorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const PopoverAnchor = React.forwardRef<HTMLDivElement, PopoverAnchorProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

PopoverAnchor.displayName = "PopoverAnchor";

export { Popover, PopoverTrigger, PopoverContent, PopoverClose, PopoverAnchor };
