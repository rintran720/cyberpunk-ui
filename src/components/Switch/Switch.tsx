import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const switchVariants = cva(
  [
    "relative inline-flex items-center shrink-0 cursor-pointer",
    "rounded-full",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // 3D inset effect when off
    "shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-surface-700",
          "data-[state=checked]:bg-primary-500",
          "data-[state=checked]:shadow-[0_2px_0_0_rgba(20,111,225,0.3),0_4px_8px_-2px_rgba(0,0,0,0.2)]",
        ],
        success: [
          "bg-surface-700",
          "data-[state=checked]:bg-green-500",
          "data-[state=checked]:shadow-[0_2px_0_0_rgba(34,197,94,0.3),0_4px_8px_-2px_rgba(0,0,0,0.2)]",
        ],
        warning: [
          "bg-surface-700",
          "data-[state=checked]:bg-amber-500",
          "data-[state=checked]:shadow-[0_2px_0_0_rgba(245,158,11,0.3),0_4px_8px_-2px_rgba(0,0,0,0.2)]",
        ],
        danger: [
          "bg-surface-700",
          "data-[state=checked]:bg-red-500",
          "data-[state=checked]:shadow-[0_2px_0_0_rgba(239,68,68,0.3),0_4px_8px_-2px_rgba(0,0,0,0.2)]",
        ],
      },
      size: {
        sm: "h-5 w-9 px-0.5",
        md: "h-6 w-11 px-0.5",
        lg: "h-7 w-14 px-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const thumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-white",
    "transition-transform duration-200",
    // 3D raised thumb
    "shadow-[0_2px_4px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.1)_inset]",
  ],
  {
    variants: {
      size: {
        // Thumb moves from left to right: (container width - thumb width - 2*padding)
        // sm: 36px - 16px - 4px = 16px (translate-x-4)
        // md: 44px - 20px - 4px = 20px (translate-x-5)
        // lg: 56px - 24px - 4px = 28px (translate-x-7)
        sm: "h-4 w-4 data-[state=checked]:translate-x-4",
        md: "h-5 w-5 data-[state=checked]:translate-x-5",
        lg: "h-6 w-6 data-[state=checked]:translate-x-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof switchVariants> {
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked for uncontrolled */
  defaultChecked?: boolean;
  /** Change handler */
  onCheckedChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Label position */
  labelPosition?: "left" | "right";
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      variant,
      size,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      label,
      labelPosition = "right",
      disabled,
      ...props
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    const handleClick = () => {
      if (disabled) return;
      
      const newChecked = !checked;
      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    const switchElement = (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        disabled={disabled}
        ref={ref}
        onClick={handleClick}
        className={cn(switchVariants({ variant, size }), className)}
        {...props}
      >
        <span
          data-state={checked ? "checked" : "unchecked"}
          className={thumbVariants({ size })}
        />
      </button>
    );

    if (!label) return switchElement;

    return (
      <label className="inline-flex items-center gap-3 cursor-pointer">
        {labelPosition === "left" && (
          <span className={cn("text-sm text-surface-200", disabled && "opacity-50")}>
            {label}
          </span>
        )}
        {switchElement}
        {labelPosition === "right" && (
          <span className={cn("text-sm text-surface-200", disabled && "opacity-50")}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, switchVariants };

