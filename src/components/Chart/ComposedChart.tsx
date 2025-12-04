"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// ComposedChart Variants
// ============================================================================

const composedChartVariants = cva(
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
// ComposedChart Types
// ============================================================================

export interface ComposedChartData {
  label: string;
  barValue?: number;
  lineValue?: number;
  areaValue?: number;
}

export interface ComposedChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof composedChartVariants> {
  /** Chart data */
  data: ComposedChartData[];
  /** Chart title */
  title?: string;
  /** Chart description */
  description?: string;
  /** Maximum value for scaling (used for all if separate scales not provided) */
  maxValue?: number;
  /** Maximum value for bar scaling */
  maxBarValue?: number;
  /** Maximum value for line scaling */
  maxLineValue?: number;
  /** Maximum value for area scaling */
  maxAreaValue?: number;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show value labels */
  showLabels?: boolean;
  /** Bar color */
  barColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "danger";
  /** Line color */
  lineColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "danger";
  /** Area color */
  areaColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "danger";
  /** Bar spacing */
  barSpacing?: number;
  /** Curve type for area and line charts */
  curve?: "linear" | "smooth";
}

const colorGradients = {
  primary: {
    from: "rgb(59, 130, 246)",
    via: "rgb(96, 165, 250)",
    to: "rgb(147, 197, 253)",
    shadow: "rgb(37, 99, 235)",
    stroke: "rgb(59, 130, 246)",
    fill: "rgba(59, 130, 246, 0.1)",
  },
  secondary: {
    from: "rgb(168, 85, 247)",
    via: "rgb(192, 132, 252)",
    to: "rgb(221, 214, 254)",
    shadow: "rgb(147, 51, 234)",
    stroke: "rgb(168, 85, 247)",
    fill: "rgba(168, 85, 247, 0.1)",
  },
  accent: {
    from: "rgb(101, 221, 9)",
    via: "rgb(163, 230, 53)",
    to: "rgb(220, 252, 231)",
    shadow: "rgb(84, 197, 0)",
    stroke: "rgb(101, 221, 9)",
    fill: "rgba(101, 221, 9, 0.1)",
  },
  success: {
    from: "rgb(34, 197, 94)",
    via: "rgb(74, 222, 128)",
    to: "rgb(187, 247, 208)",
    shadow: "rgb(22, 163, 74)",
    stroke: "rgb(34, 197, 94)",
    fill: "rgba(34, 197, 94, 0.1)",
  },
  warning: {
    from: "rgb(234, 179, 8)",
    via: "rgb(250, 204, 21)",
    to: "rgb(254, 240, 138)",
    shadow: "rgb(202, 138, 4)",
    stroke: "rgb(234, 179, 8)",
    fill: "rgba(234, 179, 8, 0.1)",
  },
  danger: {
    from: "rgb(239, 68, 68)",
    via: "rgb(248, 113, 113)",
    to: "rgb(254, 202, 202)",
    shadow: "rgb(220, 38, 38)",
    stroke: "rgb(239, 68, 68)",
    fill: "rgba(239, 68, 68, 0.1)",
  },
};

// ============================================================================
// ComposedChart Component
// ============================================================================

export const ComposedChart = React.forwardRef<
  HTMLDivElement,
  ComposedChartProps
>(
  (
    {
      className,
      variant,
      data,
      title,
      description,
      maxValue,
      maxBarValue,
      maxLineValue,
      maxAreaValue,
      showGrid = true,
      showLabels = true,
      barColor = "primary",
      lineColor = "secondary",
      areaColor = "accent",
      barSpacing = 12,
      curve = "smooth",
      ...props
    },
    ref
  ) => {
    const chartHeight = 300;
    const padding = { top: 20, right: 60, bottom: 40, left: 50 };

    // Determine which chart types are present
    const hasBar = data.some((d) => d.barValue !== undefined);
    const hasLine = data.some((d) => d.lineValue !== undefined);
    const hasArea = data.some((d) => d.areaValue !== undefined);

    const chartTypesCount = [hasBar, hasLine, hasArea].filter(Boolean).length;

    // Only allow maximum 2 chart types
    if (chartTypesCount > 2) {
      console.warn(
        "ComposedChart only supports maximum 2 chart types. Please use only 2 of: bar, line, area"
      );
    }

    // Calculate max values for each chart type
    const barValues = data.map((d) => d.barValue || 0);
    const lineValues = data.map((d) => d.lineValue || 0);
    const areaValues = data.map((d) => d.areaValue || 0);

    const barMax = React.useMemo(() => {
      if (maxBarValue !== undefined) return maxBarValue;
      if (
        maxValue !== undefined &&
        barValues.length > 0 &&
        Math.max(...barValues) > 0
      )
        return maxValue;
      return Math.max(...barValues, 0) * 1.1 || 100;
    }, [barValues, maxBarValue, maxValue]);

    const lineMax = React.useMemo(() => {
      if (maxLineValue !== undefined) return maxLineValue;
      if (
        maxValue !== undefined &&
        lineValues.length > 0 &&
        Math.max(...lineValues) > 0
      )
        return maxValue;
      return Math.max(...lineValues, 0) * 1.1 || 100;
    }, [lineValues, maxLineValue, maxValue]);

    const areaMax = React.useMemo(() => {
      if (maxAreaValue !== undefined) return maxAreaValue;
      if (
        maxValue !== undefined &&
        areaValues.length > 0 &&
        Math.max(...areaValues) > 0
      )
        return maxValue;
      return Math.max(...areaValues, 0) * 1.1 || 100;
    }, [areaValues, maxAreaValue, maxValue]);

    const chartAreaHeight = chartHeight - padding.top - padding.bottom;

    // Generate Y-axis labels for each chart type
    // Calculate Y positions based on actual scaling to ensure alignment
    const barYAxisLabels = Array.from({ length: 5 }).map((_, i) => {
      const value = barMax - (barMax / 4) * i;
      const y =
        padding.top + chartAreaHeight - (value / barMax) * chartAreaHeight;
      return { value, y };
    });

    const lineYAxisLabels = Array.from({ length: 5 }).map((_, i) => {
      const value = lineMax - (lineMax / 4) * i;
      const y =
        padding.top + chartAreaHeight - (value / lineMax) * chartAreaHeight;
      return { value, y };
    });

    const areaYAxisLabels = Array.from({ length: 5 }).map((_, i) => {
      const value = areaMax - (areaMax / 4) * i;
      const y =
        padding.top + chartAreaHeight - (value / areaMax) * chartAreaHeight;
      return { value, y };
    });

    // Calculate bar dimensions
    const barWidth =
      (1000 - padding.left - padding.right - barSpacing * (data.length - 1)) /
      data.length;

    // Get X position for bar center (used for aligning line points)
    const getBarCenterX = (index: number) => {
      return padding.left + index * (barWidth + barSpacing) + barWidth / 2;
    };

    // Create line path - align with bar centers
    const createLinePath = (
      getValue: (d: ComposedChartData) => number | undefined,
      scaleMax: number
    ) => {
      if (data.length === 0) return "";

      const getY = (value: number) => {
        return (
          padding.top + chartAreaHeight - (value / scaleMax) * chartAreaHeight
        );
      };

      if (curve === "smooth" && data.length > 2) {
        // Smooth curve using quadratic bezier (same as LineChart)
        let path = `M ${getBarCenterX(0)} ${getY(getValue(data[0]) || 0)}`;
        for (let i = 1; i < data.length; i++) {
          const x0 = getBarCenterX(i - 1);
          const y0 = getY(getValue(data[i - 1]) || 0);
          const x1 = getBarCenterX(i);
          const y1 = getY(getValue(data[i]) || 0);

          if (i === 1) {
            path += ` Q ${x0} ${y0}, ${(x0 + x1) / 2} ${(y0 + y1) / 2}`;
          } else {
            const prevX = getBarCenterX(i - 2);
            const prevY = getY(getValue(data[i - 2]) || 0);
            const cp1x = x0 + (x1 - prevX) / 4;
            const cp1y = y0 + (y1 - prevY) / 4;
            path += ` T ${cp1x} ${cp1y}`;
          }
          path += ` T ${x1} ${y1}`;
        }
        return path;
      }

      // Linear path
      return data
        .map((d, i) => {
          const value = getValue(d) || 0;
          const x = getBarCenterX(i);
          const y = getY(value);
          return `${i === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" ");
    };

    return (
      <div
        ref={ref}
        className={cn(composedChartVariants({ variant }), className)}
        {...props}
      >
        {(title || description) && (
          <div className="mb-6">
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

        <div className="relative" style={{ height: chartHeight }}>
          <svg
            width="100%"
            height={chartHeight}
            className="overflow-visible"
            viewBox={`0 0 1000 ${chartHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Bar gradients */}
              {Object.entries(colorGradients).map(([colorName, colors]) => (
                <linearGradient
                  key={`bar-gradient-${colorName}`}
                  id={`composed-bar-gradient-${colorName}`}
                  x1="0%"
                  y1="100%"
                  x2="0%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={colors.from} />
                  <stop offset="50%" stopColor={colors.via} />
                  <stop offset="100%" stopColor={colors.to} />
                </linearGradient>
              ))}
              {/* Area gradients */}
              {Object.entries(colorGradients).map(([colorName, colors]) => (
                <linearGradient
                  key={`area-gradient-${colorName}`}
                  id={`composed-area-gradient-${colorName}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={colors.fill} stopOpacity="0.4" />
                  <stop
                    offset="100%"
                    stopColor={colors.fill}
                    stopOpacity="0.05"
                  />
                </linearGradient>
              ))}
            </defs>

            {/* Y-axis labels - Bar axis (left) */}
            {barValues.some((v) => v > 0) &&
              barYAxisLabels.map((label, i) => (
                <text
                  key={`bar-y-label-${i}`}
                  x={padding.left - 10}
                  y={label.y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="text-xs fill-surface-400 pointer-events-none"
                >
                  {Math.round(label.value)}
                </text>
              ))}

            {/* Y-axis labels - Line axis (right) */}
            {lineValues.some((v) => v > 0) &&
              lineYAxisLabels.map((label, i) => (
                <text
                  key={`line-y-label-${i}`}
                  x={1000 - padding.right + 10}
                  y={label.y}
                  textAnchor="start"
                  dominantBaseline="middle"
                  className="text-xs fill-surface-400 pointer-events-none"
                >
                  {Math.round(label.value)}
                </text>
              ))}

            {/* Y-axis labels - Area axis (right, offset if line exists) */}
            {areaValues.some((v) => v > 0) &&
              areaYAxisLabels.map((label, i) => (
                <text
                  key={`area-y-label-${i}`}
                  x={
                    1000 -
                    padding.right +
                    (lineValues.some((v) => v > 0) ? 50 : 10)
                  }
                  y={label.y}
                  textAnchor="start"
                  dominantBaseline="middle"
                  className="text-xs fill-surface-400 pointer-events-none"
                >
                  {Math.round(label.value)}
                </text>
              ))}

            {/* Grid lines */}
            {showGrid &&
              barYAxisLabels.map((label, i) => (
                <line
                  key={`grid-${i}`}
                  x1={padding.left}
                  y1={label.y}
                  x2={1000 - padding.right}
                  y2={label.y}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.1"
                  className="text-surface-600"
                />
              ))}

            {/* Bars - render first (farthest/behind) */}
            {hasBar &&
              data.map((item, index) => {
                if (item.barValue === undefined) return null;

                const barHeight = (item.barValue / barMax) * chartAreaHeight;
                const x = padding.left + index * (barWidth + barSpacing);
                const y = padding.top + chartAreaHeight - barHeight;
                const gradient = colorGradients[barColor];

                return (
                  <g key={`bar-${index}`}>
                    {/* Bar shadow */}
                    <rect
                      x={x + 4}
                      y={y + 4}
                      width={barWidth}
                      height={barHeight}
                      fill="rgba(0,0,0,0.3)"
                      rx="4"
                      className="pointer-events-none"
                    />
                    {/* Bar */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill={`url(#composed-bar-gradient-${barColor})`}
                      rx="4"
                      className="cursor-pointer transition-all hover:opacity-90"
                      style={{
                        filter: `drop-shadow(0 4px 0 ${gradient.shadow}) drop-shadow(0 6px 8px rgba(0,0,0,0.3))`,
                      }}
                    />
                    {/* Value label */}
                    {showLabels && (
                      <text
                        x={x + barWidth / 2}
                        y={y - 6}
                        textAnchor="middle"
                        className="text-xs font-semibold fill-surface-200 pointer-events-none"
                        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                      >
                        {item.barValue}
                      </text>
                    )}
                  </g>
                );
              })}

            {/* Area chart - render second (middle layer) */}
            {hasArea &&
              (() => {
                const areaPath = createLinePath((d) => d.areaValue, areaMax);
                const lastX = getBarCenterX(data.length - 1);
                const firstX = getBarCenterX(0);
                const bottomY = chartHeight - padding.bottom;
                const areaColorScheme = colorGradients[areaColor];
                const fullAreaPath = `${areaPath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
                return (
                  <>
                    {/* Area fill */}
                    <path
                      d={fullAreaPath}
                      fill={`url(#composed-area-gradient-${areaColor})`}
                      className="transition-opacity duration-300 pointer-events-none"
                    />
                    {/* Area line */}
                    <path
                      d={areaPath}
                      fill="none"
                      stroke={areaColorScheme.stroke}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] pointer-events-none"
                    />
                  </>
                );
              })()}

            {/* Line chart - render last (closest/front) */}
            {hasLine && (
              <>
                <path
                  d={createLinePath((d) => d.lineValue, lineMax)}
                  fill="none"
                  stroke={colorGradients[lineColor].stroke}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                />
                {/* Line points - aligned with bar centers */}
                {data.map((item, index) => {
                  if (item.lineValue === undefined) return null;
                  const x = getBarCenterX(index);
                  const y =
                    padding.top +
                    chartAreaHeight -
                    (item.lineValue / lineMax) * chartAreaHeight;
                  return (
                    <g key={`line-point-${index}`}>
                      <circle
                        cx={x + 1}
                        cy={y + 1}
                        r="5"
                        fill="rgba(0,0,0,0.3)"
                        className="pointer-events-none"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill={colorGradients[lineColor].stroke}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:r-6"
                      />
                    </g>
                  );
                })}
              </>
            )}

            {/* X-axis labels - aligned with bar centers */}
            {data.map((item, index) => {
              const x = getBarCenterX(index);
              return (
                <text
                  key={`label-${index}`}
                  x={x}
                  y={chartHeight - padding.bottom + 16}
                  textAnchor="middle"
                  className="text-xs fill-surface-400 pointer-events-none"
                >
                  {item.label}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    );
  }
);

ComposedChart.displayName = "ComposedChart";

export { composedChartVariants };
