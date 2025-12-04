import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Tabs Context
// ============================================================================

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
};

// ============================================================================
// Tabs Root
// ============================================================================

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The controlled value of the tab to activate */
  value?: string;
  /** The default value of the tab to activate (uncontrolled) */
  defaultValue?: string;
  /** Callback when the active tab changes */
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      defaultValue ?? ""
    );

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

// ============================================================================
// Tabs List
// ============================================================================

const tabsListVariants = cva(
  [
    "inline-flex items-center justify-center rounded-lg p-1",
    "bg-surface-800/50",
    // 3D inset effect
    "shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
    "border border-surface-700/50",
  ],
  {
    variants: {
      variant: {
        default: "",
        pills: "gap-1 bg-transparent shadow-none border-none p-0",
        underline:
          "bg-transparent shadow-none border-none rounded-none border-b border-surface-700 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

TabsList.displayName = "TabsList";

// ============================================================================
// Tabs Trigger
// ============================================================================

const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2",
    "text-sm font-medium text-surface-400",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "data-[state=active]:bg-surface-700",
          "data-[state=active]:text-surface-100",
          "data-[state=active]:shadow-[0_2px_4px_rgba(0,0,0,0.2)]",
          "hover:text-surface-200",
        ],
        pills: [
          "rounded-lg",
          "data-[state=active]:bg-primary-500",
          "data-[state=active]:text-white",
          "data-[state=active]:shadow-3d",
          "hover:bg-surface-800",
        ],
        underline: [
          "rounded-none border-b-2 border-transparent pb-3",
          "data-[state=active]:border-primary-500",
          "data-[state=active]:text-primary-400",
          "hover:text-surface-200",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  /** The value of the tab */
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, variant, value, children, ...props }, ref) => {
    const { value: activeValue, onValueChange } = useTabsContext();
    const isActive = activeValue === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        onClick={() => onValueChange(value)}
        className={cn(tabsTriggerVariants({ variant }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

// ============================================================================
// Tabs Content
// ============================================================================

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The value of the tab this content is associated with */
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: activeValue } = useTabsContext();
    const isActive = activeValue === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state={isActive ? "active" : "inactive"}
        className={cn(
          "mt-4 focus-visible:outline-none",
          "animate-in fade-in-0 slide-in-from-bottom-2 duration-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = "TabsContent";

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
};
