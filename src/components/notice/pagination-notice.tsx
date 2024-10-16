"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import NoticeCard from "./notice-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PaginationNotice({ items }: { items: any }) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(items.length / 12);
  const paginatedData = items.slice(currentPage * 12, (currentPage + 1) * 12);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const pageNumberArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const renderPageNumbers = () => {
    const maxVisiblePages = 3;
    const pagesPerGroup = 3;
    const currentPageGroup = Math.floor(currentPage / pagesPerGroup);
    const startIndex = currentPageGroup * pagesPerGroup;
    const endIndex = Math.min(startIndex + maxVisiblePages, totalPages);
    const pagesToDisplay = pageNumberArray.slice(startIndex, endIndex);
    const lastPageNumber = pageNumberArray[totalPages - 1];

    const pageNumbers = pagesToDisplay.map((pageNumber) => (
      <PaginationItem key={pageNumber}>
        <PaginationButton
          onClick={() => handlePageChange(pageNumber - 1)}
          isActive={pageNumber - 1 === currentPage}
        >
          {pageNumber}
        </PaginationButton>
      </PaginationItem>
    ));

    if (lastPageNumber > endIndex) {
      pageNumbers.push(
        <PaginationItem key="ellipsis">
          <PaginationEllipsis className="text-sm font-bold text-[#666666]" />
        </PaginationItem>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex w-full flex-col">
        {paginatedData.map((item: any, index: number) => (
          <NoticeCard notice={item} key={index} index={index + 1} />
        ))}
      </div>
      <Pagination>
        <PaginationContent className="flex gap-4">
          <PaginationItem>
            <ChevronLeft
              role="button"
              className="h-4 w-4 text-[#333333]"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <ChevronRight
              role="button"
              className="h-4 w-4 text-[#333333]"
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages - 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
