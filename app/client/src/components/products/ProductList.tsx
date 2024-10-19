import { ProductResponse } from 'common';
import { FC } from 'react';
import Pagination from '../ui/Pagination';
import ProductItem from './Product';

interface ProductListProps {
   productsData: ProductResponse;
}

const ProductList: FC<ProductListProps> = ({ productsData }) => {
   return (
      <div>
         <div className="grid max-[472px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {productsData.products.map(product => (
               <ProductItem key={product.id} product={product} />
            ))}
         </div>
         <Pagination />
      </div>
   );
};

export default ProductList;
