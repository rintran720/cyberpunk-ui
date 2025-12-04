import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Select Context
// ============================================================================

interface SelectContextValue {
  value: string;
  displayValue: string;
  onValueChange: (value: string, displayValue: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled?: boolean;
  closeOnSelect?: boolean;
  registerItem: (value: string, displayText: string) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select provider");
  }
  return context;
};

// ============================================================================
// Select Root
// ============================================================================

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The controlled value */
  value?: string;
  /** Default value for uncontrolled */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether to close dropdown after selecting a value */
  closeOnSelect?: boolean;
  /** Children */
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  disabled,
  closeOnSelect = true,
  className,
  children,
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);
  const [displayValue, setDisplayValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  // Registry to map value -> displayText
  const itemsRef = React.useRef<Map<string, string>>(new Map());

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  // Register item's value-displayText mapping
  const registerItem = React.useCallback(
    (itemValue: string, displayText: string) => {
      itemsRef.current.set(itemValue, displayText);

      // If this item matches the current value and displayValue is empty, set it
      if (itemValue === value && !displayValue) {
        setDisplayValue(displayText);
      }
    },
    [value, displayValue]
  );

  const handleValueChange = (newValue: string, newDisplayValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    setDisplayValue(newDisplayValue);
    onValueChange?.(newValue);
    if (closeOnSelect) {
      setOpen(false);
    }
  };

  return (
    <SelectContext.Provider
      value={{
        value,
        displayValue,
        onValueChange: handleValueChange,
        open,
        setOpen,
        disabled,
        closeOnSelect,
        registerItem,
      }}
    >
      <div className={cn("relative inline-block", className)} {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

// ============================================================================
// Select Trigger
// ============================================================================

const selectTriggerVariants = cva(
  [
    "inline-flex items-center justify-between gap-2 rounded-lg px-4 py-2.5",
    "text-sm font-medium text-surface-100",
    "border border-surface-600",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // 3D effect
    "bg-surface-800",
    "shadow-[0_4px_0_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.05)]",
    "hover:shadow-[0_2px_0_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.05)]",
    "hover:translate-y-[2px]",
    "active:shadow-[0_0px_0_0_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(0,0,0,0.2)]",
    "active:translate-y-[4px]",
  ],
  {
    variants: {
      size: {
        sm: "h-8 text-xs px-3",
        md: "h-10 text-sm px-4",
        lg: "h-12 text-base px-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// Chevron Icon
const ChevronIcon = ({
  className,
  open,
}: {
  className?: string;
  open?: boolean;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(
      "h-4 w-4 transition-transform duration-200",
      open && "rotate-180",
      className
    )}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof selectTriggerVariants> {
  /** Placeholder text */
  placeholder?: string;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    { className, size, placeholder = "Select an option", children, ...props },
    ref
  ) => {
    const { value, displayValue, open, setOpen, disabled } = useSelectContext();

    // Use displayValue if available, otherwise fallback to value or placeholder
    const displayText = displayValue || (value ? value : placeholder);

    return (
      <button
        ref={ref}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={cn(
          selectTriggerVariants({ size }),
          "min-w-[180px]",
          className
        )}
        {...props}
      >
        <span className={cn(!value && "text-surface-400")}>
          {children || displayText}
        </span>
        <ChevronIcon open={open} className="text-surface-400" />
      </button>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";

// ============================================================================
// Select Value
// ============================================================================

export interface SelectValueProps {
  /** Placeholder when no value is selected */
  placeholder?: string;
}

const SelectValue: React.FC<SelectValueProps> = ({
  placeholder = "Select...",
}) => {
  const { value, displayValue } = useSelectContext();
  // Show displayValue if available, otherwise show placeholder
  const text = displayValue || (value ? value : placeholder);
  return <span className={cn(!value && "text-surface-400")}>{text}</span>;
};

// ============================================================================
// Select Content
// ============================================================================

export interface SelectContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, _ref) => {
    const { open, setOpen, closeOnSelect } = useSelectContext();
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Close on click outside (only if closeOnSelect is true, or if clicking truly outside)
    React.useEffect(() => {
      if (!open) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        // If closeOnSelect is false, only close when clicking outside the entire SelectContent
        // Don't close when clicking on any SelectItem
        const clickedOption = target.closest('[role="option"]');
        if (clickedOption) {
          // Always prevent closing when clicking on any option if closeOnSelect is false
          if (closeOnSelect === false) {
            return;
          }
          // If closeOnSelect is true, check if this option is within our SelectContent
          if (
            contentRef.current &&
            contentRef.current.contains(clickedOption)
          ) {
            return; // Don't close if clicking on our own option (will be handled by closeOnSelect logic)
          }
        }

        // Don't close if clicking on another SelectContent (for nested selects)
        const clickedListbox = target.closest('[role="listbox"]');
        if (clickedListbox && clickedListbox !== contentRef.current) {
          return;
        }

        // Only close if click is truly outside
        if (contentRef.current && !contentRef.current.contains(target)) {
          // Check if click was on trigger
          const trigger = contentRef.current.previousElementSibling;
          if (trigger && !trigger.contains(target)) {
            // Double check: make sure we're not clicking on any SelectItem
            const allOptions = document.querySelectorAll('[role="option"]');
            for (const option of allOptions) {
              if (option.contains(target)) {
                return; // Don't close if clicking on any option
              }
            }
            setOpen(false);
          }
        }
      };

      // Use capture phase and a small delay to ensure SelectItem click processes first
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside, true);
      }, 50);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside, true);
      };
    }, [open, setOpen, closeOnSelect]);

    // Auto-position: top or bottom based on viewport
    const [position, setPosition] = React.useState<"top" | "bottom">("bottom");
    const triggerRef = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
      if (!open || !contentRef.current) return;

      // Find the trigger element (previous sibling)
      const trigger = contentRef.current.previousElementSibling as HTMLElement;
      if (!trigger) return;

      triggerRef.current = trigger;

      const updatePosition = () => {
        if (!contentRef.current || !trigger) return;

        const triggerRect = trigger.getBoundingClientRect();
        const contentHeight = 200; // max-h-[200px]
        const spaceBelow = window.innerHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;

        // If not enough space below but enough space above, show on top
        if (spaceBelow < contentHeight && spaceAbove > spaceBelow) {
          setPosition("top");
        } else {
          setPosition("bottom");
        }
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [open]);

    // Always render children (hidden when closed) so items can register
    // This ensures defaultValue can find its display text
    return (
      <div
        ref={contentRef}
        role="listbox"
        data-select-content="true"
        className={cn(
          "absolute z-50 w-full min-w-[180px]",
          position === "bottom" ? "mt-2" : "mb-2 bottom-full",
          "rounded-lg border border-surface-600",
          "bg-surface-800 p-1",
          // 3D effect
          "shadow-[0_8px_16px_rgba(0,0,0,0.3),0_4px_0_0_rgba(0,0,0,0.2)]",
          // Show/hide based on open state
          open
            ? position === "bottom"
              ? "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
              : "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2"
            : "invisible opacity-0 pointer-events-none",
          // Scrollable content with max height
          "max-h-[200px] overflow-y-auto",
          className
        )}
        onMouseDown={(e) => {
          // Prevent Popover from closing when clicking inside SelectContent
          e.stopPropagation();
        }}
        onClick={(e) => {
          // Prevent Popover from closing when clicking inside SelectContent
          e.stopPropagation();
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectContent.displayName = "SelectContent";

// ============================================================================
// Select Item
// ============================================================================

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The value of this item */
  value: string;
  /** Whether this item is disabled */
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, value, disabled, children, ...props }, ref) => {
    const {
      value: selectedValue,
      onValueChange,
      registerItem,
    } = useSelectContext();
    const isSelected = selectedValue === value;

    // Get text content from children for display
    const getTextContent = (node: React.ReactNode): string => {
      if (typeof node === "string") return node;
      if (typeof node === "number") return String(node);
      if (Array.isArray(node)) return node.map(getTextContent).join("");
      if (React.isValidElement(node) && node.props.children) {
        return getTextContent(node.props.children);
      }
      return "";
    };

    const displayText = getTextContent(children);

    // Register this item's value-displayText mapping on mount
    React.useEffect(() => {
      registerItem(value, displayText);
    }, [value, displayText, registerItem]);

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        onValueChange(value, displayText);
      }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-state={isSelected ? "checked" : "unchecked"}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-md px-3 py-2",
          "text-sm text-surface-200",
          "transition-colors duration-150",
          "hover:bg-surface-700 hover:text-surface-100",
          "focus:bg-surface-700 focus:outline-none",
          isSelected && "bg-primary-500/20 text-primary-400",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        <span className="flex-1">{children}</span>
        {isSelected && (
          <svg
            className="h-4 w-4 text-primary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    );
  }
);

SelectItem.displayName = "SelectItem";

// ============================================================================
// Select Group
// ============================================================================

export interface SelectGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn("py-1", className)}
        {...props}
      />
    );
  }
);

SelectGroup.displayName = "SelectGroup";

// ============================================================================
// Select Label
// ============================================================================

export interface SelectLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-3 py-1.5 text-xs font-semibold text-surface-400 uppercase tracking-wider",
          className
        )}
        {...props}
      />
    );
  }
);

SelectLabel.displayName = "SelectLabel";

// ============================================================================
// Select Separator
// ============================================================================

const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("my-1 h-px bg-surface-700", className)}
      {...props}
    />
  );
});

SelectSeparator.displayName = "SelectSeparator";

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  selectTriggerVariants,
};
