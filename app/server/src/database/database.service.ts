import { generateProducts } from './data';

export class DatabaseService {
   private readonly products = generateProducts(500);

   getAll = () => {
      return this.products;
   }

   getPriceLimits = () => {
      const sortedProducts = this.products.toSorted((a, b) => a.price - b.price);
      const min = sortedProducts[0]?.price || 0;
      return [min, sortedProducts.at(-1)?.price || min]
   }
}

export default new DatabaseService();
