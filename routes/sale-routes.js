const express = require('express');

const getAllSales = require('../controllers/sale-controller/get-all-sales');
const getSalesById = require('../controllers/sale-controller/get-sales-by-id');

const router = express.Router();

router.get('/', getAllSales);
router.get('/:id', getSalesById);

module.exports = router;
