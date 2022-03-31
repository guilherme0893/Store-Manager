const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getProductsById(id);
  return product;
};

const createProduct = async (product) => {
  try {
    const { name } = product;
    // baseado na codigo o Guima
    const checkProduct = await productsModel.checkProduct(name);
    if (checkProduct) {
      return { message: 'Product already exists' };
    }
    const newProduct = await productsModel.createProduct(product);
    return newProduct;    
  } catch (error) {
    console.error(error);    
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
};
