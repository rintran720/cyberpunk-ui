import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  // Base styles for all buttons - Cyberpunk style
  [
    "relative inline-flex items-center justify-center gap-2",
    "font-semibold text-sm font-mono",
    "rounded",
    "transition-all duration-200 ease-out",
    "select-none cursor-pointer",
    "border",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    // Cyberpunk glow effect
    "before:absolute before:inset-0 before:rounded before:transition-all before:duration-200",
    "after:absolute after:inset-0 after:rounded after:transition-all after:duration-200",
  ],
  {
    variants: {
      variant: {
        primary: [
          // Cyberpunk neon cyan style
          "bg-black",
          "text-primary-500",
          "border-primary-500",
          "shadow-cyber-primary",
          // Glow effect
          "before:bg-primary-500/10",
          "after:bg-primary-500/5",
          // Hover state - brighter glow
          "hover:text-primary-400",
          "hover:border-primary-400",
          "hover:shadow-cyber-glow-lg",
          "hover:bg-primary-500/5",
          "hover:before:bg-primary-500/20",
          // Active state
          "active:bg-primary-500/10",
          "active:shadow-cyber-primary",
          // Focus ring
          "focus-visible:ring-primary-500",
          "focus-visible:ring-offset-2",
        ],
        secondary: [
          // Cyberpunk magenta style
          "bg-black",
          "text-secondary-500",
          "border-secondary-500",
          "shadow-cyber-secondary",
          "before:bg-secondary-500/10",
          "after:bg-secondary-500/5",
          "hover:text-secondary-400",
          "hover:border-secondary-400",
          "hover:shadow-cyber-glow-lg",
          "hover:bg-secondary-500/5",
          "hover:before:bg-secondary-500/20",
          "active:bg-secondary-500/10",
          "active:shadow-cyber-secondary",
          "focus-visible:ring-secondary-500",
          "focus-visible:ring-offset-2",
        ],
        accent: [
          // Cyberpunk lime green style
          "bg-black",
          "text-accent-500",
          "border-accent-500",
          "shadow-cyber-accent",
          "before:bg-accent-500/10",
          "after:bg-accent-500/5",
          "hover:text-accent-400",
          "hover:border-accent-400",
          "hover:shadow-cyber-glow-lg",
          "hover:bg-accent-500/5",
          "hover:before:bg-accent-500/20",
          "active:bg-accent-500/10",
          "active:shadow-cyber-accent",
          "focus-visible:ring-accent-500",
          "focus-visible:ring-offset-2",
        ],
        ghost: [
          // Cyberpunk ghost style
          "bg-transparent",
          "text-primary-500",
          "border-primary-500/30",
          "shadow-none",
          "before:bg-primary-500/5",
          "after:bg-transparent",
          "hover:bg-primary-500/10",
          "hover:text-primary-400",
          "hover:border-primary-400",
          "hover:shadow-cyber-glow",
          "active:bg-primary-500/15",
          "focus-visible:ring-primary-500",
          "focus-visible:ring-offset-2",
        ],
        danger: [
          // Cyberpunk danger style (red neon)
          "bg-black",
          "text-red-500",
          "border-red-500",
          "shadow-[0_0_10px_rgba(255,0,0,0.6),0_0_20px_rgba(255,0,0,0.4)]",
          "before:bg-red-500/10",
          "after:bg-red-500/5",
          "hover:text-red-400",
          "hover:border-red-400",
          "hover:shadow-[0_0_15px_rgba(255,0,0,0.8),0_0_30px_rgba(255,0,0,0.6)]",
          "hover:bg-red-500/5",
          "active:bg-red-500/10",
          "focus-visible:ring-red-500",
          "focus-visible:ring-offset-2",
        ],
        glass: [
          // Cyberpunk glass style
          "bg-primary-500/10 backdrop-blur-sm",
          "text-primary-500",
          "border border-primary-500/30",
          "shadow-cyber-border",
          "before:bg-primary-500/10",
          "after:bg-primary-500/5",
          "hover:bg-primary-500/15",
          "hover:text-primary-400",
          "hover:border-primary-400/50",
          "hover:shadow-cyber-border-lg",
          "active:bg-primary-500/20",
          "focus-visible:ring-primary-500",
          "focus-visible:ring-offset-2",
        ],
        outline: [
          // Cyberpunk outline style
          "bg-transparent",
          "text-primary-500",
          "border-2 border-primary-500",
          "shadow-cyber-border",
          "before:bg-transparent",
          "after:bg-transparent",
          "hover:bg-primary-500/10",
          "hover:text-primary-400",
          "hover:border-primary-400",
          "hover:shadow-cyber-border-lg",
          "active:bg-primary-500/15",
          "focus-visible:ring-primary-500",
          "focus-visible:ring-offset-2",
        ],
        destructive: [
          // Cyberpunk destructive style (red neon)
          "bg-black",
          "text-red-500",
          "border-red-500",
          "shadow-[0_0_10px_rgba(255,0,0,0.6),0_0_20px_rgba(255,0,0,0.4)]",
          "before:bg-red-500/10",
          "after:bg-red-500/5",
          "hover:text-red-400",
          "hover:border-red-400",
          "hover:shadow-[0_0_15px_rgba(255,0,0,0.8),0_0_30px_rgba(255,0,0,0.6)]",
          "hover:bg-red-500/5",
          "active:bg-red-500/10",
          "focus-visible:ring-red-500",
          "focus-visible:ring-offset-2",
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
        flat: ["shadow-none hover:shadow-none active:shadow-none"],
        shallow: ["shadow-cyber-glow", "hover:shadow-cyber-glow-lg"],
        normal: [], // Default, uses variant shadows
        deep: [
          "shadow-cyber-glow-lg",
          "hover:shadow-cyber-primary hover:animate-cyber-pulse",
        ],
      },
      glow: {
        none: "",
        primary: "hover:shadow-cyber-primary hover:animate-cyber-pulse",
        secondary: "hover:shadow-cyber-secondary hover:animate-cyber-pulse",
        accent: "hover:shadow-cyber-accent hover:animate-cyber-pulse",
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
        className={cn(
          buttonVariants({ variant, size, depth, glow, fullWidth, className })
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {leftIcon && (
              <span className="inline-flex shrink-0">{leftIcon}</span>
            )}
            {children}
            {rightIcon && (
              <span className="inline-flex shrink-0">{rightIcon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
