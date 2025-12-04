import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Toggle, ToggleGroup, ToggleGroupItem } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Bold icon
const BoldIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
  </svg>
);

// Italic icon
const ItalicIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 4h4m0 0l-4 16m4-16h4m-8 16h4" />
  </svg>
);

// Underline icon
const UnderlineIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v7a6 6 0 0012 0V3M4 21h16" />
  </svg>
);

// Strikethrough icon
const StrikethroughIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 10H19a2 2 0 100-4h-5m-6 4H5a2 2 0 110-4h5M4 12h16M6 14h5a2 2 0 110 4h-5M14 14h5a2 2 0 010 4h-5" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <BoldIcon />
    </Toggle>
  ),
};

export const WithText: Story = {
  render: () => (
    <Toggle>
      <BoldIcon />
      Bold
    </Toggle>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Toggle variant="default">
        <BoldIcon />
        Default
      </Toggle>
      <Toggle variant="outline">
        <ItalicIcon />
        Outline
      </Toggle>
      <Toggle variant="ghost">
        <UnderlineIcon />
        Ghost
      </Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle size="sm">
        <BoldIcon />
        Small
      </Toggle>
      <Toggle size="md">
        <BoldIcon />
        Medium
      </Toggle>
      <Toggle size="lg">
        <BoldIcon />
        Large
      </Toggle>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [pressed, setPressed] = React.useState(false);
    
    return (
      <div className="space-y-4">
        <Toggle pressed={pressed} onPressedChange={setPressed}>
          <BoldIcon />
          {pressed ? "On" : "Off"}
        </Toggle>
        <p className="text-sm text-surface-400">
          State: <span className="text-primary-400">{pressed ? "pressed" : "not pressed"}</span>
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4">
      <Toggle disabled>
        <BoldIcon />
        Disabled
      </Toggle>
      <Toggle disabled defaultPressed>
        <BoldIcon />
        Disabled On
      </Toggle>
    </div>
  ),
};

export const SingleToggleGroup: Story = {
  render: () => {
    const [value, setValue] = React.useState("center");
    
    return (
      <div className="space-y-4">
        <ToggleGroup type="single" value={value} onValueChange={setValue}>
          <ToggleGroupItem value="left" aria-label="Align left">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h16" />
            </svg>
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M4 18h16" />
            </svg>
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M10 12h10M4 18h16" />
            </svg>
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-sm text-surface-400">
          Alignment: <span className="text-primary-400">{value || "none"}</span>
        </p>
      </div>
    );
  },
};

export const MultipleToggleGroup: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(["bold"]);
    
    return (
      <div className="space-y-4">
        <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <ItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <UnderlineIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
            <StrikethroughIcon />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-sm text-surface-400">
          Active: <span className="text-primary-400">{value.length > 0 ? value.join(", ") : "none"}</span>
        </p>
      </div>
    );
  },
};

export const ToggleGroupVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-surface-400 mb-2">Default</p>
        <ToggleGroup type="single" defaultValue="1" variant="default">
          <ToggleGroupItem value="1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="2">Option 2</ToggleGroupItem>
          <ToggleGroupItem value="3">Option 3</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Outline</p>
        <ToggleGroup type="single" defaultValue="1" variant="outline">
          <ToggleGroupItem value="1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="2">Option 2</ToggleGroupItem>
          <ToggleGroupItem value="3">Option 3</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Ghost</p>
        <ToggleGroup type="single" defaultValue="1" variant="ghost">
          <ToggleGroupItem value="1">Option 1</ToggleGroupItem>
          <ToggleGroupItem value="2">Option 2</ToggleGroupItem>
          <ToggleGroupItem value="3">Option 3</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const TextFormattingToolbar: Story = {
  render: () => {
    const [formatting, setFormatting] = React.useState<string[]>(["bold"]);
    const [alignment, setAlignment] = React.useState("left");
    
    return (
      <div className="p-4 rounded-lg bg-surface-800 border border-surface-700 shadow-3d space-y-3">
        <div className="flex gap-2">
          <ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <BoldIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <ItalicIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <UnderlineIcon />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <div className="w-px h-8 bg-surface-700" />
          
          <ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
            <ToggleGroupItem value="left" aria-label="Align left">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h16" />
              </svg>
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M4 18h16" />
              </svg>
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M10 12h10M4 18h16" />
              </svg>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="text-xs text-surface-500">
          Formatting: {formatting.join(", ") || "none"} | Alignment: {alignment}
        </div>
      </div>
    );
  },
};

