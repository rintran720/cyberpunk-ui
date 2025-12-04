import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Context for Accordion
interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
  variant: "default" | "bordered" | "elevated" | "glass";
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

// Context for AccordionItem
interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

const useAccordionItemContext = () => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionItem components must be used within an AccordionItem");
  }
  return context;
};

// Accordion Root
const accordionVariants = cva("w-full", {
  variants: {
      variant: {
        default: "space-y-2",
        bordered: "space-y-0 border border-cyber rounded-xl overflow-hidden shadow-cyber-border",
        elevated: "space-y-3",
        glass: "space-y-2",
      },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  /** Allow single or multiple items to be expanded */
  type?: "single" | "multiple";
  /** Default expanded items */
  defaultValue?: string[];
  /** Controlled expanded items */
  value?: string[];
  /** Callback when expanded items change */
  onValueChange?: (value: string[]) => void;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      variant = "default",
      type = "single",
      defaultValue = [],
      value,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const [expandedItems, setExpandedItems] = React.useState<string[]>(defaultValue);
    
    const isControlled = value !== undefined;
    const currentItems = isControlled ? value : expandedItems;

    const toggleItem = React.useCallback(
      (itemValue: string) => {
        let newItems: string[];
        
        if (type === "single") {
          newItems = currentItems.includes(itemValue) ? [] : [itemValue];
        } else {
          newItems = currentItems.includes(itemValue)
            ? currentItems.filter((v) => v !== itemValue)
            : [...currentItems, itemValue];
        }

        if (!isControlled) {
          setExpandedItems(newItems);
        }
        onValueChange?.(newItems);
      },
      [type, currentItems, isControlled, onValueChange]
    );

    return (
      <AccordionContext.Provider
        value={{ expandedItems: currentItems, toggleItem, type, variant: variant || "default" }}
      >
        <div
          ref={ref}
          className={cn(accordionVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";

// Accordion Item
const accordionItemVariants = cva(
  "overflow-hidden transition-all duration-200",
  {
    variants: {
      variant: {
        default: [
          "rounded-xl",
          "bg-black/80",
          "border border-cyber",
          "shadow-cyber-border",
        ],
        bordered: [
          "border-b border-cyber",
          "last:border-b-0",
          "bg-black/50",
        ],
        elevated: [
          "rounded-xl",
          "bg-black/90",
          "border border-cyber",
          "shadow-cyber-border-lg",
        ],
        glass: [
          "rounded-xl",
          "bg-black/50 backdrop-blur-md",
          "border border-cyber",
          "shadow-cyber-border",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique value for the item */
  value: string;
  /** Disabled state */
  disabled?: boolean;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    const { expandedItems, variant } = useAccordionContext();
    const isExpanded = expandedItems.includes(value);

    return (
      <AccordionItemContext.Provider value={{ value, isExpanded }}>
        <div
          ref={ref}
          data-state={isExpanded ? "open" : "closed"}
          data-disabled={disabled || undefined}
          className={cn(
            accordionItemVariants({ variant }),
            disabled && "opacity-50 pointer-events-none",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

// Accordion Trigger
const accordionTriggerVariants = cva(
  [
    "flex items-center justify-between w-full",
    "text-left font-medium",
    "transition-all duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "cursor-pointer select-none",
    // Highlight on top for 3D effect
    "relative",
  ],
  {
    variants: {
      variant: {
        default: [
          "px-5 py-4",
          "text-primary-500 font-mono",
          "hover:bg-primary-500/10",
          "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary-500/30 before:to-transparent",
        ],
        bordered: [
          "px-5 py-4",
          "text-primary-500 font-mono",
          "hover:bg-primary-500/10",
        ],
        elevated: [
          "px-5 py-4",
          "text-primary-500 font-mono",
          "hover:bg-primary-500/10",
          "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary-500/50 before:to-transparent",
        ],
        glass: [
          "px-5 py-4",
          "text-primary-500 font-mono",
          "hover:bg-primary-500/10",
        ],
      },
      size: {
        sm: "px-4 py-3 text-sm",
        md: "px-5 py-4 text-base",
        lg: "px-6 py-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof accordionTriggerVariants> {
  /** Custom icon instead of chevron */
  icon?: React.ReactNode;
  /** Hide the expand icon */
  hideIcon?: boolean;
}

const ChevronIcon = ({ className }: { className?: string }) => (
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
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, size, icon, hideIcon = false, children, ...props }, ref) => {
    const { toggleItem, variant } = useAccordionContext();
    const { value, isExpanded } = useAccordionItemContext();

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isExpanded}
        onClick={() => toggleItem(value)}
        className={cn(accordionTriggerVariants({ variant, size }), className)}
        {...props}
      >
        <span className="flex-1">{children}</span>
        {!hideIcon && (
          <span
            className={cn(
              "ml-4 shrink-0 transition-transform duration-300 ease-out",
              "text-primary-500/70",
              isExpanded && "rotate-180 text-primary-500"
            )}
          >
            {icon || <ChevronIcon />}
          </span>
        )}
      </button>
    );
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

// Accordion Content
const accordionContentVariants = cva(
  [
    "overflow-hidden",
    "transition-all duration-300 ease-out",
  ],
  {
    variants: {
      variant: {
        default: "text-primary-500/70 font-mono",
        bordered: "text-primary-500/70 font-mono border-t border-cyber",
        elevated: "text-primary-500/70 font-mono",
        glass: "text-primary-500/70 font-mono",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useAccordionContext();
    const { isExpanded } = useAccordionItemContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState<number>(0);

    React.useEffect(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    }, [children]);

    return (
      <div
        ref={ref}
        role="region"
        className={cn(accordionContentVariants({ variant }), className)}
        style={{
          height: isExpanded ? height : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        {...props}
      >
        <div ref={contentRef} className="px-5 pb-4 pt-2">
          {children}
        </div>
      </div>
    );
  }
);

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

