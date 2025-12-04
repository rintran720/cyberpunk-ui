import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Form Variants
// ============================================================================

const formVariants = cva(["w-full"], {
  variants: {
    variant: {
      default: "",
      inline: "flex items-end gap-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const formItemVariants = cva(["mb-4 last:mb-0"], {
  variants: {
    variant: {
      default: "",
      inline: "mb-0 flex-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const formLabelVariants = cva(
  [
    "block",
    "text-sm font-medium",
    "text-surface-200",
    "mb-2",
  ],
  {
    variants: {
      required: {
        true: "after:content-['*'] after:ml-1 after:text-red-400",
        false: "",
      },
    },
  }
);

const formMessageVariants = cva(
  [
    "text-sm",
    "mt-1",
  ],
  {
    variants: {
      variant: {
        error: "text-red-400",
        helper: "text-surface-400",
        success: "text-green-400",
      },
    },
    defaultVariants: {
      variant: "helper",
    },
  }
);

// ============================================================================
// Form Context (for react-hook-form integration)
// ============================================================================

interface FormContextValue {
  errors?: Record<string, any>;
  touchedFields?: Record<string, boolean>;
  register?: (name: string, options?: any) => any;
  setValue?: (name: string, value: any) => void;
  getValues?: (name?: string) => any;
  watch?: (name?: string) => any;
  formState?: any;
}

const FormContext = React.createContext<FormContextValue | null>(null);

const useFormContext = () => {
  return React.useContext(FormContext);
};

// ============================================================================
// Form Root
// ============================================================================

export interface FormProps
  extends React.FormHTMLAttributes<HTMLFormElement>,
    VariantProps<typeof formVariants> {
  /** React Hook Form methods (optional) */
  formMethods?: any;
  /** Children */
  children: React.ReactNode;
  /** Form variant */
  variant?: "default" | "inline";
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, variant = "default", formMethods, children, ...props }, ref) => {
    const contextValue: FormContextValue = React.useMemo(
      () => ({
        errors: formMethods?.formState?.errors,
        touchedFields: formMethods?.formState?.touchedFields,
        register: formMethods?.register,
        setValue: formMethods?.setValue,
        getValues: formMethods?.getValues,
        watch: formMethods?.watch,
        formState: formMethods?.formState,
      }),
      [formMethods]
    );

    return (
      <FormContext.Provider value={contextValue}>
        <form
          ref={ref}
          className={cn(formVariants({ variant }), className)}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);

Form.displayName = "Form";

// ============================================================================
// Form Item
// ============================================================================

export interface FormItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formItemVariants> {
  /** Field name for error display */
  name?: string;
  /** Children */
  children: React.ReactNode;
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, name, variant, children, ...props }, ref) => {
    const formContext = useFormContext();
    const error = name && formContext?.errors?.[name];

    return (
      <div
        ref={ref}
        className={cn(formItemVariants({ variant }), className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Pass error state to form field components
            if (
              typeof child.type === "string" ||
              (child.type as any)?.displayName === "TextField" ||
              (child.type as any)?.displayName === "TextArea" ||
              (child.type as any)?.displayName === "Select" ||
              (child.type as any)?.displayName === "DatePicker"
            ) {
              return React.cloneElement(child as React.ReactElement<any>, {
                error: error?.message || child.props.error,
                ...child.props,
              });
            }
          }
          return child;
        })}
      </div>
    );
  }
);

FormItem.displayName = "FormItem";

// ============================================================================
// Form Label
// ============================================================================

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof formLabelVariants> {
  /** Whether the field is required */
  required?: boolean;
  /** Children */
  children: React.ReactNode;
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(formLabelVariants({ required }), className)}
        {...props}
      >
        {children}
      </label>
    );
  }
);

FormLabel.displayName = "FormLabel";

// ============================================================================
// Form Message
// ============================================================================

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof formMessageVariants> {
  /** Field name for error display */
  name?: string;
  /** Custom message */
  message?: string;
  /** Message variant */
  variant?: "error" | "helper" | "success";
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, name, message, variant, ...props }, ref) => {
    const formContext = useFormContext();
    const error = name && formContext?.errors?.[name];
    const displayMessage = message || error?.message;

    if (!displayMessage) return null;

    const messageVariant = variant || (error ? "error" : "helper");

    return (
      <p
        ref={ref}
        className={cn(formMessageVariants({ variant: messageVariant }), className)}
        {...props}
      >
        {displayMessage}
      </p>
    );
  }
);

FormMessage.displayName = "FormMessage";

// ============================================================================
// Form Description
// ============================================================================

export interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Children */
  children: React.ReactNode;
}

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-surface-400 mt-1", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

FormDescription.displayName = "FormDescription";

// ============================================================================
// Form Field (wrapper for react-hook-form Controller)
// ============================================================================

export interface FormFieldProps {
  /** Field name */
  name: string;
  /** React Hook Form control */
  control?: any;
  /** Render function */
  render?: (props: {
    field: any;
    fieldState: any;
    formState: any;
  }) => React.ReactNode;
  /** Children (alternative to render) */
  children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  control,
  render,
  children,
}) => {
  // If react-hook-form is available and control is provided
  if (control && typeof control === "object" && "register" in control) {
    // This would typically use Controller from react-hook-form
    // For now, we'll provide a basic implementation
    const field = {
      name,
      value: control.getValues?.(name) || "",
      onChange: (e: any) => {
        const value = e?.target?.value ?? e;
        control.setValue?.(name, value);
      },
      onBlur: () => {
        // Handle blur if needed
      },
      ref: control.register?.(name),
    };

    const fieldState = {
      error: control.formState?.errors?.[name],
      isTouched: control.formState?.touchedFields?.[name],
      isDirty: control.formState?.dirtyFields?.[name],
    };

    if (render) {
      return <>{render({ field, fieldState, formState: control.formState })}</>;
    }

    if (children) {
      return (
        <>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                ...field,
                error: fieldState.error?.message,
                ...child.props,
              });
            }
            return child;
          })}
        </>
      );
    }
  }

  // Fallback if no control provided
  return <>{children}</>;
};

FormField.displayName = "FormField";

export {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  FormField,
  formVariants,
  formItemVariants,
  formLabelVariants,
  formMessageVariants,
  useFormContext,
};

