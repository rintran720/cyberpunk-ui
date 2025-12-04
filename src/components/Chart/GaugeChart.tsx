"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// GaugeChart Variants
// ============================================================================

const gaugeChartVariants = cva(
  [
    "relative w-full",
    "bg-surface-800 rounded-2xl border border-surface-700",
    "shadow-[0_4px_0_0_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.2)]",
    "p-6",
  ],
  {
    variants: {
      variant: {
        default: "",
        elevated: [
          "shadow-[0_6px_0_0_rgba(0,0,0,0.2),0_12px_24px_-4px_rgba(0,0,0,0.25)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ============================================================================
// GaugeChart Types
// ============================================================================

export interface GaugeChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gaugeChartVariants> {
  /** Current value */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Chart title */
  title?: string;
  /** Chart description */
  description?: string;
  /** Unit label (e.g., "%", "°C", "km/h") */
  unit?: string;
  /** Custom font size class for unit (e.g., "text-sm", "text-lg") */
  unitFontSize?: string;
  /** Color scheme */
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
  /** Use gradient color from low to high (success -> warning -> danger) */
  useGradient?: boolean;
  /** Show value label */
  showValue?: boolean;
  /** Show min/max labels */
  showMinMax?: boolean;
  /** Gauge type */
  type?: "semicircle" | "full";
  /** Size of the gauge */
  size?: "sm" | "md" | "lg" | "xl";
  /** Format function for value */
  formatValue?: (value: number) => string;
}

const colorMap = {
  primary: {
    fill: "rgb(59, 130, 246)",
    stroke: "rgb(37, 99, 235)",
    gradient: {
      from: "rgb(59, 130, 246)",
      to: "rgb(37, 99, 235)",
    },
  },
  secondary: {
    fill: "rgb(168, 85, 247)",
    stroke: "rgb(147, 51, 234)",
    gradient: {
      from: "rgb(168, 85, 247)",
      to: "rgb(147, 51, 234)",
    },
  },
  accent: {
    fill: "rgb(101, 221, 9)",
    stroke: "rgb(84, 197, 0)",
    gradient: {
      from: "rgb(101, 221, 9)",
      to: "rgb(84, 197, 0)",
    },
  },
  success: {
    fill: "rgb(34, 197, 94)",
    stroke: "rgb(22, 163, 74)",
    gradient: {
      from: "rgb(34, 197, 94)",
      to: "rgb(22, 163, 74)",
    },
  },
  warning: {
    fill: "rgb(234, 179, 8)",
    stroke: "rgb(202, 138, 4)",
    gradient: {
      from: "rgb(234, 179, 8)",
      to: "rgb(202, 138, 4)",
    },
  },
  danger: {
    fill: "rgb(239, 68, 68)",
    stroke: "rgb(220, 38, 38)",
    gradient: {
      from: "rgb(239, 68, 68)",
      to: "rgb(220, 38, 38)",
    },
  },
};

const sizeMap = {
  sm: 180,
  md: 220,
  lg: 260,
  xl: 300,
};

const fontSizeMap = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

const unitFontSizeMap = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

// ============================================================================
// GaugeChart Component
// ============================================================================

export const GaugeChart = React.forwardRef<HTMLDivElement, GaugeChartProps>(
  (
    {
      className,
      variant,
      value,
      min = 0,
      max = 100,
      title,
      description,
      unit = "",
      unitFontSize,
      color = "primary",
      useGradient = false,
      showValue = true,
      showMinMax = true,
      type = "semicircle",
      size = "lg",
      formatValue,
      ...props
    },
    ref
  ) => {
    const gaugeSize = sizeMap[size];
    const centerX = gaugeSize / 2;
    // For semicircle, center is positioned to center the gauge arc within the viewport
    // Gauge points upward, so we position centerY to center the semicircle vertically
    const centerY = type === "semicircle" ? gaugeSize * 0.6 : gaugeSize / 2;
    // Adjust radius to fit nicely within the container with proper padding
    const radius = gaugeSize / 2 - 35;

    // Clamp value between min and max
    const clampedValue = Math.max(min, Math.min(max, value));
    const percentage = ((clampedValue - min) / (max - min)) * 100;

    // Calculate angles
    // Semicircle pointing upward: from -Math.PI (left bottom) to 0 (right bottom)
    // This creates an arc that opens upward
    // Full circle: from -Math.PI/2 (top) clockwise to complete 360 degrees
    const startAngle = type === "semicircle" ? -Math.PI : -Math.PI / 2;
    const endAngle = type === "semicircle" ? 0 : (3 * Math.PI) / 2;
    const totalAngle = type === "semicircle" ? Math.PI : 2 * Math.PI;
    // Calculate value angle - for full circle at 100%, use endAngle directly
    const valueAngle = startAngle + (totalAngle * percentage) / 100;

    // Create arc path for gauge (donut style)
    const createArc = (
      startAngle: number,
      endAngle: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      const start = {
        x: centerX + outerRadius * Math.cos(startAngle),
        y: centerY + outerRadius * Math.sin(startAngle),
      };
      const end = {
        x: centerX + outerRadius * Math.cos(endAngle),
        y: centerY + outerRadius * Math.sin(endAngle),
      };

      const innerStart = {
        x: centerX + innerRadius * Math.cos(startAngle),
        y: centerY + innerRadius * Math.sin(startAngle),
      };
      const innerEnd = {
        x: centerX + innerRadius * Math.cos(endAngle),
        y: centerY + innerRadius * Math.sin(endAngle),
      };

      // Check if this is a full circle or near-full circle
      const angleDiff = endAngle - startAngle;
      const absAngleDiff = Math.abs(angleDiff);
      const isFullCircle = absAngleDiff >= 2 * Math.PI - 0.01;
      // For full circle type, also treat near-full circles (>= 99.5%) as full circle
      const isNearFullCircle =
        type === "full" && absAngleDiff >= 2 * Math.PI - 0.05;

      // For full circle or near-full circle, draw it as two arcs
      if (isFullCircle || isNearFullCircle) {
        // Draw full/near-full circle using two semicircles
        const midAngle = startAngle + Math.PI;
        const midPoint = {
          x: centerX + outerRadius * Math.cos(midAngle),
          y: centerY + outerRadius * Math.sin(midAngle),
        };
        const innerMidPoint = {
          x: centerX + innerRadius * Math.cos(midAngle),
          y: centerY + innerRadius * Math.sin(midAngle),
        };

        return [
          `M ${start.x} ${start.y}`,
          `A ${outerRadius} ${outerRadius} 0 1 1 ${midPoint.x} ${midPoint.y}`,
          `A ${outerRadius} ${outerRadius} 0 1 1 ${end.x} ${end.y}`,
          `L ${innerEnd.x} ${innerEnd.y}`,
          `A ${innerRadius} ${innerRadius} 0 1 0 ${innerMidPoint.x} ${innerMidPoint.y}`,
          `A ${innerRadius} ${innerRadius} 0 1 0 ${innerStart.x} ${innerStart.y}`,
          "Z",
        ].join(" ");
      }

      // For partial arcs, calculate sweep direction correctly
      const largeArcFlag = absAngleDiff > Math.PI ? 1 : 0;

      // Determine sweep direction:
      // For semicircle pointing upward: -Math.PI to 0 goes clockwise (sweepFlag = 1)
      // For full circle type: always clockwise (sweepFlag = 1)
      let sweepFlag: number;
      if (type === "full") {
        // For full circle type, always go clockwise
        sweepFlag = 1;
      } else {
        // For semicircle, normalize angle difference
        const normalizedDiff =
          angleDiff > Math.PI
            ? angleDiff - 2 * Math.PI
            : angleDiff < -Math.PI
            ? angleDiff + 2 * Math.PI
            : angleDiff;
        sweepFlag = normalizedDiff > 0 ? 1 : 0;
      }

      return [
        `M ${start.x} ${start.y}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`,
        `L ${innerEnd.x} ${innerEnd.y}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} ${1 - sweepFlag} ${
          innerStart.x
        } ${innerStart.y}`,
        "Z",
      ].join(" ");
    };

    const innerRadius = radius * 0.7; // Inner radius for donut style gauge

    // For gradient mode, calculate gradient stops along the arc
    const getGradientStops = () => {
      // Start point (min value) - green
      const startX = centerX + radius * Math.cos(startAngle);
      const startY = centerY + radius * Math.sin(startAngle);
      // End point (max value) - red
      const endX = centerX + radius * Math.cos(endAngle);
      const endY = centerY + radius * Math.sin(endAngle);
      return { startX, startY, endX, endY };
    };

    const colorScheme = colorMap[color];
    const displayValue = formatValue
      ? formatValue(clampedValue)
      : clampedValue.toFixed(1);

    return (
      <div
        ref={ref}
        className={cn(gaugeChartVariants({ variant }), className)}
        {...props}
      >
        {(title || description) && (
          <div className="mb-6 text-center">
            {title && (
              <h3 className="text-lg font-semibold text-surface-100 mb-1">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-surface-400">{description}</p>
            )}
          </div>
        )}

        <div className="flex flex-col items-center">
          <div
            className="relative overflow-visible"
            style={{ width: gaugeSize, height: gaugeSize }}
          >
            <svg
              width={gaugeSize}
              height={gaugeSize}
              viewBox={`0 0 ${gaugeSize} ${gaugeSize}`}
              className="overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {useGradient ? (
                  <>
                    {/* Gradient along the arc: green -> yellow -> red */}
                    <linearGradient
                      id={`gauge-gradient-${color}-gradient`}
                      x1={getGradientStops().startX}
                      y1={getGradientStops().startY}
                      x2={getGradientStops().endX}
                      y2={getGradientStops().endY}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor={colorMap.success.fill} />
                      <stop offset="50%" stopColor={colorMap.warning.fill} />
                      <stop offset="100%" stopColor={colorMap.danger.fill} />
                    </linearGradient>
                    {/* Shadow filter */}
                    <filter id={`gauge-shadow-${color}-gradient`}>
                      <feDropShadow
                        dx="0"
                        dy="4"
                        stdDeviation="4"
                        floodOpacity="0.3"
                      />
                    </filter>
                  </>
                ) : (
                  <>
                    <linearGradient
                      id={`gauge-gradient-${color}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={colorScheme.gradient.from} />
                      <stop offset="100%" stopColor={colorScheme.gradient.to} />
                    </linearGradient>
                    {/* Shadow filter */}
                    <filter id={`gauge-shadow-${color}`}>
                      <feDropShadow
                        dx="0"
                        dy="4"
                        stdDeviation="4"
                        floodOpacity="0.3"
                      />
                    </filter>
                  </>
                )}
              </defs>

              {/* Background arc (full gauge) */}
              <path
                d={createArc(startAngle, endAngle, radius, innerRadius)}
                fill="rgba(255,255,255,0.05)"
                stroke={useGradient ? "none" : "rgba(255,255,255,0.1)"}
                strokeWidth={useGradient ? "0" : "1"}
                className="pointer-events-none"
              />

              {/* Value arc with shadow */}
              <g
                filter={`url(#gauge-shadow-${color}${
                  useGradient ? "-gradient" : ""
                })`}
              >
                <path
                  d={createArc(startAngle, valueAngle, radius, innerRadius)}
                  fill={
                    useGradient
                      ? `url(#gauge-gradient-${color}-gradient)`
                      : `url(#gauge-gradient-${color})`
                  }
                  stroke={useGradient ? "none" : colorScheme.stroke}
                  strokeWidth={useGradient ? "0" : "1.5"}
                  className="transition-all duration-500"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  }}
                />
              </g>

              {/* Top highlight on value arc - thin strip at outer edge */}
              <path
                d={createArc(startAngle, valueAngle, radius, radius * 0.97)}
                fill="rgba(255,255,255,0.25)"
                className="pointer-events-none"
              />

              {/* Needle/Indicator - only for semicircle */}
              {type === "semicircle" && (
                <g>
                  {/* Needle shadow */}
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={centerX + radius * 0.9 * Math.cos(valueAngle)}
                    y2={centerY + radius * 0.9 * Math.sin(valueAngle)}
                    stroke="rgba(0,0,0,0.3)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    transform="translate(1, 1)"
                    className="pointer-events-none"
                  />
                  {/* Needle */}
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={centerX + radius * 0.9 * Math.cos(valueAngle)}
                    y2={centerY + radius * 0.9 * Math.sin(valueAngle)}
                    stroke={
                      useGradient ? colorScheme.stroke : colorScheme.stroke
                    }
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                    style={{
                      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                    }}
                  />
                  {/* Needle center pin */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r="6"
                    fill={useGradient ? colorMap.danger.fill : colorScheme.fill}
                    stroke="white"
                    strokeWidth="2"
                    style={{
                      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                    }}
                  />
                  {/* Inner highlight */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r="3"
                    fill="rgba(255,255,255,0.3)"
                    className="pointer-events-none"
                  />
                </g>
              )}

              {/* Value label - positioned inside the gauge */}
              {showValue && (
                <text
                  x={centerX}
                  y={type === "semicircle" ? centerY - radius * 0.2 : centerY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`${fontSizeMap[size]} font-bold fill-surface-100 pointer-events-none`}
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                >
                  {displayValue}
                  {unit && (
                    <tspan
                      className={`${
                        unitFontSize || unitFontSizeMap[size]
                      } fill-surface-300 ml-1`}
                    >
                      {unit}
                    </tspan>
                  )}
                </text>
              )}

              {/* Min/Max labels */}
              {showMinMax && type === "semicircle" && (
                <>
                  <text
                    x={centerX + radius * Math.cos(startAngle) * 0.9}
                    y={centerY + radius * Math.sin(startAngle) * 0.9 + 8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-medium fill-surface-400 pointer-events-none"
                  >
                    {formatValue ? formatValue(min) : min}
                  </text>
                  <text
                    x={centerX + radius * Math.cos(endAngle) * 0.9}
                    y={centerY + radius * Math.sin(endAngle) * 0.9 + 8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-medium fill-surface-400 pointer-events-none"
                  >
                    {formatValue ? formatValue(max) : max}
                  </text>
                </>
              )}
              {/* Min/Max labels for full circle */}
              {showMinMax && type === "full" && (
                <>
                  <text
                    x={centerX}
                    y={centerY - radius * 1.15}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-medium fill-surface-400 pointer-events-none"
                  >
                    {formatValue ? formatValue(min) : min}
                  </text>
                  <text
                    x={centerX}
                    y={centerY + radius * 1.15}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-medium fill-surface-400 pointer-events-none"
                  >
                    {formatValue ? formatValue(max) : max}
                  </text>
                </>
              )}

              {/* Tick marks */}
              {type === "semicircle" &&
                Array.from({ length: 6 }).map((_, i) => {
                  const tickAngle = startAngle + (totalAngle / 5) * i;
                  const tickX1 = centerX + radius * Math.cos(tickAngle);
                  const tickY1 = centerY + radius * Math.sin(tickAngle);
                  const tickX2 = centerX + (radius - 8) * Math.cos(tickAngle);
                  const tickY2 = centerY + (radius - 8) * Math.sin(tickAngle);

                  return (
                    <line
                      key={`tick-${i}`}
                      x1={tickX1}
                      y1={tickY1}
                      x2={tickX2}
                      y2={tickY2}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="text-surface-500"
                    />
                  );
                })}
              {/* Tick marks for full circle */}
              {type === "full" &&
                Array.from({ length: 12 }).map((_, i) => {
                  const tickAngle = startAngle + (totalAngle / 12) * i;
                  const tickX1 = centerX + radius * Math.cos(tickAngle);
                  const tickY1 = centerY + radius * Math.sin(tickAngle);
                  const tickX2 = centerX + (radius - 6) * Math.cos(tickAngle);
                  const tickY2 = centerY + (radius - 6) * Math.sin(tickAngle);

                  return (
                    <line
                      key={`tick-full-${i}`}
                      x1={tickX1}
                      y1={tickY1}
                      x2={tickX2}
                      y2={tickY2}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="text-surface-500"
                    />
                  );
                })}
            </svg>
          </div>

          {/* Additional info */}
          {description && !title && (
            <p className="mt-4 text-sm text-surface-400 text-center">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);

GaugeChart.displayName = "GaugeChart";

export { gaugeChartVariants };
