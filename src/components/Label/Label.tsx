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
        default: "text-primary-500 font-mono",
        muted: "text-primary-500/70 font-mono",
        accent: "text-primary-500 font-mono",
        error: "text-red-500 font-mono",
        success: "text-emerald-500 font-mono",
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
            <span className="text-red-500 font-mono" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {description && !error && (
          <p className="text-xs text-primary-500/70 font-mono">{description}</p>
        )}
        {error && (
          <p className="text-xs text-red-500 font-mono">{error}</p>
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
          <span className="text-red-500 font-mono" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);

SimpleLabel.displayName = "SimpleLabel";

export { Label, SimpleLabel, labelVariants };

