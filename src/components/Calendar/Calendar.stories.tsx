import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar } from "./Calendar";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showNavigation: {
      control: "boolean",
    },
    allowOutsideDays: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        {...args}
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          console.log("Date selected:", newDate);
        }}
      />
    );
  },
};

export const WithMinMax: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const today = new Date();
    const minDate = new Date(today);
    minDate.setMonth(today.getMonth() - 1);
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 1);

    return (
      <Calendar
        {...args}
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          console.log("Date selected:", newDate);
        }}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  },
};

export const WithDisabledDates: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const today = new Date();
    const disabledDates = [
      new Date(today.getFullYear(), today.getMonth(), 5),
      new Date(today.getFullYear(), today.getMonth(), 10),
      new Date(today.getFullYear(), today.getMonth(), 15),
    ];

    return (
      <Calendar
        {...args}
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          console.log("Date selected:", newDate);
        }}
        disabledDates={disabledDates}
      />
    );
  },
};

export const WithoutNavigation: Story = {
  args: {
    showNavigation: false,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        {...args}
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          console.log("Date selected:", newDate);
        }}
      />
    );
  },
};

export const AllowOutsideDays: Story = {
  args: {
    allowOutsideDays: true,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        {...args}
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          console.log("Date selected:", newDate);
        }}
      />
    );
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        {...args}
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          console.log("Date selected:", newDate);
        }}
      />
    );
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        {...args}
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          console.log("Date selected:", newDate);
        }}
      />
    );
  },
};

