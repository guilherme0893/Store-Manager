const productsService = require('../../services/product-services/get-products-by-id');

const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productsService.getProductsById(id);
    res.status(200).json(product);    
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = getProductsById;
