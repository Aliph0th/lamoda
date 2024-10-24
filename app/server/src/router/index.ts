import { Router } from 'express';
import productController from '../controllers/product';
import { productsQueryValidators } from './validation';

const router = Router();

router.get('/products', ...productsQueryValidators, productController.get);

router.get('/products/metadata', productController.metadata);

export default router;
