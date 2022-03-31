const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getProductsById(id);
  return product;
};

module.exports = {
  getAll,
  getById,
};
