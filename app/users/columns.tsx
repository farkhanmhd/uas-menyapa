"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "next-safe-action/hooks";
import { updateUserRoleAction } from "../lib/actions/users";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import type { SelectUser } from "@/db/schema/authentication";
import { useState } from "react";

const ActionCell = ({ row }: { row: Row<SelectUser> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = row.original;
  const newRole = user.role === "customer" ? "admin" : "customer";
  const { execute, isPending } = useAction(updateUserRoleAction, {
    onSettled: (actionResult) => {
      if (actionResult?.result?.data) {
        const { status, message } = actionResult?.result?.data;

        toast({
          title: status === "success" ? "Success" : "Failed",
          description: message,
          variant:
            message !== "User role updated successfully"
              ? "destructive"
              : "default",
        });
      }
    },
  });

  return (
    <AlertDialog open={isOpen || isPending} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>Set as {newRole}</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will change the user&apos;s role from {user.role} to {newRole}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => execute({ userId: user.id, role: newRole })}
            disabled={isPending}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const columns: ColumnDef<SelectUser>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "dateOfBirth",
    header: () => <div className="line-clamp-1 max-w-max">Date of Birth</div>,
    cell: ({ row }) => {
      const date = row.getValue("dateOfBirth") as Date;
      return date;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "marriageStatus",
    header: () => <div className="line-clamp-1 max-w-max">Marriage Status</div>,
  },
  {
    accessorKey: "whatsapp",
    header: "WhatsApp",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionCell row={row} />;
    },
  },
];
