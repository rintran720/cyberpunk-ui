import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Account
          </h3>
          <p className="text-surface-300 text-sm">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Password
          </h3>
          <p className="text-surface-300 text-sm">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Settings
          </h3>
          <p className="text-surface-300 text-sm">
            Configure your application settings and preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList variant="pills">
        <TabsTrigger value="overview" variant="pills">
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics" variant="pills">
          Analytics
        </TabsTrigger>
        <TabsTrigger value="reports" variant="pills">
          Reports
        </TabsTrigger>
        <TabsTrigger value="notifications" variant="pills">
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Overview
          </h3>
          <p className="text-surface-300 text-sm">
            Get a quick summary of your dashboard metrics and KPIs.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Analytics
          </h3>
          <p className="text-surface-300 text-sm">
            Deep dive into your data with detailed analytics and charts.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Reports
          </h3>
          <p className="text-surface-300 text-sm">
            Generate and download custom reports for your team.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Notifications
          </h3>
          <p className="text-surface-300 text-sm">
            Manage your notification preferences and alerts.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="music" className="w-[400px]">
      <TabsList variant="underline" className="w-full justify-start">
        <TabsTrigger value="music" variant="underline">
          Music
        </TabsTrigger>
        <TabsTrigger value="podcasts" variant="underline">
          Podcasts
        </TabsTrigger>
        <TabsTrigger value="audiobooks" variant="underline">
          Audiobooks
        </TabsTrigger>
      </TabsList>
      <TabsContent value="music">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Music Library
          </h3>
          <p className="text-surface-300 text-sm">
            Browse your music collection and playlists.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="podcasts">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Podcasts
          </h3>
          <p className="text-surface-300 text-sm">
            Discover new podcasts and catch up on your subscriptions.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="audiobooks">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Audiobooks
          </h3>
          <p className="text-surface-300 text-sm">
            Listen to your favorite books on the go.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-[450px]">
      <TabsList>
        <TabsTrigger value="profile" className="gap-2">
          <svg
            className="w-4 h-4"
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
        </TabsTrigger>
        <TabsTrigger value="security" className="gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Security
        </TabsTrigger>
        <TabsTrigger value="billing" className="gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Profile Settings
          </h3>
          <p className="text-surface-300 text-sm">
            Update your personal information and preferences.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="security">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Security Settings
          </h3>
          <p className="text-surface-300 text-sm">
            Manage your security preferences and two-factor authentication.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="billing">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Billing Information
          </h3>
          <p className="text-surface-300 text-sm">
            View and manage your billing details and payment methods.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="inbox" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="inbox" className="gap-2">
          Inbox
          <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-primary-500 text-white">
            12
          </span>
        </TabsTrigger>
        <TabsTrigger value="sent" className="gap-2">
          Sent
          <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-surface-700 text-surface-300">
            5
          </span>
        </TabsTrigger>
        <TabsTrigger value="drafts" className="gap-2">
          Drafts
          <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-surface-700 text-surface-300">
            3
          </span>
        </TabsTrigger>
        <TabsTrigger value="archived" className="gap-2">
          Archived
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inbox">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-4">Inbox</h3>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-3 rounded bg-surface-900 border border-surface-700"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-surface-200">
                    Email {i}
                  </span>
                  <span className="text-xs text-surface-500">2h ago</span>
                </div>
                <p className="text-xs text-surface-400">
                  You have a new message...
                </p>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="sent">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-4">
            Sent Messages
          </h3>
          <p className="text-surface-300 text-sm">
            View your sent messages here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="drafts">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-4">
            Drafts
          </h3>
          <p className="text-surface-300 text-sm">
            Your unsent messages are saved here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="archived">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-4">
            Archived
          </h3>
          <p className="text-surface-300 text-sm">
            Archived messages will appear here.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithFormContent: Story = {
  render: () => (
    <Tabs defaultValue="personal" className="w-[600px]">
      <TabsList>
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="address">Address</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <div className="p-6 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-4">
            Personal Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md bg-surface-900 border border-surface-700 text-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded-md bg-surface-900 border border-surface-700 text-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 rounded-md bg-surface-900 border border-surface-700 text-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="address">
        <div className="p-6 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-4">
            Address Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1">
                Street Address
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md bg-surface-900 border border-surface-700 text-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="123 Main St"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md bg-surface-900 border border-surface-700 text-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md bg-surface-900 border border-surface-700 text-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="10001"
                />
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="preferences">
        <div className="p-6 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-4">
            Preferences
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-surface-700 bg-surface-900 text-primary-500"
              />
              <span className="text-sm text-surface-300">
                Email notifications
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-surface-700 bg-surface-900 text-primary-500"
              />
              <span className="text-sm text-surface-300">
                SMS notifications
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-surface-700 bg-surface-900 text-primary-500"
                defaultChecked
              />
              <span className="text-sm text-surface-300">Marketing emails</span>
            </label>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabledTabs: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="pending" disabled>
          Pending
        </TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="archived" disabled>
          Archived
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Active Tasks
          </h3>
          <p className="text-surface-300 text-sm">
            You have 5 active tasks in progress.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="pending">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Pending Tasks
          </h3>
          <p className="text-surface-300 text-sm">
            Tasks waiting to be started.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="completed">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Completed Tasks
          </h3>
          <p className="text-surface-300 text-sm">
            View your completed tasks and achievements.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="archived">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Archived Tasks
          </h3>
          <p className="text-surface-300 text-sm">
            Archived tasks are stored here.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithTableContent: Story = {
  render: () => (
    <Tabs defaultValue="users" className="w-[700px]">
      <TabsList>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
      </TabsList>
      <TabsContent value="users">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-4">
            User Management
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-700">
                  <th className="text-left py-2 px-3 text-sm font-semibold text-surface-300">
                    Name
                  </th>
                  <th className="text-left py-2 px-3 text-sm font-semibold text-surface-300">
                    Email
                  </th>
                  <th className="text-left py-2 px-3 text-sm font-semibold text-surface-300">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "John Doe",
                    email: "john@example.com",
                    role: "Admin",
                  },
                  {
                    name: "Jane Smith",
                    email: "jane@example.com",
                    role: "User",
                  },
                  {
                    name: "Bob Johnson",
                    email: "bob@example.com",
                    role: "Editor",
                  },
                ].map((user, i) => (
                  <tr key={i} className="border-b border-surface-700/50">
                    <td className="py-2 px-3 text-sm text-surface-200">
                      {user.name}
                    </td>
                    <td className="py-2 px-3 text-sm text-surface-400">
                      {user.email}
                    </td>
                    <td className="py-2 px-3 text-sm text-surface-300">
                      {user.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="orders">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-4">
            Order History
          </h3>
          <div className="space-y-2">
            {["#1234", "#1235", "#1236"].map((order) => (
              <div
                key={order}
                className="p-3 rounded bg-surface-900 border border-surface-700 flex items-center justify-between"
              >
                <span className="text-sm font-medium text-surface-200">
                  Order {order}
                </span>
                <span className="text-xs text-surface-500">$99.99</span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="products">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-4">
            Product Catalog
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {["Product A", "Product B", "Product C", "Product D"].map(
              (product) => (
                <div
                  key={product}
                  className="p-3 rounded bg-surface-900 border border-surface-700"
                >
                  <span className="text-sm text-surface-200">{product}</span>
                </div>
              )
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithNestedContent: Story = {
  render: () => (
    <Tabs defaultValue="dashboard" className="w-[600px]">
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-4">
            Dashboard Overview
          </h3>
          <Tabs defaultValue="overview" className="mt-4">
            <TabsList variant="pills" className="mb-4">
              <TabsTrigger value="overview" variant="pills">
                Overview
              </TabsTrigger>
              <TabsTrigger value="recent" variant="pills">
                Recent
              </TabsTrigger>
              <TabsTrigger value="favorites" variant="pills">
                Favorites
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="p-4 rounded bg-surface-900 border border-surface-700">
                <p className="text-sm text-surface-300">
                  Dashboard overview content goes here.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="recent">
              <div className="p-4 rounded bg-surface-900 border border-surface-700">
                <p className="text-sm text-surface-300">
                  Recent activity and updates.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="favorites">
              <div className="p-4 rounded bg-surface-900 border border-surface-700">
                <p className="text-sm text-surface-300">
                  Your favorite items and bookmarks.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Analytics
          </h3>
          <p className="text-surface-300 text-sm">
            View detailed analytics and metrics for your account.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4 rounded-lg bg-surface-800 border border-surface-700">
          <h3 className="text-lg font-semibold text-surface-100 mb-2">
            Settings
          </h3>
          <p className="text-surface-300 text-sm">
            Configure your application settings and preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
