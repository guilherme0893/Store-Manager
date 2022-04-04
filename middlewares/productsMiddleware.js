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

// const checkProduct = async (req, res, next) => {
//   const { name } = req.body;
//   const products = await productsModel.getAllProducts();
//   const finder = products.find((product) => product.name === name);
//   if (finder) return res.status(409).json({ message: 'Product already exists' });
//   // // try {
//   //   const product = await productService.getAll();
//   //   if (product) 
//   // // } catch (error) {
//   // //   console.error(error);    
//   // // }
//   return next();
// };

module.exports = {
  nameValidation,
  quantityValidation,
  // checkProduct,
};
