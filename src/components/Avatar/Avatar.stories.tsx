import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarWithStatus } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://invalid-url.com/image.jpg" alt="User" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs">
        <AvatarFallback>XS</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
      <Avatar size="2xl">
        <AvatarFallback>2XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="default">
        <AvatarFallback>DF</AvatarFallback>
      </Avatar>
      <Avatar variant="primary">
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      <Avatar variant="secondary">
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar variant="accent">
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <AvatarWithStatus status="online">
        <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
        <AvatarFallback>ON</AvatarFallback>
      </AvatarWithStatus>
      <AvatarWithStatus status="offline">
        <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User" />
        <AvatarFallback>OF</AvatarFallback>
      </AvatarWithStatus>
      <AvatarWithStatus status="away">
        <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
        <AvatarFallback>AW</AvatarFallback>
      </AvatarWithStatus>
      <AvatarWithStatus status="busy">
        <AvatarImage src="https://i.pravatar.cc/150?img=4" alt="User" />
        <AvatarFallback>BS</AvatarFallback>
      </AvatarWithStatus>
    </div>
  ),
};

export const StatusSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <AvatarWithStatus status="online" size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </AvatarWithStatus>
      <AvatarWithStatus status="online" size="md">
        <AvatarFallback>MD</AvatarFallback>
      </AvatarWithStatus>
      <AvatarWithStatus status="online" size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </AvatarWithStatus>
      <AvatarWithStatus status="online" size="xl">
        <AvatarFallback>XL</AvatarFallback>
      </AvatarWithStatus>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User 1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User 2" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User 3" />
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=4" alt="User 4" />
        <AvatarFallback>U4</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

export const GroupWithMax: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User 1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User 2" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User 3" />
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=4" alt="User 4" />
        <AvatarFallback>U4</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="User 5" />
        <AvatarFallback>U5</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=6" alt="User 6" />
        <AvatarFallback>U6</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

export const UserCard: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-800 border border-surface-700">
      <AvatarWithStatus status="online" size="lg">
        <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="John Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </AvatarWithStatus>
      <div>
        <h3 className="text-sm font-semibold text-surface-100">John Doe</h3>
        <p className="text-xs text-surface-400">Software Engineer</p>
        <p className="text-xs text-green-400">Online</p>
      </div>
    </div>
  ),
};

