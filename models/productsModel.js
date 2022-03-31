const connection = require('./connection');

const getAllProducts = async () => {
  try {
    const [products] = await connection.execute('SELECT * FROM StoreManager.products');
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

// chama um product X do database para checagem
const checkProduct = async (name) => {
  const [product] = await connection.execute('SELECT * FROM StoreManager.products WHERE name = ?', 
    [name]);
  return product[0];
};

const createProduct = async ({ name, quantity }) => {
  try {
    const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';
    // [{ }] porque vem na inserção -- rever aula para confirmar 100%
    const [{ insertId }] = await connection.execute(query, [name, quantity]);
    return {
      id: insertId,
      name,
      quantity,
    };
  } catch (error) {
    console.error(error);    
  }
};

module.exports = {
  getProductsById,
  getAllProducts,
  createProduct,
  checkProduct,
};
