const productsModel = require('../models/productsModel');

const getAll = async () => {
  try {
    const products = await productsModel.getAllProducts();
    return products;
  } catch (error) {
    console.error(error);
  }
};

const getById = async (id) => {
  try {
    const [product] = await productsModel.getProductsById(id);
    return product;
  } catch (error) {
    console.error(error);
  }
};

const createProduct = async ({ name, quantity }) => {
  try {
    // repensar se não valeria a chamar o getUnique aqui e throw um error para o proximo catch
    const newProduct = productsModel.createProduct({ name, quantity });
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
  updateProduct,
  deleteProduct,
};
