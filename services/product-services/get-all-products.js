const getAllProducts = require('../../models/product-model/get-all-products');

const getAll = async () => {
  const products = await getAllProducts();
  return products;
};

module.exports = getAll;
