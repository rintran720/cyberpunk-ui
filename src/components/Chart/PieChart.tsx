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
    "bg-black/80 rounded-2xl border-2 border-cyber",
    "shadow-cyber-border",
    "p-6",
    "before:absolute before:inset-0 before:rounded-2xl before:bg-[linear-gradient(135deg,transparent_30%,var(--cyber-glow-primary)_50%,transparent_70%)] before:opacity-10 before:pointer-events-none",
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
    from: "rgb(64, 244, 255)",
    to: "rgb(40, 200, 220)",
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
              <h3 className="text-lg font-semibold text-primary-500 font-mono mb-1">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-primary-500/70 font-mono">{description}</p>
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
                    <React.Fragment key={`defs-${index}`}>
                      <linearGradient
                        id={`gradient-${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={gradient.from} stopOpacity="1" />
                        <stop offset="50%" stopColor={gradient.from} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={gradient.to} stopOpacity="0.8" />
                      </linearGradient>
                      {/* Glow filter for slices */}
                      <filter id={`glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      {/* Strong glow for hover */}
                      <filter id={`glow-hover-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </React.Fragment>
                  );
                })}
                {/* Inner glow for donut chart */}
                {innerR > 0 && (
                  <radialGradient id="inner-glow" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="rgba(64, 244, 255, 0.15)" />
                    <stop offset="50%" stopColor="rgba(64, 244, 255, 0.05)" />
                    <stop offset="100%" stopColor="rgba(64, 244, 255, 0)" />
                  </radialGradient>
                )}
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

                const color = item.color || "primary";
                const gradient = colorGradients[color];
                const isPrimary = color === "primary";
                
                return (
                  <g key={`slice-${index}`}>
                    {/* Deep shadow with glow */}
                    <path
                      d={arcPath}
                      fill="rgba(0,0,0,0.4)"
                      transform="translate(2, 2)"
                      className="pointer-events-none"
                      style={{
                        filter: `drop-shadow(0 0 4px ${gradient.from})`,
                      }}
                    />
                    {/* Slice with neon border and glow */}
                    <path
                      d={arcPath}
                      fill={`url(#gradient-${index})`}
                      stroke={gradient.from}
                      strokeWidth={isPrimary ? "2.5" : "2"}
                      strokeOpacity="0.7"
                      className="cursor-pointer transition-all"
                      style={{
                        filter: `url(#glow-${index}) drop-shadow(0 0 6px ${gradient.from})`,
                      }}
                      onMouseEnter={(e) => {
                        // Enhance glow on hover
                        e.currentTarget.style.filter = `url(#glow-hover-${index}) drop-shadow(0 0 12px ${gradient.from})`;
                        e.currentTarget.style.strokeWidth = isPrimary ? "4" : "3";
                        e.currentTarget.style.strokeOpacity = "1";
                        
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
                            <div className="font-semibold font-mono">{item.label}</div>
                            <div className="text-primary-500/70 font-mono">
                              Value: {item.value}
                            </div>
                            <div className="text-primary-500/50 text-xs font-mono">
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
                      onMouseLeave={(e) => {
                        // Reset glow
                        e.currentTarget.style.filter = `url(#glow-${index}) drop-shadow(0 0 6px ${gradient.from})`;
                        e.currentTarget.style.strokeWidth = isPrimary ? "2.5" : "2";
                        e.currentTarget.style.strokeOpacity = "0.7";
                        setTooltip(null);
                      }}
                    />
                    {/* Label with cyberpunk glow and background */}
                    {showLabels && (
                      <g>
                        {/* Background circle/rect for label */}
                        <rect
                          x={labelX - 20}
                          y={labelY - 10}
                          width="40"
                          height="20"
                          rx="4"
                          fill="rgba(0, 0, 0, 0.6)"
                          stroke={gradient.from}
                          strokeWidth="1"
                          strokeOpacity="0.3"
                          className="pointer-events-none"
                          style={{
                            filter: `drop-shadow(0 0 4px ${gradient.from})`,
                          }}
                        />
                        {/* Label text */}
                        <text
                          x={labelX}
                          y={labelY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-sm font-semibold font-mono pointer-events-none"
                          fill={gradient.from}
                          style={{ 
                            textShadow: `0 0 3px ${gradient.from}, 0 1px 2px rgba(0,0,0,0.9)`,
                            filter: `drop-shadow(0 0 2px ${gradient.from})`,
                          }}
                        >
                          {Math.round((item.value / total) * 100)}%
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
              {/* Inner glow circle for donut chart */}
              {innerR > 0 && (
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={innerR}
                  fill="url(#inner-glow)"
                  className="pointer-events-none"
                />
              )}
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
                      className="w-4 h-4 rounded border-2"
                      style={{
                        background: `linear-gradient(135deg, ${
                          colorGradients[item.color || "primary"].from
                        }, ${colorGradients[item.color || "primary"].to})`,
                        borderColor: colorGradients[item.color || "primary"].from,
                        boxShadow: `0 0 4px ${colorGradients[item.color || "primary"].from}, 0 1px 2px rgba(0,0,0,0.5)`,
                      }}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-primary-500 font-mono">
                        {item.label}
                      </div>
                      <div className="text-xs text-primary-500/70 font-mono">
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
