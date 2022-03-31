const getAllSales = require('../../models/sale-model/get-all-sales');

const getAll = async () => {
  const sales = await getAllSales();
  return sales;
};

module.exports = getAll;