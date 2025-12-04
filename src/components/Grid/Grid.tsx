"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Grid Variants
// ============================================================================

const gridVariants = cva(["grid", "w-full"], {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },
    colsSm: {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
      5: "sm:grid-cols-5",
      6: "sm:grid-cols-6",
      12: "sm:grid-cols-12",
    },
    colsMd: {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      5: "md:grid-cols-5",
      6: "md:grid-cols-6",
      12: "md:grid-cols-12",
    },
    colsLg: {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
      6: "lg:grid-cols-6",
      12: "lg:grid-cols-12",
    },
    colsXl: {
      1: "xl:grid-cols-1",
      2: "xl:grid-cols-2",
      3: "xl:grid-cols-3",
      4: "xl:grid-cols-4",
      5: "xl:grid-cols-5",
      6: "xl:grid-cols-6",
      12: "xl:grid-cols-12",
    },
    cols2xl: {
      1: "2xl:grid-cols-1",
      2: "2xl:grid-cols-2",
      3: "2xl:grid-cols-3",
      4: "2xl:grid-cols-4",
      5: "2xl:grid-cols-5",
      6: "2xl:grid-cols-6",
      12: "2xl:grid-cols-12",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
    },
    gapX: {
      0: "gap-x-0",
      1: "gap-x-1",
      2: "gap-x-2",
      3: "gap-x-3",
      4: "gap-x-4",
      5: "gap-x-5",
      6: "gap-x-6",
      8: "gap-x-8",
      10: "gap-x-10",
      12: "gap-x-12",
    },
    gapY: {
      0: "gap-y-0",
      1: "gap-y-1",
      2: "gap-y-2",
      3: "gap-y-3",
      4: "gap-y-4",
      5: "gap-y-5",
      6: "gap-y-6",
      8: "gap-y-8",
      10: "gap-y-10",
      12: "gap-y-12",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 4,
  },
});

// ============================================================================
// GridItem Variants
// ============================================================================

const gridItemVariants = cva(["w-full"], {
  variants: {
    colSpan: {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
      7: "col-span-7",
      8: "col-span-8",
      9: "col-span-9",
      10: "col-span-10",
      11: "col-span-11",
      12: "col-span-12",
      full: "col-span-full",
    },
    colSpanSm: {
      1: "sm:col-span-1",
      2: "sm:col-span-2",
      3: "sm:col-span-3",
      4: "sm:col-span-4",
      5: "sm:col-span-5",
      6: "sm:col-span-6",
      7: "sm:col-span-7",
      8: "sm:col-span-8",
      9: "sm:col-span-9",
      10: "sm:col-span-10",
      11: "sm:col-span-11",
      12: "sm:col-span-12",
      full: "sm:col-span-full",
    },
    colSpanMd: {
      1: "md:col-span-1",
      2: "md:col-span-2",
      3: "md:col-span-3",
      4: "md:col-span-4",
      5: "md:col-span-5",
      6: "md:col-span-6",
      7: "md:col-span-7",
      8: "md:col-span-8",
      9: "md:col-span-9",
      10: "md:col-span-10",
      11: "md:col-span-11",
      12: "md:col-span-12",
      full: "md:col-span-full",
    },
    colSpanLg: {
      1: "lg:col-span-1",
      2: "lg:col-span-2",
      3: "lg:col-span-3",
      4: "lg:col-span-4",
      5: "lg:col-span-5",
      6: "lg:col-span-6",
      7: "lg:col-span-7",
      8: "lg:col-span-8",
      9: "lg:col-span-9",
      10: "lg:col-span-10",
      11: "lg:col-span-11",
      12: "lg:col-span-12",
      full: "lg:col-span-full",
    },
    colSpanXl: {
      1: "xl:col-span-1",
      2: "xl:col-span-2",
      3: "xl:col-span-3",
      4: "xl:col-span-4",
      5: "xl:col-span-5",
      6: "xl:col-span-6",
      7: "xl:col-span-7",
      8: "xl:col-span-8",
      9: "xl:col-span-9",
      10: "xl:col-span-10",
      11: "xl:col-span-11",
      12: "xl:col-span-12",
      full: "xl:col-span-full",
    },
    colSpan2xl: {
      1: "2xl:col-span-1",
      2: "2xl:col-span-2",
      3: "2xl:col-span-3",
      4: "2xl:col-span-4",
      5: "2xl:col-span-5",
      6: "2xl:col-span-6",
      7: "2xl:col-span-7",
      8: "2xl:col-span-8",
      9: "2xl:col-span-9",
      10: "2xl:col-span-10",
      11: "2xl:col-span-11",
      12: "2xl:col-span-12",
      full: "2xl:col-span-full",
    },
    rowSpan: {
      1: "row-span-1",
      2: "row-span-2",
      3: "row-span-3",
      4: "row-span-4",
      5: "row-span-5",
      6: "row-span-6",
      full: "row-span-full",
    },
  },
});

// ============================================================================
// Grid Types
// ============================================================================

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /** Number of columns (default: 1) */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Number of columns on small screens (sm breakpoint) */
  colsSm?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Number of columns on medium screens (md breakpoint) */
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Number of columns on large screens (lg breakpoint) */
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Number of columns on extra large screens (xl breakpoint) */
  colsXl?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Number of columns on 2xl screens (2xl breakpoint) */
  cols2xl?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Gap between grid items */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Horizontal gap between grid items */
  gapX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Vertical gap between grid items */
  gapY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
}

export interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  /** Number of columns this item spans */
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  /** Number of columns this item spans on small screens */
  colSpanSm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  /** Number of columns this item spans on medium screens */
  colSpanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  /** Number of columns this item spans on large screens */
  colSpanLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  /** Number of columns this item spans on extra large screens */
  colSpanXl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  /** Number of columns this item spans on 2xl screens */
  colSpan2xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
  /** Number of rows this item spans */
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6 | "full";
}

// ============================================================================
// Grid Component
// ============================================================================

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols,
      colsSm,
      colsMd,
      colsLg,
      colsXl,
      cols2xl,
      gap,
      gapX,
      gapY,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          gridVariants({
            cols,
            colsSm,
            colsMd,
            colsLg,
            colsXl,
            cols2xl,
            gap,
            gapX,
            gapY,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Grid.displayName = "Grid";

// ============================================================================
// GridItem Component
// ============================================================================

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      className,
      colSpan,
      colSpanSm,
      colSpanMd,
      colSpanLg,
      colSpanXl,
      colSpan2xl,
      rowSpan,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          gridItemVariants({
            colSpan,
            colSpanSm,
            colSpanMd,
            colSpanLg,
            colSpanXl,
            colSpan2xl,
            rowSpan,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

GridItem.displayName = "GridItem";

export { gridVariants, gridItemVariants };
