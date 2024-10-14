import { randomUUID } from 'crypto';
import { Category, Color, Product } from '../types';
import { faker } from '@faker-js/faker';


export const generateProducts = (length: number): Product[] => {
   return Array.from({ length }, () => ({
      id: randomUUID(),
      name: faker.lorem.words({ min: 1, max: 4 }),
      description: faker.lorem.paragraph({ min: 2, max: 10 }),
      color: faker.helpers.enumValue(Color),
      category: faker.helpers.enumValue(Category),
      price: faker.number.int({ min: 10, max: 9999 }),
      rating: faker.number.float({ min: 0, max: 5, fractionDigits: 1 }),
      imageURL: `https://via.placeholder.com/150/${faker.color.rgb().slice(1)}`
   }));
}
