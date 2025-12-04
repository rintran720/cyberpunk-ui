import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "destructive", "glass"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Alert size",
    },
    showIcon: {
      control: "boolean",
      description: "Show default icon",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Default Alert</AlertTitle>
      <AlertDescription>
        This is a default alert with subtle styling and informative content.
      </AlertDescription>
    </Alert>
  ),
};

// Info variant
export const Info: Story = {
  render: () => (
    <Alert variant="info">
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is an informational alert. Use it to provide helpful context or tips.
      </AlertDescription>
    </Alert>
  ),
};

// Success variant
export const Success: Story = {
  render: () => (
    <Alert variant="success">
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        Your action was completed successfully. Everything is working as expected.
      </AlertDescription>
    </Alert>
  ),
};

// Warning variant
export const Warning: Story = {
  render: () => (
    <Alert variant="warning">
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Please review this information carefully before proceeding with your action.
      </AlertDescription>
    </Alert>
  ),
};

// Destructive/Error variant
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again or contact support if the issue persists.
      </AlertDescription>
    </Alert>
  ),
};

// Glass variant
export const Glass: Story = {
  render: () => (
    <Alert variant="glass">
      <AlertTitle>Glass Alert</AlertTitle>
      <AlertDescription>
        A beautiful glassmorphism style alert with backdrop blur effect.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="default">
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Default alert styling.</AlertDescription>
      </Alert>

      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Informational alert message.</AlertDescription>
      </Alert>

      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Success alert message.</AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Warning alert message.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Error alert message.</AlertDescription>
      </Alert>

      <Alert variant="glass">
        <AlertTitle>Glass</AlertTitle>
        <AlertDescription>Glass style alert message.</AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" size="sm">
        <AlertTitle size="sm">Small Alert</AlertTitle>
        <AlertDescription size="sm">
          This is a small sized alert with compact padding.
        </AlertDescription>
      </Alert>

      <Alert variant="info" size="md">
        <AlertTitle size="md">Medium Alert</AlertTitle>
        <AlertDescription size="md">
          This is the default medium sized alert.
        </AlertDescription>
      </Alert>

      <Alert variant="info" size="lg">
        <AlertTitle size="lg">Large Alert</AlertTitle>
        <AlertDescription size="lg">
          This is a large sized alert with more padding.
        </AlertDescription>
      </Alert>
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

// Without icon
export const WithoutIcon: Story = {
  render: () => (
    <Alert variant="info" showIcon={false}>
      <AlertTitle>No Icon Alert</AlertTitle>
      <AlertDescription>
        This alert has no icon, useful for simpler notifications.
      </AlertDescription>
    </Alert>
  ),
};

// Custom icon
const RocketIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

export const CustomIcon: Story = {
  render: () => (
    <Alert variant="success" icon={<RocketIcon />}>
      <AlertTitle>Launched!</AlertTitle>
      <AlertDescription>
        Your project has been successfully deployed to production.
      </AlertDescription>
    </Alert>
  ),
};

// Title only
export const TitleOnly: Story = {
  render: () => (
    <Alert variant="info">
      <AlertTitle>Quick notification without description</AlertTitle>
    </Alert>
  ),
};

// Long content
export const LongContent: Story = {
  render: () => (
    <Alert variant="warning">
      <AlertTitle>Important Notice</AlertTitle>
      <AlertDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AlertDescription>
    </Alert>
  ),
};

// With action
export const WithAction: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Session Expired</AlertTitle>
      <AlertDescription>
        <p className="mb-3">
          Your session has expired. Please log in again to continue.
        </p>
        <button className="px-3 py-1.5 text-sm font-medium bg-red-600 hover:bg-red-500 rounded-lg transition-colors">
          Log In Again
        </button>
      </AlertDescription>
    </Alert>
  ),
};

// Notification style
export const NotificationStyle: Story = {
  render: () => (
    <div className="space-y-3">
      <Alert variant="success" size="sm">
        <AlertTitle size="sm">✓ File uploaded successfully</AlertTitle>
      </Alert>

      <Alert variant="info" size="sm">
        <AlertTitle size="sm">↓ Downloading update...</AlertTitle>
      </Alert>

      <Alert variant="warning" size="sm">
        <AlertTitle size="sm">⚠ Low disk space warning</AlertTitle>
      </Alert>

      <Alert variant="destructive" size="sm">
        <AlertTitle size="sm">✕ Connection failed</AlertTitle>
      </Alert>
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => (
    <div className="p-8 rounded-2xl bg-surface-900/50 backdrop-blur-sm border border-surface-700 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">3D Alert Component</h2>
        <p className="text-surface-400">Beautiful alerts with depth and style</p>
      </div>

      <Alert variant="info">
        <AlertTitle>New Feature Available</AlertTitle>
        <AlertDescription>
          Check out the new dashboard analytics. Click here to explore.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <AlertTitle>Payment Successful</AlertTitle>
        <AlertDescription>
          Your payment of $99.00 has been processed. Receipt sent to your email.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTitle>Account Verification Required</AlertTitle>
        <AlertDescription>
          Please verify your email address to access all features.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle>Action Required</AlertTitle>
        <AlertDescription>
          Your subscription has expired. Renew now to continue using premium features.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

