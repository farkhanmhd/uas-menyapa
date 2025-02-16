import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaymentStatusBannerProps {
  isPaid: boolean;
  isPending: boolean;
  isExpired: boolean;
  onRefresh: () => void;
}

export function PaymentStatusBanner({
  isPaid,
  isPending,
  isExpired,
  onRefresh,
}: PaymentStatusBannerProps) {
  if (!isPaid && !isPending) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border p-4",
        isPaid ? "border-green-500" : "border-destructive",
      )}
    >
      <div className="flex items-center space-x-2">
        {isPaid ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-600" />
        )}
        <span className={isPaid ? "text-green-700" : "text-red-700"}>
          {isPaid ? "Payment Successful" : "Payment Pending"}
        </span>
      </div>
      {!isPaid && !isExpired && (
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Status
        </Button>
      )}
    </div>
  );
}
