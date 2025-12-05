<div align="center">

# @votekio/cyberpunk-ui

3D-styled UI component library for React. Built with TailwindCSS, inspired by shadcn/ui but with a unique 3D look - depth, shadows, and press effects.

[![npm version](https://img.shields.io/npm/v/@votekio/cyberpunk-ui.svg)](https://www.npmjs.com/package/@votekio/cyberpunk-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[🌐 Live Demo](https://cyberpunk-ui-tawny.vercel.app/) • [📦 npm](https://www.npmjs.com/package/@votekio/cyberpunk-ui) • [📖 GitHub](https://github.com/rintran720/cyberpunk-ui) • [☕ Buy Me a Coffee](https://buymeacoffee.com/rintran720)

</div>

---

## Author

**John Tran**

- Email: [rintran720@gmail.com](mailto:rintran720@gmail.com)
- GitHub: [@rintran720](https://github.com/rintran720)
- Support: [Buy Me a Coffee](https://buymeacoffee.com/rintran720)

If you find this useful, consider supporting the project!

## ✨ Features

- 🎨 **3D Visual Effects** - Realistic depth and shadow effects
- 🖱️ **Interactive Feedback** - Press animations and hover states
- 🌈 **Multiple Variants** - Primary, Secondary, Accent, Ghost, Danger, Glass
- 📏 **Flexible Sizes** - SM, MD, LG, XL, and Icon sizes
- 🎛️ **Customizable Depth** - Flat, Shallow, Normal, Deep options
- ✨ **Glow Effects** - Optional glow on hover
- ♿ **Accessible** - Keyboard navigation and focus states
- 🎨 **CSS Variables** - Customize colors via CSS variables
- 🖥️ **SSR Support** - Works with Next.js, Remix, Gatsby, etc.
- 📖 **Storybook** - Interactive documentation and playground

## Components

| Component          | Description                                 |
| ------------------ | ------------------------------------------- |
| **Button**         | 3D buttons with press effects               |
| **Accordion**      | Collapsible sections                        |
| **Dialog**         | Modal dialogs with portal                   |
| **Alert**          | Alert messages with icons                   |
| **TextField**      | Text inputs with 3D styling                 |
| **TextArea**       | Multiline text inputs                       |
| **Badge**          | Status badges and labels                    |
| **Card**           | Container cards with 3D effects             |
| **Switch**         | Toggle switches                             |
| **Checkbox**       | Checkbox inputs                             |
| **Tabs**           | Tab navigation                              |
| **Select**         | Dropdown select menus                       |
| **Progress**       | Linear and circular progress indicators     |
| **Avatar**         | User avatars with status indicators         |
| **Skeleton**       | Loading placeholders                        |
| **Tooltip**        | Hover tooltips                              |
| **Slider**         | Range sliders                               |
| **RadioGroup**     | Radio button groups                         |
| **Toast**          | Toast notifications                         |
| **DropdownMenu**   | Context menus and dropdowns                 |
| **Separator**      | Visual dividers                             |
| **Label**          | Form labels                                 |
| **Toggle**         | Toggle buttons                              |
| **Popover**        | Popover dialogs                             |
| **Sheet**          | Side sheets and drawers                     |
| **Collapsible**    | Collapsible content sections                |
| **HoverCard**      | Hover-triggered cards                       |
| **ScrollArea**     | Custom scrollable areas                     |
| **AspectRatio**    | Maintain aspect ratios                      |
| **Breadcrumb**     | Navigation breadcrumbs                      |
| **Command**        | Command palette and search                  |
| **Menubar**        | Application menu bars                       |
| **NavigationMenu** | Navigation menus with dropdowns             |
| **Table**          | Data tables                                 |
| **Pagination**     | Page navigation                             |
| **Calendar**       | Date calendar picker                        |
| **DatePicker**     | Date input with calendar                    |
| **TimePicker**     | Time selection with hours, minutes, seconds |
| **TimezonePicker** | Timezone selection with offset display      |
| **DateTimePicker** | Combined date and time picker               |
| **Form**           | Form components and validation              |
| **Grid**           | Responsive grid layout system               |
| **FileUpload**     | File upload with drag & drop support        |
| **Rating**         | Star rating component (1-5 stars)           |
| **BarChart**       | 3D bar charts with gradients                |
| **LineChart**      | Line charts with smooth curves              |
| **PieChart**       | Pie and donut charts                        |
| **AreaChart**      | Area charts with gradients                  |
| **ScatterChart**   | Scatter plots for correlation analysis      |
| **RadarChart**     | Radar/spider charts for comparisons         |
| **ComposedChart**  | Combined bar, line, and area charts         |
| **GaugeChart**     | Gauge/speedometer charts for metrics        |

## Getting Started

### Install

```bash
npm install @votekio/cyberpunk-ui
# or
yarn add @votekio/cyberpunk-ui
# or
pnpm add @votekio/cyberpunk-ui
```

### Setup TailwindCSS

Add to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    // ... your paths
    "./node_modules/@votekio/cyberpunk-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest
};
```

### Import Styles

```tsx
import "@votekio/cyberpunk-ui/dist/styles.css";
```

### Use Components

```tsx
import { Button } from "@votekio/cyberpunk-ui";

function App() {
  return (
    <Button variant="primary" size="lg">
      Click Me!
    </Button>
  );
}
```

## Color System

Uses CSS variables for colors. Set them directly in your CSS.

### Using Theme Classes

Add class or data attribute to `<html>`:

```html
<!-- Using class -->
<html class="theme-dark">
  <!-- Or data attribute -->
  <html data-theme="dark"></html>
</html>
```

### Available Themes

- `theme-dark` / `data-theme="dark"` - Dark (default)
- `theme-light` / `data-theme="light"` - Light
- `theme-ocean` / `data-theme="ocean"` - Cyan/teal
- `theme-sunset` / `data-theme="sunset"` - Orange/pink
- `theme-forest` / `data-theme="forest"` - Green

### Customize Colors

Override CSS variables in your CSS:

```css
/* Override single color */
:root {
  --color-primary-500: #ef4444;
}

/* Full color palette override */
:root {
  --color-primary-50: #fef2f2;
  --color-primary-100: #fee2e2;
  --color-primary-200: #fecaca;
  --color-primary-300: #fca5a5;
  --color-primary-400: #f87171;
  --color-primary-500: #ef4444;
  --color-primary-600: #dc2626;
  --color-primary-700: #b91c1c;
  --color-primary-800: #991b1b;
  --color-primary-900: #7f1d1d;
  --color-primary-950: #450a0a;

  --color-secondary-500: #8b5cf6;
  --color-accent-500: #14b8a6;
}
```

All colors are controlled via CSS variables - no JavaScript needed.

## SSR Support

Works with Next.js, Remix, Gatsby, etc.

### SSR Utilities

```tsx
import {
  isBrowser,
  isServer,
  useIsMounted,
  useLocalStorage,
  useWindowSize,
  usePrefersDarkMode,
} from "@votekio/cyberpunk-ui";

// Check environment
if (isBrowser) {
  // client-side only
}

// Check if mounted
function MyComponent() {
  const isMounted = useIsMounted();

  if (!isMounted) return <Skeleton />;

  return <div>{window.innerWidth}</div>;
}

// Safe localStorage
const [value, setValue] = useLocalStorage("key", "default");

// Window size (SSR-safe)
const { width, height } = useWindowSize();

// Dark mode preference
const prefersDark = usePrefersDarkMode();
```

### Next.js App Router

No special setup needed. Just import styles and use components. Colors are controlled via CSS variables.

## Component Examples

### Button

```tsx
import { Button } from "@votekio/cyberpunk-ui";

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="glass">Glass</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<Icon />}>Download</Button>

// Loading state
<Button isLoading>Loading</Button>
```

### TextField

```tsx
import { TextField, TextArea } from "@votekio/cyberpunk-ui";

<TextField
  label="Email"
  placeholder="you@example.com"
  leftElement={<MailIcon />}
  helperText="We'll never share your email"
  fullWidth
/>

<TextField
  label="Password"
  error="Password is required"
  isRequired
/>

<TextArea
  label="Message"
  placeholder="Enter your message..."
  resize
/>
```

### Dialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@votekio/cyberpunk-ui";

<Dialog>
  <DialogTrigger>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description here.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

### Alert

```tsx
import { Alert, AlertTitle, AlertDescription } from "@votekio/cyberpunk-ui";

<Alert variant="info">
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>This is an info alert.</AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Operation completed.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Please check your input.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

### Accordion

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@votekio/cyberpunk-ui";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content for section 2</AccordionContent>
  </AccordionItem>
</Accordion>;
```

### Calendar & DatePicker

```tsx
import { Calendar, DatePicker } from "@votekio/cyberpunk-ui";

// Calendar
<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  showNavigation
/>

// DatePicker
<DatePicker
  label="Select Date"
  value={date}
  onChange={setDate}
  placeholder="Pick a date"
/>
```

### TimePicker, TimezonePicker & DateTimePicker

```tsx
import { TimePicker, TimezonePicker, DateTimePicker } from "@votekio/cyberpunk-ui";

// TimePicker
<TimePicker
  label="Select Time"
  value={time}
  onChange={setTime}
  format="24h"
  showSeconds
/>

// TimezonePicker
<TimezonePicker
  label="Select Timezone"
  value={timezone}
  onChange={setTimezone}
  priorityTimezones={[
    { value: "America/New_York", label: "Eastern Time" },
    { value: "America/Los_Angeles", label: "Pacific Time" },
  ]}
/>

// DateTimePicker
<DateTimePicker
  label="Select Date & Time"
  value={dateTime}
  onChange={setDateTime}
  format="24h"
  showSeconds
/>
```

### Grid

```tsx
import { Grid, GridItem } from "@votekio/cyberpunk-ui";

<Grid cols={12} gap={4}>
  <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
    <Card>Item 1</Card>
  </GridItem>
  <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
    <Card>Item 2</Card>
  </GridItem>
  <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
    <Card>Item 3</Card>
  </GridItem>
</Grid>;
```

### FileUpload

```tsx
import { FileUpload } from "@votekio/cyberpunk-ui";

<FileUpload
  label="Upload Files"
  value={files}
  onChange={setFiles}
  multiple
  accept="image/*"
  maxSize={5 * 1024 * 1024} // 5MB
  maxFiles={5}
/>;
```

### Rating

```tsx
import { Rating } from "@votekio/cyberpunk-ui";

<Rating
  value={rating}
  onChange={setRating}
  max={5}
  allowHalf
  color="primary"
  size="lg"
/>;
```

### Form

```tsx
import {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
  TextField,
  Button,
} from "@votekio/cyberpunk-ui";

<Form onSubmit={handleSubmit}>
  <FormField name="email">
    <FormItem>
      <FormLabel>Email</FormLabel>
      <TextField type="email" placeholder="you@example.com" />
      <FormMessage />
    </FormItem>
  </FormField>
  <Button type="submit">Submit</Button>
</Form>;
```

### Pagination

```tsx
import { Pagination } from "@votekio/cyberpunk-ui";

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={setPage}
  showFirstLast
  showPrevNext
/>;
```

### Select

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@votekio/cyberpunk-ui";

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>;
```

### DropdownMenu

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@votekio/cyberpunk-ui";

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

### Charts

```tsx
import { BarChart, LineChart, PieChart, AreaChart } from "@votekio/cyberpunk-ui";

// BarChart
<BarChart
  title="Sales Overview"
  data={[
    { label: "Jan", value: 120, color: "primary" },
    { label: "Feb", value: 190, color: "secondary" },
    { label: "Mar", value: 300, color: "accent" },
  ]}
  showGrid
  showLabels
/>

// LineChart
<LineChart
  title="User Growth"
  series={[
    {
      name: "Users",
      color: "primary",
      data: [
        { label: "Jan", value: 100 },
        { label: "Feb", value: 150 },
        { label: "Mar", value: 200 },
      ],
    },
  ]}
  showGrid
  showDots
  curve="smooth"
/>

// PieChart
<PieChart
  title="Market Share"
  data={[
    { label: "Desktop", value: 45, color: "primary" },
    { label: "Mobile", value: 30, color: "secondary" },
    { label: "Tablet", value: 15, color: "accent" },
  ]}
  showLabels
  showLegend
/>

// AreaChart
<AreaChart
  title="Revenue Trend"
  series={[
    {
      name: "Revenue",
      color: "primary",
      data: [
        { label: "Jan", value: 10000 },
        { label: "Feb", value: 15000 },
        { label: "Mar", value: 12000 },
      ],
    },
  ]}
  showGrid
  curve="smooth"
/>
```

### ScatterChart

```tsx
import { ScatterChart } from "@votekio/cyberpunk-ui";

<ScatterChart
  title="Sales vs Marketing"
  xAxisLabel="Marketing Spend"
  yAxisLabel="Sales"
  series={[
    {
      name: "Data",
      color: "primary",
      data: [
        { x: 1000, y: 5000 },
        { x: 2000, y: 8000 },
        { x: 3000, y: 12000 },
      ],
    },
  ]}
  showGrid
/>;
```

### RadarChart

```tsx
import { RadarChart } from "@votekio/cyberpunk-ui";

<RadarChart
  title="Performance Metrics"
  series={[
    {
      name: "Product A",
      color: "primary",
      data: [
        { label: "Speed", value: 80 },
        { label: "Quality", value: 90 },
        { label: "Price", value: 70 },
      ],
    },
  ]}
  showGrid
  showArea
/>;
```

### ComposedChart

```tsx
import { ComposedChart } from "@votekio/cyberpunk-ui";

<ComposedChart
  title="Revenue Analysis"
  data={[
    { label: "Jan", barValue: 12000, lineValue: 8000, areaValue: 4000 },
    { label: "Feb", barValue: 15000, lineValue: 9000, areaValue: 6000 },
  ]}
  showGrid
  barColor="primary"
  lineColor="secondary"
  areaColor="accent"
/>;
```

### GaugeChart

```tsx
import { GaugeChart } from "@votekio/cyberpunk-ui";

// Basic gauge
<GaugeChart
  title="CPU Usage"
  value={75}
  min={0}
  max={100}
  unit="%"
  color="primary"
/>

// Custom range
<GaugeChart
  title="Temperature"
  value={22}
  min={0}
  max={40}
  unit="°C"
  color="warning"
/>

// Full circle gauge
<GaugeChart
  title="Progress"
  value={270}
  min={0}
  max={360}
  type="full"
  color="success"
/>
```

## Development

```bash
# Install
npm install

# Start Storybook
npm run dev

# Build library
npm run build

# Build Storybook
npm run build:storybook
```

## Deployment

### Deploy to Vercel

Project is set up to deploy Storybook to Vercel.

**Option 1: Vercel CLI**

```bash
npm i -g vercel
vercel
```

**Option 2: Vercel Dashboard**

1. Push to GitHub/GitLab/Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Add New Project
4. Import repo
5. Vercel auto-detects `vercel.json`
6. Deploy

`vercel.json` is configured with:

- Build: `npm run build:storybook`
- Output: `storybook-static`
- Framework: Static Site

**Manual Build**

```bash
npm run build:storybook
# Output in storybook-static/
```

### Publish to npm

**Prerequisites**

1. Create npm account at [npmjs.com](https://www.npmjs.com/)
2. Login: `npm login`

**Build & Publish**

```bash
# Build (copies CSS too)
npm run build

# Check output
ls dist/

# Publish (runs prepublishOnly automatically)
npm publish

# For scoped packages
npm publish --access public
```

**Version Management**

```bash
npm version patch   # 0.1.0 -> 0.1.1
npm version minor   # 0.1.0 -> 0.2.0
npm version major   # 0.1.0 -> 1.0.0

npm publish --access public
```

**What Gets Published**

Included:

- `dist/` - JS, TS defs, CSS
- `README.md`
- `package.json`

Excluded (via `.npmignore`):

- `src/`
- Storybook files
- Dev configs
- Tests

**After Publishing**

```bash
npm install @votekio/cyberpunk-ui
```

```tsx
import { Button } from "@votekio/cyberpunk-ui";
import "@votekio/cyberpunk-ui/styles/globals.css";
```

## Support

If this helped you, consider:

- ⭐ Star the repo
- 🐛 Report bugs or suggest features
- 💬 Share with others
- ☕ [Buy me a coffee](https://buymeacoffee.com/rintran720)

Thanks! 🙏

## License

MIT © [John Tran](https://github.com/rintran720)

---

<div align="center">

Made with ❤️ by [John Tran](https://github.com/rintran720)

[☕ Buy Me a Coffee](https://buymeacoffee.com/rintran720) • [📖 Docs](https://cyberpunk-ui-tawny.vercel.app/) • [🐛 Report Bug](https://github.com/rintran720/cyberpunk-ui/issues)

</div>
