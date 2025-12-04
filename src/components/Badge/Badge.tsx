import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-medium font-mono",
    "rounded",
    "transition-all duration-200",
    "leading-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-black",
          "text-primary-500",
          "border border-primary-500/30",
          "shadow-cyber-border",
        ],
        primary: [
          "bg-black",
          "text-primary-500",
          "border border-primary-500",
          "shadow-cyber-primary",
        ],
        secondary: [
          "bg-black",
          "text-secondary-500",
          "border border-secondary-500",
          "shadow-cyber-secondary",
        ],
        accent: [
          "bg-black",
          "text-accent-500",
          "border border-accent-500",
          "shadow-cyber-accent",
        ],
        success: [
          "bg-black",
          "text-green-500",
          "border border-green-500",
          "shadow-[0_0_10px_rgba(0,255,0,0.6),0_0_20px_rgba(0,255,0,0.4)]",
        ],
        warning: [
          "bg-black",
          "text-amber-500",
          "border border-amber-500",
          "shadow-[0_0_10px_rgba(255,193,7,0.6),0_0_20px_rgba(255,193,7,0.4)]",
        ],
        destructive: [
          "bg-black",
          "text-red-500",
          "border border-red-500",
          "shadow-[0_0_10px_rgba(255,0,0,0.6),0_0_20px_rgba(255,0,0,0.4)]",
        ],
        outline: [
          "bg-transparent",
          "text-primary-500",
          "border-2 border-primary-500",
          "shadow-cyber-border",
        ],
        glass: [
          "bg-primary-500/10 backdrop-blur-md",
          "text-primary-500",
          "border border-primary-500/30",
          "shadow-cyber-border",
        ],
      },
      size: {
        sm: "text-xs px-2 h-5",
        md: "text-xs px-2.5 h-6",
        lg: "text-sm px-3 h-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional dot indicator */
  dot?: boolean;
  /** Dot color - auto selects based on variant if not specified */
  dotColor?: "default" | "white" | "success" | "warning" | "error";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, dotColor, children, ...props }, ref) => {
    // Variants with colored backgrounds should have white dots by default
    const coloredVariants = ["primary", "secondary", "accent", "success", "warning", "destructive", "glass"];
    const isColoredVariant = variant && coloredVariants.includes(variant);
    
    const resolvedDotColor = dotColor ?? (isColoredVariant ? "white" : "default");
    
    const dotColors = {
      default: "bg-primary-500",
      white: "bg-primary-500",
      success: "bg-green-500",
      warning: "bg-amber-500",
      error: "bg-red-500",
    };

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full mr-1.5",
              dotColors[resolvedDotColor]
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };

