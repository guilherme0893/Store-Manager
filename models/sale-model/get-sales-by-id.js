const connection = require('../connection');

const getSalesById = async (id) => {
  try {
    const [sale] = await connection.execute('SELECT * FROM StoreManager.sales WHERE id = ?', [id]);
    if (sale.length === 0) return console.log('Sale not found');
    return sale[0];    
  } catch (err) {
    console.error(err);
  }
};

module.exports = getSalesById;
