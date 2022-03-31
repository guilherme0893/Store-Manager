const connection = require('./connection');

const getAllProducts = async () => {
  try {
    const [products] = await connection.execute('SELECT * FROM StoreManager.products');
    console.log('Request successful');
    return products;    
  } catch (err) {
    console.error(err);
  }
};

const getProductsById = async (id) => {
  try {
    const [product] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id', [id],
    );
    return product[0];
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getProductsById,
  getAllProducts,
};
