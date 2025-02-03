"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { usePagination } from "@/hooks/use-pagination";
import { useQueryStates } from "nuqs";
import { eventSearchParams } from "@/app/api/events/searchParams";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PageNavigation({ totalPages }: { totalPages: number }) {
  const isMobile = useIsMobile();
  const [{ page = 1 }, setSearchParams] = useQueryStates(eventSearchParams);

  const paginationItemsToDisplay = isMobile ? 3 : 5;
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: page,
    totalPages,
    paginationItemsToDisplay,
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage });
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous page button */}
        <PaginationItem>
          <PaginationPrevious
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            onClick={() => page > 1 && handlePageChange(page - 1)}
            href="#"
            aria-disabled={page === 1}
          />
        </PaginationItem>

        {/* Left ellipsis (...) */}
        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Page number links */}
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => handlePageChange(p)}
              href="#"
              isActive={p === page}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Right ellipsis (...) */}
        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next page button */}
        <PaginationItem>
          <PaginationNext
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            onClick={() => page < totalPages && handlePageChange(page + 1)}
            href="#"
            aria-disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
