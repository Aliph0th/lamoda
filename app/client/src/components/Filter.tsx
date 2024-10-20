import { FC } from 'react';
import MultiSlider from './ui/MultiSlider/MultiSlider';
import Loader from './ui/Loader';

interface FilterProps {
   loading: boolean;
   totalProducts?: number;
   priceLimits: [number, number];
}
const Filter: FC<FilterProps> = ({ loading, totalProducts, priceLimits }) => {
   return (
      <div className="sticky top-1 self-start">
         <input
            type="text"
            disabled={loading}
            className="mb-3 bg-white disabled:bg-gray-200 border-gray-300 text-gray-900 focus:ring-blue-200 border text-sm rounded-lg focus:ring-2 focus:outline-none w-full p-2"
            placeholder="Search by name or description"
         />
         {loading ? (
            <Loader />
         ) : (
            <MultiSlider
               minValue={priceLimits[0]}
               maxValue={priceLimits[1]}
               onChange={(min, max) => console.log(min, max)}
            />
         )}

         <span className="font-medium flex gap-2">Total: {totalProducts || <Loader sm />}</span>
      </div>
   );
};

export default Filter;
