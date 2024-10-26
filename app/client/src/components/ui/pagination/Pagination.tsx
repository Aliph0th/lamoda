import arrow from '@assets/arrow.svg';
import doubleArrow from '@assets/double-arrow.svg';
import { ChangeEvent, FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { PAGES_PER_BLOCK, PER_PAGE_VALUES } from '../../../constants';
import { useDebounce } from '../../../hooks/useDebounce';
import { FilterParams } from '../../../types';
import PaginationButton from './PaginationButton';

interface PaginationProps {
   totalPages: number;
   currentPage: number;
   perPage: number;
   handleParamsChange: (filters: FilterParams) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, perPage: currentPerPage, handleParamsChange }) => {
   const [perPage, setPerPage] = useState<number>(currentPerPage);
   const [page, setPage] = useState<number>(currentPage);
   const debouncedPerPage = useDebounce(perPage);
   const debouncedPage = useDebounce(page);

   const handlePerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setPerPage(+e.target.value);
   };
   const handlePageChange = useCallback(
      (pageNumber: number) => {
         if (pageNumber > 0 && pageNumber <= totalPages) {
            setPage(pageNumber);
         }
      },
      [totalPages]
   );
   useEffect(() => {
      handleParamsChange({ page: debouncedPage.toString(), limit: debouncedPerPage.toString() });
   }, [handleParamsChange, debouncedPage, debouncedPerPage]);

   const paginationStart = useMemo(() => Math.ceil(page / PAGES_PER_BLOCK), [page]);

   return (
      <div className="w-fit flex items-center gap-x-1">
         <select
            value={perPage}
            onChange={handlePerPageChange}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-1 focus:ring-black block w-full py-2.5 pl-2.5"
         >
            {PER_PAGE_VALUES.map(value => (
               <option key={value} value={value}>
                  {value} per page
               </option>
            ))}
         </select>
         <PaginationButton disabled={page <= 1} onClick={() => handlePageChange(1)}>
            <img src={doubleArrow} className="rotate-180" alt="" />
         </PaginationButton>
         <PaginationButton disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
            <img src={arrow} alt="" />
         </PaginationButton>

         {Array.from({ length: PAGES_PER_BLOCK }, (_: unknown, i: number) => {
            const pageNumber = (paginationStart - 1) * PAGES_PER_BLOCK + i + 1;
            if (pageNumber > totalPages) {
               return null;
            }
            return (
               <PaginationButton
                  key={pageNumber}
                  active={page === pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
               >
                  {pageNumber}
               </PaginationButton>
            );
         })}

         <PaginationButton disabled={page >= totalPages} onClick={() => handlePageChange(page + 1)}>
            <img src={arrow} className="rotate-180" alt="" />
         </PaginationButton>
         <PaginationButton disabled={page >= totalPages} onClick={() => handlePageChange(totalPages)}>
            <img src={doubleArrow} alt="" />
         </PaginationButton>
      </div>
   );
};

export default memo(Pagination);
