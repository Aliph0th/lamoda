import { Category } from './category';
import { Color } from './color';

export type Product = {
   id: string;
   name: string;
   description: string;
   color: Color;
   category: Category;
   price: number;
   rating: number;
   imageURL: string;
};
