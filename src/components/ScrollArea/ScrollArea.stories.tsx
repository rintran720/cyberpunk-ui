import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./ScrollArea";
import { Separator } from "../Separator";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-lg border border-surface-700 bg-surface-800 shadow-3d">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium text-surface-200">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm text-surface-400 py-2">{tag}</div>
            <Separator variant="muted" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea
      orientation="horizontal"
      className="w-96 rounded-lg border border-surface-700 bg-surface-800 shadow-3d"
    >
      <div className="flex p-4 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-32 h-32 rounded-lg bg-surface-700 flex items-center justify-center text-surface-400"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Both: Story = {
  render: () => (
    <ScrollArea
      orientation="both"
      className="h-72 w-72 rounded-lg border border-surface-700 bg-surface-800 shadow-3d"
    >
      <div className="p-4" style={{ width: "500px" }}>
        <h4 className="mb-4 text-sm font-medium text-surface-200">
          Scrollable in both directions
        </h4>
        {Array.from({ length: 30 }).map((_, i) => (
          <p
            key={i}
            className="text-sm text-surface-400 whitespace-nowrap py-1"
          >
            This is a very long line of text that will cause horizontal
            scrolling. Line {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const WithContent: Story = {
  render: () => (
    <ScrollArea className="h-[400px] w-[350px] rounded-lg border border-surface-700 bg-surface-800 shadow-3d p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-surface-100 sticky top-0 bg-surface-800 py-2">
          Recent Activity
        </h3>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-surface-900 border border-surface-700"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                U{i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-surface-200">
                  User {i + 1} performed an action
                </p>
                <p className="text-xs text-surface-500 mt-1">
                  {i + 1} hour{i !== 0 ? "s" : ""} ago
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const ChatMessages: Story = {
  render: () => {
    const messages = [
      { id: 1, sender: "John", text: "Hey, how are you?", isMe: false },
      {
        id: 2,
        sender: "Me",
        text: "I'm good! Working on the new UI.",
        isMe: true,
      },
      { id: 3, sender: "John", text: "Nice! How's it going?", isMe: false },
      {
        id: 4,
        sender: "Me",
        text: "Pretty well. Just added scrollable areas.",
        isMe: true,
      },
      { id: 5, sender: "John", text: "That sounds cool!", isMe: false },
      {
        id: 6,
        sender: "Me",
        text: "Yeah, the 3D effects look great.",
        isMe: true,
      },
      { id: 7, sender: "John", text: "Can't wait to see it.", isMe: false },
      {
        id: 8,
        sender: "Me",
        text: "I'll send you a preview soon.",
        isMe: true,
      },
      { id: 9, sender: "John", text: "Awesome! 🎉", isMe: false },
      { id: 10, sender: "Me", text: "Thanks for the support!", isMe: true },
      {
        id: 11,
        sender: "John",
        text: "Always! Keep up the great work.",
        isMe: false,
      },
      { id: 12, sender: "Me", text: "Will do! Talk soon.", isMe: true },
    ];

    return (
      <div className="w-[350px] rounded-lg border border-surface-700 bg-surface-800 shadow-3d overflow-hidden">
        <div className="p-4 border-b border-surface-700">
          <h3 className="font-semibold text-surface-100">Chat with John</h3>
        </div>
        <ScrollArea className="h-[300px] p-4">
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                    msg.isMe
                      ? "bg-primary-600 text-white"
                      : "bg-surface-700 text-surface-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-surface-700">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full px-4 py-2 rounded-lg bg-surface-900 border border-surface-600 text-surface-200 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    );
  },
};

export const CodeBlock: Story = {
  render: () => (
    <ScrollArea
      orientation="both"
      className="h-64 w-[500px] rounded-lg border border-surface-700 bg-surface-900 font-mono text-sm shadow-3d"
    >
      <pre className="p-4 text-surface-300">
        <code>{`import { ScrollArea } from "@votekio/cyberpunk-ui";

export function MyComponent() {
  const items = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    name: \`Item \${i + 1}\`,
    description: \`This is the description for item \${i + 1}\`,
  }));

  return (
    <ScrollArea className="h-[400px] w-full">
      <div className="p-4 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="p-4 rounded bg-surface-800">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}`}</code>
      </pre>
    </ScrollArea>
  ),
};

export const ImageGallery: Story = {
  render: () => (
    <ScrollArea
      orientation="horizontal"
      className="w-[500px] rounded-lg border border-surface-700 bg-surface-800 shadow-3d"
    >
      <div className="flex gap-4 p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-48 space-y-2">
            <div className="h-32 rounded-lg bg-gradient-to-br from-primary-600/30 to-accent-600/30 flex items-center justify-center text-surface-400">
              Image {i + 1}
            </div>
            <p className="text-sm text-surface-300">Gallery Image {i + 1}</p>
            <p className="text-xs text-surface-500">Photo description here</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
