import type { Meta, StoryObj } from "@storybook/react";
import { Grid, GridItem } from "./Grid";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../Card";
import { Button } from "../Button";
import { Badge } from "../Badge";
import { Avatar, AvatarFallback } from "../Avatar";
import { LineChart } from "../Chart";
import { Separator } from "../Separator";
import { TextField } from "../TextField";
import { Label } from "../Label";
import { DatePicker } from "../DatePicker";

const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Grid>;

// ============================================================================
// Basic Grid Examples
// ============================================================================

export const GridDefault: Story = {
  render: () => (
    <Grid cols={3} gap={4}>
      <GridItem>
        <Card padding="md">
          <div className="text-surface-100">Item 1</div>
        </Card>
      </GridItem>
      <GridItem>
        <Card padding="md">
          <div className="text-surface-100">Item 2</div>
        </Card>
      </GridItem>
      <GridItem>
        <Card padding="md">
          <div className="text-surface-100">Item 3</div>
        </Card>
      </GridItem>
      <GridItem>
        <Card padding="md">
          <div className="text-surface-100">Item 4</div>
        </Card>
      </GridItem>
      <GridItem>
        <Card padding="md">
          <div className="text-surface-100">Item 5</div>
        </Card>
      </GridItem>
      <GridItem>
        <Card padding="md">
          <div className="text-surface-100">Item 6</div>
        </Card>
      </GridItem>
    </Grid>
  ),
};

export const GridResponsive: Story = {
  render: () => (
    <Grid cols={1} colsSm={2} colsMd={3} colsLg={4} gap={4}>
      {Array.from({ length: 12 }).map((_, i) => (
        <GridItem key={i}>
          <Card padding="md">
            <div className="text-surface-100">Item {i + 1}</div>
            <div className="text-xs text-surface-400 mt-1">
              1 col (mobile) → 2 cols (sm) → 3 cols (md) → 4 cols (lg)
            </div>
          </Card>
        </GridItem>
      ))}
    </Grid>
  ),
};

export const GridWithColumnSpan: Story = {
  render: () => (
    <Grid cols={12} gap={4}>
      <GridItem colSpan={12}>
        <Card padding="md">
          <div className="text-surface-100 font-semibold">
            Full Width Header
          </div>
        </Card>
      </GridItem>
      <GridItem colSpan={8}>
        <Card padding="md">
          <div className="text-surface-100">Main Content (8 columns)</div>
        </Card>
      </GridItem>
      <GridItem colSpan={4}>
        <Card padding="md">
          <div className="text-surface-100">Sidebar (4 columns)</div>
        </Card>
      </GridItem>
      <GridItem colSpan={6}>
        <Card padding="md">
          <div className="text-surface-100">Left Column (6 columns)</div>
        </Card>
      </GridItem>
      <GridItem colSpan={6}>
        <Card padding="md">
          <div className="text-surface-100">Right Column (6 columns)</div>
        </Card>
      </GridItem>
    </Grid>
  ),
};

export const GridResponsiveColumnSpan: Story = {
  render: () => (
    <Grid cols={1} colsMd={12} gap={4}>
      <GridItem colSpan={1} colSpanMd={8}>
        <Card padding="md">
          <div className="text-surface-100 font-semibold">Main Content</div>
          <div className="text-xs text-surface-400 mt-1">
            Full width on mobile, 8 columns on md+
          </div>
        </Card>
      </GridItem>
      <GridItem colSpan={1} colSpanMd={4}>
        <Card padding="md">
          <div className="text-surface-100 font-semibold">Sidebar</div>
          <div className="text-xs text-surface-400 mt-1">
            Full width on mobile, 4 columns on md+
          </div>
        </Card>
      </GridItem>
    </Grid>
  ),
};

export const GridWithRowSpan: Story = {
  render: () => (
    <Grid cols={3} gap={4}>
      <GridItem rowSpan={2}>
        <Card padding="md" className="h-full">
          <div className="text-surface-100 font-semibold">Tall Item</div>
          <div className="text-xs text-surface-400 mt-1">Spans 2 rows</div>
        </Card>
      </GridItem>
      <GridItem>
        <Card padding="md">
          <div className="text-surface-100">Item 1</div>
        </Card>
      </GridItem>
      <GridItem>
        <Card padding="md">
          <div className="text-surface-100">Item 2</div>
        </Card>
      </GridItem>
      <GridItem>
        <Card padding="md">
          <div className="text-surface-100">Item 3</div>
        </Card>
      </GridItem>
      <GridItem>
        <Card padding="md">
          <div className="text-surface-100">Item 4</div>
        </Card>
      </GridItem>
    </Grid>
  ),
};

export const GridDifferentGaps: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <div className="text-sm text-surface-400 mb-2">Gap 2</div>
        <Grid cols={3} gap={2}>
          {Array.from({ length: 6 }).map((_, i) => (
            <GridItem key={i}>
              <Card padding="sm">
                <div className="text-surface-100">Item {i + 1}</div>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </div>
      <div>
        <div className="text-sm text-surface-400 mb-2">Gap 4 (default)</div>
        <Grid cols={3} gap={4}>
          {Array.from({ length: 6 }).map((_, i) => (
            <GridItem key={i}>
              <Card padding="sm">
                <div className="text-surface-100">Item {i + 1}</div>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </div>
      <div>
        <div className="text-sm text-surface-400 mb-2">Gap 8</div>
        <Grid cols={3} gap={8}>
          {Array.from({ length: 6 }).map((_, i) => (
            <GridItem key={i}>
              <Card padding="sm">
                <div className="text-surface-100">Item {i + 1}</div>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  ),
};

export const GridCustomGaps: Story = {
  render: () => (
    <Grid cols={3} gapX={6} gapY={2}>
      {Array.from({ length: 9 }).map((_, i) => (
        <GridItem key={i}>
          <Card padding="md">
            <div className="text-surface-100">Item {i + 1}</div>
            <div className="text-xs text-surface-400 mt-1">
              Horizontal gap: 6, Vertical gap: 2
            </div>
          </Card>
        </GridItem>
      ))}
    </Grid>
  ),
};

export const GridComplexLayout: Story = {
  render: () => (
    <Grid cols={1} colsMd={12} gap={4}>
      {/* Header */}
      <GridItem colSpan={1} colSpanMd={12}>
        <Card padding="md">
          <div className="text-surface-100 font-semibold text-lg">Header</div>
        </Card>
      </GridItem>

      {/* Sidebar */}
      <GridItem colSpan={1} colSpanMd={3}>
        <Card padding="md">
          <div className="text-surface-100 font-semibold">Sidebar</div>
          <div className="text-xs text-surface-400 mt-2">
            Navigation menu and filters
          </div>
        </Card>
      </GridItem>

      {/* Main Content */}
      <GridItem colSpan={1} colSpanMd={6}>
        <Card padding="md">
          <div className="text-surface-100 font-semibold">Main Content</div>
          <div className="text-xs text-surface-400 mt-2">
            Primary content area
          </div>
        </Card>
      </GridItem>

      {/* Right Sidebar */}
      <GridItem colSpan={1} colSpanMd={3}>
        <Card padding="md">
          <div className="text-surface-100 font-semibold">Right Sidebar</div>
          <div className="text-xs text-surface-400 mt-2">
            Additional information
          </div>
        </Card>
      </GridItem>

      {/* Footer */}
      <GridItem colSpan={1} colSpanMd={12}>
        <Card padding="md">
          <div className="text-surface-100 font-semibold">Footer</div>
        </Card>
      </GridItem>
    </Grid>
  ),
};

// ============================================================================
// Advanced Grid Examples
// ============================================================================

export const GridDashboardLayout: Story = {
  render: () => (
    <div className="space-y-6">
      <Grid cols={1} colsSm={2} colsMd={4} gap={4}>
        {/* Stats Cards */}
        <GridItem>
          <Card padding="md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">
                Total Revenue
              </CardDescription>
              <CardTitle className="text-2xl">$45,231.89</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-success-400">
                +20.1% from last month
              </div>
            </CardContent>
          </Card>
        </GridItem>
        <GridItem>
          <Card padding="md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">
                Subscriptions
              </CardDescription>
              <CardTitle className="text-2xl">+2,350</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-success-400">
                +180.1% from last month
              </div>
            </CardContent>
          </Card>
        </GridItem>
        <GridItem>
          <Card padding="md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">Sales</CardDescription>
              <CardTitle className="text-2xl">+12,234</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-success-400">
                +19% from last month
              </div>
            </CardContent>
          </Card>
        </GridItem>
        <GridItem>
          <Card padding="md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">Active Now</CardDescription>
              <CardTitle className="text-2xl">+573</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-success-400">
                +201 since last hour
              </div>
            </CardContent>
          </Card>
        </GridItem>
      </Grid>

      {/* Main Content Area */}
      <Grid cols={1} colsLg={12} gap={4}>
        <GridItem colSpan={1} colSpanLg={8}>
          <Card padding="md">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>
                Monthly revenue and growth metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                title=""
                description=""
                series={[
                  {
                    name: "Revenue",
                    color: "primary",
                    data: [
                      { label: "Jan", value: 12000 },
                      { label: "Feb", value: 15000 },
                      { label: "Mar", value: 18000 },
                      { label: "Apr", value: 22000 },
                      { label: "May", value: 25000 },
                      { label: "Jun", value: 28000 },
                    ],
                  },
                ]}
                showGrid={false}
                showDots={true}
                showLegend={false}
                curve="smooth"
              />
            </CardContent>
          </Card>
        </GridItem>
        <GridItem colSpan={1} colSpanLg={4}>
          <Card padding="md">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm" variant="primary">
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm text-surface-100">
                        User {i} made a purchase
                      </div>
                      <div className="text-xs text-surface-400">
                        2 minutes ago
                      </div>
                    </div>
                  </div>
                  {i < 5 && <Separator className="mt-3" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </GridItem>
      </Grid>
    </div>
  ),
};

export const GridEcommerceProducts: Story = {
  render: () => (
    <Grid cols={1} colsSm={2} colsMd={3} colsLg={4} gap={6}>
      {[
        {
          name: "Wireless Headphones",
          price: "$99.99",
          badge: "New",
          rating: 4.5,
        },
        { name: "Smart Watch", price: "$249.99", badge: "Sale", rating: 4.8 },
        { name: "Laptop Stand", price: "$49.99", badge: null, rating: 4.2 },
        {
          name: "Mechanical Keyboard",
          price: "$129.99",
          badge: "Hot",
          rating: 4.7,
        },
        { name: "USB-C Hub", price: "$39.99", badge: null, rating: 4.3 },
        { name: "Wireless Mouse", price: "$29.99", badge: "Sale", rating: 4.6 },
        { name: "Monitor Stand", price: "$79.99", badge: null, rating: 4.4 },
        { name: "Desk Mat", price: "$24.99", badge: "New", rating: 4.1 },
      ].map((product, i) => (
        <GridItem key={i}>
          <Card padding="none" interactive className="overflow-hidden">
            <div className="h-48 w-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
              <div className="text-surface-400 text-sm">Product Image</div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-baseline justify-between mb-2 gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base mb-1">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-xs text-surface-400">
                      {product.rating}
                    </span>
                  </div>
                </div>
                {product.badge && (
                  <Badge
                    variant={
                      product.badge === "New"
                        ? "accent"
                        : product.badge === "Hot"
                        ? "destructive"
                        : product.badge === "Sale"
                        ? "warning"
                        : "primary"
                    }
                    size="sm"
                    className="flex-shrink-0"
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-surface-100">
                  {product.price}
                </span>
                <Button size="sm" variant="primary">
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </GridItem>
      ))}
    </Grid>
  ),
};

export const GridBlogArticles: Story = {
  render: () => (
    <Grid cols={1} colsMd={12} gap={6}>
      {/* Featured Article */}
      <GridItem colSpan={1} colSpanMd={8}>
        <Card padding="none" interactive className="overflow-hidden">
          <div className="h-64 w-full bg-gradient-to-br from-accent-500/20 to-primary-500/20 flex items-center justify-center">
            <div className="text-surface-400">Featured Image</div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="accent" size="sm">
                Featured
              </Badge>
              <span className="text-xs text-surface-400">Jan 15, 2024</span>
            </div>
            <CardTitle className="text-2xl mb-2">
              Getting Started with React and TypeScript
            </CardTitle>
            <CardDescription className="mb-4">
              Learn how to build modern web applications using React and
              TypeScript. This comprehensive guide covers everything from setup
              to advanced patterns.
            </CardDescription>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar size="sm" variant="primary">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="text-sm text-surface-300">John Doe</span>
              </div>
              <span className="text-xs text-surface-400">5 min read</span>
            </div>
          </CardContent>
        </Card>
      </GridItem>

      {/* Side Articles */}
      <GridItem colSpan={1} colSpanMd={4}>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              padding="none"
              interactive
              className="overflow-hidden"
            >
              <div className="h-32 w-full bg-gradient-to-br from-secondary-500/20 to-accent-500/20 flex items-center justify-center">
                <div className="text-surface-400 text-xs">Image</div>
              </div>
              <CardContent className="p-4">
                <div className="text-xs text-surface-400 mb-2">
                  Jan {10 + i}, 2024
                </div>
                <CardTitle className="text-base mb-2">
                  Article Title {i}
                </CardTitle>
                <CardDescription className="text-xs line-clamp-2">
                  Short description of the article content goes here...
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </GridItem>

      {/* Regular Articles Grid */}
      <GridItem colSpan={1} colSpanMd={12}>
        <Grid cols={1} colsSm={2} colsMd={3} gap={4}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <GridItem key={i}>
              <Card padding="none" interactive className="overflow-hidden">
                <div className="h-40 w-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                  <div className="text-surface-400 text-xs">Image</div>
                </div>
                <CardContent className="p-4">
                  <div className="text-xs text-surface-400 mb-2">
                    Jan {5 + i}, 2024
                  </div>
                  <CardTitle className="text-base mb-2">
                    Article Title {i}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2">
                    Article description and summary content...
                  </CardDescription>
                </CardContent>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </GridItem>
    </Grid>
  ),
};

export const GridFormLayout: Story = {
  render: () => (
    <Grid cols={1} colsMd={12} gap={6}>
      {/* Main Form */}
      <GridItem colSpan={1} colSpanMd={8}>
        <Card padding="lg">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Please fill in your personal details below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Grid cols={1} colsSm={2} gap={4}>
              <GridItem>
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <TextField
                    id="firstName"
                    type="text"
                    placeholder="John"
                    variant="default"
                    fullWidth
                  />
                </div>
              </GridItem>
              <GridItem>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <TextField
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    variant="default"
                    fullWidth
                  />
                </div>
              </GridItem>
            </Grid>

            <Grid cols={1} colsSm={1} gap={4}>
              <GridItem>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <TextField
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    variant="default"
                    fullWidth
                  />
                </div>
              </GridItem>
            </Grid>

            <Grid cols={1} colsSm={2} gap={4}>
              <GridItem>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <TextField
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    variant="default"
                    fullWidth
                  />
                </div>
              </GridItem>
              <GridItem>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <DatePicker
                    placeholder="Select date"
                    dateFormat="MM/DD/YYYY"
                    inputSize="md"
                    fullWidth
                  />
                </div>
              </GridItem>
            </Grid>

            <Grid cols={1} colsSm={1} gap={4}>
              <GridItem>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <TextField
                    id="address"
                    type="text"
                    placeholder="123 Main Street"
                    variant="default"
                    fullWidth
                  />
                </div>
              </GridItem>
            </Grid>

            <Grid cols={1} colsSm={3} gap={4}>
              <GridItem>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <TextField
                    id="city"
                    type="text"
                    placeholder="New York"
                    variant="default"
                    fullWidth
                  />
                </div>
              </GridItem>
              <GridItem>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <TextField
                    id="state"
                    type="text"
                    placeholder="NY"
                    variant="default"
                    fullWidth
                  />
                </div>
              </GridItem>
              <GridItem>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <TextField
                    id="zip"
                    type="text"
                    placeholder="10001"
                    variant="default"
                    fullWidth
                  />
                </div>
              </GridItem>
            </Grid>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Save Changes</Button>
          </CardFooter>
        </Card>
      </GridItem>

      {/* Sidebar Info */}
      <GridItem colSpan={1} colSpanMd={4}>
        <div className="space-y-4">
          <Card padding="md">
            <CardHeader>
              <CardTitle className="text-base">Help & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-surface-400 mb-4">
                Need help filling out this form? Contact our support team.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card padding="md">
            <CardHeader>
              <CardTitle className="text-base">Privacy Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-surface-400">
                Your personal information is encrypted and secure. We never
                share your data with third parties.
              </p>
            </CardContent>
          </Card>
        </div>
      </GridItem>
    </Grid>
  ),
};

export const GridUserProfiles: Story = {
  render: () => (
    <Grid cols={1} colsSm={2} colsMd={3} colsLg={4} gap={6}>
      {[
        {
          name: "John Doe",
          role: "Software Engineer",
          status: "online",
          avatar: "JD",
        },
        {
          name: "Jane Smith",
          role: "Product Designer",
          status: "away",
          avatar: "JS",
        },
        {
          name: "Bob Johnson",
          role: "Marketing Manager",
          status: "online",
          avatar: "BJ",
        },
        {
          name: "Alice Brown",
          role: "Data Analyst",
          status: "offline",
          avatar: "AB",
        },
        {
          name: "Charlie Wilson",
          role: "UX Researcher",
          status: "online",
          avatar: "CW",
        },
        {
          name: "Diana Lee",
          role: "Frontend Developer",
          status: "online",
          avatar: "DL",
        },
        {
          name: "Eve Martinez",
          role: "Backend Developer",
          status: "away",
          avatar: "EM",
        },
        {
          name: "Frank Taylor",
          role: "DevOps Engineer",
          status: "online",
          avatar: "FT",
        },
      ].map((user, i) => (
        <GridItem key={i}>
          <Card padding="md" interactive>
            <div className="flex flex-col items-center text-center mb-4">
              <div className="relative mb-3">
                <Avatar size="2xl" variant="primary">
                  <AvatarFallback>{user.avatar}</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-surface-800 ${
                    user.status === "online"
                      ? "bg-success-500"
                      : user.status === "away"
                      ? "bg-warning-500"
                      : "bg-surface-600"
                  }`}
                ></div>
              </div>
              <CardTitle className="text-lg mb-1">{user.name}</CardTitle>
              <CardDescription className="text-sm">{user.role}</CardDescription>
            </div>
            <CardContent className="pt-0">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Message
                </Button>
                <Button variant="primary" size="sm" className="flex-1">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </GridItem>
      ))}
    </Grid>
  ),
};
