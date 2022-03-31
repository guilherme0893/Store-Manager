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

const nameValidation = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length <= 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};
// nameValidation();

const quantityValidation = async (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity && quantity !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantity <= 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  nameValidation,
  quantityValidation,
};
