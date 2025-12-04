"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Toggle Variants
// ============================================================================

const toggleVariants = cva(
  // Base styles - Cyberpunk
  [
    "inline-flex items-center justify-center rounded-md font-medium font-mono",
    "transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:pointer-events-none disabled:opacity-50",
    "border",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-black/80 border-cyber text-primary-500",
          "hover:bg-primary-500/10 hover:border-cyber-hover",
          "shadow-cyber-border",
          "active:shadow-cyber-border-lg",
          // Pressed state
          "data-[state=on]:bg-primary-500 data-[state=on]:border-primary-500 data-[state=on]:text-black",
          "data-[state=on]:shadow-cyber-primary",
        ],
        outline: [
          "bg-transparent border-cyber text-primary-500",
          "hover:bg-primary-500/10 hover:border-cyber-hover",
          "shadow-cyber-border",
          "active:shadow-cyber-border-lg",
          // Pressed state
          "data-[state=on]:bg-primary-500/20 data-[state=on]:border-primary-500 data-[state=on]:text-primary-500",
        ],
        ghost: [
          "bg-transparent border-transparent text-primary-500",
          "hover:bg-primary-500/10",
          // Pressed state
          "data-[state=on]:bg-primary-500/20 data-[state=on]:text-primary-500",
        ],
      },
      size: {
        sm: "h-8 px-2 text-xs gap-1",
        md: "h-9 px-3 text-sm gap-2",
        lg: "h-10 px-4 text-base gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ============================================================================
// Toggle Component
// ============================================================================

export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  /** Whether the toggle is pressed */
  pressed?: boolean;
  /** Default pressed state (uncontrolled) */
  defaultPressed?: boolean;
  /** Callback when pressed state changes */
  onPressedChange?: (pressed: boolean) => void;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant,
      size,
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledPressed, setUncontrolledPressed] = React.useState(defaultPressed);
    
    const isControlled = controlledPressed !== undefined;
    const pressed = isControlled ? controlledPressed : uncontrolledPressed;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newPressed = !pressed;
      if (!isControlled) {
        setUncontrolledPressed(newPressed);
      }
      onPressedChange?.(newPressed);
      props.onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        data-state={pressed ? "on" : "off"}
        className={cn(toggleVariants({ variant, size }), className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Toggle.displayName = "Toggle";

// ============================================================================
// Toggle Group Context
// ============================================================================

interface ToggleGroupContextValue {
  type: "single" | "multiple";
  value: string | string[];
  onValueChange: (value: string) => void;
  variant?: VariantProps<typeof toggleVariants>["variant"];
  size?: VariantProps<typeof toggleVariants>["size"];
  disabled?: boolean;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null);

const useToggleGroupContext = () => {
  return React.useContext(ToggleGroupContext);
};

// ============================================================================
// Toggle Group
// ============================================================================

export interface ToggleGroupSingleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toggleVariants> {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export interface ToggleGroupMultipleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toggleVariants> {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
}

export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (props, ref) => {
    const {
      className,
      variant,
      size,
      type,
      disabled,
      children,
      ...restProps
    } = props;

    // Handle single type
    if (type === "single") {
      const {
        value: controlledValue,
        defaultValue = "",
        onValueChange,
        ...divProps
      } = restProps as Omit<ToggleGroupSingleProps, "type" | "className" | "variant" | "size" | "disabled" | "children">;

      const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
      const isControlled = controlledValue !== undefined;
      const value = isControlled ? controlledValue : uncontrolledValue;

      const handleValueChange = (itemValue: string) => {
        const newValue = value === itemValue ? "" : itemValue;
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
      };

      return (
        <ToggleGroupContext.Provider
          value={{ type, value, onValueChange: handleValueChange, variant, size, disabled }}
        >
          <div
            ref={ref}
            role="group"
            className={cn("inline-flex gap-1 rounded-lg p-1 bg-black/50 border border-cyber", className)}
            {...divProps}
          >
            {children}
          </div>
        </ToggleGroupContext.Provider>
      );
    }

    // Handle multiple type
    const {
      value: controlledValue,
      defaultValue = [],
      onValueChange,
      ...divProps
    } = restProps as Omit<ToggleGroupMultipleProps, "type" | "className" | "variant" | "size" | "disabled" | "children">;

    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = (itemValue: string) => {
      const newValue = value.includes(itemValue)
        ? value.filter((v) => v !== itemValue)
        : [...value, itemValue];
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <ToggleGroupContext.Provider
        value={{ type, value, onValueChange: handleValueChange, variant, size, disabled }}
      >
        <div
          ref={ref}
          role="group"
          className={cn("inline-flex gap-1 rounded-lg p-1 bg-surface-900", className)}
          {...divProps}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

// ============================================================================
// Toggle Group Item
// ============================================================================

export interface ToggleGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value">,
    VariantProps<typeof toggleVariants> {
  value: string;
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, variant, size, value, children, ...props }, ref) => {
    const context = useToggleGroupContext();
    
    if (!context) {
      throw new Error("ToggleGroupItem must be used within a ToggleGroup");
    }

    const pressed = context.type === "single"
      ? context.value === value
      : (context.value as string[]).includes(value);

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={pressed}
        aria-pressed={pressed}
        data-state={pressed ? "on" : "off"}
        disabled={context.disabled || props.disabled}
        className={cn(
          toggleVariants({
            variant: variant ?? context.variant,
            size: size ?? context.size,
          }),
          className
        )}
        onClick={() => context.onValueChange(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ToggleGroupItem.displayName = "ToggleGroupItem";

export { Toggle, ToggleGroup, ToggleGroupItem, toggleVariants };

