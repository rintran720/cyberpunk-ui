import * as React from "react";
import { cn } from "../../lib/utils";

// ============================================================================
// Tooltip Context
// ============================================================================

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within a TooltipProvider");
  }
  return context;
};

// ============================================================================
// Tooltip Provider (optional global config)
// ============================================================================

export interface TooltipProviderProps {
  /** Delay before showing tooltip (ms) */
  delayDuration?: number;
  /** Skip delay when moving between tooltips */
  skipDelayDuration?: number;
  children: React.ReactNode;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  return <>{children}</>;
};

// ============================================================================
// Tooltip Root
// ============================================================================

export interface TooltipProps {
  /** Whether the tooltip is open (controlled) */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Delay before showing (ms) */
  delayDuration?: number;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delayDuration = 200,
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLElement>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (newOpen) {
        timeoutRef.current = setTimeout(() => {
          if (!isControlled) {
            setUncontrolledOpen(true);
          }
          onOpenChange?.(true);
        }, delayDuration);
      } else {
        if (!isControlled) {
          setUncontrolledOpen(false);
        }
        onOpenChange?.(false);
      }
    },
    [isControlled, onOpenChange, delayDuration]
  );

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <TooltipContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </TooltipContext.Provider>
  );
};

// ============================================================================
// Tooltip Trigger
// ============================================================================

export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ children, asChild, ...props }, _ref) => {
    const { setOpen, triggerRef } = useTooltipContext();

    const handleMouseEnter = () => setOpen(true);
    const handleMouseLeave = () => setOpen(false);
    const handleFocus = () => setOpen(true);
    const handleBlur = () => setOpen(false);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref: triggerRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        ...props,
      });
    }

    return (
      <span
        ref={triggerRef as React.RefObject<HTMLSpanElement>}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        {...props}
      >
        {children}
      </span>
    );
  }
);

TooltipTrigger.displayName = "TooltipTrigger";

// ============================================================================
// Tooltip Content
// ============================================================================

type TooltipSide = "top" | "right" | "bottom" | "left";
type TooltipAlign = "start" | "center" | "end";

export interface TooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Side of the trigger to show tooltip */
  side?: TooltipSide;
  /** Alignment along the side */
  align?: TooltipAlign;
  /** Offset from trigger (px) */
  sideOffset?: number;
}

const sideStyles: Record<TooltipSide, string> = {
  top: "bottom-full mb-2",
  bottom: "top-full mt-2",
  left: "right-full mr-2",
  right: "left-full ml-2",
};

const alignStyles: Record<TooltipAlign, Record<TooltipSide, string>> = {
  start: {
    top: "left-0",
    bottom: "left-0",
    left: "top-0",
    right: "top-0",
  },
  center: {
    top: "left-1/2 -translate-x-1/2",
    bottom: "left-1/2 -translate-x-1/2",
    left: "top-1/2 -translate-y-1/2",
    right: "top-1/2 -translate-y-1/2",
  },
  end: {
    top: "right-0",
    bottom: "right-0",
    left: "bottom-0",
    right: "bottom-0",
  },
};

const arrowStyles: Record<TooltipSide, string> = {
  top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-surface-700 border-x-transparent border-b-transparent",
  bottom:
    "top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-surface-700 border-x-transparent border-t-transparent",
  left: "right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-surface-700 border-y-transparent border-r-transparent",
  right:
    "left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-surface-700 border-y-transparent border-l-transparent",
};

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      className,
      side = "top",
      align = "center",
      sideOffset = 0,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const { open } = useTooltipContext();

    if (!open) return null;

    return (
      <div
        ref={ref}
        role="tooltip"
        className={cn(
          "absolute z-50 px-3 py-1.5",
          "text-sm text-surface-100",
          "rounded-lg",
          "whitespace-nowrap",
          // 3D effect
          "bg-surface-800 border border-surface-600",
          "shadow-[0_4px_8px_rgba(0,0,0,0.3),0_2px_0_0_rgba(0,0,0,0.2)]",
          // Simple fade animation (no slide to avoid transform conflicts)
          "animate-[tooltip-in_150ms_ease-out]",
          sideStyles[side],
          alignStyles[align][side],
          className
        )}
        style={{
          ...style,
          ...(sideOffset && side === "top"
            ? { marginBottom: sideOffset + 8 }
            : {}),
          ...(sideOffset && side === "bottom"
            ? { marginTop: sideOffset + 8 }
            : {}),
          ...(sideOffset && side === "left"
            ? { marginRight: sideOffset + 8 }
            : {}),
          ...(sideOffset && side === "right"
            ? { marginLeft: sideOffset + 8 }
            : {}),
        }}
        {...props}
      >
        {children}
        {/* Arrow */}
        <span className={cn("absolute w-0 h-0 border-4", arrowStyles[side])} />
      </div>
    );
  }
);

TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
