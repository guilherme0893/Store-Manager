const getById = require('../../models/sale-model/get-sales-by-id');

const getSalesById = async (id) => {
  const sale = await getById(id);
  return sale;
};

module.exports = getSalesById;