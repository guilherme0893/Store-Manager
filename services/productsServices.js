const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getProductsById(id);
  return product;
};

const getUniqueProduct = async (name) => {
  const products = await productsModel.getAllProducts();
  // console.log(products, 'sou o products');
  const finder = products.find((product) => product.name === name);
  // console.log(finder);
  return !finder;
};
getUniqueProduct('guilherme');

const createProduct = async ({ name, quantity }) => {
  try {
    const newProduct = await productsModel.createProduct(name, quantity);
    return newProduct;    
  } catch (error) {
    console.error(error);    
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
  getUniqueProduct,
};
