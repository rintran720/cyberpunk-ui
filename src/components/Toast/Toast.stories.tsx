import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ToastProvider, useToastAction } from "./Toast";
import { Button } from "../Button";

const meta: Meta = {
  title: "Components/Toast",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;

// Demo component to trigger toasts
const ToastDemo: React.FC<{ type?: "default" | "success" | "error" | "warning" | "info" }> = ({ type = "default" }) => {
  const { toast, success, error, warning, info } = useToastAction();

  const handleClick = () => {
    switch (type) {
      case "success":
        success("Success!", "Your changes have been saved.");
        break;
      case "error":
        error("Error!", "Something went wrong. Please try again.");
        break;
      case "warning":
        warning("Warning!", "Please review your input before continuing.");
        break;
      case "info":
        info("Info", "New update available. Refresh to see changes.");
        break;
      default:
        toast({
          title: "Notification",
          description: "This is a default toast message.",
        });
    }
  };

  return (
    <Button onClick={handleClick} variant={type === "default" ? "outline" : type === "success" ? "primary" : "destructive"}>
      Show {type} toast
    </Button>
  );
};

export const Default: StoryObj = {
  render: () => <ToastDemo />,
};

export const AllTypes: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ToastDemo type="default" />
      <ToastDemo type="success" />
      <ToastDemo type="error" />
      <ToastDemo type="warning" />
      <ToastDemo type="info" />
    </div>
  ),
};

export const WithAction: StoryObj = {
  render: () => {
    const ActionDemo = () => {
      const { toast } = useToastAction();

      return (
        <Button
          onClick={() =>
            toast({
              title: "File deleted",
              description: "The file has been moved to trash.",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo clicked"),
              },
            })
          }
        >
          Delete file
        </Button>
      );
    };

    return <ActionDemo />;
  },
};

export const CustomDuration: StoryObj = {
  render: () => {
    const DurationDemo = () => {
      const { toast } = useToastAction();

      return (
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() =>
              toast({
                title: "Quick toast",
                description: "This will disappear in 2 seconds",
                duration: 2000,
              })
            }
          >
            2s toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast({
                title: "Persistent toast",
                description: "This will stay for 10 seconds",
                duration: 10000,
              })
            }
          >
            10s toast
          </Button>
        </div>
      );
    };

    return <DurationDemo />;
  },
};

export const MultipleToasts: StoryObj = {
  render: () => {
    const MultiDemo = () => {
      const { success, error, warning, info } = useToastAction();
      let count = 0;

      const showMultiple = () => {
        count++;
        success(`Success #${count}`, "Operation completed");
        setTimeout(() => {
          count++;
          error(`Error #${count}`, "Something failed");
        }, 200);
        setTimeout(() => {
          count++;
          warning(`Warning #${count}`, "Check your input");
        }, 400);
        setTimeout(() => {
          count++;
          info(`Info #${count}`, "New information");
        }, 600);
      };

      return (
        <Button onClick={showMultiple}>
          Show multiple toasts
        </Button>
      );
    };

    return <MultiDemo />;
  },
};

// Different positions
export const TopRight: StoryObj = {
  decorators: [
    (Story) => (
      <ToastProvider position="top-right">
        <Story />
      </ToastProvider>
    ),
  ],
  render: () => {
    const Demo = () => {
      const { info } = useToastAction();
      return <Button onClick={() => info("Top Right", "Toast appears at top right")}>Show toast</Button>;
    };
    return <Demo />;
  },
};

export const TopCenter: StoryObj = {
  decorators: [
    (Story) => (
      <ToastProvider position="top-center">
        <Story />
      </ToastProvider>
    ),
  ],
  render: () => {
    const Demo = () => {
      const { info } = useToastAction();
      return <Button onClick={() => info("Top Center", "Toast appears at top center")}>Show toast</Button>;
    };
    return <Demo />;
  },
};

export const BottomLeft: StoryObj = {
  decorators: [
    (Story) => (
      <ToastProvider position="bottom-left">
        <Story />
      </ToastProvider>
    ),
  ],
  render: () => {
    const Demo = () => {
      const { info } = useToastAction();
      return <Button onClick={() => info("Bottom Left", "Toast appears at bottom left")}>Show toast</Button>;
    };
    return <Demo />;
  },
};

