import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";
import { Button } from "../Button";
import { Badge } from "../Badge";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-surface-300">
          This is the card content area. You can put any content here.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[700px]">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>Standard card style</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>Deeper shadow effect</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="outline">
        <CardHeader>
          <CardTitle>Outline</CardTitle>
          <CardDescription>Border only style</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="ghost">
        <CardHeader>
          <CardTitle>Ghost</CardTitle>
          <CardDescription>Subtle background</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Glass</CardTitle>
          <CardDescription>Glassmorphism effect</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="gradient">
        <CardHeader>
          <CardTitle>Gradient</CardTitle>
          <CardDescription>Gradient background</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card interactive className="w-[200px]">
        <CardHeader>
          <CardTitle>Hover me</CardTitle>
          <CardDescription>Interactive card</CardDescription>
        </CardHeader>
      </Card>
      <Card interactive variant="elevated" className="w-[200px]">
        <CardHeader>
          <CardTitle>Click me</CardTitle>
          <CardDescription>Elevated interactive</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

export const Paddings: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card padding="none" className="w-[150px]">
        <div className="p-4 text-surface-300 text-sm">No padding</div>
      </Card>
      <Card padding="sm" className="w-[150px]">
        <span className="text-surface-300 text-sm">Small</span>
      </Card>
      <Card padding="md" className="w-[150px]">
        <span className="text-surface-300 text-sm">Medium</span>
      </Card>
      <Card padding="lg" className="w-[150px]">
        <span className="text-surface-300 text-sm">Large</span>
      </Card>
    </div>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card className="w-[300px]" padding="none">
      <div className="h-40 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-t-2xl" />
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <CardTitle>Premium Plan</CardTitle>
          <Badge variant="accent">Popular</Badge>
        </div>
        <CardDescription>Everything you need to grow</CardDescription>
        <CardContent>
          <div className="text-3xl font-bold text-surface-100">
            $29<span className="text-sm font-normal text-surface-400">/mo</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-surface-300">
            <li>✓ Unlimited projects</li>
            <li>✓ Priority support</li>
            <li>✓ Advanced analytics</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="primary" className="w-full">Get Started</Button>
        </CardFooter>
      </div>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card variant="gradient">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl">$45,231.89</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="success" size="sm">+20.1%</Badge>
          <span className="text-xs text-surface-400 ml-2">from last month</span>
        </CardContent>
      </Card>
      <Card variant="gradient">
        <CardHeader>
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-2xl">2,350</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="success" size="sm">+180</Badge>
          <span className="text-xs text-surface-400 ml-2">new this week</span>
        </CardContent>
      </Card>
      <Card variant="gradient">
        <CardHeader>
          <CardDescription>Conversion Rate</CardDescription>
          <CardTitle className="text-2xl">12.5%</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="warning" size="sm">-2.3%</Badge>
          <span className="text-xs text-surface-400 ml-2">from last week</span>
        </CardContent>
      </Card>
    </div>
  ),
};

export const GlassCard: Story = {
  render: () => (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600">
      <Card variant="glass" className="w-[350px]">
        <CardHeader>
          <CardTitle>Glass Effect</CardTitle>
          <CardDescription className="text-white/60">
            Beautiful glassmorphism design
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/80">
            This card uses backdrop blur and subtle borders to create a glass effect.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="glass" size="sm">Learn More</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

