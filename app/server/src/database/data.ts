import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { Product, Color, Category } from 'common';

const colors: Color[] = ['red', 'blue', 'yellow', 'green', 'purple', 'white', 'black'];
const categories: Category[] = [
   'jeans',
   't-shirt',
   'shoes',
   'hat',
   'skirt',
   'hoodie',
   'clothes',
   'glasses',
   'umbrella',
   'bag'
];

export const generateProducts = (length: number): Product[] => {
   return Array.from({ length }, () => ({
      id: randomUUID(),
      name: faker.lorem.words({ min: 1, max: 4 }),
      description: faker.lorem.paragraph(1),
      color: faker.helpers.arrayElement(colors),
      category: faker.helpers.arrayElement(categories),
      price: faker.number.int({ min: 1000, max: 5999 }),
      rating: faker.number.float({ min: 0, max: 5, fractionDigits: 1 }),
      imageURL: `https://dummyjson.com/image/150/${faker.color.rgb().slice(1)}`
   }));
};
