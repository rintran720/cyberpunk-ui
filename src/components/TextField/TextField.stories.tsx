import type { Meta, StoryObj } from "@storybook/react";
import { TextField, TextArea } from "./TextField";

// Icons
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "filled", "outline", "glass"],
      description: "Visual style variant",
    },
    inputSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Input size",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    placeholder: "Enter your text...",
    variant: "default",
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    type: "email",
  },
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    helperText: "Must be at least 8 characters long",
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    value: "invalid-email",
    error: "Please enter a valid email address",
  },
};

// Required Field
export const Required: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    isRequired: true,
  },
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <TextField
        variant="default"
        label="Default"
        placeholder="Default variant"
      />
      <TextField
        variant="filled"
        label="Filled"
        placeholder="Filled variant"
      />
      <TextField
        variant="outline"
        label="Outline"
        placeholder="Outline variant"
      />
      <TextField
        variant="glass"
        label="Glass"
        placeholder="Glass variant"
      />
    </div>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <TextField
        inputSize="sm"
        label="Small"
        placeholder="Small input"
      />
      <TextField
        inputSize="md"
        label="Medium"
        placeholder="Medium input"
      />
      <TextField
        inputSize="lg"
        label="Large"
        placeholder="Large input"
      />
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <TextField
        label="Search"
        placeholder="Search..."
        leftElement={<SearchIcon />}
      />
      <TextField
        label="Email"
        placeholder="Enter email"
        leftElement={<MailIcon />}
      />
      <TextField
        label="Password"
        placeholder="Enter password"
        type="password"
        leftElement={<LockIcon />}
        rightElement={<EyeIcon />}
      />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <TextField
        label="Normal"
        placeholder="Normal state"
      />
      <TextField
        label="With Value"
        value="John Doe"
        readOnly
      />
      <TextField
        label="Error"
        placeholder="Error state"
        error="This field is required"
      />
      <TextField
        label="Disabled"
        placeholder="Disabled state"
        disabled
      />
    </div>
  ),
};

// Disabled
export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    placeholder: "Cannot edit",
    disabled: true,
  },
};

// Glass Variant
export const GlassVariant: Story = {
  render: () => (
    <div className="space-y-6">
      <TextField
        variant="glass"
        label="Username"
        placeholder="Enter username"
        leftElement={<UserIcon />}
      />
      <TextField
        variant="glass"
        label="Email"
        placeholder="Enter email"
        leftElement={<MailIcon />}
      />
      <TextField
        variant="glass"
        label="Password"
        placeholder="Enter password"
        type="password"
        leftElement={<LockIcon />}
      />
    </div>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
};

// Form Example
export const FormExample: Story = {
  render: () => (
    <div className="p-6 rounded-2xl bg-surface-800/50 border border-surface-700 space-y-5">
      <h3 className="text-lg font-semibold text-surface-100 mb-4">Create Account</h3>
      
      <TextField
        label="Full Name"
        placeholder="John Doe"
        leftElement={<UserIcon />}
        isRequired
        fullWidth
      />
      
      <TextField
        label="Email"
        placeholder="john@example.com"
        type="email"
        leftElement={<MailIcon />}
        isRequired
        fullWidth
      />
      
      <TextField
        label="Password"
        placeholder="Create password"
        type="password"
        leftElement={<LockIcon />}
        helperText="Use 8+ characters with letters and numbers"
        isRequired
        fullWidth
      />
      
      <TextField
        label="Confirm Password"
        placeholder="Confirm password"
        type="password"
        leftElement={<LockIcon />}
        isRequired
        fullWidth
      />
      
      <button className="w-full h-11 bg-gradient-to-b from-primary-400 to-primary-600 text-white font-semibold rounded-lg shadow-[0_4px_0_0_rgba(20,111,225,0.5),0_6px_12px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_0_0_rgba(20,111,225,0.5),0_10px_16px_-4px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_0_rgba(20,111,225,0.5),0_2px_4px_-1px_rgba(0,0,0,0.2)] transition-all duration-100">
        Sign Up
      </button>
    </div>
  ),
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => (
    <div className="p-8 rounded-2xl bg-surface-900/50 backdrop-blur-sm border border-surface-700 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">3D TextField</h2>
        <p className="text-surface-400">Focus on inputs to see the 3D effect</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextField
          variant="default"
          label="Default"
          placeholder="Type here..."
        />
        <TextField
          variant="filled"
          label="Filled"
          placeholder="Type here..."
        />
        <TextField
          variant="outline"
          label="Outline"
          placeholder="Type here..."
        />
        <TextField
          variant="glass"
          label="Glass"
          placeholder="Type here..."
        />
      </div>

      <div className="pt-4 border-t border-surface-700">
        <h3 className="text-sm font-medium text-surface-300 mb-4">With Icons</h3>
        <div className="space-y-4">
          <TextField
            placeholder="Search anything..."
            leftElement={<SearchIcon />}
          />
          <TextField
            label="Email"
            placeholder="Enter email"
            leftElement={<MailIcon />}
            error="Invalid email format"
          />
        </div>
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

// TextArea Stories
export const TextAreaDefault: Story = {
  render: () => (
    <TextArea
      label="Message"
      placeholder="Enter your message..."
      helperText="Maximum 500 characters"
    />
  ),
};

export const TextAreaVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <TextArea
        variant="default"
        label="Default"
        placeholder="Default textarea..."
      />
      <TextArea
        variant="filled"
        label="Filled"
        placeholder="Filled textarea..."
      />
      <TextArea
        variant="outline"
        label="Outline"
        placeholder="Outline textarea..."
      />
      <TextArea
        variant="glass"
        label="Glass"
        placeholder="Glass textarea..."
      />
    </div>
  ),
  parameters: {
    backgrounds: { default: "gradient" },
  },
};

export const TextAreaWithError: Story = {
  render: () => (
    <TextArea
      label="Bio"
      placeholder="Tell us about yourself..."
      error="Bio is required"
      isRequired
    />
  ),
};

export const TextAreaResizable: Story = {
  render: () => (
    <TextArea
      label="Notes"
      placeholder="Add your notes here..."
      helperText="You can resize this textarea"
      resize
    />
  ),
};

