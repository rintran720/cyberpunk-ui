import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import * as React from "react";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "Enable notifications",
  },
};

export const LabelLeft: Story = {
  args: {
    label: "Dark mode",
    labelPosition: "left",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch variant="default" label="Default" defaultChecked />
      <Switch variant="success" label="Success" defaultChecked />
      <Switch variant="warning" label="Warning" defaultChecked />
      <Switch variant="danger" label="Danger" defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" />
      <Switch size="lg" label="Large" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Unchecked" />
      <Switch label="Checked" defaultChecked />
      <Switch label="Disabled unchecked" disabled />
      <Switch label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="space-y-4">
        <Switch 
          label={checked ? "On" : "Off"}
          checked={checked}
          onCheckedChange={setChecked}
        />
        <p className="text-sm text-surface-400">
          Current state: {checked ? "Enabled" : "Disabled"}
        </p>
      </div>
    );
  },
};

export const SettingsExample: Story = {
  render: () => (
    <div className="w-[400px] p-6 rounded-xl bg-surface-800 border border-surface-700 space-y-6">
      <h3 className="text-lg font-semibold text-surface-100">Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-surface-100 font-medium">Email notifications</p>
            <p className="text-sm text-surface-400">Receive email updates</p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-surface-100 font-medium">Push notifications</p>
            <p className="text-sm text-surface-400">Receive push alerts</p>
          </div>
          <Switch variant="success" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-surface-100 font-medium">Marketing emails</p>
            <p className="text-sm text-surface-400">Receive promotional content</p>
          </div>
          <Switch />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-surface-100 font-medium">Auto-update</p>
            <p className="text-sm text-surface-400">Automatically install updates</p>
          </div>
          <Switch variant="warning" defaultChecked />
        </div>
      </div>
    </div>
  ),
};

