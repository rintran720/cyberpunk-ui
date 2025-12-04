import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  // Base styles for all buttons
  [
    "relative inline-flex items-center justify-center gap-2",
    "font-semibold text-sm",
    "rounded-lg",
    "transition-all duration-100 ease-out",
    "select-none cursor-pointer",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    // 3D effect base
    "before:absolute before:inset-0 before:rounded-lg before:transition-all before:duration-100",
  ],
  {
    variants: {
      variant: {
        primary: [
          // Main surface
          "bg-gradient-to-b from-primary-400 to-primary-600",
          "text-white",
          "border-t border-primary-300/50",
          // 3D shadow (bottom extrusion)
          "shadow-[0_4px_0_0_theme(colors.primary.700),0_6px_8px_-2px_rgba(0,0,0,0.3)]",
          // Highlight overlay
          "before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-100",
          // Hover state
          "hover:from-primary-300 hover:to-primary-500",
          "hover:shadow-[0_6px_0_0_theme(colors.primary.700),0_10px_16px_-4px_rgba(0,0,0,0.35)]",
          "hover:-translate-y-0.5",
          // Active/Pressed state
          "active:translate-y-1",
          "active:shadow-[0_1px_0_0_theme(colors.primary.700),0_2px_4px_-1px_rgba(0,0,0,0.2)]",
          "active:before:opacity-0",
          // Focus ring
          "focus-visible:ring-primary-400",
        ],
        secondary: [
          "bg-gradient-to-b from-secondary-400 to-secondary-600",
          "text-white",
          "border-t border-secondary-300/50",
          "shadow-[0_4px_0_0_theme(colors.secondary.700),0_6px_8px_-2px_rgba(0,0,0,0.3)]",
          "before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-100",
          "hover:from-secondary-300 hover:to-secondary-500",
          "hover:shadow-[0_6px_0_0_theme(colors.secondary.700),0_10px_16px_-4px_rgba(0,0,0,0.35)]",
          "hover:-translate-y-0.5",
          "active:translate-y-1",
          "active:shadow-[0_1px_0_0_theme(colors.secondary.700),0_2px_4px_-1px_rgba(0,0,0,0.2)]",
          "active:before:opacity-0",
          "focus-visible:ring-secondary-400",
        ],
        accent: [
          "bg-gradient-to-b from-accent-400 to-accent-600",
          "text-surface-950",
          "border-t border-accent-300/50",
          "shadow-[0_4px_0_0_theme(colors.accent.700),0_6px_8px_-2px_rgba(0,0,0,0.3)]",
          "before:bg-gradient-to-b before:from-white/30 before:to-transparent before:opacity-100",
          "hover:from-accent-300 hover:to-accent-500",
          "hover:shadow-[0_6px_0_0_theme(colors.accent.700),0_10px_16px_-4px_rgba(0,0,0,0.35)]",
          "hover:-translate-y-0.5",
          "active:translate-y-1",
          "active:shadow-[0_1px_0_0_theme(colors.accent.700),0_2px_4px_-1px_rgba(0,0,0,0.2)]",
          "active:before:opacity-0",
          "focus-visible:ring-accent-400",
        ],
        ghost: [
          "bg-transparent",
          "text-surface-300",
          "border border-surface-600",
          "shadow-[0_4px_0_0_theme(colors.surface.700),0_6px_8px_-2px_rgba(0,0,0,0.2)]",
          "before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-100",
          "hover:bg-surface-800",
          "hover:text-surface-100",
          "hover:shadow-[0_6px_0_0_theme(colors.surface.700),0_10px_16px_-4px_rgba(0,0,0,0.25)]",
          "hover:-translate-y-0.5",
          "active:translate-y-1",
          "active:shadow-[0_1px_0_0_theme(colors.surface.700),0_2px_4px_-1px_rgba(0,0,0,0.15)]",
          "active:before:opacity-0",
          "focus-visible:ring-surface-400",
        ],
        danger: [
          "bg-gradient-to-b from-red-400 to-red-600",
          "text-white",
          "border-t border-red-300/50",
          "shadow-[0_4px_0_0_theme(colors.red.700),0_6px_8px_-2px_rgba(0,0,0,0.3)]",
          "before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-100",
          "hover:from-red-300 hover:to-red-500",
          "hover:shadow-[0_6px_0_0_theme(colors.red.700),0_10px_16px_-4px_rgba(0,0,0,0.35)]",
          "hover:-translate-y-0.5",
          "active:translate-y-1",
          "active:shadow-[0_1px_0_0_theme(colors.red.700),0_2px_4px_-1px_rgba(0,0,0,0.2)]",
          "active:before:opacity-0",
          "focus-visible:ring-red-400",
        ],
        glass: [
          "bg-white/10 backdrop-blur-md",
          "text-white",
          "border border-white/20",
          "shadow-[0_4px_0_0_rgba(255,255,255,0.1),0_6px_8px_-2px_rgba(0,0,0,0.3)]",
          "before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-100",
          "hover:bg-white/15",
          "hover:shadow-[0_6px_0_0_rgba(255,255,255,0.15),0_10px_16px_-4px_rgba(0,0,0,0.35)]",
          "hover:-translate-y-0.5",
          "active:translate-y-1",
          "active:shadow-[0_1px_0_0_rgba(255,255,255,0.1),0_2px_4px_-1px_rgba(0,0,0,0.2)]",
          "active:before:opacity-0",
          "focus-visible:ring-white/50",
        ],
        outline: [
          "bg-transparent",
          "text-surface-200",
          "border-2 border-surface-500",
          "shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
          "hover:bg-surface-800",
          "hover:text-surface-100",
          "hover:border-surface-400",
          "hover:shadow-[0_3px_0_0_rgba(0,0,0,0.1)]",
          "hover:-translate-y-0.5",
          "active:translate-y-0.5",
          "active:shadow-[0_1px_0_0_rgba(0,0,0,0.1)]",
          "focus-visible:ring-surface-400",
        ],
        destructive: [
          "bg-gradient-to-b from-red-400 to-red-600",
          "text-white",
          "border-t border-red-300/50",
          "shadow-[0_4px_0_0_theme(colors.red.700),0_6px_8px_-2px_rgba(0,0,0,0.3)]",
          "before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-100",
          "hover:from-red-300 hover:to-red-500",
          "hover:shadow-[0_6px_0_0_theme(colors.red.700),0_10px_16px_-4px_rgba(0,0,0,0.35)]",
          "hover:-translate-y-0.5",
          "active:translate-y-1",
          "active:shadow-[0_1px_0_0_theme(colors.red.700),0_2px_4px_-1px_rgba(0,0,0,0.2)]",
          "active:before:opacity-0",
          "focus-visible:ring-red-400",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md before:rounded-md",
        md: "h-10 px-4 text-sm rounded-lg before:rounded-lg",
        lg: "h-12 px-6 text-base rounded-lg before:rounded-lg",
        xl: "h-14 px-8 text-lg rounded-xl before:rounded-xl",
        icon: "h-10 w-10 p-0 rounded-lg before:rounded-lg",
      },
      depth: {
        flat: [
          "shadow-none hover:shadow-none active:shadow-none",
          "translate-y-0 hover:translate-y-0 active:translate-y-0",
        ],
        shallow: [
          "shadow-[0_2px_0_0_rgba(0,0,0,0.25),0_4px_6px_-2px_rgba(0,0,0,0.2)]",
          "hover:shadow-[0_3px_0_0_rgba(0,0,0,0.25),0_6px_10px_-3px_rgba(0,0,0,0.25)]",
          "active:shadow-[0_0px_0_0_rgba(0,0,0,0.25),0_1px_2px_-1px_rgba(0,0,0,0.15)]",
          "active:translate-y-0.5",
        ],
        normal: [], // Default, uses variant shadows
        deep: [
          "shadow-[0_6px_0_0_rgba(0,0,0,0.3),0_10px_16px_-4px_rgba(0,0,0,0.35)]",
          "hover:shadow-[0_8px_0_0_rgba(0,0,0,0.3),0_14px_24px_-6px_rgba(0,0,0,0.4)]",
          "hover:-translate-y-1",
          "active:shadow-[0_2px_0_0_rgba(0,0,0,0.3),0_3px_6px_-2px_rgba(0,0,0,0.2)]",
          "active:translate-y-1.5",
        ],
      },
      glow: {
        none: "",
        primary: "hover:shadow-[0_4px_0_0_theme(colors.primary.700),0_0_20px_theme(colors.primary.500/40)]",
        secondary: "hover:shadow-[0_4px_0_0_theme(colors.secondary.700),0_0_20px_theme(colors.secondary.500/40)]",
        accent: "hover:shadow-[0_4px_0_0_theme(colors.accent.700),0_0_20px_theme(colors.accent.500/40)]",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      depth: "normal",
      glow: "none",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Leading icon */
  leftIcon?: React.ReactNode;
  /** Trailing icon */
  rightIcon?: React.ReactNode;
  /** Loading state */
  isLoading?: boolean;
}

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      depth,
      glow,
      fullWidth,
      leftIcon,
      rightIcon,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, depth, glow, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

