const getById = require('../../services/product-services/get-products-by-id');

const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);    
  } catch (error) {
    console.error(error);
  }
};

module.exports = getProductsById;
