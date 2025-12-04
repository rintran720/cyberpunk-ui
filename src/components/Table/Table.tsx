"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

// ============================================================================
// Table Root
// ============================================================================

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(
          "w-full caption-bottom text-sm",
          "border-collapse",
          className
        )}
        {...props}
      />
    </div>
  )
);

Table.displayName = "Table";

// ============================================================================
// Table Header
// ============================================================================

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(
        "relative",
        "[&_tr]:border-b-2 [&_tr]:border-cyber",
        "bg-black/80",
        "before:absolute before:inset-0 before:top-0 before:h-full before:bg-[linear-gradient(90deg,transparent,var(--cyber-glow-primary),transparent)] before:opacity-10 before:pointer-events-none",
        className
      )}
      {...props}
    />
  )
);

TableHeader.displayName = "TableHeader";

// ============================================================================
// Table Body
// ============================================================================

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(
        "bg-black/50",
        "[&_tr:last-child]:border-0",
        "[&_tr:nth-child(even)]:bg-primary-500/5",
        className
      )}
      {...props}
    />
  )
);

TableBody.displayName = "TableBody";

// ============================================================================
// Table Footer
// ============================================================================

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        "relative",
        "border-t-2 border-cyber",
        "bg-black/80",
        "before:absolute before:inset-0 before:bottom-0 before:h-full before:bg-[linear-gradient(90deg,transparent,var(--cyber-glow-primary),transparent)] before:opacity-10 before:pointer-events-none",
        "font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
);

TableFooter.displayName = "TableFooter";

// ============================================================================
// Table Row
// ============================================================================

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-cyber transition-colors duration-150",
        "hover:bg-primary-500/10",
        "data-[state=selected]:bg-primary-500/20",
        "data-[state=selected]:border-primary-500",
        className
      )}
      {...props}
    />
  )
);

TableRow.displayName = "TableRow";

// ============================================================================
// Table Head
// ============================================================================

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle",
        "font-semibold text-primary-500 font-mono text-sm",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
);

TableHead.displayName = "TableHead";

// ============================================================================
// Table Cell
// ============================================================================

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "px-4 py-3 align-middle",
        "text-sm text-primary-500/70 font-mono",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
);

TableCell.displayName = "TableCell";

// ============================================================================
// Table Caption
// ============================================================================

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {}

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-primary-500/70 font-mono", className)}
    {...props}
  />
));

TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
