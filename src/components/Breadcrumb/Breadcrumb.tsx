"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Breadcrumb Variants
// ============================================================================

const breadcrumbVariants = cva("flex flex-wrap items-center gap-1.5 text-sm", {
  variants: {
    size: {
      sm: "text-xs gap-1",
      md: "text-sm gap-1.5",
      lg: "text-base gap-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// ============================================================================
// Breadcrumb Root
// ============================================================================

export interface BreadcrumbProps
  extends React.ComponentPropsWithoutRef<"nav">,
    VariantProps<typeof breadcrumbVariants> {}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, size, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cn(breadcrumbVariants({ size }), className)}
      {...props}
    />
  )
);

Breadcrumb.displayName = "Breadcrumb";

// ============================================================================
// Breadcrumb List
// ============================================================================

export interface BreadcrumbListProps
  extends React.ComponentPropsWithoutRef<"ol"> {}

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words",
        className
      )}
      {...props}
    />
  )
);

BreadcrumbList.displayName = "BreadcrumbList";

// ============================================================================
// Breadcrumb Item
// ============================================================================

export interface BreadcrumbItemProps
  extends React.ComponentPropsWithoutRef<"li"> {}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
);

BreadcrumbItem.displayName = "BreadcrumbItem";

// ============================================================================
// Breadcrumb Link
// ============================================================================

export interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref,
        className: cn(
          "text-surface-400 hover:text-surface-100 transition-colors",
          "underline-offset-4 hover:underline",
          className
        ),
        ...props,
      });
    }

    return (
      <a
        ref={ref}
        className={cn(
          "text-surface-400 hover:text-surface-100 transition-colors",
          "underline-offset-4 hover:underline",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

BreadcrumbLink.displayName = "BreadcrumbLink";

// ============================================================================
// Breadcrumb Page (current page)
// ============================================================================

export interface BreadcrumbPageProps
  extends React.ComponentPropsWithoutRef<"span"> {}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-surface-200 font-medium", className)}
      {...props}
    />
  )
);

BreadcrumbPage.displayName = "BreadcrumbPage";

// ============================================================================
// Breadcrumb Separator
// ============================================================================

export interface BreadcrumbSeparatorProps
  extends React.ComponentPropsWithoutRef<"li"> {
  children?: React.ReactNode;
}

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("text-surface-600", className)}
    {...props}
  >
    {children ?? (
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    )}
  </li>
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// ============================================================================
// Breadcrumb Ellipsis
// ============================================================================

export interface BreadcrumbEllipsisProps
  extends React.ComponentPropsWithoutRef<"span"> {}

const BreadcrumbEllipsis = ({
  className,
  ...props
}: BreadcrumbEllipsisProps) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn(
      "flex h-6 w-6 items-center justify-center text-surface-500",
      className
    )}
    {...props}
  >
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
      />
    </svg>
    <span className="sr-only">More</span>
  </span>
);

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// ============================================================================
// Breadcrumb with 3D Card style
// ============================================================================

export interface Breadcrumb3DProps extends BreadcrumbProps {}

const Breadcrumb3D = React.forwardRef<HTMLElement, Breadcrumb3DProps>(
  ({ className, children, ...props }, ref) => (
    <Breadcrumb
      ref={ref}
      className={cn(
        "px-4 py-2 rounded-lg",
        "bg-surface-800 border border-surface-700",
        "shadow-[0_2px_0_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        className
      )}
      {...props}
    >
      {children}
    </Breadcrumb>
  )
);

Breadcrumb3D.displayName = "Breadcrumb3D";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  Breadcrumb3D,
  breadcrumbVariants,
};

