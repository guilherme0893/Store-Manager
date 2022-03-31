const getAll = require('../../services/sale-services/get-all-sales');

const getAllSales = async (req, res) => {
  try {
    const sales = await getAll();
    res.status(200).json(sales);    
  } catch (error) {
    console.error(error);     
  }
};

module.exports = getAllSales;
