"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Command Variants
// ============================================================================

const commandVariants = cva(
  [
    "flex h-full w-full flex-col overflow-hidden rounded-lg",
    "bg-surface-800 border border-surface-700",
    // 3D effect with extrusion
    "shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.3)]",
    "before:absolute before:inset-0 before:rounded-lg",
    "before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none",
  ],
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ============================================================================
// Command Root
// ============================================================================

export interface CommandProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof commandVariants> {}

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(commandVariants({ size }), className)}
      {...props}
    />
  )
);

Command.displayName = "Command";

// ============================================================================
// Command Dialog (wrapper for dialog)
// ============================================================================

export interface CommandDialogProps extends CommandProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CommandDialog: React.FC<CommandDialogProps> = ({
  open,
  onOpenChange,
  children,
  ...props
}) => {
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange?.(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-[fade-in_200ms_ease-out]"
        onClick={() => onOpenChange?.(false)}
      />
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] pointer-events-none">
        <div
          className="w-full max-w-lg pointer-events-auto animate-[fade-in_200ms_ease-out,slide-in-from-top-4_200ms_ease-out]"
          onClick={(e) => e.stopPropagation()}
        >
          <Command {...props}>{children}</Command>
        </div>
      </div>
    </>
  );
};

CommandDialog.displayName = "CommandDialog";

// ============================================================================
// Command Input
// ============================================================================

export interface CommandInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <div className="flex items-center border-b border-surface-700/50 px-3 bg-surface-900/30">
      <svg
        className="mr-2 h-4 w-4 shrink-0 text-surface-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none",
          "text-surface-200 placeholder:text-surface-500",
          "focus:text-surface-100",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
);

CommandInput.displayName = "CommandInput";

// ============================================================================
// Command List
// ============================================================================

export interface CommandListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "max-h-[300px] overflow-y-auto overflow-x-hidden p-1",
        // Custom scrollbar
        "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2",
        "[&::-webkit-scrollbar-track]:bg-surface-900 [&::-webkit-scrollbar-track]:rounded-full",
        "[&::-webkit-scrollbar-thumb]:bg-surface-600 [&::-webkit-scrollbar-thumb]:rounded-full",
        "[&::-webkit-scrollbar-thumb]:border [&::-webkit-scrollbar-thumb]:border-surface-900",
        "[&::-webkit-scrollbar-thumb]:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
        "[&::-webkit-scrollbar-thumb:hover]:bg-surface-500",
        className
      )}
      {...props}
    />
  )
);

CommandList.displayName = "CommandList";

// ============================================================================
// Command Empty
// ============================================================================

export interface CommandEmptyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("py-6 text-center text-sm text-surface-500", className)}
      {...props}
    />
  )
);

CommandEmpty.displayName = "CommandEmpty";

// ============================================================================
// Command Group
// ============================================================================

export interface CommandGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode;
}

const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => (
    <div ref={ref} className={cn("overflow-hidden p-1", className)} {...props}>
      {heading && (
        <div className="px-2 py-1.5 text-xs font-semibold text-surface-400 uppercase tracking-wider">
          {heading}
        </div>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  )
);

CommandGroup.displayName = "CommandGroup";

// ============================================================================
// Command Item
// ============================================================================

export interface CommandItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  onSelect?: (value: string) => void;
  value?: string;
}

const CommandItem = React.forwardRef<HTMLButtonElement, CommandItemProps>(
  ({ className, onSelect, value, children, ...props }, ref) => {
    const handleSelect = () => {
      onSelect?.(value ?? "");
    };

    // Split children into content and shortcut
    const childrenArray = React.Children.toArray(children);
    let shortcut: React.ReactNode = null;
    const content: React.ReactNode[] = [];

    childrenArray.forEach((child) => {
      if (
        React.isValidElement(child) &&
        (child.type as any)?.displayName === "CommandShortcut"
      ) {
        shortcut = child;
      } else {
        content.push(child);
      }
    });

    return (
      <button
        ref={ref}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center justify-between rounded-md px-2 py-1.5 text-sm",
          "text-surface-200 outline-none",
          "transition-all duration-150",
          // 3D hover effect
          "hover:bg-surface-700/80 hover:text-surface-100",
          "hover:shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
          "hover:-translate-y-0.5",
          // Focus state
          "focus:bg-surface-700 focus:text-surface-100",
          "focus:shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
          // Selected state
          "data-[selected=true]:bg-primary-600/20 data-[selected=true]:text-primary-400",
          "data-[selected=true]:shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
          // Active state
          "active:translate-y-0 active:shadow-none",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onClick={handleSelect}
        {...props}
      >
        <span className="flex items-center gap-2 flex-1 min-w-0">
          {content}
        </span>
        {shortcut && <span className="shrink-0">{shortcut}</span>}
      </button>
    );
  }
);

CommandItem.displayName = "CommandItem";

// ============================================================================
// Command Shortcut
// ============================================================================

export interface CommandShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const CommandShortcut = React.forwardRef<HTMLSpanElement, CommandShortcutProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "ml-auto text-xs tracking-widest text-surface-500 shrink-0",
        className
      )}
      {...props}
    />
  )
);

CommandShortcut.displayName = "CommandShortcut";

// ============================================================================
// Command Separator
// ============================================================================

export interface CommandSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CommandSeparator = React.forwardRef<
  HTMLDivElement,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 h-px bg-surface-700", className)}
    {...props}
  />
));

CommandSeparator.displayName = "CommandSeparator";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  commandVariants,
};
