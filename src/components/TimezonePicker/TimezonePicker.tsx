import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator,
} from "../Select";

// ============================================================================
// Timezone Picker Variants
// ============================================================================

const timezonePickerVariants = cva("", {
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
// Timezone Data
// ============================================================================

// Type for timezone item
export type TimezoneItem = {
  value: string;
  label: string;
  offset: number;
};

// All other timezones (sorted by offset, ascending)
const OTHER_TIMEZONES = [
  { value: "Pacific/Honolulu", label: "Hawaii Time (HST)", offset: -10 },
  { value: "America/Anchorage", label: "Alaska Time (AKT)", offset: -9 },
  { value: "America/Vancouver", label: "Vancouver (PST/PDT)", offset: -8 },
  { value: "America/Phoenix", label: "Arizona Time (MST)", offset: -7 },
  { value: "America/Denver", label: "Mountain Time (MT)", offset: -7 },
  { value: "America/Chicago", label: "Central Time (CT)", offset: -6 },
  { value: "America/Mexico_City", label: "Mexico City (CST/CDT)", offset: -6 },
  { value: "America/Toronto", label: "Toronto (EST/EDT)", offset: -5 },
  { value: "America/Sao_Paulo", label: "São Paulo (BRT/BRST)", offset: -3 },
  { value: "America/Buenos_Aires", label: "Buenos Aires (ART)", offset: -3 },
  { value: "Europe/Berlin", label: "Berlin (CET/CEST)", offset: 1 },
  { value: "Europe/Rome", label: "Rome (CET/CEST)", offset: 1 },
  { value: "Europe/Madrid", label: "Madrid (CET/CEST)", offset: 1 },
  { value: "Europe/Amsterdam", label: "Amsterdam (CET/CEST)", offset: 1 },
  { value: "Europe/Stockholm", label: "Stockholm (CET/CEST)", offset: 1 },
  { value: "Europe/Zurich", label: "Zurich (CET/CEST)", offset: 1 },
  { value: "Europe/Vienna", label: "Vienna (CET/CEST)", offset: 1 },
  { value: "Europe/Prague", label: "Prague (CET/CEST)", offset: 1 },
  { value: "Europe/Warsaw", label: "Warsaw (CET/CEST)", offset: 1 },
  { value: "Africa/Lagos", label: "Lagos (WAT)", offset: 1 },
  { value: "Europe/Athens", label: "Athens (EET/EEST)", offset: 2 },
  { value: "Africa/Cairo", label: "Cairo (EET)", offset: 2 },
  { value: "Africa/Johannesburg", label: "Johannesburg (SAST)", offset: 2 },
  { value: "Europe/Istanbul", label: "Istanbul (TRT)", offset: 3 },
  { value: "Europe/Moscow", label: "Moscow (MSK)", offset: 3 },
  { value: "Asia/Dubai", label: "Dubai (GST)", offset: 4 },
  { value: "Asia/Karachi", label: "Karachi (PKT)", offset: 5 },
  { value: "Asia/Kolkata", label: "Kolkata (IST)", offset: 5 },
  { value: "Asia/Dhaka", label: "Dhaka (BST)", offset: 6 },
  { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)", offset: 8 },
  { value: "Australia/Perth", label: "Perth (AWST)", offset: 8 },
  { value: "Asia/Seoul", label: "Seoul (KST)", offset: 9 },
  { value: "Australia/Brisbane", label: "Brisbane (AEST)", offset: 10 },
  { value: "Australia/Melbourne", label: "Melbourne (AEDT/AEST)", offset: 10 },
  { value: "Pacific/Auckland", label: "Auckland (NZDT/NZST)", offset: 12 },
].sort((a, b) => a.offset - b.offset);

// ============================================================================
// Timezone Picker Root
// ============================================================================

export interface TimezonePickerProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "onChange" | "defaultValue"
    >,
    VariantProps<typeof timezonePickerVariants> {
  /** Selected timezone */
  value?: string;
  /** Default timezone for uncontrolled */
  defaultValue?: string;
  /** Callback when timezone changes */
  onChange?: (timezone: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Label for the select */
  label?: string;
  /** Whether the select is required */
  isRequired?: boolean;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Size of the select */
  size?: "sm" | "md" | "lg";
  /** Whether the select should be full width */
  fullWidth?: boolean;
  /** Custom priority timezones to display at the top */
  priorityTimezones?: TimezoneItem[];
}

const TimezonePicker = React.forwardRef<HTMLDivElement, TimezonePickerProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = "",
      onChange,
      placeholder = "Select timezone",
      label,
      isRequired,
      error,
      helperText,
      disabled,
      size = "md",
      fullWidth = true,
      priorityTimezones,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] =
      React.useState<string>(defaultValue);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    // Use custom priority timezones if provided, otherwise empty array
    const activePriorityTimezones = priorityTimezones || [];

    // Combine all timezones for lookup
    const allTimezones = [...activePriorityTimezones, ...OTHER_TIMEZONES];

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange]
    );

    const selectedTimezone = allTimezones.find((tz) => tz.value === value);
    const selectedOffset = selectedTimezone
      ? selectedTimezone.offset >= 0
        ? `+${selectedTimezone.offset}`
        : `${selectedTimezone.offset}`
      : null;
    const selectedDisplayLabel = selectedTimezone
      ? `${selectedOffset} ${selectedTimezone.label}`
      : placeholder;

    return (
      <div
        ref={ref}
        className={cn(
          timezonePickerVariants({ size }),
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {label && (
          <label className="block text-sm font-medium text-surface-300 mb-2">
            {label}
            {isRequired && <span className="text-danger-500 ml-1">*</span>}
          </label>
        )}
        <Select
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          disabled={disabled}
        >
          <SelectTrigger
            className={cn(fullWidth && "w-full")}
            placeholder={placeholder}
            size={size}
          >
            {selectedDisplayLabel}
          </SelectTrigger>
          <SelectContent>
            {/* Priority timezones */}
            {activePriorityTimezones.map((timezone) => {
              const offsetStr =
                timezone.offset >= 0
                  ? `+${timezone.offset}`
                  : `${timezone.offset}`;
              return (
                <SelectItem key={timezone.value} value={timezone.value}>
                  {offsetStr} {timezone.label}
                </SelectItem>
              );
            })}

            {/* Separator */}
            {activePriorityTimezones.length > 0 &&
              OTHER_TIMEZONES.length > 0 && <SelectSeparator />}

            {/* Other timezones */}
            {OTHER_TIMEZONES.map((timezone) => {
              const offsetStr =
                timezone.offset >= 0
                  ? `+${timezone.offset}`
                  : `${timezone.offset}`;
              return (
                <SelectItem key={timezone.value} value={timezone.value}>
                  {offsetStr} {timezone.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {error && <p className="mt-1 text-sm text-danger-500">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-surface-400">{helperText}</p>
        )}
      </div>
    );
  }
);

TimezonePicker.displayName = "TimezonePicker";

export { TimezonePicker, timezonePickerVariants };
