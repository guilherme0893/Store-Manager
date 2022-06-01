const connection = require('./connection');

const changeToCamelCase = (saleData) => ({
  saleId: saleData.sale_id,
  date: saleData.date,
  productId: saleData.product_id,
  quantity: saleData.quantity,
});

const getAllSales = async () => {
  try {
    const query = `SELECT sales_products.sale_id, sales.date, 
    sales_products.product_id, sales_products.quantity
    FROM StoreManager.sales AS sales
    INNER JOIN StoreManager.sales_products AS sales_products
    ON sales.id = sales_products.sale_id
    ORDER BY sales.id;`;
    const [sales] = await connection.execute(query);
    if (!sales || sales.length === 0) return null;
    return sales.map(changeToCamelCase);   
  } catch (err) {
    console.error(err);    
  }
};

const getSalesById = async (id) => {
  try {
    const query = `SELECT sales.date, sales_product.product_id, sales_product.quantity
    FROM StoreManager.sales AS sales
    INNER JOIN StoreManager.sales_products AS sales_product
    ON sales.id = sales_product.sale_id
    WHERE sales.id = ?
    ORDER BY sale_id;`;
    const [sale] = await connection.execute(query, [id]);
    if (!sale || sale.length === 0) return null;
    // console.log(sale);
    return sale.map(changeToCamelCase);  
  } catch (err) {
    console.error(err);
  }
};

const updateQuantity = async (sale) => {
  const query = 'SELECT quantity FROM products WHERE id = ?';
  const [salePromise] = await Promise.all(sale.map(async (saleProduct) => {
    const [teste] = await connection.execute(query, [saleProduct.productId]);
    // passando apenas teste ==> console.log(teste, 'teste!!!!'); // array com arrays c/ objectos
    // passando [teste] ==> console.log(teste); // traz um array com objecto onde os keys são as propriedades pedidas nas queries;
    // return teste[0];
    // const quantity = teste[0].quantity - saleProduct.quantity;
    // console.log(teste[0].quantity);
    // console.log(saleProduct.quantity); // lembrando se um objeto com productId e quantity
    // console.log(quantity);
    return teste[0].quantity - saleProduct.quantity;
  }));
  // console.log(salePromise.quantity);
  return salePromise; // returns the value in the teste[0];
};

const createNewSale = async (sales) => {
  await updateQuantity(sales); // estourar o erro de quantity
  const query = 'INSERT INTO sales (date) VALUES(NOW())';
  const [{ insertId }] = await connection.execute(query);

  // o map de valores gerará promises -- graças ao video do Ricci
  await Promise.all(sales.map(async (sale) => {
    const { productId, quantity } = sale;
    const newQuery = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)';
    await connection.execute(newQuery, [insertId, productId, quantity]); 
  }));

  await Promise.all(sales.map(async (sale) => {
    const { productId, quantity } = sale;
    const updateQuery = 'UPDATE products SET quantity = quantity - ? WHERE products.id = ?';
    await connection.execute(updateQuery, [quantity, productId]);
  }));

  const sale = {
    id: insertId,
    itemsSold: sales, // já é um array com obj    
  };

  return sale;
};

const updateSale = async (saleId, sales) => {
  const query = `UPDATE sales_products SET product_id = ?, 
    quantity = ? WHERE sale_id = ? AND product_id = ?`;
  // de novo inserção de diferentes dados cria promises
  const itemUpdated = await Promise.all(sales.map(async ({ productId, quantity }) => { // já gera um array com objeto e duas chaves
    await connection.execute(query, [productId, quantity, saleId, productId]);
    return { productId, quantity };
  }));
  // ambos tem valores definidos
  // console.log(itemUpdated, 'eu sou o updated'); // bate com o array gerado pelo sql
  // console.log(saleId, 'eu sou o saleId');
  return { saleId, itemUpdated };
};

const deleteSale = async (id) => { 
  // pegar a venda pelo id e deletar --> depois pegar o id do product e diminuir do valor na tabela;
  // const query = 'SELECT * FROM sales_products WHERE sale_id = ?';
  // const [sale] = await connection.execute(query, [id]);
  // const query = `SELECT sales.date, sales_products.product_id, sales_products.quantity
  //   FROM StoreManager.sales
  //   INNER JOIN StoreManager.sales_products
  //   ON sales.id = sales_products.sale_id
  //   WHERE sales.id = ?;`;
  // const [sale] = await connection.execute(query, [id]);
  // console.log(sale);
  // const updateQuery = 'UPDATE products SET quantity = quantity + ? WHERE id = ?';

  // const teste = sale.map((s) => connection.execute(updateQuery, [s.quantity, s.productId]));
  // await Promise.all(teste);
  // console.log(teste);

  // const promise = updatedOnDelete(sale);
  // // const teste = sale.map(async (saleProduct) => {
  // //   const updateQuery = 'UPDATE products SET quantity = quantity + ? WHERE id = ?';
  // //   const teste2 = await connection.execute(
  // //     updateQuery, [saleProduct.quantity, saleProduct.productId]);
  // //   console.log(teste2);
  // //   return teste2;
  // // });
  // await Promise.all(promise);
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  await connection.execute('DELETE FROM sales_products WHERE sale_id = ?', [id]);
};

module.exports = {
  getAllSales,
  getSalesById,
  createNewSale,
  updateSale,
  deleteSale,
};
