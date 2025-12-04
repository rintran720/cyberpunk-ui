import * as React from "react";
import { cn } from "../../lib/utils";

// ============================================================================
// DropdownMenu Context
// ============================================================================

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

const DropdownMenuContext =
  React.createContext<DropdownMenuContextValue | null>(null);

const useDropdownMenuContext = () => {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(
      "DropdownMenu components must be used within a DropdownMenu"
    );
  }
  return context;
};

// ============================================================================
// DropdownMenu Root
// ============================================================================

export interface DropdownMenuProps {
  /** Whether the menu is open (controlled) */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [searchQuery, setSearchQuery] = React.useState("");
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
      // Clear search query when closing
      if (!newOpen) {
        setSearchQuery("");
      }
    },
    [isControlled, onOpenChange]
  );

  return (
    <DropdownMenuContext.Provider
      value={{ open, setOpen, triggerRef, searchQuery, setSearchQuery }}
    >
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  );
};

// ============================================================================
// DropdownMenu Trigger
// ============================================================================

export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ children, asChild, onClick, ...props }, _ref) => {
  const { open, setOpen, triggerRef } = useDropdownMenuContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(!open);
    onClick?.(e);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onClick: handleClick,
      "aria-expanded": open,
      "aria-haspopup": "menu",
      ...props,
    });
  }

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-expanded={open}
      aria-haspopup="menu"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
});

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// ============================================================================
// DropdownMenu Content
// ============================================================================

export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment of the menu */
  align?: "start" | "center" | "end";
  /** Side offset */
  sideOffset?: number;
}

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(
  (
    { className, align = "start", sideOffset = 4, children, ...props },
    _ref
  ) => {
    const { open, setOpen } = useDropdownMenuContext();
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Close on click outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          document.removeEventListener("keydown", handleEscape);
        };
      }
    }, [open, setOpen]);

    if (!open) return null;

    // For center alignment, we need to use transform
    // But we'll use a wrapper approach to avoid animation conflicts
    const alignmentClasses = {
      start: "left-0",
      center: "", // handled via style
      end: "right-0",
    };

    const centerStyle =
      align === "center" ? { left: "50%", transform: "translateX(-50%)" } : {};

    return (
      <div
        ref={contentRef}
        role="menu"
        className={cn(
          "absolute z-50 top-full min-w-[180px] p-1",
          "rounded-lg border border-surface-600",
          "bg-surface-800",
          // 3D effect
          "shadow-[0_8px_16px_rgba(0,0,0,0.3),0_4px_0_0_rgba(0,0,0,0.2)]",
          alignmentClasses[align],
          className
        )}
        style={{
          marginTop: sideOffset,
          ...centerStyle,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownMenuContent.displayName = "DropdownMenuContent";

// ============================================================================
// DropdownMenu Item
// ============================================================================

export interface DropdownMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether to close menu on click */
  closeOnClick?: boolean;
  /** Inset for icon alignment */
  inset?: boolean;
  /** Searchable text for filtering (if not provided, uses children text) */
  searchableText?: string;
  /** Whether this item should be hidden when search query doesn't match */
  hideOnSearch?: boolean;
}

const DropdownMenuItem = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(
  (
    {
      className,
      closeOnClick = true,
      inset,
      disabled,
      onClick,
      children,
      searchableText,
      hideOnSearch = true,
      ...props
    },
    ref
  ) => {
    const { setOpen, searchQuery } = useDropdownMenuContext();

    // Get text content from children for search matching
    const getTextContent = (node: React.ReactNode): string => {
      if (typeof node === "string") return node;
      if (typeof node === "number") return String(node);
      if (Array.isArray(node)) return node.map(getTextContent).join("");
      if (React.isValidElement(node) && node.props.children) {
        return getTextContent(node.props.children);
      }
      return "";
    };

    const itemText = searchableText || getTextContent(children);
    const shouldHide =
      hideOnSearch &&
      searchQuery &&
      searchQuery.trim() !== "" &&
      !itemText.toLowerCase().includes(searchQuery.toLowerCase().trim());

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onClick?.(e);
        if (closeOnClick) {
          setOpen(false);
        }
      }
    };

    if (shouldHide) return null;

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2",
          "text-sm text-surface-200",
          "transition-colors duration-150",
          "hover:bg-surface-700 hover:text-surface-100",
          "focus:bg-surface-700 focus:outline-none",
          "active:bg-surface-600",
          disabled && "pointer-events-none opacity-50",
          inset && "pl-8",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DropdownMenuItem.displayName = "DropdownMenuItem";

// ============================================================================
// DropdownMenu CheckboxItem
// ============================================================================

export interface DropdownMenuCheckboxItemProps
  extends Omit<DropdownMenuItemProps, "onClick"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuCheckboxItemProps
>(({ className, checked, onCheckedChange, children, ...props }, ref) => {
  return (
    <DropdownMenuItem
      ref={ref}
      closeOnClick={false}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn("pl-8", className)}
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        {checked && (
          <svg
            className="h-4 w-4 text-primary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      {children}
    </DropdownMenuItem>
  );
});

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

// ============================================================================
// DropdownMenu RadioItem
// ============================================================================

export interface DropdownMenuRadioItemProps
  extends Omit<DropdownMenuItemProps, "onClick"> {
  value: string;
  checked?: boolean;
  onSelect?: () => void;
}

const DropdownMenuRadioItem = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuRadioItemProps
>(({ className, checked, onSelect, children, ...props }, ref) => {
  return (
    <DropdownMenuItem
      ref={ref}
      closeOnClick={false}
      onClick={onSelect}
      className={cn("pl-8", className)}
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        {checked && <span className="h-2 w-2 rounded-full bg-primary-500" />}
      </span>
      {children}
    </DropdownMenuItem>
  );
});

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

// ============================================================================
// DropdownMenu Label
// ============================================================================

export interface DropdownMenuLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "px-3 py-1.5 text-xs font-semibold text-surface-400 uppercase tracking-wider",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
});

DropdownMenuLabel.displayName = "DropdownMenuLabel";

// ============================================================================
// DropdownMenu Separator
// ============================================================================

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="separator"
      className={cn("my-1 h-px bg-surface-700", className)}
      {...props}
    />
  );
});

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// ============================================================================
// DropdownMenu Shortcut
// ============================================================================

const DropdownMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "ml-auto text-xs tracking-widest text-surface-500",
        className
      )}
      {...props}
    />
  );
});

DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// ============================================================================
// DropdownMenu Sub (Submenu - simplified version)
// ============================================================================

interface DropdownMenuSubContextValue {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const DropdownMenuSubContext =
  React.createContext<DropdownMenuSubContextValue | null>(null);

export interface DropdownMenuSubProps {
  children: React.ReactNode;
}

const DropdownMenuSub: React.FC<DropdownMenuSubProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const openTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const handleOpen = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (!open) {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
      }
      openTimeoutRef.current = setTimeout(() => {
        setOpen(true);
        openTimeoutRef.current = null;
      }, 100);
    }
  }, [open]);

  const handleClose = React.useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (open) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      closeTimeoutRef.current = setTimeout(() => {
        setOpen(false);
        closeTimeoutRef.current = null;
      }, 200);
    }
  }, [open]);

  React.useEffect(() => {
    return () => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <DropdownMenuSubContext.Provider value={{ open, handleOpen, handleClose }}>
      <div className="relative">{children}</div>
    </DropdownMenuSubContext.Provider>
  );
};

export interface DropdownMenuSubTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean;
}

const DropdownMenuSubTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => {
  const context = React.useContext(DropdownMenuSubContext);

  return (
    <button
      ref={ref}
      type="button"
      onMouseEnter={context?.handleOpen}
      onMouseLeave={context?.handleClose}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2",
        "text-sm text-surface-200",
        "transition-colors duration-150",
        "hover:bg-surface-700 hover:text-surface-100",
        "focus:bg-surface-700 focus:outline-none",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <svg
        className="ml-auto h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
});

DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export interface DropdownMenuSubContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSubContentProps
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(DropdownMenuSubContext);

  if (!context?.open) return null;

  return (
    <div
      ref={ref}
      onMouseEnter={context?.handleOpen}
      onMouseLeave={context?.handleClose}
      className={cn(
        "absolute left-full top-0 z-50 min-w-[180px] p-1 ml-1",
        "rounded-lg border border-surface-600",
        "bg-surface-800",
        "shadow-[0_8px_16px_rgba(0,0,0,0.3),0_4px_0_0_rgba(0,0,0,0.2)]",
        "animate-in fade-in-0 zoom-in-95 slide-in-from-left-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

// ============================================================================
// DropdownMenu Search
// ============================================================================

export interface DropdownMenuSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Placeholder text */
  placeholder?: string;
}

const DropdownMenuSearch = React.forwardRef<
  HTMLInputElement,
  DropdownMenuSearchProps
>(({ className, placeholder = "Search...", ...props }, ref) => {
  const { searchQuery, setSearchQuery } = useDropdownMenuContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery?.(e.target.value);
    props.onChange?.(e);
  };

  return (
    <div className="px-2 py-1.5">
      <input
        ref={ref}
        type="text"
        value={searchQuery || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "w-full px-3 py-1.5 text-sm",
          "rounded-md border border-surface-600",
          "bg-surface-700 text-surface-200",
          "placeholder:text-surface-500",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
          "transition-colors duration-150",
          className
        )}
        {...props}
      />
    </div>
  );
});

DropdownMenuSearch.displayName = "DropdownMenuSearch";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSearch,
};
