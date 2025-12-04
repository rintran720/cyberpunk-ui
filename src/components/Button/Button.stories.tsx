import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "accent", "ghost", "danger", "glass", "outline", "destructive"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "icon"],
      description: "Button size",
    },
    depth: {
      control: "select",
      options: ["flat", "shallow", "normal", "deep"],
      description: "3D depth level",
    },
    glow: {
      control: "select",
      options: ["none", "primary", "secondary", "accent"],
      description: "Glow effect on hover",
    },
    isLoading: {
      control: "boolean",
      description: "Shows loading spinner",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Accent: Story = {
  args: {
    children: "Accent Button",
    variant: "accent",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    variant: "danger",
  },
};

export const Glass: Story = {
  args: {
    children: "Glass Button",
    variant: "glass",
  },
  parameters: {
    backgrounds: { default: "gradient" },
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

// 3D Depths
export const Depths: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Button depth="flat">Flat</Button>
      <Button depth="shallow">Shallow</Button>
      <Button depth="normal">Normal</Button>
      <Button depth="deep">Deep</Button>
    </div>
  ),
};

// All Variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="glass">Glass</Button>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
};

// With Icons
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Button leftIcon={<DownloadIcon />}>Download</Button>
      <Button rightIcon={<ArrowRightIcon />}>Continue</Button>
      <Button leftIcon={<HeartIcon />} rightIcon={<ArrowRightIcon />} variant="secondary">
        Save & Continue
      </Button>
    </div>
  ),
};

// Icon only buttons
export const IconButtons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="icon" variant="primary"><PlusIcon /></Button>
      <Button size="icon" variant="secondary"><HeartIcon /></Button>
      <Button size="icon" variant="accent"><DownloadIcon /></Button>
      <Button size="icon" variant="ghost"><ArrowRightIcon /></Button>
    </div>
  ),
};

// Loading states
export const Loading: Story = {
  args: {
    children: "Loading...",
    isLoading: true,
  },
};

export const LoadingVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Button variant="primary" isLoading>Processing</Button>
      <Button variant="secondary" isLoading>Saving</Button>
      <Button variant="accent" isLoading>Uploading</Button>
    </div>
  ),
};

// Disabled states
export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const DisabledVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="accent" disabled>Accent</Button>
      <Button variant="ghost" disabled>Ghost</Button>
    </div>
  ),
};

// Glow effects
export const WithGlow: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Button variant="primary" glow="primary">Primary Glow</Button>
      <Button variant="secondary" glow="secondary">Secondary Glow</Button>
      <Button variant="accent" glow="accent">Accent Glow</Button>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// Full Width
export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 rounded-2xl bg-surface-900/50 backdrop-blur-sm border border-surface-700">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">3D Button Component</h2>
        <p className="text-surface-400">Click and interact with the buttons below</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <Button variant="primary" size="lg">Primary</Button>
        <Button variant="secondary" size="lg">Secondary</Button>
        <Button variant="accent" size="lg">Accent</Button>
      </div>
      
      <div className="flex justify-center gap-4">
        <Button variant="ghost" leftIcon={<HeartIcon />}>Like</Button>
        <Button variant="primary" rightIcon={<ArrowRightIcon />}>Get Started</Button>
        <Button variant="danger" leftIcon={<DownloadIcon />}>Delete</Button>
      </div>
      
      <div className="flex justify-center gap-4">
        <Button size="icon" variant="glass"><PlusIcon /></Button>
        <Button size="icon" variant="glass"><HeartIcon /></Button>
        <Button size="icon" variant="glass"><DownloadIcon /></Button>
        <Button size="icon" variant="glass"><ArrowRightIcon /></Button>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
};

