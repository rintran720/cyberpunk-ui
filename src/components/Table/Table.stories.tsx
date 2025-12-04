import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./Table";
import { Pagination } from "../Pagination";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  {
    invoice: "INV-001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV-002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV-003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV-004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
];

export const Default: Story = {
  render: () => (
    <div className="rounded-xl border border-surface-700 bg-surface-800 shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.25)] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium text-surface-100">
                {invoice.invoice}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    invoice.paymentStatus === "Paid"
                      ? "bg-green-500/20 text-green-400"
                      : invoice.paymentStatus === "Pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {invoice.paymentStatus}
                </span>
              </TableCell>
              <TableCell className="text-surface-400">
                {invoice.paymentMethod}
              </TableCell>
              <TableCell className="text-right font-medium text-surface-100">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="font-medium text-surface-300">
              Total
            </TableCell>
            <TableCell className="text-right font-semibold text-surface-100">
              $1,200.00
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <div className="rounded-xl border border-surface-700 bg-surface-800 shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.25)] overflow-hidden">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium text-surface-100">
                {invoice.invoice}
              </TableCell>
              <TableCell className="text-surface-400">
                {invoice.paymentStatus}
              </TableCell>
              <TableCell className="text-surface-400">
                {invoice.paymentMethod}
              </TableCell>
              <TableCell className="text-right font-medium text-surface-100">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const Users: Story = {
  render: () => {
    const users = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
      {
        id: 4,
        name: "Alice Brown",
        email: "alice@example.com",
        role: "Moderator",
      },
    ];

    return (
      <div className="rounded-xl border border-surface-700 bg-surface-800 shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.25)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-surface-100">
                  {user.name}
                </TableCell>
                <TableCell className="text-surface-400">{user.email}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-400">
                    {user.role}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const products = [
      {
        id: 1,
        name: "Product A",
        price: "$99.99",
        stock: 45,
        status: "Active",
      },
      {
        id: 2,
        name: "Product B",
        price: "$149.99",
        stock: 12,
        status: "Active",
      },
      {
        id: 3,
        name: "Product C",
        price: "$79.99",
        stock: 0,
        status: "Out of Stock",
      },
      {
        id: 4,
        name: "Product D",
        price: "$199.99",
        stock: 8,
        status: "Active",
      },
    ];

    return (
      <div className="rounded-xl border border-surface-700 bg-surface-800 shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.25)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium text-surface-100">
                  {product.name}
                </TableCell>
                <TableCell className="text-surface-300">
                  {product.price}
                </TableCell>
                <TableCell className="text-surface-400">
                  {product.stock}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {product.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="px-2 py-1 text-xs rounded-md bg-surface-700 text-surface-300 hover:bg-surface-600 transition-colors">
                      Edit
                    </button>
                    <button className="px-2 py-1 text-xs rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const WithCheckboxes: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<number[]>([]);
    const orders = [
      {
        id: 1,
        order: "#ORD-001",
        customer: "John Doe",
        amount: "$250.00",
        date: "2024-01-15",
      },
      {
        id: 2,
        order: "#ORD-002",
        customer: "Jane Smith",
        amount: "$150.00",
        date: "2024-01-16",
      },
      {
        id: 3,
        order: "#ORD-003",
        customer: "Bob Johnson",
        amount: "$350.00",
        date: "2024-01-17",
      },
      {
        id: 4,
        order: "#ORD-004",
        customer: "Alice Brown",
        amount: "$450.00",
        date: "2024-01-18",
      },
    ];

    const toggleSelect = (id: number) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };

    const toggleSelectAll = () => {
      setSelected(
        selected.length === orders.length ? [] : orders.map((o) => o.id)
      );
    };

    return (
      <div className="rounded-xl border border-surface-700 bg-surface-800 shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.25)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={selected.length === orders.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-surface-700 bg-surface-900 text-primary-500"
                />
              </TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className={
                  selected.includes(order.id) ? "bg-primary-500/10" : ""
                }
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selected.includes(order.id)}
                    onChange={() => toggleSelect(order.id)}
                    className="w-4 h-4 rounded border-surface-700 bg-surface-900 text-primary-500"
                  />
                </TableCell>
                <TableCell className="font-medium text-surface-100">
                  {order.order}
                </TableCell>
                <TableCell className="text-surface-300">
                  {order.customer}
                </TableCell>
                <TableCell className="text-surface-300">
                  {order.amount}
                </TableCell>
                <TableCell className="text-surface-400">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const WithSorting: Story = {
  render: () => {
    const [sortBy, setSortBy] = React.useState<"name" | "price" | null>(null);
    const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

    const items = [
      { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
      { id: 2, name: "Mouse", category: "Electronics", price: 29.99 },
      { id: 3, name: "Keyboard", category: "Electronics", price: 79.99 },
      { id: 4, name: "Monitor", category: "Electronics", price: 299.99 },
    ];

    const handleSort = (column: "name" | "price") => {
      if (sortBy === column) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortBy(column);
        setSortOrder("asc");
      }
    };

    const sortedItems = [...items].sort((a, b) => {
      if (!sortBy) return 0;
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

    return (
      <div className="rounded-xl border border-surface-700 bg-surface-800 shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.25)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 hover:text-surface-100 transition-colors"
                >
                  Name
                  {sortBy === "name" && (
                    <svg
                      className={`w-4 h-4 ${
                        sortOrder === "desc" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                </button>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("price")}
                  className="flex items-center gap-1 hover:text-surface-100 transition-colors"
                >
                  Price
                  {sortBy === "price" && (
                    <svg
                      className={`w-4 h-4 ${
                        sortOrder === "desc" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-surface-100">
                  {item.name}
                </TableCell>
                <TableCell className="text-surface-400">
                  {item.category}
                </TableCell>
                <TableCell className="text-surface-300">
                  ${item.price.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const files = [
      {
        id: 1,
        name: "document.pdf",
        type: "PDF",
        size: "2.4 MB",
        modified: "2 days ago",
      },
      {
        id: 2,
        name: "spreadsheet.xlsx",
        type: "Excel",
        size: "1.8 MB",
        modified: "1 week ago",
      },
      {
        id: 3,
        name: "presentation.pptx",
        type: "PowerPoint",
        size: "5.2 MB",
        modified: "3 days ago",
      },
      {
        id: 4,
        name: "image.jpg",
        type: "Image",
        size: "3.1 MB",
        modified: "1 day ago",
      },
    ];

    const getIcon = (type: string) => {
      switch (type) {
        case "PDF":
          return (
            <svg
              className="w-5 h-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
          );
        case "Excel":
          return (
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.17,3.81L20.17,2.81C20,2.64 19.8,2.55 19.59,2.55H18.59V2.45C18.59,1.65 17.93,1 17.14,1H6.86C6.07,1 5.41,1.65 5.41,2.45V2.55H4.41C4.2,2.55 4,2.64 3.83,2.81L2.83,3.81C2.66,3.98 2.57,4.18 2.57,4.39V19.61C2.57,20.4 3.22,21.05 4.01,21.05H19.99C20.78,21.05 21.43,20.4 21.43,19.61V4.39C21.43,4.18 21.34,3.98 21.17,3.81M6.86,2.45H17.14V11.23L12,8.5L6.86,11.23V2.45M20.43,19.61H3.57V4.39L4.41,3.55H19.59L20.43,4.39V19.61Z" />
            </svg>
          );
        case "PowerPoint":
          return (
            <svg
              className="w-5 h-5 text-orange-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
          );
        default:
          return (
            <svg
              className="w-5 h-5 text-blue-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
            </svg>
          );
      }
    };

    return (
      <div className="rounded-xl border border-surface-700 bg-surface-800 shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.25)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Modified</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {getIcon(file.type)}
                    <span className="font-medium text-surface-100">
                      {file.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-surface-400">{file.type}</TableCell>
                <TableCell className="text-surface-400">{file.size}</TableCell>
                <TableCell className="text-surface-400">
                  {file.modified}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const Compact: Story = {
  render: () => {
    const data = [
      { id: 1, code: "ABC123", value: 100, status: "Active" },
      { id: 2, code: "DEF456", value: 200, status: "Active" },
      { id: 3, code: "GHI789", value: 150, status: "Inactive" },
      { id: 4, code: "JKL012", value: 300, status: "Active" },
    ];

    return (
      <div className="rounded-xl border border-surface-700 bg-surface-800 shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.25)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Code</TableHead>
              <TableHead className="text-xs">Value</TableHead>
              <TableHead className="text-xs">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="py-2 text-xs font-medium text-surface-100">
                  {item.code}
                </TableCell>
                <TableCell className="py-2 text-xs text-surface-400">
                  {item.value}
                </TableCell>
                <TableCell className="py-2">
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                      item.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-surface-700 text-surface-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const SortableHeaders: Story = {
  render: () => {
    const [sortConfig, setSortConfig] = React.useState<{
      key: string;
      direction: "asc" | "desc";
    } | null>(null);

    const employees = [
      {
        id: 1,
        name: "Alice Johnson",
        department: "Engineering",
        salary: 95000,
        joinDate: "2020-01-15",
      },
      {
        id: 2,
        name: "Bob Smith",
        department: "Marketing",
        salary: 75000,
        joinDate: "2021-03-20",
      },
      {
        id: 3,
        name: "Charlie Brown",
        department: "Engineering",
        salary: 110000,
        joinDate: "2019-06-10",
      },
      {
        id: 4,
        name: "Diana Prince",
        department: "Sales",
        salary: 85000,
        joinDate: "2022-01-05",
      },
      {
        id: 5,
        name: "Eve Wilson",
        department: "Marketing",
        salary: 70000,
        joinDate: "2021-11-12",
      },
    ];

    const handleSort = (key: string) => {
      let direction: "asc" | "desc" = "asc";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "asc"
      ) {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    };

    const sortedEmployees = React.useMemo(() => {
      if (!sortConfig) return employees;

      return [...employees].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }, [sortConfig]);

    const SortableHeader = ({
      children,
      sortKey,
    }: {
      children: React.ReactNode;
      sortKey: string;
    }) => {
      const isSorted = sortConfig?.key === sortKey;
      const sortDirection = isSorted ? sortConfig.direction : null;

      return (
        <TableHead>
          <button
            onClick={() => handleSort(sortKey)}
            className="flex items-center gap-2 w-full text-left hover:text-surface-100 transition-colors group"
          >
            <span>{children}</span>
            <span className="flex flex-col">
              <svg
                className={`w-3 h-3 ${
                  sortDirection === "asc"
                    ? "text-primary-400"
                    : "text-surface-600 group-hover:text-surface-500"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 14l5-5 5 5z" />
              </svg>
              <svg
                className={`w-3 h-3 -mt-1 ${
                  sortDirection === "desc"
                    ? "text-primary-400"
                    : "text-surface-600 group-hover:text-surface-500"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </span>
          </button>
        </TableHead>
      );
    };

    return (
      <div className="rounded-xl border border-surface-700 bg-surface-800 shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.25)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader sortKey="name">Name</SortableHeader>
              <SortableHeader sortKey="department">Department</SortableHeader>
              <SortableHeader sortKey="salary">Salary</SortableHeader>
              <SortableHeader sortKey="joinDate">Join Date</SortableHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium text-surface-100">
                  {employee.name}
                </TableCell>
                <TableCell className="text-surface-400">
                  {employee.department}
                </TableCell>
                <TableCell className="text-surface-300">
                  ${employee.salary.toLocaleString()}
                </TableCell>
                <TableCell className="text-surface-400">
                  {employee.joinDate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const MultiSelectWithActions: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<number[]>([]);
    const selectAllCheckboxRef = React.useRef<HTMLInputElement>(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 3;
    const [items, setItems] = React.useState([
      {
        id: 1,
        name: "Project Alpha",
        status: "Active",
        progress: 75,
        assignee: "John Doe",
        dueDate: "2024-02-15",
      },
      {
        id: 2,
        name: "Project Beta",
        status: "Pending",
        progress: 30,
        assignee: "Jane Smith",
        dueDate: "2024-03-01",
      },
      {
        id: 3,
        name: "Project Gamma",
        status: "Completed",
        progress: 100,
        assignee: "Bob Johnson",
        dueDate: "2024-01-20",
      },
      {
        id: 4,
        name: "Project Delta",
        status: "Active",
        progress: 50,
        assignee: "Alice Brown",
        dueDate: "2024-02-28",
      },
      {
        id: 5,
        name: "Project Epsilon",
        status: "Pending",
        progress: 20,
        assignee: "Charlie Wilson",
        dueDate: "2024-03-15",
      },
      {
        id: 6,
        name: "Project Zeta",
        status: "Active",
        progress: 90,
        assignee: "Diana Prince",
        dueDate: "2024-02-20",
      },
      {
        id: 7,
        name: "Project Eta",
        status: "Completed",
        progress: 100,
        assignee: "Eve Adams",
        dueDate: "2024-01-10",
      },
      {
        id: 8,
        name: "Project Theta",
        status: "Pending",
        progress: 40,
        assignee: "Frank Miller",
        dueDate: "2024-03-20",
      },
    ]);

    const toggleSelect = (id: number) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };

    // Calculate pagination
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    // Get selected items on current page
    const selectedOnCurrentPage = paginatedItems.filter((item) =>
      selected.includes(item.id)
    );
    const allOnCurrentPageSelected =
      paginatedItems.length > 0 &&
      selectedOnCurrentPage.length === paginatedItems.length;

    const toggleSelectAll = () => {
      const currentPageIds = paginatedItems.map((item) => item.id);
      if (allOnCurrentPageSelected) {
        // Deselect all items on current page
        setSelected((prev) =>
          prev.filter((id) => !currentPageIds.includes(id))
        );
      } else {
        // Select all items on current page
        setSelected((prev) => {
          const newSelected = [...prev];
          currentPageIds.forEach((id) => {
            if (!newSelected.includes(id)) {
              newSelected.push(id);
            }
          });
          return newSelected;
        });
      }
    };

    const handleDelete = (id: number) => {
      setItems((prev) => {
        const newItems = prev.filter((item) => item.id !== id);
        // If current page becomes empty, go to previous page
        const newTotalPages = Math.ceil(newItems.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        return newItems;
      });
      setSelected((prev) => prev.filter((itemId) => itemId !== id));
    };

    const handleEdit = (id: number) => {
      console.log("Edit item:", id);
      // In a real app, this would open an edit modal or navigate to edit page
    };

    const handleDuplicate = (id: number) => {
      const item = items.find((i) => i.id === id);
      if (item) {
        const newItem = {
          ...item,
          id: Math.max(...items.map((i) => i.id)) + 1,
          name: `${item.name} (Copy)`,
        };
        setItems((prev) => [...prev, newItem]);
      }
    };

    const handleArchive = (id: number) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "Archived" } : item
        )
      );
    };

    const handleBulkDelete = () => {
      setItems((prev) => prev.filter((item) => !selected.includes(item.id)));
      setSelected([]);
      // If current page becomes empty, go to previous page
      const remainingItems = items.filter(
        (item) => !selected.includes(item.id)
      );
      const newTotalPages = Math.ceil(remainingItems.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    };

    const isAllSelected = allOnCurrentPageSelected;
    const isIndeterminate =
      selectedOnCurrentPage.length > 0 &&
      selectedOnCurrentPage.length < paginatedItems.length;

    // Update indeterminate state
    React.useEffect(() => {
      if (selectAllCheckboxRef.current) {
        selectAllCheckboxRef.current.checked = isAllSelected;
        selectAllCheckboxRef.current.indeterminate = isIndeterminate;
      }
    }, [isAllSelected, isIndeterminate]);

    return (
      <div className="space-y-4">
        {selected.length > 0 && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-primary-500/10 border border-primary-500/20">
            <span className="text-sm text-surface-300">
              {selected.length} item{selected.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1.5 text-xs rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelected([])}
                className="px-3 py-1.5 text-xs rounded-md bg-surface-700 text-surface-300 hover:bg-surface-600 transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
        <div className="rounded-xl border border-surface-700 bg-surface-800 shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.25)] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    ref={selectAllCheckboxRef}
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-surface-700 bg-surface-900 text-primary-500 cursor-pointer"
                  />
                </TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedItems.map((item) => (
                <TableRow
                  key={item.id}
                  className={
                    selected.includes(item.id) ? "bg-primary-500/10" : ""
                  }
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 rounded border-surface-700 bg-surface-900 text-primary-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-surface-100">
                    {item.name}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "Completed"
                          ? "bg-blue-500/20 text-blue-400"
                          : item.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-surface-700 text-surface-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-surface-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-500 rounded-full transition-all"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-surface-400 w-10 text-right">
                        {item.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-surface-300">
                    {item.assignee}
                  </TableCell>
                  <TableCell className="text-surface-400">
                    {item.dueDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="p-1.5 rounded-md bg-surface-700 text-surface-300 hover:bg-surface-600 hover:text-surface-100 transition-colors"
                        title="Edit"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDuplicate(item.id)}
                        className="p-1.5 rounded-md bg-surface-700 text-surface-300 hover:bg-surface-600 hover:text-surface-100 transition-colors"
                        title="Duplicate"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleArchive(item.id)}
                        className="p-1.5 rounded-md bg-surface-700 text-surface-300 hover:bg-surface-600 hover:text-surface-100 transition-colors"
                        title="Archive"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        title="Delete"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    );
  },
};
