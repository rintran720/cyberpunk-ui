"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

// ============================================================================
// ScrollArea Component
// ============================================================================

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Scrollbar visibility */
  scrollbarVisibility?: "auto" | "always" | "hover" | "never";
  /** Scrollbar size */
  scrollbarSize?: "sm" | "md" | "lg";
  /** Orientation */
  orientation?: "vertical" | "horizontal" | "both";
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      children,
      scrollbarVisibility = "auto",
      scrollbarSize = "md",
      orientation = "vertical",
      ...props
    },
    ref
  ) => {
    const scrollbarSizeClasses = {
      sm: "scrollbar-thin",
      md: "scrollbar-medium",
      lg: "scrollbar-large",
    };

    const visibilityClasses = {
      auto: "scrollbar-auto",
      always: "scrollbar-always",
      hover: "scrollbar-hover",
      never: "scrollbar-none",
    };

    const orientationClasses = {
      vertical: "overflow-y-auto overflow-x-hidden",
      horizontal: "overflow-x-auto overflow-y-hidden",
      both: "overflow-auto",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          orientationClasses[orientation],
          scrollbarSizeClasses[scrollbarSize],
          visibilityClasses[scrollbarVisibility],
          // Custom scrollbar styles - Cyberpunk
          "[&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar]:h-2.5",
          "[&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-track]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:bg-primary-500/30 [&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-black",
          "[&::-webkit-scrollbar-thumb]:shadow-cyber-primary",
          "[&::-webkit-scrollbar-thumb:hover]:bg-primary-500/50",
          "[&::-webkit-scrollbar-thumb:hover]:shadow-[0_0_8px_rgba(64,244,255,0.8)]",
          // Firefox
          "scrollbar-color-primary-500/30-black",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

// ============================================================================
// ScrollBar Component (for custom implementations)
// ============================================================================

export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation of the scrollbar */
  orientation?: "vertical" | "horizontal";
}

const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
      )}
      {...props}
    />
  )
);

ScrollBar.displayName = "ScrollBar";

// ============================================================================
// ScrollAreaViewport (inner container)
// ============================================================================

export interface ScrollAreaViewportProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ScrollAreaViewport = React.forwardRef<
  HTMLDivElement,
  ScrollAreaViewportProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-full w-full rounded-[inherit]", className)}
    {...props}
  >
    {children}
  </div>
));

ScrollAreaViewport.displayName = "ScrollAreaViewport";

// ============================================================================
// ScrollAreaCorner (for both scrollbars)
// ============================================================================

export interface ScrollAreaCornerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ScrollAreaCorner = React.forwardRef<
  HTMLDivElement,
  ScrollAreaCornerProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bg-black/80 border border-cyber", className)}
    {...props}
  />
));

ScrollAreaCorner.displayName = "ScrollAreaCorner";

export { ScrollArea, ScrollBar, ScrollAreaViewport, ScrollAreaCorner };

