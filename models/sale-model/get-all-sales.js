const connection = require('../connection');

const getAllSales = async () => {
  try {
    const [sales] = await connection.execute('SELECT * FROM StoreManager.sales');
    console.log('Request successful');
    return sales;    
  } catch (err) {
    console.error(err);    
  }
};

module.exports = getAllSales;
