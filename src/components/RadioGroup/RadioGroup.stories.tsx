import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { RadioGroup, RadioGroupItem, RadioWithLabel } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" />
        <label className="text-sm text-surface-200">Option 1</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" />
        <label className="text-sm text-surface-200">Option 2</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" />
        <label className="text-sm text-surface-200">Option 3</label>
      </div>
    </RadioGroup>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <RadioWithLabel value="default" label="Default" />
      <RadioWithLabel value="comfortable" label="Comfortable" />
      <RadioWithLabel value="compact" label="Compact" />
    </RadioGroup>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="free" className="w-[300px]">
      <RadioWithLabel
        value="free"
        label="Free Plan"
        description="Basic features for personal use"
      />
      <RadioWithLabel
        value="pro"
        label="Pro Plan"
        description="Advanced features for professionals"
      />
      <RadioWithLabel
        value="enterprise"
        label="Enterprise"
        description="Custom solutions for large teams"
      />
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-surface-400 mb-2">Small</p>
        <RadioGroup defaultValue="a" orientation="horizontal">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="a" size="sm" />
            <label className="text-sm text-surface-200">A</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="b" size="sm" />
            <label className="text-sm text-surface-200">B</label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <p className="text-sm text-surface-400 mb-2">Medium (default)</p>
        <RadioGroup defaultValue="a" orientation="horizontal">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="a" size="md" />
            <label className="text-sm text-surface-200">A</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="b" size="md" />
            <label className="text-sm text-surface-200">B</label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <p className="text-sm text-surface-400 mb-2">Large</p>
        <RadioGroup defaultValue="a" orientation="horizontal">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="a" size="lg" />
            <label className="text-sm text-surface-200">A</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="b" size="lg" />
            <label className="text-sm text-surface-200">B</label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="left" orientation="horizontal">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="left" />
        <label className="text-sm text-surface-200">Left</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="center" />
        <label className="text-sm text-surface-200">Center</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="right" />
        <label className="text-sm text-surface-200">Right</label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" disabled>
      <RadioWithLabel value="option-1" label="Option 1 (selected)" />
      <RadioWithLabel value="option-2" label="Option 2" />
      <RadioWithLabel value="option-3" label="Option 3" />
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("apple");

    return (
      <div className="space-y-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <RadioWithLabel value="apple" label="Apple" />
          <RadioWithLabel value="banana" label="Banana" />
          <RadioWithLabel value="orange" label="Orange" />
        </RadioGroup>
        <p className="text-sm text-surface-400">
          Selected: <span className="text-surface-100">{value}</span>
        </p>
      </div>
    );
  },
};

export const CardStyle: Story = {
  render: () => {
    const [plan, setPlan] = React.useState("pro");

    return (
      <RadioGroup value={plan} onValueChange={setPlan} className="w-[350px]">
        {[
          { value: "free", label: "Free", price: "$0", features: ["1 project", "Basic analytics"] },
          { value: "pro", label: "Pro", price: "$19/mo", features: ["Unlimited projects", "Advanced analytics", "Priority support"] },
          { value: "enterprise", label: "Enterprise", price: "Custom", features: ["Everything in Pro", "Custom integrations", "Dedicated account manager"] },
        ].map((option) => (
          <div
            key={option.value}
            onClick={() => setPlan(option.value)}
            className={cn(
              "p-4 rounded-lg border cursor-pointer transition-all",
              plan === option.value
                ? "border-primary-500 bg-primary-500/10 shadow-[0_0_0_1px_rgba(var(--color-primary-500),0.5)]"
                : "border-surface-600 bg-surface-800 hover:border-surface-500"
            )}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value={option.value} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-surface-100">{option.label}</span>
                  <span className="text-sm text-primary-400">{option.price}</span>
                </div>
                <ul className="mt-2 space-y-1">
                  {option.features.map((feature, i) => (
                    <li key={i} className="text-xs text-surface-400 flex items-center gap-1">
                      <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
    );
  },
};

// Helper function for cn
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

