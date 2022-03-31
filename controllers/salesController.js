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
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(sale);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllSales,
  getSalesById,
};
