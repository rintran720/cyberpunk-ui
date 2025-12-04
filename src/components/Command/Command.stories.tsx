import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./Command";

const meta: Meta<typeof Command> = {
  title: "Components/Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command className="w-[350px] rounded-lg border border-surface-700">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Calendar
          </CommandItem>
          <CommandItem>
            <svg
              className="mr-2 h-4 w-4"
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
            Search Emoji
          </CommandItem>
          <CommandItem>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <svg
              className="mr-2 h-4 w-4"
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
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithSearch: Story = {
  render: () => {
    const [search, setSearch] = React.useState("");
    const items = [
      { id: 1, name: "Calendar", icon: "📅" },
      { id: 2, name: "Search Emoji", icon: "😀" },
      { id: 3, name: "Calculator", icon: "🔢" },
      { id: 4, name: "Settings", icon: "⚙️" },
      { id: 5, name: "Profile", icon: "👤" },
      { id: 6, name: "Billing", icon: "💳" },
    ];

    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <Command className="w-[350px] rounded-lg border border-surface-700">
        <CommandInput
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CommandList>
          {filtered.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <CommandGroup>
              {filtered.map((item) => (
                <CommandItem key={item.id} value={item.name}>
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    );
  },
};

export const Dialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };

      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, []);

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-lg bg-surface-800 border border-surface-700 text-surface-200 hover:bg-surface-700 transition-colors shadow-3d-sm"
        >
          Open Command (⌘K)
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Billing
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Settings
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string | null>(null);

    return (
      <div className="space-y-4">
        <Command className="w-[350px] rounded-lg border border-surface-700">
          <CommandInput placeholder="Select an action..." />
          <CommandList>
            <CommandGroup heading="Actions">
              <CommandItem
                value="create"
                onSelect={() => setSelected("create")}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create New File
              </CommandItem>
              <CommandItem value="open" onSelect={() => setSelected("open")}>
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Open File
              </CommandItem>
              <CommandItem value="save" onSelect={() => setSelected("save")}>
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                Save File
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        {selected && (
          <p className="text-sm text-surface-400">
            Selected: <span className="text-primary-400">{selected}</span>
          </p>
        )}
      </div>
    );
  },
};

export const FileManager: Story = {
  render: () => (
    <Command className="w-[400px] rounded-lg border border-surface-700">
      <CommandInput placeholder="Search files..." />
      <CommandList>
        <CommandGroup heading="Recent Files">
          <CommandItem>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            project-proposal.pdf
            <CommandShortcut>⌘1</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            budget-2024.xlsx
            <CommandShortcut>⌘2</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            meeting-notes.md
            <CommandShortcut>⌘3</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Folders">
          <CommandItem>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            Documents
          </CommandItem>
          <CommandItem>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            Images
          </CommandItem>
          <CommandItem>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            Videos
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const NavigationMenu: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string | null>(null);

    const menuItems = [
      { id: "home", label: "Home", icon: "🏠" },
      { id: "products", label: "Products", icon: "📦" },
      { id: "about", label: "About", icon: "ℹ️" },
      { id: "contact", label: "Contact", icon: "📧" },
      { id: "blog", label: "Blog", icon: "📝" },
      { id: "pricing", label: "Pricing", icon: "💰" },
    ];

    return (
      <div className="space-y-4">
        <Command className="w-[350px] rounded-lg border border-surface-700">
          <CommandInput placeholder="Navigate to..." />
          <CommandList>
            <CommandGroup heading="Pages">
              {menuItems.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => setSelected(item.id)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        {selected && (
          <p className="text-sm text-surface-400">
            Navigated to:{" "}
            <span className="text-primary-400">
              {menuItems.find((i) => i.id === selected)?.label}
            </span>
          </p>
        )}
      </div>
    );
  },
};

export const ThemeSwitcher: Story = {
  render: () => {
    const themes = [
      { id: "light", label: "Light", description: "Light theme" },
      { id: "dark", label: "Dark", description: "Dark theme" },
      { id: "system", label: "System", description: "Follow system preference" },
      { id: "ocean", label: "Ocean", description: "Ocean blue theme" },
      { id: "sunset", label: "Sunset", description: "Warm sunset theme" },
    ];

    return (
      <Command className="w-[350px] rounded-lg border border-surface-700">
        <CommandInput placeholder="Search themes..." />
        <CommandList>
          <CommandEmpty>No theme found.</CommandEmpty>
          <CommandGroup heading="Themes">
            {themes.map((theme) => (
              <CommandItem key={theme.id} value={theme.id}>
                <div className="flex flex-col">
                  <span>{theme.label}</span>
                  <span className="text-xs text-surface-500">
                    {theme.description}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  },
};

export const QuickActions: Story = {
  render: () => {
    const actions = [
      {
        id: "new-project",
        label: "New Project",
        shortcut: "⌘N",
        icon: "✨",
      },
      {
        id: "open-recent",
        label: "Open Recent",
        shortcut: "⌘O",
        icon: "📂",
      },
      {
        id: "save-all",
        label: "Save All",
        shortcut: "⌘S",
        icon: "💾",
      },
      {
        id: "close-editor",
        label: "Close Editor",
        shortcut: "⌘W",
        icon: "❌",
      },
      {
        id: "command-palette",
        label: "Command Palette",
        shortcut: "⌘⇧P",
        icon: "⌘",
      },
      {
        id: "settings",
        label: "Settings",
        shortcut: "⌘,",
        icon: "⚙️",
      },
    ];

    return (
      <Command className="w-[400px] rounded-lg border border-surface-700">
        <CommandInput placeholder="Quick actions..." />
        <CommandList>
          <CommandGroup heading="Actions">
            {actions.map((action) => (
              <CommandItem key={action.id} value={action.id}>
                <span className="mr-2">{action.icon}</span>
                {action.label}
                <CommandShortcut>{action.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  },
};
