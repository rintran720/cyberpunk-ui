import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TimezonePicker, type TimezoneItem } from "./TimezonePicker";

const meta = {
  title: "Components/TimezonePicker",
  component: TimezonePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TimezonePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <TimezonePicker placeholder="Select timezone" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80">
      <TimezonePicker label="Timezone" placeholder="Select timezone" />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>("America/New_York");
    return (
      <div className="w-80">
        <TimezonePicker
          label="Timezone"
          value={value}
          onChange={setValue}
          placeholder="Select timezone"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <TimezonePicker label="Timezone" disabled placeholder="Select timezone" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <TimezonePicker
        label="Timezone"
        error="Please select a timezone"
        placeholder="Select timezone"
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="w-80">
      <TimezonePicker
        label="Timezone"
        helperText="Select your local timezone"
        placeholder="Select timezone"
      />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="w-80">
      <TimezonePicker
        label="Timezone"
        isRequired
        placeholder="Select timezone"
      />
    </div>
  ),
};

export const WithCustomPriorityTimezones: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>("Asia/Ho_Chi_Minh");

    const customPriorityTimezones: TimezoneItem[] = [
      { value: "Asia/Ho_Chi_Minh", label: "Ho Chi Minh (ICT)", offset: 7 },
      { value: "Asia/Singapore", label: "Singapore (SGT)", offset: 8 },
    ];

    return (
      <div className="w-80">
        <TimezonePicker
          label="Timezone (Southeast Asia Priority)"
          value={value}
          onChange={setValue}
          placeholder="Select timezone"
          priorityTimezones={customPriorityTimezones}
          helperText="Southeast Asian timezones are shown first"
        />
      </div>
    );
  },
};
