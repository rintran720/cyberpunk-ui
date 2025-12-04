import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const checkboxVariants = cva(
  [
    "shrink-0 rounded",
    "border border-cyber",
    "transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "bg-black/80",
    "shadow-cyber-border",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-cyber bg-black/80",
          "data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-500",
          "data-[state=checked]:shadow-cyber-primary",
        ],
        success: [
          "border-cyber bg-black/80",
          "data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500",
          "data-[state=checked]:shadow-[0_0_10px_rgba(16,185,129,0.6)]",
        ],
        warning: [
          "border-cyber bg-black/80",
          "data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500",
          "data-[state=checked]:shadow-[0_0_10px_rgba(245,158,11,0.6)]",
        ],
        danger: [
          "border-cyber bg-black/80",
          "data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500",
          "data-[state=checked]:shadow-[0_0_10px_rgba(239,68,68,0.6)]",
        ],
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Check icon
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Indeterminate icon
const MinusIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof checkboxVariants> {
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked for uncontrolled */
  defaultChecked?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Change handler */
  onCheckedChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      variant,
      size = "md",
      checked: controlledChecked,
      defaultChecked = false,
      indeterminate = false,
      onCheckedChange,
      label,
      description,
      disabled,
      ...props
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] =
      React.useState(defaultChecked);

    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    const handleToggle = () => {
      if (disabled) return;

      const newChecked = !checked;
      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    const state = indeterminate
      ? "indeterminate"
      : checked
      ? "checked"
      : "unchecked";

    // Icon sizes based on checkbox size
    const iconSizeClasses = {
      sm: "h-2.5 w-2.5",
      md: "h-3 w-3",
      lg: "h-4 w-4",
    };

    // Standalone checkbox (no label)
    if (!label) {
      return (
        <button
          type="button"
          role="checkbox"
          aria-checked={indeterminate ? "mixed" : checked}
          data-state={state}
          disabled={disabled}
          ref={ref}
          onClick={handleToggle}
          className={cn(
            checkboxVariants({ variant, size }),
            "flex items-center justify-center",
            className
          )}
          {...props}
        >
          {indeterminate ? (
            <MinusIcon
              className={cn("text-white", iconSizeClasses[size ?? "md"])}
            />
          ) : checked ? (
            <CheckIcon
              className={cn("text-white", iconSizeClasses[size ?? "md"])}
            />
          ) : (
            <span className={cn("opacity-0", iconSizeClasses[size ?? "md"])} />
          )}
        </button>
      );
    }

    // Checkbox with label - single click handler on wrapper
    return (
      <div
        className={cn(
          "flex items-start gap-3 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onClick={handleToggle}
        role="group"
      >
        <div
          role="checkbox"
          aria-checked={indeterminate ? "mixed" : checked}
          data-state={state}
          className={cn(
            checkboxVariants({ variant, size }),
            "flex items-center justify-center pointer-events-none",
            className
          )}
        >
          {indeterminate ? (
            <MinusIcon
              className={cn("text-white", iconSizeClasses[size ?? "md"])}
            />
          ) : checked ? (
            <CheckIcon
              className={cn("text-white", iconSizeClasses[size ?? "md"])}
            />
          ) : (
            <span className={cn("opacity-0", iconSizeClasses[size ?? "md"])} />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-primary-500 font-mono">{label}</span>
          {description && (
            <span className="text-xs text-primary-500/70 font-mono">
              {description}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
