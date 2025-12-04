"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// AreaChart Variants
// ============================================================================

const areaChartVariants = cva(
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
// AreaChart Types
// ============================================================================

export interface AreaChartData {
  label: string;
  value: number;
}

export interface AreaChartSeries {
  name: string;
  data: AreaChartData[];
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
}

export interface AreaChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof areaChartVariants> {
  /** Chart series data */
  series: AreaChartSeries[];
  /** Chart title */
  title?: string;
  /** Chart description */
  description?: string;
  /** Maximum value for scaling */
  maxValue?: number;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show data points */
  showDots?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Curve type */
  curve?: "linear" | "smooth";
}

const colorMap = {
  primary: {
    stroke: "rgb(59, 130, 246)",
    fill: "rgba(59, 130, 246, 0.2)",
    dot: "rgb(59, 130, 246)",
  },
  secondary: {
    stroke: "rgb(168, 85, 247)",
    fill: "rgba(168, 85, 247, 0.2)",
    dot: "rgb(168, 85, 247)",
  },
  accent: {
    stroke: "rgb(101, 221, 9)",
    fill: "rgba(101, 221, 9, 0.2)",
    dot: "rgb(101, 221, 9)",
  },
  success: {
    stroke: "rgb(34, 197, 94)",
    fill: "rgba(34, 197, 94, 0.2)",
    dot: "rgb(34, 197, 94)",
  },
  warning: {
    stroke: "rgb(234, 179, 8)",
    fill: "rgba(234, 179, 8, 0.2)",
    dot: "rgb(234, 179, 8)",
  },
  danger: {
    stroke: "rgb(239, 68, 68)",
    fill: "rgba(239, 68, 68, 0.2)",
    dot: "rgb(239, 68, 68)",
  },
};

// ============================================================================
// AreaChart Component
// ============================================================================

export const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  (
    {
      className,
      variant,
      series,
      title,
      description,
      maxValue,
      showGrid = true,
      showDots = false,
      showLegend = false,
      curve = "smooth",
      ...props
    },
    ref
  ) => {
    const chartHeight = 300;
    const padding = { top: 20, right: 20, bottom: 40, left: 40 };

    // Get all data points to calculate max
    const allValues = series.flatMap((s) => s.data.map((d) => d.value));
    const max = React.useMemo(() => {
      if (maxValue !== undefined) return maxValue;
      return Math.max(...allValues, 0) * 1.1;
    }, [allValues, maxValue]);

    // Get unique labels from first series
    const labels = series[0]?.data.map((d) => d.label) || [];
    const dataLength = labels.length;

    const getX = (index: number, containerWidth: number = 1000) => {
      const width = containerWidth - padding.left - padding.right;
      return padding.left + (index / (dataLength - 1 || 1)) * width;
    };

    const getY = (value: number) => {
      const height = chartHeight - padding.top - padding.bottom;
      return padding.top + height - (value / max) * height;
    };

    const createPath = (
      data: AreaChartData[],
      containerWidth: number = 1000
    ) => {
      if (data.length === 0) return "";

      if (curve === "smooth" && data.length > 2) {
        // Smooth curve using quadratic bezier
        let path = `M ${getX(0, containerWidth)} ${getY(data[0].value)}`;
        for (let i = 1; i < data.length; i++) {
          const x0 = getX(i - 1, containerWidth);
          const y0 = getY(data[i - 1].value);
          const x1 = getX(i, containerWidth);
          const y1 = getY(data[i].value);

          if (i === 1) {
            path += ` Q ${x0} ${y0}, ${(x0 + x1) / 2} ${(y0 + y1) / 2}`;
          } else {
            const prevX = getX(i - 2, containerWidth);
            const prevY = getY(data[i - 2].value);
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
          const x = getX(i, containerWidth);
          const y = getY(d.value);
          return `${i === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" ");
    };

    return (
      <div
        ref={ref}
        className={cn(areaChartVariants({ variant }), className)}
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
              {series.map((serie, serieIndex) => {
                const color = colorMap[serie.color || "primary"];
                return (
                  <linearGradient
                    key={`area-gradient-${serieIndex}`}
                    id={`area-gradient-${serieIndex}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor={color.fill}
                      stopOpacity="0.4"
                    />
                    <stop
                      offset="100%"
                      stopColor={color.fill}
                      stopOpacity="0.05"
                    />
                  </linearGradient>
                );
              })}
            </defs>

            {/* Grid lines */}
            {showGrid &&
              Array.from({ length: 5 }).map((_, i) => {
                const y = (chartHeight / 4) * i;
                return (
                  <line
                    key={`grid-${i}`}
                    x1={padding.left}
                    y1={y}
                    x2={1000 - padding.right}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity="0.1"
                    className="text-surface-600"
                  />
                );
              })}

            {/* Render series */}
            {series.map((serie, serieIndex) => {
              const color = colorMap[serie.color || "primary"];
              const pathData = createPath(serie.data, 1000);
              const areaPath = `${pathData} L ${getX(
                serie.data.length - 1,
                1000
              )} ${chartHeight - padding.bottom} L ${getX(0, 1000)} ${
                chartHeight - padding.bottom
              } Z`;

              return (
                <g key={`series-${serieIndex}`}>
                  {/* Area */}
                  <path
                    d={areaPath}
                    fill={`url(#area-gradient-${serieIndex})`}
                    className="transition-opacity duration-300"
                  />

                  {/* Line */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={color.stroke}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                  />

                  {/* Data points */}
                  {showDots &&
                    serie.data.map((point, index) => {
                      const x = getX(index, 1000);
                      const y = getY(point.value);
                      return (
                        <g key={`dot-${serieIndex}-${index}`}>
                          {/* Dot shadow */}
                          <circle
                            cx={x}
                            cy={y}
                            r="5"
                            fill="rgba(0,0,0,0.3)"
                            transform="translate(1, 1)"
                            className="pointer-events-none"
                          />
                          {/* Dot */}
                          <circle
                            cx={x}
                            cy={y}
                            r="5"
                            fill={color.dot}
                            stroke="white"
                            strokeWidth="2"
                            className="cursor-pointer hover:r-6 transition-all"
                          />
                        </g>
                      );
                    })}
                </g>
              );
            })}

            {/* X-axis labels */}
            {labels.map((label, index) => {
              const x = getX(index, 1000);
              return (
                <text
                  key={`label-${index}`}
                  x={x}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  className="text-xs fill-surface-400 pointer-events-none"
                >
                  {label}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        {showLegend && series.length > 1 && (
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
                      backgroundColor: color.stroke,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  />
                  <span className="text-sm text-surface-300 font-medium">
                    {serie.name}
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

AreaChart.displayName = "AreaChart";

export { areaChartVariants };
