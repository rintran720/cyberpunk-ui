import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { TextField } from "../TextField";
import { Popover, PopoverTrigger, PopoverContent } from "../Popover";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../Select";

// ============================================================================
// Time Picker Variants
// ============================================================================

const timePickerVariants = cva("", {
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
// Time Picker Utilities
// ============================================================================

const formatTime = (
  date: Date | undefined,
  format: "12h" | "24h" = "24h",
  showSeconds: boolean = false
): string => {
  if (!date) return "";

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  if (format === "12h") {
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    if (showSeconds) {
      return `${displayHours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;
    }
    return `${displayHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  }

  if (showSeconds) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const parseTime = (
  value: string
): { hours: number; minutes: number; seconds: number } | null => {
  if (!value) return null;

  // Try HH:MM:SS format (24h)
  const time24WithSecondsMatch = value.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
  if (time24WithSecondsMatch) {
    const hours = parseInt(time24WithSecondsMatch[1], 10);
    const minutes = parseInt(time24WithSecondsMatch[2], 10);
    const seconds = parseInt(time24WithSecondsMatch[3], 10);
    if (
      hours >= 0 &&
      hours < 24 &&
      minutes >= 0 &&
      minutes < 60 &&
      seconds >= 0 &&
      seconds < 60
    ) {
      return { hours, minutes, seconds };
    }
  }

  // Try HH:MM format (24h)
  const time24Match = value.match(/^(\d{1,2}):(\d{2})$/);
  if (time24Match) {
    const hours = parseInt(time24Match[1], 10);
    const minutes = parseInt(time24Match[2], 10);
    if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
      return { hours, minutes, seconds: 0 };
    }
  }

  // Try HH:MM:SS AM/PM format (12h)
  const time12WithSecondsMatch = value.match(
    /^(\d{1,2}):(\d{2}):(\d{2})\s*(AM|PM)$/i
  );
  if (time12WithSecondsMatch) {
    let hours = parseInt(time12WithSecondsMatch[1], 10);
    const minutes = parseInt(time12WithSecondsMatch[2], 10);
    const seconds = parseInt(time12WithSecondsMatch[3], 10);
    const period = time12WithSecondsMatch[4].toUpperCase();

    if (
      hours >= 1 &&
      hours <= 12 &&
      minutes >= 0 &&
      minutes < 60 &&
      seconds >= 0 &&
      seconds < 60
    ) {
      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }
      return { hours, minutes, seconds };
    }
  }

  // Try HH:MM AM/PM format (12h)
  const time12Match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (time12Match) {
    let hours = parseInt(time12Match[1], 10);
    const minutes = parseInt(time12Match[2], 10);
    const period = time12Match[3].toUpperCase();

    if (hours >= 1 && hours <= 12 && minutes >= 0 && minutes < 60) {
      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }
      return { hours, minutes, seconds: 0 };
    }
  }

  return null;
};

// ============================================================================
// Time Picker Root
// ============================================================================

export interface TimePickerProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "onChange" | "defaultValue"
    >,
    VariantProps<typeof timePickerVariants> {
  /** Selected time (Date object, only hours and minutes are used) */
  value?: Date;
  /** Default time for uncontrolled */
  defaultValue?: Date;
  /** Callback when time changes */
  onChange?: (time: Date | undefined) => void;
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
  /** Time format (12h or 24h) */
  format?: "12h" | "24h";
  /** Step in minutes for time selection */
  step?: number;
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

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = "Select time",
      label,
      isRequired,
      error,
      helperText,
      format = "24h",
      step = 30,
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
    const [tempTime, setTempTime] = React.useState<Date | undefined>(
      controlledValue || defaultValue
    );
    const [inputValue, setInputValue] = React.useState(
      formatTime(controlledValue || defaultValue, format, showSeconds)
    );

    const isControlled = controlledValue !== undefined;
    const selectedTime = isControlled ? controlledValue : uncontrolledValue;

    // Update tempTime when Popover opens
    React.useEffect(() => {
      if (open) {
        setTempTime(selectedTime);
      }
    }, [open, selectedTime]);

    // Update input value when selected time changes
    React.useEffect(() => {
      setInputValue(formatTime(selectedTime, format, showSeconds));
    }, [selectedTime, format, showSeconds]);

    // Commit tempTime when Popover closes
    const handleOpenChange = React.useCallback(
      (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen && tempTime !== selectedTime) {
          // Popover is closing, commit the temp value
          if (!isControlled) {
            setUncontrolledValue(tempTime);
          }
          onChange?.(tempTime);
        }
      },
      [tempTime, selectedTime, isControlled, onChange]
    );

    // Generate hour, minute, second options
    const hourOptions = React.useMemo(() => {
      if (format === "12h") {
        return Array.from({ length: 12 }, (_, i) =>
          (i + 1).toString().padStart(2, "0")
        );
      }
      return Array.from({ length: 24 }, (_, i) =>
        i.toString().padStart(2, "0")
      );
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

    const currentHours = tempTime?.getHours() || 0;
    const currentMinutes = tempTime?.getMinutes() || 0;
    const currentSeconds = tempTime?.getSeconds() || 0;

    const displayHours =
      format === "12h"
        ? (currentHours % 12 || 12).toString().padStart(2, "0")
        : currentHours.toString().padStart(2, "0");
    const displayMinutes = currentMinutes.toString().padStart(2, "0");
    const displaySeconds = currentSeconds.toString().padStart(2, "0");
    const period = format === "12h" ? (currentHours >= 12 ? "PM" : "AM") : null;

    const handleHourChange = React.useCallback(
      (hourStr: string) => {
        const baseDate = tempTime || new Date();
        let hours = parseInt(hourStr, 10);

        if (format === "12h") {
          // If period is PM and hour is not 12, add 12
          // If period is AM and hour is 12, set to 0
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

        // Only update temp value, don't commit yet
        setTempTime(newTime);
        setInputValue(formatTime(newTime, format, showSeconds));
      },
      [tempTime, format, showSeconds]
    );

    const handleMinuteChange = React.useCallback(
      (minuteStr: string) => {
        const baseDate = tempTime || new Date();
        const minutes = parseInt(minuteStr, 10);
        const newTime = new Date(
          baseDate.getFullYear(),
          baseDate.getMonth(),
          baseDate.getDate(),
          baseDate.getHours(),
          minutes,
          baseDate.getSeconds()
        );

        // Only update temp value, don't commit yet
        setTempTime(newTime);
        setInputValue(formatTime(newTime, format, showSeconds));
      },
      [tempTime, format, showSeconds]
    );

    const handleSecondChange = React.useCallback(
      (secondStr: string) => {
        const baseDate = tempTime || new Date();
        const seconds = parseInt(secondStr, 10);
        const newTime = new Date(
          baseDate.getFullYear(),
          baseDate.getMonth(),
          baseDate.getDate(),
          baseDate.getHours(),
          baseDate.getMinutes(),
          seconds
        );

        // Only update temp value, don't commit yet
        setTempTime(newTime);
        setInputValue(formatTime(newTime, format, showSeconds));
      },
      [tempTime, format, showSeconds]
    );

    const handlePeriodChange = React.useCallback(
      (period: string) => {
        const baseDate = tempTime || new Date();
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

        // Only update temp value, don't commit yet
        setTempTime(newTime);
        setInputValue(formatTime(newTime, format, showSeconds));
      },
      [tempTime, format, showSeconds]
    );

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        const parsed = parseTime(value);
        if (parsed) {
          const baseDate = selectedTime || new Date();
          const newTime = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth(),
            baseDate.getDate(),
            parsed.hours,
            parsed.minutes,
            parsed.seconds
          );

          if (!isControlled) {
            setUncontrolledValue(newTime);
          }
          onChange?.(newTime);
        } else if (value === "") {
          if (!isControlled) {
            setUncontrolledValue(undefined);
          }
          onChange?.(undefined);
        }
      },
      [isControlled, onChange, selectedTime]
    );

    const handleInputBlur = React.useCallback(() => {
      if (inputValue) {
        const parsed = parseTime(inputValue);
        if (parsed) {
          setInputValue(formatTime(selectedTime, format, showSeconds));
        } else {
          setInputValue(formatTime(selectedTime, format, showSeconds));
        }
      }
    }, [inputValue, selectedTime, format, showSeconds]);

    return (
      <div
        ref={ref}
        className={cn(
          timePickerVariants({ size }),
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
            <div className="flex items-center gap-2">
              {/* Hour Select */}
              <Select value={displayHours} onValueChange={handleHourChange}>
                <SelectTrigger className={cn(fullWidth ? "w-full" : "w-14")}>
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

              <span className="text-surface-400 text-lg">:</span>

              {/* Minute Select */}
              <Select value={displayMinutes} onValueChange={handleMinuteChange}>
                <SelectTrigger className={cn(fullWidth ? "w-full" : "w-14")}>
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
                  <span className="text-surface-400 text-lg">:</span>
                  <Select
                    value={displaySeconds}
                    onValueChange={handleSecondChange}
                  >
                    <SelectTrigger
                      className={cn(fullWidth ? "w-full" : "w-14")}
                    >
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

              {/* Period Select (if 12h format) */}
              {format === "12h" && period && (
                <>
                  <Select value={period} onValueChange={handlePeriodChange}>
                    <SelectTrigger
                      className={cn(fullWidth ? "w-full" : "w-16")}
                    >
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
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

TimePicker.displayName = "TimePicker";

export { TimePicker, timePickerVariants };
