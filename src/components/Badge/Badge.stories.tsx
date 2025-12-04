import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="glass">Glass</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge dot>Default</Badge>
      <Badge dot dotColor="success">Online</Badge>
      <Badge dot dotColor="warning">Away</Badge>
      <Badge dot dotColor="error">Offline</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="destructive" dot>Failed</Badge>
      <Badge variant="outline" dot>Draft</Badge>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="w-[400px] space-y-4 p-6 rounded-xl bg-surface-800 border border-surface-700">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-surface-100">Notifications</h3>
        <Badge variant="primary">3 new</Badge>
      </div>
      <div className="flex items-center justify-between py-3 border-b border-surface-700">
        <span className="text-surface-200">Messages</span>
        <Badge variant="destructive" size="sm">5</Badge>
      </div>
      <div className="flex items-center justify-between py-3 border-b border-surface-700">
        <span className="text-surface-200">Updates</span>
        <Badge variant="accent" size="sm">12</Badge>
      </div>
      <div className="flex items-center justify-between py-3">
        <span className="text-surface-200">System</span>
        <Badge variant="outline" size="sm">OK</Badge>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="primary">
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Verified
      </Badge>
      <Badge variant="success">
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Active
      </Badge>
      <Badge variant="warning">
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Warning
      </Badge>
      <Badge variant="destructive">
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Error
      </Badge>
    </div>
  ),
};

export const InTable: Story = {
  render: () => (
    <div className="w-[500px] rounded-lg border border-surface-700 bg-surface-800 overflow-hidden">
      <table className="w-full">
        <thead className="bg-surface-900">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-surface-300">User</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-surface-300">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-surface-300">Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-700">
          <tr>
            <td className="px-4 py-3 text-surface-200">John Doe</td>
            <td className="px-4 py-3">
              <Badge variant="success" dot size="sm">Active</Badge>
            </td>
            <td className="px-4 py-3">
              <Badge variant="primary" size="sm">Admin</Badge>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-surface-200">Jane Smith</td>
            <td className="px-4 py-3">
              <Badge variant="warning" dot size="sm">Pending</Badge>
            </td>
            <td className="px-4 py-3">
              <Badge variant="secondary" size="sm">User</Badge>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-surface-200">Bob Johnson</td>
            <td className="px-4 py-3">
              <Badge variant="destructive" dot size="sm">Inactive</Badge>
            </td>
            <td className="px-4 py-3">
              <Badge variant="outline" size="sm">Guest</Badge>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

