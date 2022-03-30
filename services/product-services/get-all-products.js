const productModel = require('../../models/product-model/get-all-products');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return products;
};

module.exports = {
  getAllProducts,
};
