import { ProductMetadata, ProductResponse, SortTypes } from 'common';

export const PER_PAGE_VALUES = [10, 24, 48] as const;
export const PAGES_PER_BLOCK = 4;
export const SORT_DISPLAY_NAMES: Record<SortTypes, [string, 'asc' | 'desc']> = {
   asc: ['Price', 'asc'],
   desc: ['Price', 'desc'],
   popular: ['Rating', 'desc']
};

export const defaultProducts: ProductResponse = {
   currentLimit: PER_PAGE_VALUES[0],
   currentPage: 1,
   currentSort: 'popular',
   products: [],
   totalPages: 1,
   totalProducts: 0
};
export const defaultMetadata: ProductMetadata = {
   availableColors: [],
   availableSorts: ['popular', 'asc', 'desc'],
   highestPrice: 0,
   lowestPrice: 0
};
