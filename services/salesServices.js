const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getSalesById(id);
  return sale;
};

module.exports = {
  getAll,
  getById,
};
