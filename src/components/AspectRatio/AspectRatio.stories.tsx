import type { Meta, StoryObj } from "@storybook/react";
import {
  AspectRatio,
  ASPECT_VIDEO,
  ASPECT_STANDARD,
  ASPECT_SQUARE,
  ASPECT_ULTRAWIDE,
  ASPECT_PORTRAIT,
  ASPECT_PHOTO,
} from "./AspectRatio";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <div className="h-full w-full rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white font-medium shadow-3d">
          16:9 Video
        </div>
      </AspectRatio>
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div className="w-[400px]">
      <AspectRatio ratio={ASPECT_VIDEO}>
        <div className="h-full w-full rounded-lg overflow-hidden shadow-3d">
          <div className="w-full h-full bg-gradient-to-br from-surface-700 to-surface-800 flex items-center justify-center">
            <div className="text-center text-surface-400">
              <svg
                className="h-16 w-16 mx-auto mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">Image Placeholder</span>
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const CommonRatios: Story = {
  render: () => (
    <div className="space-y-6 w-[300px]">
      <div>
        <p className="text-sm text-surface-400 mb-2">16:9 (Video)</p>
        <AspectRatio ratio={ASPECT_VIDEO}>
          <div className="h-full w-full rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-400 shadow-3d-sm">
            16:9
          </div>
        </AspectRatio>
      </div>

      <div>
        <p className="text-sm text-surface-400 mb-2">4:3 (Standard)</p>
        <AspectRatio ratio={ASPECT_STANDARD}>
          <div className="h-full w-full rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-400 shadow-3d-sm">
            4:3
          </div>
        </AspectRatio>
      </div>

      <div>
        <p className="text-sm text-surface-400 mb-2">1:1 (Square)</p>
        <AspectRatio ratio={ASPECT_SQUARE}>
          <div className="h-full w-full rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-400 shadow-3d-sm">
            1:1
          </div>
        </AspectRatio>
      </div>

      <div>
        <p className="text-sm text-surface-400 mb-2">21:9 (Ultra-wide)</p>
        <AspectRatio ratio={ASPECT_ULTRAWIDE}>
          <div className="h-full w-full rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-400 shadow-3d-sm">
            21:9
          </div>
        </AspectRatio>
      </div>

      <div>
        <p className="text-sm text-surface-400 mb-2">3:2 (Photo)</p>
        <AspectRatio ratio={ASPECT_PHOTO}>
          <div className="h-full w-full rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-400 shadow-3d-sm">
            3:2
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
};

export const Portrait: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-[150px]">
        <p className="text-sm text-surface-400 mb-2">9:16 Portrait</p>
        <AspectRatio ratio={ASPECT_PORTRAIT}>
          <div className="h-full w-full rounded-lg bg-gradient-to-b from-primary-600 to-primary-800 flex items-center justify-center text-white shadow-3d">
            Story
          </div>
        </AspectRatio>
      </div>
      <div className="w-[150px]">
        <p className="text-sm text-surface-400 mb-2">2:3 Photo</p>
        <AspectRatio ratio={2 / 3}>
          <div className="h-full w-full rounded-lg bg-gradient-to-b from-accent-600 to-accent-800 flex items-center justify-center text-white shadow-3d">
            Photo
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
};

export const VideoEmbed: Story = {
  render: () => (
    <div className="w-[500px]">
      <AspectRatio ratio={ASPECT_VIDEO}>
        <div className="h-full w-full rounded-lg overflow-hidden bg-black shadow-3d-lg relative">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-800 to-surface-900 flex items-center justify-center">
            <button className="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors">
              <svg
                className="h-10 w-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white font-medium">Video Title</p>
            <p className="text-white/60 text-sm">3:45 • 1.2M views</p>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const ImageCard: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg overflow-hidden bg-surface-800 border border-surface-700 shadow-3d">
      <AspectRatio ratio={ASPECT_PHOTO}>
        <div className="h-full w-full bg-gradient-to-br from-primary-900/50 to-accent-900/50 flex items-center justify-center">
          <svg
            className="h-12 w-12 text-surface-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </AspectRatio>
      <div className="p-4">
        <h3 className="font-semibold text-surface-100">Beautiful Landscape</h3>
        <p className="text-sm text-surface-400 mt-1">
          A stunning mountain view captured at sunset.
        </p>
        <div className="flex items-center gap-2 mt-3 text-xs text-surface-500">
          <span>📍 Switzerland</span>
          <span>•</span>
          <span>Dec 2024</span>
        </div>
      </div>
    </div>
  ),
};

export const ImageGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-2 w-[400px]">
      {Array.from({ length: 9 }).map((_, i) => (
        <AspectRatio key={i} ratio={ASPECT_SQUARE}>
          <div
            className={`h-full w-full rounded-lg flex items-center justify-center text-white font-medium ${
              i % 3 === 0
                ? "bg-primary-600"
                : i % 3 === 1
                ? "bg-accent-600"
                : "bg-secondary-600"
            }`}
          >
            {i + 1}
          </div>
        </AspectRatio>
      ))}
    </div>
  ),
};

export const CustomRatio: Story = {
  render: () => (
    <div className="w-[300px]">
      <p className="text-sm text-surface-400 mb-2">Custom ratio: 2.35:1 (Cinemascope)</p>
      <AspectRatio ratio={2.35}>
        <div className="h-full w-full rounded-lg bg-black flex items-center justify-center text-surface-400 shadow-3d">
          <span className="text-sm">2.35:1 Cinemascope</span>
        </div>
      </AspectRatio>
    </div>
  ),
};

