import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const cardVariants = cva(
  [
    "rounded-2xl",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-surface-800",
          "border border-surface-700",
          // 3D shadow
          "shadow-[0_4px_0_0_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.2)]",
        ],
        elevated: [
          "bg-surface-800",
          "border border-surface-700",
          // Deeper 3D shadow
          "shadow-[0_6px_0_0_rgba(0,0,0,0.2),0_12px_24px_-4px_rgba(0,0,0,0.25)]",
        ],
        outline: [
          "bg-transparent",
          "border-2 border-surface-600",
          "shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
        ],
        ghost: [
          "bg-surface-900/50",
          "border border-surface-800",
          "shadow-none",
        ],
        glass: [
          "bg-white/5 backdrop-blur-xl",
          "border border-white/10",
          "shadow-[0_4px_0_0_rgba(255,255,255,0.02),0_8px_32px_-4px_rgba(0,0,0,0.3)]",
        ],
        gradient: [
          "bg-gradient-to-br from-surface-800 via-surface-800 to-surface-900",
          "border border-surface-700",
          "shadow-[0_4px_0_0_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.2)]",
        ],
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      interactive: {
        true: [
          "cursor-pointer",
          "hover:-translate-y-1",
          "hover:shadow-[0_6px_0_0_rgba(0,0,0,0.15),0_12px_24px_-4px_rgba(0,0,0,0.25)]",
          "active:translate-y-0",
          "active:shadow-[0_2px_0_0_rgba(0,0,0,0.1),0_4px_8px_-2px_rgba(0,0,0,0.15)]",
        ],
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, interactive }), className)}
      {...props}
    />
  )
);

Card.displayName = "Card";

// Card Header
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

// Card Title
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold leading-none tracking-tight text-surface-100",
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

// Card Description
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-surface-400", className)}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

// Card Content
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-4", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

// Card Footer
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};

