import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Icons
const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const SuccessIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const WarningIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const ErrorIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

const alertVariants = cva(
  [
    "relative w-full",
    "rounded",
    "p-4",
    "transition-all duration-200",
    "font-mono",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
    "[&>svg~*]:pl-8",
    "[&>svg+div]:translate-y-[-3px]",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-black/80",
          "border border-primary-500/30",
          "text-primary-500",
          "shadow-cyber-border",
          "[&>svg]:text-primary-500/60",
        ],
        info: [
          "bg-black/80",
          "border border-primary-500",
          "text-primary-500",
          "shadow-cyber-primary",
          "[&>svg]:text-primary-500",
        ],
        success: [
          "bg-black/80",
          "border border-green-500",
          "text-green-500",
          "shadow-[0_0_10px_rgba(0,255,0,0.6),0_0_20px_rgba(0,255,0,0.4)]",
          "[&>svg]:text-green-500",
        ],
        warning: [
          "bg-black/80",
          "border border-amber-500",
          "text-amber-500",
          "shadow-[0_0_10px_rgba(255,193,7,0.6),0_0_20px_rgba(255,193,7,0.4)]",
          "[&>svg]:text-amber-500",
        ],
        destructive: [
          "bg-black/80",
          "border border-red-500",
          "text-red-500",
          "shadow-[0_0_10px_rgba(255,0,0,0.6),0_0_20px_rgba(255,0,0,0.4)]",
          "[&>svg]:text-red-500",
        ],
        glass: [
          "bg-primary-500/10 backdrop-blur-xl",
          "border border-primary-500/30",
          "text-primary-500",
          "shadow-cyber-border",
          "[&>svg]:text-primary-500/70",
        ],
      },
      size: {
        sm: "p-3 text-sm [&>svg]:h-4 [&>svg]:w-4 [&>svg~*]:pl-6",
        md: "p-4 text-base [&>svg]:h-5 [&>svg]:w-5 [&>svg~*]:pl-8",
        lg: "p-5 text-lg [&>svg]:h-6 [&>svg]:w-6 [&>svg~*]:pl-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Show default icon based on variant */
  showIcon?: boolean;
  /** Custom icon to display */
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, size, showIcon = true, icon, children, ...props }, ref) => {
    // Get default icon based on variant
    const getDefaultIcon = () => {
      if (icon) return icon;
      if (!showIcon) return null;

      switch (variant) {
        case "info":
          return <InfoIcon />;
        case "success":
          return <SuccessIcon />;
        case "warning":
          return <WarningIcon />;
        case "destructive":
          return <ErrorIcon />;
        default:
          return <InfoIcon />;
      }
    };

    const defaultIcon = getDefaultIcon();

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, size }), className)}
        {...props}
      >
        {defaultIcon}
        {children}
      </div>
    );
  }
);

Alert.displayName = "Alert";

// Alert Title
const alertTitleVariants = cva("font-semibold leading-tight tracking-tight", {
  variants: {
    size: {
      sm: "text-sm mb-1",
      md: "text-base mb-1",
      lg: "text-lg mb-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface AlertTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof alertTitleVariants> {}

const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, size, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn(alertTitleVariants({ size }), className)}
      {...props}
    />
  )
);

AlertTitle.displayName = "AlertTitle";

// Alert Description
const alertDescriptionVariants = cva("leading-relaxed font-mono", {
  variants: {
    variant: {
      default: "text-primary-500/70",
      info: "text-primary-500/70",
      success: "text-green-500/70",
      warning: "text-amber-500/70",
      destructive: "text-red-500/70",
      glass: "text-primary-500/70",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof alertDescriptionVariants> {}

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(alertDescriptionVariants({ variant, size }), className)}
    {...props}
  />
));

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };

