const connection = require('./connection');

const getProductsById = async (id) => {
  try {
    const [product] = await connection.execute(
      'SELECT name, quantity FROM StoreManager.products WHERE id = ?', [id],
    );
    if (product.length === 0) return console.log('Product not found');
    return product[0];
  } catch (err) {
    console.error(err);
  }
};

module.exports = getProductsById;
