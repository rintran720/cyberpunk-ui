import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Calendar } from "../Calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../Popover";
import { TextField } from "../TextField";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../Select";

// ============================================================================
// DateTime Picker Variants
// ============================================================================

const dateTimePickerVariants = cva("", {
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
// DateTime Picker Utilities
// ============================================================================

const formatDateTime = (
  date: Date | undefined,
  dateFormat: string = "MM/DD/YYYY",
  timeFormat: "12h" | "24h" = "24h",
  showSeconds: boolean = false
): string => {
  if (!date) return "";

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let timeStr = "";
  if (timeFormat === "12h") {
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    if (showSeconds) {
      timeStr = `${displayHours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;
    } else {
      timeStr = `${displayHours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`;
    }
  } else {
    if (showSeconds) {
      timeStr = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      timeStr = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    }
  }

  const dateStr = dateFormat
    .replace("DD", day)
    .replace("MM", month)
    .replace("YYYY", year.toString())
    .replace("YY", year.toString().slice(-2));

  return `${dateStr} ${timeStr}`;
};

// ============================================================================
// Time Picker Inline (for use inside DateTimePicker)
// ============================================================================

interface TimePickerInlineProps {
  value?: Date;
  onChange?: (time: Date | undefined) => void;
  format?: "12h" | "24h";
  step?: number;
  showSeconds?: boolean;
}

const TimePickerInline: React.FC<TimePickerInlineProps> = ({
  value,
  onChange,
  format = "24h",
  step = 30,
  showSeconds = false,
}) => {
  const currentHours = value?.getHours() || 0;
  const currentMinutes = value?.getMinutes() || 0;
  const currentSeconds = value?.getSeconds() || 0;

  const displayHours =
    format === "12h"
      ? (currentHours % 12 || 12).toString().padStart(2, "0")
      : currentHours.toString().padStart(2, "0");
  const displayMinutes = currentMinutes.toString().padStart(2, "0");
  const displaySeconds = currentSeconds.toString().padStart(2, "0");
  const period = format === "12h" ? (currentHours >= 12 ? "PM" : "AM") : null;

  const hourOptions = React.useMemo(() => {
    if (format === "12h") {
      return Array.from({ length: 12 }, (_, i) =>
        (i + 1).toString().padStart(2, "0")
      );
    }
    return Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  }, [format]);

  const minuteOptions = React.useMemo(() => {
    const options: string[] = [];
    for (let i = 0; i < 60; i += step) {
      options.push(i.toString().padStart(2, "0"));
    }
    return options;
  }, [step]);

  const secondOptions = React.useMemo(() => {
    if (!showSeconds) return [];
    const options: string[] = [];
    const stepSeconds = Math.max(1, step);
    for (let i = 0; i < 60; i += stepSeconds) {
      options.push(i.toString().padStart(2, "0"));
    }
    return options;
  }, [showSeconds, step]);

  const handleHourChange = React.useCallback(
    (hourStr: string) => {
      const baseDate = value || new Date();
      let hours = parseInt(hourStr, 10);

      if (format === "12h") {
        const currentPeriod = baseDate.getHours() >= 12 ? "PM" : "AM";
        if (currentPeriod === "PM" && hours !== 12) {
          hours += 12;
        } else if (currentPeriod === "AM" && hours === 12) {
          hours = 0;
        }
      }

      const newTime = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate(),
        hours,
        baseDate.getMinutes(),
        baseDate.getSeconds()
      );

      onChange?.(newTime);
    },
    [value, format, onChange]
  );

  const handleMinuteChange = React.useCallback(
    (minuteStr: string) => {
      const baseDate = value || new Date();
      const minutes = parseInt(minuteStr, 10);
      const newTime = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate(),
        baseDate.getHours(),
        minutes,
        baseDate.getSeconds()
      );

      onChange?.(newTime);
    },
    [value, onChange]
  );

  const handleSecondChange = React.useCallback(
    (secondStr: string) => {
      const baseDate = value || new Date();
      const seconds = parseInt(secondStr, 10);
      const newTime = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate(),
        baseDate.getHours(),
        baseDate.getMinutes(),
        seconds
      );

      onChange?.(newTime);
    },
    [value, onChange]
  );

  const handlePeriodChange = React.useCallback(
    (period: string) => {
      const baseDate = value || new Date();
      let hours = baseDate.getHours();
      const displayHour = hours % 12 || 12;

      if (period === "PM" && hours < 12) {
        hours = displayHour + 12;
      } else if (period === "AM" && hours >= 12) {
        hours = displayHour === 12 ? 0 : displayHour;
      }

      const newTime = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate(),
        hours,
        baseDate.getMinutes(),
        baseDate.getSeconds()
      );

      onChange?.(newTime);
    },
    [value, onChange]
  );

  return (
    <div className="flex items-center gap-1.5">
      {/* Hour Select */}
      <Select
        value={displayHours}
        onValueChange={handleHourChange}
        className="flex-1"
      >
        <SelectTrigger className="h-8 text-sm px-2 min-w-0 w-full">
          {displayHours}
        </SelectTrigger>
        <SelectContent className="z-[60] max-h-[200px] overflow-y-auto min-w-[80px]">
          {hourOptions.map((hour) => (
            <SelectItem key={hour} value={hour}>
              {hour}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className="text-surface-400 text-sm flex-shrink-0">:</span>

      {/* Minute Select */}
      <Select
        value={displayMinutes}
        onValueChange={handleMinuteChange}
        className="flex-1"
      >
        <SelectTrigger className="h-8 text-sm px-2 min-w-0 w-full">
          {displayMinutes}
        </SelectTrigger>
        <SelectContent className="z-[60] max-h-[200px] overflow-y-auto min-w-[80px]">
          {minuteOptions.map((minute) => (
            <SelectItem key={minute} value={minute}>
              {minute}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Second Select (if showSeconds) */}
      {showSeconds && (
        <>
          <span className="text-surface-400 text-sm flex-shrink-0">:</span>
          <Select
            value={displaySeconds}
            onValueChange={handleSecondChange}
            className="flex-1"
          >
            <SelectTrigger className="h-8 text-sm px-2 min-w-0 w-full">
              {displaySeconds}
            </SelectTrigger>
            <SelectContent className="z-[60] max-h-[200px] overflow-y-auto min-w-[80px]">
              {secondOptions.map((second) => (
                <SelectItem key={second} value={second}>
                  {second}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}

      {/* Period Select (if 12h format and showSeconds) */}
      {format === "12h" && period && showSeconds && (
        <>
          <Select
            value={period}
            onValueChange={handlePeriodChange}
            className="flex-1"
          >
            <SelectTrigger className="h-8 text-sm px-2 min-w-0 w-full">
              {period}
            </SelectTrigger>
            <SelectContent className="z-[60] max-h-[200px] overflow-y-auto">
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  );
};

// ============================================================================
// DateTime Picker Root
// ============================================================================

export interface DateTimePickerProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "onChange" | "defaultValue"
    >,
    VariantProps<typeof dateTimePickerVariants> {
  /** Selected date and time */
  value?: Date;
  /** Default date and time for uncontrolled */
  defaultValue?: Date;
  /** Callback when date/time changes */
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
  /** Time format (12h or 24h) */
  timeFormat?: "12h" | "24h";
  /** Step in minutes for time selection */
  timeStep?: number;
  /** Whether to show seconds */
  showSeconds?: boolean;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Size of the input */
  inputSize?: "sm" | "md" | "lg";
  /** Variant of the input */
  inputVariant?: "default" | "filled" | "outline" | "glass";
  /** Whether the input should be full width */
  fullWidth?: boolean;
}

const DateTimePicker = React.forwardRef<HTMLDivElement, DateTimePickerProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = "Select date and time",
      label,
      isRequired,
      error,
      helperText,
      minDate,
      maxDate,
      disabledDates,
      dateFormat = "MM/DD/YYYY",
      timeFormat = "24h",
      timeStep = 30,
      showSeconds = false,
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
    const [tempDateTime, setTempDateTime] = React.useState<Date | undefined>(
      controlledValue || defaultValue
    );
    const [inputValue, setInputValue] = React.useState(
      formatDateTime(
        controlledValue || defaultValue,
        dateFormat,
        timeFormat,
        showSeconds
      )
    );

    const isControlled = controlledValue !== undefined;
    const selectedDateTime = isControlled ? controlledValue : uncontrolledValue;

    // Update tempDateTime when Popover opens
    React.useEffect(() => {
      if (open) {
        setTempDateTime(selectedDateTime);
      }
    }, [open, selectedDateTime]);

    // Update input value when selected date/time changes
    React.useEffect(() => {
      setInputValue(
        formatDateTime(selectedDateTime, dateFormat, timeFormat, showSeconds)
      );
    }, [selectedDateTime, dateFormat, timeFormat, showSeconds]);

    // Commit tempDateTime when Popover closes
    const handleOpenChange = React.useCallback(
      (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen && tempDateTime !== selectedDateTime) {
          // Popover is closing, commit the temp value
          if (!isControlled) {
            setUncontrolledValue(tempDateTime);
          }
          onChange?.(tempDateTime);
        }
      },
      [tempDateTime, selectedDateTime, isControlled, onChange]
    );

    const handleDateChange = React.useCallback(
      (date: Date) => {
        const baseDate = tempDateTime || new Date();
        const newDateTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          baseDate.getHours(),
          baseDate.getMinutes(),
          baseDate.getSeconds()
        );

        // Only update temp value, don't commit yet
        setTempDateTime(newDateTime);
        setInputValue(
          formatDateTime(newDateTime, dateFormat, timeFormat, showSeconds)
        );
      },
      [tempDateTime, dateFormat, timeFormat, showSeconds]
    );

    const handleTimeChange = React.useCallback(
      (time: Date | undefined) => {
        if (!time) return;

        const baseDate = tempDateTime || new Date();
        const newDateTime = new Date(
          baseDate.getFullYear(),
          baseDate.getMonth(),
          baseDate.getDate(),
          time.getHours(),
          time.getMinutes(),
          time.getSeconds()
        );

        // Only update temp value, don't commit yet
        setTempDateTime(newDateTime);
        setInputValue(
          formatDateTime(newDateTime, dateFormat, timeFormat, showSeconds)
        );
      },
      [tempDateTime, dateFormat, timeFormat, showSeconds]
    );

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        // Could add parsing logic here if needed
      },
      []
    );

    const handleInputBlur = React.useCallback(() => {
      setInputValue(
        formatDateTime(selectedDateTime, dateFormat, timeFormat, showSeconds)
      );
    }, [selectedDateTime, dateFormat, timeFormat, showSeconds]);

    return (
      <div
        ref={ref}
        className={cn(
          dateTimePickerVariants({ size }),
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
            className="w-auto p-4 rounded-2xl"
            align="start"
            side="bottom"
          >
            <div className="flex flex-col gap-4">
              {/* Calendar */}
              <div>
                <Calendar
                  value={tempDateTime}
                  onChange={handleDateChange}
                  minDate={minDate}
                  maxDate={maxDate}
                  disabledDates={disabledDates}
                  showNavigation
                  allowOutsideDays={false}
                  className="rounded-lg border border-surface-600 shadow-none"
                />
              </div>

              {/* Time Picker - inline version without Popover */}
              <div className="border-t border-surface-600 pt-4">
                <label className="text-sm text-surface-300 mb-2 block">
                  Time
                </label>
                <TimePickerInline
                  value={tempDateTime}
                  onChange={handleTimeChange}
                  format={timeFormat}
                  step={timeStep}
                  showSeconds={showSeconds}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker, dateTimePickerVariants };
