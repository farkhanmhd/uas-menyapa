import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function TableSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-9 w-[250px]" />
          <Skeleton className="h-9 w-[180px]" />
          <Skeleton className="h-9 w-[180px]" />
        </div>
        <Skeleton className="h-9 w-[180px]" />
      </div>
      <div className="max-w-[calc(100vw-48px)] rounded-lg border border-gray-200">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <TableHead key={i} className="font-semibold text-gray-600">
                      <Skeleton className="h-6 w-full" />
                    </TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <TableRow
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {Array(7)
                      .fill(0)
                      .map((_, j) => (
                        <TableCell key={j} className="border-t border-gray-200">
                          <Skeleton className="h-6 w-full" />
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Skeleton className="h-9 w-[250px]" />
        <div className="flex gap-x-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </div>
  );
}
