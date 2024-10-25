import { FilterRequest, ProductResponse, SortTypes } from 'common';
import { FC } from 'react';
import Pagination from '../ui/pagination/Pagination';
import ProductItem from './Product';
import Sort from '../filtration/Sort';

interface ProductListProps {
   productsData: ProductResponse;
   availableSorts: SortTypes[];
   handleParamsChange: (filters: FilterRequest) => void;
}

const ProductList: FC<ProductListProps> = ({ productsData, availableSorts, handleParamsChange }) => {
   return (
      <>
         <div>
            <div className="flex">
               <Sort availableSorts={availableSorts} currentSort={productsData.currentSort} />
               <Pagination
                  currentPage={productsData.currentPage}
                  totalPages={productsData.totalPages}
                  perPage={productsData.currentLimit}
                  handleParamsChange={handleParamsChange}
               />
            </div>
            <div className="mt-3 grid max-[472px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
               {productsData.products.map(product => (
                  <ProductItem key={product.id} product={product} />
               ))}
            </div>
         </div>
      </>
   );
};

export default ProductList;
