import { Color, Product, SortTypes } from '../types';

export const SORT_OPTIONS = {
   POPULAR: 'popular',
   ASC: 'asc',
   DESC: 'desc'
} as const;

export const SORT_COMPARE_FN_MAP: Record<SortTypes, (a: Product, b: Product) => number> =
   {
      popular: (a: Product, b: Product) => b.rating - a.rating,
      asc: (a: Product, b: Product) => a.price - b.price,
      desc: (a: Product, b: Product) => b.price - a.price
   };
export const RELEVANCE = {
   sort: (products: Product[], method: SortTypes) =>
      products.toSorted(SORT_COMPARE_FN_MAP[method]),
   query: (products: Product[], query: string) =>
      products.filter(product => {
         const search = query.toLowerCase();
         return (
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search)
         );
      }),
   price: (products: Product[], range: [number, number]) =>
      products.filter(product => {
         return product.price >= range[0] && product.price <= range[1];
      }),
   colors: (products: Product[], colors: Color[]) =>
      products.filter(product => colors.includes(product.color))
} as const;
