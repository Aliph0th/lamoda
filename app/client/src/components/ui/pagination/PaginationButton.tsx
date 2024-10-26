import { FC, memo, ReactNode } from 'react';

interface PaginationButtonProps {
   onClick?: () => void;
   children?: ReactNode;
   active?: boolean;
   disabled?: boolean;
}
const PaginationButton: FC<PaginationButtonProps> = ({ children, active = false, disabled = false, onClick }) => {
   return (
      <button
         type="button"
         disabled={disabled}
         onClick={onClick}
         className={`min-h-[38px] min-w-[38px] select-none flex justify-center items-center ${active ? 'border border-gray-800 text-gray-800' : 'text-gray-500'} py-2 px-2.5 text-sm rounded-lg focus:outline-none focus:bg-gray-50 focus:ring-1 focus:ring-gray-700 disabled:opacity-50 disabled:pointer-events-none`}
      >
         {children}
      </button>
   );
};

export default memo(PaginationButton);
