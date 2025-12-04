import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./NavigationMenu";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../DropdownMenu";

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" active>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DropdownMenu>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <DropdownMenuItem>Alert Dialog</DropdownMenuItem>
              <DropdownMenuItem>Button</DropdownMenuItem>
              <DropdownMenuItem>Card</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Dialog</DropdownMenuItem>
              <DropdownMenuItem>Dropdown Menu</DropdownMenuItem>
            </NavigationMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DropdownMenu>
            <NavigationMenuTrigger>Examples</NavigationMenuTrigger>
            <NavigationMenuContent>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Forms</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Login Form</DropdownMenuItem>
                  <DropdownMenuItem>Signup Form</DropdownMenuItem>
                  <DropdownMenuItem>Contact Form</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </NavigationMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className="flex items-center gap-2">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DropdownMenu>
            <NavigationMenuTrigger className="flex items-center gap-2">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <DropdownMenuItem>All Products</DropdownMenuItem>
              <DropdownMenuItem>New Arrivals</DropdownMenuItem>
              <DropdownMenuItem>Best Sellers</DropdownMenuItem>
            </NavigationMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className="flex items-center gap-2">
            <svg
              className="h-4 w-4"
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
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const Simple: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Products</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const ECommerce: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" active>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DropdownMenu>
            <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
            <NavigationMenuContent>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Men</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Shirts</DropdownMenuItem>
                  <DropdownMenuItem>Pants</DropdownMenuItem>
                  <DropdownMenuItem>Shoes</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Women</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Dresses</DropdownMenuItem>
                  <DropdownMenuItem>Accessories</DropdownMenuItem>
                  <DropdownMenuItem>Bags</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sale</DropdownMenuItem>
              <DropdownMenuItem>New Arrivals</DropdownMenuItem>
            </NavigationMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const Documentation: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" active>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DropdownMenu>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <DropdownMenuItem>Button</DropdownMenuItem>
              <DropdownMenuItem>Input</DropdownMenuItem>
              <DropdownMenuItem>Card</DropdownMenuItem>
              <DropdownMenuItem>Dialog</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View All</DropdownMenuItem>
            </NavigationMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DropdownMenu>
            <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
            <NavigationMenuContent>
              <DropdownMenuItem>Getting Started</DropdownMenuItem>
              <DropdownMenuItem>Installation</DropdownMenuItem>
              <DropdownMenuItem>Theming</DropdownMenuItem>
              <DropdownMenuItem>Customization</DropdownMenuItem>
            </NavigationMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">API Reference</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Examples</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" active>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DropdownMenu>
            <NavigationMenuTrigger>
              Products
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-primary-500 text-white">
                New
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <DropdownMenuItem>
                All Products
                <span className="ml-auto text-xs text-surface-500">120</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Featured
                <span className="ml-auto text-xs text-surface-500">12</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Categories</DropdownMenuItem>
            </NavigationMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">
            Blog
            <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-accent-500 text-white">
              5
            </span>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Support</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const VerticalLayout: Story = {
  render: () => (
    <div className="w-[200px]">
      <NavigationMenu className="flex-col">
        <NavigationMenuList className="flex-col items-start gap-1">
          <NavigationMenuItem>
            <NavigationMenuLink href="#" active className="w-full">
              Dashboard
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className="w-full">
              Projects
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className="w-full">
              Team
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className="w-full">
              Settings
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};

export const WithActiveStates: Story = {
  render: () => {
    const [active, setActive] = React.useState("home");

    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              active={active === "home"}
              onClick={(e) => {
                e.preventDefault();
                setActive("home");
              }}
            >
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              active={active === "products"}
              onClick={(e) => {
                e.preventDefault();
                setActive("products");
              }}
            >
              Products
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              active={active === "about"}
              onClick={(e) => {
                e.preventDefault();
                setActive("about");
              }}
            >
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              active={active === "contact"}
              onClick={(e) => {
                e.preventDefault();
                setActive("contact");
              }}
            >
              Contact
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
};
