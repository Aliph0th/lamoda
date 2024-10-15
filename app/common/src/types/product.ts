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

export type Color = 'red' | 'blue' | 'yellow' | 'green' | 'purple' | 'white' | 'black';

export type Category =
   | 'jeans'
   | 't-shirt'
   | 'shoes'
   | 'hat'
   | 'skirt'
   | 'hoodie'
   | 'clothes'
   | 'glasses'
   | 'umbrella'
   | 'bag';

export type SortTypes = 'popular' | 'asc' | 'desc';
