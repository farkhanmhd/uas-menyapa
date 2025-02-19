"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Attendee } from "./data";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Clock, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Attendee>[] = [
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
    header: "Ticket Type",
    cell: ({ row }) => {
      const type = row.getValue("ticketType") as string;
      return (
        <Badge
          variant={type === "vip" ? "default" : "secondary"}
          className="uppercase"
        >
          {type}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Peserta
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "whatsapp",
    header: "WhatsApp",
  },
  {
    accessorKey: "presence",
    header: "Presence",
    cell: ({ row }) => {
      const status = row.getValue("presence") as string;
      return (
        <div className="flex items-center capitalize">
          {status === "waiting" && (
            <Clock className="mr-2 h-4 w-4 text-yellow-500" />
          )}
          {status === "present" && (
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          )}
          {status === "absent" && (
            <XCircle className="mr-2 h-4 w-4 text-red-500" />
          )}
          {status}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
