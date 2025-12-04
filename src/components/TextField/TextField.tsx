import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Input variants
const inputVariants = cva(
  [
    "w-full",
    "rounded-lg",
    "transition-all duration-200",
    "outline-none",
    "placeholder:text-surface-500",
    // Disable browser styling
    "appearance-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-surface-900",
          "border border-surface-700",
          "text-surface-100",
          // 3D inset effect
          "shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.05)]",
          // Focus state
          "focus:border-primary-500",
          "focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_0_0_3px_rgba(51,166,255,0.15)]",
        ],
        filled: [
          "bg-surface-800",
          "border-2 border-transparent",
          "text-surface-100",
          // 3D effect
          "shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]",
          // Focus state
          "focus:bg-surface-900",
          "focus:border-primary-500",
          "focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_0_0_3px_rgba(51,166,255,0.15)]",
        ],
        outline: [
          "bg-transparent",
          "border-2 border-surface-600",
          "text-surface-100",
          // Subtle shadow
          "shadow-[0_2px_0_rgba(0,0,0,0.1)]",
          // Focus state
          "focus:border-primary-500",
          "focus:shadow-[0_2px_0_rgba(0,0,0,0.1),0_0_0_3px_rgba(51,166,255,0.15)]",
        ],
        glass: [
          "bg-white/5 backdrop-blur-md",
          "border border-white/20",
          "text-white",
          "placeholder:text-white/40",
          // Glass shadow
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_0_rgba(0,0,0,0.1)]",
          // Focus state
          "focus:border-white/40",
          "focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_3px_rgba(255,255,255,0.1)]",
        ],
      },
      inputSize: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-base",
        lg: "h-13 px-5 text-lg",
      },
      hasError: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Error states
      {
        variant: "default",
        hasError: true,
        className: [
          "border-red-500",
          "focus:border-red-500",
          "focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_0_0_3px_rgba(239,68,68,0.15)]",
        ],
      },
      {
        variant: "filled",
        hasError: true,
        className: [
          "border-red-500",
          "focus:border-red-500",
          "focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_0_0_3px_rgba(239,68,68,0.15)]",
        ],
      },
      {
        variant: "outline",
        hasError: true,
        className: [
          "border-red-500",
          "focus:border-red-500",
          "focus:shadow-[0_2px_0_rgba(0,0,0,0.1),0_0_0_3px_rgba(239,68,68,0.15)]",
        ],
      },
      {
        variant: "glass",
        hasError: true,
        className: [
          "border-red-400/50",
          "focus:border-red-400/50",
          "focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_3px_rgba(239,68,68,0.15)]",
        ],
      },
    ],
    defaultVariants: {
      variant: "default",
      inputSize: "md",
      hasError: false,
    },
  }
);

// Wrapper variants for 3D container effect
const wrapperVariants = cva(
  [
    "relative",
    "rounded-lg",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        default: [
          // 3D raised effect on wrapper
          "shadow-[0_4px_0_0_rgba(0,0,0,0.15),0_6px_12px_-4px_rgba(0,0,0,0.2)]",
        ],
        filled: [
          "shadow-[0_4px_0_0_rgba(0,0,0,0.15),0_6px_12px_-4px_rgba(0,0,0,0.2)]",
        ],
        outline: [
          "shadow-[0_4px_0_0_rgba(0,0,0,0.1),0_6px_12px_-4px_rgba(0,0,0,0.15)]",
        ],
        glass: [
          "shadow-[0_4px_0_0_rgba(255,255,255,0.03),0_6px_12px_-4px_rgba(0,0,0,0.25)]",
        ],
      },
      isFocused: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        isFocused: true,
        className: "shadow-[0_4px_0_0_rgba(51,166,255,0.2),0_8px_16px_-4px_rgba(51,166,255,0.15)]",
      },
      {
        variant: "filled",
        isFocused: true,
        className: "shadow-[0_4px_0_0_rgba(51,166,255,0.2),0_8px_16px_-4px_rgba(51,166,255,0.15)]",
      },
      {
        variant: "outline",
        isFocused: true,
        className: "shadow-[0_4px_0_0_rgba(51,166,255,0.15),0_8px_16px_-4px_rgba(51,166,255,0.1)]",
      },
      {
        variant: "glass",
        isFocused: true,
        className: "shadow-[0_4px_0_0_rgba(255,255,255,0.08),0_8px_16px_-4px_rgba(0,0,0,0.3)]",
      },
    ],
    defaultVariants: {
      variant: "default",
      isFocused: false,
    },
  }
);

// Label variants
const labelVariants = cva(
  [
    "block",
    "font-medium",
    "mb-2",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default: "text-surface-200",
        filled: "text-surface-200",
        outline: "text-surface-200",
        glass: "text-white/90",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      hasError: {
        true: "text-red-400",
        false: "",
      },
      isRequired: {
        true: "after:content-['*'] after:ml-0.5 after:text-red-400",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      hasError: false,
      isRequired: false,
    },
  }
);

// Helper text variants
const helperVariants = cva(
  [
    "mt-2",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default: "text-surface-400",
        filled: "text-surface-400",
        outline: "text-surface-400",
        glass: "text-white/60",
      },
      size: {
        sm: "text-xs",
        md: "text-xs",
        lg: "text-sm",
      },
      hasError: {
        true: "text-red-400",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      hasError: false,
    },
  }
);

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    Omit<VariantProps<typeof inputVariants>, "hasError"> {
  /** Label text */
  label?: string;
  /** Helper text shown below input */
  helperText?: string;
  /** Error message (also sets error state) */
  error?: string;
  /** Left icon or element */
  leftElement?: React.ReactNode;
  /** Right icon or element */
  rightElement?: React.ReactNode;
  /** Whether field is required */
  isRequired?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Container class name */
  containerClassName?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      variant = "default",
      inputSize = "md",
      label,
      helperText,
      error,
      leftElement,
      rightElement,
      isRequired,
      fullWidth,
      containerClassName,
      disabled,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasError = !!error;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className={cn(fullWidth ? "w-full" : "w-fit", containerClassName)}>
        {/* Label */}
        {label && (
          <label
            className={cn(
              labelVariants({
                variant,
                size: inputSize,
                hasError,
                isRequired,
              })
            )}
          >
            {label}
          </label>
        )}

        {/* Input wrapper with 3D effect */}
        <div
          className={cn(
            wrapperVariants({ variant, isFocused: isFocused && !disabled }),
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {/* Input container for icons */}
          <div className="relative">
            {/* Left element */}
            {leftElement && (
              <div
                className={cn(
                  "absolute left-0 top-0 bottom-0 flex items-center",
                  "text-surface-400 pointer-events-none",
                  inputSize === "sm" && "pl-3",
                  inputSize === "md" && "pl-4",
                  inputSize === "lg" && "pl-5",
                  variant === "glass" && "text-white/60"
                )}
              >
                {leftElement}
              </div>
            )}

            {/* Input */}
            <input
              ref={ref}
              disabled={disabled}
              className={cn(
                inputVariants({ variant, inputSize, hasError }),
                leftElement && (inputSize === "sm" ? "pl-10" : inputSize === "md" ? "pl-12" : "pl-14"),
                rightElement && (inputSize === "sm" ? "pr-10" : inputSize === "md" ? "pr-12" : "pr-14"),
                disabled && "cursor-not-allowed",
                className
              )}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />

            {/* Right element */}
            {rightElement && (
              <div
                className={cn(
                  "absolute right-0 top-0 bottom-0 flex items-center",
                  "text-surface-400",
                  inputSize === "sm" && "pr-3",
                  inputSize === "md" && "pr-4",
                  inputSize === "lg" && "pr-5",
                  variant === "glass" && "text-white/60"
                )}
              >
                {rightElement}
              </div>
            )}
          </div>
        </div>

        {/* Helper text or error */}
        {(helperText || error) && (
          <p
            className={cn(
              helperVariants({ variant, size: inputSize, hasError })
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

// Textarea component
const textareaVariants = cva(
  [
    "w-full",
    "rounded-lg",
    "transition-all duration-200",
    "outline-none",
    "placeholder:text-surface-500",
    "resize-none",
    "min-h-[100px]",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-surface-900",
          "border border-surface-700",
          "text-surface-100",
          "shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.05)]",
          "focus:border-primary-500",
          "focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_0_0_3px_rgba(51,166,255,0.15)]",
        ],
        filled: [
          "bg-surface-800",
          "border-2 border-transparent",
          "text-surface-100",
          "shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]",
          "focus:bg-surface-900",
          "focus:border-primary-500",
          "focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_0_0_3px_rgba(51,166,255,0.15)]",
        ],
        outline: [
          "bg-transparent",
          "border-2 border-surface-600",
          "text-surface-100",
          "shadow-[0_2px_0_rgba(0,0,0,0.1)]",
          "focus:border-primary-500",
          "focus:shadow-[0_2px_0_rgba(0,0,0,0.1),0_0_0_3px_rgba(51,166,255,0.15)]",
        ],
        glass: [
          "bg-white/5 backdrop-blur-md",
          "border border-white/20",
          "text-white",
          "placeholder:text-white/40",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_0_rgba(0,0,0,0.1)]",
          "focus:border-white/40",
          "focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_3px_rgba(255,255,255,0.1)]",
        ],
      },
      inputSize: {
        sm: "p-3 text-sm",
        md: "p-4 text-base",
        lg: "p-5 text-lg",
      },
      hasError: {
        true: "border-red-500 focus:border-red-500",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
      hasError: false,
    },
  }
);

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    Omit<VariantProps<typeof textareaVariants>, "hasError"> {
  /** Label text */
  label?: string;
  /** Helper text shown below textarea */
  helperText?: string;
  /** Error message (also sets error state) */
  error?: string;
  /** Whether field is required */
  isRequired?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Container class name */
  containerClassName?: string;
  /** Allow resize */
  resize?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      variant = "default",
      inputSize = "md",
      label,
      helperText,
      error,
      isRequired,
      fullWidth,
      containerClassName,
      disabled,
      resize = false,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasError = !!error;

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className={cn(fullWidth ? "w-full" : "w-fit", containerClassName)}>
        {/* Label */}
        {label && (
          <label
            className={cn(
              labelVariants({
                variant,
                size: inputSize,
                hasError,
                isRequired,
              })
            )}
          >
            {label}
          </label>
        )}

        {/* Textarea wrapper with 3D effect */}
        <div
          className={cn(
            wrapperVariants({ variant, isFocused: isFocused && !disabled }),
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <textarea
            ref={ref}
            disabled={disabled}
            className={cn(
              textareaVariants({ variant, inputSize, hasError }),
              resize && "resize-y",
              disabled && "cursor-not-allowed",
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        </div>

        {/* Helper text or error */}
        {(helperText || error) && (
          <p
            className={cn(
              helperVariants({ variant, size: inputSize, hasError })
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export { TextField, TextArea, inputVariants, textareaVariants };

