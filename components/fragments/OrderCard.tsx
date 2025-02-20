import Link from "next/link";
import type { OrderCard as OrderCardProps } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { EventTime } from "./EventTime";
import Image from "next/image";

const OrderCard = ({ ...order }: OrderCardProps) => {
  return (
    <Card className="overflow-hidden duration-200 hover:bg-muted">
      <Link
        href={`/orders/${order.orderId}`}
        className="grid grid-cols-8 md:grid-cols-6"
      >
        <div className="hidden w-full md:col-span-2 md:block">
          <Image
            src={order.posterUrl || "/placeholder.svg"}
            alt={order.title}
            width={500}
            height={500}
            className="h-full object-cover"
          />
        </div>
        <CardContent className="col-span-8 flex flex-col justify-between p-4 sm:p-6 md:col-span-4 md:grid-cols-4">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <h3 className="mb-2 text-lg font-semibold sm:mb-0 md:line-clamp-2">
              {order.title}
            </h3>
            <Badge
              variant={
                order.orderStatus === "Completed" ? "default" : "secondary"
              }
              className="self-start sm:self-auto"
            >
              {order.orderStatus}
            </Badge>
          </div>
          <div className="space-y-2 text-sm">
            <span className="line-clamp-1 font-semibold uppercase">
              {order.orderId}
            </span>
            <p className="flex justify-between">
              <span className="font-medium">Ticket:</span>
              <span className="font-semibold uppercase">
                {order.ticketType}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Quantity:</span>
              <span className="font-semibold uppercase">{order.qty}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Time:</span>
              <EventTime
                className="md:text-sm"
                startTime={new Date(order.startTime)}
                endTime={new Date(order.endTime)}
              />
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Payment Type:</span>
              <span className="font-semibold uppercase">
                {order.paymentMethod}
              </span>
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Amount paid:</span>
            <span className="text-lg font-bold">
              {formatCurrency(order.grossAmount, order.currency)}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default OrderCard;
