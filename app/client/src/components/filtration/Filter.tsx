import { FC } from 'react';
import MultiSlider from '../ui/MultiSlider/MultiSlider';
import Loader from '../ui/Loader';
import { Color } from 'common';

interface FilterProps {
   loading: boolean;
   totalProducts?: number;
   priceLimits?: [number, number];
   availableColors?: Color[];
}
const Filter: FC<FilterProps> = ({ loading, totalProducts, priceLimits, availableColors }) => {
   return (
      <>
         {loading || !totalProducts || !priceLimits || !availableColors ? (
            <Loader />
         ) : (
            <div className="sticky top-1 self-start">
               <input
                  type="text"
                  disabled={loading}
                  className="mb-3 bg-white disabled:bg-gray-200 border-gray-300 text-gray-900 focus:ring-blue-200 border text-sm rounded-lg focus:ring-2 focus:outline-none w-full p-2"
                  placeholder="Search by name or description"
               />
               <span className="font-medium">By price</span>
               <MultiSlider minValue={priceLimits[0]} maxValue={priceLimits[1]} onChange={() => {}} />
               <span className="font-medium mb-1 block">By color</span>
               <ul className="text-sm font-medium text-gray-900 border border-gray-200 rounded-lg w-6/12">
                  {availableColors.map(color => {
                     const checked = false;
                     return (
                        <li
                           key={color}
                           className={`${checked ? 'bg-gray-50' : ''} hover:bg-gray-100 [&:not(:last-child)]:border-b first:rounded-t-lg last:rounded-b-lg border-gray-200`}
                        >
                           <div className={`flex items-center ps-3`}>
                              <input className="w-5 h-5" id={color + '_filter'} type="checkbox" />
                              <label htmlFor={color + '_filter'} className="w-full py-3 ms-2 text-sm font-medium">
                                 {color}
                              </label>
                           </div>
                        </li>
                     );
                  })}
               </ul>
               <span className="font-medium mt-3 block">Total: {totalProducts}</span>
            </div>
         )}
      </>
   );
};

export default Filter;
