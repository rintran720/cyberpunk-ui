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
        "text-primary-500 font-mono transition-all duration-150",
        "border border-transparent",
        // Cyberpunk hover state
        "hover:bg-primary-500/10 hover:text-primary-500",
        "hover:shadow-cyber-border-lg hover:border-cyber",
        "hover:drop-shadow-[0_0_8px_rgba(64,244,255,0.4)]",
        // Focus state
        "focus:bg-primary-500/10 focus:text-primary-500 focus:outline-none",
        "focus:shadow-cyber-border-lg focus:border-cyber",
        "focus:drop-shadow-[0_0_8px_rgba(64,244,255,0.4)]",
        // Open state
        "data-[state=open]:bg-primary-500/20 data-[state=open]:text-primary-500",
        "data-[state=open]:shadow-cyber-primary data-[state=open]:border-primary-500",
        "data-[state=open]:drop-shadow-[0_0_12px_rgba(64,244,255,0.8)]",
        // Active state
        "active:bg-primary-500/20 active:border-primary-500",
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
      "text-primary-500 font-mono transition-all duration-150",
      "border border-transparent",
      // Cyberpunk hover state
      "hover:bg-primary-500/10 hover:text-primary-500",
      "hover:shadow-cyber-border-lg hover:border-cyber",
      "hover:drop-shadow-[0_0_8px_rgba(64,244,255,0.4)]",
      // Focus state
      "focus:bg-primary-500/10 focus:text-primary-500 focus:outline-none",
      "focus:shadow-cyber-border-lg focus:border-cyber",
      "focus:drop-shadow-[0_0_8px_rgba(64,244,255,0.4)]",
      // Active state
      "active:bg-primary-500/20 active:border-primary-500",
      "disabled:pointer-events-none disabled:opacity-50",
      // Active link state
      active &&
        "bg-primary-500/20 text-primary-500 border-primary-500 shadow-cyber-primary drop-shadow-[0_0_12px_rgba(64,244,255,0.8)]",
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
