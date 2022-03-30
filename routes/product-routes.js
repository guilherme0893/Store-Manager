const express = require('express');

const getAllProducts = require('../controllers/product-controller/get-all-products');
const getProductsById = require('../controllers/product-controller/get-products-by-id');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductsById);

module.exports = router;
