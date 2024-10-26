import { Color, FilterRequest } from 'common';

export type FilterParams =
   | {
        price?: string | [number, number];
        colors?: string | Color[];
     }
   | FilterRequest;
