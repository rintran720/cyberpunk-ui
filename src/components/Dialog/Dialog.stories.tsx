import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "./Dialog";
import { Button } from "../Button";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "glass"],
      description: "Visual style variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default dialog
export const Default: Story = {
  render: () => (
    <Dialog variant="default">
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to 3D UI</DialogTitle>
          <DialogDescription>
            This is a dialog component with beautiful 3D effects and smooth animations.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p>
            The dialog component features a stunning depth effect created with CSS shadows.
            It includes proper accessibility features like focus trapping, keyboard navigation,
            and screen reader support.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button variant="primary">Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Elevated variant
export const Elevated: Story = {
  render: () => (
    <Dialog variant="elevated">
      <DialogTrigger>
        <Button variant="secondary">Open Elevated Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Elevated Dialog</DialogTitle>
          <DialogDescription>
            This variant has deeper shadows for a more prominent appearance.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p>
            The elevated variant is perfect for important dialogs that need to stand out.
            The deeper 3D shadow creates a sense of the dialog floating high above the content.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button variant="secondary">Got it</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Glass variant
export const Glass: Story = {
  render: () => (
    <Dialog variant="glass">
      <DialogTrigger>
        <Button variant="glass">Open Glass Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Glass Dialog</DialogTitle>
          <DialogDescription>
            Beautiful glassmorphism effect with backdrop blur.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p>
            The glass variant creates a modern, translucent appearance that lets you
            see hints of the content behind. Perfect for overlay interfaces.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button variant="primary">Continue</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Dialog variant="default">
        <DialogTrigger>
          <Button size="sm">Small</Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>Small Dialog</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p>A compact dialog for simple messages.</p>
          </DialogBody>
          <DialogFooter>
            <DialogClose>
              <Button variant="primary" size="sm">OK</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog variant="default">
        <DialogTrigger>
          <Button size="md">Medium</Button>
        </DialogTrigger>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Medium Dialog</DialogTitle>
            <DialogDescription>The default size for most use cases.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>This is the standard dialog size, suitable for forms and confirmations.</p>
          </DialogBody>
          <DialogFooter>
            <DialogClose>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button variant="primary">Confirm</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog variant="default">
        <DialogTrigger>
          <Button size="lg">Large</Button>
        </DialogTrigger>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>For more complex content and forms.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>
              The large size is great for dialogs with more content, such as detailed forms,
              settings panels, or rich media content.
            </p>
          </DialogBody>
          <DialogFooter>
            <DialogClose>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button variant="primary">Save Changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog variant="default">
        <DialogTrigger>
          <Button size="xl">Extra Large</Button>
        </DialogTrigger>
        <DialogContent size="xl">
          <DialogHeader>
            <DialogTitle>Extra Large Dialog</DialogTitle>
            <DialogDescription>Maximum content space for complex interfaces.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>
              The extra large size provides maximum space for complex content like data tables,
              multi-step wizards, or embedded applications.
            </p>
          </DialogBody>
          <DialogFooter>
            <DialogClose>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button variant="primary">Complete</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};

// Confirmation dialog
export const Confirmation: Story = {
  render: () => (
    <Dialog variant="elevated">
      <DialogTrigger>
        <Button variant="danger">Delete Account</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>⚠️ Delete Account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently delete your account?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button variant="danger">Delete</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Form dialog
export const FormDialog: Story = {
  render: () => (
    <Dialog variant="default">
      <DialogTrigger>
        <Button variant="primary">Create New Project</Button>
      </DialogTrigger>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new project.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-2">
                Project Name
              </label>
              <input
                type="text"
                placeholder="My Awesome Project"
                className="w-full px-4 py-2.5 rounded-lg bg-surface-900 border border-surface-600 text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe your project..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-surface-900 border border-surface-600 text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-2">
                Visibility
              </label>
              <select className="w-full px-4 py-2.5 rounded-lg bg-surface-900 border border-surface-600 text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option>Private</option>
                <option>Public</option>
                <option>Team Only</option>
              </select>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button variant="primary">Create Project</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Controlled dialog
const ControlledDialogExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
        <Button variant="ghost" onClick={() => setOpen(false)}>
          Close from Outside
        </Button>
      </div>
      <p className="text-sm text-surface-400">
        Dialog is {open ? "open" : "closed"}
      </p>
      <Dialog variant="default" open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled Dialog</DialogTitle>
            <DialogDescription>
              This dialog's open state is controlled externally.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>
              You can control this dialog from outside using React state.
              Try clicking "Close from Outside" button.
            </p>
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDialogExample />,
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dialog variant="default">
        <DialogTrigger>
          <Button variant="primary">Default</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Default Dialog</DialogTitle>
            <DialogDescription>Standard 3D shadow effect.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>The default variant with subtle depth.</p>
          </DialogBody>
          <DialogFooter>
            <DialogClose>
              <Button variant="primary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog variant="elevated">
        <DialogTrigger>
          <Button variant="secondary">Elevated</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Elevated Dialog</DialogTitle>
            <DialogDescription>Deep 3D shadow effect.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>The elevated variant with prominent depth.</p>
          </DialogBody>
          <DialogFooter>
            <DialogClose>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog variant="glass">
        <DialogTrigger>
          <Button variant="glass">Glass</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Glass Dialog</DialogTitle>
            <DialogDescription>Glassmorphism effect.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>The glass variant with blur effect.</p>
          </DialogBody>
          <DialogFooter>
            <DialogClose>
              <Button variant="glass">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
};

// Without close button
export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog variant="default">
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog has no X button. Use the footer buttons or press Escape.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p>
            You can still close this dialog by pressing Escape, clicking outside,
            or using the buttons below.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button variant="primary">Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => (
    <div className="p-8 rounded-2xl bg-surface-900/50 backdrop-blur-sm border border-surface-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">3D Dialog Component</h2>
        <p className="text-surface-400">Click the buttons to see different dialog styles</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Dialog variant="default">
          <DialogTrigger>
            <Button variant="primary" fullWidth>
              🎨 Default Style
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Default Dialog</DialogTitle>
              <DialogDescription>
                Clean and professional with subtle 3D depth.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-900/50">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-2xl">
                  🎨
                </div>
                <div>
                  <h4 className="font-medium text-surface-100">Beautiful Design</h4>
                  <p className="text-sm text-surface-400">Crafted with attention to detail</p>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button variant="primary">Continue</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog variant="elevated">
          <DialogTrigger>
            <Button variant="secondary" fullWidth>
              ⬆️ Elevated Style
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Elevated Dialog</DialogTitle>
              <DialogDescription>
                Prominent appearance with deep shadows.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-900/50">
                <div className="w-12 h-12 rounded-full bg-secondary-500/20 flex items-center justify-center text-2xl">
                  ⬆️
                </div>
                <div>
                  <h4 className="font-medium text-surface-100">High Impact</h4>
                  <p className="text-sm text-surface-400">For important messages</p>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button variant="secondary">Got it</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog variant="glass">
          <DialogTrigger>
            <Button variant="accent" fullWidth>
              ✨ Glass Style
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Glass Dialog</DialogTitle>
              <DialogDescription>
                Modern glassmorphism aesthetic.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                <div className="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center text-2xl">
                  ✨
                </div>
                <div>
                  <h4 className="font-medium">Translucent Beauty</h4>
                  <p className="text-sm text-white/60">See through the layers</p>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button variant="accent">Amazing</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog variant="elevated">
          <DialogTrigger>
            <Button variant="danger" fullWidth>
              🗑️ Danger Action
            </Button>
          </DialogTrigger>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>⚠️ Confirm Delete</DialogTitle>
              <DialogDescription>
                This action is irreversible.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p className="text-sm">
                Are you sure you want to delete this item? This cannot be undone.
              </p>
            </DialogBody>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button variant="danger">Delete</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
};

