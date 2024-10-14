import { query, validationResult } from 'express-validator';

export const productsQueryValidators = [
   query('q')
      .optional()
      .isString()
      .notEmpty({ ignore_whitespace: true })
      .withMessage('Search query must be a string'),

   query('colors')
      .optional()
      .notEmpty({ ignore_whitespace: true })
      .custom(value => {
         return value.split(/,\s*/g).every((color: any) => typeof color === 'string');
      })
      .withMessage('Colors must be an array of strings'),

   query('price')
      .optional()
      .custom(value => {
         const data = value.split(/,\s*/g);
         if (!Array.isArray(data) || data.length !== 2) {
            throw new Error('Price must be a tuple of two values');
         }
         const [min, max] = data.map(x => +x);
         if (
            typeof min !== 'number' ||
            typeof max !== 'number' ||
            min > max ||
            isNaN(min) ||
            isNaN(max)
         ) {
            throw new Error(
               'Price values must be numbers and min must be less than or equal to max'
            );
         }
         return true;
      }),

   query('sort')
      .optional()
      .isIn(['asc', 'desc', 'popular'])
      .withMessage(
         'Sort must be either "asc" (ascending), "desc" (descending) or "popular" (by rating descending)'
      ),

   query('page').optional().isInt({ min: 1 }),
   query('limit').optional().isInt({ min: 1 })
];
