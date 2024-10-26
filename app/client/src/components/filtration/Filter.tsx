import { Color, ProductMetadata, ProductResponse } from 'common';
import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import Loader from '../ui/Loader';
import MultiSlider from '../ui/MultiSlider/MultiSlider';
import { FilterParams } from '../../types';

interface FilterProps {
   productsData: ProductResponse;
   metadata: ProductMetadata;
   handleParamsChange: (filters: FilterParams) => void;
}
const Filter: FC<FilterProps> = ({
   productsData: { currentMinPrice, currentMaxPrice, totalProducts },
   metadata: { lowestPrice, highestPrice, availableColors },
   handleParamsChange
}) => {
   const [query, setQuery] = useState<string>('');
   const [priceLimits, setPriceLimits] = useState<[number, number]>([lowestPrice, highestPrice]);
   const [selectedColors, setSelectedColors] = useState<Color[]>([]);
   const debouncedQuery = useDebounce(query);
   const debouncedPriceLimits = useDebounce(priceLimits);
   const debouncedColors = useDebounce(selectedColors);

   const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
   };
   const handlePriceLimitsChange = useCallback((min: number, max: number) => {
      setPriceLimits([min, max]);
   }, []);
   const handleColorsChange = (color: Color) => {
      if (selectedColors.includes(color)) {
         setSelectedColors(selectedColors.filter(selected => selected !== color));
      } else {
         setSelectedColors([color, ...selectedColors]);
      }
   };
   useEffect(() => {
      const filters: FilterParams = { q: debouncedQuery, colors: debouncedColors, page: '1' };
      if (
         debouncedPriceLimits.every(x => x > 0)
         // (debouncedPriceLimits[0] !== lowestPrice || debouncedPriceLimits[1] !== highestPrice)
      ) {
         filters.price = debouncedPriceLimits;
      }
      handleParamsChange(filters);
   }, [debouncedColors, debouncedPriceLimits, debouncedQuery, handleParamsChange, highestPrice, lowestPrice]);

   return (
      <div className="min-[850px]:sticky top-1 self-start">
         <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            className="mb-3 bg-white disabled:bg-gray-200 border-gray-300 text-gray-900 focus:ring-blue-200 border text-sm rounded-lg focus:ring-2 focus:outline-none w-full p-2"
            placeholder="Search by name or description"
         />
         {availableColors.length > 0 && lowestPrice && highestPrice ? (
            <>
               <span className="font-medium">By price</span>
               <MultiSlider
                  minValue={lowestPrice}
                  maxValue={highestPrice}
                  currentMin={currentMinPrice}
                  currentMax={currentMaxPrice}
                  onChange={handlePriceLimitsChange}
               />
               <span className="font-medium my-1 block">By color</span>
               <ul className="text-sm font-medium text-gray-900 border border-gray-200 w-full lg:w-10/12 rounded-lg">
                  {availableColors.map(color => {
                     const checked = selectedColors.includes(color);
                     return (
                        <li
                           key={color}
                           className={`${checked ? 'bg-gray-50' : ''} hover:bg-gray-100 [&:not(:last-child)]:border-b first:rounded-t-lg last:rounded-b-lg border-gray-200`}
                        >
                           <div className={`flex items-center ps-3`}>
                              <input
                                 className="w-5 h-5"
                                 id={color + '_filter'}
                                 checked={checked}
                                 onChange={() => handleColorsChange(color)}
                                 type="checkbox"
                              />
                              <label htmlFor={color + '_filter'} className="w-full py-3 ms-2 text-sm font-medium">
                                 {color}
                              </label>
                           </div>
                        </li>
                     );
                  })}
               </ul>
            </>
         ) : (
            <>
               <Loader sm />
            </>
         )}
         <span className="font-medium text-gray-400 mt-3 block">Total: {totalProducts}</span>
      </div>
   );
};

export default memo(Filter);
