import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
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
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-surface-200">3D UI Library</h4>
        <p className="text-sm text-surface-400">
          Beautiful 3D components for your next project.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div className="text-surface-300">Blog</div>
        <Separator orientation="vertical" />
        <div className="text-surface-300">Docs</div>
        <Separator orientation="vertical" />
        <div className="text-surface-300">Source</div>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div>
        <p className="text-sm text-surface-400 mb-2">Default</p>
        <Separator variant="default" />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Muted</p>
        <Separator variant="muted" />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Accent</p>
        <Separator variant="accent" />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Gradient</p>
        <Separator variant="gradient" />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Gradient Accent</p>
        <Separator variant="gradient-accent" />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">3D Effect</p>
        <Separator variant="3d" size="md" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div>
        <p className="text-sm text-surface-400 mb-2">Small (1px)</p>
        <Separator size="sm" />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Medium (2px)</p>
        <Separator size="md" />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Large (3px)</p>
        <Separator size="lg" />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-[100px] items-center space-x-4">
      <div className="text-surface-300">Section 1</div>
      <Separator orientation="vertical" variant="default" />
      <div className="text-surface-300">Section 2</div>
      <Separator orientation="vertical" variant="accent" />
      <div className="text-surface-300">Section 3</div>
      <Separator orientation="vertical" variant="3d" size="md" />
      <div className="text-surface-300">Section 4</div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-[350px] rounded-lg border border-surface-700 bg-surface-800 p-4 shadow-3d">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-surface-100">Settings</h3>
        <span className="text-xs text-surface-500">v1.0.0</span>
      </div>
      <Separator variant="3d" className="my-4" />
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-surface-300">Theme</span>
          <span className="text-sm text-primary-400">Dark</span>
        </div>
        <Separator variant="muted" />
        <div className="flex justify-between">
          <span className="text-sm text-surface-300">Language</span>
          <span className="text-sm text-primary-400">English</span>
        </div>
        <Separator variant="muted" />
        <div className="flex justify-between">
          <span className="text-sm text-surface-300">Notifications</span>
          <span className="text-sm text-primary-400">On</span>
        </div>
      </div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border border-surface-700 bg-surface-800 p-4 shadow-3d">
      <div className="space-y-2">
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-surface-300">Profile</span>
          <span className="text-sm text-primary-400">Edit</span>
        </div>
        <Separator variant="muted" />
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-surface-300">Security</span>
          <span className="text-sm text-primary-400">Change</span>
        </div>
        <Separator variant="muted" />
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-surface-300">Notifications</span>
          <span className="text-sm text-primary-400">Manage</span>
        </div>
        <Separator variant="muted" />
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-surface-300">Privacy</span>
          <span className="text-sm text-primary-400">Settings</span>
        </div>
      </div>
    </div>
  ),
};

export const InForm: Story = {
  render: () => (
    <div className="w-[400px] rounded-lg border border-surface-700 bg-surface-800 p-6 shadow-3d space-y-4">
      <h3 className="text-lg font-semibold text-surface-100">Create Account</h3>
      <Separator variant="3d" />
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-surface-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded-lg bg-surface-900 border border-surface-700 text-surface-200"
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-surface-300 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded-lg bg-surface-900 border border-surface-700 text-surface-200"
            placeholder="••••••••"
          />
        </div>
      </div>
      <Separator variant="3d" />
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors">
          Sign Up
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg bg-surface-700 text-surface-200 hover:bg-surface-600 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-sm text-surface-400 whitespace-nowrap">Section 1</span>
        <Separator className="flex-1" />
        <span className="text-sm text-surface-400 whitespace-nowrap">Section 2</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-surface-200">Left Content</span>
        <Separator variant="accent" className="flex-1" />
        <span className="text-sm font-medium text-surface-200">Right Content</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-surface-500">Start</span>
        <Separator variant="gradient" className="flex-1" />
        <span className="text-xs text-surface-500">End</span>
      </div>
    </div>
  ),
};

