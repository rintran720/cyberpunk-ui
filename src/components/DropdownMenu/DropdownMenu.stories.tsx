import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSearch,
} from "./DropdownMenu";
import { Button } from "../Button";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Keyboard shortcuts
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithCheckboxes: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = React.useState(true);
    const [showActivityBar, setShowActivityBar] = React.useState(false);
    const [showPanel, setShowPanel] = React.useState(false);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">View Options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithRadioItems: Story = {
  render: () => {
    const [position, setPosition] = React.useState("bottom");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Panel Position</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {["top", "bottom", "left", "right"].map((pos) => (
            <DropdownMenuRadioItem
              key={pos}
              value={pos}
              checked={position === pos}
              onSelect={() => setPosition(pos)}
            >
              {pos.charAt(0).toUpperCase() + pos.slice(1)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>New File</DropdownMenuItem>
        <DropdownMenuItem>New Window</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Email</DropdownMenuItem>
            <DropdownMenuItem>Message</DropdownMenuItem>
            <DropdownMenuItem>Notes</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Print...</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="flex gap-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Start
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Center
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            End
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const ContextMenu: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setOpen(true);
    };

    return (
      <>
        <div
          onContextMenu={handleContextMenu}
          className="w-[300px] h-[200px] rounded-lg border border-dashed border-surface-600 flex items-center justify-center text-surface-400 text-sm"
        >
          Right-click here
        </div>

        {open && (
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}>
            <div
              className="absolute z-50 min-w-[180px] p-1 rounded-lg border border-surface-600 bg-surface-800 shadow-[0_8px_16px_rgba(0,0,0,0.3),0_4px_0_0_rgba(0,0,0,0.2)]"
              style={{ left: position.x, top: position.y }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-surface-200 hover:bg-surface-700"
              >
                Cut
                <span className="ml-auto text-xs text-surface-500">⌘X</span>
              </button>
              <button
                onClick={() => setOpen(false)}
                className="relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-surface-200 hover:bg-surface-700"
              >
                Copy
                <span className="ml-auto text-xs text-surface-500">⌘C</span>
              </button>
              <button
                onClick={() => setOpen(false)}
                className="relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-surface-200 hover:bg-surface-700"
              >
                Paste
                <span className="ml-auto text-xs text-surface-500">⌘V</span>
              </button>
              <div className="my-1 h-px bg-surface-700" />
              <button
                onClick={() => setOpen(false)}
                className="relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-red-400 hover:bg-surface-700"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </>
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const items = [
      { label: "Apple", icon: "🍎" },
      { label: "Banana", icon: "🍌" },
      { label: "Cherry", icon: "🍒" },
      { label: "Date", icon: "📅" },
      { label: "Elderberry", icon: "🫐" },
      { label: "Fig", icon: "🟣" },
      { label: "Grape", icon: "🍇" },
      { label: "Honeydew", icon: "🍈" },
      { label: "Kiwi", icon: "🥝" },
      { label: "Lemon", icon: "🍋" },
      { label: "Mango", icon: "🥭" },
      { label: "Orange", icon: "🍊" },
    ];

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Select Fruit</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSearch placeholder="Search fruits..." />
          <DropdownMenuSeparator />
          {items.map((item) => (
            <DropdownMenuItem key={item.label}>
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithSearchAndShortcuts: Story = {
  render: () => {
    const commands = [
      { label: "New File", shortcut: "⌘N", category: "file" },
      { label: "Open File", shortcut: "⌘O", category: "file" },
      { label: "Save File", shortcut: "⌘S", category: "file" },
      { label: "Cut", shortcut: "⌘X", category: "edit" },
      { label: "Copy", shortcut: "⌘C", category: "edit" },
      { label: "Paste", shortcut: "⌘V", category: "edit" },
      { label: "Undo", shortcut: "⌘Z", category: "edit" },
      { label: "Redo", shortcut: "⇧⌘Z", category: "edit" },
      { label: "Find", shortcut: "⌘F", category: "search" },
      { label: "Replace", shortcut: "⌘H", category: "search" },
      { label: "Go to Line", shortcut: "⌘G", category: "navigation" },
      { label: "Command Palette", shortcut: "⌘⇧P", category: "navigation" },
    ];

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Commands</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuSearch placeholder="Search commands..." />
          <DropdownMenuSeparator />
          {commands.map((cmd) => (
            <DropdownMenuItem key={cmd.label}>
              {cmd.label}
              <DropdownMenuShortcut>{cmd.shortcut}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
