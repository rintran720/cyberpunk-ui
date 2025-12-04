import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Rating } from "./Rating";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
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
  render: () => {
    const [value, setValue] = React.useState(0);

    return (
      <div className="space-y-4">
        <Rating value={value} onChange={setValue} />
        <p className="text-sm text-surface-400">
          Rating: <span className="text-primary-400">{value}</span>
        </p>
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => <Rating value={4} readOnly />,
};

export const ReadOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating value={5} readOnly />
      <Rating value={4} readOnly />
      <Rating value={3} readOnly />
      <Rating value={2} readOnly />
      <Rating value={1} readOnly />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating value={3} disabled />
      <Rating value={0} disabled />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-surface-400 mb-2">Primary</p>
        <Rating value={4} color="primary" readOnly />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Secondary</p>
        <Rating value={4} color="secondary" readOnly />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Accent</p>
        <Rating value={4} color="accent" readOnly />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Warning</p>
        <Rating value={4} color="warning" readOnly />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Success</p>
        <Rating value={4} color="success" readOnly />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-surface-400 mb-2">Small</p>
        <Rating value={4} size="sm" readOnly />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Medium (default)</p>
        <Rating value={4} size="md" readOnly />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Large</p>
        <Rating value={4} size="lg" readOnly />
      </div>
      <div>
        <p className="text-sm text-surface-400 mb-2">Extra Large</p>
        <Rating value={4} size="xl" readOnly />
      </div>
    </div>
  ),
};

export const HalfStars: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);

    return (
      <div className="space-y-4">
        <Rating value={value} onChange={setValue} allowHalf />
        <p className="text-sm text-surface-400">
          Rating: <span className="text-primary-400">{value}</span>
        </p>
      </div>
    );
  },
};

export const CustomMax: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);

    return (
      <div className="space-y-4">
        <Rating value={value} onChange={setValue} max={10} />
        <p className="text-sm text-surface-400">
          Rating: <span className="text-primary-400">{value} / 10</span>
        </p>
      </div>
    );
  },
};

export const ProductReview: Story = {
  render: () => {
    const [rating, setRating] = React.useState(0);
    const [hoverRating, setHoverRating] = React.useState(0);

    return (
      <div className="w-[400px] space-y-4 p-6 rounded-lg border border-surface-700 bg-surface-800">
        <h3 className="text-lg font-semibold text-surface-100">
          Rate this product
        </h3>
        <div className="space-y-2">
          <Rating
            value={rating}
            onChange={setRating}
            size="lg"
            color="warning"
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              const rect = target.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const starValue = Math.ceil((x / rect.width) * 5);
              setHoverRating(starValue);
            }}
            onMouseLeave={() => setHoverRating(0)}
          />
          {hoverRating > 0 && (
            <p className="text-sm text-surface-400">
              {hoverRating === 1
                ? "Poor"
                : hoverRating === 2
                ? "Fair"
                : hoverRating === 3
                ? "Good"
                : hoverRating === 4
                ? "Very Good"
                : "Excellent"}
            </p>
          )}
        </div>
        {rating > 0 && (
          <p className="text-sm text-surface-300">
            You rated this product {rating} out of 5 stars
          </p>
        )}
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-surface-200">
          Your Rating
        </label>
        <Rating value={value} onChange={setValue} />
        {value > 0 && (
          <p className="text-xs text-surface-400">
            Selected: {value} {value === 1 ? "star" : "stars"}
          </p>
        )}
      </div>
    );
  },
};

