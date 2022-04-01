const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getById = async (id) => {
  const [product] = await productsModel.getProductsById(id);
  return product;
};

const createProduct = async ({ name, quantity }) => {
  const newProduct = productsModel.createProduct({ name, quantity });
  return newProduct;
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
  updateProduct,
  deleteProduct,
};
