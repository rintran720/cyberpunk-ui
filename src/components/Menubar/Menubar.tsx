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
        "bg-black/80 border-2 border-cyber",
        "shadow-cyber-border-lg",
        "p-1",
        "before:absolute before:inset-0 before:rounded-lg before:bg-[linear-gradient(90deg,transparent,var(--cyber-glow-primary),transparent)] before:opacity-10 before:pointer-events-none",
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
        "text-primary-500 font-mono transition-all duration-150",
        "border border-transparent",
        // Cyberpunk hover state
        "hover:bg-primary-500/10 hover:text-primary-500",
        "hover:shadow-cyber-border-lg hover:border-cyber",
        "hover:drop-shadow-[0_0_8px_rgba(64,244,255,0.4)]",
        // Focus state
        "focus:bg-primary-500/10 focus:text-primary-500",
        "focus:shadow-cyber-border-lg focus:border-cyber",
        "focus:drop-shadow-[0_0_8px_rgba(64,244,255,0.4)]",
        // Open state
        "data-[state=open]:bg-primary-500/20 data-[state=open]:text-primary-500",
        "data-[state=open]:shadow-cyber-primary data-[state=open]:border-primary-500",
        "data-[state=open]:drop-shadow-[0_0_12px_rgba(64,244,255,0.8)]",
        // Active state
        "active:bg-primary-500/20 active:border-primary-500",
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
