import { FC } from 'react';
import MultiSlider from './ui/MultiSlider';

interface FilterProps {
   totalProducts: number;
}
const Filter: FC<FilterProps> = ({ totalProducts }) => {
   return (
      <div className="sticky top-1 self-start">
         <input
            type="text"
            className="mb-3 bg-white border-gray-300 text-gray-900 focus:ring-blue-200 border text-sm rounded-lg focus:ring-2 focus:outline-none w-full p-2"
            placeholder="Search by name or description"
         />
         <MultiSlider minValue={0} maxValue={100} onChange={(min, max) => console.log(min, max)} />
         <span className="font-medium">Total: {totalProducts}</span>
      </div>
   );
};

export default Filter;
