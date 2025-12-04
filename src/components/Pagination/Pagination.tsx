import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Pagination Variants
// ============================================================================

const paginationVariants = cva(
  ["flex items-center justify-center gap-1", "text-sm"],
  {
    variants: {
      size: {
        sm: "gap-0.5",
        md: "gap-1",
        lg: "gap-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const paginationItemVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "font-medium",
    "rounded-lg",
    "transition-all duration-100 ease-out",
    "select-none cursor-pointer",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    // 3D effect base
    "before:absolute before:inset-0 before:rounded-lg before:transition-all before:duration-100",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-surface-800",
          "text-surface-200",
          "border border-surface-700",
          "shadow-[0_2px_0_0_rgba(0,0,0,0.15),0_4px_8px_-2px_rgba(0,0,0,0.2)]",
          "before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-100",
          "hover:bg-surface-700",
          "hover:text-surface-100",
          "hover:shadow-[0_3px_0_0_rgba(0,0,0,0.15),0_6px_12px_-2px_rgba(0,0,0,0.25)]",
          "hover:-translate-y-0.5",
          "active:translate-y-0.5",
          "active:shadow-[0_1px_0_0_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.15)]",
          "active:before:opacity-0",
          "focus-visible:ring-primary-400",
        ],
        active: [
          "bg-gradient-to-b from-primary-400 to-primary-600",
          "text-white",
          "border-t border-primary-300/50",
          "shadow-[0_2px_0_0_theme(colors.primary.700),0_4px_8px_-2px_rgba(0,0,0,0.3)]",
          "before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-100",
          "hover:from-primary-300 hover:to-primary-500",
          "hover:shadow-[0_3px_0_0_theme(colors.primary.700),0_6px_12px_-2px_rgba(0,0,0,0.35)]",
          "hover:-translate-y-0.5",
          "active:translate-y-0.5",
          "active:shadow-[0_1px_0_0_theme(colors.primary.700),0_2px_4px_-1px_rgba(0,0,0,0.2)]",
          "focus-visible:ring-primary-400",
        ],
      },
      size: {
        sm: "h-8 min-w-[32px] px-2 text-xs",
        md: "h-10 min-w-[40px] px-3 text-sm",
        lg: "h-12 min-w-[48px] px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ============================================================================
// Pagination Root
// ============================================================================

export interface PaginationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paginationVariants> {
  /** Current page (1-indexed) */
  currentPage?: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Number of pages to show on each side of current page */
  siblingCount?: number;
  /** Whether to show first/last page buttons */
  showFirstLast?: boolean;
  /** Whether to show previous/next buttons */
  showPrevNext?: boolean;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      currentPage = 1,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showFirstLast = true,
      showPrevNext = true,
      size = "md",
      ...props
    },
    ref
  ) => {
    const handlePageChange = React.useCallback(
      (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
          onPageChange?.(page);
        }
      },
      [currentPage, totalPages, onPageChange]
    );

    // Calculate page numbers to display
    const getPageNumbers = React.useCallback(() => {
      const pages: (number | string)[] = [];
      const totalNumbers = siblingCount * 2 + 5; // current + 2 siblings + first + last + 2 ellipsis
      const totalBlocks = totalNumbers + 2; // + prev + next

      if (totalPages <= totalBlocks) {
        // Show all pages if total is less than calculated blocks
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
          currentPage + siblingCount,
          totalPages
        );

        const shouldShowLeftEllipsis = leftSiblingIndex > 2;
        const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

        if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
          const leftItemCount = 3 + 2 * siblingCount;
          const leftRange: number[] = [];
          for (let i = 1; i <= leftItemCount; i++) {
            leftRange.push(i);
          }
          pages.push(...leftRange, "ellipsis", totalPages);
        } else if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
          const rightItemCount = 3 + 2 * siblingCount;
          const rightRange: number[] = [];
          for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) {
            rightRange.push(i);
          }
          pages.push(1, "ellipsis", ...rightRange);
        } else {
          pages.push(1);
          if (shouldShowLeftEllipsis) {
            pages.push("ellipsis");
          }
          for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
            pages.push(i);
          }
          if (shouldShowRightEllipsis) {
            pages.push("ellipsis");
          }
          pages.push(totalPages);
        }
      }

      return pages;
    }, [currentPage, totalPages, siblingCount]);

    const pageNumbers = getPageNumbers();

    return (
      <nav
        ref={ref}
        className={cn(paginationVariants({ size }), className)}
        aria-label="Pagination"
        {...props}
      >
        {showPrevNext && (
          <PaginationItem
            variant="default"
            size={size}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </PaginationItem>
        )}

        {showFirstLast &&
          currentPage > siblingCount + 2 &&
          !pageNumbers.includes(1) && (
            <>
              <PaginationItem
                variant="default"
                size={size}
                onClick={() => handlePageChange(1)}
                aria-label="Go to first page"
              >
                1
              </PaginationItem>
              {pageNumbers[0] !== 1 && pageNumbers[0] !== "ellipsis" && (
                <span className="px-2 text-surface-400">...</span>
              )}
            </>
          )}

        {pageNumbers.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-surface-400">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          return (
            <PaginationItem
              key={pageNum}
              variant={pageNum === currentPage ? "active" : "default"}
              size={size}
              onClick={() => handlePageChange(pageNum)}
              aria-label={`Go to page ${pageNum}`}
              aria-current={pageNum === currentPage ? "page" : undefined}
            >
              {pageNum}
            </PaginationItem>
          );
        })}

        {showFirstLast &&
          currentPage < totalPages - siblingCount - 1 &&
          !pageNumbers.includes(totalPages) && (
            <>
              {pageNumbers[pageNumbers.length - 1] !== "ellipsis" && (
                <span className="px-2 text-surface-400">...</span>
              )}
              <PaginationItem
                variant="default"
                size={size}
                onClick={() => handlePageChange(totalPages)}
                aria-label="Go to last page"
              >
                {totalPages}
              </PaginationItem>
            </>
          )}

        {showPrevNext && (
          <PaginationItem
            variant="default"
            size={size}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </PaginationItem>
        )}
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";

// ============================================================================
// Pagination Item
// ============================================================================

export interface PaginationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationItemVariants> {}

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(paginationItemVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

PaginationItem.displayName = "PaginationItem";

export {
  Pagination,
  PaginationItem,
  paginationVariants,
  paginationItemVariants,
};
