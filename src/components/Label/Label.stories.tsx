import type { Meta, StoryObj } from "@storybook/react";
import { Label, SimpleLabel } from "./Label";
import { TextField, TextArea } from "../TextField";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Email Address",
    htmlFor: "email",
  },
};

export const Required: Story = {
  args: {
    children: "Username",
    htmlFor: "username",
    required: true,
  },
};

export const WithDescription: Story = {
  args: {
    children: "Password",
    htmlFor: "password",
    required: true,
    description: "Must be at least 8 characters long",
  },
};

export const WithError: Story = {
  args: {
    children: "Email",
    htmlFor: "email",
    required: true,
    error: "Please enter a valid email address",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <Label variant="default">Default Label</Label>
      <Label variant="muted">Muted Label</Label>
      <Label variant="accent">Accent Label</Label>
      <Label variant="error">Error Label</Label>
      <Label variant="success">Success Label</Label>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <Label size="sm">Small Label</Label>
      <Label size="md">Medium Label (default)</Label>
      <Label size="lg">Large Label</Label>
    </div>
  ),
};

export const SimpleLabelExample: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="flex items-center gap-2">
        <SimpleLabel htmlFor="terms" className="cursor-pointer">
          Accept terms and conditions
        </SimpleLabel>
      </div>
      <div className="flex items-center gap-2">
        <SimpleLabel htmlFor="newsletter" required className="cursor-pointer">
          Subscribe to newsletter
        </SimpleLabel>
      </div>
    </div>
  ),
};

export const WithFormField: Story = {
  render: () => (
    <div className="space-y-6 w-[350px]">
      <div className="space-y-2">
        <Label htmlFor="name" required>
          Full Name
        </Label>
        <TextField
          id="name"
          type="text"
          placeholder="John Doe"
          fullWidth
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" required description="We'll never share your email">
          Email Address
        </Label>
        <TextField
          id="email"
          type="email"
          placeholder="john@example.com"
          fullWidth
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">
          Bio
        </Label>
        <TextArea
          id="bio"
          placeholder="Tell us about yourself"
          rows={3}
          fullWidth
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" error="Password is too weak">
          Password
        </Label>
        <TextField
          id="password"
          type="password"
          fullWidth
        />
      </div>
    </div>
  ),
};

