import type { Meta, StoryObj } from "@storybook/react";
import { Carousel, CarouselItem } from "./Carousel";
import { Card, CardContent } from "../Card";
import { Button } from "../Button";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    autoPlay: {
      control: { type: "number", min: 0, max: 5000, step: 500 },
      description: "Auto-play interval in milliseconds (0 to disable)",
    },
    loop: {
      control: "boolean",
      description: "Loop back to first slide after last",
    },
    showNavigation: {
      control: "boolean",
      description: "Show navigation buttons",
    },
    showDots: {
      control: "boolean",
      description: "Show dots indicator",
    },
    swipeable: {
      control: "boolean",
      description: "Enable touch/swipe",
    },
    keyboardNavigation: {
      control: "boolean",
      description: "Enable keyboard navigation",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <Carousel {...args}>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Slide 1
              </h3>
              <p className="text-surface-300">
                This is the first slide content.
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Slide 2
              </h3>
              <p className="text-surface-300">
                This is the second slide content.
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Slide 3
              </h3>
              <p className="text-surface-300">
                This is the third slide content.
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
      </Carousel>
    </div>
  ),
  args: {
    showNavigation: true,
    showDots: true,
    loop: true,
    swipeable: true,
    keyboardNavigation: true,
  },
};

export const WithImages: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <Carousel {...args}>
        <CarouselItem>
          <div className="w-full h-64 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold">
            Image 1
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="w-full h-64 bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center text-white text-2xl font-bold">
            Image 2
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="w-full h-64 bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-white text-2xl font-bold">
            Image 3
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="w-full h-64 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-2xl font-bold">
            Image 4
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  ),
  args: {
    showNavigation: true,
    showDots: true,
    loop: true,
    autoPlay: 3000,
  },
};

export const AutoPlay: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <Carousel {...args}>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center bg-gradient-to-br from-primary-500/20 to-primary-700/20">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Auto-playing Slide 1
              </h3>
              <p className="text-surface-300">
                This carousel auto-plays every 3 seconds.
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center bg-gradient-to-br from-secondary-500/20 to-secondary-700/20">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Auto-playing Slide 2
              </h3>
              <p className="text-surface-300">Hover to pause auto-play.</p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center bg-gradient-to-br from-accent-500/20 to-accent-700/20">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Auto-playing Slide 3
              </h3>
              <p className="text-surface-300">Navigate with buttons or dots.</p>
            </CardContent>
          </Card>
        </CarouselItem>
      </Carousel>
    </div>
  ),
  args: {
    autoPlay: 3000,
    showNavigation: true,
    showDots: true,
    loop: true,
  },
};

export const NoNavigation: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <Carousel {...args}>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Slide 1
              </h3>
              <p className="text-surface-300">Navigation buttons hidden.</p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Slide 2
              </h3>
              <p className="text-surface-300">Use dots or swipe to navigate.</p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Slide 3
              </h3>
              <p className="text-surface-300">
                Keyboard navigation still works.
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
      </Carousel>
    </div>
  ),
  args: {
    showNavigation: false,
    showDots: true,
    loop: true,
    keyboardNavigation: true,
  },
};

export const NoDots: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <Carousel {...args}>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Slide 1
              </h3>
              <p className="text-surface-300">Dots indicator hidden.</p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Slide 2
              </h3>
              <p className="text-surface-300">
                Use navigation buttons or swipe.
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Slide 3
              </h3>
              <p className="text-surface-300">
                Keyboard navigation still works.
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
      </Carousel>
    </div>
  ),
  args: {
    showNavigation: true,
    showDots: false,
    loop: true,
    keyboardNavigation: true,
  },
};

export const ComplexContent: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <Carousel {...args}>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-surface-100">
                  Product Feature 1
                </h3>
                <p className="text-surface-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <Button variant="primary" size="sm">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-surface-100">
                  Product Feature 2
                </h3>
                <p className="text-surface-300">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <Button variant="secondary" size="sm">
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-surface-100">
                  Product Feature 3
                </h3>
                <p className="text-surface-300">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
                <Button variant="accent" size="sm">
                  Explore
                </Button>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
      </Carousel>
    </div>
  ),
  args: {
    showNavigation: true,
    showDots: true,
    loop: true,
    autoPlay: 4000,
  },
};

export const Elevated: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <Carousel {...args}>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Elevated Variant
              </h3>
              <p className="text-surface-300">Deeper 3D shadow effect.</p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Slide 2
              </h3>
              <p className="text-surface-300">More pronounced depth.</p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="m-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-surface-100">
                Slide 3
              </h3>
              <p className="text-surface-300">Enhanced visual hierarchy.</p>
            </CardContent>
          </Card>
        </CarouselItem>
      </Carousel>
    </div>
  ),
  args: {
    variant: "elevated",
    showNavigation: true,
    showDots: true,
    loop: true,
  },
};
