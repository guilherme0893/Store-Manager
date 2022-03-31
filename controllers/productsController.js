const productService = require('../services/productsServices');
// const productsValidation = require('../middlewares/productsMiddleware');

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

module.exports = {
  getAllProducts,
  getProductsById,
};
