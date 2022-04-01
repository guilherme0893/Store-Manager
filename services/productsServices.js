const connection = require('../models/connection');
const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getById = async (id) => {
  const [product] = await productsModel.getProductsById(id);
  return product;
};

const getUniqueProduct = async (name) => {
  const products = await productsModel.getAllProducts();
  // console.log(products, 'sou o products');
  const finder = products.find((product) => product.name === name);
  // console.log(finder);
  return !finder;
};
// getUniqueProduct('guilherme');

const createProduct = async ({ name, quantity }) => {
  try {
    const newProduct = await productsModel.createProduct({ name, quantity });
    return newProduct;    
  } catch (error) {
    console.error(error);    
  }
};

const updateProduct = async ({ id, name, quantity }) => {
  try {
    const updatedProduct = await productsModel.updateProduct({ id, name, quantity });
    return updatedProduct;
  } catch (error) {
    console.error(error);    
  }
};

const deleteProduct = async (id) => {
  try {
    return await productsModel.deleteProduct(id);    
  } catch (error) {
    console.error(error);    
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
  getUniqueProduct,
  updateProduct,
  deleteProduct,
};
