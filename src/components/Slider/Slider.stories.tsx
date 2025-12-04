import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[300px] p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-primary-500/70 font-mono mb-2">Small</p>
        <Slider size="sm" defaultValue={[30]} />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Medium (default)</p>
        <Slider size="md" defaultValue={[50]} />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Large</p>
        <Slider size="lg" defaultValue={[70]} />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-surface-400 mb-2">Primary</p>
        <Slider variant="primary" defaultValue={[60]} />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Secondary</p>
        <Slider variant="secondary" defaultValue={[60]} />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Accent</p>
        <Slider variant="accent" defaultValue={[60]} />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Success</p>
        <Slider variant="success" defaultValue={[60]} />
      </div>
    </div>
  ),
};

export const WithValueTooltip: Story = {
  render: () => (
    <div className="pt-8">
      <p className="text-sm text-primary-500/70 font-mono mb-4">Drag to see value</p>
      <Slider defaultValue={[50]} showValue />
    </div>
  ),
};

export const CustomRange: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-surface-400 mb-2">Temperature (0-100°C)</p>
        <Slider min={0} max={100} step={5} defaultValue={[25]} showValue />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Volume (0-10)</p>
        <Slider min={0} max={10} step={1} defaultValue={[7]} showValue />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Percentage (0-100, step 10)</p>
        <Slider min={0} max={100} step={10} defaultValue={[40]} showValue />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState([50]);

    return (
      <div className="space-y-4">
        <Slider value={value} onValueChange={setValue} />
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary-500/70 font-mono">Current value:</span>
          <span className="text-primary-500 font-medium font-mono">{value[0]}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setValue([0])}
            className="px-3 py-1 text-xs bg-black/80 border border-cyber rounded text-primary-500 font-mono hover:bg-primary-500/10 shadow-cyber-border"
          >
            Min
          </button>
          <button
            onClick={() => setValue([50])}
            className="px-3 py-1 text-xs bg-black/80 border border-cyber rounded text-primary-500 font-mono hover:bg-primary-500/10 shadow-cyber-border"
          >
            50%
          </button>
          <button
            onClick={() => setValue([100])}
            className="px-3 py-1 text-xs bg-black/80 border border-cyber rounded text-primary-500 font-mono hover:bg-primary-500/10 shadow-cyber-border"
          >
            Max
          </button>
        </div>
      </div>
    );
  },
};

export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = React.useState([75]);

    return (
      <div className="flex items-center gap-3 p-4 bg-black/80 rounded-lg border border-cyber shadow-cyber-border">
        <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
        <Slider
          value={volume}
          onValueChange={setVolume}
          className="flex-1"
          variant="primary"
        />
        <span className="text-sm text-primary-500 font-mono w-8 text-right">{volume[0]}%</span>
      </div>
    );
  },
};

