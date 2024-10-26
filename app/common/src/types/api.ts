import { Color, Product, SortTypes } from './product';

export type FilterRequest = {
   q?: string;
   colors?: string;
   price?: string;
   sort?: SortTypes;
   page?: string;
   limit?: string;
};

export type ProductResponse = {
   totalProducts: number;
   totalPages: number;
   currentPage: number;
   currentLimit: number;
   currentSort: SortTypes;
   currentMinPrice?: number;
   currentMaxPrice?: number;
   products: Product[];
};

export type ProductMetadata = {
   highestPrice: number;
   lowestPrice: number;
   availableColors: Color[];
   availableSorts: SortTypes[];
};
