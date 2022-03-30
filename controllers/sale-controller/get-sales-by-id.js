const salesService = require('../../services/sale-services/get-sales-by-id');

const getSalesById = async (req, res) => {
  const { id } = req.params;
  try {
    const sales = await salesService.getSalesById(id);
    res.status(200).json(sales);    
  } catch (error) {
    return res.status(404).json({ message: 'Sale not found' });  
  }
};

module.exports = getSalesById;