import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker } from "./TimePicker";

const meta = {
  title: "Components/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <TimePicker placeholder="Select time" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80">
      <TimePicker label="Start Time" placeholder="Select time" />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | undefined>(
      new Date(2024, 0, 1, 14, 30)
    );
    return (
      <div className="w-80">
        <TimePicker
          label="Meeting Time"
          value={value}
          onChange={setValue}
          placeholder="Select time"
        />
      </div>
    );
  },
};

export const Format12h: Story = {
  render: () => (
    <div className="w-80">
      <TimePicker label="Time (12h)" format="12h" placeholder="Select time" />
    </div>
  ),
};

export const Format24h: Story = {
  render: () => (
    <div className="w-80">
      <TimePicker label="Time (24h)" format="24h" placeholder="Select time" />
    </div>
  ),
};

export const CustomStep: Story = {
  render: () => (
    <div className="w-80">
      <TimePicker
        label="Time (15 min steps)"
        step={15}
        placeholder="Select time"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <TimePicker label="Time" disabled placeholder="Select time" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <TimePicker
        label="Time"
        error="Please select a valid time"
        placeholder="Select time"
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="w-80">
      <TimePicker
        label="Time"
        helperText="Select your preferred meeting time"
        placeholder="Select time"
      />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="w-80">
      <TimePicker
        label="Time"
        isRequired
        placeholder="Select time"
      />
    </div>
  ),
};

export const WithSeconds: Story = {
  render: () => (
    <div className="w-80">
      <TimePicker
        label="Time (with seconds)"
        showSeconds
        step={1}
        placeholder="Select time"
      />
    </div>
  ),
};

export const WithSeconds12h: Story = {
  render: () => (
    <div className="w-80">
      <TimePicker
        label="Time (12h with seconds)"
        format="12h"
        showSeconds
        step={1}
        placeholder="Select time"
      />
    </div>
  ),
};

