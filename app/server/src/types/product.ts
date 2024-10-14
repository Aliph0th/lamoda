import { SORT_OPTIONS } from '../constants';

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

export enum Color {
   Red = 'red',
   Blue = 'blue',
   Yellow = 'yellow',
   Green = 'green',
   Purple = 'purple',
   White = 'white',
   Black = 'black'
};

export enum Category {
   Jeans = 'jeans',
   TShirt = 't-shirt',
   Shoes = 'shoes',
   Hat = 'hat',
   Skirt = 'skirt',
   Hoodie = 'hoodie',
   Clothes = 'clothes',
   Glasses = 'glasses',
   Umbrella = 'umbrella',
   Bag = 'bag'
};

export type SortTypes = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];
