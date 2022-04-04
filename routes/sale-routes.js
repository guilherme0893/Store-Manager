const express = require('express');

const salesController = require('../controllers/salesController');
const salesValidation = require('../middlewares/salesMiddleware');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSalesById);
router.post('/', salesValidation.productIdValidation, salesValidation.quantityValidation);
router.post('/', salesController.createNewSale);
router.put(
  '/:id',
  salesValidation.productIdValidation,
  salesValidation.quantityValidation,
  salesController.updateSale,
  );

module.exports = router;
