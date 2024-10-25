import { generateProducts } from './data';

export class DatabaseService {
   private readonly products = generateProducts(500);

   getAll = () => {
      return this.products;
   }

   selectPriceLimits = () => {
      const sortedProducts = this.products.toSorted((a, b) => a.price - b.price);
      const lowestPrice = sortedProducts[0]?.price || 0;
      const highestPrice = sortedProducts.at(-1)?.price || lowestPrice;
      return { lowestPrice, highestPrice };
   }

   selectAvailableColors = () => {
      return [...new Set(this.products.map(product => product.color))]
   }
}

export default new DatabaseService();
