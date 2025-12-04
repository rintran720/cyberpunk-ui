import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const skeletonVariants = cva(
  [
    "animate-pulse rounded-md",
    // 3D inset effect
    "shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]",
  ],
  {
    variants: {
      variant: {
        default: "bg-surface-700/50",
        lighter: "bg-surface-600/30",
        darker: "bg-surface-800/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

// ============================================================================
// Skeleton Text
// ============================================================================

export interface SkeletonTextProps extends SkeletonProps {
  /** Number of lines to show */
  lines?: number;
  /** Whether the last line should be shorter */
  lastLineShort?: boolean;
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, variant, lines = 3, lastLineShort = true, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant={variant}
            className={cn(
              "h-4",
              lastLineShort && index === lines - 1 && "w-3/4"
            )}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = "SkeletonText";

// ============================================================================
// Skeleton Circle
// ============================================================================

export interface SkeletonCircleProps extends SkeletonProps {
  /** Size of the circle */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const circleSizes = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
  "2xl": "h-20 w-20",
};

const SkeletonCircle = React.forwardRef<HTMLDivElement, SkeletonCircleProps>(
  ({ className, variant, size = "md", ...props }, ref) => {
    return (
      <Skeleton
        ref={ref}
        variant={variant}
        className={cn("rounded-full", circleSizes[size], className)}
        {...props}
      />
    );
  }
);

SkeletonCircle.displayName = "SkeletonCircle";

// ============================================================================
// Skeleton Card
// ============================================================================

export interface SkeletonCardProps extends SkeletonProps {
  /** Whether to show header */
  showHeader?: boolean;
  /** Whether to show footer */
  showFooter?: boolean;
  /** Number of content lines */
  contentLines?: number;
}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  (
    {
      className,
      variant,
      showHeader = true,
      showFooter = false,
      contentLines = 3,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-surface-700 bg-surface-800 p-4 space-y-4",
          className
        )}
        {...props}
      >
        {showHeader && (
          <div className="flex items-center gap-3">
            <SkeletonCircle size="md" variant={variant} />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" variant={variant} />
              <Skeleton className="h-3 w-1/4" variant={variant} />
            </div>
          </div>
        )}
        <SkeletonText lines={contentLines} variant={variant} />
        {showFooter && (
          <div className="flex justify-between pt-2">
            <Skeleton className="h-8 w-20" variant={variant} />
            <Skeleton className="h-8 w-20" variant={variant} />
          </div>
        )}
      </div>
    );
  }
);

SkeletonCard.displayName = "SkeletonCard";

// ============================================================================
// Skeleton Avatar with Text
// ============================================================================

export interface SkeletonAvatarTextProps extends SkeletonProps {
  /** Avatar size */
  avatarSize?: "sm" | "md" | "lg";
  /** Number of text lines */
  lines?: number;
}

const avatarSizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const SkeletonAvatarText = React.forwardRef<HTMLDivElement, SkeletonAvatarTextProps>(
  ({ className, variant, avatarSize = "md", lines = 2, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center gap-3", className)} {...props}>
        <Skeleton
          variant={variant}
          className={cn("rounded-full shrink-0", avatarSizeMap[avatarSize])}
        />
        <div className="flex-1 space-y-2">
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={index}
              variant={variant}
              className={cn("h-3", index === 0 ? "w-1/2" : "w-1/3")}
            />
          ))}
        </div>
      </div>
    );
  }
);

SkeletonAvatarText.displayName = "SkeletonAvatarText";

// ============================================================================
// Skeleton Table
// ============================================================================

export interface SkeletonTableProps extends SkeletonProps {
  /** Number of rows */
  rows?: number;
  /** Number of columns */
  columns?: number;
}

const SkeletonTable = React.forwardRef<HTMLDivElement, SkeletonTableProps>(
  ({ className, variant, rows = 5, columns = 4, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-surface-700 bg-surface-800 overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="border-b border-surface-700 p-4">
          <div className="flex gap-4">
            {Array.from({ length: columns }).map((_, index) => (
              <Skeleton
                key={index}
                variant={variant}
                className="h-4 flex-1"
              />
            ))}
          </div>
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              "p-4",
              rowIndex < rows - 1 && "border-b border-surface-700/50"
            )}
          >
            <div className="flex gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton
                  key={colIndex}
                  variant={variant}
                  className={cn(
                    "h-4 flex-1",
                    colIndex === 0 && "w-1/4",
                    colIndex === columns - 1 && "w-1/6"
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

SkeletonTable.displayName = "SkeletonTable";

export {
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SkeletonCard,
  SkeletonAvatarText,
  SkeletonTable,
  skeletonVariants,
};

