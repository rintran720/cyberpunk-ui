import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./HoverCard";

const meta: Meta<typeof HoverCard> = {
  title: "Components/HoverCard",
  component: HoverCard,
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
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          href="#"
          className="text-primary-400 underline underline-offset-4 hover:text-primary-300"
        >
          @johndoe
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
            JD
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-surface-100">@johndoe</h4>
            <p className="text-sm text-surface-400">
              Full-stack developer. Building things for the web.
            </p>
            <div className="flex items-center pt-2 text-xs text-surface-500">
              <svg
                className="h-3 w-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Joined December 2021
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithStats: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="px-4 py-2 rounded-lg bg-surface-800 border border-surface-700 text-surface-200 hover:bg-surface-700 transition-colors shadow-3d-sm">
          View Profile
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xl font-bold">
              JS
            </div>
            <div>
              <h4 className="font-semibold text-surface-100">Jane Smith</h4>
              <p className="text-sm text-surface-400">@janesmith</p>
              <p className="text-xs text-primary-400 mt-1">Pro Member</p>
            </div>
          </div>
          <p className="text-sm text-surface-300">
            UI/UX Designer & Developer. Creating beautiful interfaces that users love.
          </p>
          <div className="flex gap-4 pt-2 border-t border-surface-700">
            <div className="text-center">
              <p className="text-lg font-semibold text-surface-100">2.4k</p>
              <p className="text-xs text-surface-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-surface-100">180</p>
              <p className="text-xs text-surface-500">Following</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-surface-100">42</p>
              <p className="text-xs text-surface-500">Projects</p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="flex gap-8">
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="px-3 py-1.5 rounded bg-surface-700 text-surface-300 text-sm">
            Start
          </button>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-48">
          <p className="text-sm">Aligned to start</p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="px-3 py-1.5 rounded bg-surface-700 text-surface-300 text-sm">
            Center
          </button>
        </HoverCardTrigger>
        <HoverCardContent align="center" className="w-48">
          <p className="text-sm">Aligned to center</p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="px-3 py-1.5 rounded bg-surface-700 text-surface-300 text-sm">
            End
          </button>
        </HoverCardTrigger>
        <HoverCardContent align="end" className="w-48">
          <p className="text-sm">Aligned to end</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const TopSide: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="px-4 py-2 rounded-lg bg-surface-800 border border-surface-700 text-surface-200 hover:bg-surface-700 transition-colors">
          Hover (Top)
        </button>
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <p className="text-sm text-surface-300">
          This hover card appears above the trigger element.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const ProductPreview: Story = {
  render: () => (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-surface-200 hover:text-primary-400 transition-colors"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          View Product
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="space-y-3">
          <div className="h-32 rounded-lg bg-gradient-to-br from-surface-700 to-surface-800 flex items-center justify-center text-surface-500">
            Product Image
          </div>
          <div>
            <h4 className="font-semibold text-surface-100">Premium Headphones</h4>
            <p className="text-sm text-surface-400 mt-1">
              High-quality wireless headphones with noise cancellation.
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-surface-700">
            <span className="text-lg font-bold text-primary-400">$299.99</span>
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              In Stock
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const LinkPreview: Story = {
  render: () => (
    <p className="text-surface-300 max-w-md">
      Check out{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <a
            href="#"
            className="text-primary-400 underline underline-offset-4 hover:text-primary-300"
          >
            this amazing article
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <div className="h-24 rounded bg-gradient-to-r from-primary-900/50 to-accent-900/50 flex items-center justify-center">
              <svg
                className="h-8 w-8 text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-surface-100">
              Building Modern UIs with 3D Effects
            </h4>
            <p className="text-xs text-surface-400">
              Learn how to create stunning 3D user interfaces using CSS and React...
            </p>
            <div className="flex items-center gap-2 text-xs text-surface-500">
              <span>5 min read</span>
              <span>•</span>
              <span>Dec 2, 2024</span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>{" "}
      about building modern user interfaces with 3D effects. It covers everything from basic concepts to advanced techniques.
    </p>
  ),
};

export const WithActions: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="px-4 py-2 rounded-lg bg-surface-800 border border-surface-700 text-surface-200 hover:bg-surface-700 transition-colors shadow-3d-sm">
          View Details
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-surface-100 mb-1">Project Alpha</h4>
            <p className="text-sm text-surface-400">
              A modern web application built with React and TypeScript.
            </p>
          </div>
          <div className="flex gap-2 pt-2 border-t border-surface-700">
            <button className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors">
              Open
            </button>
            <button className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-surface-700 text-surface-200 hover:bg-surface-600 transition-colors">
              Edit
            </button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const NotificationPreview: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="relative px-4 py-2 rounded-lg bg-surface-800 border border-surface-700 text-surface-200 hover:bg-surface-700 transition-colors">
          Notifications
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <h4 className="font-semibold text-surface-100">Recent Notifications</h4>
          <div className="space-y-2">
            <div className="p-2 rounded-lg bg-surface-900 border border-surface-700">
              <p className="text-sm font-medium text-surface-200">New message</p>
              <p className="text-xs text-surface-500">2 minutes ago</p>
            </div>
            <div className="p-2 rounded-lg bg-surface-900 border border-surface-700">
              <p className="text-sm font-medium text-surface-200">Task completed</p>
              <p className="text-xs text-surface-500">1 hour ago</p>
            </div>
            <div className="p-2 rounded-lg bg-surface-900 border border-surface-700">
              <p className="text-sm font-medium text-surface-200">System update</p>
              <p className="text-xs text-surface-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

