const saleModel = require('../../models/sale-model/get-all-sales');

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  return sales;
};

module.exports = getAllSales;