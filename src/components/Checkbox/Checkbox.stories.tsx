import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import * as React from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Marketing emails",
    description: "Receive emails about new products, features, and more.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox variant="default" label="Default" defaultChecked />
      <Checkbox variant="success" label="Success" defaultChecked />
      <Checkbox variant="warning" label="Warning" defaultChecked />
      <Checkbox variant="danger" label="Danger" defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Checkbox size="sm" label="Small" defaultChecked />
      <Checkbox size="md" label="Medium" defaultChecked />
      <Checkbox size="lg" label="Large" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="space-y-4">
        <Checkbox 
          label={checked ? "Checked" : "Unchecked"}
          checked={checked}
          onCheckedChange={setChecked}
        />
        <p className="text-sm text-surface-400">
          Current state: {checked ? "true" : "false"}
        </p>
      </div>
    );
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(["email"]);
    
    const toggleItem = (item: string) => {
      setSelected(prev => 
        prev.includes(item) 
          ? prev.filter(i => i !== item)
          : [...prev, item]
      );
    };

    return (
      <div className="w-[400px] p-6 rounded-xl bg-surface-800 border border-surface-700">
        <h3 className="text-lg font-semibold text-surface-100 mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <Checkbox
            label="Email notifications"
            description="Get notified via email"
            checked={selected.includes("email")}
            onCheckedChange={() => toggleItem("email")}
          />
          <Checkbox
            label="SMS notifications"
            description="Get notified via SMS"
            checked={selected.includes("sms")}
            onCheckedChange={() => toggleItem("sms")}
          />
          <Checkbox
            label="Push notifications"
            description="Get notified via push alerts"
            checked={selected.includes("push")}
            onCheckedChange={() => toggleItem("push")}
          />
          <Checkbox
            label="In-app notifications"
            description="Get notified within the app"
            checked={selected.includes("inapp")}
            onCheckedChange={() => toggleItem("inapp")}
          />
        </div>
        <p className="mt-4 text-xs text-surface-400">
          Selected: {selected.length > 0 ? selected.join(", ") : "none"}
        </p>
      </div>
    );
  },
};

export const TodoList: Story = {
  render: () => {
    const [todos, setTodos] = React.useState([
      { id: 1, text: "Complete project setup", done: true },
      { id: 2, text: "Write documentation", done: false },
      { id: 3, text: "Add unit tests", done: false },
      { id: 4, text: "Deploy to production", done: false },
    ]);

    const toggleTodo = (id: number) => {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    };

    return (
      <div className="w-[350px] p-6 rounded-xl bg-surface-800 border border-surface-700">
        <h3 className="text-lg font-semibold text-surface-100 mb-4">
          Todo List
        </h3>
        <div className="flex flex-col gap-3">
          {todos.map(todo => (
            <Checkbox
              key={todo.id}
              variant={todo.done ? "success" : "default"}
              label={todo.text}
              checked={todo.done}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
          ))}
        </div>
        <p className="mt-4 text-xs text-surface-400">
          {todos.filter(t => t.done).length} of {todos.length} completed
        </p>
      </div>
    );
  },
};

