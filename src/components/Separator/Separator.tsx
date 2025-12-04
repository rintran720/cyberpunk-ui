"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Separator Variants
// ============================================================================

const separatorVariants = cva(
  // Base styles with 3D effect
  "shrink-0 bg-surface-700",
  {
    variants: {
      orientation: {
        horizontal: "h-[1px] w-full",
        vertical: "h-full w-[1px]",
      },
      variant: {
        default: "bg-surface-700",
        muted: "bg-surface-800",
        accent: "bg-primary-500/30",
        gradient: "bg-gradient-to-r from-transparent via-surface-600 to-transparent",
        "gradient-accent": "bg-gradient-to-r from-transparent via-primary-500/50 to-transparent",
        "3d": [
          "bg-surface-800",
          "shadow-[0_1px_0_0_rgba(255,255,255,0.05)]",
        ],
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      // Horizontal sizes
      { orientation: "horizontal", size: "sm", className: "h-[1px]" },
      { orientation: "horizontal", size: "md", className: "h-[2px]" },
      { orientation: "horizontal", size: "lg", className: "h-[3px]" },
      // Vertical sizes
      { orientation: "vertical", size: "sm", className: "w-[1px]" },
      { orientation: "vertical", size: "md", className: "w-[2px]" },
      { orientation: "vertical", size: "lg", className: "w-[3px]" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
      size: "sm",
    },
  }
);

// ============================================================================
// Separator Component
// ============================================================================

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  /** Whether the separator is decorative (no semantic meaning) */
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant,
      size,
      decorative = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : (orientation as "horizontal" | "vertical")}
        className={cn(separatorVariants({ orientation, variant, size }), className)}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator, separatorVariants };

