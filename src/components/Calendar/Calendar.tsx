import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Calendar Variants
// ============================================================================

const calendarVariants = cva(
  [
    "inline-block",
    "rounded-2xl",
    "bg-surface-800",
    "border border-surface-700",
    "shadow-[0_4px_0_0_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.2)]",
    "p-4",
  ],
  {
    variants: {
      size: {
        sm: "p-3 text-sm",
        md: "p-4 text-base",
        lg: "p-6 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const calendarHeaderVariants = cva(
  [
    "flex items-center justify-between",
    "mb-4",
  ],
  {
    variants: {
      size: {
        sm: "mb-2",
        md: "mb-4",
        lg: "mb-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const calendarNavButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "h-8 w-8",
    "rounded-lg",
    "text-surface-300",
    "transition-all duration-100",
    "hover:bg-surface-700",
    "hover:text-surface-100",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
    "hover:shadow-[0_3px_0_0_rgba(0,0,0,0.1)]",
    "hover:-translate-y-0.5",
    "active:translate-y-0.5",
    "active:shadow-[0_1px_0_0_rgba(0,0,0,0.1)]",
  ]
);

const calendarDayButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "h-9 w-9",
    "rounded-lg",
    "text-sm font-medium",
    "transition-all duration-100",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1",
    "disabled:opacity-30 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        default: [
          "text-surface-300",
          "hover:bg-surface-700",
          "hover:text-surface-100",
          "shadow-[0_1px_0_0_rgba(0,0,0,0.1)]",
        ],
        today: [
          "text-primary-400",
          "font-semibold",
          "bg-surface-700/50",
          "border border-primary-500/30",
          "shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
        ],
        selected: [
          "bg-gradient-to-b from-primary-400 to-primary-600",
          "text-white",
          "border-t border-primary-300/50",
          "shadow-[0_2px_0_0_theme(colors.primary.700),0_4px_8px_-2px_rgba(0,0,0,0.3)]",
          "hover:from-primary-300 hover:to-primary-500",
          "hover:shadow-[0_3px_0_0_theme(colors.primary.700),0_6px_12px_-2px_rgba(0,0,0,0.35)]",
        ],
        outside: [
          "text-surface-500",
          "opacity-50",
        ],
        disabled: [
          "text-surface-600",
          "opacity-30",
          "cursor-not-allowed",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ============================================================================
// Calendar Utilities
// ============================================================================

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

// ============================================================================
// Calendar Root
// ============================================================================

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    VariantProps<typeof calendarVariants> {
  /** Selected date */
  value?: Date;
  /** Default date for uncontrolled */
  defaultValue?: Date;
  /** Callback when date changes */
  onChange?: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disabled dates */
  disabledDates?: Date[];
  /** Whether to show month/year navigation */
  showNavigation?: boolean;
  /** Whether to allow selecting dates from other months */
  allowOutsideDays?: boolean;
  /** Locale for month/day names */
  locale?: string;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      disabledDates = [],
      showNavigation = true,
      allowOutsideDays = false,
      size = "md",
      locale = "en-US",
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      defaultValue || new Date()
    );
    const [currentMonth, setCurrentMonth] = React.useState(
      controlledValue || defaultValue || new Date()
    );

    const isControlled = controlledValue !== undefined;
    const selectedDate = isControlled ? controlledValue : uncontrolledValue;

    const handleDateSelect = React.useCallback(
      (date: Date) => {
        // Check if date is disabled
        if (isDateDisabled(date)) {
          return;
        }

        if (!isControlled) {
          setUncontrolledValue(date);
        }
        onChange?.(date);
      },
      [isControlled, onChange]
    );

    const isDateDisabled = React.useCallback(
      (date: Date): boolean => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        return disabledDates.some((disabledDate) =>
          isSameDay(date, disabledDate)
        );
      },
      [minDate, maxDate, disabledDates]
    );

    const navigateMonth = React.useCallback(
      (direction: "prev" | "next") => {
        setCurrentMonth((prev) => {
          const newDate = new Date(prev);
          if (direction === "prev") {
            newDate.setMonth(prev.getMonth() - 1);
          } else {
            newDate.setMonth(prev.getMonth() + 1);
          }
          return newDate;
        });
      },
      []
    );

    const navigateToToday = React.useCallback(() => {
      const today = new Date();
      setCurrentMonth(today);
      handleDateSelect(today);
    }, [handleDateSelect]);

    // Generate calendar days
    const calendarDays = React.useMemo(() => {
      const days: Array<{
        date: Date;
        isCurrentMonth: boolean;
        isToday: boolean;
        isSelected: boolean;
        isDisabled: boolean;
      }> = [];

      const firstDay = getFirstDayOfMonth(currentMonth);
      const daysInMonth = getDaysInMonth(currentMonth);
      const daysInPrevMonth = getDaysInMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
      );

      // Previous month days
      if (allowOutsideDays) {
        for (let i = firstDay - 1; i >= 0; i--) {
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() - 1,
            daysInPrevMonth - i
          );
          days.push({
            date,
            isCurrentMonth: false,
            isToday: isToday(date),
            isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
            isDisabled: isDateDisabled(date),
          });
        }
      } else {
        // Fill with empty slots
        for (let i = 0; i < firstDay; i++) {
          days.push({
            date: new Date(0),
            isCurrentMonth: false,
            isToday: false,
            isSelected: false,
            isDisabled: true,
          });
        }
      }

      // Current month days
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          i
        );
        days.push({
          date,
          isCurrentMonth: true,
          isToday: isToday(date),
          isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
          isDisabled: isDateDisabled(date),
        });
      }

      // Next month days
      const remainingSlots = 42 - days.length; // 6 weeks * 7 days
      if (allowOutsideDays) {
        for (let i = 1; i <= remainingSlots; i++) {
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + 1,
            i
          );
          days.push({
            date,
            isCurrentMonth: false,
            isToday: isToday(date),
            isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
            isDisabled: isDateDisabled(date),
          });
        }
      } else {
        // Fill with empty slots
        for (let i = 0; i < remainingSlots; i++) {
          days.push({
            date: new Date(0),
            isCurrentMonth: false,
            isToday: false,
            isSelected: false,
            isDisabled: true,
          });
        }
      }

      return days;
    }, [
      currentMonth,
      selectedDate,
      allowOutsideDays,
      isDateDisabled,
    ]);

    return (
      <div
        ref={ref}
        className={cn(calendarVariants({ size }), className)}
        {...props}
      >
        {showNavigation && (
          <div className={cn(calendarHeaderVariants({ size }))}>
            <button
              type="button"
              onClick={() => navigateMonth("prev")}
              className={cn(calendarNavButtonVariants())}
              aria-label="Previous month"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={navigateToToday}
                className="px-3 py-1 rounded-lg text-sm font-medium text-surface-300 hover:bg-surface-700 hover:text-surface-100 transition-colors"
              >
                Today
              </button>
              <h3 className="font-semibold text-surface-100 min-w-[140px] text-center">
                {MONTH_NAMES[currentMonth.getMonth()]}{" "}
                {currentMonth.getFullYear()}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => navigateMonth("next")}
              className={cn(calendarNavButtonVariants())}
              aria-label="Next month"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {DAY_NAMES.map((day) => (
            <div
              key={day}
              className="h-9 flex items-center justify-center text-xs font-semibold text-surface-400"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {calendarDays.map((day, index) => {
            if (!day.isCurrentMonth && !allowOutsideDays && day.date.getTime() === 0) {
              return <div key={`empty-${index}`} className="h-9" />;
            }

            let variant: "default" | "today" | "selected" | "outside" | "disabled" =
              "default";

            if (day.isDisabled) {
              variant = "disabled";
            } else if (day.isSelected) {
              variant = "selected";
            } else if (day.isToday) {
              variant = "today";
            } else if (!day.isCurrentMonth) {
              variant = "outside";
            }

            return (
              <button
                key={`${day.date.getTime()}-${index}`}
                type="button"
                onClick={() => handleDateSelect(day.date)}
                disabled={day.isDisabled || day.date.getTime() === 0}
                className={cn(calendarDayButtonVariants({ variant }))}
                aria-label={`Select ${day.date.getTime() !== 0 ? day.date.toLocaleDateString(locale) : ""}`}
                aria-selected={day.isSelected}
              >
                {day.date.getTime() !== 0 ? day.date.getDate() : ""}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Calendar.displayName = "Calendar";

export { Calendar, calendarVariants };

