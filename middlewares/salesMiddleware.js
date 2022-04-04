const productIdValidation = async (req, res, next) => {
  const [{ productId }] = req.body;
  // console.log(typeof productId, 'sou o productId');
  if (!productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const quantityValidation = async (req, res, next) => { // isso aqui valeria para os dois sales e products, mas pode ser algo circunstancial
  const [{ quantity }] = req.body;
  if (!quantity && quantity !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantity <= 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  productIdValidation,
  quantityValidation,
};