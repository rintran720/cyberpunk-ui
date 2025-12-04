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
        <h4 className="text-sm font-medium text-primary-500 font-mono">Cyberpunk UI Library</h4>
        <p className="text-sm text-primary-500/70 font-mono">
          Beautiful cyberpunk components for your next project.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div className="text-primary-500 font-mono">Blog</div>
        <Separator orientation="vertical" />
        <div className="text-primary-500 font-mono">Docs</div>
        <Separator orientation="vertical" />
        <div className="text-primary-500 font-mono">Source</div>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div>
        <p className="text-sm text-primary-500/70 font-mono mb-2">Default</p>
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
      <div className="text-primary-500 font-mono">Section 1</div>
      <Separator orientation="vertical" variant="default" />
      <div className="text-primary-500 font-mono">Section 2</div>
      <Separator orientation="vertical" variant="accent" />
      <div className="text-primary-500 font-mono">Section 3</div>
      <Separator orientation="vertical" variant="3d" size="md" />
      <div className="text-primary-500 font-mono">Section 4</div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-[350px] rounded-lg border border-cyber bg-black/80 p-4 shadow-cyber-border">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary-500 font-mono">Settings</h3>
        <span className="text-xs text-primary-500/70 font-mono">v1.0.0</span>
      </div>
      <Separator variant="3d" className="my-4" />
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-primary-500 font-mono">Theme</span>
          <span className="text-sm text-primary-500 font-mono">Dark</span>
        </div>
        <Separator variant="muted" />
        <div className="flex justify-between">
          <span className="text-sm text-primary-500 font-mono">Language</span>
          <span className="text-sm text-primary-500 font-mono">English</span>
        </div>
        <Separator variant="muted" />
        <div className="flex justify-between">
          <span className="text-sm text-primary-500 font-mono">Notifications</span>
          <span className="text-sm text-primary-500 font-mono">On</span>
        </div>
      </div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border border-cyber bg-black/80 p-4 shadow-cyber-border">
      <div className="space-y-2">
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-primary-500 font-mono">Profile</span>
          <span className="text-sm text-primary-500 font-mono">Edit</span>
        </div>
        <Separator variant="muted" />
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-primary-500 font-mono">Security</span>
          <span className="text-sm text-primary-500 font-mono">Change</span>
        </div>
        <Separator variant="muted" />
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-primary-500 font-mono">Notifications</span>
          <span className="text-sm text-primary-500 font-mono">Manage</span>
        </div>
        <Separator variant="muted" />
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-primary-500 font-mono">Privacy</span>
          <span className="text-sm text-primary-500 font-mono">Settings</span>
        </div>
      </div>
    </div>
  ),
};

export const InForm: Story = {
  render: () => (
    <div className="w-[400px] rounded-lg border border-cyber bg-black/80 p-6 shadow-cyber-border space-y-4">
      <h3 className="text-lg font-semibold text-primary-500 font-mono">Create Account</h3>
      <Separator variant="3d" />
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-primary-500 font-mono mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded-lg bg-black/80 border border-cyber text-primary-500 font-mono placeholder:text-primary-500/40"
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-primary-500 font-mono mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded-lg bg-black/80 border border-cyber text-primary-500 font-mono placeholder:text-primary-500/40"
            placeholder="••••••••"
          />
        </div>
      </div>
      <Separator variant="3d" />
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 rounded-lg bg-primary-500 text-black hover:bg-primary-400 transition-colors font-mono shadow-cyber-primary">
          Sign Up
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg bg-black/80 border border-cyber text-primary-500 hover:bg-primary-500/10 transition-colors font-mono shadow-cyber-border">
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
        <span className="text-sm text-primary-500/70 font-mono whitespace-nowrap">Section 1</span>
        <Separator className="flex-1" />
        <span className="text-sm text-primary-500/70 font-mono whitespace-nowrap">Section 2</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-primary-500 font-mono">Left Content</span>
        <Separator variant="accent" className="flex-1" />
        <span className="text-sm font-medium text-primary-500 font-mono">Right Content</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-primary-500/70 font-mono">Start</span>
        <Separator variant="gradient" className="flex-1" />
        <span className="text-xs text-primary-500/70 font-mono">End</span>
      </div>
    </div>
  ),
};

