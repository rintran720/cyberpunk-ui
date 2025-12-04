"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// ChartTooltip Variants
// ============================================================================

const chartTooltipVariants = cva(
  [
    "absolute z-50",
    "bg-black/90 backdrop-blur-md border-2 border-cyber rounded-lg px-3 py-2 shadow-cyber-border-lg",
    "text-primary-500 font-mono",
  ],
  {
    variants: {
      variant: {
        default: "",
        elevated: ["shadow-cyber-primary-lg"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ============================================================================
// ChartTooltip Types
// ============================================================================

export interface ChartTooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chartTooltipVariants> {
  /** Tooltip content */
  children: React.ReactNode;
  /** X position relative to container */
  x: number;
  /** Y position relative to container */
  y: number;
  /** Custom positioning transform */
  transform?: string;
  /** Callback when mouse enters tooltip */
  onMouseEnter?: () => void;
  /** Callback when mouse leaves tooltip */
  onMouseLeave?: () => void;
}

// ============================================================================
// ChartTooltip Component
// ============================================================================

export const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  (
    {
      className,
      variant,
      children,
      x,
      y,
      transform = "translateX(-50%) translateY(-100%)",
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(chartTooltipVariants({ variant }), className)}
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ChartTooltip.displayName = "ChartTooltip";

export { chartTooltipVariants };
