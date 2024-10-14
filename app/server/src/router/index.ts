import { Router } from 'express';
import productController from '../controllers/product';
import { productsQueryValidators } from './validation';

const router = Router();

router.get('/product', ...productsQueryValidators, productController.get);

export default router;
