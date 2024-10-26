import { ProductResponse, SortTypes } from 'common';
import { FC, memo } from 'react';
import { FilterParams } from '../../types';
import Sort from '../filtration/Sort';
import Pagination from '../ui/pagination/Pagination';
import ProductItem from './Product';
import Loader from '../ui/Loader';

interface ProductListProps {
   productsData: ProductResponse;
   availableSorts: SortTypes[];
   loading: boolean;
   handleParamsChange: (filters: FilterParams) => void;
}

const ProductList: FC<ProductListProps> = ({ loading, productsData, availableSorts, handleParamsChange }) => {
   return (
      <>
         <div>
            <div className="flex gap-2 flex-col xl:flex-row xl:justify-between items-start xl:items-center">
               <Sort
                  availableSorts={availableSorts}
                  currentSort={productsData.currentSort}
                  handleParamsChange={handleParamsChange}
               />
               <Pagination
                  currentPage={productsData.currentPage}
                  totalPages={productsData.totalPages}
                  perPage={productsData.currentLimit}
                  handleParamsChange={handleParamsChange}
               />
            </div>
            <div className="mt-3 grid max-[472px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
               {loading ? (
                  <div className="col-start-2">
                     <Loader />
                  </div>
               ) : (
                  <>
                     {productsData.totalProducts ? (
                        <>
                           {productsData.products.map(product => (
                              <ProductItem key={product.id} product={product} />
                           ))}
                        </>
                     ) : (
                        <span className="font-medium text-gray-400 text-center col-start-2">No products found</span>
                     )}
                  </>
               )}
            </div>
         </div>
      </>
   );
};

export default memo(ProductList);
