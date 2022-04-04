const connection = require('./connection');

const getAllProducts = async () => {
  try {
    const [products] = await connection.execute('SELECT * FROM products');
    return products;    
  } catch (err) {
    console.error(err);
  }
};

const getProductsById = async (id) => {
  try {
    const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return product;
  } catch (err) {
    console.error(err);
  }
};

// // chama um product X do database para checagem
// const getUniqueProduct = async (name) => {
//   const query = 'SELECT * FROM products WHERE name = ?';
//   const [product] = await connection.execute(query, [name]);
//   // console.log(name);
//   // console.log(product); // vazio no começo!
//   return product;
// };

const createProduct = async ({ name, quantity }) => {
    const query = 'INSERT INTO products (name, quantity) VALUES (?,?)';
    const [insertId] = await connection.execute(query, [name, quantity]);
    return {
      id: insertId,
      name,
      quantity,
    };
};

const updateProduct = async ({ id, name, quantity }) => {
  // !!! updateProduct com um determinado id!!
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [name, quantity, id]);
  // return product; // tava retornando algo que nao havia
  return {
    id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = {
  getProductsById,
  getAllProducts,
  createProduct,
  // getUniqueProduct,
  updateProduct,
  deleteProduct,
};
