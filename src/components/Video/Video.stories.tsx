import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Video } from "./Video";

const meta: Meta<typeof Video> = {
  title: "Components/Video",
  component: Video,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    showControls: {
      control: "boolean",
      description: "Show video controls",
    },
    autoHideControls: {
      control: { type: "number", min: 0, max: 10000, step: 500 },
      description: "Auto-hide controls after inactivity (ms, 0 to disable)",
    },
    showLoading: {
      control: "boolean",
      description: "Show loading spinner",
    },
    customControls: {
      control: "boolean",
      description: "Use custom 3D styled controls",
    },
    variant: {
      control: "select",
      options: ["default", "elevated"],
      description: "Video container variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[800px]">
      <Video
        {...args}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
    </div>
  ),
  args: {
    showControls: true,
    customControls: true,
    autoHideControls: 3000,
    showLoading: true,
    variant: "default",
  },
};

export const Elevated: Story = {
  render: (args) => (
    <div className="w-[800px]">
      <Video
        {...args}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
    </div>
  ),
  args: {
    showControls: true,
    customControls: true,
    autoHideControls: 3000,
    showLoading: true,
    variant: "elevated",
  },
};

export const NoAutoHide: Story = {
  render: (args) => (
    <div className="w-[800px]">
      <Video
        {...args}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
    </div>
  ),
  args: {
    showControls: true,
    customControls: true,
    autoHideControls: 0,
    showLoading: true,
  },
};

export const NativeControls: Story = {
  render: (args) => (
    <div className="w-[800px]">
      <Video
        {...args}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
    </div>
  ),
  args: {
    showControls: true,
    customControls: false,
    showLoading: false,
  },
};

export const NoControls: Story = {
  render: (args) => (
    <div className="w-[800px]">
      <Video
        {...args}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
    </div>
  ),
  args: {
    showControls: false,
    customControls: false,
    showLoading: true,
  },
};

export const Autoplay: Story = {
  render: (args) => (
    <div className="w-[800px]">
      <Video
        {...args}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        autoPlay
        muted
      />
    </div>
  ),
  args: {
    showControls: true,
    customControls: true,
    autoHideControls: 3000,
    showLoading: true,
  },
};

export const Loop: Story = {
  render: (args) => (
    <div className="w-[800px]">
      <Video
        {...args}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        loop
      />
    </div>
  ),
  args: {
    showControls: true,
    customControls: true,
    autoHideControls: 3000,
    showLoading: true,
  },
};

export const WithCallbacks: Story = {
  render: (args) => {
    const [timeInfo, setTimeInfo] = React.useState({ current: 0, total: 0 });
    const [ready, setReady] = React.useState(false);

    return (
      <div className="w-[800px] space-y-4">
        <Video
          {...args}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          onTimeUpdate={(current, total) => {
            setTimeInfo({ current, total });
          }}
          onReady={(duration) => {
            setReady(true);
            console.log("Video ready, duration:", duration);
          }}
        />
        <div className="p-4 bg-surface-800 rounded-lg border border-surface-700">
          <p className="text-surface-300 text-sm">
            Status: {ready ? "Ready" : "Loading..."}
          </p>
          <p className="text-surface-300 text-sm">
            Progress: {((timeInfo.current / timeInfo.total) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    );
  },
  args: {
    showControls: true,
    customControls: true,
    autoHideControls: 3000,
    showLoading: true,
  },
};

export const WithChapters: Story = {
  render: (args) => {
    const chapters = [
      {
        startTime: 0,
        endTime: 30,
        label: "Introduction",
        color: "rgb(59, 130, 246)", // blue-500
      },
      {
        startTime: 30,
        endTime: 90,
        label: "Main Content",
        color: "rgb(34, 197, 94)", // green-500
      },
      {
        startTime: 90,
        endTime: 150,
        label: "Examples",
        color: "rgb(234, 179, 8)", // yellow-500
      },
      {
        startTime: 150,
        endTime: -1,
        label: "Conclusion",
        color: "rgb(239, 68, 68)", // red-500
      },
    ];

    return (
      <div className="w-[800px] space-y-4">
        <Video
          {...args}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          chapters={chapters}
          onChapterClick={(chapter) => {
            console.log("Chapter clicked:", chapter.label);
          }}
        />
        <div className="p-4 bg-surface-800 rounded-lg border border-surface-700">
          <p className="text-surface-100 font-semibold mb-2">Chapters:</p>
          <div className="flex flex-wrap gap-2">
            {chapters.map((chapter, index) => (
              <button
                key={index}
                className="px-3 py-1 rounded text-sm text-surface-100 border border-surface-600 hover:bg-surface-700 transition-colors"
                style={{ borderColor: chapter.color }}
                onClick={() => {
                  const video = document.querySelector("video");
                  if (video) {
                    video.currentTime = chapter.startTime;
                  }
                }}
              >
                {chapter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
  args: {
    showControls: true,
    customControls: true,
    autoHideControls: 3000,
    showLoading: true,
  },
};

export const WithColoredChapters: Story = {
  render: (args) => {
    const chapters = [
      {
        startTime: 0,
        endTime: 20,
        label: "Part 1",
        color: "rgb(147, 51, 234)", // purple-600
      },
      {
        startTime: 20,
        endTime: 40,
        label: "Part 2",
        color: "rgb(236, 72, 153)", // pink-500
      },
      {
        startTime: 40,
        endTime: 60,
        label: "Part 3",
        color: "rgb(20, 184, 166)", // teal-500
      },
    ];

    return (
      <div className="w-[800px]">
        <Video
          {...args}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          chapters={chapters}
        />
      </div>
    );
  },
  args: {
    showControls: true,
    customControls: true,
    autoHideControls: 3000,
    showLoading: true,
  },
};

export const HLSStream: Story = {
  render: (args) => (
    <div className="w-[800px]">
      <Video
        {...args}
        src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      />
    </div>
  ),
  args: {
    showControls: true,
    customControls: true,
    autoHideControls: 3000,
  },
  parameters: {
    docs: {
      description: {
        story:
          "HLS streaming support. Requires hls.js to be installed: `npm install hls.js`. Falls back to native player on Safari.",
      },
    },
  },
};
