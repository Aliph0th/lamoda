import { Request, Response } from 'express';
import service, { DatabaseService } from '../database/database.service';
export class ProductController {
   private readonly databaseService: DatabaseService;
   constructor(databaseService: DatabaseService) {
      this.databaseService = databaseService;
   }

   get = (req: Request, res: Response) => {
      res.json(this.databaseService.getAll());
   }
}

export default new ProductController(service);
