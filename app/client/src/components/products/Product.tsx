import { Product } from 'common';
import { FC, useState } from 'react';
import star from '@assets/star.svg';
import placeholder from '@assets/placeholder.png';

interface ProductItemProps {
   product: Product;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
   const [loading, setLoading] = useState<boolean>(true);
   return (
      <div className="bg-gray-100 rounded-lg flex flex-col justify-between shadow-md hover:scale-[1.02] transition-transform">
         {loading && <img src={placeholder} alt="" className="rounded-t-lg" />}
         <img
            className={`rounded-t-lg ${loading ? 'hidden' : ''}`}
            src={product.imageURL}
            alt={product.name}
            onLoad={() => setLoading(false)}
         />
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
