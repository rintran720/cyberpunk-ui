"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ChartTooltip } from "./ChartTooltip";

// ============================================================================
// ScatterChart Variants
// ============================================================================

const scatterChartVariants = cva(
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
// ScatterChart Types
// ============================================================================

export interface ScatterChartData {
  x: number;
  y: number;
  label?: string;
  /** Custom tooltip content for this point */
  tooltip?:
    | React.ReactNode
    | ((data: ScatterChartData, seriesName: string) => React.ReactNode);
}

export interface ScatterChartSeries {
  name: string;
  data: ScatterChartData[];
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
}

export interface ScatterChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scatterChartVariants> {
  /** Chart series data */
  series: ScatterChartSeries[];
  /** Chart title */
  title?: string;
  /** Chart description */
  description?: string;
  /** X-axis label */
  xAxisLabel?: string;
  /** Y-axis label */
  yAxisLabel?: string;
  /** Maximum X value (auto-calculated if not provided) */
  maxX?: number;
  /** Maximum Y value (auto-calculated if not provided) */
  maxY?: number;
  /** Show grid lines */
  showGrid?: boolean;
  /** Point size */
  pointSize?: number;
  /** Show point labels */
  showLabels?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Format function for X values */
  formatX?: (value: number) => string;
  /** Format function for Y values */
  formatY?: (value: number) => string;
  /** Custom tooltip renderer for all points */
  renderTooltip?: (
    data: ScatterChartData,
    seriesName: string
  ) => React.ReactNode;
  /** Custom Tooltip component to use instead of default */
  TooltipComponent?: React.ComponentType<{
    x: number;
    y: number;
    children: React.ReactNode;
  }>;
}

const colorMap = {
  primary: {
    fill: "rgb(59, 130, 246)",
    stroke: "rgb(37, 99, 235)",
  },
  secondary: {
    fill: "rgb(168, 85, 247)",
    stroke: "rgb(147, 51, 234)",
  },
  accent: {
    fill: "rgb(101, 221, 9)",
    stroke: "rgb(84, 197, 0)",
  },
  success: {
    fill: "rgb(34, 197, 94)",
    stroke: "rgb(22, 163, 74)",
  },
  warning: {
    fill: "rgb(234, 179, 8)",
    stroke: "rgb(202, 138, 4)",
  },
  danger: {
    fill: "rgb(239, 68, 68)",
    stroke: "rgb(220, 38, 38)",
  },
};

// ============================================================================
// ScatterChart Component
// ============================================================================

export const ScatterChart = React.forwardRef<HTMLDivElement, ScatterChartProps>(
  (
    {
      className,
      variant,
      series,
      title,
      description,
      xAxisLabel,
      yAxisLabel,
      maxX,
      maxY,
      showGrid = true,
      pointSize = 8,
      showLabels = false,
      showLegend = true,
      formatX,
      formatY,
      renderTooltip,
      TooltipComponent = ChartTooltip,
      ...props
    },
    ref
  ) => {
    const [tooltip, setTooltip] = React.useState<{
      content: React.ReactNode;
      x: number;
      y: number;
    } | null>(null);
    const tooltipTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Cleanup timeout on unmount
    React.useEffect(() => {
      return () => {
        if (tooltipTimeoutRef.current) {
          clearTimeout(tooltipTimeoutRef.current);
        }
      };
    }, []);

    // Tooltip handlers
    const handleTooltipMouseEnter = React.useCallback(() => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
        tooltipTimeoutRef.current = null;
      }
    }, []);

    const handleTooltipMouseLeave = React.useCallback(() => {
      setTooltip(null);
    }, []);

    const chartHeight = 350;
    const padding = { top: 20, right: 40, bottom: 50, left: 60 };

    // Calculate max values
    const allXValues = series.flatMap((s) => s.data.map((d) => d.x));
    const allYValues = series.flatMap((s) => s.data.map((d) => d.y));

    const maxXValue = React.useMemo(() => {
      if (maxX !== undefined) return maxX;
      return Math.max(...allXValues, 0) * 1.1;
    }, [allXValues, maxX]);

    const maxYValue = React.useMemo(() => {
      if (maxY !== undefined) return maxY;
      return Math.max(...allYValues, 0) * 1.1;
    }, [allYValues, maxY]);

    const getX = (x: number, containerWidth: number = 1000) => {
      const width = containerWidth - padding.left - padding.right;
      return padding.left + (x / maxXValue) * width;
    };

    const getY = (y: number) => {
      const height = chartHeight - padding.top - padding.bottom;
      return padding.top + height - (y / maxYValue) * height;
    };

    // Generate axis labels
    const xAxisLabels = Array.from({ length: 5 }).map((_, i) => {
      const value = (maxXValue / 4) * i;
      const x = getX(value, 1000);
      return { value, x };
    });

    const yAxisLabels = Array.from({ length: 5 }).map((_, i) => {
      const value = maxYValue - (maxYValue / 4) * i;
      const y = getY(value);
      return { value, y };
    });

    return (
      <div
        ref={ref}
        className={cn(scatterChartVariants({ variant }), className)}
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

        <div
          ref={containerRef}
          className="relative"
          style={{ height: chartHeight }}
        >
          <svg
            width="100%"
            height={chartHeight}
            className="overflow-visible"
            viewBox={`0 0 1000 ${chartHeight}`}
            preserveAspectRatio="none"
          >
            {/* Y-axis labels */}
            {yAxisLabels.map((label, i) => (
              <text
                key={`y-label-${i}`}
                x={padding.left - 15}
                y={label.y}
                textAnchor="end"
                dominantBaseline="middle"
                className="text-xs font-medium fill-surface-300 pointer-events-none"
              >
                {formatY
                  ? formatY(label.value)
                  : Math.round(label.value).toLocaleString()}
              </text>
            ))}

            {/* X-axis labels */}
            {xAxisLabels.map((label, i) => (
              <text
                key={`x-label-${i}`}
                x={label.x}
                y={chartHeight - padding.bottom + 20}
                textAnchor="middle"
                className="text-xs font-medium fill-surface-300 pointer-events-none"
              >
                {formatX
                  ? formatX(label.value)
                  : Math.round(label.value).toLocaleString()}
              </text>
            ))}

            {/* Grid lines */}
            {showGrid && (
              <>
                {/* Horizontal grid lines */}
                {yAxisLabels.map((label, i) => (
                  <line
                    key={`grid-y-${i}`}
                    x1={padding.left}
                    y1={label.y}
                    x2={1000 - padding.right}
                    y2={label.y}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity={i === 0 ? "0.2" : "0.15"}
                    strokeDasharray={i === 0 ? "none" : "2,2"}
                    className="text-surface-500"
                  />
                ))}
                {/* Vertical grid lines */}
                {xAxisLabels.map((label, i) => (
                  <line
                    key={`grid-x-${i}`}
                    x1={label.x}
                    y1={padding.top}
                    x2={label.x}
                    y2={chartHeight - padding.bottom}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity={i === 0 ? "0.2" : "0.15"}
                    strokeDasharray={i === 0 ? "none" : "2,2"}
                    className="text-surface-500"
                  />
                ))}
              </>
            )}

            {/* Axes */}
            <line
              x1={padding.left}
              y1={padding.top}
              x2={padding.left}
              y2={chartHeight - padding.bottom}
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-surface-400"
            />
            <line
              x1={padding.left}
              y1={chartHeight - padding.bottom}
              x2={1000 - padding.right}
              y2={chartHeight - padding.bottom}
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-surface-400"
            />

            {/* Axis labels */}
            {yAxisLabel && (
              <text
                x={20}
                y={chartHeight / 2}
                textAnchor="middle"
                transform={`rotate(-90, 20, ${chartHeight / 2})`}
                className="text-sm font-semibold fill-surface-200 pointer-events-none"
              >
                {yAxisLabel}
              </text>
            )}
            {xAxisLabel && (
              <text
                x={(1000 - padding.left - padding.right) / 2 + padding.left}
                y={chartHeight - 8}
                textAnchor="middle"
                className="text-sm font-semibold fill-surface-200 pointer-events-none"
              >
                {xAxisLabel}
              </text>
            )}

            {/* Data points */}
            {series.map((serie, serieIndex) => {
              const color = colorMap[serie.color || "primary"];

              return (
                <g key={`series-${serieIndex}`}>
                  {serie.data.map((point, pointIndex) => {
                    const x = getX(point.x, 1000);
                    const y = getY(point.y);

                    return (
                      <g key={`point-${serieIndex}-${pointIndex}`}>
                        {/* Point shadow */}
                        <circle
                          cx={x + 2}
                          cy={y + 2}
                          r={pointSize}
                          fill="rgba(0,0,0,0.3)"
                          className="pointer-events-none"
                        />
                        {/* Point */}
                        <circle
                          cx={x}
                          cy={y}
                          r={pointSize}
                          fill={color.fill}
                          stroke={color.stroke}
                          strokeWidth="2.5"
                          className="cursor-pointer transition-all hover:r-[12px] hover:stroke-[3px]"
                          style={{
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                          }}
                          onMouseEnter={(e) => {
                            // Cancel any pending hide timeout
                            if (tooltipTimeoutRef.current) {
                              clearTimeout(tooltipTimeoutRef.current);
                              tooltipTimeoutRef.current = null;
                            }

                            if (!containerRef.current) return;
                            const rect =
                              containerRef.current.getBoundingClientRect();
                            const circleRect =
                              e.currentTarget.getBoundingClientRect();
                            const tooltipX =
                              circleRect.left +
                              circleRect.width / 2 -
                              rect.left;
                            const tooltipY = circleRect.top - rect.top - 10;
                            const tooltipContent = point.tooltip ? (
                              typeof point.tooltip === "function" ? (
                                point.tooltip(point, serie.name)
                              ) : (
                                point.tooltip
                              )
                            ) : renderTooltip ? (
                              renderTooltip(point, serie.name)
                            ) : (
                              <div className="text-sm">
                                <div className="font-semibold">
                                  {serie.name}
                                </div>
                                <div className="text-surface-300">
                                  X: {formatX ? formatX(point.x) : point.x}, Y:{" "}
                                  {formatY ? formatY(point.y) : point.y}
                                </div>
                                {point.label && (
                                  <div className="text-surface-400 text-xs">
                                    {point.label}
                                  </div>
                                )}
                              </div>
                            );
                            setTooltip({
                              content: tooltipContent,
                              x: tooltipX,
                              y: tooltipY,
                            });
                          }}
                          onMouseLeave={() => setTooltip(null)}
                        />
                        {/* Point inner highlight */}
                        <circle
                          cx={x}
                          cy={y}
                          r={pointSize * 0.4}
                          fill="rgba(255,255,255,0.3)"
                          className="pointer-events-none"
                        />
                        {/* Point label */}
                        {showLabels && point.label && (
                          <text
                            x={x}
                            y={y - pointSize - 6}
                            textAnchor="middle"
                            className="text-xs fill-surface-200 pointer-events-none"
                            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                          >
                            {point.label}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
          {/* Tooltip */}
          {tooltip && (
            <TooltipComponent
              x={tooltip.x}
              y={tooltip.y}
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            >
              {tooltip.content}
            </TooltipComponent>
          )}
        </div>

        {/* Legend */}
        {showLegend && series.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {series.map((serie, index) => {
              const color = colorMap[serie.color || "primary"];
              return (
                <div
                  key={`legend-${index}`}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: color.fill,
                      border: `2px solid ${color.stroke}`,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  />
                  <span className="text-sm text-surface-300 font-medium">
                    {serie.name}
                  </span>
                  <span className="text-xs text-surface-500">
                    ({serie.data.length} points)
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

ScatterChart.displayName = "ScatterChart";

export { scatterChartVariants };
