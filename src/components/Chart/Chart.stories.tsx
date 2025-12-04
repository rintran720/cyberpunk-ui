import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { AreaChart } from "./AreaChart";
import { ScatterChart } from "./ScatterChart";
import { RadarChart } from "./RadarChart";
import { ComposedChart } from "./ComposedChart";
import { GaugeChart } from "./GaugeChart";
import { ChartTooltip } from "./ChartTooltip";

const meta: Meta<typeof BarChart> = {
  title: "Components/Chart",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BarChart>;

// ============================================================================
// BarChart Stories
// ============================================================================

export const BarChartDefault: Story = {
  render: () => (
    <BarChart
      title="Sales Overview"
      description="Monthly sales data for 2024"
      data={[
        { label: "Jan", value: 120 },
        { label: "Feb", value: 190 },
        { label: "Mar", value: 300 },
        { label: "Apr", value: 250 },
        { label: "May", value: 180 },
        { label: "Jun", value: 320 },
      ]}
      showGrid
      showLabels
    />
  ),
};

export const BarChartMultipleColors: Story = {
  render: () => (
    <BarChart
      title="Revenue by Category"
      data={[
        { label: "Q1", value: 450, color: "primary" },
        { label: "Q2", value: 520, color: "secondary" },
        { label: "Q3", value: 480, color: "accent" },
        { label: "Q4", value: 600, color: "success" },
      ]}
      showGrid
      showLabels
    />
  ),
};

export const BarChartWithTooltip: Story = {
  render: () => (
    <BarChart
      title="Monthly Sales with Custom Tooltips"
      data={[
        { label: "Jan", value: 120, tooltip: "January: $120K revenue" },
        { label: "Feb", value: 190, tooltip: "February: $190K revenue" },
        { label: "Mar", value: 300, tooltip: "March: $300K revenue" },
        { label: "Apr", value: 250, tooltip: "April: $250K revenue" },
        { label: "May", value: 180, tooltip: "May: $180K revenue" },
        { label: "Jun", value: 320, tooltip: "June: $320K revenue" },
      ]}
      showGrid
      showLabels
    />
  ),
};

export const BarChartWithCustomTooltipRenderer: Story = {
  render: () => (
    <BarChart
      title="Monthly Sales with Custom Tooltip Renderer"
      data={[
        { label: "Jan", value: 120 },
        { label: "Feb", value: 190 },
        { label: "Mar", value: 300 },
        { label: "Apr", value: 250 },
        { label: "May", value: 180 },
        { label: "Jun", value: 320 },
      ]}
      showGrid
      showLabels
      renderTooltip={(data) => (
        <div className="text-sm">
          <div className="font-bold text-primary-400">{data.label}</div>
          <div className="text-surface-200">Revenue: ${data.value}K</div>
          <div className="text-xs text-surface-400 mt-1">Click for details</div>
        </div>
      )}
    />
  ),
};

export const BarChartWithRichCustomTooltip: Story = {
  render: () => {
    // Custom Tooltip Component with rich information
    const RichTooltip = ({
      x,
      y,
      children,
    }: {
      x: number;
      y: number;
      children: React.ReactNode;
    }) => {
      return (
        <ChartTooltip x={x} y={y} variant="elevated" className="min-w-[280px]">
          {children}
        </ChartTooltip>
      );
    };

    // Sample data with additional metadata
    const salesData = [
      {
        label: "Jan",
        value: 120,
        growth: 5.2,
        target: 100,
        region: "North",
        topProduct: "Product A",
      },
      {
        label: "Feb",
        value: 190,
        growth: 12.8,
        target: 150,
        region: "South",
        topProduct: "Product B",
      },
      {
        label: "Mar",
        value: 150,
        growth: -2.1,
        target: 180,
        region: "East",
        topProduct: "Product C",
      },
      {
        label: "Apr",
        value: 220,
        growth: 18.5,
        target: 200,
        region: "West",
        topProduct: "Product A",
      },
      {
        label: "May",
        value: 180,
        growth: 8.3,
        target: 170,
        region: "Central",
        topProduct: "Product B",
      },
      {
        label: "Jun",
        value: 250,
        growth: 25.0,
        target: 220,
        region: "North",
        topProduct: "Product A",
      },
    ];

    return (
      <BarChart
        title="Sales Performance with Rich Tooltip"
        description="Hover over bars to see detailed information"
        data={salesData.map(({ label, value }) => ({ label, value }))}
        TooltipComponent={RichTooltip}
        renderTooltip={(data) => {
          const fullData = salesData.find((d) => d.label === data.label);
          if (!fullData) return null;

          const isAboveTarget = fullData.value >= fullData.target;
          const growthColor =
            fullData.growth >= 0 ? "text-success" : "text-danger";

          return (
            <div className="space-y-2">
              {/* Header */}
              <div className="border-b border-surface-600 pb-2">
                <div className="text-base font-bold text-surface-100">
                  {fullData.label} 2024 Sales Report
                </div>
                <div className="text-xs text-surface-400">
                  Region: {fullData.region}
                </div>
              </div>

              {/* Main Metrics */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-300">
                    Sales Revenue
                  </span>
                  <span className="text-sm font-semibold text-surface-100">
                    ${fullData.value}K
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-300">Target</span>
                  <span className="text-sm text-surface-400">
                    ${fullData.target}K
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-300">Performance</span>
                  <span
                    className={`text-sm font-semibold ${
                      isAboveTarget ? "text-success" : "text-warning"
                    }`}
                  >
                    {isAboveTarget ? "✓" : "✗"}{" "}
                    {isAboveTarget ? "Above" : "Below"} Target
                  </span>
                </div>
              </div>

              {/* Growth */}
              <div className="pt-1 border-t border-surface-600">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-300">Growth Rate</span>
                  <span className={`text-sm font-semibold ${growthColor}`}>
                    {fullData.growth >= 0 ? "+" : ""}
                    {fullData.growth}%
                  </span>
                </div>
              </div>

              {/* Top Product */}
              <div className="pt-1 border-t border-surface-600">
                <div className="text-xs text-surface-400">Top Product</div>
                <div className="text-sm font-medium text-surface-200">
                  {fullData.topProduct}
                </div>
              </div>
            </div>
          );
        }}
      />
    );
  },
};

// ============================================================================
// LineChart Stories
// ============================================================================

export const LineChartDefault: Story = {
  render: () => (
    <LineChart
      title="User Growth"
      description="Active users over time"
      series={[
        {
          name: "Users",
          color: "primary",
          data: [
            { label: "Jan", value: 100 },
            { label: "Feb", value: 150 },
            { label: "Mar", value: 200 },
            { label: "Apr", value: 180 },
            { label: "May", value: 250 },
            { label: "Jun", value: 300 },
          ],
        },
      ]}
      showGrid
      showDots
      curve="smooth"
    />
  ),
};

export const LineChartMultipleSeries: Story = {
  render: () => (
    <LineChart
      title="Performance Metrics"
      description="Revenue and expenses comparison across quarters"
      series={[
        {
          name: "Revenue",
          color: "primary",
          data: [
            { label: "Q1", value: 100 },
            { label: "Q2", value: 150 },
            { label: "Q3", value: 120 },
            { label: "Q4", value: 180 },
          ],
        },
        {
          name: "Expenses",
          color: "danger",
          data: [
            { label: "Q1", value: 80 },
            { label: "Q2", value: 90 },
            { label: "Q3", value: 85 },
            { label: "Q4", value: 95 },
          ],
        },
      ]}
      showGrid
      showDots
      showLegend
      curve="smooth"
    />
  ),
};

export const LineChartWithArea: Story = {
  render: () => (
    <LineChart
      title="Traffic Overview"
      description="Weekly visitor statistics with area fill"
      series={[
        {
          name: "Visitors",
          color: "accent",
          data: [
            { label: "Mon", value: 1200 },
            { label: "Tue", value: 1900 },
            { label: "Wed", value: 3000 },
            { label: "Thu", value: 2500 },
            { label: "Fri", value: 2800 },
            { label: "Sat", value: 2200 },
            { label: "Sun", value: 1800 },
          ],
        },
      ]}
      showGrid
      showArea
      curve="smooth"
    />
  ),
};

// ============================================================================
// PieChart Stories
// ============================================================================

export const PieChartDefault: Story = {
  render: () => (
    <PieChart
      title="Market Share"
      description="Distribution by category"
      data={[
        { label: "Desktop", value: 45, color: "primary" },
        { label: "Mobile", value: 30, color: "secondary" },
        { label: "Tablet", value: 15, color: "accent" },
        { label: "Other", value: 10, color: "success" },
      ]}
      showLabels
      showLegend
    />
  ),
};

export const DonutChart: Story = {
  render: () => (
    <PieChart
      title="Budget Allocation"
      data={[
        { label: "Marketing", value: 35, color: "primary" },
        { label: "Development", value: 40, color: "secondary" },
        { label: "Operations", value: 15, color: "accent" },
        { label: "Support", value: 10, color: "warning" },
      ]}
      innerRadius={80}
      showLabels
      showLegend
    />
  ),
};

// ============================================================================
// AreaChart Stories
// ============================================================================

export const AreaChartDefault: Story = {
  render: () => (
    <AreaChart
      title="Revenue Trend"
      description="Monthly revenue over the past year"
      series={[
        {
          name: "Revenue",
          color: "primary",
          data: [
            { label: "Jan", value: 10000 },
            { label: "Feb", value: 15000 },
            { label: "Mar", value: 12000 },
            { label: "Apr", value: 18000 },
            { label: "May", value: 20000 },
            { label: "Jun", value: 22000 },
          ],
        },
      ]}
      showGrid
      showLegend
      curve="smooth"
    />
  ),
};

export const AreaChartMultipleSeries: Story = {
  render: () => (
    <AreaChart
      title="Sales vs Expenses"
      description="Quarterly comparison of sales revenue and operational expenses"
      series={[
        {
          name: "Sales",
          color: "success",
          data: [
            { label: "Q1", value: 50000 },
            { label: "Q2", value: 60000 },
            { label: "Q3", value: 55000 },
            { label: "Q4", value: 70000 },
          ],
        },
        {
          name: "Expenses",
          color: "danger",
          data: [
            { label: "Q1", value: 30000 },
            { label: "Q2", value: 35000 },
            { label: "Q3", value: 32000 },
            { label: "Q4", value: 40000 },
          ],
        },
      ]}
      showGrid
      showLegend
      curve="smooth"
    />
  ),
};

// ============================================================================
// ScatterChart Stories
// ============================================================================

export const ScatterChartDefault: Story = {
  render: () => {
    // Generate more data points for better visualization
    const generateData = () => {
      const data = [];
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * 50000 + 5000;
        const y = x * 0.8 + Math.random() * 10000 - 5000;
        data.push({ x, y });
      }
      return data.sort((a, b) => a.x - b.x);
    };

    return (
      <ScatterChart
        title="Sales vs Marketing Spend"
        description="Relationship between marketing investment and sales revenue (30 data points)"
        xAxisLabel="Marketing Spend ($)"
        yAxisLabel="Sales Revenue ($)"
        series={[
          {
            name: "2024 Data",
            color: "primary",
            data: generateData(),
          },
        ]}
        showGrid
        showLegend
        formatX={(val) => `$${(val / 1000).toFixed(0)}k`}
        formatY={(val) => `$${(val / 1000).toFixed(0)}k`}
      />
    );
  },
};

export const ScatterChartMultipleSeries: Story = {
  render: () => {
    // Generate data for Team A
    const generateTeamAData = () => {
      const data = [];
      for (let i = 0; i < 25; i++) {
        const x = Math.random() * 40 + 10;
        const y = x * 1.2 + Math.random() * 10 - 5;
        data.push({ x, y });
      }
      return data.sort((a, b) => a.x - b.x);
    };

    // Generate data for Team B
    const generateTeamBData = () => {
      const data = [];
      for (let i = 0; i < 25; i++) {
        const x = Math.random() * 40 + 12;
        const y = x * 1.3 + Math.random() * 12 - 6;
        data.push({ x, y });
      }
      return data.sort((a, b) => a.x - b.x);
    };

    return (
      <ScatterChart
        title="Team Performance Comparison"
        description="Productivity vs Efficiency metrics for two teams"
        xAxisLabel="Efficiency Score"
        yAxisLabel="Productivity Score"
        series={[
          {
            name: "Team A",
            color: "primary",
            data: generateTeamAData(),
          },
          {
            name: "Team B",
            color: "secondary",
            data: generateTeamBData(),
          },
        ]}
        showGrid
        showLegend
        pointSize={7}
      />
    );
  },
};

export const ScatterChartWithTooltip: Story = {
  render: () => (
    <ScatterChart
      title="Sales vs Marketing Spend with Tooltips"
      description="Hover over points to see detailed information"
      xAxisLabel="Marketing Spend ($K)"
      yAxisLabel="Sales ($K)"
      series={[
        {
          name: "Q1 2024",
          color: "primary",
          data: [
            {
              x: 20,
              y: 150,
              tooltip: "Q1: Marketing $20K → Sales $150K",
            },
            {
              x: 35,
              y: 220,
              tooltip: "Q1: Marketing $35K → Sales $220K",
            },
            {
              x: 50,
              y: 280,
              tooltip: "Q1: Marketing $50K → Sales $280K",
            },
            {
              x: 65,
              y: 350,
              tooltip: "Q1: Marketing $65K → Sales $350K",
            },
            {
              x: 80,
              y: 420,
              tooltip: "Q1: Marketing $80K → Sales $420K",
            },
          ],
        },
        {
          name: "Q2 2024",
          color: "success",
          data: [
            {
              x: 25,
              y: 180,
              tooltip: "Q2: Marketing $25K → Sales $180K",
            },
            {
              x: 40,
              y: 250,
              tooltip: "Q2: Marketing $40K → Sales $250K",
            },
            {
              x: 55,
              y: 310,
              tooltip: "Q2: Marketing $55K → Sales $310K",
            },
            {
              x: 70,
              y: 380,
              tooltip: "Q2: Marketing $70K → Sales $380K",
            },
            {
              x: 85,
              y: 450,
              tooltip: "Q2: Marketing $85K → Sales $450K",
            },
          ],
        },
      ]}
      showGrid
      showLegend
      pointSize={8}
    />
  ),
};

export const ScatterChartWithManyPoints: Story = {
  render: () => {
    // Generate a large dataset
    const generateLargeDataset = (
      color: "primary" | "secondary" | "accent"
    ) => {
      const data = [];
      const baseY =
        color === "primary" ? 100 : color === "secondary" ? 150 : 200;
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * 100;
        const y = baseY + x * 2 + Math.random() * 30 - 15;
        data.push({ x, y });
      }
      return data.sort((a, b) => a.x - b.x);
    };

    return (
      <ScatterChart
        title="Large Dataset Analysis"
        description="Correlation analysis with 150 data points across 3 categories"
        xAxisLabel="Variable X"
        yAxisLabel="Variable Y"
        series={[
          {
            name: "Category A",
            color: "primary",
            data: generateLargeDataset("primary"),
          },
          {
            name: "Category B",
            color: "secondary",
            data: generateLargeDataset("secondary"),
          },
          {
            name: "Category C",
            color: "accent",
            data: generateLargeDataset("accent"),
          },
        ]}
        showGrid
        showLegend
        pointSize={6}
      />
    );
  },
};

// ============================================================================
// RadarChart Stories
// ============================================================================

export const RadarChartDefault: Story = {
  render: () => (
    <RadarChart
      title="Performance Metrics"
      description="Multi-dimensional performance analysis"
      series={[
        {
          name: "Product A",
          color: "primary",
          data: [
            { label: "Speed", value: 80 },
            { label: "Quality", value: 90 },
            { label: "Price", value: 70 },
            { label: "Support", value: 85 },
            { label: "Features", value: 75 },
            { label: "Design", value: 88 },
          ],
        },
      ]}
      showGrid
      showArea
    />
  ),
};

export const RadarChartMultipleSeries: Story = {
  render: () => (
    <RadarChart
      title="Product Comparison"
      description="Side-by-side comparison of multiple products across key metrics"
      series={[
        {
          name: "Product A",
          color: "primary",
          data: [
            { label: "Speed", value: 80 },
            { label: "Quality", value: 90 },
            { label: "Price", value: 70 },
            { label: "Support", value: 85 },
            { label: "Features", value: 75 },
          ],
        },
        {
          name: "Product B",
          color: "secondary",
          data: [
            { label: "Speed", value: 70 },
            { label: "Quality", value: 85 },
            { label: "Price", value: 90 },
            { label: "Support", value: 75 },
            { label: "Features", value: 80 },
          ],
        },
      ]}
      showGrid
      showArea
      showLegend
    />
  ),
};

// ============================================================================
// ComposedChart Stories
// ============================================================================

export const ComposedChartDefault: Story = {
  render: () => (
    <ComposedChart
      title="Revenue Analysis"
      description="Combined view of revenue (bars) and expenses (line)"
      data={[
        { label: "Jan", barValue: 12000, lineValue: 8000 },
        { label: "Feb", barValue: 15000, lineValue: 9000 },
        { label: "Mar", barValue: 18000, lineValue: 10000 },
        { label: "Apr", barValue: 14000, lineValue: 9500 },
        { label: "May", barValue: 20000, lineValue: 11000 },
        { label: "Jun", barValue: 22000, lineValue: 12000 },
      ]}
      showGrid
      showLabels
      barColor="primary"
      lineColor="secondary"
      curve="smooth"
    />
  ),
};

export const ComposedChartBarAndLine: Story = {
  render: () => (
    <ComposedChart
      title="Sales vs Target"
      data={[
        { label: "Q1", barValue: 45000, lineValue: 50000 },
        { label: "Q2", barValue: 52000, lineValue: 50000 },
        { label: "Q3", barValue: 48000, lineValue: 50000 },
        { label: "Q4", barValue: 60000, lineValue: 50000 },
      ]}
      showGrid
      barColor="primary"
      lineColor="warning"
      curve="smooth"
    />
  ),
};

export const ComposedChartBarAndArea: Story = {
  render: () => (
    <ComposedChart
      title="Website Traffic & Conversion"
      description="Page views (bars) and conversion rate trend (area)"
      data={[
        { label: "Mon", barValue: 4500, areaValue: 2500 },
        { label: "Tue", barValue: 5200, areaValue: 2800 },
        { label: "Wed", barValue: 4800, areaValue: 3100 },
        { label: "Thu", barValue: 6100, areaValue: 3400 },
        { label: "Fri", barValue: 5500, areaValue: 3600 },
        { label: "Sat", barValue: 4200, areaValue: 3200 },
        { label: "Sun", barValue: 3800, areaValue: 2900 },
      ]}
      barColor="accent"
      areaColor="secondary"
      curve="smooth"
      showGrid
      showLabels
    />
  ),
};

export const ComposedChartSalesAndRevenue: Story = {
  render: () => (
    <ComposedChart
      title="Sales & Revenue Analysis"
      description="Monthly sales volume (bars) vs revenue trend (line)"
      data={[
        { label: "Jan", barValue: 120, lineValue: 95 },
        { label: "Feb", barValue: 150, lineValue: 110 },
        { label: "Mar", barValue: 180, lineValue: 125 },
        { label: "Apr", barValue: 165, lineValue: 140 },
        { label: "May", barValue: 200, lineValue: 155 },
        { label: "Jun", barValue: 220, lineValue: 170 },
        { label: "Jul", barValue: 190, lineValue: 185 },
        { label: "Aug", barValue: 240, lineValue: 200 },
      ]}
      barColor="primary"
      lineColor="success"
      curve="smooth"
      showGrid
      showLabels
    />
  ),
};

export const ComposedChartProfitMargin: Story = {
  render: () => (
    <ComposedChart
      title="Profit & Margin Analysis"
      description="Revenue (bars) and profit trend (line)"
      data={[
        { label: "Q1", barValue: 500, lineValue: 120 },
        { label: "Q2", barValue: 650, lineValue: 150 },
        { label: "Q3", barValue: 720, lineValue: 180 },
        { label: "Q4", barValue: 800, lineValue: 210 },
      ]}
      barColor="primary"
      lineColor="success"
      curve="smooth"
      showGrid
      showLabels
    />
  ),
};

export const ComposedChartUserEngagement: Story = {
  render: () => (
    <ComposedChart
      title="User Engagement Metrics"
      description="Active users (bars) and engagement score (area)"
      data={[
        { label: "Week 1", barValue: 1200, areaValue: 72 },
        { label: "Week 2", barValue: 1450, areaValue: 75 },
        { label: "Week 3", barValue: 1600, areaValue: 78 },
        { label: "Week 4", barValue: 1800, areaValue: 82 },
      ]}
      barColor="primary"
      areaColor="success"
      curve="smooth"
      showGrid
      showLabels
    />
  ),
};

export const ComposedChartInventorySales: Story = {
  render: () => (
    <ComposedChart
      title="Inventory & Sales Performance"
      description="Units sold (bars) and inventory level trend (line)"
      data={[
        { label: "Jan", barValue: 450, lineValue: 1200 },
        { label: "Feb", barValue: 520, lineValue: 1150 },
        { label: "Mar", barValue: 480, lineValue: 1300 },
        { label: "Apr", barValue: 600, lineValue: 1050 },
        { label: "May", barValue: 550, lineValue: 1200 },
        { label: "Jun", barValue: 680, lineValue: 950 },
      ]}
      barColor="success"
      lineColor="warning"
      curve="smooth"
      showGrid
      showLabels
    />
  ),
};

export const ComposedChartMarketingROI: Story = {
  render: () => (
    <ComposedChart
      title="Marketing ROI Analysis"
      description="Marketing spend (bars) and ROI trend (line)"
      data={[
        { label: "Campaign 1", barValue: 5000, lineValue: 2.5 },
        { label: "Campaign 2", barValue: 7500, lineValue: 3.2 },
        { label: "Campaign 3", barValue: 6000, lineValue: 3.8 },
        { label: "Campaign 4", barValue: 9000, lineValue: 4.5 },
        { label: "Campaign 5", barValue: 8500, lineValue: 5.1 },
      ]}
      barColor="primary"
      lineColor="success"
      curve="smooth"
      showGrid
      showLabels
    />
  ),
};

// ============================================================================
// GaugeChart Stories
// ============================================================================

export const GaugeChartDefault: Story = {
  render: () => (
    <GaugeChart
      title="CPU Usage"
      description="Current system CPU utilization"
      value={75}
      min={0}
      max={100}
      unit="%"
      color="primary"
      showValue
      showMinMax
      size="lg"
    />
  ),
};

export const GaugeChartSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 justify-center">
      <GaugeChart title="Small" value={60} unit="%" color="primary" size="sm" />
      <GaugeChart
        title="Medium"
        value={75}
        unit="%"
        color="secondary"
        size="md"
      />
      <GaugeChart title="Large" value={85} unit="%" color="accent" size="lg" />
      <GaugeChart
        title="Extra Large"
        value={90}
        unit="%"
        color="success"
        size="xl"
      />
    </div>
  ),
};

export const GaugeChartColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 justify-center">
      <GaugeChart title="Primary" value={65} unit="%" color="primary" />
      <GaugeChart title="Success" value={85} unit="%" color="success" />
      <GaugeChart title="Warning" value={45} unit="%" color="warning" />
      <GaugeChart title="Danger" value={25} unit="%" color="danger" />
    </div>
  ),
};

export const GaugeChartCustomRange: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 justify-center">
      <GaugeChart
        title="Temperature"
        description="Room temperature"
        value={22}
        min={0}
        max={40}
        unit="°C"
        color="warning"
        formatValue={(val) => val.toFixed(1)}
      />
      <GaugeChart
        title="Speed"
        description="Vehicle speed"
        value={85}
        min={0}
        max={120}
        unit="km/h"
        color="primary"
      />
      <GaugeChart
        title="Score"
        description="Performance score"
        value={8.5}
        min={0}
        max={10}
        color="success"
        formatValue={(val) => val.toFixed(1)}
      />
    </div>
  ),
};

export const GaugeChartFullCircle: Story = {
  render: () => (
    <GaugeChart
      title="Full Circle Gauge"
      description="360 degree gauge visualization"
      value={270}
      min={0}
      max={360}
      unit="°"
      color="accent"
      type="full"
      size="lg"
    />
  ),
};

export const GaugeChartCustomUnitFontSize: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GaugeChart
        title="Default Unit Size"
        description="Default unit font size"
        value={75}
        unit="%"
        color="primary"
        size="md"
      />
      <GaugeChart
        title="Small Unit"
        description="Custom small unit font size"
        value={85}
        unit="°C"
        unitFontSize="text-xs"
        color="success"
        size="md"
      />
      <GaugeChart
        title="Large Unit"
        description="Custom large unit font size"
        value={22}
        unit="°C"
        unitFontSize="text-xl"
        color="warning"
        size="md"
      />
    </div>
  ),
};

export const GaugeChartGradient: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GaugeChart
        title="Low Value"
        description="Green gradient (0-33%)"
        value={20}
        min={0}
        max={100}
        unit="%"
        useGradient
        size="md"
      />
      <GaugeChart
        title="Medium Value"
        description="Yellow gradient (34-66%)"
        value={50}
        min={0}
        max={100}
        unit="%"
        useGradient
        size="md"
      />
      <GaugeChart
        title="High Value"
        description="Red gradient (67-100%)"
        value={85}
        min={0}
        max={100}
        unit="%"
        useGradient
        size="md"
      />
      <GaugeChart
        title="Full Circle Gradient"
        description="Gradient in full circle"
        value={270}
        min={0}
        max={360}
        unit="°"
        useGradient
        type="full"
        size="md"
      />
    </div>
  ),
};
