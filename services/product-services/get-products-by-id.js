const getProductsById = require('../../models/product-model/get-products-by-id');

const getById = async (id) => {
  const product = await getProductsById(id);
  return product;
};

module.exports = getById;
