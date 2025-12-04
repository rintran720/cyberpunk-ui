import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const cardVariants = cva(
  ["rounded", "transition-all duration-200", "relative"],
  {
    variants: {
      variant: {
        default: [
          "bg-black/80",
          "border border-cyber",
          "shadow-cyber-border",
          "backdrop-blur-sm",
        ],
        elevated: [
          "bg-black/90",
          "border border-cyber",
          "shadow-cyber-border-lg",
          "backdrop-blur-md",
        ],
        outline: [
          "bg-transparent",
          "border-2 border-cyber",
          "shadow-cyber-border",
        ],
        ghost: ["bg-primary-500/5", "border border-cyber", "shadow-none"],
        glass: [
          "bg-primary-500/10 backdrop-blur-xl",
          "border border-cyber",
          "shadow-cyber-border",
        ],
        gradient: [
          "bg-gradient-to-br from-black via-primary-500/10 to-black",
          "border border-cyber",
          "shadow-cyber-border",
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
          "border-cyber-hover",
          "hover:shadow-cyber-border-lg",
          "hover:bg-primary-500/10",
          "active:bg-primary-500/15",
          "active:shadow-cyber-border",
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
export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold font-mono leading-none tracking-tight text-primary-500",
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

// Card Description
export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-primary-500/70 font-mono", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

// Card Content
export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

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
