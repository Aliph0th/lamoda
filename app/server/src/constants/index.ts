import { Color, Product, SortTypes } from 'common';

export const RELEVANCE = {
   sort: (products: Product[], method: SortTypes) =>
      products.toSorted(SORT_COMPARE_FN_MAP[method]),
   query: (products: Product[], query: string) => {
      const filterFn = FILTERING_FACTORIES.STRINGS_INCLUDE(query, true);
      return products.filter(product => filterFn(product.name, product.description));
   },
   price: (products: Product[], range: [number, number]) => {
      const filterFn = FILTERING_FACTORIES.IN_RANGE<Product>('price', range);
      return products.filter(filterFn);
   },
   colors: (products: Product[], colors: Color[]) =>
      products.filter(product => {
         const filterFn = FILTERING_FACTORIES.STRINGS_INCLUDE(product.color, false);
         return filterFn(...colors);
      })
};

export const FILTERING_FACTORIES = {
   DESC: <T>(prop: keyof T) => {
      return (a: T, b: T) => (b[prop] as number) - (a[prop] as number);
   },
   ASC: <T>(prop: keyof T) => {
      return (a: T, b: T) => (a[prop] as number) - (b[prop] as number);
   },
   IN_RANGE: <T>(prop: keyof T, range: [number, number]) => {
      return (item: T) =>
         (item[prop] as number) >= range[0] && (item[prop] as number) <= range[1];
   },
   STRINGS_INCLUDE: (search: string, insensitive: boolean) => {
      return (...candidates: string[]) => {
         if (insensitive) {
            search = search.toLowerCase();
            candidates = candidates.map(s => s.toLowerCase());
         }
         return candidates.some(s => s.includes(search));
      };
   }
};

export const SORT_COMPARE_FN_MAP: Record<SortTypes, (a: Product, b: Product) => number> =
   {
      popular: FILTERING_FACTORIES.DESC<Product>('rating'),
      asc: FILTERING_FACTORIES.ASC<Product>('price'),
      desc: FILTERING_FACTORIES.DESC<Product>('price')
   };
