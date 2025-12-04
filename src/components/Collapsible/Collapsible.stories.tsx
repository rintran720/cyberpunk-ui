import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible";
import { Button } from "../Button";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-surface-800 border border-surface-700">
          <h4 className="text-sm font-semibold text-surface-200">
            @peduarte starred 3 repositories
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="px-4 py-2 rounded-lg bg-surface-800 border border-surface-700 text-sm text-surface-300">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="px-4 py-2 rounded-lg bg-surface-800 border border-surface-700 text-sm text-surface-300">
            @radix-ui/colors
          </div>
          <div className="px-4 py-2 rounded-lg bg-surface-800 border border-surface-700 text-sm text-surface-300">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-[350px] space-y-2">
      <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-surface-800 border border-surface-700 shadow-3d-sm">
        <h4 className="text-sm font-semibold text-surface-200">
          Show more details
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm">
            Toggle
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700 shadow-3d-sm">
          <p className="text-sm text-surface-300">
            This is the expanded content that is visible by default. You can
            toggle it using the button above.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Collapsible disabled className="w-[350px] space-y-2">
      <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-surface-800 border border-surface-700 opacity-50">
        <h4 className="text-sm font-semibold text-surface-200">
          Disabled Collapsible
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" disabled>
            Toggle
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <p className="text-sm text-surface-300">
            This content is hidden and cannot be expanded.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const WithIcon: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="w-[350px]"
      >
        <CollapsibleTrigger className="flex items-center gap-2 px-4 py-3 rounded-lg bg-surface-800 border border-surface-700 shadow-3d-sm hover:bg-surface-700 transition-colors">
          <svg
            className={`h-5 w-5 text-primary-400 transition-transform duration-200 ${
              open ? "rotate-90" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="font-medium text-surface-200">Advanced Settings</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 p-4 rounded-lg bg-surface-900 border border-surface-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-300">Enable caching</span>
              <input type="checkbox" className="accent-primary-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-300">Debug mode</span>
              <input type="checkbox" className="accent-primary-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-300">Auto-save</span>
              <input type="checkbox" defaultChecked className="accent-primary-500" />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const FAQ: Story = {
  render: () => {
    const faqs = [
      {
        question: "What is 3D UI?",
        answer:
          "3D UI is a component library that provides beautiful 3D-styled components built with React and TailwindCSS.",
      },
      {
        question: "Is it accessible?",
        answer:
          "Yes! All components are built with accessibility in mind, including proper ARIA attributes and keyboard navigation.",
      },
      {
        question: "Can I customize the theme?",
        answer:
          "Absolutely! You can customize colors, shadows, and other properties using CSS variables or the ThemeProvider.",
      },
    ];

    return (
      <div className="w-[400px] space-y-2">
        <h3 className="text-lg font-semibold text-surface-100 mb-4">
          Frequently Asked Questions
        </h3>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    );
  },
};

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-surface-800 border border-surface-700 shadow-3d-sm hover:bg-surface-700 transition-colors text-left">
        <span className="font-medium text-surface-200">{question}</span>
        <svg
          className={`h-5 w-5 text-surface-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 py-3 text-sm text-surface-400">{answer}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export const NestedCollapsible: Story = {
  render: () => {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    return (
      <div className="w-[400px] space-y-2">
        <Collapsible open={open1} onOpenChange={setOpen1}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-surface-800 border border-surface-700 shadow-3d-sm hover:bg-surface-700 transition-colors">
            <span className="font-medium text-surface-200">Parent Section</span>
            <svg
              className={`h-5 w-5 text-surface-400 transition-transform duration-200 ${
                open1 ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            <div className="px-4 py-2 rounded-lg bg-surface-900 border border-surface-700 text-sm text-surface-300">
              Parent content
            </div>
            <Collapsible open={open2} onOpenChange={setOpen2}>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-surface-800 border border-surface-700 shadow-3d-sm hover:bg-surface-700 transition-colors">
                <span className="text-sm font-medium text-surface-200">Child Section</span>
                <svg
                  className={`h-4 w-4 text-surface-400 transition-transform duration-200 ${
                    open2 ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="px-4 py-2 rounded-lg bg-surface-900 border border-surface-700 text-sm text-surface-400">
                  Nested content here
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const SettingsPanel: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="w-[350px] rounded-lg border border-surface-700 bg-surface-800 p-4 shadow-3d">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold text-surface-100">Advanced Settings</h3>
            <svg
              className={`h-5 w-5 text-surface-400 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-300">Enable Debug Mode</span>
              <input type="checkbox" className="accent-primary-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-300">Auto-save Interval</span>
              <select className="px-2 py-1 rounded bg-surface-900 border border-surface-700 text-sm text-surface-200">
                <option>5s</option>
                <option>10s</option>
                <option>30s</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-300">Cache Size</span>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                className="w-24"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const FileTree: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    return (
      <div className="w-[300px] rounded-lg border border-surface-700 bg-surface-800 p-4 shadow-3d">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
            <svg
              className={`h-4 w-4 text-surface-400 transition-transform duration-200 ${
                open ? "rotate-90" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-sm font-medium text-surface-200">src</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-6 mt-1 space-y-1">
            <div className="text-xs text-surface-400">components/</div>
            <div className="text-xs text-surface-400">utils/</div>
            <div className="text-xs text-surface-400">App.tsx</div>
            <div className="text-xs text-surface-400">index.tsx</div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

