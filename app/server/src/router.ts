import { Router } from 'express';
import productController from './controllers/product';

const router = Router();

router.get('/product', productController.get);

export default router;
