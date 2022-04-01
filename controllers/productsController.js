const productService = require('../services/productsServices');
// const productModel = require('../models/productsModel');

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json(products);    
  } catch (error) {
    console.error(error);     
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, 'id do getById');
    // const { name, quantity } = req.body;
    // // validations
    // const nameCheck = productsValidation.nameValidation(name);
    // const quantityCheck = productsValidation.quantityValidation(quantity);
    // call product
    const product = await productService.getById(id);
    // responses   
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product); 
    // if (nameCheck && quantityCheck) return res.status(200).json(product);    
  } catch (error) {
    console.error(error);
  }
};

const createProduct = async (req, res) => {
  try {
    console.log('antes do req.body');
    const { name, quantity } = req.body;
    const product = await productService.createProduct({ name, quantity });
    // console.log(product, 'oi');
    return res.status(201).json(product);
  } catch (error) {
    console.error(error);    
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id, 'id do update');
  const { name, quantity } = req.body;
  const product = await productService.getById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  try {
    // falta o await
    const updatedProduct = await productService.updateProduct({ id, name, quantity });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);    
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
};
