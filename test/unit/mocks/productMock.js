const fakeProductList = [
  {
    id: 1,
    name: 'Batman Belt',
    quantity: 10,
  },
  {
    id: 2,
    name: 'Superman Suit',
    quantity: 3,
  },
];

const fakeProduct = {
  id: 3,
  name: 'Batman Belt',
  quantity: 10,
};

const updatedProduct = {
  id: 1,
  name: 'Batman Belt',
  quantity: 9,
};

const updatedFakeProductList = [
  {
    id: 1,
    name: 'Batman Belt',
    quantity: 9,
  },
  {
    id: 2,
    name: 'Superman Suit',
    quantity: 3,
  },
];

const newFakeProduct = {
  id: 3,
  name: 'Batman Mask',
  quantity: 1,
};

module.exports = {
  fakeProductList,
  fakeProduct,
  updatedFakeProductList,
  updatedProduct,
  newFakeProduct,
};
