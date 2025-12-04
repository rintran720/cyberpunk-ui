"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
} from "../DropdownMenu";

// ============================================================================
// Menubar Root
// ============================================================================

export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 items-center space-x-1 rounded-lg",
        "bg-surface-800 border border-surface-700",
        // 3D effect
        "shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_6px_12px_-2px_rgba(0,0,0,0.25)]",
        "before:absolute before:inset-0 before:rounded-lg",
        "before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none",
        "p-1",
        className
      )}
      role="menubar"
      {...props}
    />
  )
);

Menubar.displayName = "Menubar";

// ============================================================================
// Menubar Menu
// ============================================================================

export interface MenubarMenuProps {
  children: React.ReactNode;
}

const MenubarMenu: React.FC<MenubarMenuProps> = ({ children }) => {
  return <DropdownMenu>{children}</DropdownMenu>;
};

MenubarMenu.displayName = "MenubarMenu";

// ============================================================================
// Menubar Trigger
// ============================================================================

export interface MenubarTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger> {}

const MenubarTrigger = React.forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ className, ...props }, ref) => (
    <DropdownMenuTrigger
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md px-3 py-1.5 text-sm font-medium outline-none",
        "text-surface-300 transition-all duration-150",
        // Hover state with 3D effect
        "hover:bg-surface-700/80 hover:text-surface-100",
        "hover:shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
        "hover:-translate-y-0.5",
        // Focus state
        "focus:bg-surface-700 focus:text-surface-100",
        "focus:shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
        // Open state
        "data-[state=open]:bg-surface-700 data-[state=open]:text-surface-100",
        "data-[state=open]:shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
        // Active state
        "active:translate-y-0 active:shadow-none",
        className
      )}
      {...props}
    />
  )
);

MenubarTrigger.displayName = "MenubarTrigger";

// ============================================================================
// Menubar Content
// ============================================================================

export interface MenubarContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuContent> {}

const MenubarContent = React.forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ className, align = "start", sideOffset = 8, ...props }, ref) => (
    <DropdownMenuContent
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(className)}
      {...props}
    />
  )
);

MenubarContent.displayName = "MenubarContent";

// ============================================================================
// Menubar Item
// ============================================================================

export interface MenubarItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuItem> {
  inset?: boolean;
}

const MenubarItem = React.forwardRef<HTMLButtonElement, MenubarItemProps>(
  ({ className, inset, ...props }, ref) => (
    <DropdownMenuItem
      ref={ref}
      className={cn(inset && "pl-8", className)}
      {...props}
    />
  )
);

MenubarItem.displayName = "MenubarItem";

// ============================================================================
// Menubar Separator
// ============================================================================

export interface MenubarSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuSeparator> {}

const MenubarSeparator = React.forwardRef<
  HTMLDivElement,
  MenubarSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuSeparator ref={ref} className={cn(className)} {...props} />
));

MenubarSeparator.displayName = "MenubarSeparator";

// ============================================================================
// Menubar Sub
// ============================================================================

export interface MenubarSubProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuSub> {}

const MenubarSub: React.FC<MenubarSubProps> = (props) => (
  <DropdownMenuSub {...props} />
);

MenubarSub.displayName = "MenubarSub";

// ============================================================================
// Menubar Sub Trigger
// ============================================================================

export interface MenubarSubTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuSubTrigger> {
  inset?: boolean;
}

const MenubarSubTrigger = React.forwardRef<
  HTMLButtonElement,
  MenubarSubTriggerProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuSubTrigger
    ref={ref}
    className={cn(inset && "pl-8", className)}
    {...props}
  />
));

MenubarSubTrigger.displayName = "MenubarSubTrigger";

// ============================================================================
// Menubar Sub Content
// ============================================================================

export interface MenubarSubContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuSubContent> {}

const MenubarSubContent = React.forwardRef<
  HTMLDivElement,
  MenubarSubContentProps
>(({ className, ...props }, ref) => (
  <DropdownMenuSubContent ref={ref} className={cn(className)} {...props} />
));

MenubarSubContent.displayName = "MenubarSubContent";

// ============================================================================
// Menubar Checkbox Item
// ============================================================================

export interface MenubarCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuCheckboxItem> {}

const MenubarCheckboxItem = React.forwardRef<
  HTMLButtonElement,
  MenubarCheckboxItemProps
>(({ className, ...props }, ref) => (
  <DropdownMenuCheckboxItem ref={ref} className={cn(className)} {...props} />
));

MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

// ============================================================================
// Menubar Radio Item
// ============================================================================

export interface MenubarRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuRadioItem> {}

const MenubarRadioItem = React.forwardRef<
  HTMLButtonElement,
  MenubarRadioItemProps
>(({ className, ...props }, ref) => (
  <DropdownMenuRadioItem ref={ref} className={cn(className)} {...props} />
));

MenubarRadioItem.displayName = "MenubarRadioItem";

// ============================================================================
// Menubar Label
// ============================================================================

export interface MenubarLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuLabel> {
  inset?: boolean;
}

const MenubarLabel = React.forwardRef<HTMLDivElement, MenubarLabelProps>(
  ({ className, inset, ...props }, ref) => (
    <DropdownMenuLabel
      ref={ref}
      className={cn(inset && "pl-8", className)}
      {...props}
    />
  )
);

MenubarLabel.displayName = "MenubarLabel";

// ============================================================================
// Menubar Shortcut
// ============================================================================

export interface MenubarShortcutProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuShortcut> {}

const MenubarShortcut = React.forwardRef<HTMLSpanElement, MenubarShortcutProps>(
  ({ className, ...props }, ref) => (
    <DropdownMenuShortcut ref={ref} className={cn(className)} {...props} />
  )
);

MenubarShortcut.displayName = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarShortcut,
};
