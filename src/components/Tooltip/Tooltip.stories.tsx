import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";
import { Button } from "../Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        This is a tooltip
      </TooltipContent>
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button variant="secondary">500ms delay</Button>
      </TooltipTrigger>
      <TooltipContent>
        This tooltip has a 500ms delay
      </TooltipContent>
    </Tooltip>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="primary">Rich tooltip</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs whitespace-normal">
        <div className="space-y-1">
          <p className="font-semibold">Pro Tip</p>
          <p className="text-surface-400 text-xs">
            You can use keyboard shortcuts to navigate faster. 
            Press <kbd className="px-1 py-0.5 bg-surface-700 rounded text-xs">⌘K</kbd> to open command palette.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-800 border border-surface-600 text-surface-300 hover:text-surface-100 cursor-pointer transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </TooltipTrigger>
        <TooltipContent>More information</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-800 border border-surface-600 text-surface-300 hover:text-surface-100 cursor-pointer transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
        </TooltipTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-800 border border-surface-600 text-surface-300 hover:text-surface-100 cursor-pointer transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom">Delete item</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithFormFields: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="flex items-center gap-2">
        <label className="text-sm text-surface-300">Username</label>
        <Tooltip>
          <TooltipTrigger>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-surface-800 border border-surface-600 text-surface-400 hover:text-surface-200 cursor-help">
              ?
            </span>
          </TooltipTrigger>
          <TooltipContent>
            Username must be 3-20 characters and contain only letters, numbers, and underscores.
          </TooltipContent>
        </Tooltip>
      </div>
      <input
        type="text"
        className="w-full px-3 py-2 rounded-lg bg-surface-800 border border-surface-700 text-surface-200"
        placeholder="Enter username"
      />
    </div>
  ),
};

export const WithTableActions: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 rounded-lg bg-surface-800 border border-surface-700 text-surface-300 hover:bg-surface-700 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent>Edit row</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 rounded-lg bg-surface-800 border border-surface-700 text-surface-300 hover:bg-surface-700 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent>Duplicate row</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 rounded-lg bg-surface-800 border border-surface-700 text-red-400 hover:bg-red-500/20 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent>Delete row</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="primary">Primary Action</Button>
        </TooltipTrigger>
        <TooltipContent className="bg-primary-500 text-white border-primary-400">
          This is a primary action
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="destructive">Dangerous Action</Button>
        </TooltipTrigger>
        <TooltipContent className="bg-red-500 text-white border-red-400">
          This action cannot be undone
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[400px]">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-4 rounded-lg bg-surface-800 border border-surface-700 cursor-help">
            <p className="text-sm font-medium text-surface-200">Revenue</p>
            <p className="text-2xl font-bold text-primary-400">$12,345</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Total revenue for this month
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-4 rounded-lg bg-surface-800 border border-surface-700 cursor-help">
            <p className="text-sm font-medium text-surface-200">Users</p>
            <p className="text-2xl font-bold text-accent-400">1,234</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Active users this month
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-4 rounded-lg bg-surface-800 border border-surface-700 cursor-help">
            <p className="text-sm font-medium text-surface-200">Orders</p>
            <p className="text-2xl font-bold text-green-400">567</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Orders processed today
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-4 rounded-lg bg-surface-800 border border-surface-700 cursor-help">
            <p className="text-sm font-medium text-surface-200">Growth</p>
            <p className="text-2xl font-bold text-yellow-400">+23%</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Growth rate compared to last month
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

