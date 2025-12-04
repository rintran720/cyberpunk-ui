import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "./Form";
import { TextField, TextArea } from "../TextField";
import { Button } from "../Button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../Select";
import { DatePicker } from "../DatePicker";

const meta = {
  title: "Components/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "inline"],
    },
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as any,
  render: (args) => (
    <div className="w-96">
      <Form
        {...args}
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submitted");
        }}
      >
        <FormItem>
          <FormLabel required>Email</FormLabel>
          <TextField
            type="email"
            placeholder="you@example.com"
            required
            fullWidth
          />
          <FormMessage name="email" />
        </FormItem>

        <FormItem>
          <FormLabel>Password</FormLabel>
          <TextField
            type="password"
            placeholder="Enter your password"
            fullWidth
          />
          <FormDescription>Must be at least 8 characters long</FormDescription>
        </FormItem>

        <FormItem>
          <FormLabel required>Message</FormLabel>
          <TextArea placeholder="Enter your message..." rows={4} fullWidth />
          <FormMessage name="message" />
        </FormItem>

        <div className="flex gap-2 mt-6">
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button type="button" variant="ghost">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  ),
};

export const Inline: Story = {
  args: {
    variant: "inline",
  } as any,
  render: (args) => (
    <div className="w-full max-w-2xl">
      <Form
        {...args}
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submitted");
        }}
      >
        <FormItem variant="inline">
          <FormLabel>Search</FormLabel>
          <TextField placeholder="Search..." />
        </FormItem>

        <FormItem variant="inline">
          <FormLabel>Category</FormLabel>
          <Select defaultValue="">
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem variant="inline">
          <Button type="submit" variant="primary">
            Search
          </Button>
        </FormItem>
      </Form>
    </div>
  ),
};

export const WithValidation: Story = {
  args: {} as any,
  render: (args) => {
    const [errors, setErrors] = useState<Record<string, any>>({});

    const validate = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newErrors: Record<string, any> = {};

      const email = formData.get("email") as string;
      if (!email) {
        newErrors.email = { message: "Email is required" };
      } else if (!email.includes("@")) {
        newErrors.email = { message: "Invalid email format" };
      }

      const password = formData.get("password") as string;
      if (!password) {
        newErrors.password = { message: "Password is required" };
      } else if (password.length < 8) {
        newErrors.password = {
          message: "Password must be at least 8 characters",
        };
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        console.log("Form is valid!");
      }
    };

    return (
      <div className="w-96">
        <Form {...args} onSubmit={validate}>
          <FormItem name="email">
            <FormLabel required>Email</FormLabel>
            <TextField
              name="email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              fullWidth
            />
            <FormMessage name="email" />
          </FormItem>

          <FormItem name="password">
            <FormLabel required>Password</FormLabel>
            <TextField
              name="password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              fullWidth
            />
            <FormMessage name="password" />
          </FormItem>

          <div className="flex gap-2 mt-6">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  },
};

export const ComplexForm: Story = {
  args: {} as any,
  render: (args) => (
    <div className="w-96">
      <Form
        {...args}
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submitted");
        }}
      >
        <FormItem>
          <FormLabel required>Full Name</FormLabel>
          <TextField placeholder="John Doe" required fullWidth />
          <FormMessage name="name" />
        </FormItem>

        <FormItem>
          <FormLabel required>Email</FormLabel>
          <TextField
            type="email"
            placeholder="you@example.com"
            required
            fullWidth
          />
          <FormMessage name="email" />
        </FormItem>

        <FormItem>
          <FormLabel>Date of Birth</FormLabel>
          <DatePicker placeholder="Select date" />
          <FormDescription>We'll use this to verify your age</FormDescription>
        </FormItem>

        <FormItem>
          <FormLabel>Country</FormLabel>
          <Select defaultValue="">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem>
          <FormLabel>Bio</FormLabel>
          <TextArea
            placeholder="Tell us about yourself..."
            rows={4}
            fullWidth
          />
          <FormDescription>Maximum 500 characters</FormDescription>
        </FormItem>

        <div className="flex gap-2 mt-6">
          <Button type="submit" variant="primary">
            Create Account
          </Button>
          <Button type="button" variant="ghost">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  ),
};

// Note: For react-hook-form integration, you would use it like this:
/*
import { useForm } from "react-hook-form";

export const WithReactHookForm: Story = {
  render: (args) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
      <Form formMethods={{ register, formState: { errors } }} onSubmit={handleSubmit((data) => {
        console.log("Form data:", data);
      })}>
        <FormItem name="email">
          <FormLabel required>Email</FormLabel>
          <TextField {...register("email", { required: "Email is required" })} />
          <FormMessage name="email" />
        </FormItem>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};
*/
