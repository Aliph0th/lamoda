import { Router } from 'express';
import productController from '../controllers/product';
import { productsQueryValidators } from './validation';

const router = Router();

router.get('/product', ...productsQueryValidators, productController.get);

router.get('/metadata', productController.meta)

export default router;
