import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "elevated", "glass"],
      description: "Visual style variant",
    },
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Allow single or multiple items expanded",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample FAQ data
const faqItems = [
  {
    value: "item-1",
    question: "What is 3D UI?",
    answer:
      "3D UI is a design approach that adds depth and dimension to user interface elements through shadows, gradients, and visual effects that simulate physical depth.",
  },
  {
    value: "item-2",
    question: "How does it work?",
    answer:
      "It uses CSS box-shadows to create the illusion of raised or pressed surfaces, combined with gradients that simulate lighting from above. Press animations make buttons feel tactile.",
  },
  {
    value: "item-3",
    question: "Is it accessible?",
    answer:
      "Yes! All components follow WAI-ARIA guidelines with proper keyboard navigation, focus states, and screen reader support. Visual effects enhance but don't replace accessibility.",
  },
  {
    value: "item-4",
    question: "Can I customize the colors?",
    answer:
      "Absolutely. The library uses Tailwind CSS with custom theme extensions. You can override colors, shadows, and other design tokens in your tailwind.config.js file.",
  },
];

// Default variant
export const Default: Story = {
  render: () => (
    <Accordion variant="default" type="single" defaultValue={["item-1"]}>
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

// Bordered variant
export const Bordered: Story = {
  render: () => (
    <Accordion variant="bordered" type="single">
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

// Elevated variant
export const Elevated: Story = {
  render: () => (
    <Accordion variant="elevated" type="single" defaultValue={["item-2"]}>
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

// Glass variant
export const Glass: Story = {
  render: () => (
    <Accordion variant="glass" type="single" defaultValue={["item-1"]}>
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
};

// Multiple items can be expanded
export const MultipleExpanded: Story = {
  render: () => (
    <Accordion
      variant="default"
      type="multiple"
      defaultValue={["item-1", "item-3"]}
    >
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

// All variants comparison
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-surface-400 mb-3">Default</h3>
        <Accordion variant="default" type="single" defaultValue={["v1-item-1"]}>
          <AccordionItem value="v1-item-1">
            <AccordionTrigger>Default accordion item</AccordionTrigger>
            <AccordionContent>
              This is the default variant with subtle 3D shadow effects.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="v1-item-2">
            <AccordionTrigger>Another item</AccordionTrigger>
            <AccordionContent>
              Click to expand and collapse smoothly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-sm font-medium text-surface-400 mb-3">Bordered</h3>
        <Accordion
          variant="bordered"
          type="single"
          defaultValue={["v2-item-1"]}
        >
          <AccordionItem value="v2-item-1">
            <AccordionTrigger>Bordered accordion item</AccordionTrigger>
            <AccordionContent>
              This variant uses borders instead of separate cards.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="v2-item-2">
            <AccordionTrigger>Another item</AccordionTrigger>
            <AccordionContent>
              Items are connected in a unified container.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-sm font-medium text-surface-400 mb-3">Elevated</h3>
        <Accordion
          variant="elevated"
          type="single"
          defaultValue={["v3-item-1"]}
        >
          <AccordionItem value="v3-item-1">
            <AccordionTrigger>Elevated accordion item</AccordionTrigger>
            <AccordionContent>
              Deep 3D shadow for a more prominent appearance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="v3-item-2">
            <AccordionTrigger>Another item</AccordionTrigger>
            <AccordionContent>
              Perfect for important content sections.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-sm font-medium text-surface-400 mb-3">Glass</h3>
        <Accordion variant="glass" type="single" defaultValue={["v4-item-1"]}>
          <AccordionItem value="v4-item-1">
            <AccordionTrigger>Glass accordion item</AccordionTrigger>
            <AccordionContent>
              Glassmorphism style with blur effect.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="v4-item-2">
            <AccordionTrigger>Another item</AccordionTrigger>
            <AccordionContent>
              Works great on gradient backgrounds.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

// With disabled items
export const WithDisabledItem: Story = {
  render: () => (
    <Accordion variant="default" type="single" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Enabled item</AccordionTrigger>
        <AccordionContent>This item can be toggled normally.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled item</AccordionTrigger>
        <AccordionContent>This content is not accessible.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another enabled item</AccordionTrigger>
        <AccordionContent>You can interact with this one too.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Custom icons
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CustomIcon: Story = {
  render: () => (
    <Accordion variant="elevated" type="single">
      {faqItems.slice(0, 3).map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger icon={<PlusIcon />}>
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

// Rich content
export const RichContent: Story = {
  render: () => (
    <Accordion variant="elevated" type="single" defaultValue={["features"]}>
      <AccordionItem value="features">
        <AccordionTrigger>✨ Features</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2 list-disc list-inside">
            <li>3D visual effects with CSS</li>
            <li>Smooth animations</li>
            <li>Multiple variants</li>
            <li>Fully accessible</li>
            <li>TypeScript support</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="installation">
        <AccordionTrigger>📦 Installation</AccordionTrigger>
        <AccordionContent>
          <pre className="bg-surface-900 rounded-lg p-3 text-sm overflow-x-auto">
            <code className="text-accent-400">
              npm install @votekio/cyberpunk-ui
            </code>
          </pre>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="usage">
        <AccordionTrigger>🚀 Usage</AccordionTrigger>
        <AccordionContent>
          <pre className="bg-surface-900 rounded-lg p-3 text-sm overflow-x-auto">
            <code className="text-primary-300">
              {`import { Accordion } from '@votekio/cyberpunk-ui';

<Accordion>
  <AccordionItem value="1">
    <AccordionTrigger>Title</AccordionTrigger>
    <AccordionContent>Content</AccordionContent>
  </AccordionItem>
</Accordion>`}
            </code>
          </pre>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Interactive demo
export const InteractiveDemo: Story = {
  render: () => (
    <div className="p-8 rounded-2xl bg-surface-900/50 backdrop-blur-sm border border-surface-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">3D Accordion</h2>
        <p className="text-surface-400">
          Expand items to see smooth animations
        </p>
      </div>

      <Accordion variant="elevated" type="single" defaultValue={["demo-1"]}>
        <AccordionItem value="demo-1">
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400">
                🎨
              </span>
              <span>Beautiful Design</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="pl-11">
              Every component is crafted with attention to detail. The 3D
              effects create depth and make the interface feel tangible and
              interactive.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="demo-2">
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-secondary-500/20 flex items-center justify-center text-secondary-400">
                ⚡
              </span>
              <span>Smooth Animations</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="pl-11">
              All transitions are carefully tuned for the perfect feel. Expand
              and collapse animations are butter smooth at 60fps.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="demo-3">
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center text-accent-400">
                ♿
              </span>
              <span>Fully Accessible</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="pl-11">
              Built with accessibility in mind. Full keyboard navigation, proper
              ARIA attributes, and screen reader friendly.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
};
