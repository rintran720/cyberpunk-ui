"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { DropdownMenuTrigger, DropdownMenuContent } from "../DropdownMenu";

// ============================================================================
// NavigationMenu Root
// ============================================================================

export interface NavigationMenuProps
  extends React.HTMLAttributes<HTMLElement> {}

const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  ({ className, children, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        "relative z-10 flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  )
);

NavigationMenu.displayName = "NavigationMenu";

// ============================================================================
// NavigationMenu List
// ============================================================================

export interface NavigationMenuListProps
  extends React.HTMLAttributes<HTMLUListElement> {}

const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  NavigationMenuListProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
));

NavigationMenuList.displayName = "NavigationMenuList";

// ============================================================================
// NavigationMenu Item
// ============================================================================

export interface NavigationMenuItemProps {
  children: React.ReactNode;
}

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
  children,
}) => {
  return <li className="relative">{children}</li>;
};

NavigationMenuItem.displayName = "NavigationMenuItem";

// ============================================================================
// NavigationMenu Trigger
// ============================================================================

export interface NavigationMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger> {}

const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  NavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => (
  <DropdownMenuTrigger
    ref={ref}
    className={cn(
      "group relative inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
      "text-surface-300 transition-all duration-150",
      // Hover state with 3D effect
      "hover:bg-surface-800/80 hover:text-surface-100",
      "hover:shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
      "hover:-translate-y-0.5",
      // Focus state
      "focus:bg-surface-800 focus:text-surface-100 focus:outline-none",
      "focus:shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
      // Open state
      "data-[state=open]:bg-surface-800 data-[state=open]:text-surface-100",
      "data-[state=open]:shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
      // Active state
      "active:translate-y-0 active:shadow-none",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <svg
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </DropdownMenuTrigger>
));

NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

// ============================================================================
// NavigationMenu Content
// ============================================================================

export interface NavigationMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuContent> {}

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  NavigationMenuContentProps
>(({ className, ...props }, ref) => (
  <DropdownMenuContent
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className
    )}
    {...props}
  />
));

NavigationMenuContent.displayName = "NavigationMenuContent";

// ============================================================================
// NavigationMenu Link
// ============================================================================

export interface NavigationMenuLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationMenuLinkProps
>(({ className, active, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "group relative inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
      "text-surface-300 transition-all duration-150",
      // Hover state with 3D effect
      "hover:bg-surface-800/80 hover:text-surface-100",
      "hover:shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
      "hover:-translate-y-0.5",
      // Focus state
      "focus:bg-surface-800 focus:text-surface-100 focus:outline-none",
      "focus:shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
      // Active state
      "active:translate-y-0 active:shadow-none",
      "disabled:pointer-events-none disabled:opacity-50",
      // Active link state
      active &&
        "bg-surface-800 text-surface-100 shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
      className
    )}
    {...props}
  />
));

NavigationMenuLink.displayName = "NavigationMenuLink";

// ============================================================================
// NavigationMenu Viewport
// ============================================================================

export interface NavigationMenuViewportProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const NavigationMenuViewport = React.forwardRef<
  HTMLDivElement,
  NavigationMenuViewportProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-full flex justify-center", className)}
    {...props}
  />
));

NavigationMenuViewport.displayName = "NavigationMenuViewport";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
};
