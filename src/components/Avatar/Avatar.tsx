import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const avatarVariants = cva(
  [
    "relative inline-flex shrink-0 overflow-hidden rounded-full",
    // 3D effect
    "shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
    "border-2 border-surface-600",
  ],
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
        "2xl": "h-20 w-20 text-xl",
      },
      variant: {
        default: "bg-surface-700",
        primary: "bg-primary-500/20 border-primary-500/50",
        secondary: "bg-secondary-500/20 border-secondary-500/50",
        accent: "bg-accent-500/20 border-accent-500/50",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

// ============================================================================
// Avatar Root
// ============================================================================

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ size, variant }), className)}
        {...props}
      />
    );
  }
);

Avatar.displayName = "Avatar";

// ============================================================================
// Avatar Image
// ============================================================================

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    if (hasError) return null;

    return (
      <img
        ref={ref}
        alt={alt}
        onError={() => setHasError(true)}
        className={cn("aspect-square h-full w-full object-cover", className)}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = "AvatarImage";

// ============================================================================
// Avatar Fallback
// ============================================================================

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Delay before showing fallback (for loading states) */
  delayMs?: number;
}

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, delayMs = 0, children, ...props }, ref) => {
    const [canRender, setCanRender] = React.useState(delayMs === 0);

    React.useEffect(() => {
      if (delayMs > 0) {
        const timer = setTimeout(() => setCanRender(true), delayMs);
        return () => clearTimeout(timer);
      }
    }, [delayMs]);

    if (!canRender) return null;

    return (
      <span
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center",
          "bg-gradient-to-br from-surface-600 to-surface-700",
          "font-medium text-surface-200",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

AvatarFallback.displayName = "AvatarFallback";

// ============================================================================
// Avatar Group
// ============================================================================

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to show */
  max?: number;
  /** Size of avatars */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, size = "md", children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = max ? childrenArray.length - max : 0;

    return (
      <div
        ref={ref}
        className={cn("flex -space-x-3", className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div key={index} className="relative" style={{ zIndex: visibleChildren.length - index }}>
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
              : child}
          </div>
        ))}
        {remainingCount > 0 && (
          <Avatar size={size} className="relative z-0">
            <AvatarFallback className="bg-surface-600 text-surface-300">
              +{remainingCount}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

// ============================================================================
// Avatar with Status
// ============================================================================

export interface AvatarWithStatusProps extends AvatarProps {
  /** Status indicator */
  status?: "online" | "offline" | "away" | "busy";
  /** Position of status indicator */
  statusPosition?: "top-right" | "bottom-right";
}

const statusColors = {
  online: "bg-green-500",
  offline: "bg-surface-500",
  away: "bg-amber-500",
  busy: "bg-red-500",
};

const AvatarWithStatus = React.forwardRef<HTMLSpanElement, AvatarWithStatusProps>(
  ({ className, size, variant, status, statusPosition = "bottom-right", children, ...props }, ref) => {
    const statusSizes = {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-3.5 w-3.5",
      "2xl": "h-4 w-4",
    };

    const positions = {
      "top-right": "top-0 right-0",
      "bottom-right": "bottom-0 right-0",
    };

    return (
      <div className="relative inline-block">
        <Avatar ref={ref} size={size} variant={variant} className={className} {...props}>
          {children}
        </Avatar>
        {status && (
          <span
            className={cn(
              "absolute block rounded-full ring-2 ring-surface-900",
              statusColors[status],
              statusSizes[size ?? "md"],
              positions[statusPosition],
              // 3D effect
              "shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            )}
          />
        )}
      </div>
    );
  }
);

AvatarWithStatus.displayName = "AvatarWithStatus";

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarWithStatus,
  avatarVariants,
};

