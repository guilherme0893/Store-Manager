const express = require('express');

const productsController = require('../controllers/productsController');
const productsValidation = require('../middlewares/productsMiddleware');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductsById);
router.post('/', 
  productsValidation.nameValidation, 
  productsValidation.quantityValidation,
  productsValidation.checkProduct, 
  productsController.createProduct);
router.put('/', productsValidation.nameValidation, productsValidation.quantityValidation);
router.put('/:id', productsValidation.nameValidation, productsValidation.quantityValidation);

module.exports = router;
