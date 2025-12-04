"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

// ============================================================================
// Collapsible Context
// ============================================================================

interface CollapsibleContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled?: boolean;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(
  null
);

const useCollapsibleContext = () => {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      "Collapsible components must be used within a Collapsible"
    );
  }
  return context;
};

// ============================================================================
// Collapsible Root
// ============================================================================

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether the collapsible is disabled */
  disabled?: boolean;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] =
      React.useState(defaultOpen);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = React.useCallback(
      (newOpen: boolean) => {
        if (disabled) return;
        if (!isControlled) {
          setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [isControlled, onOpenChange, disabled]
    );

    return (
      <CollapsibleContext.Provider value={{ open, setOpen, disabled }}>
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          className={className}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);

Collapsible.displayName = "Collapsible";

// ============================================================================
// Collapsible Trigger
// ============================================================================

export interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ children, asChild, onClick, className, disabled: triggerDisabled, ...props }, ref) => {
  const { open, setOpen, disabled: contextDisabled } = useCollapsibleContext();
  const disabled = triggerDisabled || contextDisabled;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      setOpen(!open);
    }
    onClick?.(e);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
      "aria-expanded": open,
      "aria-controls": "collapsible-content",
      disabled,
      ...props,
    });
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-controls="collapsible-content"
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "flex items-center justify-between w-full",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

CollapsibleTrigger.displayName = "CollapsibleTrigger";

// ============================================================================
// Collapsible Content
// ============================================================================

export interface CollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Force mount the content (useful for animations) */
  forceMount?: boolean;
}

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ className, children, forceMount, ...props }, ref) => {
  const { open } = useCollapsibleContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | undefined>(
    open ? undefined : 0
  );

  React.useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (open) {
      const contentHeight = content.scrollHeight;
      setHeight(contentHeight);
      // After animation, set to auto for dynamic content
      const timer = setTimeout(() => setHeight(undefined), 300);
      return () => clearTimeout(timer);
    } else {
      // First set to actual height, then to 0
      setHeight(content.scrollHeight);
      requestAnimationFrame(() => {
        setHeight(0);
      });
    }
  }, [open]);

  if (!forceMount && !open && height === 0) {
    return null;
  }

  return (
    <div
      ref={contentRef}
      id="collapsible-content"
      data-state={open ? "open" : "closed"}
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        className
      )}
      style={{ height: height !== undefined ? `${height}px` : "auto" }}
      {...props}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
});

CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

