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

module.exports = getAllProducts;
