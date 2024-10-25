import { SortTypes } from 'common';

export const PER_PAGE_VALUES = [10, 24, 48] as const;
export const PAGES_PER_BLOCK = 4;
export const SORT_DISPLAY_NAMES: Record<SortTypes, [string, 'asc' | 'desc']> = {
   asc: ['Price', 'asc'],
   desc: ['Price', 'desc'],
   popular: ['Rating', 'desc']
};
