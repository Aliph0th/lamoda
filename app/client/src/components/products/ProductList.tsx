import { FilterRequest, ProductResponse } from 'common';
import { FC } from 'react';
import Pagination from '../ui/pagination/Pagination';
import ProductItem from './Product';

interface ProductListProps {
   productsData: ProductResponse;
   handleParamsChange: (filters: FilterRequest) => void;
}

const ProductList: FC<ProductListProps> = ({ productsData, handleParamsChange }) => {
   return (
      <>
         <div>
            <div className="mb-3 grid max-[472px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
               {productsData.products.map(product => (
                  <ProductItem key={product.id} product={product} />
               ))}
            </div>
            <Pagination
               currentPage={productsData.currentPage}
               totalPages={productsData.totalPages}
               perPage={productsData.currentLimit}
               handleParamsChange={handleParamsChange}
            />
         </div>
      </>
   );
};

export default ProductList;
