const salesService = require('../services/salesServices');

const getAllSales = async (req, res) => {
  try {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);    
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

const createNewSale = async (req, res) => {
  try {
    const sale = req.body;
    const newSale = await salesService.createNewSale(sale);
    return res.status(201).json(newSale);
  } catch (error) {
    console.error(error);
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = req.body;
    const updatedSale = await salesService.updateSale(id, sale); // ==== (productId, sale)
    return res.status(200).json(updatedSale);
  } catch (error) {
    console.error(error);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    if (sale) {
      await salesService.deleteSale(id);
      return res.status(204).end();
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllSales,
  getSalesById,
  createNewSale,
  updateSale,
  deleteSale,
};
