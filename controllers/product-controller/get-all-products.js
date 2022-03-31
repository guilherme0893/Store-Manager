const getAll = require('../../services/product-services/get-all-products');

const getAllProducts = async (req, res) => {
  try {
    const products = await getAll();
    res.status(200).json(products);    
  } catch (error) {
    console.error(error);     
  }
};

module.exports = getAllProducts;
