const fakeSaleList = [
  {    
    saleId: 1,
    date: '1993-11-08T09:50:30.000Z',
    productId: 1,
    quantity: 10,
  },
  {  
    saleId: 2,
    date: '1993-11-08T09:50:40.000Z',   
    productId: 2,
    quantity: 20,
  },
];

const newFakeSale = {
  saleId: 3,
  date: '1993-11-08T09:50:30.000Z',
  productId: 1,
  quantity: 10,
};

const updatedFakeProduct = {    
  saleId: 1,
  date: '1993-11-08T09:50:30.000Z',
  productId: 1,
  quantity: 10,
};

const updatedFakeSaleList = [
  {    
    sale_id: 1,
    date: '1993-11-08T09:50:30.000Z',
    product_id: 1,
    quantity: 9,
  },
  {  
    saleId: 2,
    date: '1993-11-08T09:50:40.000Z',   
    productId: 2,
    quantity: 20,
  },
];

const fakeSale = [
  {
    date: '1993-11-08T09:50:30.000Z',
    productId: 1,
    quantity: 9,
 },
];

module.exports = {
  fakeSaleList,
  newFakeSale,
  fakeSale,
  updatedFakeSaleList,
};
