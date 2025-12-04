import type { Meta, StoryObj } from "@storybook/react";
import {
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SkeletonCard,
  SkeletonAvatarText,
  SkeletonTable,
} from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
};

export const Text: Story = {
  render: () => (
    <div className="w-[400px]">
      <SkeletonText lines={4} />
    </div>
  ),
};

export const Circle: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SkeletonCircle size="xs" />
      <SkeletonCircle size="sm" />
      <SkeletonCircle size="md" />
      <SkeletonCircle size="lg" />
      <SkeletonCircle size="xl" />
      <SkeletonCircle size="2xl" />
    </div>
  ),
};

export const AvatarWithText: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <SkeletonAvatarText avatarSize="sm" />
      <SkeletonAvatarText avatarSize="md" />
      <SkeletonAvatarText avatarSize="lg" lines={3} />
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div className="w-[350px]">
      <SkeletonCard />
    </div>
  ),
};

export const CardWithFooter: Story = {
  render: () => (
    <div className="w-[350px]">
      <SkeletonCard showFooter />
    </div>
  ),
};

export const CardNoHeader: Story = {
  render: () => (
    <div className="w-[350px]">
      <SkeletonCard showHeader={false} contentLines={5} />
    </div>
  ),
};

export const Table: Story = {
  render: () => (
    <div className="w-[600px]">
      <SkeletonTable rows={5} columns={4} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>
        <span className="text-xs text-surface-400 mb-2 block">Default</span>
        <Skeleton className="h-4 w-full" variant="default" />
      </div>
      <div>
        <span className="text-xs text-surface-400 mb-2 block">Lighter</span>
        <Skeleton className="h-4 w-full" variant="lighter" />
      </div>
      <div>
        <span className="text-xs text-surface-400 mb-2 block">Darker</span>
        <Skeleton className="h-4 w-full" variant="darker" />
      </div>
    </div>
  ),
};

export const LoadingPage: Story = {
  render: () => (
    <div className="w-[600px] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex gap-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        <SkeletonCard contentLines={2} />
        <SkeletonCard contentLines={2} />
      </div>

      {/* User List */}
      <div className="p-4 rounded-xl border border-surface-700 bg-surface-800">
        <Skeleton className="h-5 w-24 mb-4" />
        <div className="space-y-4">
          <SkeletonAvatarText />
          <SkeletonAvatarText />
          <SkeletonAvatarText />
        </div>
      </div>
    </div>
  ),
};

export const CommentList: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex gap-3">
          <SkeletonCircle size="md" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <SkeletonText lines={2} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <div className="w-[280px] rounded-xl border border-surface-700 bg-surface-800 overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  ),
};

