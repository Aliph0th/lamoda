import { generateProducts } from './data';


export class DatabaseService {
   private readonly products = generateProducts(100)

   getAll() {
      return this.products;
   }
}

export default new DatabaseService();
