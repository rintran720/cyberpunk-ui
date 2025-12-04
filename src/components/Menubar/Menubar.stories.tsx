import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarShortcut,
} from "./Menubar";

const meta: Meta<typeof Menubar> = {
  title: "Components/Menubar",
  component: Menubar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Copy link</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print...
            <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>
            Always Show Bookmarks Bar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem>Always Show Full URLs</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel inset>People</MenubarLabel>
          <MenubarSeparator />
          <MenubarRadioItem value="1">1</MenubarRadioItem>
          <MenubarRadioItem value="2">2</MenubarRadioItem>
          <MenubarRadioItem value="3">3</MenubarRadioItem>
          <MenubarRadioItem value="4">4</MenubarRadioItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <svg
            className="h-4 w-4"
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
          File
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
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
            New File
          </MenubarItem>
          <MenubarItem>
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
            Open
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
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
            Save
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
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
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
            Undo
          </MenubarItem>
          <MenubarItem>
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
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 10l6 6m0-6l-6 6"
              />
            </svg>
            Redo
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const WithCheckboxes: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = React.useState(true);
    const [showActivityBar, setShowActivityBar] = React.useState(false);

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Status Bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              Activity Bar
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarLabel>Appearance</MenubarLabel>
            <MenubarSeparator />
            <MenubarRadioItem value="light">Light</MenubarRadioItem>
            <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
            <MenubarRadioItem value="system">System</MenubarRadioItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const CodeEditor: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New File
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window
            <MenubarShortcut>⌘⇧N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Open File...
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open Folder...
            <MenubarShortcut>⌘K ⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Save
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save As...
            <MenubarShortcut>⌘⇧S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo
            <MenubarShortcut>⌘⇧Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Find
            <MenubarShortcut>⌘F</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Replace
            <MenubarShortcut>⌘H</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Explorer</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>Search</MenubarCheckboxItem>
          <MenubarCheckboxItem>Source Control</MenubarCheckboxItem>
          <MenubarCheckboxItem>Run and Debug</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Terminal</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Terminal
            <MenubarShortcut>⌘`</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Split Terminal</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Select Shell</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Bash</MenubarItem>
              <MenubarItem>Zsh</MenubarItem>
              <MenubarItem>PowerShell</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const ImageEditor: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Image</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Adjust</MenubarItem>
          <MenubarItem>Filters</MenubarItem>
          <MenubarItem>Transform</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Resize</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Scale Image</MenubarItem>
              <MenubarItem>Canvas Size</MenubarItem>
              <MenubarItem>Crop</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Layer</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Layer
            <MenubarShortcut>⌘⇧N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Duplicate Layer
            <MenubarShortcut>⌘J</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Delete Layer
            <MenubarShortcut>⌘⌫</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Merge Down</MenubarItem>
          <MenubarItem>Flatten Image</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Select</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            All
            <MenubarShortcut>⌘A</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Deselect
            <MenubarShortcut>⌘D</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Inverse</MenubarItem>
          <MenubarItem>Feather</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Menu</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Option 1</MenubarItem>
          <MenubarItem>Option 2</MenubarItem>
          <MenubarItem>Option 3</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const WithRadioGroups: Story = {
  render: () => {
    const [zoom, setZoom] = React.useState("100");

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel inset>Zoom</MenubarLabel>
            <MenubarRadioItem
              value="50"
              checked={zoom === "50"}
              onSelect={() => setZoom("50")}
            >
              50%
            </MenubarRadioItem>
            <MenubarRadioItem
              value="100"
              checked={zoom === "100"}
              onSelect={() => setZoom("100")}
            >
              100%
            </MenubarRadioItem>
            <MenubarRadioItem
              value="150"
              checked={zoom === "150"}
              onSelect={() => setZoom("150")}
            >
              150%
            </MenubarRadioItem>
            <MenubarRadioItem
              value="200"
              checked={zoom === "200"}
              onSelect={() => setZoom("200")}
            >
              200%
            </MenubarRadioItem>
            <MenubarSeparator />
            <MenubarLabel inset>Layout</MenubarLabel>
            <MenubarRadioItem value="single">Single Column</MenubarRadioItem>
            <MenubarRadioItem value="two">Two Columns</MenubarRadioItem>
            <MenubarRadioItem value="three">Three Columns</MenubarRadioItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const WithNestedSubmenus: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Tools</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Format</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarSub>
                <MenubarSubTrigger>Text</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Bold</MenubarItem>
                  <MenubarItem>Italic</MenubarItem>
                  <MenubarItem>Underline</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSub>
                <MenubarSubTrigger>Alignment</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Left</MenubarItem>
                  <MenubarItem>Center</MenubarItem>
                  <MenubarItem>Right</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Insert</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Image</MenubarItem>
              <MenubarItem>Table</MenubarItem>
              <MenubarItem>Link</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
