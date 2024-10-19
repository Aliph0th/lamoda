import { Product, SortTypes } from './product';

export type FilterRequest = {
   q?: string;
   colors?: string;
   price?: string;
   sort?: SortTypes;
   page?: string;
   limit?: string;
};

export type ProductResponse = {
   totalProducts: number,
   totalPages: number,
   currentPage: number,
   currentLimit: number,
   products: Product[]
}

export type MetadataResponse = {
   priceLimits: [number, number]
}
