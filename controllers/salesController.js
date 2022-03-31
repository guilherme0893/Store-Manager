const salesService = require('../services/salesServices');

const getAllSales = async (req, res) => {
  try {
    const sales = await salesService.getAll();
    res.status(200).json(sales);    
  } catch (error) {
    console.error(error);     
  }
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await salesService.getById(id);
    return res.status(200).json(sale);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllSales,
  getSalesById,
};
