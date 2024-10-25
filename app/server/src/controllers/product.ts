import { Request, Response } from 'express';
import service, { DatabaseService } from '../database/database.service';
import { validationResult } from 'express-validator';
import { RELEVANCE, SORT_COMPARE_FN_MAP } from '../constants';
import {
   FilterRequest,
   Color,
   SortTypes,
   ProductResponse,
   ProductMetadata
} from 'common';

export class ProductController {
   private readonly databaseService: DatabaseService;
   constructor(databaseService: DatabaseService) {
      this.databaseService = databaseService;
   }

   get = (req: Request & { query: FilterRequest }, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         res.status(400).json(errors.array());
         return;
      }

      const relevantProducts = this.getRelevantProducts(req.query);

      const page = +(req.query?.page || 1);
      const limit = +(req.query?.limit || 10);
      const totalProducts = relevantProducts.length;
      const startIndex = (page - 1) * limit;

      res.status(200).json({
         totalProducts,
         totalPages: Math.ceil(totalProducts / limit),
         currentPage: page,
         currentLimit: limit,
         currentSort: req.query?.sort || 'popular',
         products: relevantProducts.slice(startIndex, startIndex + limit)
      } satisfies ProductResponse);
   };

   metadata = (req: Request, res: Response) => {
      res.status(200).json({
         ...this.databaseService.selectPriceLimits(),
         availableColors: this.databaseService.selectAvailableColors(),
         availableSorts: Object.keys(SORT_COMPARE_FN_MAP)
      } as ProductMetadata);
   };

   private getRelevantProducts = (filter: FilterRequest) => {
      let products = this.databaseService.getAll();

      const queryFilter = filter?.q || '';
      const colorsFilter = (filter?.colors?.split(/,\s*/g) as Color[]) || [];
      const priceFilter =
         (filter?.price?.split(/,\s*/g)?.map(x => +x) as [number, number]) || [];
      const sortFilter: SortTypes = filter?.sort || 'popular';

      if (queryFilter) {
         products = RELEVANCE.query(products, queryFilter);
      }
      if (colorsFilter.length) {
         products = RELEVANCE.colors(products, colorsFilter);
      }
      if (priceFilter.length) {
         products = RELEVANCE.price(products, priceFilter);
      }

      return RELEVANCE.sort(products, sortFilter);
   };
}

export default new ProductController(service);
