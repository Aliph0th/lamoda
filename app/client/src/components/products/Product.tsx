import { Product } from 'common';
import { FC } from 'react';
import star from '../../assets/star.svg';

interface ProductItemProps {
   product: Product;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
   return (
      <div className="bg-gray-100 rounded-lg flex flex-col justify-between shadow-md hover:scale-[1.02] transition-transform">
         <img className="rounded-t-lg" src={product.imageURL} alt={product.name} />
         <div className="p-3 grow flex flex-col justify-between">
            <div className="flex flex-col">
               <span className="font-medium text-lg">{product.name}</span>
               <small className="text-gray-400">{product.description}</small>
            </div>
            <div>
               <span className="font-medium">
                  Color <span className="font-normal">{product.color}</span>
               </span>

               <div className="flex justify-between">
                  <span className="text-gray-600" title="Shekel">
                     {product.price}
                     <span className="text-lg" title="Shekel">
                        &#8362;
                     </span>
                  </span>
                  <div className="flex justify-center items-center gap-x-2 text-gray-600">
                     <img src={star} alt="rating" className="w-6" />
                     {product.rating}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductItem;
