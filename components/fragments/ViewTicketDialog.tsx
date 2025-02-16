import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TicketIcon } from "lucide-react";
import Ticket from "./Ticket";
import { Ticket as TicketType } from "@/types";
import { ScrollArea } from "../ui/scroll-area";

export const ViewTicketDialog = ({ ticket }: { ticket: TicketType }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <TicketIcon className="mr-2 h-4 w-4" />
          View Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-max">
        <DialogTitle className="text-xl">Your Ticket</DialogTitle>
        <ScrollArea className="h-[calc(100dvh-96px)] max-h-[800px]">
          <Ticket ticket={ticket} />
          <DialogClose asChild>
            <Button variant="ghost" className="mt-4 w-full">
              Cancel
            </Button>
          </DialogClose>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
