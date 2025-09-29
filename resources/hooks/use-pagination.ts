import * as React from "react";

const MAX_BUTTONS = 7;

export interface PaginationProps {
  pages: number;
  currentPage: number;
}

export function usePagination({ pages, currentPage }: PaginationProps) {
  const buttons = React.useMemo(() => {
    const maxButtons = MAX_BUTTONS;

    if (pages > maxButtons) {
      const pageButtonsSize = maxButtons - 2; // why 2? because we're counting out first page and last page;

      // pageButtons buttons => ['...', ...n, '...'] | ['...', ...n] | [...n, '...'] | ['...']

      let startPage;
      let endPage;

      const hiddenPagesBefore = currentPage - Math.floor(pageButtonsSize / 2);
      startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
      const hasHiddenPagesAfter = startPage + pageButtonsSize <= pages;

      if (!hasHiddenPagesAfter) {
        endPage = pages;
        startPage = pages - pageButtonsSize + 1;
        if (startPage < 1) {
          startPage = 1;
        }
      } else {
        endPage = startPage + pageButtonsSize - 1;
      }

      const pageButtons = [];
      for (let i = startPage; i <= endPage; i += 1) {
        pageButtons.push(i);
      }

      if (startPage !== 1) {
        pageButtons.unshift("...");
        pageButtons.unshift(1);
      }

      if (hasHiddenPagesAfter) {
        pageButtons.push("...");

        if (endPage !== pages) {
          pageButtons.push(pages);
        }
      }

      return pageButtons;
    }

    return Array.from({ length: pages }, (_val, idx) => idx + 1);
  }, [currentPage, pages]);

  return buttons;
}
