import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#0f172a",
        },
        {
          name: "light",
          value: "#f8fafc",
        },
        {
          name: "gradient",
          value: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1a1a2e 100%)",
        },
      ],
    },
    layout: "centered",
  },
};

export default preview;

