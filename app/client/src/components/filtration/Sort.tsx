import { SortTypes } from 'common';
import { FC } from 'react';
import { SORT_DISPLAY_NAMES } from '../../constants';
import arrow from '@assets/arrow.svg';

interface SortProps {
   availableSorts: SortTypes[];
   currentSort: SortTypes;
}

const Sort: FC<SortProps> = ({ availableSorts, currentSort }) => {
   return (
      <ul className="flex text-sm font-medium text-gray-900 border border-gray-200 rounded-lg">
         {availableSorts.map(sortType => {
            const checked = sortType === currentSort;
            const display = SORT_DISPLAY_NAMES[sortType];
            return (
               <li
                  key={sortType}
                  className={`${checked ? `bg-gray-200` : ''} hover:bg-gray-100 px-3 [&:not(:last-child)]:border-r first:rounded-l-lg last:rounded-r-lg border-gray-200`}
               >
                  <div className="flex items-center">
                     <input id={sortType + '_sort'} className="hidden" type="radio" hidden name="sort-radio" required />
                     <label
                        htmlFor={sortType + '_sort'}
                        className="w-full py-3 text-sm font-medium flex gap-x-1 items-center"
                     >
                        {display[0]}
                        <img
                           src={arrow}
                           className={`${display[1] === 'asc' ? 'rotate-90' : '-rotate-90'} mt-1`}
                           alt=""
                        />
                     </label>
                  </div>
               </li>
            );
         })}
      </ul>
   );
};

export default Sort;
