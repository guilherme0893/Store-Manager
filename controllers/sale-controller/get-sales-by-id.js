const getById = require('../../services/sale-services/get-sales-by-id');

const getSalesById = async (req, res) => {
  const { id } = req.params;
  try {
    const sales = await getById(id);
    if (!sales) return res.status(404).json({ message: 'Sale not found' });  
    return res.status(200).json(sales);    
  } catch (error) {
    console.error(error);
  }
};

module.exports = getSalesById;