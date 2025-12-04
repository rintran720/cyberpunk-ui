import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: "number",
      description: "Current page (1-indexed)",
    },
    totalPages: {
      control: "number",
      description: "Total number of pages",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of pagination items",
    },
    siblingCount: {
      control: "number",
      description: "Number of pages to show on each side of current page",
    },
    showFirstLast: {
      control: "boolean",
      description: "Whether to show first/last page buttons",
    },
    showPrevNext: {
      control: "boolean",
      description: "Whether to show previous/next buttons",
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log("Page changed:", page),
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log("Page changed:", page),
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
    onPageChange: (page) => console.log("Page changed:", page),
  },
};

export const Small: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    size: "sm",
    onPageChange: (page) => console.log("Page changed:", page),
  },
};

export const Large: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    size: "lg",
    onPageChange: (page) => console.log("Page changed:", page),
  },
};

export const WithoutFirstLast: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    showFirstLast: false,
    onPageChange: (page) => console.log("Page changed:", page),
  },
};

export const WithoutPrevNext: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    showPrevNext: false,
    onPageChange: (page) => console.log("Page changed:", page),
  },
};

export const Minimal: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    showFirstLast: false,
    showPrevNext: false,
    onPageChange: (page) => console.log("Page changed:", page),
  },
};

