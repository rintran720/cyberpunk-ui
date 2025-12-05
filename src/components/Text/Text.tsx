import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Text Variants
// ============================================================================

const textVariants = cva(["font-mono", "transition-colors duration-200"], {
  variants: {
    variant: {
      default: "text-primary-500",
      primary: "text-primary-500",
      secondary: "text-secondary-500",
      accent: "text-accent-500",
      muted: "text-primary-500/70",
      danger: "text-red-500",
      success: "text-emerald-500",
      warning: "text-yellow-500",
      info: "text-blue-500",
      white: "text-white",
      black: "text-black",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    glow: {
      none: "",
      sm: "drop-shadow-[0_0_4px_currentColor]",
      md: "drop-shadow-[0_0_8px_currentColor]",
      lg: "drop-shadow-[0_0_12px_currentColor]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    weight: "normal",
    align: "left",
    glow: "none",
  },
});

// ============================================================================
// Text Component
// ============================================================================

type TextElement =
  | "p"
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label"
  | "strong"
  | "em"
  | "small"
  | "code"
  | "pre";

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  /** HTML element to render */
  as?: TextElement;
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Number of lines to clamp (line clamp) */
  lineClamp?: number;
  /** Whether text should be uppercase */
  uppercase?: boolean;
  /** Whether text should be lowercase */
  lowercase?: boolean;
  /** Whether text should be capitalized */
  capitalize?: boolean;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as,
      className,
      variant,
      size,
      weight,
      align,
      glow,
      truncate,
      lineClamp,
      uppercase,
      lowercase,
      capitalize,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as || ("p" as TextElement);

    const lineClampClass = lineClamp
      ? lineClamp === 1
        ? "line-clamp-1"
        : lineClamp === 2
        ? "line-clamp-2"
        : lineClamp === 3
        ? "line-clamp-3"
        : lineClamp === 4
        ? "line-clamp-4"
        : lineClamp === 5
        ? "line-clamp-5"
        : lineClamp === 6
        ? "line-clamp-6"
        : undefined
      : undefined;

    return (
      <Component
        ref={ref as any}
        className={cn(
          textVariants({ variant, size, weight, align, glow }),
          truncate && "truncate",
          lineClampClass,
          uppercase && "uppercase",
          lowercase && "lowercase",
          capitalize && "capitalize",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

// ============================================================================
// Convenience Components
// ============================================================================

export interface HeadingProps extends Omit<TextProps, "as"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 1, size, className, ...props }, ref) => {
    const sizeMap = {
      1: "4xl",
      2: "3xl",
      3: "2xl",
      4: "xl",
      5: "lg",
      6: "md",
    } as const;

    const headingSize = size || sizeMap[level];
    const as = `h${level}` as TextElement;

    return (
      <Text
        ref={ref as any}
        as={as}
        size={headingSize as any}
        weight="semibold"
        className={cn(className)}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";

export interface ParagraphProps extends Omit<TextProps, "as"> {}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, ref) => {
    return <Text ref={ref as any} as="p" {...props} />;
  }
);

Paragraph.displayName = "Paragraph";

export interface SpanProps extends Omit<TextProps, "as"> {}

const Span = React.forwardRef<HTMLSpanElement, SpanProps>((props, ref) => {
  return <Text ref={ref as any} as="span" {...props} />;
});

Span.displayName = "Span";

export interface CodeProps extends Omit<TextProps, "as"> {}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, ...props }, ref) => {
    return (
      <Text
        ref={ref as any}
        as="code"
        className={cn(
          "bg-black/50 border border-cyber/30 px-1.5 py-0.5 rounded text-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Code.displayName = "Code";

export { Text, Heading, Paragraph, Span, Code, textVariants };
