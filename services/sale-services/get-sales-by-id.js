const saleModel = require('../../models/sale-model/get-sales-by-id');

const getSalesById = async (id) => {
  const sale = await saleModel.getSalesById(id);
  return sale;
};

module.exports = getSalesById;