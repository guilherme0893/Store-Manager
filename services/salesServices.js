const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getById = async () => {
  const sale = await salesModel.getSalesById();
  return sale;
};

module.exports = {
  getAll,
  getById,
};
