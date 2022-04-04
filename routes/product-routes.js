const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');
const productsValidation = require('../middlewares/productsMiddleware');

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductsById);

router.post('/', 
  productsValidation.nameValidation, 
  productsValidation.quantityValidation,
  // productsValidation.checkProduct,
  productsController.createProduct);

router.put('/:id', // update só no producto com o Id na url 
  productsValidation.nameValidation,
  productsValidation.quantityValidation,
  productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;
