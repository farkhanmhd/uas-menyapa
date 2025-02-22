"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Sale } from "./data";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "eventTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "ticketCode",
    header: "Ticket Code",
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "ticketType",
    header: () => <div className="line-clamp-1 min-w-max">Tipe Tiket</div>,
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => {
      return <div className="line-clamp-1 min-w-max">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "whatsapp",
    header: "WhatsApp",
  },
  {
    accessorKey: "paymentMethod",
    header: "Pembayaran",
  },
  {
    accessorKey: "orderQty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Qty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("orderQty")}</div>;
    },
  },
  {
    accessorKey: "grossAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gross Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("grossAmount"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
