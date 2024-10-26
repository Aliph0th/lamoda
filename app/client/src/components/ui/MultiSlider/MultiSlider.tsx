import { useCallback, useEffect, useState, FC, ChangeEvent, memo } from 'react';
import './MultiSlider.css';

interface MultiSliderProps {
   minValue: number;
   maxValue: number;
   onChange: (min: number, max: number) => void;
}

const MultiSlider: FC<MultiSliderProps> = ({ minValue, maxValue, onChange }) => {
   const [min, setMin] = useState<number>(minValue);
   const [max, setMax] = useState<number>(maxValue);
   const [left, setLeft] = useState<number>(0);
   const [width, setWidth] = useState<number>(0);

   const getPercent = useCallback(
      (value: number) => Math.round(((value - minValue) / (maxValue - minValue)) * 100),
      [minValue, maxValue]
   );

   const onMinChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         setMin(Math.min(Number(e.target.value), max - 1));
      },
      [max]
   );
   const onMaxChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         setMax(Math.max(Number(e.target.value), min + 1));
      },
      [min]
   );

   useEffect(() => {
      const minPercent = getPercent(min);
      setLeft(minPercent);
      setWidth(getPercent(max) - minPercent);
   }, [min, max, getPercent]);

   useEffect(() => {
      onChange(min, max);
   }, [min, max, onChange]);

   return (
      <div className="h-fit mt-3 flex items-center flex-col">
         <input
            type="range"
            min={minValue}
            max={maxValue}
            value={min}
            onChange={onMinChange}
            className="thumb z-[3] w-full h-0 outline-none absolute pointer-events-none"
            style={min > maxValue - 100 ? { zIndex: 5 } : {}}
         />
         <input
            type="range"
            min={minValue}
            max={maxValue}
            value={max}
            onChange={onMaxChange}
            className="thumb z-[4] w-full h-0 outline-none absolute pointer-events-none"
         />
         <div className="relative w-full">
            <div className="h-[5px] rounded-sm absolute z-[1] bg-gray-300 w-full" />
            <div
               style={{ width: `${width}%`, left: `${left}%` }}
               className="h-[5px] rounded-sm absolute bg-blue-600 z-[2]"
            />
         </div>
         <div className="mt-1.5 flex justify-between w-full">
            <span className="select-none text-gray-500 font-medium">{min}</span>
            <span className="select-none text-gray-500 font-medium">{max}</span>
         </div>
      </div>
   );
};

export default memo(MultiSlider);
