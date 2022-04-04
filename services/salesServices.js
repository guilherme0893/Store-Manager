const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getSalesById(id);
  return sale;
};

const createNewSale = async (sale) => {
  const newSale = await salesModel.createNewSale(sale);
  return newSale;
};

const updateSale = async (sale) => {
  const updatedSale = await salesModel.updateSale(sale);
  return updatedSale;
};

module.exports = {
  getAll,
  getById,
  createNewSale,
  updateSale,
};
