import { Product } from 'common';
import { FC } from 'react';
import ProductItem from './Product';

interface ProductListProps {
   products: Product[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {
   return (
      <div className="grid grid-cols-3 gap-3">
         {products.map(product => (
            <ProductItem key={product.id} product={product} />
         ))}
      </div>
   );
};

export default ProductList;
