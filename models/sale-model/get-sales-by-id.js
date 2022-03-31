const connection = require('../connection');

const changeToCamelCase = ({ sale_id: saleId, date, product_id: productId, quantity }) => ({
  saleId,
  date,
  productId,
  quantity,
});

const getSalesById = async (id) => {
  try {
    const query = `SELECT sales.date, sales_product.product_id, sales_product.quantity
    FROM StoreManager.sales AS sales
    INNER JOIN StoreManager.sales_products AS sales_product
    ON sales.id = sales_product.sale_id
    WHERE sales.id = ?
    ORDER BY sale_id, product_id;`;
    const [sale] = await connection.execute(query, [id]);
    return sale.map(changeToCamelCase);  
  } catch (err) {
    console.error(err);
  }
};

module.exports = getSalesById;
