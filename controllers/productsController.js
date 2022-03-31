const productService = require('../services/productsServices');

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAll();
    res.status(200).json(products);    
  } catch (error) {
    console.error(error);     
  }
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);    
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
};
