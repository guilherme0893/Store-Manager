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

const updateSale = async (saledId, sale) => { // saleId vai porque é put/:id então tera de achar a id da sale
  const updatedSale = await salesModel.updateSale(saledId, sale);
  // console.log(sale, 'sou sale no service'); // pega o array de request
  return updatedSale;
};

module.exports = {
  getAll,
  getById,
  createNewSale,
  updateSale,
};
