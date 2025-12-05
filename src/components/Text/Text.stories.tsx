import type { Meta, StoryObj } from "@storybook/react";
import { Text, Heading, Paragraph, Span, Code } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default text with cyberpunk style",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-[400px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <Text variant="default">Default Text</Text>
      <Text variant="primary">Primary Text</Text>
      <Text variant="secondary">Secondary Text</Text>
      <Text variant="accent">Accent Text</Text>
      <Text variant="muted">Muted Text</Text>
      <Text variant="danger">Danger Text</Text>
      <Text variant="success">Success Text</Text>
      <Text variant="warning">Warning Text</Text>
      <Text variant="info">Info Text</Text>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[500px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <Text size="xs">Extra Small Text (xs)</Text>
      <Text size="sm">Small Text (sm)</Text>
      <Text size="md">Medium Text (md) - Default</Text>
      <Text size="lg">Large Text (lg)</Text>
      <Text size="xl">Extra Large Text (xl)</Text>
      <Text size="2xl">2XL Text</Text>
      <Text size="3xl">3XL Text</Text>
      <Text size="4xl">4XL Text</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-4 w-[400px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <Text weight="normal">Normal Weight</Text>
      <Text weight="medium">Medium Weight</Text>
      <Text weight="semibold">Semibold Weight</Text>
      <Text weight="bold">Bold Weight</Text>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-4 w-[500px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <Text align="left">Left aligned text</Text>
      <Text align="center">Center aligned text</Text>
      <Text align="right">Right aligned text</Text>
      <Text align="justify">
        Justified text that spreads across the full width of the container. This
        creates even spacing between words.
      </Text>
    </div>
  ),
};

export const GlowEffects: Story = {
  render: () => (
    <div className="space-y-6 w-[500px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <Text variant="primary" glow="none">
        No Glow
      </Text>
      <Text variant="primary" glow="sm">
        Small Glow
      </Text>
      <Text variant="primary" glow="md">
        Medium Glow
      </Text>
      <Text variant="primary" glow="lg">
        Large Glow
      </Text>
      <Text variant="secondary" glow="lg">
        Secondary with Large Glow
      </Text>
      <Text variant="accent" glow="lg">
        Accent with Large Glow
      </Text>
    </div>
  ),
};

export const TextTransform: Story = {
  render: () => (
    <div className="space-y-4 w-[400px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <Text>Normal Text</Text>
      <Text uppercase>Uppercase Text</Text>
      <Text lowercase>LOWERCASE TEXT</Text>
      <Text capitalize>capitalized text</Text>
    </div>
  ),
};

export const Truncate: Story = {
  render: () => (
    <div className="space-y-4 w-[300px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <Text truncate>
        This is a very long text that will be truncated with ellipsis when it
        exceeds the container width
      </Text>
      <Text>
        This is a very long text that will NOT be truncated and will wrap to
        multiple lines
      </Text>
    </div>
  ),
};

export const LineClamp: Story = {
  render: () => (
    <div className="space-y-4 w-[300px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <Text lineClamp={1}>
        This is a very long text that will be clamped to 1 line with ellipsis
        when it exceeds the container width. It will show only the first line.
      </Text>
      <Text lineClamp={2}>
        This is a very long text that will be clamped to 2 lines with ellipsis
        when it exceeds the container width. It will show only the first two
        lines and then add ellipsis.
      </Text>
      <Text lineClamp={3}>
        This is a very long text that will be clamped to 3 lines with ellipsis
        when it exceeds the container width. It will show only the first three
        lines and then add ellipsis at the end.
      </Text>
    </div>
  ),
};

export const HTMLElements: Story = {
  render: () => (
    <div className="space-y-4 w-[500px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <Text as="p">Paragraph element (p)</Text>
      <Text as="span">Span element (span)</Text>
      <Text as="div">Div element (div)</Text>
      <Text as="strong" weight="bold">
        Strong element (strong)
      </Text>
      <Text as="em">Emphasized element (em)</Text>
      <Text as="small" size="sm">
        Small element (small)
      </Text>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-6 w-[600px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </div>
  ),
};

export const Paragraphs: Story = {
  render: () => (
    <div className="space-y-4 w-[500px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <Paragraph>
        This is a paragraph component. It automatically renders as a p element
        and uses the default text styles.
      </Paragraph>
      <Paragraph variant="muted" size="sm">
        This is a smaller muted paragraph for secondary information.
      </Paragraph>
      <Paragraph variant="accent" weight="medium">
        This is an accent paragraph with medium weight.
      </Paragraph>
    </div>
  ),
};

export const Spans: Story = {
  render: () => (
    <div className="space-y-4 w-[500px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <div>
        This is regular text with a{" "}
        <Span variant="primary">highlighted span</Span> in the middle.
      </div>
      <div>
        You can also use{" "}
        <Span variant="accent" glow="sm">
          glowing spans
        </Span>{" "}
        for emphasis.
      </div>
      <div>
        Mix different <Span variant="secondary">styles</Span> and{" "}
        <Span variant="danger">colors</Span> as needed.
      </div>
    </div>
  ),
};

export const CodeExample: Story = {
  render: () => (
    <div className="space-y-4 w-[500px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <Paragraph>
        Use the <Code>Code</Code> component for inline code snippets.
      </Paragraph>
      <Paragraph>
        You can also use it with{" "}
        <Code variant="accent">different variants</Code> and{" "}
        <Code variant="secondary">colors</Code>.
      </Paragraph>
      <div className="space-y-2">
        <Code>const example = "code";</Code>
        <Code variant="accent">function cyberpunk() {}</Code>
        <Code variant="secondary">let data = [];</Code>
      </div>
    </div>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <div className="space-y-6 w-[600px] p-6 rounded-xl bg-black/80 border border-cyber shadow-cyber-border">
      <Heading level={1} variant="primary" glow="md">
        Cyberpunk UI
      </Heading>
      <Paragraph variant="muted">
        A beautiful 3D-styled UI component library built with React and
        TailwindCSS.
      </Paragraph>
      <Heading level={2} variant="secondary">
        Features
      </Heading>
      <ul className="space-y-2 list-disc list-inside">
        <li>
          <Text variant="primary">3D Visual Effects</Text> - Realistic depth and
          shadow effects
        </li>
        <li>
          <Text variant="accent">Interactive Feedback</Text> - Press animations
          and hover states
        </li>
        <li>
          <Text variant="secondary">Multiple Variants</Text> - Primary,
          Secondary, Accent, Ghost, Danger, Glass
        </li>
      </ul>
      <div className="p-4 rounded-lg bg-black/50 border border-cyber/30">
        <Code variant="accent">npm install @votekio/cyberpunk-ui</Code>
      </div>
    </div>
  ),
};
