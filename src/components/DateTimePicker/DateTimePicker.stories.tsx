import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DateTimePicker } from "./DateTimePicker";

const meta = {
  title: "Components/DateTimePicker",
  component: DateTimePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <DateTimePicker placeholder="Select date and time" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80">
      <DateTimePicker label="Event Date & Time" placeholder="Select date and time" />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | undefined>(
      new Date(2024, 5, 15, 14, 30)
    );
    return (
      <div className="w-80">
        <DateTimePicker
          label="Event Date & Time"
          value={value}
          onChange={setValue}
          placeholder="Select date and time"
        />
      </div>
    );
  },
};

export const Format12h: Story = {
  render: () => (
    <div className="w-80">
      <DateTimePicker
        label="Date & Time (12h)"
        timeFormat="12h"
        placeholder="Select date and time"
      />
    </div>
  ),
};

export const Format24h: Story = {
  render: () => (
    <div className="w-80">
      <DateTimePicker
        label="Date & Time (24h)"
        timeFormat="24h"
        placeholder="Select date and time"
      />
    </div>
  ),
};

export const CustomTimeStep: Story = {
  render: () => (
    <div className="w-80">
      <DateTimePicker
        label="Date & Time (15 min steps)"
        timeStep={15}
        placeholder="Select date and time"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <DateTimePicker label="Date & Time" disabled placeholder="Select date and time" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <DateTimePicker
        label="Date & Time"
        error="Please select a valid date and time"
        placeholder="Select date and time"
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="w-80">
      <DateTimePicker
        label="Date & Time"
        helperText="Select when the event should start"
        placeholder="Select date and time"
      />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="w-80">
      <DateTimePicker
        label="Date & Time"
        isRequired
        placeholder="Select date and time"
      />
    </div>
  ),
};

export const WithMinMaxDate: Story = {
  render: () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    
    return (
      <div className="w-80">
        <DateTimePicker
          label="Date & Time"
          minDate={minDate}
          maxDate={maxDate}
          placeholder="Select date and time"
        />
      </div>
    );
  },
};

export const WithSeconds: Story = {
  render: () => (
    <div className="w-80">
      <DateTimePicker
        label="Date & Time (with seconds)"
        showSeconds
        timeStep={1}
        placeholder="Select date and time"
      />
    </div>
  ),
};

export const WithSeconds12h: Story = {
  render: () => (
    <div className="w-80">
      <DateTimePicker
        label="Date & Time (12h with seconds)"
        timeFormat="12h"
        showSeconds
        timeStep={1}
        placeholder="Select date and time"
      />
    </div>
  ),
};

