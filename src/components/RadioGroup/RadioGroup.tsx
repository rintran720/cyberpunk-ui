import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// RadioGroup Context
// ============================================================================

interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
  name: string;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

const useRadioGroupContext = () => {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioGroupItem must be used within a RadioGroup");
  }
  return context;
};

// ============================================================================
// RadioGroup Variants
// ============================================================================

const radioItemVariants = cva(
  [
    "relative flex items-center justify-center shrink-0",
    "rounded-full border",
    "transition-all duration-200",
    "cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:ring-offset-surface-900",
    // 3D effect - unchecked
    "bg-surface-800 border-surface-600",
    "shadow-[inset_0_1px_2px_rgba(0,0,0,0.2),0_1px_0_0_rgba(255,255,255,0.05)]",
  ],
  {
    variants: {
      size: {
        sm: "w-3 h-3",
        md: "w-3.5 h-3.5",
        lg: "w-4 h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const radioIndicatorVariants = cva(
  [
    "rounded-full",
    "transition-all duration-200",
    // 3D effect - raised dot
    "bg-gradient-to-b from-primary-400 to-primary-600",
    "shadow-[0_1px_1px_rgba(0,0,0,0.3),inset_0_0.5px_0_0_rgba(255,255,255,0.3)]",
  ],
  {
    variants: {
      size: {
        sm: "w-1.5 h-1.5",
        md: "w-1.5 h-1.5",
        lg: "w-2 h-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ============================================================================
// RadioGroup Root
// ============================================================================

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Current value (controlled) */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Name for form submission */
  name?: string;
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Orientation */
  orientation?: "horizontal" | "vertical";
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      name,
      disabled,
      orientation = "vertical",
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const generatedName = React.useId();

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <RadioGroupContext.Provider
        value={{
          value,
          onValueChange: handleValueChange,
          name: name || generatedName,
          disabled,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation}
          className={cn(
            "flex",
            orientation === "vertical" ? "flex-col gap-3" : "flex-row gap-4",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

// ============================================================================
// RadioGroup Item
// ============================================================================

export interface RadioGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value">,
    VariantProps<typeof radioItemVariants> {
  /** The value of this radio item */
  value: string;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, size, value, disabled: itemDisabled, ...props }, ref) => {
    const { value: selectedValue, onValueChange, name, disabled: groupDisabled } = useRadioGroupContext();
    const isSelected = selectedValue === value;
    const isDisabled = itemDisabled || groupDisabled;

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isSelected}
        data-state={isSelected ? "checked" : "unchecked"}
        disabled={isDisabled}
        onClick={() => !isDisabled && onValueChange(value)}
        className={cn(
          radioItemVariants({ size }),
          isSelected && "border-primary-500 bg-surface-700",
          isDisabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {/* Hidden radio for form submission */}
        <input
          type="radio"
          name={name}
          value={value}
          checked={isSelected}
          disabled={isDisabled}
          onChange={() => {}}
          className="sr-only"
        />
        {/* Indicator dot */}
        {isSelected && (
          <span className={cn(radioIndicatorVariants({ size }))} />
        )}
      </button>
    );
  }
);

RadioGroupItem.displayName = "RadioGroupItem";

// ============================================================================
// RadioGroup Label (convenience wrapper)
// ============================================================================

export interface RadioGroupLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Associated radio value */
  htmlFor?: string;
}

const RadioGroupLabel = React.forwardRef<HTMLLabelElement, RadioGroupLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium text-surface-200 cursor-pointer select-none",
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);

RadioGroupLabel.displayName = "RadioGroupLabel";

// ============================================================================
// Convenience component: Radio with Label
// ============================================================================

export interface RadioWithLabelProps extends RadioGroupItemProps {
  /** Label text */
  label: string;
  /** Description text */
  description?: string;
}

const RadioWithLabel = React.forwardRef<HTMLButtonElement, RadioWithLabelProps>(
  ({ label, description, size, ...props }, ref) => {
    const id = React.useId();

    return (
      <div className="flex items-start gap-3">
        <RadioGroupItem ref={ref} size={size} id={id} {...props} />
        <div className="flex flex-col">
          <label
            htmlFor={id}
            className="text-sm font-medium text-surface-200 cursor-pointer select-none leading-none"
          >
            {label}
          </label>
          {description && (
            <p className="text-xs text-surface-400 mt-1">{description}</p>
          )}
        </div>
      </div>
    );
  }
);

RadioWithLabel.displayName = "RadioWithLabel";

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
  RadioWithLabel,
  radioItemVariants,
  radioIndicatorVariants,
};

