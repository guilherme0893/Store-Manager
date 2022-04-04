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
    // console.log('Request successful');
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

const newSaleId = async () => {
  const query = 'INSERT INTO sales (date) VALUES(NOW())';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

const createNewSale = async (sales) => { // talvez possa ser adaptada para ficar similar ao updateSale -- geração do json nas camadas superiores
  const id = await newSaleId();
  // o map de valores gerará promises -- graças ao video do Ricci
  const newSale = await Promise.all(sales.map(async (sale) => {
    const newQuery = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)';
    const salePromise = await connection.execute(newQuery, 
      [id, sale.productId, sale.quantity]);
    return salePromise;
  }));
  return newSale;
};

const updateSale = async (saleId, sales) => {
  const query = `UPDATE sales_products SET product_id = ?, 
    quantity = ? WHERE sale_id = ? AND product_id = ?`;
  // de novo inserção de diferentes dados cria promises
  const itemUpdated = await Promise.all(sales.map(async ({ productId, quantity }) => { // já gera um array com objeto e duas chaves
    await connection.execute(query, [productId, quantity, saleId, productId]);
    // console.log(newPromise, 'eu sou a newPromise'); // undefined
    // console.log(newPromise.productId, 'eu sou o productId'); // também undefined
    // console.log(productId, 'eu sou o productId'); // retorna um valor
    return { productId, quantity };
  }));
  // ambos tem valores definidos
  // console.log(itemUpdated, 'eu sou o updated'); // bate com o array gerado pelo sql
  // console.log(saleId, 'eu sou o saleId');
  return { saleId, itemUpdated };
};

module.exports = {
  getAllSales,
  getSalesById,
  createNewSale,
  updateSale,
};
