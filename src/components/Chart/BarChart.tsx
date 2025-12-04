"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ChartTooltip } from "./ChartTooltip";

// ============================================================================
// BarChart Variants
// ============================================================================

const barChartVariants = cva(
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
// BarChart Types
// ============================================================================

export interface BarChartData {
  label: string;
  value: number;
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
  /** Custom tooltip content for this bar */
  tooltip?: React.ReactNode | ((data: BarChartData) => React.ReactNode);
}

export interface BarChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof barChartVariants> {
  /** Chart data */
  data: BarChartData[];
  /** Chart title */
  title?: string;
  /** Chart description */
  description?: string;
  /** Maximum value for scaling (auto-calculated if not provided) */
  maxValue?: number;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show value labels on bars */
  showLabels?: boolean;
  /** Bar spacing */
  barSpacing?: number;
  /** Minimum bar height */
  minBarHeight?: number;
  /** Custom tooltip renderer for all bars */
  renderTooltip?: (data: BarChartData) => React.ReactNode;
  /** Custom Tooltip component to use instead of default */
  TooltipComponent?: React.ComponentType<{
    x: number;
    y: number;
    children: React.ReactNode;
  }>;
}

// ============================================================================
// BarChart Component
// ============================================================================

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      className,
      variant,
      data,
      title,
      description,
      maxValue,
      showGrid = true,
      showLabels = true,
      barSpacing = 12,
      minBarHeight = 4,
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
      // Cancel hide timeout if user hovers into tooltip
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
        tooltipTimeoutRef.current = null;
      }
    }, []);

    const handleTooltipMouseLeave = React.useCallback(() => {
      // Hide tooltip when mouse leaves tooltip
      setTooltip(null);
    }, []);

    const max = React.useMemo(() => {
      if (maxValue !== undefined) return maxValue;
      return Math.max(...data.map((d) => d.value), 0) * 1.1;
    }, [data, maxValue]);

    const chartHeight = 300;
    const chartWidth = "100%";
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartAreaHeight = chartHeight - padding.top - padding.bottom;

    // Color gradients for bars
    const colorGradients = {
      primary: {
        from: "rgb(59, 130, 246)",
        via: "rgb(96, 165, 250)",
        to: "rgb(147, 197, 253)",
        shadow: "rgb(37, 99, 235)",
      },
      secondary: {
        from: "rgb(168, 85, 247)",
        via: "rgb(192, 132, 252)",
        to: "rgb(221, 214, 254)",
        shadow: "rgb(147, 51, 234)",
      },
      accent: {
        from: "rgb(101, 221, 9)",
        via: "rgb(163, 230, 53)",
        to: "rgb(220, 252, 231)",
        shadow: "rgb(84, 197, 0)",
      },
      success: {
        from: "rgb(34, 197, 94)",
        via: "rgb(74, 222, 128)",
        to: "rgb(187, 247, 208)",
        shadow: "rgb(22, 163, 74)",
      },
      warning: {
        from: "rgb(234, 179, 8)",
        via: "rgb(250, 204, 21)",
        to: "rgb(254, 240, 138)",
        shadow: "rgb(202, 138, 4)",
      },
      danger: {
        from: "rgb(239, 68, 68)",
        via: "rgb(248, 113, 113)",
        to: "rgb(254, 202, 202)",
        shadow: "rgb(220, 38, 38)",
      },
    };

    // Generate Y-axis labels
    const yAxisLabels = Array.from({ length: 5 }).map((_, i) => {
      const value = max - (max / 4) * i;
      const y = padding.top + (chartAreaHeight / 4) * i;
      return { value, y };
    });

    return (
      <div
        ref={ref}
        className={cn(barChartVariants({ variant }), className)}
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
            width={chartWidth}
            height={chartHeight}
            className="overflow-visible"
            viewBox={`0 0 1000 ${chartHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Create gradients for each color */}
              {Object.entries(colorGradients).map(([colorName, colors]) => (
                <linearGradient
                  key={`gradient-${colorName}`}
                  id={`bar-gradient-${colorName}`}
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
            </defs>

            {/* Y-axis labels */}
            {yAxisLabels.map((label, i) => (
              <text
                key={`y-label-${i}`}
                x={padding.left - 10}
                y={label.y}
                textAnchor="end"
                dominantBaseline="middle"
                className="text-xs fill-surface-400 pointer-events-none"
              >
                {Math.round(label.value)}
              </text>
            ))}

            {/* Grid lines */}
            {showGrid &&
              yAxisLabels.map((label, i) => (
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

            {/* Bars */}
            {data.map((item, index) => {
              const barWidth =
                (1000 -
                  padding.left -
                  padding.right -
                  barSpacing * (data.length - 1)) /
                data.length;
              const barHeight = Math.max(
                (item.value / max) * chartAreaHeight,
                minBarHeight
              );
              const x = padding.left + index * (barWidth + barSpacing);
              const y = padding.top + chartAreaHeight - barHeight;
              // Default to primary color if not specified
              const color = item.color || "primary";
              const gradient = colorGradients[color];

              const handleMouseEnter = (
                e: React.MouseEvent<SVGRectElement>
              ) => {
                // Cancel any pending hide timeout
                if (tooltipTimeoutRef.current) {
                  clearTimeout(tooltipTimeoutRef.current);
                  tooltipTimeoutRef.current = null;
                }

                if (!containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                const svgRect = e.currentTarget.getBoundingClientRect();

                // Calculate position relative to container
                const tooltipX = svgRect.left + svgRect.width / 2 - rect.left;
                const tooltipY = svgRect.top - rect.top - 10;

                // Get tooltip content
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
                    <div className="text-surface-300">Value: {item.value}</div>
                  </div>
                );

                setTooltip({
                  content: tooltipContent,
                  x: tooltipX,
                  y: tooltipY,
                });
              };

              const handleMouseLeave = () => {
                // Delay hiding tooltip to allow user to hover into it
                tooltipTimeoutRef.current = setTimeout(() => {
                  setTooltip(null);
                }, 200);
              };

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
                  {/* Bar with gradient */}
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={`url(#bar-gradient-${color})`}
                    rx="4"
                    className="cursor-pointer transition-all hover:opacity-90"
                    style={{
                      filter: `drop-shadow(0 4px 0 ${gradient.shadow}) drop-shadow(0 6px 8px rgba(0,0,0,0.3))`,
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                  {/* Top border highlight */}
                  <line
                    x1={x}
                    y1={y}
                    x2={x + barWidth}
                    y2={y}
                    stroke={`rgba(255,255,255,0.3)`}
                    strokeWidth="1"
                    className="pointer-events-none"
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
                      {item.value}
                    </text>
                  )}
                  {/* X-axis label */}
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight - padding.bottom + 16}
                    textAnchor="middle"
                    className="text-xs fill-surface-400 pointer-events-none"
                  >
                    {item.label}
                  </text>
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
      </div>
    );
  }
);

BarChart.displayName = "BarChart";

export { barChartVariants };
