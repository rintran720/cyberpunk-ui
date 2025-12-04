"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Label Variants
// ============================================================================

const labelVariants = cva(
  // Base styles
  [
    "text-sm font-medium leading-none",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  ],
  {
    variants: {
      variant: {
        default: "text-surface-200",
        muted: "text-surface-400",
        accent: "text-primary-400",
        error: "text-red-400",
        success: "text-green-400",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ============================================================================
// Label Component
// ============================================================================

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  /** Whether the field is required */
  required?: boolean;
  /** Optional helper/description text */
  description?: string;
  /** Error message to display */
  error?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      className,
      variant,
      size,
      required,
      description,
      error,
      children,
      ...props
    },
    ref
  ) => {
    const effectiveVariant = error ? "error" : variant;

    return (
      <div className="space-y-1">
        <label
          ref={ref}
          className={cn(
            labelVariants({ variant: effectiveVariant, size }),
            "inline-flex items-center gap-1",
            className
          )}
          {...props}
        >
          {children}
          {required && (
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {description && !error && (
          <p className="text-xs text-surface-500">{description}</p>
        )}
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Label.displayName = "Label";

// ============================================================================
// Simple Label (without wrapper)
// ============================================================================

export interface SimpleLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
}

const SimpleLabel = React.forwardRef<HTMLLabelElement, SimpleLabelProps>(
  ({ className, variant, size, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          labelVariants({ variant, size }),
          "inline-flex items-center gap-1",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-red-400" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);

SimpleLabel.displayName = "SimpleLabel";

export { Label, SimpleLabel, labelVariants };

