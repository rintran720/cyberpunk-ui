import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const progressVariants = cva(
  [
    "relative w-full overflow-hidden rounded-full",
    // 3D inset effect
    "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]",
    "border border-surface-700/50",
  ],
  {
    variants: {
      variant: {
        default: "bg-surface-800",
        glass: "bg-surface-800/50 backdrop-blur-sm",
      },
      size: {
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
        xl: "h-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const progressIndicatorVariants = cva(
  [
    "h-full rounded-full transition-all duration-500 ease-out",
    // 3D raised effect
    "shadow-[0_2px_0_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.2)]",
  ],
  {
    variants: {
      color: {
        primary: "bg-gradient-to-r from-primary-600 to-primary-400",
        secondary: "bg-gradient-to-r from-secondary-600 to-secondary-400",
        accent: "bg-gradient-to-r from-accent-600 to-accent-400",
        success: "bg-gradient-to-r from-green-600 to-green-400",
        warning: "bg-gradient-to-r from-amber-600 to-amber-400",
        destructive: "bg-gradient-to-r from-red-600 to-red-400",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      color: "primary",
      animated: false,
    },
  }
);

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  /** The progress value (0-100) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Whether to show the percentage label */
  showLabel?: boolean;
  /** Custom label format */
  formatLabel?: (value: number, max: number) => string;
  /** Whether the progress is indeterminate */
  indeterminate?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      variant,
      size,
      color,
      animated,
      value = 0,
      max = 100,
      showLabel,
      formatLabel,
      indeterminate,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const defaultFormatLabel = (val: number, maxVal: number) =>
      `${Math.round((val / maxVal) * 100)}%`;

    const label = formatLabel
      ? formatLabel(value, max)
      : defaultFormatLabel(value, max);

    return (
      <div className="w-full">
        {showLabel && (
          <div className="flex justify-between mb-1">
            <span className="text-xs text-surface-400">Progress</span>
            <span className="text-xs font-medium text-surface-200">
              {label}
            </span>
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          className={cn(progressVariants({ variant, size }), className)}
          {...props}
        >
          <div
            className={cn(
              progressIndicatorVariants({ color, animated }),
              indeterminate &&
                "w-1/3 animate-[progress-indeterminate_1.5s_ease-in-out_infinite]"
            )}
            style={indeterminate ? undefined : { width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";

// ============================================================================
// Circular Progress
// ============================================================================

export interface CircularProgressProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "color">,
    VariantProps<typeof progressIndicatorVariants> {
  /** The progress value (0-100) */
  value?: number;
  /** Size of the circular progress */
  size?: "sm" | "md" | "lg" | "xl";
  /** Stroke width */
  strokeWidth?: number;
  /** Whether to show the percentage label */
  showLabel?: boolean;
  /** Whether the progress is indeterminate */
  indeterminate?: boolean;
}

const circularSizes = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  (
    {
      className,
      color = "primary",
      value = 0,
      size = "md",
      strokeWidth = 4,
      showLabel,
      indeterminate,
      ...props
    },
    ref
  ) => {
    const svgSize = circularSizes[size];
    const radius = (svgSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(Math.max(value, 0), 100);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const colorMap: Record<NonNullable<typeof color>, string> = {
      primary: "stroke-primary-500",
      secondary: "stroke-secondary-500",
      accent: "stroke-accent-500",
      success: "stroke-green-500",
      warning: "stroke-amber-500",
      destructive: "stroke-red-500",
    };

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          ref={ref}
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className={cn(indeterminate && "animate-spin", className)}
          {...props}
        >
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            className="stroke-surface-700"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            className={cn(
              colorMap[color ?? "primary"] as string,
              "drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            )}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={
              indeterminate ? circumference * 0.75 : strokeDashoffset
            }
            transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
            style={{
              transition: indeterminate
                ? undefined
                : "stroke-dashoffset 0.5s ease-out",
            }}
          />
        </svg>
        {showLabel && !indeterminate && (
          <span className="absolute text-xs font-medium text-surface-200">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = "CircularProgress";

export {
  Progress,
  CircularProgress,
  progressVariants,
  progressIndicatorVariants,
};
