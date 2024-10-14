import { SORT_OPTIONS } from '../constants';
import { SortTypes } from './product';

export type FilterRequest = {
   q?: string;
   colors?: string;
   price?: string;
   sort?: SortTypes;
   page?: string;
   limit?: string;
};
