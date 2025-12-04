"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

// ============================================================================
// AspectRatio Component
// ============================================================================

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The desired aspect ratio (width / height) */
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, className, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative w-full", className)}
        style={{
          paddingBottom: `${100 / ratio}%`,
          ...style,
        }}
        {...props}
      >
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";

// ============================================================================
// Common Aspect Ratios
// ============================================================================

/** 16:9 - Common video/widescreen ratio */
export const ASPECT_VIDEO = 16 / 9;

/** 4:3 - Traditional TV/photo ratio */
export const ASPECT_STANDARD = 4 / 3;

/** 1:1 - Square ratio */
export const ASPECT_SQUARE = 1;

/** 21:9 - Ultra-wide ratio */
export const ASPECT_ULTRAWIDE = 21 / 9;

/** 9:16 - Portrait video ratio */
export const ASPECT_PORTRAIT = 9 / 16;

/** 3:2 - Classic photo ratio */
export const ASPECT_PHOTO = 3 / 2;

/** 2:3 - Portrait photo ratio */
export const ASPECT_PORTRAIT_PHOTO = 2 / 3;

export { AspectRatio };

