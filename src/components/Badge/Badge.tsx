import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-medium",
    "rounded-full",
    "transition-all duration-200",
    "leading-none",
    // 3D effect
    "shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-surface-700",
          "text-surface-100",
          "border border-surface-600",
        ],
        primary: [
          "bg-gradient-to-b from-primary-400 to-primary-600",
          "text-white",
          "shadow-[0_2px_0_0_rgba(20,111,225,0.3),0_4px_8px_-2px_rgba(0,0,0,0.2)]",
        ],
        secondary: [
          "bg-gradient-to-b from-secondary-400 to-secondary-600",
          "text-white",
          "shadow-[0_2px_0_0_rgba(147,51,234,0.3),0_4px_8px_-2px_rgba(0,0,0,0.2)]",
        ],
        accent: [
          "bg-gradient-to-b from-accent-400 to-accent-600",
          "text-white",
          "shadow-[0_2px_0_0_rgba(5,150,105,0.3),0_4px_8px_-2px_rgba(0,0,0,0.2)]",
        ],
        success: [
          "bg-gradient-to-b from-green-400 to-green-600",
          "text-white",
          "shadow-[0_2px_0_0_rgba(34,197,94,0.3),0_4px_8px_-2px_rgba(0,0,0,0.2)]",
        ],
        warning: [
          "bg-gradient-to-b from-amber-400 to-amber-600",
          "text-white",
          "shadow-[0_2px_0_0_rgba(245,158,11,0.3),0_4px_8px_-2px_rgba(0,0,0,0.2)]",
        ],
        destructive: [
          "bg-gradient-to-b from-red-400 to-red-600",
          "text-white",
          "shadow-[0_2px_0_0_rgba(239,68,68,0.3),0_4px_8px_-2px_rgba(0,0,0,0.2)]",
        ],
        outline: [
          "bg-transparent",
          "text-surface-100",
          "border-2 border-surface-500",
          "shadow-none",
        ],
        glass: [
          "bg-white/10 backdrop-blur-md",
          "text-white",
          "border border-white/20",
          "shadow-[0_2px_0_0_rgba(255,255,255,0.05)]",
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
      default: "bg-surface-400",
      white: "bg-white/80",
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

