"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ChartTooltip } from "./ChartTooltip";

// ============================================================================
// PieChart Variants
// ============================================================================

const pieChartVariants = cva(
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
// PieChart Types
// ============================================================================

export interface PieChartData {
  label: string;
  value: number;
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
  /** Custom tooltip content for this slice */
  tooltip?: React.ReactNode | ((data: PieChartData) => React.ReactNode);
}

export interface PieChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pieChartVariants> {
  /** Chart data */
  data: PieChartData[];
  /** Chart title */
  title?: string;
  /** Chart description */
  description?: string;
  /** Show labels */
  showLabels?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Inner radius for donut chart (0 for pie chart) */
  innerRadius?: number;
  /** Custom tooltip renderer for all slices */
  renderTooltip?: (data: PieChartData) => React.ReactNode;
  /** Custom Tooltip component to use instead of default */
  TooltipComponent?: React.ComponentType<{
    x: number;
    y: number;
    children: React.ReactNode;
    transform?: string;
  }>;
}

const colorGradients = {
  primary: {
    from: "rgb(59, 130, 246)",
    to: "rgb(37, 99, 235)",
  },
  secondary: {
    from: "rgb(168, 85, 247)",
    to: "rgb(147, 51, 234)",
  },
  accent: {
    from: "rgb(101, 221, 9)",
    to: "rgb(84, 197, 0)",
  },
  success: {
    from: "rgb(34, 197, 94)",
    to: "rgb(22, 163, 74)",
  },
  warning: {
    from: "rgb(234, 179, 8)",
    to: "rgb(202, 138, 4)",
  },
  danger: {
    from: "rgb(239, 68, 68)",
    to: "rgb(220, 38, 38)",
  },
};

// ============================================================================
// PieChart Component
// ============================================================================

export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      className,
      variant,
      data,
      title,
      description,
      showLabels = true,
      showLegend = true,
      innerRadius = 0,
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
    const tooltipTimeoutRef = React.useRef<ReturnType<
      typeof setTimeout
    > | null>(null);
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
    const size = 280;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;
    const innerR = innerRadius || 0;

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const createArc = (
      startAngle: number,
      endAngle: number,
      innerR: number,
      outerR: number
    ) => {
      const start = {
        x: centerX + outerR * Math.cos(startAngle),
        y: centerY + outerR * Math.sin(startAngle),
      };
      const end = {
        x: centerX + outerR * Math.cos(endAngle),
        y: centerY + outerR * Math.sin(endAngle),
      };

      const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

      if (innerR === 0) {
        // Pie chart
        return [
          `M ${centerX} ${centerY}`,
          `L ${start.x} ${start.y}`,
          `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
          "Z",
        ].join(" ");
      } else {
        // Donut chart
        const innerStart = {
          x: centerX + innerR * Math.cos(startAngle),
          y: centerY + innerR * Math.sin(startAngle),
        };
        const innerEnd = {
          x: centerX + innerR * Math.cos(endAngle),
          y: centerY + innerR * Math.sin(endAngle),
        };

        return [
          `M ${start.x} ${start.y}`,
          `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
          `L ${innerEnd.x} ${innerEnd.y}`,
          `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
          "Z",
        ].join(" ");
      }
    };

    let currentAngle = -Math.PI / 2; // Start from top

    return (
      <div
        ref={ref}
        className={cn(pieChartVariants({ variant }), className)}
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

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="overflow-visible">
              <defs>
                {data.map((item, index) => {
                  const color = item.color || "primary";
                  const gradient = colorGradients[color];
                  return (
                    <linearGradient
                      key={`gradient-${index}`}
                      id={`gradient-${index}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={gradient.from} />
                      <stop offset="100%" stopColor={gradient.to} />
                    </linearGradient>
                  );
                })}
              </defs>

              {data.map((item, index) => {
                const angle = (item.value / total) * 2 * Math.PI;
                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;
                const midAngle = (startAngle + endAngle) / 2;

                const arcPath = createArc(startAngle, endAngle, innerR, radius);

                // Label position
                const labelRadius = innerR + (radius - innerR) * 0.7;
                const labelX = centerX + labelRadius * Math.cos(midAngle);
                const labelY = centerY + labelRadius * Math.sin(midAngle);

                currentAngle = endAngle;

                return (
                  <g key={`slice-${index}`}>
                    {/* Shadow */}
                    <path
                      d={arcPath}
                      fill="rgba(0,0,0,0.3)"
                      transform="translate(4, 4)"
                      className="pointer-events-none"
                    />
                    {/* Slice */}
                    <path
                      d={arcPath}
                      fill={`url(#gradient-${index})`}
                      stroke="rgba(0,0,0,0.2)"
                      strokeWidth="2"
                      className="cursor-pointer transition-all hover:opacity-90"
                      style={{
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
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
                        const pathRect =
                          e.currentTarget.getBoundingClientRect();
                        const tooltipX =
                          pathRect.left + pathRect.width / 2 - rect.left;
                        const tooltipY =
                          pathRect.top + pathRect.height / 2 - rect.top;
                        const tooltipContent = item.tooltip ? (
                          typeof item.tooltip === "function" ? (
                            item.tooltip(item)
                          ) : (
                            item.tooltip
                          )
                        ) : renderTooltip ? (
                          renderTooltip(item)
                        ) : (
                          <div className="text-sm">
                            <div className="font-semibold">{item.label}</div>
                            <div className="text-surface-300">
                              Value: {item.value}
                            </div>
                            <div className="text-surface-400 text-xs">
                              {((item.value / total) * 100).toFixed(1)}%
                            </div>
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
                    {/* Label */}
                    {showLabels && (
                      <text
                        x={labelX}
                        y={labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-sm font-semibold fill-white pointer-events-none"
                        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                      >
                        {Math.round((item.value / total) * 100)}%
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
            {/* Tooltip */}
            {tooltip && (
              <TooltipComponent
                x={tooltip.x}
                y={tooltip.y}
                transform="translateX(-50%) translateY(-50%)"
                onMouseEnter={handleTooltipMouseEnter}
                onMouseLeave={handleTooltipMouseLeave}
              >
                {tooltip.content}
              </TooltipComponent>
            )}
          </div>

          {/* Legend */}
          {showLegend && (
            <div className="flex flex-col gap-3">
              {data.map((item, index) => {
                const percentage = Math.round((item.value / total) * 100);
                return (
                  <div
                    key={`legend-${index}`}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-4 h-4 rounded"
                      style={{
                        background: `linear-gradient(135deg, ${
                          colorGradients[item.color || "primary"].from
                        }, ${colorGradients[item.color || "primary"].to})`,
                        boxShadow: "0 2px 0 0 rgba(0,0,0,0.2)",
                      }}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-surface-200">
                        {item.label}
                      </div>
                      <div className="text-xs text-surface-400">
                        {item.value} ({percentage}%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
);

PieChart.displayName = "PieChart";

export { pieChartVariants };
