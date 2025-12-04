import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// Slider Variants
// ============================================================================

const sliderTrackVariants = cva(
  [
    "relative w-full rounded-full",
    "bg-surface-700",
    // 3D inset effect
    "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(0,0,0,0.2)]",
  ],
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const sliderThumbVariants = cva(
  [
    "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
    "rounded-full",
    "cursor-pointer",
    // Only transition scale and shadow, NOT position (left)
    "transition-[transform,box-shadow] duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900",
    // 3D effect
    "bg-gradient-to-b from-surface-200 to-surface-400",
    "shadow-[0_2px_4px_rgba(0,0,0,0.3),0_1px_0_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.5)]",
    "hover:shadow-[0_3px_6px_rgba(0,0,0,0.4),0_2px_0_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.5)]",
    "hover:scale-110",
    "active:scale-95",
    "active:shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(0,0,0,0.1)]",
  ],
  {
    variants: {
      size: {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const sliderRangeVariants = cva(
  [
    "absolute h-full rounded-full",
    // 3D raised effect
    "shadow-[0_1px_0_0_rgba(255,255,255,0.1),inset_0_1px_2px_rgba(0,0,0,0.1)]",
  ],
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-primary-600 to-primary-500",
        secondary: "bg-gradient-to-r from-secondary-600 to-secondary-500",
        accent: "bg-gradient-to-r from-accent-600 to-accent-500",
        success: "bg-gradient-to-r from-green-600 to-green-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

// ============================================================================
// Slider Component
// ============================================================================

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    VariantProps<typeof sliderTrackVariants>,
    VariantProps<typeof sliderRangeVariants> {
  /** Current value (controlled) */
  value?: number[];
  /** Default value */
  defaultValue?: number[];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Callback when value changes */
  onValueChange?: (value: number[]) => void;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Show value tooltip */
  showValue?: boolean;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      size,
      variant,
      value: controlledValue,
      defaultValue = [50],
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      disabled = false,
      orientation = "horizontal",
      showValue = false,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const [isDragging, setIsDragging] = React.useState(false);
    const [activeThumb, setActiveThumb] = React.useState<number | null>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);

    const isControlled = controlledValue !== undefined;
    const values = isControlled ? controlledValue : uncontrolledValue;

    const updateValue = React.useCallback(
      (newValues: number[]) => {
        if (!isControlled) {
          setUncontrolledValue(newValues);
        }
        onValueChange?.(newValues);
      },
      [isControlled, onValueChange]
    );

    const getValueFromPosition = React.useCallback(
      (clientX: number) => {
        if (!trackRef.current) return values[0];

        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const rawValue = min + percent * (max - min);
        const steppedValue = Math.round(rawValue / step) * step;
        return Math.max(min, Math.min(max, steppedValue));
      },
      [min, max, step, values]
    );

    const handleMouseDown = (e: React.MouseEvent, thumbIndex: number) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(true);
      setActiveThumb(thumbIndex);
    };

    const handleTrackClick = (e: React.MouseEvent) => {
      if (disabled) return;
      const newValue = getValueFromPosition(e.clientX);
      updateValue([newValue]);
    };

    React.useEffect(() => {
      if (!isDragging || activeThumb === null) return;

      const handleMouseMove = (e: MouseEvent) => {
        const newValue = getValueFromPosition(e.clientX);
        const newValues = [...values];
        newValues[activeThumb] = newValue;
        updateValue(newValues);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        setActiveThumb(null);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, activeThumb, getValueFromPosition, values, updateValue]);

    const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center w-full select-none touch-none",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className={cn(sliderTrackVariants({ size }))}
          onClick={handleTrackClick}
        >
          {/* Range/Fill */}
          <div
            className={cn(sliderRangeVariants({ variant }))}
            style={{
              left: 0,
              width: `${getPercent(values[0])}%`,
            }}
          />

          {/* Thumbs */}
          {values.map((value, index) => (
            <div
              key={index}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
              tabIndex={disabled ? -1 : 0}
              className={cn(
                sliderThumbVariants({ size }),
                disabled && "cursor-not-allowed"
              )}
              style={{ left: `${getPercent(value)}%` }}
              onMouseDown={(e) => handleMouseDown(e, index)}
              onKeyDown={(e) => {
                if (disabled) return;
                let newValue = value;
                switch (e.key) {
                  case "ArrowRight":
                  case "ArrowUp":
                    newValue = Math.min(max, value + step);
                    break;
                  case "ArrowLeft":
                  case "ArrowDown":
                    newValue = Math.max(min, value - step);
                    break;
                  case "Home":
                    newValue = min;
                    break;
                  case "End":
                    newValue = max;
                    break;
                  default:
                    return;
                }
                e.preventDefault();
                const newValues = [...values];
                newValues[index] = newValue;
                updateValue(newValues);
              }}
            >
              {/* Value tooltip */}
              {showValue && (isDragging || activeThumb === index) && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface-800 border border-surface-600 rounded text-xs text-surface-100 whitespace-nowrap shadow-lg">
                  {value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider, sliderTrackVariants, sliderThumbVariants, sliderRangeVariants };

