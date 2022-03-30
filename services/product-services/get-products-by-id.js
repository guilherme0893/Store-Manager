const productModel = require('../../models/product-model/get-products-by-id');

const getProductsById = async (id) => {
  const product = await productModel.getProductsById(id);
  return product;
};

module.exports = getProductsById;
