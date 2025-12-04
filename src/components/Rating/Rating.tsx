import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Rating Variants
// ============================================================================

const ratingVariants = cva("", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// ============================================================================
// Rating Root
// ============================================================================

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof ratingVariants> {
  /** Current rating value (0-5) */
  value?: number;
  /** Default value for uncontrolled */
  defaultValue?: number;
  /** Callback when rating changes */
  onChange?: (value: number) => void;
  /** Maximum rating (default: 5) */
  max?: number;
  /** Whether the rating is read-only */
  readOnly?: boolean;
  /** Whether the rating is disabled */
  disabled?: boolean;
  /** Color of filled stars */
  color?: "primary" | "secondary" | "accent" | "warning" | "success";
  /** Show half stars */
  allowHalf?: boolean;
  /** Custom icon for filled star */
  filledIcon?: React.ReactNode;
  /** Custom icon for empty star */
  emptyIcon?: React.ReactNode;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 0,
      onChange,
      max = 5,
      readOnly = false,
      disabled = false,
      size = "md",
      color = "warning",
      allowHalf = false,
      filledIcon,
      emptyIcon,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;
    const displayValue = hoverValue !== null ? hoverValue : value;

    const isInteractive = !readOnly && !disabled;

    // Color classes
    const colorClasses = {
      primary: "text-primary-500",
      secondary: "text-secondary-500",
      accent: "text-accent-500",
      warning: "text-amber-500",
      success: "text-green-500",
    };

    // Handle click
    const handleClick = React.useCallback(
      (newValue: number) => {
        if (!isInteractive) return;

        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onChange?.(newValue);
      },
      [isInteractive, isControlled, onChange]
    );

    // Handle mouse enter
    const handleMouseEnter = React.useCallback(
      (newValue: number) => {
        if (!isInteractive) return;
        setHoverValue(newValue);
      },
      [isInteractive]
    );

    // Handle mouse leave
    const handleMouseLeave = React.useCallback(() => {
      if (!isInteractive) return;
      setHoverValue(null);
    }, [isInteractive]);

    // Default star icons
    const defaultFilledIcon = (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className={cn("transition-colors", colorClasses[color])}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );

    const defaultEmptyIcon = (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        className="text-surface-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-0.5",
          disabled && "opacity-50 cursor-not-allowed",
          readOnly && "cursor-default",
          !readOnly && !disabled && "cursor-pointer",
          className
        )}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayValue;
          const isHalfFilled = allowHalf && displayValue >= starValue - 0.5 && displayValue < starValue;

          return (
            <div
              key={starValue}
              className={cn(
                "relative inline-flex items-center",
                ratingVariants({ size }),
                isInteractive && "hover:scale-110 transition-transform"
              )}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
            >
              {isFilled ? (
                <div className="absolute inset-0 overflow-hidden">
                  {filledIcon || defaultFilledIcon}
                </div>
              ) : isHalfFilled ? (
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                    {filledIcon || defaultFilledIcon}
                  </div>
                  <div className="absolute inset-0 opacity-30">
                    {emptyIcon || defaultEmptyIcon}
                  </div>
                </div>
              ) : (
                emptyIcon || defaultEmptyIcon
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

Rating.displayName = "Rating";

export { Rating, ratingVariants };

