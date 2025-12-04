import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./Sheet";
import { Button } from "../Button";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-surface-200">Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full h-10 px-3 rounded-lg bg-surface-900 border border-surface-600 text-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-surface-200">Username</label>
            <input
              type="text"
              defaultValue="@johndoe"
              className="w-full h-10 px-3 rounded-lg bg-surface-900 border border-surface-600 text-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Browse through different sections of the app.
          </SheetDescription>
        </SheetHeader>
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {["Dashboard", "Projects", "Team", "Settings", "Help"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block px-4 py-2 text-surface-300 hover:bg-surface-700 rounded-md transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

export const TopSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-[200px]">
        <div className="max-w-2xl mx-auto p-6">
          <SheetTitle className="text-center">Announcement</SheetTitle>
          <p className="text-center text-surface-400 mt-2">
            We've released a new version of our app with exciting features!
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <SheetClose asChild>
              <Button variant="outline">Maybe Later</Button>
            </SheetClose>
            <Button>Learn More</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const BottomSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[300px]">
        <div className="max-w-2xl mx-auto p-6">
          <SheetTitle className="text-center">Share</SheetTitle>
          <p className="text-center text-surface-400 mt-2">
            Share this content with your friends
          </p>
          <div className="flex justify-center gap-4 mt-6">
            {[
              { name: "Twitter", color: "bg-blue-500" },
              { name: "Facebook", color: "bg-blue-600" },
              { name: "LinkedIn", color: "bg-blue-700" },
              { name: "Copy Link", color: "bg-surface-600" },
            ].map((social) => (
              <button
                key={social.name}
                className={`${social.color} px-4 py-2 rounded-lg text-white text-sm hover:opacity-90 transition-opacity`}
              >
                {social.name}
              </button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Right</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Sheet</SheetTitle>
            <SheetDescription>This sheet opens from the right side.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Sheet</SheetTitle>
            <SheetDescription>This sheet opens from the left side.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Top</Button>
        </SheetTrigger>
        <SheetContent side="top" className="h-[200px]">
          <div className="max-w-2xl mx-auto p-6">
            <SheetTitle className="text-center">Top Sheet</SheetTitle>
            <SheetDescription className="text-center">
              This sheet opens from the top.
            </SheetDescription>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[200px]">
          <div className="max-w-2xl mx-auto p-6">
            <SheetTitle className="text-center">Bottom Sheet</SheetTitle>
            <SheetDescription className="text-center">
              This sheet opens from the bottom.
            </SheetDescription>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  ),
};

export const ShoppingCart: Story = {
  render: () => {
    const cartItems = [
      { id: 1, name: "Product 1", price: 29.99, quantity: 2 },
      { id: 2, name: "Product 2", price: 49.99, quantity: 1 },
      { id: 3, name: "Product 3", price: 19.99, quantity: 3 },
    ];
    
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart ({cartItems.length})
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>
              You have {cartItems.length} items in your cart
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-surface-900 border border-surface-700"
                >
                  <div className="w-16 h-16 rounded-md bg-surface-700 flex items-center justify-center text-surface-400 text-xs">
                    Image
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-surface-200">{item.name}</h4>
                    <p className="text-sm text-surface-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-primary-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 border-t border-surface-700">
            <div className="flex justify-between mb-4">
              <span className="text-surface-300">Subtotal</span>
              <span className="font-medium text-surface-100">${total.toFixed(2)}</span>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
            Open
          </Button>
          <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Controlled Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Controlled Sheet</SheetTitle>
              <SheetDescription>
                This sheet's state is controlled externally.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <p className="text-sm text-surface-400">
          State: <span className="text-primary-400">{open ? "open" : "closed"}</span>
        </p>
      </div>
    );
  },
};

