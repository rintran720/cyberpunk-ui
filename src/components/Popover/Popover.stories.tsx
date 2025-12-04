import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "./Popover";
import { Button } from "../Button";
import { TextField, TextArea } from "../TextField";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../Select";
import { DatePicker } from "../DatePicker";
import { Switch } from "../Switch";
import { Badge } from "../Badge";
import { Avatar, AvatarFallback } from "../Avatar";
import { Separator } from "../Separator";
import { Label } from "../Label";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium text-surface-100">Popover Title</h4>
          <p className="text-sm text-surface-400">
            This is a simple popover with some content.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Update Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-surface-100">Dimensions</h4>
            <p className="text-sm text-surface-400">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm text-surface-300">Width</label>
              <input
                type="text"
                defaultValue="100%"
                className="col-span-2 h-8 px-2 rounded-md bg-surface-900 border border-surface-600 text-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm text-surface-300">Height</label>
              <input
                type="text"
                defaultValue="25px"
                className="col-span-2 h-8 px-2 rounded-md bg-surface-900 border border-surface-600 text-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm text-surface-300">Max. Height</label>
              <input
                type="text"
                defaultValue="none"
                className="col-span-2 h-8 px-2 rounded-md bg-surface-900 border border-surface-600 text-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Start
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-48">
          <p className="text-sm">Aligned to start</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Center
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-48">
          <p className="text-sm">Aligned to center</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            End
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-48">
          <p className="text-sm">Aligned to end</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[400px]">
      <div />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            Top
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-48">
          <p className="text-sm">Opens on top</p>
        </PopoverContent>
      </Popover>
      <div />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            Left
          </Button>
        </PopoverTrigger>
        <PopoverContent side="left" className="w-48">
          <p className="text-sm">Opens on left</p>
        </PopoverContent>
      </Popover>
      <div />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            Right
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-48">
          <p className="text-sm">Opens on right</p>
        </PopoverContent>
      </Popover>

      <div />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            Bottom
          </Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="w-48">
          <p className="text-sm">Opens on bottom</p>
        </PopoverContent>
      </Popover>
      <div />
    </div>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Click Me</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h4 className="font-medium text-surface-100">Notification</h4>
            <p className="text-sm text-surface-400">You have a new message.</p>
          </div>
          <PopoverClose asChild>
            <button className="text-surface-400 hover:text-surface-100 transition-colors">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </PopoverClose>
        </div>
        <div className="mt-4 flex gap-2">
          <PopoverClose asChild>
            <Button size="sm" variant="outline" className="flex-1">
              Dismiss
            </Button>
          </PopoverClose>
          <Button size="sm" className="flex-1">
            View
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-800 transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
            JD
          </div>
          <span className="text-surface-200 text-sm">John Doe</span>
          <svg
            className="h-4 w-4 text-surface-400"
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
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64">
        <div className="flex items-center gap-3 pb-4 border-b border-surface-700">
          <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white text-lg font-medium">
            JD
          </div>
          <div>
            <p className="font-medium text-surface-100">John Doe</p>
            <p className="text-sm text-surface-400">john@example.com</p>
          </div>
        </div>
        <div className="py-2 space-y-1">
          <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-surface-300 hover:bg-surface-700 rounded-md transition-colors">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Profile
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-surface-300 hover:bg-surface-700 rounded-md transition-colors">
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
          </button>
        </div>
        <div className="pt-2 border-t border-surface-700">
          <PopoverClose asChild>
            <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-red-400 hover:bg-surface-700 rounded-md transition-colors">
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign out
            </button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
            Open
          </Button>
          <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">Controlled Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm text-surface-300">
              This popover is controlled externally.
            </p>
          </PopoverContent>
        </Popover>
        <p className="text-sm text-surface-400">
          State:{" "}
          <span className="text-primary-400">{open ? "open" : "closed"}</span>
        </p>
      </div>
    );
  },
};

export const ComplexForm: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      title: "",
      description: "",
      priority: "medium",
      dueDate: undefined as Date | undefined,
      tags: [] as string[],
      notifications: true,
    });

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button>Create Task</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px]">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-surface-100 mb-1">
                Create New Task
              </h3>
              <p className="text-sm text-surface-400">
                Fill in the details below to create a new task.
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <TextField
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter task title"
                  fullWidth
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <TextArea
                  id="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter task description"
                  rows={4}
                  fullWidth
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      setFormData({ ...formData, priority: value })
                    }
                  >
                    <SelectTrigger id="priority" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <DatePicker
                    id="dueDate"
                    value={formData.dueDate}
                    onChange={(date) =>
                      setFormData({ ...formData, dueDate: date })
                    }
                    placeholder="Select date"
                    fullWidth
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {["Work", "Personal", "Urgent", "Project"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        const tags = formData.tags.includes(tag)
                          ? formData.tags.filter((t) => t !== tag)
                          : [...formData.tags, tag];
                        setFormData({ ...formData, tags });
                      }}
                    >
                      <Badge
                        variant={
                          formData.tags.includes(tag) ? "primary" : "secondary"
                        }
                        size="sm"
                      >
                        {tag}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="cursor-pointer">
                  Enable notifications
                </Label>
                <Switch
                  id="notifications"
                  checked={formData.notifications}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, notifications: checked })
                  }
                />
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-2">
              <PopoverClose asChild>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
              </PopoverClose>
              <PopoverClose asChild>
                <Button size="sm">Create Task</Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const RichContent: Story = {
  render: () => {
    const notifications = [
      {
        id: 1,
        title: "New message",
        message: "You have a new message from John",
        time: "2m ago",
        unread: true,
      },
      {
        id: 2,
        title: "Task completed",
        message: "Your task 'Design Review' has been completed",
        time: "1h ago",
        unread: true,
      },
      {
        id: 3,
        title: "Meeting reminder",
        message: "Team meeting starts in 30 minutes",
        time: "3h ago",
        unread: false,
      },
      {
        id: 4,
        title: "Project update",
        message: "New updates available for Project Alpha",
        time: "1d ago",
        unread: false,
      },
    ];

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="relative">
            Notifications
            <Badge variant="destructive" size="sm" className="ml-2">
              {notifications.filter((n) => n.unread).length}
            </Badge>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-surface-100">Notifications</h3>
              <button className="text-xs text-primary-400 hover:text-primary-300">
                Mark all as read
              </button>
            </div>

            <Separator />

            <div className="max-h-[400px] overflow-y-auto space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    notification.unread
                      ? "bg-primary-500/10 border-primary-500/20 hover:bg-primary-500/20"
                      : "bg-surface-900 border-surface-700 hover:bg-surface-800"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar size="sm" className="flex-shrink-0">
                      <AvatarFallback>
                        {notification.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-surface-100">
                          {notification.title}
                        </p>
                        {notification.unread && (
                          <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-surface-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-surface-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="text-center">
              <button className="text-sm text-primary-400 hover:text-primary-300">
                View all notifications
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const TeamMembers: Story = {
  render: () => {
    const members = [
      {
        id: 1,
        name: "John Doe",
        role: "Frontend Developer",
        avatar: "JD",
        status: "online",
      },
      {
        id: 2,
        name: "Jane Smith",
        role: "Backend Developer",
        avatar: "JS",
        status: "away",
      },
      {
        id: 3,
        name: "Bob Johnson",
        role: "Designer",
        avatar: "BJ",
        status: "online",
      },
      {
        id: 4,
        name: "Alice Brown",
        role: "Product Manager",
        avatar: "AB",
        status: "offline",
      },
    ];

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            Team Members
            <Badge variant="secondary" size="sm" className="ml-2">
              {members.length}
            </Badge>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px]">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-surface-100 mb-1">
                Team Members
              </h3>
              <p className="text-sm text-surface-400">
                {members.filter((m) => m.status === "online").length} online
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-800 transition-colors cursor-pointer"
                >
                  <div className="relative">
                    <Avatar size="md">
                      <AvatarFallback>{member.avatar}</AvatarFallback>
                    </Avatar>
                    {member.status === "online" && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface-800 rounded-full" />
                    )}
                    {member.status === "away" && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 border-2 border-surface-800 rounded-full" />
                    )}
                    {member.status === "offline" && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-surface-600 border-2 border-surface-800 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-100 truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-surface-400 truncate">
                      {member.role}
                    </p>
                  </div>
                  <button className="text-surface-400 hover:text-surface-200 transition-colors">
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
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <Separator />

            <PopoverClose asChild>
              <Button variant="outline" size="sm" className="w-full">
                View All Members
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = React.useState({
      darkMode: true,
      notifications: true,
      emailAlerts: false,
      autoSave: true,
      language: "en",
      theme: "default",
    });

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <svg
              className="h-4 w-4 mr-2"
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
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px]">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-surface-100 mb-1">
                Settings
              </h3>
              <p className="text-sm text-surface-400">
                Manage your application preferences
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-surface-300 uppercase tracking-wider">
                  Appearance
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dark Mode</Label>
                      <p className="text-xs text-surface-500">
                        Enable dark theme
                      </p>
                    </div>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, darkMode: checked })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select
                      value={settings.theme}
                      onValueChange={(value) =>
                        setSettings({ ...settings, theme: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-surface-300 uppercase tracking-wider">
                  Notifications
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-xs text-surface-500">
                        Receive push notifications
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, notifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Alerts</Label>
                      <p className="text-xs text-surface-500">
                        Receive email notifications
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailAlerts}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, emailAlerts: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-surface-300 uppercase tracking-wider">
                  General
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Save</Label>
                      <p className="text-xs text-surface-500">
                        Automatically save changes
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoSave}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, autoSave: checked })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) =>
                        setSettings({ ...settings, language: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-2">
              <PopoverClose asChild>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
              </PopoverClose>
              <PopoverClose asChild>
                <Button size="sm">Save Changes</Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};
