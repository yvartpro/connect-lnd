const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.patch('/products/:productId', productController.patchProduct);
router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;
