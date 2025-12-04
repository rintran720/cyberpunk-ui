import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Calendar } from "../Calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../Popover";
import { TextField } from "../TextField";

// ============================================================================
// Date Picker Variants
// ============================================================================

const datePickerVariants = cva("", {
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
});

// ============================================================================
// Date Picker Utilities
// ============================================================================

const formatDate = (
  date: Date | undefined,
  format: string = "MM/DD/YYYY"
): string => {
  if (!date) return "";

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return format
    .replace("DD", day)
    .replace("MM", month)
    .replace("YYYY", year.toString())
    .replace("YY", year.toString().slice(-2));
};

const parseDate = (value: string): Date | null => {
  if (!value) return null;

  // Try MM/DD/YYYY format
  const parts = value.split("/");
  if (parts.length === 3) {
    const month = parseInt(parts[0], 10) - 1;
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
      const date = new Date(year, month, day);
      if (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      ) {
        return date;
      }
    }
  }

  // Try YYYY-MM-DD format
  const isoParts = value.split("-");
  if (isoParts.length === 3) {
    const year = parseInt(isoParts[0], 10);
    const month = parseInt(isoParts[1], 10) - 1;
    const day = parseInt(isoParts[2], 10);

    if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
      const date = new Date(year, month, day);
      if (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      ) {
        return date;
      }
    }
  }

  return null;
};

// ============================================================================
// Date Picker Root
// ============================================================================

export interface DatePickerProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "onChange" | "defaultValue"
    >,
    VariantProps<typeof datePickerVariants> {
  /** Selected date */
  value?: Date;
  /** Default date for uncontrolled */
  defaultValue?: Date;
  /** Callback when date changes */
  onChange?: (date: Date | undefined) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Label for the input */
  label?: string;
  /** Whether the input is required */
  isRequired?: boolean;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disabled dates */
  disabledDates?: Date[];
  /** Date format string (default: MM/DD/YYYY) */
  dateFormat?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Size of the input */
  inputSize?: "sm" | "md" | "lg";
  /** Variant of the input */
  inputVariant?: "default" | "filled" | "outline" | "glass";
  /** Whether the input should be full width */
  fullWidth?: boolean;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = "Select a date",
      label,
      isRequired,
      error,
      helperText,
      minDate,
      maxDate,
      disabledDates,
      dateFormat = "MM/DD/YYYY",
      disabled,
      size = "md",
      inputSize = "md",
      inputVariant = "default",
      fullWidth = true,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      Date | undefined
    >(defaultValue);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(
      formatDate(controlledValue || defaultValue, dateFormat)
    );

    const isControlled = controlledValue !== undefined;
    const selectedDate = isControlled ? controlledValue : uncontrolledValue;

    // Update input value when selected date changes
    React.useEffect(() => {
      setInputValue(formatDate(selectedDate, dateFormat));
    }, [selectedDate, dateFormat]);

    const handleOpenChange = React.useCallback((newOpen: boolean) => {
      setOpen(newOpen);
    }, []);

    const handleDateChange = React.useCallback(
      (date: Date) => {
        // Commit immediately and close popover
        if (!isControlled) {
          setUncontrolledValue(date);
        }
        onChange?.(date);
        setInputValue(formatDate(date, dateFormat));
        setOpen(false);
      },
      [dateFormat, isControlled, onChange]
    );

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        const parsedDate = parseDate(value);
        if (parsedDate) {
          if (!isControlled) {
            setUncontrolledValue(parsedDate);
          }
          onChange?.(parsedDate);
        } else if (value === "") {
          if (!isControlled) {
            setUncontrolledValue(undefined);
          }
          onChange?.(undefined);
        }
      },
      [isControlled, onChange]
    );

    const handleInputBlur = React.useCallback(() => {
      // Validate and format the input on blur
      if (inputValue) {
        const parsedDate = parseDate(inputValue);
        if (parsedDate) {
          setInputValue(formatDate(parsedDate, dateFormat));
        } else {
          // If invalid, revert to selected date or empty
          setInputValue(formatDate(selectedDate, dateFormat));
        }
      }
    }, [inputValue, selectedDate, dateFormat]);

    return (
      <div
        ref={ref}
        className={cn(
          datePickerVariants({ size }),
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        <Popover
          open={open}
          onOpenChange={handleOpenChange}
          fullWidth={fullWidth}
        >
          <PopoverTrigger asChild>
            <div className={cn(fullWidth && "w-full block")}>
              <TextField
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder={placeholder}
                label={label}
                isRequired={isRequired}
                error={error}
                helperText={helperText}
                disabled={disabled}
                inputSize={inputSize}
                variant={inputVariant}
                readOnly={false}
                fullWidth={fullWidth}
                rightElement={
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!disabled) {
                        setOpen(true);
                      }
                    }}
                    disabled={disabled}
                    className={cn(
                      "cursor-pointer hover:text-surface-300 transition-colors",
                      disabled && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <svg
                      className="h-5 w-5 text-surface-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                }
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 rounded-2xl overflow-hidden"
            align="start"
          >
            <Calendar
              value={selectedDate}
              onChange={handleDateChange}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              showNavigation
              allowOutsideDays={false}
              className="rounded-none border-0 shadow-none"
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker, datePickerVariants };
