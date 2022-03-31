const connection = require('../connection');

const changeToCamelCase = ({ sale_id: saleId, date, product_id: productId, quantity }) => ({
  saleId,
  date,
  productId,
  quantity,
});

const getAllSales = async () => {
  try {
    const query = `SELECT sales_products.sale_id, sales.date, 
    sales_products.product_id, sales_products.quantity
    FROM StoreManager.sales AS sales
    INNER JOIN StoreManager.sales_products AS sales_products
    ON sales.id = sales_products.sale_id
    ORDER BY sales.id, sales_products.product_id;`;
    const [sales] = await connection.execute(query);
    console.log('Request successful');
    return sales.map(changeToCamelCase);   
  } catch (err) {
    console.error(err);    
  }
};

module.exports = getAllSales;
