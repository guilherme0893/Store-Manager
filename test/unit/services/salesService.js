const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesServices');
const salesModel = require('../../../models/salesModel');

describe('Tests salesService', () => {
  const fakeSaleList = [
    {
      "productId": 1,
      "quantity": 3,
    },
    {
      "productId": 2,
      "quantity": 5,
    }
  ];
  const fakeSale = {
    id: 1,
    quantity: 100,
  };
  const newFakeSale = {
    "productId": 2,
    "quantity": 10,
  };
  const updatedSale = {
    "productId": 2,
    "quantity": 11,
  };
  const updatedFakeProductList = [
    {
      "productId": 1,
      "quantity": 3,
    },
    {
      "productId": 2,
      "quantity": 11,
    },
  ];
  
    describe('When getAll is called,', () => {
    before(() => {
      sinon.stub(salesModel, 'getAllSales').resolves(fakeSaleList);
    });
    // after(() => salesModel.getAllSales.restore());
    it('if successful, it lists all sales in an array of objects', async () => {
      const sales = await salesService.getAll();
      // console.log(products[0]); // object
      expect(typeof sales).to.be.equal('object');
      expect(sales).to.be.equal(fakeSaleList);
    });
  });

  describe('When getById is called,', () => {
    before(() => {
      sinon.stub(salesModel, 'getSalesById').resolves([fakeSaleList[0]]);
    });
    // after(() => {
    //   salesModel.getProductsById.restore();
    // });
    it('if successful, it lists one sale matching the id in the parameter', async () => {
      const sale = await salesService.getById(1);
      // console.log(product);
      // console.log(fakeProductList[0]);
      // console.log(product === fakeProductList[0]);
      expect(sale).to.be.deep.equal([fakeSaleList[0]])
    });
  });

  // describe('When createProduct is called', () => {
  //   // before(() => {
  //   //   sinon.stub(productsModel, 'getUniqueProduct').resolves(false);
  //   //   sinon.stub(productsModel, 'createProduct').resolves(newFakeProduct);
  //   //   sinon.stub(productsModel, 'getAllProducts').resolves(fakeProductList);
  //   // });
  //   // after(() => {
  //   //   productsModel.getUniqueProduct.restore();
  //   //   productsModel.createProduct.restore();
  //   //   productsModel.getAllProducts.restore();
  //   // });
  //   it('if successful, a new product is added', async () => {
  //     const newSales = await salesService.createNewSale(newFakeSale);
  //     // console.log(newProducts);
  //     const getUnique = await salesModel.getSalesById(newFakeSale.productId);
  //     // console.log(getUnique);
  //     const getAllSales = await salesService.getAll(fakeSaleList);
  //     // console.log(getAllProducts);
  //     expect(newSales.productId).to.be.equal(2);
  //     expect(newSales.quantity).to.be.equal(10);
  //   });
  // });

  // describe('When updateProduct is called', () => {
  //   // before(() => {
  //   //   sinon.stub(salesModel, 'updateSale').resolves(updateSale);
  //   // });
  //   // after(() => {
  //   //   productsModel.updateProduct.restore();
  //   // });
  //   it('if successful, a sale is updated', async () => {
  //     const updateSale = await salesService.updateSale(updatedSale);
  //     // console.log(updateProduct);
  //     // console.log(updatedFakeProductList);
  //     expect(updatedFakeProductList.includes(updateSale));
  //   });
  // });

  // describe('When deleteProduct is called', () => {  // NAO IMPLEMENTADO AINDA!!!!
  //   before(() => {
  //     sinon.stub(salesModel, 'deleteSale').resolves(fakeSaleList);
  //   });
  //   // after(() => {
  //   //   productsModel.deleteProduct.restore();
  //   // });
  //   it('if successful, a sale is removed based on the given id', async () => {
  //     const removedSale = await productsModel.deleteProduct(1);
  //     expect(fakeSaleList).not.to.include(removedSale);
  //   });
  // });
});
