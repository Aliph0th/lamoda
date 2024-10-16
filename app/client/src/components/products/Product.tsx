import { Product } from 'common';
import { FC } from 'react';
import { Rating } from 'react-simple-star-rating';
import './Product.css';

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
            <div className="grid grid-rows-3 grid-cols-[auto_1fr] gap-x-3">
               <span className="font-medium">Color</span>
               <span>{product.color}</span>
               <span className="font-medium">Price</span>
               <span className="text-gray-500">
                  {product.price} <span className="text-lg">&#8362;</span>
               </span>
               <span className="font-medium">Rating</span>
               <div className="tooltip relative">
                  <Rating
                     SVGclassName="inline-block"
                     readonly
                     size={24}
                     initialValue={product.rating}
                     allowTitleTag={false}
                     allowFraction
                  />
                  <span className="tooltip-text">{product.rating}</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductItem;
