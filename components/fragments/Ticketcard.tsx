"use client";

import { Link } from "next-view-transitions";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Phone, Calendar, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import { Ticket } from "@/types";
import { EventTime } from "./EventTime";
import PhoneInput from "./PhoneInput";
import { updateParticipantAction } from "@/app/lib/actions/tickets";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { ViewTicketDialog } from "./ViewTicketDialog";

export function TicketCard(props: Ticket) {
  const params = useParams();
  const { eventId } = params;
  const [name, setName] = useState(props.participantName || "");
  const [whatsapp, setWhatsapp] = useState(props.whatsappNumber || "");
  const { execute, isPending, result } = useAction(updateParticipantAction, {
    onSettled: (actionResult) => {
      if (actionResult?.result?.data) {
        const { status, message } = actionResult?.result?.data;
        toast({
          title: status === "success" ? "Success" : "Failed",
          description: message,
          variant: status === "success" ? "default" : "destructive",
        });
      }
    },
  });

  const whatsappError = result?.validationErrors?.whatsapp?._errors?.join();
  const nameError = result?.validationErrors?.name?._errors?.join();

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <Badge
              variant="secondary"
              className="text-xs font-semibold uppercase"
            >
              {props.ticketType}
            </Badge>
            {props.presence === "present" && (
              <Badge
                variant="default"
                className="text-xs font-semibold uppercase"
              >
                Hadir
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            ID: {props.id.toUpperCase()}
          </span>
        </div>
        <h3 className="mb-4 line-clamp-2 text-lg font-semibold">
          {props.eventTitle}
        </h3>
        {!props.participantName && !props.whatsappNumber ? (
          <form
            className="space-y-6"
            action={() =>
              execute({
                id: props.id,
                eventId: eventId as string,
                name,
                whatsapp: `+62${whatsapp}`,
              })
            }
          >
            <div className="space-y-3">
              <Label
                htmlFor={`name-${props.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Nama Peserta
              </Label>
              <Input
                id={`name-${props.id}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter participant name"
                className={cn("placeholder:text-sm", {
                  "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                    nameError,
                })}
                autoComplete="off"
              />
            </div>
            <PhoneInput
              label="Nomor Whatsapp"
              value={whatsapp}
              onChange={setWhatsapp}
              id={`whatsapp-${props.id}`}
              className={cn({
                "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
                  whatsappError,
              })}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              Submit
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h4 className="mb-2 font-semibold">Informasi Peserta</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {props.participantName}
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {props.whatsappNumber}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <EventTime
                  startTime={new Date(props.startTime)}
                  endTime={new Date(props.endTime)}
                />
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{props.eventLocation}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {props.participantName && props.whatsappNumber && (
        <CardFooter className="bg-muted/50 p-4">
          {props.certificateId ? (
            <Link
              href={`/certificates/${props.certificateId}`}
              className={cn("w-full", buttonVariants())}
            >
              Download Sertifikat
            </Link>
          ) : (
            <ViewTicketDialog ticket={props} />
          )}
        </CardFooter>
      )}
    </Card>
  );
}
