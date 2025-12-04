"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ============================================================================
// RadarChart Variants
// ============================================================================

const radarChartVariants = cva(
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
// RadarChart Types
// ============================================================================

export interface RadarChartData {
  label: string;
  value: number;
}

export interface RadarChartSeries {
  name: string;
  data: RadarChartData[];
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
}

export interface RadarChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radarChartVariants> {
  /** Chart series data */
  series: RadarChartSeries[];
  /** Chart title */
  title?: string;
  /** Chart description */
  description?: string;
  /** Maximum value for scaling */
  maxValue?: number;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show area fill */
  showArea?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Number of grid levels */
  gridLevels?: number;
}

const colorMap = {
  primary: {
    fill: "rgba(59, 130, 246, 0.2)",
    stroke: "rgb(59, 130, 246)",
    dot: "rgb(59, 130, 246)",
  },
  secondary: {
    fill: "rgba(168, 85, 247, 0.2)",
    stroke: "rgb(168, 85, 247)",
    dot: "rgb(168, 85, 247)",
  },
  accent: {
    fill: "rgba(101, 221, 9, 0.2)",
    stroke: "rgb(101, 221, 9)",
    dot: "rgb(101, 221, 9)",
  },
  success: {
    fill: "rgba(34, 197, 94, 0.2)",
    stroke: "rgb(34, 197, 94)",
    dot: "rgb(34, 197, 94)",
  },
  warning: {
    fill: "rgba(234, 179, 8, 0.2)",
    stroke: "rgb(234, 179, 8)",
    dot: "rgb(234, 179, 8)",
  },
  danger: {
    fill: "rgba(239, 68, 68, 0.2)",
    stroke: "rgb(239, 68, 68)",
    dot: "rgb(239, 68, 68)",
  },
};

// ============================================================================
// RadarChart Component
// ============================================================================

export const RadarChart = React.forwardRef<HTMLDivElement, RadarChartProps>(
  (
    {
      className,
      variant,
      series,
      title,
      description,
      maxValue,
      showGrid = true,
      showArea = true,
      showLegend = false,
      gridLevels = 5,
      ...props
    },
    ref
  ) => {
    const size = 300;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 40;

    // Get all values to calculate max
    const allValues = series.flatMap((s) => s.data.map((d) => d.value));
    const max = React.useMemo(() => {
      if (maxValue !== undefined) return maxValue;
      return Math.max(...allValues, 0) * 1.1;
    }, [allValues, maxValue]);

    // Get labels from first series
    const labels = series[0]?.data.map((d) => d.label) || [];
    const numPoints = labels.length;

    // Calculate angle for each point
    const getAngle = (index: number) => {
      return (index / numPoints) * 2 * Math.PI - Math.PI / 2;
    };

    // Convert polar to cartesian
    const getPoint = (index: number, value: number) => {
      const angle = getAngle(index);
      const distance = (value / max) * radius;
      return {
        x: centerX + distance * Math.cos(angle),
        y: centerY + distance * Math.sin(angle),
      };
    };

    // Create path for a series
    const createPath = (data: RadarChartData[]) => {
      if (data.length === 0) return "";

      const points = data.map((d, i) => {
        const point = getPoint(i, d.value);
        return `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`;
      });

      return `${points.join(" ")} Z`;
    };

    return (
      <div
        ref={ref}
        className={cn(radarChartVariants({ variant }), className)}
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

        <div className="flex justify-center">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="overflow-visible">
              {/* Grid circles */}
              {showGrid &&
                Array.from({ length: gridLevels }).map((_, level) => {
                  const levelRadius = (radius / gridLevels) * (level + 1);
                  return (
                    <circle
                      key={`grid-${level}`}
                      cx={centerX}
                      cy={centerY}
                      r={levelRadius}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeOpacity="0.1"
                      className="text-surface-600"
                    />
                  );
                })}

              {/* Grid lines (spokes) */}
              {showGrid &&
                labels.map((_, index) => {
                  const angle = getAngle(index);
                  const x = centerX + radius * Math.cos(angle);
                  const y = centerY + radius * Math.sin(angle);
                  return (
                    <line
                      key={`spoke-${index}`}
                      x1={centerX}
                      y1={centerY}
                      x2={x}
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
                const pathData = createPath(serie.data);

                return (
                  <g key={`series-${serieIndex}`}>
                    {/* Area fill */}
                    {showArea && (
                      <path
                        d={pathData}
                        fill={color.fill}
                        className="transition-opacity duration-300"
                      />
                    )}

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
                    {serie.data.map((point, index) => {
                      const pointPos = getPoint(index, point.value);
                      return (
                        <g key={`point-${serieIndex}-${index}`}>
                          {/* Point shadow */}
                          <circle
                            cx={pointPos.x + 1}
                            cy={pointPos.y + 1}
                            r="5"
                            fill="rgba(0,0,0,0.3)"
                            className="pointer-events-none"
                          />
                          {/* Point */}
                          <circle
                            cx={pointPos.x}
                            cy={pointPos.y}
                            r="5"
                            fill={color.dot}
                            stroke="white"
                            strokeWidth="2"
                            className="cursor-pointer transition-all hover:r-6"
                          />
                        </g>
                      );
                    })}
                  </g>
                );
              })}

              {/* Labels */}
              {labels.map((label, index) => {
                const angle = getAngle(index);
                const labelRadius = radius + 20;
                const x = centerX + labelRadius * Math.cos(angle);
                const y = centerY + labelRadius * Math.sin(angle);

                return (
                  <text
                    key={`label-${index}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs fill-surface-300 pointer-events-none font-medium"
                  >
                    {label}
                  </text>
                );
              })}
            </svg>
          </div>
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

RadarChart.displayName = "RadarChart";

export { radarChartVariants };
