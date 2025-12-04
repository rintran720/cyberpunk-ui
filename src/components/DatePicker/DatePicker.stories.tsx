import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    inputSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    inputVariant: {
      control: "select",
      options: ["default", "filled", "outline", "glass"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="w-64">
        <DatePicker
          {...args}
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            console.log("Date changed:", newDate);
          }}
        />
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div className="w-64">
        <DatePicker
          {...args}
          label="Select Date"
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            console.log("Date changed:", newDate);
          }}
        />
      </div>
    );
  },
};

export const Required: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div className="w-64">
        <DatePicker
          {...args}
          label="Birth Date"
          isRequired
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            console.log("Date changed:", newDate);
          }}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div className="w-64">
        <DatePicker
          {...args}
          label="Select Date"
          error="Please select a valid date"
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            console.log("Date changed:", newDate);
          }}
        />
      </div>
    );
  },
};

export const WithHelperText: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div className="w-64">
        <DatePicker
          {...args}
          label="Event Date"
          helperText="Select the date for your event"
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            console.log("Date changed:", newDate);
          }}
        />
      </div>
    );
  },
};

export const WithMinMax: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>();
    const today = new Date();
    const minDate = new Date(today);
    minDate.setMonth(today.getMonth() - 1);
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 1);

    return (
      <div className="w-64">
        <DatePicker
          {...args}
          label="Select Date"
          minDate={minDate}
          maxDate={maxDate}
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            console.log("Date changed:", newDate);
          }}
        />
      </div>
    );
  },
};

export const FilledVariant: Story = {
  args: {
    inputVariant: "filled",
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div className="w-64">
        <DatePicker
          {...args}
          label="Select Date"
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            console.log("Date changed:", newDate);
          }}
        />
      </div>
    );
  },
};

export const OutlineVariant: Story = {
  args: {
    inputVariant: "outline",
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div className="w-64">
        <DatePicker
          {...args}
          label="Select Date"
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            console.log("Date changed:", newDate);
          }}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="w-64">
        <DatePicker
          {...args}
          label="Select Date"
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            console.log("Date changed:", newDate);
          }}
        />
      </div>
    );
  },
};

