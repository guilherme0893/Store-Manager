const express = require('express');

const salesController = require('../controllers/salesController');
const salesValidation = require('../middlewares/salesMiddleware');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSalesById);
router.post('/', salesValidation.productIdValidation, salesValidation.quantityValidation);
router.put('/', salesValidation.productIdValidation, salesValidation.quantityValidation);
router.put('/:id', salesValidation.productIdValidation, salesValidation.quantityValidation);

module.exports = router;
