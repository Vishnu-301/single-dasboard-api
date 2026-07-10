import express from 'express';
import ProductController from '../controller/productController.js';

const router = express.Router();

const productController = new ProductController();

// routes for products

router.post('/add', productController.addProduct.bind(productController));
router.get('/:id', productController.findProductById.bind(productController));
router.put('/:id', productController.editProduct.bind(productController));
router.delete('/:id', productController.deleteProduct.bind(productController));

export default router;