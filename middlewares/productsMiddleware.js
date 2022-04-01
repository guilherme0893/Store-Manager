// const Joi = require('joi'); // cancela por enquanto para facilitar as coisas

// const productSchema = Joi.object({
//   name: Joi.string().min(5).required(),
//   quantity: Joi.number().min(1).required(),
// });

// const nameValidation = (req, res, next) => {
//   const { name } = req.body;
//   const { error } = productSchema.validate(name);
//   if (name.length < 5) {
//     return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
//   }}
const productService = require('../services/productsServices');

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length <= 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  return next();
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;
  console.log(quantity, 'sou a quantidade');
  if (!quantity && quantity !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantity < 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};

const checkProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const check = await productService.getUniqueProduct(name);
    if (check) {
      return res.status(409).json({ message: 'Product already exists' });
    }
  } catch (error) {
    console.error(error);    
  }
  return next();
};

module.exports = {
  nameValidation,
  quantityValidation,
  checkProduct,
};
