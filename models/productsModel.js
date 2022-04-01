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
const getUniqueProduct = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [product] = await connection.execute(query, [name]);
  console.log(name);
  console.log(product); // vazio no começo!
  return product;
};
getUniqueProduct('guilherme'); // traz todos

const createProduct = async ({ name, quantity }) => {
  // try {
    const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';
    // [{ }] porque vem na inserção -- rever aula para confirmar 100%
    const [{ insertId }] = await connection.execute(query, [name, quantity]);
    console.log(name);
    console.log(quantity);
    console.log(insertId);
    const productObj = {
      id: insertId,
      name,
      quantity,
    };
    console.log(productObj);
    return productObj;
  // } catch (error) {
  //   console.error('error');  
  // }
};
createProduct({ name: 'guilherme', quantity: 7 });

module.exports = {
  getProductsById,
  getAllProducts,
  createProduct,
  getUniqueProduct,
};
