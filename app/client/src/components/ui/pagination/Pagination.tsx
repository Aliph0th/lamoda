import { ChangeEvent, FC, useMemo } from 'react';
import arrow from '@assets/arrow.svg';
import doubleArrow from '@assets/double-arrow.svg';
import PaginationButton from './PaginationButton';
import { PAGES_PER_BLOCK, PER_PAGE_VALUES } from '../../../constants';
import { FilterRequest } from 'common';

interface PaginationProps {
   totalPages: number;
   currentPage: number;
   perPage: number;
   handleParamsChange: (filters: FilterRequest) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, perPage, handleParamsChange }) => {
   const handlePerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
      handleParamsChange({ limit: e.target.value });
   };

   const handlePageChange = (page: number) => {
      if (page > 0 && page <= totalPages) {
         handleParamsChange({ page: page.toString() });
      }
   };

   const paginationStart = useMemo(() => Math.ceil(currentPage / PAGES_PER_BLOCK), [currentPage]);

   return (
      <div className="ml-auto w-fit flex items-center gap-x-1">
         <select
            value={perPage as number}
            onChange={handlePerPageChange}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-1 focus:ring-black block w-full py-2.5 pl-2.5"
         >
            {PER_PAGE_VALUES.map(value => (
               <option key={value} value={value}>
                  {value} per page
               </option>
            ))}
         </select>
         <PaginationButton disabled={currentPage <= 1} onClick={() => handlePageChange(1)}>
            <img src={doubleArrow} className="rotate-180" alt="" />
         </PaginationButton>
         <PaginationButton disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            <img src={arrow} alt="" />
         </PaginationButton>

         {Array.from({ length: PAGES_PER_BLOCK }, (_: unknown, i: number) => {
            const page = (paginationStart - 1) * PAGES_PER_BLOCK + i + 1;
            if (page > totalPages) {
               return null;
            }
            return (
               <PaginationButton key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
                  {page}
               </PaginationButton>
            );
         })}

         <PaginationButton disabled={currentPage >= totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            <img src={arrow} className="rotate-180" alt="" />
         </PaginationButton>
         <PaginationButton disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>
            <img src={doubleArrow} alt="" />
         </PaginationButton>
      </div>
   );
};

export default Pagination;
