import type { Meta, StoryObj } from "@storybook/react";
import { Progress, CircularProgress } from "./Progress";
import * as React from "react";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <Progress value={60} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[400px]">
      <Progress value={75} showLabel />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div>
        <span className="text-xs text-surface-400 mb-2 block">Small</span>
        <Progress value={40} size="sm" />
      </div>
      <div>
        <span className="text-xs text-surface-400 mb-2 block">Medium</span>
        <Progress value={60} size="md" />
      </div>
      <div>
        <span className="text-xs text-surface-400 mb-2 block">Large</span>
        <Progress value={80} size="lg" />
      </div>
      <div>
        <span className="text-xs text-surface-400 mb-2 block">Extra Large</span>
        <Progress value={90} size="xl" />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <Progress value={70} color="primary" />
      <Progress value={70} color="secondary" />
      <Progress value={70} color="accent" />
      <Progress value={70} color="success" />
      <Progress value={70} color="warning" />
      <Progress value={70} color="destructive" />
    </div>
  ),
};

export const Animated: Story = {
  render: () => (
    <div className="w-[400px]">
      <Progress value={50} animated showLabel />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div className="w-[400px]">
      <Progress indeterminate />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 5;
        });
      }, 500);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="w-[400px]">
        <Progress value={progress} showLabel color="accent" />
      </div>
    );
  },
};

export const Circular: Story = {
  render: () => (
    <div className="flex gap-8">
      <CircularProgress value={25} showLabel />
      <CircularProgress value={50} showLabel color="accent" />
      <CircularProgress value={75} showLabel color="success" />
      <CircularProgress value={100} showLabel color="warning" />
    </div>
  ),
};

export const CircularSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <CircularProgress value={60} size="sm" />
      <CircularProgress value={60} size="md" showLabel />
      <CircularProgress value={60} size="lg" showLabel />
      <CircularProgress value={60} size="xl" showLabel />
    </div>
  ),
};

export const CircularIndeterminate: Story = {
  render: () => (
    <div className="flex gap-8">
      <CircularProgress indeterminate size="sm" />
      <CircularProgress indeterminate size="md" color="accent" />
      <CircularProgress indeterminate size="lg" color="success" />
    </div>
  ),
};

export const DownloadProgress: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 300);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="w-[400px] p-6 rounded-xl bg-surface-800 border border-surface-700">
        <div className="flex items-center gap-4 mb-4">
          <CircularProgress value={progress} showLabel size="lg" color="primary" />
          <div>
            <h3 className="text-sm font-semibold text-surface-100">Downloading...</h3>
            <p className="text-xs text-surface-400">project-files.zip</p>
          </div>
        </div>
        <Progress value={progress} size="sm" color="primary" />
        <p className="text-xs text-surface-400 mt-2">
          {progress < 100 ? `${Math.round(progress)}% complete` : "Download complete!"}
        </p>
      </div>
    );
  },
};

