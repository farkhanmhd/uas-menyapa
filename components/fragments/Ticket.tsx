"use client";

import type React from "react";
import { useRef } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toPng } from "html-to-image";
import { EventTime } from "./EventTime";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Ticket as TicketType } from "@/types";
import Image from "next/image";

const Ticket: React.FC<{ ticket: TicketType }> = ({ ticket }) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadAsPng = async () => {
    if (ticketRef.current) {
      const options = {
        width: ticketRef.current.offsetWidth,
        height: ticketRef.current.offsetHeight,
        pixelRatio: 4,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
      };

      try {
        const dataUrl = await toPng(ticketRef.current, options);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `ticket-${ticket.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Failed to generate image", error);
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center space-y-4">
      <div className="px-0 sm:px-4">
        <ScrollArea className="w-[calc(100vw-48px)] rounded-lg border md:w-auto">
          <div className="flex justify-center">
            <Card
              ref={ticketRef}
              className="relative h-[679px] w-[382px] overflow-hidden rounded-lg bg-transparent"
            >
              <Image
                src={ticket.ticketDesign}
                alt="ticket design"
                className="absolute inset-0 z-0 object-cover"
                fill
              />
              <CardContent className="relative z-10 flex h-full flex-col justify-end bg-transparent p-0">
                <div className="space-y-4 bg-white">
                  <div className="mx-8 mt-4 flex flex-col items-center space-y-2 border-b border-dashed border-gray-200 px-6 pb-3">
                    <div className="rounded-md p-2 shadow-sm">
                      <QRCode value={ticket.id} size={120} />
                    </div>
                    <div className="text-center text-sm text-gray-500">
                      ID: {ticket.id.toUpperCase()}
                    </div>
                    <div className="flex gap-x-2">
                      <span className="text-center font-medium text-gray-900">
                        {ticket.participantName}
                      </span>
                    </div>
                  </div>

                  <div className="mx-8 flex flex-col gap-4 px-6 pt-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="block text-xs text-gray-500">
                          Waktu
                        </span>
                        <EventTime
                          startTime={new Date(ticket.startTime)}
                          endTime={new Date(ticket.endTime)}
                          className="text-xs font-medium text-gray-900 md:text-xs"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="block text-xs text-gray-500">
                          Tempat
                        </span>
                        <span className="text-xs font-medium text-gray-900">
                          {ticket.eventLocation}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="block text-xs text-gray-500">
                          Ticket
                        </span>
                        <span className="text-xs font-medium uppercase text-gray-900">
                          {ticket.ticketType}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 px-8 pb-8 text-center text-xs text-gray-500">
                    <p>Ticket ini hanya berlaku untuk 1 orang</p>
                    <p>Tunjukkan QR Code saat memasuki venue</p>
                    <p>Dilarang memperjualbelikan tiket kepada pihak lain</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="w-full max-w-sm pr-0.5 sm:pr-0">
        <Button variant="outline" onClick={downloadAsPng} className="w-full">
          Download Ticket
        </Button>
      </div>
    </div>
  );
};

export default Ticket;
